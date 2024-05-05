import { AssignmentAttemptSchema } from "./assignmentAttempt.schema";

export type AssignmentCreateSchema = {
	startTime?: string;
	endTime?: string;
	duration: number;
	assignmentType: string;
	lessonId: string;
	multipleAttempts: boolean;
	title: string;
	description: string;
	subjectId: string;
	questions: QuestionSchema[];
	maxAttemptTimes: number;
	attempts: AssignmentAttemptSchema[];
};

export type AssignmentViewSchema = {
	id: string;
	startTime?: string;
	endTime?: string;
	assignmentType: string;
	lessonId: string;
	multipleAttempts: boolean;
	title: string;
	description: string;
	totalPoint: number;
	subjectId: string;
	questions: QuestionSchema[];
	attempts: AssignmentAttemptSchema[];
};

export type QuestionSchema = {
	title: string;
	image?: string;
	audio?: string;
	type: string;
	level: string;
	subjectId: string;
	order: number;
	mark: number;
	choices: ChoiceSchema[];
	answerExplanation: string;
};

export type ChoiceSchema = {
	content: string;
	order: number;
	isCorrect: boolean;
};
