import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
}

// import * as dao from "./dao.js";
// import * as modulesDao from "../Modules/dao.js";

// export default function CourseRoutes(app) {
//   app.get("/api/courses", (req, res) => {
//     try {
//         const courses = dao.findAllCourses();
//         res.send(courses);
//     } catch (error) {
//         console.error("Error fetching courses:", error);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// });

//   app.delete("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const status = dao.deleteCourse(courseId);
//     res.send(status);
//   });

//   app.put("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const courseUpdates = req.body;
//     const status = dao.updateCourse(courseId, courseUpdates);
//     res.send(status);
//   });

//   app.post("/api/courses/:courseId/modules", (req, res) => {
//     const { courseId } = req.params;
//     const module = {
//       ...req.body,
//       course: courseId,
//     };
//     const newModule = modulesDao.createModule(module);
//     res.send(newModule);
//   });


//   app.get("/api/courses/:courseId/modules", (req, res) => {
//     const { courseId } = req.params;
//     const modules = modulesDao.findModulesForCourse(courseId);
//     res.json(modules);
//   });

// }

// export function findCoursesForEnrolledUser(userId) {
//   const { courses, enrollments } = Database;
//   const enrolledCourses = courses.filter((course) =>
//     enrollments.some((enrollment) => 
//       enrollment.user === userId && enrollment.course === course._id));
//   return enrolledCourses;
// }
