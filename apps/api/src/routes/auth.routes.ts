import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', authenticate, AuthController.logout);
router.get('/me', authenticate, AuthController.me);

// 2FA Routes
router.post('/2fa/setup', authenticate, AuthController.setup2FA);
router.post('/2fa/verify', authenticate, logAudit('ENABLE_2FA', 'AUTH'), AuthController.verify2FA);
router.post('/2fa/disable', authenticate, logAudit('DISABLE_2FA', 'AUTH'), AuthController.disable2FA);

export default router;
