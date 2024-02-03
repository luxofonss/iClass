/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@shared/configs/customFetchBase'
import { CourseCreateSchema, CourseViewSchema } from '@shared/schema/course.schema'
import { ErrorResponse } from '@types/index'

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createCourse: build.mutation<any, CourseCreateSchema>({
      query: (body) => {
        return {
          url: '/courses',
          method: 'POST',
          body: body,
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }
      }
    }),
    getCourseById: build.query<{ error: ErrorResponse; data: CourseViewSchema }, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/courses/${id}`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    getSubjects: build.query<any, any>({
      query: () => {
        return {
          url: '/subjects',
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    getAllCreatedCourses: build.query<any, any>({
      query: () => {
        return {
          url: '/courses/mine',
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    getAllSectionInCourse: build.query<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/courses/${id}/sections`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    getAllActiveCourses: build.query<any, any>({
      query: () => {
        return {
          url: '/courses/active',
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    joinCourseByCode: build.mutation<any, { code: string }>({
      query: (body) => {
        return {
          url: `/courses/attempt`,
          method: 'POST',
          body: body,
          credentials: 'include'
        }
      }
    }),
    getMyEnrolledCourses: build.query<any, any>({
      query: () => {
        return {
          url: '/courses/my-enrolled',
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    getAssignmentsInCourse: build.query<any, any>({
      query: (id) => {
        return {
          url: `http://localhost:8080/v1/courses/${id}/assignments`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),

    // TEACHER
    getAllEnrolledStudents: build.query<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/courses/${id}/enrollments`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    deleteCourseEnrollment: build.mutation<any, { id: string }>({
      query: (body) => {
        return {
          url: `/courses/enrolls`,
          method: 'PUT',
          credentials: 'include',
          body: {
            ...body,
            status: 'INACTIVE'
          }
        }
      }
    }),
    enableCourseEnrollment: build.mutation<any, { id: string }>({
      query: (body) => {
        return {
          url: `/courses/enrolls`,
          method: 'PUT',
          credentials: 'include',
          body: {
            ...body,
            status: 'ACTIVE'
          }
        }
      }
    }),
    addStudentToCourse: build.mutation<any, { id: string; body: { emails: string } }>({
      query: (body) => {
        return {
          url: `/courses/${body.id}/enrolls/add-many`,
          method: 'POST',
          credentials: 'include',
          body: body.body
        }
      }
    })
  })
})
