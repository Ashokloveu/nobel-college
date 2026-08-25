import { Router } from 'express';
import { AcademicController } from '../controllers/academic.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/rbac.middleware';
import { logAudit } from '../middlewares/auditLog.middleware';

const router = Router();

// Public Academic Endpoints
router.get('/departments', AcademicController.listDepartments);
router.get('/departments/:slug', AcademicController.getDepartmentBySlug);
router.get('/programs', AcademicController.listPrograms);
router.get('/programs/:slug', AcademicController.getProgramBySlug);
router.get('/faculty', AcademicController.listFaculty);
router.get('/faculty/:slug', AcademicController.getFacultyBySlug);

// Protected Admin Departments Routes
router.post(
  '/departments',
  authenticate,
  requirePermission('departments.create'),
  logAudit('CREATE_DEPARTMENT', 'ACADEMICS'),
  AcademicController.createDepartment
);
router.put(
  '/departments/:id',
  authenticate,
  requirePermission('departments.update'),
  logAudit('UPDATE_DEPARTMENT', 'ACADEMICS'),
  AcademicController.updateDepartment
);
router.delete(
  '/departments/:id',
  authenticate,
  requirePermission('departments.delete'),
  logAudit('DELETE_DEPARTMENT', 'ACADEMICS'),
  AcademicController.deleteDepartment
);

// Protected Admin Programs Routes
router.post(
  '/programs',
  authenticate,
  requirePermission('programs.create'),
  logAudit('CREATE_PROGRAM', 'ACADEMICS'),
  AcademicController.createProgram
);
router.put(
  '/programs/:id',
  authenticate,
  requirePermission('programs.update'),
  logAudit('UPDATE_PROGRAM', 'ACADEMICS'),
  AcademicController.updateProgram
);
router.delete(
  '/programs/:id',
  authenticate,
  requirePermission('programs.delete'),
  logAudit('DELETE_PROGRAM', 'ACADEMICS'),
  AcademicController.deleteProgram
);

// Protected Admin Faculty Routes
router.post(
  '/faculty',
  authenticate,
  requirePermission('faculty.create'),
  logAudit('CREATE_FACULTY', 'ACADEMICS'),
  AcademicController.createFaculty
);
router.put(
  '/faculty/:id',
  authenticate,
  requirePermission('faculty.update'),
  logAudit('UPDATE_FACULTY', 'ACADEMICS'),
  AcademicController.updateFaculty
);
router.delete(
  '/faculty/:id',
  authenticate,
  requirePermission('faculty.delete'),
  logAudit('DELETE_FACULTY', 'ACADEMICS'),
  AcademicController.deleteFaculty
);

export default router;
