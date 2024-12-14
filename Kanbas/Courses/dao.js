import model from "./model.js";

export function findAllCourses() {
  return model.find();
};

export function createCourse(course) {
  delete course._id;
  return model.create(course);
};

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
};

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
};
// import Database from '../Database/index.js';

// Database.courses = Database.courses || [];
// Database.enrollments = Database.enrollments || [];

// export function createCourse(req, res) {
//   console.log('Request body:', req.body);
//   const { name, description, credits, number, startDate, endDate } = req.body;

//   if (!name || !description || !credits || !number || !startDate || !endDate) {
//     return res.status(400).json({ error: 'Missing required fields.' });
//   }

//   const newCourse = { ...req.body, _id: Date.now().toString() };

//   Database.courses = [...Database.courses, newCourse];
//   console.log('New course created:', newCourse);
//   res.status(201).json(newCourse);
// }

// export function findAllCourses() {
//   console.log('Database Courses:', Database.courses);
//   return Database.courses;
// }

// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   if (Array.isArray(enrollments)) {
//     Database.enrollments = enrollments.filter(
//       (enrollment) => enrollment.course !== courseId
//     );
//   }
// }

// export function updateCourse(courseId, courseUpdates) {
//   const { courses } = Database;
//   const course = courses.find((course) => course._id === courseId);
//   if (!course) {
//     throw new Error(`Course with ID ${courseId} not found.`);
//   }
//   Object.assign(course, courseUpdates);
//   return course;
// }

// export function findCoursesForEnrolledUser(userId) {
//   console.log(userId, Database.courses, '>>>>>>>');
//   return Database.courses.filter((course) =>
//     Database.enrollments.some(
//       (enrollment) =>
//         enrollment.course === course._id)
//   );
// }
