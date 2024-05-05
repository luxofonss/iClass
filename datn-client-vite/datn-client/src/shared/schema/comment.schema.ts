import { UserSchema } from "./user.schema";

export type CommentSchema = {
	id: string;
	content: string;
	user: UserSchema;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
};
