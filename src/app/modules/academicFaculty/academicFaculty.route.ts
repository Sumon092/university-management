import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { ENUM_USERS_ROLE } from '../../../enum/user';

const router = express.Router();
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.update),
  auth(
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY,
    ENUM_USERS_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.updateAcademicFaculty
);
router.post(
  '/create',
  validateRequest(academicFacultyValidation.create),
  auth(ENUM_USERS_ROLE.ADMIN, ENUM_USERS_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createAcademicFaculty
);
router.get(
  '/',
  auth(ENUM_USERS_ROLE.ADMIN, ENUM_USERS_ROLE.SUPER_ADMIN),
  AcademicFacultyController.getAcademicFaculties
);
router.get(
  '/:id',
  auth(
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY,
    ENUM_USERS_ROLE.STUDENT,
    ENUM_USERS_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getAcademicFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.ADMIN, ENUM_USERS_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteAcademicFaculty
);
export const AcademicFacultyRoutes = router;
