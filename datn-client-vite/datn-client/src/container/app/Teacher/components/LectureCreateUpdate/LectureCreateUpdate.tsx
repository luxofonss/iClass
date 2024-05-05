/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./LectureCreateUpdate.module.scss";
import {
	Button,
	Card,
	Form,
	Input,
	Space,
	Typography,
	Upload,
	UploadProps,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { SectionSchema } from "@/shared/schema/course.schema";
import { courseApi } from "@/app-data/service/course.service";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { uploadApi } from "@/app-data/service/upload.service";
import ReactPlayer from "react-player";
import { Plus, UploadCloud, Video } from "lucide-react";
const cx = classNames.bind(styles);

interface ILectureCreateUpdate {
	sectionData: SectionSchema;
}

export default function LectureCreateUpdate({
	sectionData,
}: ILectureCreateUpdate) {
	const [addingLesson, setAddingLesson] = useState<string | null>(null);
	const [editingLesson, setEdittingLesson] = useState(null);

	const { courseId } = useParams();
	const [addLesson, { isLoading: isAddingLesson }] =
		courseApi.endpoints.addLesson.useMutation();
	const [getCourse, { isLoading: isGettingCourse }] =
		courseApi.endpoints.getCourseById.useLazyQuery();
	const [uploadFile] = uploadApi.endpoints.uploadFile.useMutation();

	const [lessonForm] = Form.useForm();
	const [lessonFormCreate] = Form.useForm();

	console.log("sectionData:; ", sectionData);

	useEffect(() => {
		if (sectionData) {
			lessonForm.setFieldsValue(sectionData);
		}
	}, [sectionData]);

	async function handleAddLesson(values: any) {
		console.log(values);
		try {
			await addLesson({
				courseId,
				sectionId: sectionData?.id,
				data: {
					name: values.name,
					description: values.description,
					order: 1,
					type: addingLesson,
					resourceId: values.resourceId,
				},
			}).unwrap();
			toast.success("Add lesson successfully!");
			getCourse({ id: courseId as string });
			lessonFormCreate.resetFields();
			setAddingLesson(false);
		} catch (error) {
			toast.error("Something went wrong!");
			console.log(error);
		}
		console.log("values:: ", values);
	}

	async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target?.files && e.target?.files?.length > 0)
			try {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append("file", file);
				formData.append("folder", "course");

				const res = await uploadFile(formData).unwrap();
				lessonForm.setFieldValue("resourceId", res?.data?.id);
				lessonForm.setFieldValue("resource", res?.data);
			} catch (error) {
				toast.error("Upload image fail, please try again!");
				console.log("error:: ", error);
			}
	}

	const uploadProps: UploadProps = {
		action: "//jsonplaceholder.typicode.com/posts/",
		listType: "picture",
		previewFile(file) {
			console.log("Your upload file:", file);
			// Your process logic. Here we just mock to the same file
			return fetch(
				"https://next.json-generator.com/api/json/get/4ytyBoLK8",
				{
					method: "POST",
					body: file,
				}
			)
				.then((res) => res.json())
				.then(({ thumbnail }) => thumbnail);
		},
	};

	return (
		<div className={cx("wrapper")}>
			<Form layout="vertical" form={lessonForm}>
				<Form.List name={"lessons"}>
					{(fields, { add, remove }) => (
						<div className={cx("list-items")}>
							{fields.map((field, index) => (
								<Card
									className={cx("list-items__item")}
									key={field.key}
								>
									<div className={cx("heading")}>
										<div>Bài giảng {index + 1}</div>
										<Space>
											{sectionData.lessons[field.name]
												.type === "VIDEO" &&
												sectionData.lessons[field.name]
													.resource === null && (
													<>
														{editingLesson ===
														index ? (
															<Button
																onClick={() => {
																	setEdittingLesson(
																		null
																	);
																}}
															>
																Huỷ thêm nội
																dung
															</Button>
														) : (
															<Button
																icon={
																	<Plus
																		size={
																			16
																		}
																	/>
																}
																onClick={() => {
																	setEdittingLesson(
																		index
																	);
																}}
															>
																Thêm nội dung
															</Button>
														)}
													</>
												)}

											{sectionData.lessons[field.name]
												.type === "ASSIGNMENT" && (
												<Fragment>
													{sectionData.lessons[
														field.name
													].assignment === null ? (
														<Link
															about="blank"
															to={`/teacher/courses/${courseId}/lectures/${
																sectionData
																	.lessons[
																	field.name
																].id
															}/assignment`}
														>
															<Button
																icon={
																	<Plus
																		size={
																			16
																		}
																	/>
																}
															>
																Thêm bài tập
															</Button>
														</Link>
													) : (
														<Link
															about="blank"
															to={`/teacher/courses/${courseId}/lectures/${
																sectionData
																	.lessons[
																	field.name
																].id
															}/assignment/${
																sectionData
																	.lessons[
																	field.name
																].assignment?.id
															}`}
														>
															<Button>
																View assignment
															</Button>
														</Link>
													)}
												</Fragment>
											)}
											<Button
												onClick={() => {
													remove(field.key);
												}}
												danger
											>
												Delete
											</Button>
										</Space>
									</div>
									<Form.Item
										className={cx("input")}
										name={[field.name, "name"]}
										noStyle
									>
										<Input />
									</Form.Item>
									{sectionData.lessons[field.name].type ===
										"VIDEO" &&
									sectionData.lessons[field.name].resource ? (
										<Fragment>
											<ReactPlayer
												width="320px"
												height="240px"
												controls
												url={
													sectionData.lessons[
														field.name
													]?.resource?.url
												}
											/>
										</Fragment>
									) : editingLesson === index ? (
										<Upload
											className={cx("adding-video")}
											{...uploadProps}
										>
											<Button icon={<UploadCloud />}>
												Thêm video bài giảng
											</Button>
										</Upload>
									) : null}
								</Card>
							))}
						</div>
					)}
				</Form.List>
			</Form>
			{addingLesson ? (
				<Card className={cx("lesson-form")}>
					<Form
						form={lessonFormCreate}
						onFinish={(values) => handleAddLesson(values)}
						layout="vertical"
					>
						<Form.Item label="Tên bài" name="name">
							<Input placeholder="VD: Thì hiện tại đơn" />
						</Form.Item>
						<Form.Item label="Mô tả về bài học" name="description">
							<Input placeholder="VD: Ở bài học này, các bạn sẽ hiểu rõ cấu trúc thì hiện tại đơn và cách sử dụng." />
						</Form.Item>
						{addingLesson === "VIDEO" ? (
							<div>
								<Form.Item label="Video">
									<Input
										onChange={(e) => {
											handleUploadFile(e);
										}}
										type="file"
									/>
								</Form.Item>
								<Form.Item hidden name={"resourceId"}>
									<Input />
								</Form.Item>
								<Form.Item
									hidden
									noStyle
									name={["resource", "id"]}
								>
									<Input />
								</Form.Item>
							</div>
						) : null}
						<Space align="end">
							<Button
								onClick={() => {
									setAddingLesson(null);
								}}
								loading={false}
							>
								Hủy
							</Button>
							<Button
								type="primary"
								onClick={() => {
									lessonFormCreate.submit();
								}}
								loading={isAddingLesson}
							>
								Tạo
							</Button>
						</Space>
					</Form>
				</Card>
			) : (
				<Space>
					<Button
						htmlType="button"
						style={{
							marginTop: 12,
						}}
						onClick={() => {
							setAddingLesson("VIDEO");
						}}
						icon={<Video size={16} />}
					>
						Thêm bài giảng
					</Button>
					<Button
						htmlType="button"
						style={{
							marginTop: 12,
						}}
						onClick={() => {
							setAddingLesson("ASSIGNMENT");
						}}
					>
						Thêm bài tập
					</Button>
				</Space>
			)}
		</div>
	);
}
