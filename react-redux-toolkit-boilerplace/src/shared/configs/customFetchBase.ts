import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// import { tokenReceived, loggedOut } from '../../store/slices/authSlice'
import { Mutex } from 'async-mutex'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    headers.set('Access-Control-Allow-Credentials', 'true')

    // if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    return headers
  }
})
const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      // const release = await mutex.acquire()
      // try {
      //   const refreshResponse: any = await baseQuery(hrmsBaseURL + '/auth/refreshToken', api, extraOptions)
      //   if (refreshResponse.data.accessToken) {
      //     const accessTokenExp: IJwtDecode = await jwt_decode(refreshResponse.data.accessToken)
      //     if (refreshResponse.data.accessToken) {
      //       cookies.set('access_token', refreshResponse.data.accessToken, {
      //         sameSite: 'strict',
      //         secure: true,
      //         expires: new Date(accessTokenExp.exp * 1000)
      //       })
      //     }
      //     // retry the initial query
      //     result = await baseQuery(args, api, extraOptions)
      //   } else {
      //     api.dispatch(logout())
      //   }
      // } finally {
      //   // release must be called once the mutex should be released again.
      //   release()
      // }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export default customFetchBase
