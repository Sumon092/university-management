import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentUpdatedEvent,
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const createDepartment = async (
  payLoad: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payLoad)).populate(
    'academicFaculty'
  );
  return result;
};

const getDepartments = async (
  filters: IAcademicDepartmentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payLoad: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndDelete({ _id: id });
  return result;
};

const insertIntoDBFromEvent = async (
  e: AcademicDepartmentCreatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };

  await AcademicDepartment.create(payload);
};

const updateOneInDBFromEvent = async (
  e: AcademicDepartmentUpdatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDepartment.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: payload,
    }
  );
};

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};

export const AcademicDepartmentService = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};
