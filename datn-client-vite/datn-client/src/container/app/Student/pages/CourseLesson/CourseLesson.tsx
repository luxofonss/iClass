/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./CourseLesson.module.scss";
import { Button, Checkbox, Col, Collapse, Modal, Row, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { courseApi } from "@/app-data/service/course.service";
import { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
	Book,
	ChevronLeft,
	MoveLeft,
	MoveRight,
	PenLineIcon,
	Play,
	Video,
} from "lucide-react";
import {
	CourseViewSchema,
	LectureSchema,
	SectionSchema,
} from "@/shared/schema/course.schema";
import toast from "react-hot-toast";
import { SimpleEditor } from "@/components/Tiptap";
import Conversation from "@/components/Conversation";
import ViewAssignmentAttemptsInLesson from "../../components/ViewAssignmentAttemptsInLesson";
const cx = classNames.bind(styles);

export default function CourseLesson() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentLesson, setCurrentLesson] = useState<LectureSchema>(null);
	const [currentSection, setCurrentSection] = useState<SectionSchema>(null);
	const [displayData, setDisplayData] = useState<CourseViewSchema>([]);
	const { courseId, lessonId } = useParams();

	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();
	const [addStudyStatus] = courseApi.endpoints.addStudyStatus.useMutation();
	const [updateStudyStatus] =
		courseApi.endpoints.addStudyStatus.useMutation();

	async function handleGetCourse() {
		if (courseId) {
			const response = await getCourse({ id: courseId }).unwrap();

			const course = response.data;
			// Sort sections based on createdAt
			// course.sections?.sort((a, b) => a?.createdAt - b?.createdAt);

			// Iterate over each section
			course.sections?.forEach((section) => {
				// Sort lessons within each section based on createdAt
				// section.lessons.sort((a, b) => a?.order - b?.order);
				// console.log(section)
			});

			setDisplayData(course);
		}
	}

	useEffect(() => {
		handleGetCourse();
	}, [courseId]);

	useEffect(() => {
		getCurrentSection();
	}, [currentLesson, lessonId]);

	useEffect(() => {
		course?.data?.sections?.forEach((section) => {
			section?.lessons?.forEach((lesson) => {
				console.log(lesson, currentLesson);
				if (lesson?.id === lessonId) {
					setCurrentLesson(lesson);
				}
			});
		});
	}, [lessonId, course]);

	function getCurrentSection() {
		course?.data?.sections?.forEach((section) => {
			section?.lessons?.forEach((lesson) => {
				console.log(lesson, currentLesson);
				if (lesson?.id === currentLesson?.id) {
					if (!lesson?.lessonStudent?.status) {
						const body = {
							courseId,
							sectionId: section?.id,
							lessonId: lesson?.id,
							data: {
								status: "DOING",
							},
						};

						addStudyStatus(body);
					}
					setCurrentSection(section);
				}
			});
		});
	}

	function calculateLesson(section: SectionSchema) {
		return section?.lessons?.filter((l) => l.type === "VIDEO")?.length;
	}

	function calculateAssignment(section: SectionSchema) {
		return section?.lessons?.filter((l) => l.type === "ASSIGNMENT")?.length;
	}

	function handlePrevLesson() {
		prevLessonLogic();
	}

	function handleNextLesson() {
		if (
			!currentLesson?.lessonStudent ||
			currentLesson?.lessonStudent?.status === "DOING"
		) {
			showModal();
		} else {
			nextLessonLogic();
		}
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	function nextLessonLogic() {
		for (let index = 0; index < displayData?.sections?.length; index++) {
			const section = displayData?.sections[index];

			if (section.id === currentSection.id) {
				for (let idx2 = 0; idx2 < section?.lessons?.length; idx2++) {
					const lesson = section?.lessons[idx2];

					if (lesson.id === currentLesson?.id) {
						console.log("test");
						if (idx2 < section?.lessons?.length - 1) {
							setCurrentLesson(
								displayData?.sections[index]?.lessons[idx2 + 1]
							);
						} else if (index < displayData?.sections?.length - 1) {
							if (
								displayData?.sections[index + 1]?.lessons
									?.length > 0
							) {
								setCurrentLesson(
									displayData?.sections[index + 1]?.lessons[0]
								);
								setCurrentSection(
									displayData?.sections[index + 1]
								);
							}
						}
					}
				}
			}
		}
	}

	function prevLessonLogic() {
		for (let index = 0; index < displayData?.sections?.length; index++) {
			const section = displayData?.sections[index];

			if (section.id === currentSection.id) {
				for (let idx2 = 0; idx2 < section?.lessons?.length; idx2++) {
					const lesson = section?.lessons[idx2];

					if (lesson.id === currentLesson?.id) {
						console.log("test");
						if (idx2 > 0) {
							setCurrentLesson(
								displayData?.sections[index]?.lessons[idx2 - 1]
							);
						} else if (index > 0) {
							if (
								displayData?.sections[index - 1]?.lessons
									?.length > 0
							) {
								setCurrentLesson(
									displayData?.sections[index - 1]?.lessons[
										displayData?.sections[index - 1]
											?.lessons?.length - 1
									]
								);
								setCurrentSection(
									displayData?.sections[index - 1]
								);
							}
						}
					}
				}
			}
		}
	}

	const handleOk = async () => {
		try {
			const body = {
				courseId,
				sectionId: currentSection?.id,
				lessonId: currentLesson?.id,
				data: {
					status: "DONE",
				},
			};

			await updateStudyStatus(body).unwrap();

			nextLessonLogic();
			hideModal();

			toast.success("ok");
		} catch (error: any) {
			console.log("error:: ", error);
			toast.error(error?.data?.message || "Something went wrong!");
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={cx("wrapper")}>
			<div className={cx("heading")}>
				<div className={cx("left")}>
					<Link to={`/courses/${courseId}/lessons`}>
						<MoveLeft size={14} color="black" />
					</Link>
					<Typography.Title level={4} ellipsis={{ rows: 1 }}>
						{course?.data?.name}
					</Typography.Title>
				</div>
				<div className={cx("right")}>
					<Button
						onClick={handlePrevLesson}
						icon={<MoveLeft size={14} />}
					>
						Bài trước
					</Button>
					<Button
						onClick={handleNextLesson}
						type={"primary"}
						icon={<MoveRight size={14} />}
					>
						Bài tiếp
					</Button>
				</div>
			</div>
			<Modal
				title="Xác nhận hoàn thành bài học"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>
					Bạn hãy xác nhận hoàn thành bài học trước khi chuyển bài mới
				</p>
				<p>Bài học: {currentLesson?.name}</p>
			</Modal>
			<Row gutter={32} className={cx("content")}>
				<Col span={7}>
					<Collapse
						activeKey={displayData?.sections?.map(
							(section) => section.id
						)}
					>
						{displayData?.sections?.map((section, index) => (
							<Collapse.Panel
								className={cx("panel")}
								header={
									<div className={cx("section-heading")}>
										<div className={cx("name")}>
											Phần {index + 1}: {section?.name}
										</div>
										<div className={cx("info")}>
											{calculateLesson(section)} bài giảng
											và {calculateAssignment(section)}{" "}
											bài tập
										</div>
									</div>
								}
								key={section.id}
								id={section.id}
							>
								{section?.lessons?.length > 0 ? (
									section?.lessons?.map((lesson, index) => {
										if (lesson.type === "VIDEO")
											return (
												<div
													className={cx(
														"lesson",
														currentLesson?.id ===
															lesson.id
															? "active"
															: ""
													)}
													key={lesson.id}
													onClick={() => {
														setCurrentLesson(
															lesson
														);
														setCurrentSection(
															section
														);
													}}
												>
													<div
														className={cx(
															"play-btn",
															lesson
																?.lessonStudent
																?.status ===
																"DOING"
																? "doing"
																: lesson
																		?.lessonStudent
																		?.status ===
																  "DONE"
																? "done"
																: ""
														)}
													>
														<Play size={14} />
													</div>
													<Link
														to={`/courses/${courseId}/lessons/${lesson?.id}`}
														className={cx(
															"heading"
														)}
													>
														<div>
															{index + 1}.{" "}
															{lesson?.name}
														</div>
													</Link>
												</div>
											);
										else
											return (
												<div
													className={cx(
														"assignment",
														currentLesson?.id ===
															lesson.id
															? "active"
															: ""
													)}
													key={lesson?.id}
													onClick={() => {
														setCurrentLesson(
															lesson
														);
														setCurrentSection(
															section
														);
													}}
												>
													<div
														className={cx(
															"play-btn",
															lesson
																?.lessonStudent
																?.status ===
																"DOING"
																? "doing"
																: lesson
																		?.lessonStudent
																		?.status ===
																  "DONE"
																? "done"
																: ""
														)}
													>
														<PenLineIcon
															size={14}
														/>
													</div>
													<Link
														to={`/courses/${courseId}/lessons/${lesson?.id}`}
														className={cx(
															"heading"
														)}
													>
														<div>
															{index + 1}.{" "}
															{lesson?.name}
														</div>
													</Link>
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
				<Col span={17}>
					{currentLesson?.type === "VIDEO" && (
						<Fragment>
							<ReactPlayer
								width={"100%"}
								height={"auto"}
								controls
								url={currentLesson?.resource?.url}
							/>
							<Typography.Title level={3}>
								{currentLesson?.name}
							</Typography.Title>
							<Typography.Paragraph level={3}>
								{currentLesson?.description}
							</Typography.Paragraph>

							<div className={cx("comments")}>
								{/* <TextEditor /> */}
								<SimpleEditor onValueChange={() => {}} />

								<Conversation />
							</div>
						</Fragment>
					)}
					{currentLesson?.type === "ASSIGNMENT" && (
						<ViewAssignmentAttemptsInLesson
							assignment={currentLesson?.assignment}
						/>
					)}
				</Col>
			</Row>
		</div>
	);
}
