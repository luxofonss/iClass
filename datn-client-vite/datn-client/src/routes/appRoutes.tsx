import AppLayout from "@/components/layouts/AppLayout";
import Class from "@/container/app/Shared/pages/ClassHome";
import Assignments from "@/container/app/Teacher/pages/Assignments";
import Calendar from "@/container/app/Teacher/pages/Calendar";
import Classrooms from "@/container/app/Teacher/pages/Classrooms";
import Files from "@/container/app/Teacher/pages/Files";

import ClassLayout from "@/components/layouts/ClassLayout";
import GeneralLayout from "@/components/layouts/GeneralLayout";
import ClassFiles from "@/container/app/Shared/pages/ClassFiles";
import CourseDetailIntro from "@/container/app/Shared/pages/CourseDetailIntro";
import CourseHome from "@/container/app/Shared/pages/CourseHome";
import LectureDetail from "@/container/app/Shared/pages/LectureDetail";
import Lectures from "@/container/app/Shared/pages/Lectures";
import AttemptAssignment from "@/container/app/Student/pages/AttemptAssignment";
import MyEnrolledCourses from "@/container/app/Student/pages/MyEnrolledCourses";
import StudentAssignments from "@/container/app/Student/pages/StudentAssignments";
import AllAssignmentAttempt from "@/container/app/Teacher/pages/AllAssignmentAttempt";
import AssignmentDetail from "@/container/app/Teacher/pages/AssignmentDetail";
import ClassSettings from "@/container/app/Teacher/pages/ClassSettings";
import NewClass from "@/container/app/Teacher/pages/NewClass";
import ViewAssignmentAttempt from "@/container/app/Teacher/pages/ViewAssignmentAttempt";
import { ROLE } from "@/shared/constants";
import type { RouteObject } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import NewClassDraft from "@/container/app/Teacher/pages/NewClassDraft";
import AddAssignment from "@/container/app/Shared/components/AddAssignment";
import CourseLesson from "@/container/app/Student/pages/CourseLesson";
import LessonLearningLayout from "@/components/layouts/LessonLearningLayout";
import CourseLessonView from "@/container/app/Student/pages/CourseLessonView";
import CourseAbout from "@/container/app/Shared/components/CourseAbout/CourseAbout";

const appRoutes: RouteObject[] = [
	// TEACHER ROUTES
	{
		path: "/teacher/courses",
		element: (
			<ProtectedRoutes requiredRoles={[ROLE.TEACHER]}>
				<AppLayout mode={ROLE.TEACHER} />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "/teacher/courses",
				element: <Classrooms mode={ROLE.TEACHER} />,
			},
			{
				path: "/teacher/courses/:courseId/update",
				element: <NewClass />,
			},
			{
				path: "/teacher/courses/draft",
				element: <NewClassDraft />,
			},
			{
				path: "/teacher/courses/assignments",
				element: <Assignments mode={ROLE.TEACHER} />,
			},
			{
				path: "/teacher/courses/calendar",
				element: <Calendar />,
			},
			{
				path: "/teacher/courses/files",
				element: <Files />,
			},
		],
	},

	// TEACHER VIEW HIS/HER COURSE ROUTES
	{
		path: "/teacher/courses",
		element: (
			<ProtectedRoutes requiredRoles={[ROLE.TEACHER]}>
				<AppLayout padding={0} collapsed mode={ROLE.TEACHER} />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "/teacher/courses",
				element: <ClassLayout mode={ROLE.TEACHER} />,
				children: [
					{
						path: "/teacher/courses/:courseId/home",
						element: <Class />,
					},
					{
						path: "/teacher/courses/:courseId/lectures",
						element: <Lectures mode={ROLE.TEACHER} />,
					},
					{
						path: "/teacher/courses/:courseId/lectures/:id",
						element: <LectureDetail />,
					},
					{
						path: "/teacher/courses/:courseId/lectures/:lessonId/assignment",
						element: <AddAssignment />,
					},
					{
						path: "/teacher/courses/:courseId/lectures/:lessonId/assignment/:assignmentId",
						element: <AddAssignment />,
					},
					{
						path: "/teacher/courses/:courseId/files",
						element: <CourseAbout />,
					},
					{
						path: "/teacher/courses/:courseId/about",
						element: <CourseAbout />,
					},
					{
						path: "/teacher/courses/:courseId/settings",
						element: <ClassSettings />,
					},
					{
						path: "/teacher/courses/:courseId/assignments",
						element: <Assignments mode={ROLE.TEACHER} />,
					},
					{
						path: "/teacher/courses/:id/assignments/:assignmentId",
						element: <AssignmentDetail />,
					},
					{
						path: "/teacher/courses/:id/assignments/:assignmentId/attempts",
						element: <AllAssignmentAttempt />,
					},
					{
						path: "/teacher/courses/:id/assignments/:assignmentId/attempts/:attemptId",
						element: <ViewAssignmentAttempt mode="TEACHER" />,
					},
				],
			},
		],
	},

	{
		path: "/",
		element: (
			<ProtectedRoutes requiredRoles={[ROLE.STUDENT]}>
				<AppLayout padding={0} collapsed mode={ROLE.STUDENT} />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "/courses",
				element: <ClassLayout mode={ROLE.STUDENT} />,
				children: [
					{
						path: "/courses/:courseId/home",
						element: <Class />,
					},
					{
						path: "/courses/:courseId/lessons",
						element: <CourseLessonView />,
					},
					{
						path: "/courses/:courseId/lecture/:id",
						element: <LectureDetail />,
					},
					{
						path: "/courses/:courseId/files",
						element: <ClassFiles />,
					},
					{
						path: "/courses/:courseId/about",
						element: <CourseAbout />,
					},
					{
						path: "/courses/:courseId/assignments",
						element: <StudentAssignments mode={ROLE.STUDENT} />,
					},
				],
			},
		],
	},
	{
		path: "/",
		element: (
			<ProtectedRoutes requiredRoles={[ROLE.STUDENT]}>
				<LessonLearningLayout />
			</ProtectedRoutes>
		),
		children: [
			{
				path: "/courses/:courseId/lessons/:lessonId",
				element: <CourseLesson />,
			},
		],
	},
	{
		path: "/courses",
		element: <GeneralLayout />,
		children: [
			{
				path: "/courses/:id",
				element: <CourseDetailIntro />,
			},
			{
				path: "/courses",
				element: <CourseHome />,
			},
			{
				path: "/courses/my-enrolled-courses",
				element: <MyEnrolledCourses />,
			},
		],
	},
	{
		path: "/courses",
		element: <AppLayout mode={ROLE.STUDENT} />,
		children: [
			{
				path: "/courses/assignments/:id/:attemptId",
				element: <AttemptAssignment />,
			},
			{
				path: "/courses/:id/assignments/attempt-review/:attemptId",
				element: <ViewAssignmentAttempt mode="RESULT" />,
			},
		],
	},
];

export default appRoutes;
