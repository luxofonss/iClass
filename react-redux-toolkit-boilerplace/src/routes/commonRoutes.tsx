/* eslint-disable import/no-unresolved */
import GeneralLayout from '@components/layouts/GeneralLayout'
import Home from '@container/app/Home'
import NotFound from '@container/common/NotFound'
import ServerError from '@container/common/ServerError'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const commonRoutes: RouteObject[] = [
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      { path: '/', element: <Home /> },
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

export default commonRoutes
