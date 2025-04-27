/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { SUBJECT_OPTIONS } from "@/shared/constants";
import { Button, Form, Input, Select, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./NewClassDraft.module.scss";

const cx = classNames.bind(styles);

export default function NewCourseDraft() {
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

			navigate(`/teacher/courses/${response?.data?.id}/update`);
		} catch (error: any) {
			toast.error(error?.data?.message || "Create course error!");
		}
	}

	return (
		<div className={cx("wrapper", "container")}>
			<Typography.Title level={3}>Tạo lớp học mới</Typography.Title>
			<Form
				className={cx("form")}
				form={form}
				onFinish={onSubmit}
				layout="vertical"
			>
				<Form.Item
					name="name"
					label="Đặt một cái tên thật hay cho lớp học của bạn?"
				>
					<Input
						placeholder="VD: Lớp học giúp bạn đạt 9.0 Ielts!"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Hãy cho những học viên tiềm năng biết thêm về lớp học"
				>
					<Input
						placeholder="VD: Lớp học sẽ giúp gì cho học viên, thời gian bao lâu"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="subjectId"
					label="Chọn phân loại cho lớp học của bạn?"
				>
					<Select
						size="large"
						placeholder="Chọn 1 trong số các phân loại ở đây!"
					>
						{SUBJECT_OPTIONS?.map((option) => {
							return (
								<Select.Option value={option?.value}>
									{option?.label}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Button
					className={cx("submit-btn")}
					htmlType="submit"
					loading={isCreatingCourse}
					type="primary"
				>
					Tạo lớp học ngay
				</Button>
			</Form>
		</div>
	);
}
