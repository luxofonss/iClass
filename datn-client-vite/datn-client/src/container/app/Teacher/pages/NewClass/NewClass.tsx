/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { uploadApi } from "@/app-data/service/upload.service";
import AppSelect from "@/components/AppSelect";
import ColorPrefix from "@/components/ColorPrefix";
import { COLOR, COURSE_LEVEL_OPS } from "@/shared/constants";
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
import {
	GitBranch,
	LucideAppWindow,
	MessageCircle,
	Plus,
	School,
	Trash,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import styles from "./NewClass.module.scss";
import dayjs from "dayjs";
import {
	CourseInfoSchema,
	CourseUpdateSchema,
	CourseViewSchema,
} from "@/shared/schema/course.schema";
import SectionCreateUpdate from "../../components/SectionCreateUpdate";

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
		<div className={cx("new-class")}>
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
								Submit for Review
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
								Course Landing Page
							</Space>
						}
					>
						<div id="landing-page" className={cx("section")}>
							<div className={cx("section__title")}>
								<ColorPrefix color={COLOR.SECONDARY.GREEN} />
								<Typography.Title level={4}>
									Course landing page
								</Typography.Title>
							</div>
							<Divider />
							<Form.Item
								name="name"
								className={cx("label")}
								label="Class title"
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="description"
								className={cx("label")}
								label="Class description"
							>
								<TextArea />
							</Form.Item>
							<Row gutter={24}>
								<Col span={6}>
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
								</Col>
								<Col span={6}>
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
								</Col>
								<Col span={6}>
									<Form.Item
										name="level"
										className={cx("label")}
										label="Level"
									>
										<Select
											placeholder="Level"
											options={COURSE_LEVEL_OPS}
										/>
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										name="price"
										className={cx("label")}
										label="Price"
									>
										<Input type="number" addonAfter="VND" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={6}>
									<Form.Item
										name="startDate"
										className={cx("label")}
										label="Start time"
									>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										name="endDate"
										className={cx("label")}
										label="End time"
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
										Upload your course image here. It must
										meet our course image quality standards
										to be accepted. Important guidelines:
										750x422 pixels; .jpg, .jpeg,. gif, or
										.png. no text on the image.
									</Typography.Paragraph>
									<Form.Item
										name="thumbnail"
										hidden
										className={cx("label")}
										label="Course thumbnail"
									>
										<Input />
									</Form.Item>
									<Form.Item
										className={cx("label")}
										label="Course thumbnail"
									>
										<Input
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
										Upload your course image here. It must
										meet our course image quality standards
										to be accepted. Important guidelines:
										750x422 pixels; .jpg, .jpeg,. gif, or
										.png. no text on the image.
									</Typography.Paragraph>
									<Form.Item
										name="backgroundImage"
										hidden
										className={cx("label")}
										label="Course background"
									>
										<Input />
									</Form.Item>
									<Form.Item
										className={cx("label")}
										label="Course background"
									>
										<Input
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
							<div className={cx("section__title")}>
								<ColorPrefix color={COLOR.SECONDARY.VIOLET} />
								<Typography.Title level={4}>
									Intend learners
								</Typography.Title>
							</div>
							<Divider />
							<p className={cx("section__description")}>
								The following descriptions will be publicly
								visible on your Course Landing Page and will
								have a direct impact on your course performance.
								These descriptions will help learners decide if
								your course is right for them.
							</p>
							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									What will students learn in your course?
								</h2>
								<p className={cx("info-block__description")}>
									You must enter at least 4 learning
									objectives or outcomes that learners can
									expect to achieve after completing your
									course.
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
														<Input placeholder="this is placeholder" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"type",
														]}
														initialValue={"INTEND"}
													>
														<Input />
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
													type="primary"
													icon={<Plus size={14} />}
												/>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									What are the requirements or prerequisites
									for taking your course?
								</h2>
								<p className={cx("info-block__description")}>
									List the required skills, experience, tools
									or equipment learners should have prior to
									taking your course. If there are no
									requirements, use this space as an
									opportunity to lower the barrier for
									beginners.
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
														<Input placeholder="this is placeholder" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input />
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
														<Input />
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
													type="primary"
													icon={<Plus size={14} />}
												/>
											</Form.Item>
										</>
									)}
								</Form.List>
							</div>
							<div className={cx("info-block")}>
								<h2 className={cx("info-block__title")}>
									Who is this course for?
								</h2>
								<p className={cx("info-block__description")}>
									Write a clear description of the intended
									learners for your course who will find your
									course content valuable. This will help you
									attract the right learners to your course.
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
														<Input placeholder="this is placeholder" />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"id",
														]}
													>
														<Input />
													</Form.Item>
													<Form.Item
														hidden
														name={[
															field.name,
															"type",
														]}
														initialValue={"WHO"}
													>
														<Input />
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
													type="primary"
													icon={<Plus size={14} />}
												/>
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
						<SectionCreateUpdate
							courseData={courseData?.data as CourseViewSchema}
							handleGetCourse={handleGetCourse}
						/>
					</Tabs.TabPane>
					<Tabs.TabPane
						key={4}
						tabKey="4"
						icon={
							<Space>
								<MessageCircle size={14} />
								Course message
							</Space>
						}
					>
						<div id="course-message" className={cx("section")}>
							<div className={cx("section__title")}>
								<ColorPrefix color={COLOR.SECONDARY.ORANGE} />
								<Typography.Title level={4}>
									Course message
								</Typography.Title>
							</div>
							<Divider />
							<p className={cx("section__description")}>
								Write messages to your students (optional) that
								will be sent automatically when they join or
								complete your course to encourage students to
								engage with course content. If you do not wish
								to send a welcome or congratulations message,
								leave the text box blank.
							</p>
							<Form.Item
								name="welcome_msg"
								className={cx("label")}
								label="Welcome message"
							>
								<TextArea />
							</Form.Item>
							<Form.Item
								name="congrat_msg"
								className={cx("label")}
								label="Congratulations message"
							>
								<TextArea />
							</Form.Item>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</Form>
		</div>
	);
}
