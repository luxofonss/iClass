/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./CourseLesson.module.scss";
import { Checkbox, Col, Collapse, Empty, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { courseApi } from "@/app-data/service/course.service";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Book, Video } from "lucide-react";
const cx = classNames.bind(styles);

export default function CourseLesson() {
	const [currentLesson, setCurrentLesson] = useState(null);
	const { courseId } = useParams();

	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	useEffect(() => {
		if (courseId) {
			getCourse({ id: courseId });
			console.log(courseId);
		}
	}, [courseId]);

	console.log("currentVideo:: ", currentLesson);

	return (
		<div className={cx("wrapper")}>
			<Row gutter={32}>
				<Col span={17}>
					<ReactPlayer
						width={"100%"}
						height={"auto"}
						controls
						url={currentLesson?.resource?.url}
					/>
					<Typography.Title level={3}>
						{currentLesson?.name}
					</Typography.Title>
				</Col>
				<Col span={7}>
					<Collapse>
						{course?.data?.sections?.map((section, index) => (
							// <div key={section?.id}>
							// 	<div>{section?.name}</div>
							// 	<div>{section?.description}</div>
							// </div>
							<Collapse.Panel
								className={cx("panel")}
								header={
									"Section " +
									(index + 1) +
									": " +
									section?.name
								}
								key={section.id}
							>
								{section?.lessons?.length > 0 ? (
									section?.lessons?.map((lesson, index) => {
										if (lesson.type === "VIDEO")
											return (
												<div
													className={cx("lesson")}
													key={lesson.id}
													onClick={() =>
														setCurrentLesson(lesson)
													}
												>
													<div
														className={cx(
															"heading"
														)}
													>
														<Checkbox />
														<div>
															{index + 1}.{" "}
															{lesson?.name}
														</div>
													</div>
													<Video size={14} />
												</div>
											);
										else
											return (
												<div
													className={cx("assignment")}
													key={lesson?.id}
													onClick={() => {
														setCurrentLesson(null);
													}}
												>
													<div
														className={cx(
															"heading"
														)}
													>
														<Checkbox />
														<div>
															{index + 1}.{" "}
															{lesson?.name}
														</div>
													</div>
													<Book size={14} />
												</div>
											);
									})
								) : (
									<div>This course is empty</div>
								)}
							</Collapse.Panel>
						))}
					</Collapse>
				</Col>
			</Row>
		</div>
	);
}
