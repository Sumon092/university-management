import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.services';
import { sendResponse } from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.createDepartment(req.body);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});
const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await AcademicDepartmentService.getDepartments(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department get successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payLoad = req.body;
  const result = await AcademicDepartmentService.updateDepartment(id, payLoad);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department delete successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
