import AuthLayout from '@components/layouts/AuthLayout'
import SignIn from '@container/authentication/SignIn'
import NotFound from '@container/common/NotFound'
import ServerError from '@container/common/ServerError'
import { Navigate } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

const authRoutes: RouteObject[] = [
  {
    errorElement: <Navigate to='/500' replace />,
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/404',
        element: <NotFound />
      },
      {
        path: '/500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <Navigate to='/404' replace />
      }
    ]
  }
]

export default authRoutes
