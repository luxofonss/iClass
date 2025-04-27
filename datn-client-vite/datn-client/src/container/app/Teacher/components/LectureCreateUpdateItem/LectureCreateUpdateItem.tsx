/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { uploadApi } from "@/app-data/service/upload.service";
import { LectureSchema } from "@/shared/schema/course.schema";
import { Button, Card, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import styles from "./LectureCreateUpdateItem.module.scss";
const cx = classNames.bind(styles);

export default function LectureCreateUpdateItem({
	lesson,
	index,
	sectionId,
}: {
	lesson: LectureSchema;
	index: number;
	sectionId: string;
}) {
	const [editingLesson, setEditingLesson] = useState(false);
	const [resource, setResource] = useState(null);

	const [uploadFile, { isLoading: isUploading }] =
		uploadApi.endpoints.uploadFile.useMutation();
	const [updateLesson, { isLoading: isUpdatingLesson }] =
		courseApi.endpoints.updateLesson.useMutation();
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();
	const [getResourceById] =
		uploadApi.endpoints.getResourceById.useLazyQuery();
	const [deleteLesson, { isLoading: isDeletingLesson }] =
		courseApi.endpoints.deleteLesson.useMutation();

	const { courseId } = useParams();
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(lesson);

		if (lesson.type === "VIDEO") {
			handleGetResource();
			setResource(lesson?.resource);
		}
	}, [lesson]);

	async function handleGetResource() {
		try {
			const response = await getResourceById(
				lesson?.resource?.id
			).unwrap();

			setResource(response?.data);
			console.log("response?.data:: ", response?.data);
		} catch (error) {
			// toast.error("Something went wrong while getting resource");
		}
	}

	async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target?.files && e.target?.files?.length > 0)
			try {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append("file", file);
				formData.append("folder", "course");

				const res = await uploadFile(formData).unwrap();
				form.setFieldValue("resourceId", res?.data?.id);

				setResource(res?.data);
			} catch (error) {
				toast.error("Upload image fail, please try again!");
				console.log("error:: ", error);
			}
	}

	async function handleUpdateLesson(values: any) {
		try {
			const data = {
				courseId,
				sectionId: sectionId,
				data: {
					id: lesson?.id,
					...values,
				},
			};

			await updateLesson(data).unwrap();
			toast.success("Cập nhật bài học thành công!");
			setEditingLesson(false);
			form.resetFields();
			getCourse({ id: courseId });
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	function getVideoLength(url: string) {
		let length = null;
		const video = document.createElement("video");
		video.src = url;
		video.addEventListener("loadeddata", (event) => {
			length = event?.target?.duration;
		});

		return length;
	}

	async function handleDeleteLesson(id: string) {
		try {
			const requestBody = {
				courseId,
				sectionId,
				data: {
					id,
				},
			};

			await deleteLesson(requestBody).unwrap();
			getCourse({ id: courseId });
		} catch (error: any) {
			toast.error(error?.data?.message || "Error when deleting lesson!");
		}
	}

	return (
		<div className={cx("wrapper")}>
			<Card className={cx("list-items__item")}>
				<div className={cx("heading")}>
					{editingLesson ? (
						<Form
							onFinish={handleUpdateLesson}
							className={cx("left")}
							form={form}
							layout="vertical"
						>
							<div>Bài {index + 1}:</div>
							<Form.Item
								className={cx("input")}
								name={"name"}
								label="Tên bài học"
							>
								<Input />
							</Form.Item>
							<Form.Item
								className={cx("input")}
								name={"description"}
								label="Mô tả bài học"
							>
								<TextArea />
							</Form.Item>
							<Form.Item name={"resourceId"} hidden>
								<Input />
							</Form.Item>
						</Form>
					) : (
						<div className={cx("left")}>
							<div>
								Bài {index + 1}: {lesson?.name}
							</div>
						</div>
					)}
					<div className={cx("btns")}>
						{lesson?.type === "VIDEO" && (
							<>
								{editingLesson ? (
									<Button
										onClick={() => {
											setEditingLesson(null);
										}}
									>
										Huỷ thêm nội dung
									</Button>
								) : (
									<Button
										icon={<Pencil size={16} />}
										onClick={() => {
											setEditingLesson(true);
										}}
									>
										Chỉnh sửa nội dung
									</Button>
								)}
							</>
						)}

						{lesson?.type === "ASSIGNMENT" && (
							<Fragment>
								{editingLesson ? (
									<Button
										onClick={() => {
											setEditingLesson(null);
										}}
									>
										Huỷ
									</Button>
								) : (
									<Button
										icon={<Pencil size={16} />}
										onClick={() => {
											setEditingLesson(true);
										}}
									>
										Chỉnh sửa tiêu đề
									</Button>
								)}
								{lesson?.assignment === null ? (
									<Link
										about="blank"
										to={`/teacher/courses/${courseId}/lectures/${lesson?.id}/assignment`}
									>
										<Button icon={<Plus size={16} />}>
											Thêm bài tập
										</Button>
									</Link>
								) : (
									<Link
										about="blank"
										to={`/teacher/courses/${courseId}/lectures/${lesson?.id}/assignment/${lesson?.assignment?.id}`}
									>
										<Button>View assignment</Button>
									</Link>
								)}
							</Fragment>
						)}
						<Button
							onClick={() => {
								handleDeleteLesson(lesson?.id);
							}}
							danger
							loding={isDeletingLesson}
						>
							Xóa
						</Button>
					</div>
				</div>

				{lesson?.type === "VIDEO" && (
					<Space>
						{resource && (
							<ReactPlayer
								width="200px"
								height="120px"
								controls
								url={resource?.url}
							/>
						)}
						{resource && getVideoLength(resource?.url)}
						{editingLesson && (
							<div className={cx("adding-video")}>
								<div>Tải lên video bài giảng ở đây</div>
								<Input
									type="file"
									onChange={(e) => {
										handleUploadFile(e);
									}}
								/>
								{isUploading && (
									<Space>
										<div>Đang tải lên video... </div>
										<Spin />
									</Space>
								)}
							</div>
						)}
					</Space>
				)}
				{editingLesson && (
					<div className={cx("edit-btns")}>
						<Button
							onClick={() => {
								setEditingLesson(false);
							}}
						>
							Hủy
						</Button>
						<Button
							loading={isUpdatingLesson}
							type="primary"
							onClick={() => {
								form.submit();
							}}
						>
							Lưu
						</Button>
					</div>
				)}
			</Card>
		</div>
	);
}
