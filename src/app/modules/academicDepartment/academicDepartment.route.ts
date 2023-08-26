import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.patch('/:id', AcademicDepartmentController.updateDepartment);
router.post('/create', AcademicDepartmentController.createDepartment);
router.get('/', AcademicDepartmentController.getDepartments);
router.get('/:id', AcademicDepartmentController.getDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;
