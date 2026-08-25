import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { PermissionCode, UserRole } from '@nobel/types';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export const requirePermission = (requiredPermission: PermissionCode) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    // SUPER_ADMIN role automatically has access to all actions
    if (req.user.role === UserRole.SUPER_ADMIN) {
      return next();
    }

    const hasPermission = req.user.permissions.includes(requiredPermission);
    if (!hasPermission) {
      return next(
        new ForbiddenError(`Permission denied: Missing required permission [${requiredPermission}]`)
      );
    }

    next();
  };
};

export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(req.user.role) && req.user.role !== UserRole.SUPER_ADMIN) {
      return next(new ForbiddenError('Permission denied: Insufficient role level'));
    }

    next();
  };
};
