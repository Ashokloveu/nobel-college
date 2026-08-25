import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { User, IUserDocument } from '../models/user.model';
import { Role } from '../models/role.model';
import { ENV } from '../config/env';
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from '../utils/errors';
import { IUser, UserRole, PermissionCode, LoginResponse } from '@nobel/types';
import { DEFAULT_ROLE_PERMISSIONS } from '../utils/rbacConfig';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  permissions: PermissionCode[];
}

export class AuthService {
  /**
   * Fetch complete list of permissions for a user based on their role
   */
  static async getUserPermissions(roleName: UserRole): Promise<PermissionCode[]> {
    const roleDoc = await Role.findOne({ name: roleName });
    if (roleDoc && roleDoc.permissions.length > 0) {
      return roleDoc.permissions;
    }
    return DEFAULT_ROLE_PERMISSIONS[roleName] || [];
  }

  /**
   * Generate Access and Refresh JWT Tokens
   */
  static async generateTokens(user: IUserDocument): Promise<{ accessToken: string; refreshToken: string }> {
    const permissions = await this.getUserPermissions(user.role);
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions,
    };

    const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN as any,
    });

    const refreshToken = jwt.sign({ userId: user._id.toString() }, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN as any,
    });

    // Save hashed refresh token to user model
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenHash = refreshTokenHash;
    await user.save();

    return { accessToken, refreshToken };
  }

  /**
   * Authenticate user with credentials & optional 2FA TOTP code
   */
  static async login(
    email: string,
    password: string,
    twoFactorCode?: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Account is disabled or suspended. Please contact administrator.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.isTwoFactorEnabled) {
      if (!twoFactorCode) {
        return {
          user: this.toUserDTO(user),
          tokens: { accessToken: '', refreshToken: '' },
          requiresTwoFactor: true,
        };
      }

      if (!user.twoFactorSecret) {
        throw new BadRequestError('2FA is misconfigured for this account');
      }

      const isValidCode = authenticator.check(twoFactorCode, user.twoFactorSecret);
      if (!isValidCode) {
        throw new UnauthorizedError('Invalid 2FA code');
      }
    }

    user.lastLoginAt = new Date();
    const tokens = await this.generateTokens(user);

    return {
      user: this.toUserDTO(user),
      tokens,
      requiresTwoFactor: false,
    };
  }

  /**
   * Refresh JWT Tokens
   */
  static async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);

      if (!user || !user.refreshTokenHash || user.status !== 'ACTIVE') {
        throw new UnauthorizedError('Invalid refresh token session');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!isMatch) {
        throw new UnauthorizedError('Refresh token reused or invalidated');
      }

      return await this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  /**
   * Setup 2FA TOTP secret & QR Code
   */
  static async setup2FA(userId: string): Promise<{ secret: string; qrCodeUrl: string }> {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, 'Nobel Multiple College', secret);
    const qrCodeUrl = await qrcode.toDataURL(otpauth);

    user.twoFactorSecret = secret;
    await user.save();

    return { secret, qrCodeUrl };
  }

  /**
   * Verify TOTP code and activate 2FA
   */
  static async verifyAndEnable2FA(userId: string, code: string): Promise<boolean> {
    const user = await User.findById(userId);
    if (!user || !user.twoFactorSecret) throw new BadRequestError('2FA setup not initialized');

    const isValid = authenticator.check(code, user.twoFactorSecret);
    if (!isValid) throw new BadRequestError('Invalid 2FA code provided');

    user.isTwoFactorEnabled = true;
    await user.save();
    return true;
  }

  /**
   * Disable 2FA
   */
  static async disable2FA(userId: string, code: string): Promise<boolean> {
    const user = await User.findById(userId);
    if (!user || !user.isTwoFactorEnabled || !user.twoFactorSecret) {
      throw new BadRequestError('2FA is not enabled');
    }

    const isValid = authenticator.check(code, user.twoFactorSecret);
    if (!isValid) throw new BadRequestError('Invalid 2FA code');

    user.isTwoFactorEnabled = false;
    user.twoFactorSecret = undefined;
    await user.save();
    return true;
  }

  /**
   * Convert User Mongoose Document to safe IUser DTO
   */
  static toUserDTO(user: IUserDocument): IUser {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
