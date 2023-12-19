/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@shared/configs/customFetchBase'
import { CourseCreateSchema } from '@shared/schema/course.schema'

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
    getCourseById: build.query<any, { id: string }>({
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
    })
  })
})
