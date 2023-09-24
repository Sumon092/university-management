/* eslint-disable no-console */
import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterFromEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.services';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterFromEvent = JSON.parse(e);
    console.log(data);
    await AcademicSemesterService.createSemesterFromEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterService.updateSemesterFromEvent(data);
    console.log('UPDATED', data);
  });
};

export default initAcademicSemesterEvents;
