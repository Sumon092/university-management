/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constants';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IAdmin[] | null>> => {
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
      $or: adminSearchableFields.map(field => ({
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
  const results = await Admin.find(whereConditions)
    .sort(sortConditions)
    .limit(limit)
    .skip(skip);
  const total = await Admin.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: results,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id });

  return result;
};

const updateAdmin = async (
  id: string,
  payLoad: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const exist = await Admin.findOne({ id });
  if (!exist) {
    throw new ApiError(404, 'Admin not found');
  }
  const { name, ...adminData } = payLoad;
  const updatedAdminData: Partial<IAdmin> = adminData;
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const exist = await Admin.findOne({ id });
  if (!exist) {
    throw new ApiError(404, 'Admin not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const admin = await Admin.findOneAndDelete({ id }, { session });
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }

    const user = await User.findOneAndDelete({ id }, { session });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    await session.commitTransaction();
    await session.endSession();
    return admin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
