import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';

export const createSemester = async (payload: IAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
