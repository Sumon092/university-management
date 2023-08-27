import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.Validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.update),
  AcademicDepartmentController.updateDepartment
);
router.post(
  '/create',
  validateRequest(academicDepartmentValidation.create),
  AcademicDepartmentController.createDepartment
);
router.get('/', AcademicDepartmentController.getDepartments);
router.get('/:id', AcademicDepartmentController.getDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;
