import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constants';
import {
  AcademicFacultyCreatedEvent,
  AcademicFacultyDeletedEvent,
  AcademicFacultyUpdatedEvent,
} from './academicFaculty.interface';
import { AcademicFacultyServices } from './academicFaculty.services';

const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
    const data: AcademicFacultyCreatedEvent = JSON.parse(e);

    await AcademicFacultyServices.insertIntoDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
    const data: AcademicFacultyUpdatedEvent = JSON.parse(e);

    await AcademicFacultyServices.updateOneInDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
    const data: AcademicFacultyDeletedEvent = JSON.parse(e);

    await AcademicFacultyServices.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicFacultyEvents;
