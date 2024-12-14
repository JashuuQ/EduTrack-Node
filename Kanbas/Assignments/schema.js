import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		points: Number,
		dueDate: Date,
		availableFrom: Date,
		until: Date,
		course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
	},
	{ collection: "assignments" }
);
export default assignmentSchema;