/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { uploadApi } from "@/app-data/service/upload.service";
import ColorPrefix from "@/components/ColorPrefix";
import { COLOR, COURSE_LEVEL_OPS } from "@/shared/constants";
import {
	CourseInfoSchema,
	CourseUpdateSchema,
	CourseViewSchema,
} from "@/shared/schema/course.schema";
import {
	Button,
	Col,
	DatePicker,
	Divider,
	Empty,
	Form,
	Image,
	Input,
	Row,
	Select,
	Space,
	Tabs,
	Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import {
	GitBranch,
	LucideAppWindow,
	MessageCircle,
	Plus,
	School,
	Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SectionCreateUpdate from "../../components/SectionCreateUpdate";
import styles from "./NewClass.module.scss";

const cx = classNames.bind(styles);

export default function NewClass() {
	const [backgroundUrl, setBackgroundUrl] = useState("");
	const [thumbnail, setThumbnail] = useState<string | null>(null);

	const [getSubjects, { data: subjects, isLoading: isGettingSubjects }] =
		courseApi.endpoints.getSubjects.useLazyQuery();
	const [uploadImage] = uploadApi.endpoints.uploadFile.useMutation();
	const [updateCourse, { isLoading: isCreatingCourse }] =
		courseApi.endpoints.updateCourse.useMutation();
	const [getCourseById, { data: courseData }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	const { courseId } = useParams();
	const [form] = Form.useForm();

	async function handleGetCourse() {
		try {
			const data = await getCourseById({
				id: courseId as string,
			}).unwrap();
			form.setFieldsValue({
				...data?.data,
				startDate: dayjs(data?.data?.startDate ?? new Date()),
				endDate: dayjs(data?.data?.endDate ?? new Date()),
			});
			setThumbnail(data?.data?.thumbnail);
			setBackgroundUrl(data?.data?.backgroundImage);

			if (
				data?.data?.courseInfos &&
				data?.data?.courseInfos?.length > 0
			) {
				const intends: CourseInfoSchema[] = [];
				const requirements: CourseInfoSchema[] = [];
				const whos: CourseInfoSchema[] = [];
				data?.data?.courseInfos?.forEach((info) => {
					switch (info?.type) {
						case "WHO": {
							whos.push(info);
							break;
						}
						case "REQUIREMENT": {
							requirements.push(info);
							break;
						}
						case "INTEND": {
							intends.push(info);
							break;
						}
					}
				});
				form.setFieldValue("intend", intends);
				form.setFieldValue("requirement", requirements);
				form.setFieldValue("who", whos);
			}
		} catch (error: any) {
			toast.error(error?.data?.message || "Get course fail!");
		}
	}

	useEffect(() => {
		if (courseId) {
			handleGetCourse();
		}
	}, [courseId]);

	async function onSubmit(values: any) {
		try {
			console.log("values:: ", values);
			const data: CourseUpdateSchema = {
				id: courseId as string,
				name: values.name,
				description: values.description,
				backgroundImage: backgroundUrl,
				thumbnail: thumbnail,
				startDate: values.startDate,
				endDate: values.endDate,
				price: parseInt(values.price),
				currency: "vnd",
				level: values.level,
				subjectId: values.subjectId,
				grade: values.grade,
				courseInfos: [],
				sections: values.sections,
			};

			if (values?.intend?.length > 0) {
				data.courseInfos.push(...values.intend);
			}
			if (values?.requirement?.length > 0) {
				data.courseInfos.push(...values.requirement);
			}
			if (values?.who?.length > 0) {
				data.courseInfos.push(...values.who);
			}
			if (values?.values?.welcome_msg) {
				data.courseInfos.push({
					type: "WELCOME_MSG",
					content: values.welcome_msg,
				});
			}

			if (values?.values?.congrat_msg) {
				data.courseInfos.push({
					type: "WELCOME_MSG",
					content: values.congrat_msg,
				});
			}

			await updateCourse(data).unwrap();
			toast.success("Update course successfully!");
		} catch (error) {
			console.log("error:: ", error);
			toast.error("Create course fail!");
		}
	}

	async function handleUploadImage(
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) {
		if (e.target?.files && e.target?.files?.length > 0)
			try {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append("file", file);
				formData.append("folder", "course");

				const res = await uploadImage(formData).unwrap();

				console.log("res:: ", res, res?.data?.url);
				if (name === "thumbnail") {
					setThumbnail(res.data.url);
				} else if (name === "background_img")
					setBackgroundUrl(res.data.url);
			} catch (error) {
				toast.error("Upload image fail, please try again!");
				console.log("error:: ", error);
			}
	}

	console.log(courseData?.data);

	return (
		<div className={cx("new-class", "container")}>
			<Form form={form} onFinish={onSubmit} layout="vertical">
				<Tabs
					className={cx("content")}
					tabPosition="left"
					tabBarExtraContent={
						<div>
							<Button
								loading={isCreatingCourse}
								className={cx("submit-btn")}
								type="primary"
								htmlType="submit"
							>
								Lưu
							</Button>
						</div>
					}
				>
					<Tabs.TabPane
						key={1}
						tabKey="1"
						icon={
							<Space>
								<LucideAppWindow size={14} />
								Thông tin lớp học
							</Space>
						}
					>
						<div id="landing-page" className={cx("section")}>
							<div className={cx("section__heading")}>
								<div className={cx("title")}>
									<ColorPrefix
										color={COLOR.SECONDARY.GREEN}
									/>
									<Typography.Title level={4}>
										Thông tin lớp học
									</Typography.Title>
								</div>
								<div className={cx("description")}>
									Bạn sẽ cập nhật những thông tin của lớp học,
									phần quyết định khả năng thành công của lớp
									học, giúp bạn có thể xuất hiện trên Google.
									Hãy nghĩ em bạn sẽ muốn đọc gì khi là một
									học viên.
								</div>
							</div>
							<Divider />
							<Form.Item
								name="name"
								className={cx("label")}
								label="Tên lớp học"
								help="Tên lớp học nên gây ấn tượng, đầy đủ thông tin và tối ưu về SEO."
							>
								<Input
									placeholder="VD: Lớp luyện IELTS cho người mới "
									size="middle"
								/>
							</Form.Item>
							<Form.Item
								name="description"
								className={cx("label")}
								label="Mô tả lớp học"
								help="Viết về lớp học một cách đầy đủ "
							>
								<TextArea placeholder="VD: Lớp luyện IELTS cho người mới " />
							</Form.Item>
							<Row gutter={24}>
								{/* <Col span={6}>
									<Form.Item
										name="subjectId"
										className={cx("label")}
										label="Subject"
									>
										<AppSelect
											// selectAll
											data={subjects?.data}
											getData={() => {
												getSubjects(null, false);
											}}
											isGettingData={isGettingSubjects}
											allowClear
											placeholder="Select subject"
											labelField="name"
											valueField="id"
										/>
									</Form.Item>
								</Col> */}
								{/* <Col span={6}>
									<Form.Item
										name="grade"
										className={cx("label")}
										label="Grade"
									>
										<Select placeholder="Grade">
											<Select.Option value={10}>
												10
											</Select.Option>
											<Select.Option value={11}>
												11
											</Select.Option>
											<Select.Option value={12}>
												12
											</Select.Option>
										</Select>
									</Form.Item>
								</Col> */}
								<Col span={6}>
									<Form.Item
										name="level"
										className={cx("label")}
										label="Trình độ (level)"
									>
										<Select
											placeholder="Level"
											options={COURSE_LEVEL_OPS}
										/>
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										hidden
										initialValue={0}
										name="price"
										className={cx("label")}
										label="Price"
									>
										<Input
											size="middle"
											type="number"
											addonAfter="VND"
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item
										name="startDate"
										className={cx("label")}
										label="Thời gian lớp học bắt đầu"
									>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										name="endDate"
										className={cx("label")}
										label="Thời gian lớp học kết thúc"
									>
										<DatePicker />
									</Form.Item>
								</Col>
							</Row>

							<Divider />
							<Row gutter={24}>
								<Col span={12}>
									<Typography.Paragraph
										className={cx("detail-info")}
									>
										Tải lên ảnh thumbnmail cho lớp học của
										bạn ở đây!
									</Typography.Paragraph>
									<Form.Item
										name="thumbnail"
										hidden
										className={cx("label")}
										label="Thumbnail lớp học"
									>
										<Input size="middle" />
									</Form.Item>
									<Form.Item
										className={cx("label")}
										label="Thumbnail lớp học"
									>
										<Input
											size="middle"
											onChange={(e) => {
												handleUploadImage(
													e,
													"thumbnail"
												);
											}}
											type="file"
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									{thumbnail ? (
										<Image
											style={{
												maxHeight: "150px",
												width: "500px",
												objectFit: "cover",
											}}
											src={thumbnail}
										/>
									) : (
										<Empty />
									)}
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={12}>
									<Typography.Paragraph
										className={cx("detail-info")}
									>
										Tải lên ảnh background cho lớp học của
										bạn ở đây!
									</Typography.Paragraph>
									<Form.Item
										name="backgroundImage"
										hidden
										className={cx("label")}
										label="Ảnh nền lớp học"
									>
										<Input size="middle" />
									</Form.Item>
									<Form.Item
										className={cx("label")}
										label="Ảnh nền lớp học"
									>
										<Input
											size="middle"
											onChange={(e) => {
												handleUploadImage(
													e,
													"background_img"
												);
											}}
											type="file"
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									{backgroundUrl ? (
										<Image
											style={{
												maxHeight: "150px",
												width: "500px",
												objectFit: "cover",
											}}
											src={backgroundUrl}
										/>
									) : (
										<Empty />
									)}
								</Col>
							</Row>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane
						key={2}
						tabKey="2"
						icon={
							<Space>
								<School size={14} />
								Intended learners
							</Space>
						}
					>
						<div id="intend-learner" className={cx("section")}>
							<div className={cx("section__heading")}>
								<div className={cx("title")}>
									<ColorPrefix
										color={COLOR.SECONDARY.VIOLET}
									/>
									<Typography.Title level={4}>
										Intend learners
									</Typography.Title>
								</div>
								<p className={cx("description")}>
									Các mô tả sau đây sẽ được hiển thị công khai
									trên trang đích của khoá học của bạn và sẽ
									có tác động trực tiếp đến hiệu suất khoá học
									của bạn. Những gì được viết sẽ giúp cho các
									học viê tiềm năng biết được độ phù hợp đối
									với khoá học.
								</p>
							</div>

							<Divider />

							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									Người học sẽ học được gì trong lớp học của
									bạn?
								</h2>
								<p className={cx("info-block__description")}>
									Cung cấp nhanh những gì học viên được học và
									có được sau khoá học sẽ giúp bạn thu hút
									những học viên tiềm năng.
								</p>
								<Form.List name="intend">
									{(fields, { add, remove }) => (
										<>
											{fields.map((field) => (
												<div
													className={cx(
														"info-block__question-list"
													)}
													key={field.key}
												>
													<Form.Item
														className={cx(
															"info-block__question-list__input"
														)}
														name={[
															field.name,
															"content",
														]}
													>
														<Input
															size="middle"
															placeholder="VD: Nắm được ngữ pháp Tiếng Anh trình độ A1"
														/>
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input size="middle" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"type",
														]}
														initialValue={"INTEND"}
													>
														<Input size="middle" />
													</Form.Item>
													<Button
														onClick={() =>
															remove(field.key)
														}
														danger
														icon={
															<Trash size={14} />
														}
													/>
												</div>
											))}
											<Form.Item>
												<Button
													htmlType="button"
													onClick={() => add()}
													type="dashed"
													icon={<Plus size={14} />}
												>
													Thêm điều mới
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									Những kĩ năng cần có để học lớp học?
								</h2>
								<p className={cx("info-block__description")}>
									Liệt kê các kỹ năng, kinh nghiệm, công cụ
									cần thiết hoặc thiết bị người học nên có
									trước khi tham gia khóa học của bạn. Nếu
									không có yêu cầu, hãy sử dụng không gian này
									như một cơ hội để hạ thấp rào cản đối với
									người mới bắt đầu
								</p>
								<Form.List name="requirement">
									{(fields, { add, remove }) => (
										<>
											{fields.map((field) => (
												<div
													className={cx(
														"info-block__question-list"
													)}
													key={field.key}
												>
													<Form.Item
														className={cx(
															"info-block__question-list__input"
														)}
														name={[
															field.name,
															"content",
														]}
													>
														<Input
															size="middle"
															placeholder="VD: Cần nắm được ngữ pháp cơ bản...."
														/>
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input size="middle" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"type",
														]}
														initialValue={
															"REQUIREMENT"
														}
													>
														<Input size="middle" />
													</Form.Item>
													<Button
														onClick={() =>
															remove(field.key)
														}
														danger
														icon={
															<Trash size={14} />
														}
													/>
												</div>
											))}
											<Form.Item>
												<Button
													htmlType="button"
													onClick={() => add()}
													type="dashed"
													icon={<Plus size={14} />}
												>
													Thêm điều mới
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									Khóa học này dành cho ai?
								</h2>
								<p className={cx("info-block__description")}>
									Viết mô tả rõ ràng về mục đích những người
									học khóa học của bạn, những người sẽ tìm
									thấy bạn nội dung khóa học có giá trị. Điều
									này sẽ giúp bạn thu hút đúng người học vào
									khóa học của bạn.
								</p>
								<Form.List name="who">
									{(fields, { add, remove }) => (
										<>
											{fields.map((field) => (
												<div
													className={cx(
														"info-block__question-list"
													)}
													key={field.key}
												>
													<Form.Item
														className={cx(
															"info-block__question-list__input"
														)}
														name={[
															field.name,
															"content",
														]}
													>
														<Input
															size="middle"
															placeholder="VD: Học sinh lớp 12 muốn đạt bằng IELTS điểm cao."
														/>
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input size="middle" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"type",
														]}
														initialValue={"WHO"}
													>
														<Input size="middle" />
													</Form.Item>
													<Button
														onClick={() =>
															remove(field.key)
														}
														danger
														icon={
															<Trash size={14} />
														}
													/>
												</div>
											))}
											<Form.Item>
												<Button
													htmlType="button"
													onClick={() => add()}
													type="dashed"
													icon={<Plus size={14} />}
												>
													Thêm điều mới
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane
						key={3}
						tabKey="3"
						icon={
							<Space>
								<GitBranch size={14} />
								Curriculum
							</Space>
						}
					>
						<div className={cx("section")}>
							<div className={cx("section__heading")}>
								<div className={cx("title")}>
									<ColorPrefix
										color={COLOR.SECONDARY.YELLOW}
									/>
									<Typography.Title level={4}>
										Chương trình học
									</Typography.Title>
								</div>
								<p className={cx("description")}>
									Đây là phần cập nhật nội dung bài học như
									video bài học, bài tập ôn tập, kiểm tra.
								</p>
							</div>
							<Divider />
							<SectionCreateUpdate
								courseData={
									courseData?.data as CourseViewSchema
								}
								handleGetCourse={handleGetCourse}
							/>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</Form>
		</div>
	);
}
