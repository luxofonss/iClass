/* eslint-disable import/no-unresolved */
import AppLayout from '@components/layouts/AppLayout'
import Class from '@container/app/Shared/pages/ClassHome'
import Assignments from '@container/app/Teacher/pages/Assignments'
import Calendar from '@container/app/Teacher/pages/Calendar'
import Classrooms from '@container/app/Teacher/pages/Classrooms'
import Files from '@container/app/Teacher/pages/Files'

import ClassLayout from '@components/layouts/ClassLayout'
import GeneralLayout from '@components/layouts/GeneralLayout'
import ClassFiles from '@container/app/Shared/pages/ClassFiles'
import CourseDetailIntro from '@container/app/Shared/pages/CourseDetailIntro'
import CourseHome from '@container/app/Shared/pages/CourseHome'
import LectureDetail from '@container/app/Shared/pages/LectureDetail'
import Lectures from '@container/app/Shared/pages/Lectures'
import AttemptAssignment from '@container/app/Student/pages/AttemptAssignment'
import MyEnrolledCourses from '@container/app/Student/pages/MyEnrolledCourses'
import AssignmentDetail from '@container/app/Teacher/pages/AssignmentDetail'
import ClassSettings from '@container/app/Teacher/pages/ClassSettings'
import NewClass from '@container/app/Teacher/pages/NewClass'
import { ROLE } from '@shared/constants'
import type { RouteObject } from 'react-router-dom'
import ProtectedRoutes from './protectedRoutes'

const appRoutes: RouteObject[] = [
  // TEACHER ROUTES
  {
    path: '/teacher/courses',
    element: (
      <ProtectedRoutes requiredRoles={[ROLE.TEACHER]}>
        <AppLayout mode={ROLE.TEACHER} />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/teacher/courses',
        element: <Classrooms mode={ROLE.TEACHER} />
      },
      {
        path: '/teacher/courses/new',
        element: <NewClass />
      },
      {
        path: '/teacher/courses/assignments',
        element: <Assignments mode={ROLE.TEACHER} />
      },
      {
        path: '/teacher/courses/calendar',
        element: <Calendar />
      },
      {
        path: '/teacher/courses/files',
        element: <Files />
      }
    ]
  },

  // TEACHER VIEW HIS/HER COURSE ROUTES
  {
    path: '/teacher/courses',
    element: (
      <ProtectedRoutes requiredRoles={[ROLE.TEACHER]}>
        <AppLayout padding={0} collapsed mode={ROLE.TEACHER} />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/teacher/courses',
        element: <ClassLayout mode={ROLE.TEACHER} />,
        children: [
          {
            path: '/teacher/courses/:id/home',
            element: <Class />
          },
          {
            path: '/teacher/courses/:id/lectures',
            element: <Lectures mode={ROLE.TEACHER} />
          },
          {
            path: '/teacher/courses/:id/lectures/:id',
            element: <LectureDetail />
          },
          {
            path: '/teacher/courses/:id/files',
            element: <ClassFiles />
          },
          {
            path: '/teacher/courses/:id/settings',
            element: <ClassSettings />
          },
          {
            path: '/teacher/courses/:id/assignments',
            element: <Assignments mode={ROLE.TEACHER} />
          },
          {
            path: '/teacher/courses/:id/assignments/:assignmentId',
            element: <AssignmentDetail />
          },
          {
            path: '/teacher/courses/:id/assignments/:assignmentId/attempts',
            element: <AssignmentDetail />
          }
        ]
      }
    ]
  },

  // STUDENT VIEW REGISTERED COURSES ROUTES
  {
    path: '/',
    element: (
      <ProtectedRoutes requiredRoles={[ROLE.STUDENT]}>
        <AppLayout padding={0} collapsed mode={ROLE.STUDENT} />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/courses',
        element: <ClassLayout mode={ROLE.STUDENT} />,
        children: [
          {
            path: '/courses/:id/home',
            element: <Class />
          },
          {
            path: '/courses/:id/lectures',
            element: <Lectures mode={ROLE.STUDENT} />
          },
          {
            path: '/courses/:id/lecture/:id',
            element: <LectureDetail />
          },
          {
            path: '/courses/:id/files',
            element: <ClassFiles />
          },
          {
            path: '/courses/:id/assignments',
            element: <Assignments mode={ROLE.STUDENT} />
          }
        ]
      }
    ]
  },
  {
    path: '/courses',
    element: <GeneralLayout />,
    children: [
      {
        path: '/courses/:id',
        element: <CourseDetailIntro />
      },
      {
        path: '/courses',
        element: <CourseHome />
      },
      {
        path: '/courses/my-enrolled-courses',
        element: <MyEnrolledCourses />
      }
    ]
  },
  {
    path: '/course',
    element: <AppLayout mode={ROLE.STUDENT} />,
    children: [
      {
        path: '/course/assignments/:id/:attemptId',
        element: <AttemptAssignment />
      }
    ]
  }
]

export default appRoutes
