import { Request, Response, NextFunction } from 'express';
import { AuditLog } from '../models/auditLog.model';

export class AuditLogController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const skip = (page - 1) * limit;

      const query: any = {};
      if (req.query.module) query.module = req.query.module;
      if (req.query.action) query.action = req.query.action;

      const total = await AuditLog.countDocuments(query);
      const logs = await AuditLog.find(query)
        .populate('actorId', 'name email role')
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: {
          items: logs,
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
}
