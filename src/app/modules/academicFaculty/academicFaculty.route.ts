import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post('/create', AcademicFacultyController.createAcademicFaculty);
router.get('/', AcademicFacultyController.getAcademicFaculties);
export const AcademicFacultyRoutes = router;
