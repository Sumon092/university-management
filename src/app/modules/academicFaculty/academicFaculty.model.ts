import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface';
import { Schema, model } from 'mongoose';

const AcademicFaultySchema = new Schema<IAcademicFaculty, AcademicFacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    syncId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFaultySchema
);
