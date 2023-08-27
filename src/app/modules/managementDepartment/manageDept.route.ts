// import express from 'express';
// import validateRequest from '../../middleware/validateRequest';
// import { ManagementDepartmentValidation } from './manageDept.validation';
// import { ManagementDepartmentController } from './manageDept.controller';
// import { ENUM_USERS_ROLE } from '../../../enum/user';

// const router = express.Router();
// export const auth={}

// router.post(
//   '/create-department',
//   validateRequest(
//     ManagementDepartmentValidation.createManagementDepartmentZodSchema
//   ),
//   auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
//   ManagementDepartmentController.createDepartment
// );

// router.get(
//   '/:id',
//   auth(
//     ENUM_USERS_ROLE.SUPER_ADMIN,
//     ENUM_USERS_ROLE.ADMIN,
//     ENUM_USERS_ROLE.FACULTY,
//     ENUM_USERS_ROLE.STUDENT
//   ),
//   ManagementDepartmentController.getSingleDepartment
// );

// router.patch(
//   '/:id',
//   validateRequest(
//     ManagementDepartmentValidation.updateManagementDepartmentZodSchema
//   ),
//   auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
//   ManagementDepartmentController.updateDepartment
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USERS_ROLE.SUPER_ADMIN),
//   ManagementDepartmentController.deleteDepartment
// );

// router.get(
//   '/',
//   auth(
//     ENUM_USERS_ROLE.SUPER_ADMIN,
//     ENUM_USERS_ROLE.ADMIN,
//     ENUM_USERS_ROLE.FACULTY,
//     ENUM_USERS_ROLE.FACULTY,
//     ENUM_USERS_ROLE.STUDENT
//   ),
//   ManagementDepartmentController.getAllDepartments
// );

// export const ManagementDepartmentRoutes = router;
