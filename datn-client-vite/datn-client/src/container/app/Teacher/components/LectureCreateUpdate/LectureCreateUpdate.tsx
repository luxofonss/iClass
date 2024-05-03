/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./LectureCreateUpdate.module.scss";
import { Button, Card, Form, Input, Space } from "antd";
import { Fragment, useEffect, useState } from "react";
import { SectionSchema } from "@/shared/schema/course.schema";
import { courseApi } from "@/app-data/service/course.service";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { uploadApi } from "@/app-data/service/upload.service";
import ReactPlayer from "react-player";
const cx = classNames.bind(styles);

interface ILectureCreateUpdate {
	sectionData: SectionSchema;
}

export default function LectureCreateUpdate({
	sectionData,
}: ILectureCreateUpdate) {
	const [addingLesson, setAddingLesson] = useState<string | null>(null);

	const { courseId } = useParams();
	const [addLesson, { isLoading: isAddingLesson }] =
		courseApi.endpoints.addLesson.useMutation();
	const [getCourse, { isLoading: isGettingCourse }] =
		courseApi.endpoints.getCourseById.useLazyQuery();
	const [uploadFile] = uploadApi.endpoints.uploadFile.useMutation();

	const [lessonForm] = Form.useForm();

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
			lessonForm.resetFields();
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

	return (
		<div className={cx("wrapper")}>
			<Form layout="vertical" form={lessonForm}>
				<Form.List name={"lessons"}>
					{(fields, { add, remove }) => (
						<div className={cx("list-items")}>
							{fields.map((field) => (
								<Card
									className={cx("list-items__item")}
									key={field.key}
								>
									<Form.Item
										noStyle
										className={cx("list-items__item__name")}
										name={[field.name, "name"]}
									>
										<Input />
									</Form.Item>

									{sectionData.lessons[field.name].type ===
										"VIDEO" ? (
										<Fragment>
											<Form.Item
												noStyle
												className={cx(
													"list-items__item__name"
												)}
												name={[
													field.name,
													"resource",
													"name",
												]}
											>
												<Input />
											</Form.Item>
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
									) : (
										<Space>
											Assignment
											{sectionData.lessons[field.name]
												?.assignment === null ? (
												<Link
													about="blank"
													to={`/teacher/courses/${courseId}/lectures/${sectionData.lessons[
														field.name
													].id
														}/assignment`}
												>
													<Button>
														Add Assignment
													</Button>
												</Link>
											) : (
												<Link
													about="blank"
													to={`/teacher/courses/${courseId}/lectures/${sectionData.lessons[
														field.name
													].id
														}/assignment/${sectionData.lessons[
															field.name
														].assignment?.id
														}`}
												>
													<Button>
														View assignment
													</Button>
												</Link>
											)}
										</Space>
									)}
									<Button
										onClick={() => {
											remove(field.key);
										}}
									>
										Delete
									</Button>
								</Card>
							))}
						</div>
					)}
				</Form.List>
			</Form>
			{addingLesson ? (
				<Card>
					<Form
						form={lessonForm}
						onFinish={(values) => handleAddLesson(values)}
						layout="vertical"
					>
						<Form.Item label="Lesson Title" name="name">
							<Input placeholder="Enter your title" />
						</Form.Item>
						<Form.Item label="Short description" name="description">
							<Input placeholder="Enter your description" />
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
						<Space>
							<Button
								onClick={() => {
									setAddingLesson(null);
								}}
								loading={false}
							>
								Cancel
							</Button>
							<Button
								type="primary"
								onClick={() => {
									lessonForm.submit();
								}}
								loading={isAddingLesson}
							>
								Create
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
					>
						Add lesson
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
						Add assignment
					</Button>
				</Space>
			)}
		</div>
	);
}
