/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@shared/configs/customFetchBase'
import { LoginSchema, RegisterSchema } from '@shared/schema/auth.schema'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: build.mutation<{ success: boolean; data: LoginSchema }, any>({
      query: (body) => {
        return {
          url: 'http://localhost:8080/v1/auth/login',
          method: 'POST',
          body: body,
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }
      }
    }),
    register: build.mutation<{ success: boolean; data: RegisterSchema }, any>({
      query: (body) => {
        return {
          url: 'http://localhost:8080/v1/auth/register',
          method: 'POST',
          body: body,
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }
      }
    }),
    getProfile: build.query<any, any>({
      query: () => {
        return {
          url: 'http://localhost:8080/v1/user/profile',
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }
      }
    })
  })
})

export const { useLoginMutation } = authApi
