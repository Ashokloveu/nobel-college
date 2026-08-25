import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/role.model';
import { ALL_PERMISSIONS, DEFAULT_ROLE_PERMISSIONS } from '../utils/rbacConfig';

export class RoleController {
  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await Role.find();
      res.json({
        success: true,
        data: {
          roles,
          allPermissions: ALL_PERMISSIONS,
          defaultRolePermissions: DEFAULT_ROLE_PERMISSIONS,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
