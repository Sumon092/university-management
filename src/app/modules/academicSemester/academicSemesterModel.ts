import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemister.interface';

const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: ['Autumn', 'Summer', 'Fall'],
  },
  year: {
    required: true,
    type: Number,
    enum: ['01', '02', '03'],
  },
  code: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Month,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Month,
  },
});

export const AcademicSemesterSchema = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
