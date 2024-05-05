/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./SectionCreateUpdate.module.scss";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { courseApi } from "@/app-data/service/course.service";
import { CourseViewSchema, LectureSchema } from "@/shared/schema/course.schema";
import LectureCreateUpdate from "../LectureCreateUpdate";
import { Pencil, Plus } from "lucide-react";
const cx = classNames.bind(styles);

interface ISectionCreateUpdateProps {
	handleGetCourse: () => void;
	courseData: CourseViewSchema;
}

export default function SectionCreateUpdate({
	handleGetCourse,
	courseData,
}: ISectionCreateUpdateProps) {
	const [addingSection, setAddingSection] = useState<boolean>(false);
	const [editingSection, setEditingLesson] = useState<null | number>(null);

	const [addSection, { isLoading: isAddingSection }] =
		courseApi.endpoints.addSection.useMutation();

	const [sectionForm] = Form.useForm();
	const [sectionFormCreate] = Form.useForm();

	const { courseId } = useParams();
	console.log("courseData:; ", courseData);

	useEffect(() => {
		if (courseData) {
			console.log("courseData:; ", courseData);
			sectionForm.setFieldsValue(courseData);
		}
	}, [courseData]);

	async function handleAddSection(values: any) {
		try {
			console.log("values:: ", values);
			const payload = {
				courseId: courseId,
				data: {
					name: values.name,
					description: values.description,
				},
			};

			await addSection(payload).unwrap();
			handleGetCourse();
			setAddingSection(false);
			sectionFormCreate.resetFields();

			toast.success("Add section successfully!");
		} catch (error: any) {
			toast.error(error?.data?.message || "Add section fails!");
		}
	}

	return (
		<div className={cx("wrapper")}>
			<Form layout="vertical" form={sectionForm}>
				<div className={cx("curriculum")}>
					<Form.List name="sections">
						{(fields, { add, remove }) => (
							<div className={cx("curriculum__section")}>
								{fields.map((field, index) => (
									<div
										className={cx("inputs")}
										key={field.key}
									>
										<div
											className={cx(
												"curriculum__section__name"
											)}
										>
											{editingSection === index ? (
												<div className={cx("form")}>
													<Form.Item
														name={[
															field.name,
															"name",
														]}
														label={`Chương ${
															field.key + 1
														}:`}
													>
														<Input />
													</Form.Item>
													<Form.Item
														label="Mô tả về chương:"
														name={[
															field.name,
															"description",
														]}
													>
														<Input />
													</Form.Item>
													<div className={cx("btns")}>
														<Button
															onClick={() => {
																setEditingLesson(
																	null
																);
															}}
															danger
														>
															Hủy
														</Button>
														<Button type="primary">
															Lưu
														</Button>
													</div>
												</div>
											) : (
												<div>
													<Typography.Title level={5}>
														Chương {field.key + 1}:{" "}
														{
															courseData
																?.sections[
																field.key
															].name
														}
													</Typography.Title>
													<Typography.Paragraph>
														{
															courseData
																?.sections[
																field.key
															].description
														}
													</Typography.Paragraph>
												</div>
											)}
											<Space>
												{editingSection !== index && (
													<Button
														type="dashed"
														icon={
															<Pencil size={16} />
														}
														onClick={() => {
															setEditingLesson(
																index
															);
														}}
													>
														Edit
													</Button>
												)}
												<Button
													onClick={() => {
														remove(field.name);
													}}
													danger
												>
													Xóa
												</Button>
											</Space>
										</div>
										<LectureCreateUpdate
											sectionData={
												courseData?.sections[field.key]
											}
										/>
									</div>
								))}
							</div>
						)}
					</Form.List>
					{addingSection ? (
						<Form
							form={sectionFormCreate}
							onFinish={handleAddSection}
							layout="vertical"
						>
							<Form.Item label="Tên chương" name="name">
								<Input placeholder="VD: Giới thiệu về các thì trong tiếng Anh" />
							</Form.Item>
							<Form.Item
								label="Học sinh sẽ có thể làm gì khi kết thúc phần này?"
								name="description"
							>
								<Input placeholder="VD: Hiểu rõ về các thì" />
							</Form.Item>
							<Space>
								<Button
									danger
									onClick={() => {
										setAddingSection(false);
									}}
								>
									Hủy
								</Button>
								<Button
									type="primary"
									onClick={() => {
										sectionFormCreate.submit();
									}}
									loading={isAddingSection}
								>
									Tạo
								</Button>
							</Space>
						</Form>
					) : (
						<Button
							htmlType="button"
							style={{ marginTop: 12 }}
							onClick={() => {
								setAddingSection(true);
							}}
							icon={<Plus size={16} />}
						>
							Thêm chương mới
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
}
