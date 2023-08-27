import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './students.constants';

const getAllStudent = async (
  filters: IStudentFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
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
  const result = await Student.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateStudent = async (
  id: string,
  payLoad: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await Student.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOneAndDelete({ _id: id });
  return result;
};

export const StudentServices = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
