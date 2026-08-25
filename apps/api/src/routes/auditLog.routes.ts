import { Router } from 'express';
import { AuditLogController } from '../controllers/auditLog.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticate);
router.get('/', requirePermission('audit.read'), AuditLogController.list);

export default router;
