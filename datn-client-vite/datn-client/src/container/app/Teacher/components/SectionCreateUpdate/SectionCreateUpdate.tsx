/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from "@/app-data/service/course.service";
import { CourseViewSchema } from "@/shared/schema/course.schema";
import { Button, Form, Input, Space } from "antd";
import classNames from "classnames/bind";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SectionCreateUpdateItem from "../SectionCreateUpdateItem";
import styles from "./SectionCreateUpdate.module.scss";
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
			<div className={cx("curriculum")}>
				<div className={cx("curriculum__section")}>
					{courseData?.sections.map((section, index) => (
						<SectionCreateUpdateItem
							section={section}
							index={index}
						/>
					))}
				</div>

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
		</div>
	);
}
