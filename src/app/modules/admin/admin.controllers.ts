import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constants';
import { AdminServices } from './admin.services';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, adminFilterableFields);
  const options = pick(req.body, ['page', 'limit', 'sortBy', 'sortOrder']);

  const results = await AdminServices.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admin data fetched successful',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const results = await AdminServices.getSingleAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data fetched successful',
    data: results,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payLoad = req.body;

  const results = await AdminServices.updateAdmin(id, payLoad);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin update successful',
    data: results,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const results = await AdminServices.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin delete successful',
    data: results,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
