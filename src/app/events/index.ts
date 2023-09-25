import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.event';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculties.event';
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicFacultyEvents();
  initAcademicDepartmentEvents();
};
export default subscribeToEvents;
