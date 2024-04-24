/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./SectionCreateUpdate.module.scss";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { courseApi } from "@/app-data/service/course.service";
import { CourseViewSchema, LectureSchema } from "@/shared/schema/course.schema";
import LectureCreateUpdate from "../LectureCreateUpdate";
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

	const [addSection, { isLoading: isAddingSection }] =
		courseApi.endpoints.addSection.useMutation();

	const [sectionForm] = Form.useForm();

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
			sectionForm.resetFields();

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
								{fields.map((field) => (
									<div
										className={cx("inputs")}
										key={field.key}
									>
										<Typography.Text strong>
											Section {field.key + 1}:
										</Typography.Text>
										<div
											className={cx(
												"curriculum__section__name"
											)}
										>
											<Form.Item
												noStyle
												name={[field.name, "name"]}
												className={cx("label")}
												label="Section"
											>
												<Input />
											</Form.Item>
											<Button
												onClick={() => {
													remove(field.name);
												}}
											>
												Remove
											</Button>
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
						<Card>
							<Form
								form={sectionForm}
								onFinish={handleAddSection}
								layout="vertical"
							>
								<Form.Item label="Title" name="name">
									<Input placeholder="Enter your title" />
								</Form.Item>
								<Form.Item
									label="What will students be able to do at the end of this section?"
									name="description"
								>
									<Input placeholder="Enter your description" />
								</Form.Item>
								<Button
									type="primary"
									onClick={() => {
										sectionForm.submit();
									}}
									loading={isAddingSection}
								>
									Create
								</Button>
							</Form>
						</Card>
					) : (
						<Button
							htmlType="button"
							style={{ marginTop: 12 }}
							onClick={() => {
								setAddingSection(true);
							}}
						>
							Add section
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
}
