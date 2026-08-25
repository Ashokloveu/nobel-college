import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticate);
router.get('/', requirePermission('roles.read'), RoleController.list);

export default router;
