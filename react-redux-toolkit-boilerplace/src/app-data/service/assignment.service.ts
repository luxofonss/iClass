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
    })
  })
})
