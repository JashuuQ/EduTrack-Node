import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

// import Database from "../Database/index.js";

// Database.enrollments = Database.enrollments || [];

// export function findAllEnrollments() {
//   return Database.enrollments;
// }

// export function enrollUser(req, res) {
//   const { userId, courseId } = req.body;
//   if (!userId || !courseId) {
//     return res.status(400).json({ error: "Missing required fields." });
//   }
//   const newEnrollment = { userId, courseId, _id: Date.now().toString() };
//   Database.enrollments = [...Database.enrollments, newEnrollment];
//   console.log("User enrolled:", newEnrollment);
//   res.status(201).json(newEnrollment);
// }

// export function unenrollUser(enrollmentId) {
//   Database.enrollments = Database.enrollments.filter((e) => e._id !== enrollmentId);
// }

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }
