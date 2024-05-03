/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import AddAssignment from "@/container/app/Shared/components/AddAssignment";
import { ROLE } from "@/shared/constants";
import { Button, Col, Row } from "antd";
import { ChevronLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentBlock from "../../components/AssignmentBlockTeacher";
import styles from "./Assignments.module.scss";
const cx = classNames.bind(styles);

interface IAssignmentsProps {
	readonly mode: string;
}

export default function Assignments({ mode }: IAssignmentsProps) {
	const [isAdding, setIsAdding] = useState(false);

	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();


	const { courseId } = useParams<{ courseId: string }>();

	useEffect(() => {
		if (courseId) {
			getCourse({ id: courseId });
			console.log(courseId);
		}
	}, [courseId]);

	return (
		<div className={cx("assignments")}>
			<Row className={cx("body")} gutter={[24, 24]}>
				{course?.data?.sections?.map(section => {
					return section?.lessons?.map((lesson: any) => {
						if (lesson.type === "ASSIGNMENT") {
							return (
								<Col span={6} key={lesson.id}>
									<AssignmentBlock
										mode={mode}
										data={lesson?.assignment}
									/>
								</Col>
							);
						}
						else {
							return null;
						}
					})
				}
				)
				}
			</Row>
		</div>
	);
}
