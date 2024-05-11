/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from "@/app-data/service/course.service";
import SectionCreateUpdate from "@/container/app/Teacher/components/SectionCreateUpdate";
import { CourseViewSchema } from "@/shared/schema/course.schema";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Lectures.module.scss";
const cx = classNames.bind(styles);

export default function Lectures({ mode }: { mode: string }) {
	const { courseId } = useParams<any>();
	const [getCourse, { data: course, isLoading: isGettingCourse }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	useEffect(() => {
		if (courseId) {
			getCourse({ id: courseId });
			console.log(courseId);
		}
	}, [courseId]);

	console.log(course);

	return (
		<div className={cx("lectures")}>
			{/* {mode === ROLE.TEACHER && <ModalEditAddSection />} */}
			{isGettingCourse ? (
				<div>Loading... </div>
			) : (
				<SectionCreateUpdate
					courseData={course?.data as CourseViewSchema}
					handleGetCourse={() => {
						getCourse({ id: courseId });
					}}
				/>
			)}
		</div>
	);
}
