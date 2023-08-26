import { IGenericResponse } from '../../../interfaces/common';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payLoad: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payLoad)).populate(
    'academicFaculty'
  );
  return result;
};

const getDepartments = async (): Promise<
  IGenericResponse<IAcademicDepartment[]>
> => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page: 1,
      limit: 10,
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

export const AcademicDepartmentService = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
