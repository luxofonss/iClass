/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./NewClassDraft.module.scss";
import { Button, Form, Input, Select, Typography } from "antd";
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
		<div className={cx("wrapper", "container")}>
			<Typography.Title level={3}>Tạo khóa học mới</Typography.Title>
			<Form
				className={cx("form")}
				form={form}
				onFinish={onSubmit}
				layout="vertical"
			>
				<Form.Item
					name="name"
					label="Đặt một cái tên thật hay cho khóa học của bạn?"
				>
					<Input
						placeholder="VD: Khóa học giúp bạn đạt 9.0 Ielts!"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Hãy cho những học viên tiềm năng biết thêm về khóa học"
				>
					<Input
						placeholder="VD: Khóa học sẽ giúp gì cho học viên, thời gian bao lâu"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="subjectId"
					label="Chọn phân loại cho khóa học của bạn?"
				>
					<Select
						size="large"
						placeholder="Chọn 1 trong số các phân loại ở đây!"
					>
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
					className={cx("submit-btn")}
					htmlType="submit"
					loading={isCreatingCourse}
					type="primary"
				>
					Tạo khóa học ngay
				</Button>
			</Form>
		</div>
	);
}
