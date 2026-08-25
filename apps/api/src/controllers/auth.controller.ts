import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { loginSchema, verifyTwoFactorSchema } from '@nobel/validation';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { User } from '../models/user.model';
import { NotFoundError } from '../utils/errors';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await AuthService.login(
        validatedData.email,
        validatedData.password,
        validatedData.twoFactorCode
      );

      if (result.requiresTwoFactor) {
        return res.json({
          success: true,
          message: '2FA verification code required',
          data: { requiresTwoFactor: true },
        });
      }

      // Set Refresh Token HTTP-only cookie
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        success: true,
        message: 'Logged in successfully',
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user?.userId);
      if (!user) throw new NotFoundError('User not found');

      res.json({
        success: true,
        data: {
          user: AuthService.toUserDTO(user),
          permissions: req.user?.permissions || [],
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      const tokens = await AuthService.refreshTokens(refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        message: 'Token refreshed',
        data: { accessToken: tokens.accessToken },
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (req.user?.userId) {
        await User.findByIdAndUpdate(req.user.userId, { refreshTokenHash: undefined });
      }

      res.clearCookie('refreshToken');
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  static async setup2FA(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.setup2FA(req.user!.userId);
      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async verify2FA(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { code } = verifyTwoFactorSchema.parse(req.body);
      await AuthService.verifyAndEnable2FA(req.user!.userId, code);

      res.json({
        success: true,
        message: 'Two-factor authentication enabled successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  static async disable2FA(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { code } = verifyTwoFactorSchema.parse(req.body);
      await AuthService.disable2FA(req.user!.userId, code);

      res.json({
        success: true,
        message: 'Two-factor authentication disabled successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}
