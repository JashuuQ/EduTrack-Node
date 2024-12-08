import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  
  app.get("/api/assignments", (req, res) => {
    try {
      const assignments = assignmentsDao.findAllAssignments();
      res.send(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.post("/api/assignments", (req, res) => {
    assignmentsDao.createAssignment(req, res);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      res.send(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(404).send({ error: "Assignment not found." });
    }
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });

}  