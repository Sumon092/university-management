/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { facultySearchableFields } from './faculty.constants';
import { Faculty } from './faculty.model';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';

const getAllFaculty = async (
  filters: IFacultyFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const results = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await Faculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: results,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ _id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateFaculty = async (
  id: string,
  payLoad: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const { name, ...facultyData } = payLoad;
  const updatedFacultyData = facultyData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const exist = await Faculty.findOne({ id });
  if (!exist) {
    throw new ApiError(404, 'Faculty not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!deletedFaculty) {
      throw new ApiError(404, 'Faculty not found');
    }

    const deletedUser = await User.findOneAndDelete({ id }, { session });
    if (!deletedUser) {
      throw new ApiError(404, 'User not found');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const FacultyServices = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
