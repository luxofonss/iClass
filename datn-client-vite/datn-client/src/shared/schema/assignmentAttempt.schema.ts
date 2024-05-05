import { UserSchema } from "./user.schema";

export type AssignmentAttemptSchema = {
	id: string;
	student: UserSchema;
	startTime: string;
	endTime: string;
	submittedAt: string;
	teacherComment: string;
	totalMark: string;
	createdAt: string;
	updatedAt: string;
};
