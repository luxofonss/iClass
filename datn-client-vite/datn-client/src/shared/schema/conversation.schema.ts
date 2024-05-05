/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommentSchema } from "./comment.schema";
import { CourseViewSchema, LectureSchema } from "./course.schema";
import { UserSchema } from "./user.schema";

export type ConversationSchema = {
	id: string;
	type: string;
	content: string;
	user: UserSchema;
	course: CourseViewSchema;
	lesson: LectureSchema;
	comments: CommentSchema[];
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
};
