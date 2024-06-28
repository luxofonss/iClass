/* eslint-disable @typescript-eslint/no-explicit-any */
import customFetchBase from "@/shared/configs/customFetchBase";
import {
	CourseCreateSchema,
	CourseUpdateSchema,
	CourseViewSchema,
} from "@/shared/schema/course.schema";
import { ErrorResponse } from "@/types/index";
import { createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
	reducerPath: "courseApi",
	baseQuery: customFetchBase,
	endpoints: (build) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createCourse: build.mutation<any, CourseCreateSchema>({
			query: (body) => {
				return {
					url: "/courses/",
					method: "POST",
					body: body,
					headers: {
						"content-type": "application/json",
					},
				};
			},
		}),
		updateCourse: build.mutation<any, CourseUpdateSchema>({
			query: (body) => {
				return {
					url: `/courses/${body.id}`,
					method: "PUT",
					body: body,
					headers: {
						"content-type": "application/json",
					},
				};
			},
		}),
		getCourseById: build.query<
			{ error: ErrorResponse; data: CourseViewSchema },
			{ id: string }
		>({
			query: ({ id }) => {
				return {
					url: `/courses/${id}`,
					method: "GET",
				};
			},
		}),
		getSubjects: build.query<any, any>({
			query: () => {
				return {
					url: "/subjects",
					method: "GET",
				};
			},
		}),
		getAllCreatedCourses: build.query<any, any>({
			query: () => {
				return {
					url: "/courses/my-courses",
					method: "GET",
				};
			},
		}),
		getAllSectionInCourse: build.query<any, { id: string }>({
			query: ({ id }) => {
				return {
					url: `/courses/${id}/sections`,
					method: "GET",
				};
			},
		}),
		getAllActiveCourses: build.query<any, any>({
			query: () => {
				return {
					url: "/courses/active",
					method: "GET",
				};
			},
		}),
		joinCourseByCode: build.mutation<any, { code: string }>({
			query: (body) => {
				return {
					url: `/courses/register-with-code`,
					method: "POST",
					body: body,
				};
			},
		}),
		getMyEnrolledCourses: build.query<any, any>({
			query: () => {
				return {
					url: "/courses/my-registered-courses",
					method: "GET",
				};
			},
		}),
		getAssignmentsInCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `http://localhost:8080/v1/courses/${id}/assignments`,
					method: "GET",
				};
			},
		}),

		// TEACHER
		getAllEnrolledStudents: build.query<any, { id: string }>({
			query: ({ id }) => {
				return {
					url: `/courses/${id}/students`,
					method: "GET",
				};
			},
		}),
		deleteCourseEnrollment: build.mutation<any, { id: string }>({
			query: (body) => {
				return {
					url: `/courses/enrolls`,
					method: "PUT",
					body: {
						...body,
						status: "INACTIVE",
					},
				};
			},
		}),
		enableCourseEnrollment: build.mutation<any, { id: string }>({
			query: (body) => {
				return {
					url: `/courses/enrolls`,
					method: "PUT",
					body: {
						...body,
						status: "ACTIVE",
					},
				};
			},
		}),
		addStudentToCourse: build.mutation<
			any,
			{ id: string; body: { emails: string } }
		>({
			query: (body) => {
				return {
					url: `/courses/${body.id}/students/add-many`,
					method: "POST",
					body: body.body,
				};
			},
		}),
		addSection: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections`,
				method: "POST",
				body: { sections: [body.data] },
			}),
		}),

		updateSection: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections`,
				method: "PUT",
				body: { sections: [body.data] },
			}),
		}),
		deleteSection: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections`,
				method: "DELETE",
				body: { sections: [body.data] },
			}),
		}),
		addLesson: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections/${body.sectionId}/lessons`,
				method: "POST",
				body: { lessons: [body.data] },
			}),
		}),
		updateLesson: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections/${body.sectionId}/lessons`,
				method: "PUT",
				body: { lessons: [body.data] },
			}),
		}),
		deleteLesson: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections/${body.sectionId}/lessons`,
				method: "DELETE",
				body: { lessons: [body.data] },
			}),
		}),

		addStudyStatus: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections/${body.sectionId}/lessons/${body.lessonId}/study-status`,
				body: body.data,
				method: "POST",
			}),
		}),

		updateStudyStatus: build.mutation<any, any>({
			query: (body) => ({
				url: `/courses/${body.courseId}/sections/${body.sectionId}/lessons/${body.lessonId}/study-status`,
				body: body.data,
				method: "PUT",
			}),
		}),
	}),
});
