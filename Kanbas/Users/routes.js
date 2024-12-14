import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => { 
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => { 
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  
  const updateUser = async (req, res) => { 
		const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if(currentUser && currentUser._id === userId){
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);

	};

  const signup = async (req, res) => { 
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json(
				{ message: "Username already in use" });
			return;
		}
		const currentUser = await dao.createUser(req.body);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};

  const signin = async (req, res) => { 
    console.log('Signin request headers:', req.headers);
		const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
	};

  const signout = async (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	 };

  const profile = async (req, res) => {
		const currentUser = req.session["currentUser"];
		if(!currentUser) {
			res.sendStatus(401);
			return;
		}
		res.json(currentUser);
	 };

	const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  const updateEmail = async (req, res) => {
    const { email } = req.params;
    const emailUpdates = req.body;
    await dao.updateEmail(email, emailUpdates);
    const currentEmail = req.session["currentEmail"];
    if(currentEmail && currentEmail.email === email) {
      req.session["currentEmail"] = { ...currentEmail, ...emailUpdates };
    }
    res.json(currentEmail);
  };
  app.put("/api/users/email", updateEmail);

  const updateRole = async (req, res) => {
    const { role } = req.params;
    const roleUpdates = req.body;
    await dao.updateRole(role, roleUpdates);
    const currentRole = req.session["currentRole"];
    if(currentRole && currentRole.role === role) {
      req.session["currentRole"] = { ...currentRole, ...roleUpdates };
    }
    res.json(currentRole);
  };

  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/users/:uid/courses", findCoursesForUser);
  app.get("/api/users/:userId", findUserById);
  
  app.put("/api/users/role", updateRole);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);


 
}