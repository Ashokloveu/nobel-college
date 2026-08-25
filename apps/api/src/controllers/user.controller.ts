import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { userCreateSchema, userUpdateSchema } from '@nobel/validation';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/errors';
import { AuthService } from '../services/auth.service';

export class UserController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const skip = (page - 1) * limit;

      const total = await User.countDocuments();
      const users = await User.find()
        .select('-passwordHash -twoFactorSecret -refreshTokenHash')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: {
          items: users.map((u) => AuthService.toUserDTO(u)),
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = userCreateSchema.parse(req.body);
      const existing = await User.findOne({ email: data.email.toLowerCase() });
      if (existing) {
        throw new ConflictError('User with this email already exists');
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const user = await User.create({
        name: data.name,
        email: data.email.toLowerCase(),
        passwordHash,
        role: data.role,
      });

      res.status(201).json({
        success: true,
        message: 'User account created successfully',
        data: AuthService.toUserDTO(user),
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id).select('-passwordHash -twoFactorSecret -refreshTokenHash');
      if (!user) throw new NotFoundError('User not found');

      res.json({
        success: true,
        data: AuthService.toUserDTO(user),
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = userUpdateSchema.parse(req.body);
      const user = await User.findById(req.params.id);
      if (!user) throw new NotFoundError('User not found');

      if (data.name) user.name = data.name;
      if (data.email) user.email = data.email.toLowerCase();
      if (data.role) user.role = data.role as any;
      if (data.status) user.status = data.status as any;

      await user.save();

      res.json({
        success: true,
        message: 'User updated successfully',
        data: AuthService.toUserDTO(user),
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) throw new NotFoundError('User not found');

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}
