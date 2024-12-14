import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
	{
		/* add quiz attributes */
		id: String,
		course: String,
		title: String,
		points_possible: Number,
		quiz_type: String,
		assignment_group_id: String,
		assignment_group_type: String,
		shuffle_answers: Boolean,
		allowed_attempts: Boolean,
		attempts_number: Number,
		show_correct_answers: Boolean,
		one_question_at_a_time: Boolean,
		has_access_code: Boolean,
		require_lockdown_browser: Boolean,
		cant_go_back: Boolean,
		due_at: String,
		unlock_at: String,
		lock_at: String,
		description: String,
		time_limit: Number,
		questions: Array,
		is_published: Boolean,
		cid: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
	},
	{ collection: "quizzes" }
);
export default quizSchema;