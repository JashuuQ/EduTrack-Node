import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      if (!user) {
        return res.status(400).json({ message: "User creation failed." });
      }
      res.status(201).json(user);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const success = await dao.deleteUser(userId);
      if (success) {
        return res.sendStatus(200);
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  app.delete("/api/users/:userId", deleteUser);


  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  const updateUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const userUpdates = req.body;
      await dao.updateUser(userId, userUpdates);
      const updatedUser = await dao.findUserById(userId);
      req.session["currentUser"] = updatedUser;
      res.json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  app.put("/api/users/:userId", updateUser);

  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          return res.sendStatus(401);
        }
        userId = currentUser._id;
      }
      const courses = await courseDao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);


  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      const newCourse = await courseDao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  app.post("/api/users/current/courses", createCourse);
  // const createUser = (req, res) => {
  //   const user = dao.createUser(req.body);
  //   if (!user) {
  //     res.status(400).json({ message: "User creation failed." });
  //     return;
  //   }
  //   res.status(201).json(user);
  // };
  // app.post("/api/users", createUser);
  

  // const deleteUser = (req, res) => {
  //   const { userId } = req.params;
  //   const success = dao.deleteUser(userId);
  //   if (success) {
  //     res.sendStatus(200);
  //   } else {
  //     res.status(404).json({ message: "User not found." });
  //   }
  // };
  // app.delete("/api/users/:userId", deleteUser);
  
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);
  

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  };
  app.get("/api/users/:userId", findUserById);
  
  // Account related
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);

    console.log('POST /api/users/signin called');
    res.status(200).send('Signin endpoint working');

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  app.post("/api/users/signin", signin);



  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);


  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);



  // User related
  // const updateUser = (req, res) => {
  //   const userId = req.params.userId;
  //   const userUpdates = req.body;
  //   dao.updateUser(userId, userUpdates);
  //   const currentUser = dao.findUserById(userId);
  //   req.session["currentUser"] = currentUser;
  //   res.json(currentUser);
  // };
  // app.put("/api/users/:userId", updateUser);


  // const findCoursesForEnrolledUser = (req, res) => {
  //   let { userId } = req.params;
  //   if (userId === "current") {
  //     const currentUser = req.session["currentUser"];
  //     if (!currentUser) {
  //       res.sendStatus(401);
  //       return;
  //     }
  //     userId = currentUser._id;
  //   }
  //   const courses = courseDao.findCoursesForEnrolledUser(userId);
  //   res.json(courses);
  // };
  // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);


  // const createCourse = (req, res) => {
  //   const currentUser = req.session["currentUser"];
  //   const newCourse = courseDao.createCourse(req.body);
  //   enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
  //   res.json(newCourse);
  // };
  // app.post("/api/users/current/courses", createCourse);

  
  // app.get('/api/users', (req, res) => {
  //   console.log('GET /api/users request received');
  //   res.json({ message: 'Users endpoint is working!' });
  // });
  
}
