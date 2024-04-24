/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import SectionBlock from "@/components/SectionBlock";
import ModalEditAddLecture from "@/container/app/Teacher/components/ModalEditAddLecture";
import ModalEditAddSection from "@/container/app/Teacher/components/ModalEditAddSection";
import { ROLE } from "@/shared/constants";
import {
	CourseViewSchema,
	LectureSchema,
	SectionSchema,
} from "@/shared/schema/course.schema";
import { Collapse } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LectureBlock from "../../components/LectureBlock";
import styles from "./Lectures.module.scss";
import SectionCreateUpdate from "@/container/app/Teacher/components/SectionCreateUpdate";
const cx = classNames.bind(styles);

export default function Lectures({ mode }: { mode: string }) {
	const { courseId } = useParams<any>();

	const [getAllSections, { data: sections, isLoading: isGettingSections }] =
		courseApi.endpoints.getAllSectionInCourse.useLazyQuery();

	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	useEffect(() => {
		if (courseId) {
			getAllSections({ id: courseId });
			getCourse({ id: courseId });
			console.log(courseId);
		}
	}, [courseId]);

	console.log(course);

	return (
		<div className={cx("lectures")}>
			{mode === ROLE.TEACHER && <ModalEditAddSection />}
			{isGettingSections ? (
				<div>Loading... </div>
			) : (
				// <Collapse defaultActiveKey={["1"]}>
				// 	{data?.sections?.map(
				// 		(section: SectionSchema, index: number) => (
				// 			<Collapse.Panel
				// 				header={
				// 					<SectionBlock
				// 						mode={mode}
				// 						data={section}
				// 						index={index}
				// 					/>
				// 				}
				// 				key={section.id || index}
				// 			>
				// 				{section?.lectures?.map(
				// 					(lecture: LectureSchema) => (
				// 						<LectureBlock
				// 							key={lecture.id}
				// 							data={lecture}
				// 						/>
				// 					)
				// 				)}
				// 				{mode === ROLE.TEACHER && (
				// 					<ModalEditAddLecture />
				// 				)}
				// 			</Collapse.Panel>
				// 		)
				// 	)}
				// </Collapse>
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
