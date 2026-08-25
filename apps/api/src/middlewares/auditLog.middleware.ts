import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { AuditLog } from '../models/auditLog.model';
import { logger } from '../utils/logger';

export const logAudit = (action: string, module: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Intercept response finish event to record audit log upon HTTP success
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          await AuditLog.create({
            actorId: req.user?.userId || undefined,
            actorEmail: req.user?.email || 'ANONYMOUS',
            action,
            module,
            recordId: req.params.id || (res.locals.recordId as string) || undefined,
            ipAddress: req.ip || req.socket.remoteAddress,
            userAgent: req.get('user-agent'),
            details: {
              method: req.method,
              url: req.originalUrl,
              body: sanitizeAuditBody(req.body),
            },
          });
        } catch (err) {
          logger.error('Failed to save audit log record', err);
        }
      }
    });

    next();
  };
};

function sanitizeAuditBody(body: any): any {
  if (!body || typeof body !== 'object') return body;
  const sanitized = { ...body };
  delete sanitized.password;
  delete sanitized.newPassword;
  delete sanitized.confirmPassword;
  delete sanitized.twoFactorCode;
  delete sanitized.secret;
  return sanitized;
}
