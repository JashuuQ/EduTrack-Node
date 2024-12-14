import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await assignmentDao.findAssignmentById(assignmentId);
    res.json(assignment);
  });

  app.post("/api/assignments", async (req, res) => {
    const assignment = req.body;
    try {
      const newAssignment = await assignmentDao.createAssignment(assignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).send({ error: "Failed to create assignment" });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdate = req.body;
    const updatedAssignment = await assignmentDao.updateAssignment(assignmentId, assignmentUpdate);
    res.json(updatedAssignment);
  });


  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignmentDao.deleteAssignment(assignmentId);
    res.json({ success: true });

  });
}