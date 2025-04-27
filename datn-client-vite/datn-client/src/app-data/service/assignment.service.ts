/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import { AssignmentCreateSchema } from "@/shared/schema/assignment.schema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const assignmentApi = createApi({
	reducerPath: "assignmentApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createAssignment: build.mutation<
			{ success: boolean; data: AssignmentCreateSchema },
			any
		>({
			query: (body) => {
				return {
					url: "/assignments/",
					method: "POST",
					body: body,
				};
			},
		}),
		updateAssignment: build.mutation<
			{ success: boolean; data: AssignmentCreateSchema },
			any
		>({
			query: (body) => {
				return {
					url: `/assignments/${body?.id}`,
					method: "PUT",
					body: body,
				};
			},
		}),
		getOneById: build.query({
			query: (id) => {
				return {
					url: `/assignments/${id}`,
					method: "GET",
				};
			},
		}),
		getAllByCourseId: build.query<any, { courseId: string }>({
			query: (params) => {
				return {
					url: `/assignments/`,
					method: "GET",
					params,
				};
			},
		}),
		getAllByCourseIdTeacher: build.query<any, { courseId: string }>({
			query: (params) => {
				return {
					url: `/assignments/teacher`,
					method: "GET",
					params,
				};
			},
		}),
		attemptAssignment: build.mutation<any, string>({
			query: (id) => {
				return {
					url: `/assignments/${id}/attempts`,
					method: "POST",
				};
			},
		}),
		getAssignmentAttempt: build.query<any, string>({
			query: (id) => {
				return {
					url: `/assignments/attempts/${id}`,
					method: "GET",
				};
			},
		}),

		getAttemptsByAssignmentId: build.query<any, { assignmentId: string }>({
			query: (params) => {
				return {
					url: `/assignments/attempts`,
					method: "GET",
					params,
				};
			},
		}),

		submitAnswer: build.mutation<
			any,
			{
				attemptId: string;
				questionId: string;
				answer: {
					selectedOptionIds?: string[];
					textAnswer?: string;
				};
			}
		>({
			query: (body) => {
				return {
					url: `/assignments/attempts/${body.attemptId}/questions/${body.questionId}`,
					method: "POST",
					body: body.answer,
				};
			},
		}),
		getAlAssignmentAttemptResults: build.query<
			any,
			{ assignment_id: string }
		>({
			query: (params) => {
				return {
					url: `/teacher/assignments/attempt/get-all-attempts`,
					method: "GET",
					params: params,
				};
			},
		}),
		getAssignmentAttemptDetail: build.query<
			any,
			{ assignment_attempt_id: string }
		>({
			query: (params) => {
				return {
					url: `/assignments/attempt-result/${params.assignment_attempt_id}`,
					method: "GET",
				};
			},
		}),
		addFeedbackAnswer: build.mutation<
			any,
			{
				answerId: string;
				attemptId: string;
				data: { id: string; message: string; type: string };
			}
		>({
			query: (body) => {
				return {
					url: `/assignments/attempts/${body.attemptId}/answers/${body.answerId}/feedbacks`,
					method: "POST",
					body: body.data,
				};
			},
		}),
		updateFeedbackAnswer: build.mutation<
			any,
			{
				answerId: string;
				attemptId: string;
				data: { id: string; message: string; type: string };
			}
		>({
			query: (body) => {
				return {
					url: `/assignments/attempts/${body.attemptId}/answers/${body.answerId}/feedbacks/${body.data.id}`,
					method: "PUT",
					body: body.data,
				};
			},
		}),
		deleteFeedbackAnswer: build.mutation<
			any,
			{
				answerId: string;
				attemptId: string;
				feedbackId: string;
			}
		>({
			query: (body) => {
				return {
					url: `/assignments/attempts/${body.attemptId}/answers/${body.answerId}/feedbacks/${body.feedbackId}`,
					method: "DELETE",
				};
			},
		}),
		feedbackEditAnswerContent: build.mutation<
			any,
			{
				attemptId: string;
				answerId: string;
				data: {
					content: string;
				};
			}
		>({
			query: (body) => {
				return {
					url: `/assignments/attempts/${body.attemptId}/answers/${body.answerId}/fix-answer`,
					method: "PUT",
					body: body.data,
				};
			},
		}),
		submitAssignment: build.mutation<any, { attemptId: string }>({
			query: (params) => {
				return {
					url: `/assignments/attempts/${params.attemptId}/submit`,
					method: "POST",
				};
			},
		}),
		scoreLongAnswer: build.mutation<
			any,
			{ attemptId: string; questionId: string; score: number }
		>({
			query: (params) => {
				return {
					url: `/assignments/attempts/${params.attemptId}/questions/${params.questionId}/score`,
					method: "POST",
					body: { score: params.score },
				};
			},
		}),
		getAllAssignmentAttemptInCourse: build.query<
			any,
			{ course_id: string }
		>({
			query: (params) => {
				return {
					url: `http://localhost:8080/v1/courses/${params.course_id}/assignment-attempts`,
					method: "GET",
				};
			},
		}),
	}),
});
