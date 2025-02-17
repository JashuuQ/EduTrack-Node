import * as dao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";

export default function EnrollmentsRoutes(app) {
    
  // Get all enrollments for a user
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = dao.findEnrollmentsByUserId(userId);
      const courses = enrollments.map((enrollment) =>
        coursesDao.findCourseById(enrollment.course)
      );
      res.json(courses);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // Enroll a user in a course
  app.post("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const { courseId } = req.body;
    try {
      const newEnrollment = dao.createEnrollment({ user: userId, course: courseId });
      res.status(201).json(newEnrollment);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const status = dao.deleteEnrollment(userId, courseId);
      if (status) {
        res.send({ message: "Successfully unenrolled" });
      } else {
        res.status(404).send({ error: "Enrollment not found" });
      }
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // Get all users enrolled in a specific course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    try {
      const enrollments = dao.findEnrollmentsByCourseId(courseId);
      const users = enrollments.map((enrollment) => dao.findUserById(enrollment.user));
      res.json(users);
    } catch (error) {
      console.error("Error fetching users enrolled in course:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
}
