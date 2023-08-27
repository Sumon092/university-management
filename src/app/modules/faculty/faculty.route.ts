import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.patch('/:id', FacultyControllers.updateFaculty);
router.get('/', FacultyControllers.getAllFaculty);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id', FacultyControllers.deleteFaculty);
export const FacultyRoutes = router;
