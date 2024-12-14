// import Database from "../Database/index.js";
import model from "./model.js";

export async function updateAssignment(assignmentId, assignmentUpdate) {
  // const { assignments } = Database;
  // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  // if (!assignment) {
  //   throw new Error(`Assignment with ID ${assignmentId} not found.`);
  // }
  // Object.assign(assignment, assignmentUpdate);
  // return assignment;
  return await model.updateOne({_id: assignmentId}, { $set: assignmentUpdate });
}

export function deleteAssignment(assignmentId) {
  // const { assignments } = Database;
  // const assignmentExists = assignments.some((assignment) => assignment._id === assignmentId);
  // if (!assignmentExists) {
  //   throw new Error(`Assignment with ID ${assignmentId} not found.`);
  // }
  // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  // return { success: true };
  return model.deleteOne({ _id: assignmentId });
}

export function createAssignment(assignment) {
  // const newAssignment = { ...assignment, _id: Date.now().toString() };
  // Database.assignments = [...Database.assignments, newAssignment];
  // return newAssignment;
  delete assignment._id;
  return model.create(assignment);
}

export async function findAssignmentsForCourse(courseId) {
  // const { assignments } = Database;
  // return assignments.filter((assignment) => assignment.course === courseId);
  return await model.find({ course: courseId });
}

export async function findAssignmentById(assignmentId) {
  // const { assignments } = Database;
  // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  // if (!assignment) {
  //   throw new Error(`Assignment with ID ${assignmentId} not found.`);
  // }
  // return assignment;
  return await model.findOne({ _id: assignmentId});
}