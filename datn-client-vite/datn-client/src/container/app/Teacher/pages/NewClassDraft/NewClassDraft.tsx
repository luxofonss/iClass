/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./NewClassDraft.module.scss";
import { Button, Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import { courseApi } from "@/app-data/service/course.service";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function NewClassDraft() {
	const [createCourse, { isLoading: isCreatingCourse }] =
		courseApi.endpoints.createCourse.useMutation();

	const navigate = useNavigate();
	const [form] = Form.useForm();

	async function onSubmit(values: any) {
		try {
			const data = {
				name: values.name,
				description: values.description,
				subjectId: values.subjectId,
			};

			const response = await createCourse(data).unwrap();
			toast.success("Create course successfully!");

			navigate(`/teacher/courses/${response?.data}/update`);
		} catch (error: any) {
			toast.error(error?.data?.message || "Create course error!");
		}
	}

	return (
		<div className={cx("wrapper")}>
			<Form form={form} onFinish={onSubmit} layout="vertical">
				<Form.Item name="name" label="How about a working title?">
					<Input
						placeholder="Enter title for your course"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Let your students know more about your course"
				>
					<Input
						placeholder="Enter description for your course"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="subjectId"
					label="What category best fits the knowledge you'll share?"
				>
					<Select size="large" placeholder="Choose a category">
						<Select.Option
							value={"39d6e7e7-1536-4bf3-aabe-194e57843324"}
						>
							10
						</Select.Option>
						<Select.Option
							value={"39d6e7e7-1536-4bf3-aabe-194e57843324"}
						>
							11
						</Select.Option>
						<Select.Option
							value={"39d6e7e7-1536-4bf3-aabe-194e57843324"}
						>
							12
						</Select.Option>
						<Select.Option
							value={"39d6e7e7-1536-4bf3-aabe-194e57843324"}
						>
							TOEIC
						</Select.Option>
						<Select.Option
							value={"39d6e7e7-1536-4bf3-aabe-194e57843324"}
						>
							IELTS
						</Select.Option>
					</Select>
				</Form.Item>
				<Button
					htmlType="submit"
					loading={isCreatingCourse}
					type="primary"
				>
					Create
				</Button>
			</Form>
		</div>
	);
}
