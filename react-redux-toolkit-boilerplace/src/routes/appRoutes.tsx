/* eslint-disable import/no-unresolved */
import AppLayout from '@components/layouts/AppLayout'
import Class from '@container/app/Shared/pages/ClassHome'
import Assignments from '@container/app/Teacher/pages/Assignments'
import Calendar from '@container/app/Teacher/pages/Calendar'
import Classrooms from '@container/app/Teacher/pages/Classrooms'
import Files from '@container/app/Teacher/pages/Files'
import NotFound from '@container/common/NotFound'
import ServerError from '@container/common/ServerError'
import { Navigate } from 'react-router-dom'

import ClassLayout from '@components/layouts/ClassLayout'
import ClassFiles from '@container/app/Shared/pages/ClassFiles'
import LectureDetail from '@container/app/Shared/pages/LectureDetail'
import Lectures from '@container/app/Shared/pages/Lectures'
import ClassSettings from '@container/app/Teacher/pages/ClassSettings'
import NewClass from '@container/app/Teacher/pages/NewClass'
import type { RouteObject } from 'react-router-dom'

const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/classrooms',
        element: <Classrooms />
      },
      {
        path: '/classroom/new',
        element: <NewClass />
      },
      {
        path: '/assignments',
        element: <Assignments />
      },
      {
        path: '/classroom/:classroomId/teacher/assignments',
        element: <Assignments />
      },
      {
        path: '/calendar',
        element: <Calendar />
      },
      {
        path: '/files',
        element: <Files />
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
  },
  {
    path: '/',
    element: <AppLayout padding={0} collapsed />,
    children: [
      {
        path: '/',
        element: <ClassLayout />,
        children: [
          {
            path: '/classroom/:id/home',
            element: <Class />
          },
          {
            path: '/classroom/:id/lectures',
            element: <Lectures />
          },
          {
            path: '/classroom/:id/lecture/:id',
            element: <LectureDetail />
          },
          {
            path: '/classroom/:id/files',
            element: <ClassFiles />
          },

          {
            path: '/classroom/:id/settings',
            element: <ClassSettings />
          }
        ]
      }
    ]
  }
]

export default appRoutes
