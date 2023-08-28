import express from 'express';
import { AdminControllers } from './admin.controllers';
const router = express.Router();

router.patch('/:id', AdminControllers.updateAdmin);
router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
