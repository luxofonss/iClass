import { AssignmentViewSchema } from "./assignment.schema";
import { ConversationSchema } from "./conversation.schema";

export type CourseCreateSchema = {
	name: string;
	description: string;
	background_img?: string;
	startDate?: string;
	endDate?: string;
	price?: number;
	currency?: string;
	level?: string;
	subjectId: string;
	grade?: number | string;
	course_infos?: CourseInfoSchema[];
	sections?: SectionSchema[];
	conversations: ConversationSchema[];
};

export type CourseUpdateSchema = {
	id: string;
	name: string;
	description: string;
	backgroundImage: string;
	thumbnail: string;
	startDate: string;
	endDate: string;
	price: number;
	currency: string;
	level: string;
	subjectId: string;
	grade?: number | string;
	courseInfos: CourseInfoSchema[];
	sections: SectionSchema[];
};

export type CourseViewSchema = {
	id: string;
	name: string;
	description: string;
	backgroundImage: string;
	thumbnail: string | null;
	code: string;
	startDate: string;
	endDate: string;
	price: number;
	currency: string;
	level: string;
	subject: {
		id: string;
		name: string;
	};
	teacher: {
		first_name: string;
		last_name: string;
		avatar?: string;
	};
	grade: number | string;
	courseInfos?: CourseInfoSchema[];
	sections?: SectionSchema[];
	createdAt?: string;
	conversations: ConversationSchema[];
};

export type SimpleCourseView = {
	id: string;
	deleted_at: string;
	created_at: string;
	updated_at: string;
	name: string;
	description: string;
	backgroundImg: string;
	startDate: string;
	endDate: string;
	price: number;
	currency: string;
	level: string;
	isVerified: boolean;
	subjectId: string;
	grade: string;
	thumbnail: string;
	conversations: ConversationSchema[];
};

export type CourseInfoSchema = {
	type: string;
	content: string;
};

export type SectionSchema = {
	id?: string;
	name: string;
	description: string;
	lectures: LectureSchema[];
	lessons: LectureSchema[];
};

export type LectureSchema = {
	id?: string;
	name: string;
	description: string;
	order: number;
	type: string;
	video_url: string;
	lessonStudent: LessonStudent;
	createdAt: string;
	conversations: ConversationSchema[];
	assignment: AssignmentViewSchema;
};

export type SubjectSchema = {
	id: string;
	name: string;
	description: string;
	thumbnail_url: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
};

export type LessonStudent = {
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
};
