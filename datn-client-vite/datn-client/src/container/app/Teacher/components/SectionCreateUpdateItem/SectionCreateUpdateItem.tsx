/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { SectionSchema } from "@/shared/schema/course.schema";
import { Button, Form, Input, Space, Typography } from "antd";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LectureCreateUpdate from "../LectureCreateUpdate";
import styles from "./SectionCreateUpdateItem.module.scss";
const cx = classNames.bind(styles);

export default function SectionCreateUpdateItem({
	section,
	index,
}: {
	section: SectionSchema;
	index: number;
}) {
	const [editingSection, setEditingLesson] = useState<boolean>(false);
	const { courseId } = useParams<any>();

	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();
	const [updateSection] = courseApi.endpoints.updateSection.useMutation();
	const [deleteSection, { isLoading: isDeletingSection }] =
		courseApi.endpoints.deleteSection.useMutation();

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(section);
	}, [section]);

	async function onSubmit(values: any) {
		try {
			const data = {
				courseId: courseId as string,
				data: {
					id: section.id,
					name: values?.name,
					description: values?.description,
				},
			};

			await updateSection(data).unwrap();
			toast.success("Update section successfully!");
			getCourse({ id: courseId as string });
			setEditingLesson(false);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	async function handleDeleteSection(id: string) {
		try {
			const data = {
				courseId: courseId,
				data: { id: id, courseId: courseId },
			};

			await deleteSection(data).unwrap();
			getCourse({ id: courseId as string });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={cx("wrapper")}>
			<div className={cx("name")}>
				{editingSection ? (
					<Form
						onFinish={onSubmit}
						form={form}
						className={cx("form")}
					>
						<Form.Item name={"name"} label={`Chương ${index + 1}:`}>
							<Input />
						</Form.Item>
						<Form.Item
							label="Mô tả về chương:"
							name={"description"}
						>
							<Input />
						</Form.Item>
						<div className={cx("btns")}>
							<Button
								onClick={() => {
									setEditingLesson(null);
								}}
								danger
							>
								Hủy
							</Button>
							<Button htmlType="submit" type="primary">
								Lưu
							</Button>
						</div>
					</Form>
				) : (
					<div>
						<Typography.Title level={5}>
							Chương {index + 1}: {section.name}
						</Typography.Title>
						<Typography.Paragraph italic>
							{section.description}
						</Typography.Paragraph>
					</div>
				)}
				<Space>
					{!editingSection && (
						<Button
							type="dashed"
							icon={<Pencil size={16} />}
							onClick={() => {
								setEditingLesson(true);
							}}
						>
							Edit
						</Button>
					)}
					<Button
						onClick={() => {
							handleDeleteSection(section.id);
						}}
						loading={isDeletingSection}
						danger
					>
						Xóa
					</Button>
				</Space>
			</div>
			<LectureCreateUpdate sectionData={section} />
		</div>
	);
}
