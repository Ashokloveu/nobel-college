import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

router.use(authenticate);

router.get('/', requirePermission('users.read'), UserController.list);
router.post('/', requirePermission('users.create'), logAudit('CREATE_USER', 'USERS'), UserController.create);
router.get('/:id', requirePermission('users.read'), UserController.getById);
router.put('/:id', requirePermission('users.update'), logAudit('UPDATE_USER', 'USERS'), UserController.update);
router.delete('/:id', requirePermission('users.delete'), logAudit('DELETE_USER', 'USERS'), UserController.delete);

export default router;
