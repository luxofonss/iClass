import AuthLayout from '@components/layouts/AuthLayout'
import SignIn from '@container/authentication/SignIn'
import SignUp from '@container/authentication/SignUp'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const authRoutes: RouteObject[] = [
  {
    errorElement: <Navigate to='/500' replace />,
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/sign-in',
        element: <SignIn />
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />
      }
    ]
  }
]

export default authRoutes
