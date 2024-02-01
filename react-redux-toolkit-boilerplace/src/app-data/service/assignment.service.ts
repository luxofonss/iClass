/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@shared/configs/customFetchBase'
import { AssignmentCreateSchema } from '@shared/schema/assignment.schema'

export const assignmentApi = createApi({
  reducerPath: 'assignmentApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createAssignment: build.mutation<{ success: boolean; data: AssignmentCreateSchema }, any>({
      query: (body) => {
        return {
          url: 'http://localhost:8080/v1/assignment',
          method: 'POST',
          body: body,
          credentials: 'include'
        }
      }
    }),
    getOneById: build.query({
      query: (id) => {
        return {
          url: `http://localhost:8080/v1/assignment/${id}`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    attemptAssignment: build.mutation<any, { assignment_id: string }>({
      query: (body) => {
        return {
          url: `http://localhost:8080/v1/assignment/attempt`,
          method: 'POST',
          body: body,
          credentials: 'include'
        }
      }
    }),
    getAssignmentAttempt: build.query<any, string>({
      query: (id) => {
        return {
          url: `http://localhost:8080/v1/assignment/attempt/${id}`,
          method: 'GET',
          credentials: 'include'
        }
      }
    }),
    submitAnswer: build.mutation<
      any,
      {
        assignment_attempt_id: string
        question_id: string
        answer: {
          selected_option_id?: string
          text_answer?: string
        }
      }
    >({
      query: (body) => {
        return {
          url: `http://localhost:8080/v1/assignment-attempt/${body.assignment_attempt_id}/question/${body.question_id}/answer`,
          method: 'POST',
          body: body.answer,
          credentials: 'include'
        }
      }
    }),
    getAlAssignmentAttemptResults: build.query<any, { assignment_id: string }>({
      query: (params) => {
        return {
          url: `http://localhost:8080/v1/teacher/assignment/attempt/get-all-attempts`,
          method: 'GET',
          params: params,
          credentials: 'include'
        }
      }
    })
  })
})
