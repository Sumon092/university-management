import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.update),
  AcademicFacultyController.updateAcademicFaculty
);
router.post(
  '/create',
  validateRequest(academicFacultyValidation.create),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/', AcademicFacultyController.getAcademicFaculties);
router.get('/:id', AcademicFacultyController.getAcademicFaculty);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);
export const AcademicFacultyRoutes = router;
