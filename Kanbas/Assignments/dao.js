import Database from "../Database/index.js";

Database.assignments = Database.assignments || [];

// Create
export function createAssignment(req, res) {
  const { title, description, dueDate, courseId } = req.body;
  if (!title || !description || !dueDate || !courseId) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newAssignment = { ...req.body, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  console.log("New assignment created:", newAssignment);
  res.status(201).json(newAssignment);
}

// Retrieve
export function findAllAssignments() {
  console.log("Database Assignments:", Database.assignments);
  return Database.assignments;
}

// Update
export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found.`);
  }
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

// Delete
export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
}

