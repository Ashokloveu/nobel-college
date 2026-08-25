import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

router.post('/', ContactController.submitPublicContact);

router.get('/', authenticate, requirePermission('contacts.read'), ContactController.listAdminContacts);
router.get('/:id', authenticate, requirePermission('contacts.read'), ContactController.getById);
router.patch(
  '/:id/status',
  authenticate,
  requirePermission('contacts.update'),
  logAudit('UPDATE_CONTACT_STATUS', 'CONTACT_INBOX'),
  ContactController.updateStatus
);

export default router;
