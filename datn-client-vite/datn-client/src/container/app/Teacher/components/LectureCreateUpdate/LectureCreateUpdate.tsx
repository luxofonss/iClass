/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from "@/app-data/service/course.service";
import { uploadApi } from "@/app-data/service/upload.service";
import { SectionSchema } from "@/shared/schema/course.schema";
import { Button, Card, Form, Input, Space } from "antd";
import classNames from "classnames/bind";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LectureCreateUpdateItem from "../LectureCreateUpdateItem";
import styles from "./LectureCreateUpdate.module.scss";
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
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();
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
			setAddingLesson(null);
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
			{sectionData?.lessons
				?.map((lesson, index) => {
					return (
						<LectureCreateUpdateItem
							sectionId={sectionData.id}
							key={lesson?.id}
							lesson={lesson}
							index={sectionData?.lessons?.length - index - 1}
						/>
					);
				})
				.reverse()}
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
						{/* {addingLesson === "VIDEO" ? (
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
						) : null} */}
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
