import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post('/create-faculty', UserController.createFaculty);
router.post('/create-admin', UserController.createAdmin);
export const UserRoutes = router;
