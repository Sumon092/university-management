import { Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.getAllSemester(
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All semester data retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
