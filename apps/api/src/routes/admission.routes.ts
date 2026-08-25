import { Router } from 'express';
import { AdmissionController } from '../controllers/admission.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

// Public Form Submission
router.post('/', AdmissionController.submitPublicInquiry);

// Admin CRM Protected Endpoints
router.get('/', authenticate, requirePermission('admissions.read'), AdmissionController.listAdminInquiries);
router.get('/:id', authenticate, requirePermission('admissions.read'), AdmissionController.getById);
router.patch(
  '/:id/status',
  authenticate,
  requirePermission('admissions.update'),
  logAudit('UPDATE_ADMISSION_STATUS', 'ADMISSION_CRM'),
  AdmissionController.updateStatusAndNotes
);

export default router;
