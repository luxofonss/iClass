/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import { uploadApi } from "@/app-data/service/upload.service";
import {
	ASSIGNMENT_TYPE,
	QUESTION_LEVEL,
	QUESTION_TYPE,
	QUESTION_TYPE_ENUM,
	TIME_OPTIONS,
} from "@/shared/constants";
import {
	AssignmentCreateSchema,
	QuestionSchema,
} from "@/shared/schema/assignment.schema";
import {
	Button,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Image,
	Input,
	Row,
	Select,
	Space,
	Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import styles from "./AddAssignment.module.scss";

const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

export default function AddAssignment() {
	const [timeType, setTimeType] = useState<string>("free");

	const { assignmentId } = useParams();

	const [form] = Form.useForm();
	const { lessonId } = useParams();

	const [getAssignmentById] =
		assignmentApi.endpoints.getOneById.useLazyQuery();
	const [createAssignment] =
		assignmentApi.endpoints.createAssignment.useMutation();
	const [uploadFile] = uploadApi.endpoints.uploadFile.useMutation();

	useEffect(() => {
		if (assignmentId) {
			handleGetAssignment();
			console.log(form.getFieldsValue());
		}
	}, [assignmentId]);

	async function handleGetAssignment() {
		try {
			const response = await getAssignmentById(assignmentId).unwrap();
			form.setFieldsValue(response?.data);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	const onTimeTypeChange = (value: string) => {
		setTimeType(value);
	};

	const onSubmit = async (values: any) => {
		try {
			console.log("values:: ", values);
			const data = { ...values };
			if (data.time === "custom") {
				data.startTime = data.customTime;
				data.endTime = data.customTime;
			} else {
				data.startTime = null;
				data.endTime = null;
			}

			const body: AssignmentCreateSchema = {
				startTime: data.startTime,
				endTime: data.endTime,
				maxAttemptTimes: data.maxAttemptTimes,
				multipleAttempts: data.multipleAttempts,
				duration: parseInt(data.duration),
				title: data.title,
				description: data.description,
				lessonId: lessonId as string,
				subjectId: "39d6e7e7-1536-4bf3-aabe-194e57843324",
				questions: data.questions?.map(
					(question: any, index: number) => {
						const questionData: QuestionSchema = {
							title: question.title,
							image: question?.image,
							audio: question?.audio,
							type: question.type,
							level: question.level,
							subjectId: question.subjectId,
							order: index,
							mark: parseInt(question.mark, 10),
							choices: question.choices?.map((choice: any) => {
								return {
									content: choice.content,
									order: choice.order,
									isCorrect: choice.isCorrect,
								};
							}),
							answerExplanation: question.answerExplanation,
						};
						return questionData;
					}
				),
			};
			await createAssignment(body).unwrap();

			toast.success("Create assignment successfully!");
		} catch (error: any) {
			console.log("error:: ", error);
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	async function handleUpload(e, name, type) {
		try {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			formData.append("folder", type);

			const res = await uploadFile(formData).unwrap();

			form.setFieldValue(["questions", name, type], res?.data?.url);
			form.validateFields();
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	return (
		<div className={cx("add-assignment")}>
			<Form layout="vertical" form={form} onFinish={onSubmit}>
				<div className={cx("assignment-info")}>
					<Form.Item
						style={{ marginBottom: "0px !important" }}
						className={cx("title")}
						name={"title"}
						label="Title"
					>
						<Input
							style={{ fontWeight: 500 }}
							size="large"
							placeholder="Enter assignment title"
						/>
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "0px !important" }}
						className={cx("description")}
						name={"description"}
						label="Description"
					>
						<TextArea placeholder="Enter assignment description" />
					</Form.Item>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item
								name="time"
								label="Time"
								initialValue={timeType}
							>
								<Select
									onChange={onTimeTypeChange}
									options={TIME_OPTIONS}
								/>
							</Form.Item>
						</Col>

						<Form.Item
							hidden={timeType === "free"}
							name="customTime"
							label="Custom time"
						>
							<RangePicker showTime />
						</Form.Item>

						<Col span={6}>
							<Form.Item name="duration" label="Duration">
								<Input type="number" suffix="minutes" />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								name="assignmentType"
								label="Assignment type"
							>
								<Select
									options={Object.values(ASSIGNMENT_TYPE)}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								name="maxAttemptTimes"
								initialValue={1}
								label="Times of attempts"
							>
								<Input type="number" />
							</Form.Item>
						</Col>
					</Row>
				</div>
				<Form.List name="questions">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }) => (
								<div key={key} className={cx("question")}>
									<div className={cx("heading")}>
										{/* <h2 className={cx('title')}>Question 1: How to abc</h2> */}
										<div className={cx("info")}>
											<Tag
												className={cx("title")}
												color="green"
											>
												Question {key + 1}
											</Tag>
											<Form.Item
												hidden
												name={[name, "id"]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												initialValue={
													QUESTION_TYPE_ENUM.SINGLE_CHOICE
												}
												style={{ margin: 0 }}
												name={[name, "type"]}
											>
												<Select
													className={cx("type")}
													options={QUESTION_TYPE}
												/>
											</Form.Item>
											<Form.Item name={[name, "level"]}>
												<Select
													options={Object.values(
														QUESTION_LEVEL
													)}
													placeholder="Level"
												/>
											</Form.Item>
											<Form.Item name={[name, "mark"]}>
												<Input
													type="number"
													placeholder="Enter question's point "
													addonAfter="Point"
												/>
											</Form.Item>
											<Form.Item
												hidden
												name={[name, "order"]}
												initialValue={key}
											>
												<Input />
											</Form.Item>
											<Form.Item
												hidden
												name="subjectId"
												initialValue={
													"39d6e7e7-1536-4bf3-aabe-194e57843324"
												}
											>
												<Input />
											</Form.Item>
										</div>
										<Button
											icon={<Trash size={14} />}
											className={cx("btn-remove")}
											onClick={() => remove(name)}
											danger
										/>
									</div>
									<Form.Item name={[name, "title"]}>
										{/* <SimpleEditor
											onValueChange={(value) => {
												form.setFieldValue(
													["questions", key, "title"],
													value
												);
											}}
											placeholder="Enter question"
										/> */}
										<TextArea />
									</Form.Item>
									<div className={cx("options")}>
										<Space direction="vertical">
											<Input
												onChange={(e) => {
													handleUpload(
														e,
														name,
														"image"
													);
												}}
												type="file"
											/>
											<Form.Item
												name={[name, "image"]}
												hidden
											>
												<Input />
											</Form.Item>
											{form.getFieldValue([
												"questions",
												key,
												"image",
											]) && (
												<Image
													height={300}
													src={form.getFieldValue([
														"questions",
														key,
														"image",
													])}
													alt="img"
												/>
											)}
										</Space>
										<Space direction="vertical">
											<Input
												onChange={(e) => {
													handleUpload(
														e,
														name,
														"audio"
													);
												}}
												type="file"
											/>
											<Form.Item
												name={[name, "audio"]}
												hidden
												initialValue={null}
											>
												<Input />
											</Form.Item>
											{form.getFieldValue([
												"questions",
												key,
												"audio",
											]) && (
												<ReactPlayer
													url={form.getFieldValue([
														"questions",
														key,
														"audio",
													])}
													controls
												/>
											)}
										</Space>
										<Form.Item
											name={[name, "audio"]}
											hidden
										>
											<Input />
										</Form.Item>
									</div>
									<div className={cx("answer")}>
										<Form.List name={[name, "choices"]}>
											{(fields, { add, remove }) => {
												const questionType =
													form.getFieldValue([
														"questions",
														key,
														"type",
													]);
												return (
													<div>
														<Row gutter={24}>
															{fields.map(
																(
																	field,
																	index
																) => (
																	<Col
																		span={
																			12
																		}
																		key={
																			field.key
																		}
																	>
																		<div
																			className={cx(
																				"item"
																			)}
																		>
																			<Form.Item
																				hidden
																				name={[
																					field.name,
																					"id",
																				]}
																			>
																				<Input />
																			</Form.Item>
																			{questionType ===
																				QUESTION_TYPE_ENUM.SINGLE_CHOICE && (
																				<Form.Item
																					initialValue={
																						false
																					}
																					valuePropName="checked"
																					name={[
																						field.name,
																						"isCorrect",
																					]}
																				>
																					<input
																						type="radio"
																						style={{
																							width: 20,
																							height: 20,
																						}}
																					/>
																				</Form.Item>
																			)}
																			{questionType ===
																				QUESTION_TYPE_ENUM.MULTI_CHOICE && (
																				<Form.Item
																					initialValue={
																						false
																					}
																					valuePropName="checked"
																					name={[
																						field.name,
																						"isCorrect",
																					]}
																				>
																					<Checkbox />
																				</Form.Item>
																			)}
																			<Form.Item
																				rules={[
																					{
																						required:
																							true,
																					},
																				]}
																				className={cx(
																					"input"
																				)}
																				style={{
																					margin: 0,
																				}}
																				name={[
																					field.name,
																					"content",
																				]}
																			>
																				<Input />
																			</Form.Item>
																			<Form.Item
																				hidden
																				initialValue={
																					index
																				}
																				className={cx(
																					"input"
																				)}
																				style={{
																					margin: 0,
																				}}
																				name={[
																					field.name,
																					"order",
																				]}
																			>
																				<Input />
																			</Form.Item>
																			<Button
																				danger
																				icon={
																					<Trash
																						size={
																							14
																						}
																					/>
																				}
																				className={cx(
																					"btn-remove"
																				)}
																				onClick={() => {
																					remove(
																						index
																					);
																				}}
																			/>
																		</div>
																	</Col>
																)
															)}
														</Row>
														<Button
															icon={
																<Plus
																	size={14}
																/>
															}
															className={cx(
																"btn-add"
															)}
															onClick={() => {
																add();
															}}
														>
															Add answer
														</Button>
													</div>
												);
											}}
										</Form.List>
									</div>

									<Form.Item
										name={[name, "answerExplanation"]}
										label="Explain the answer"
									>
										{/* <SimpleEditor
											onValueChange={(value) => {
												form.setFieldValue(
													[name, "answerExplanation"],
													value
												);
											}}
											placeholder="Explain the answer"
										/> */}
										<TextArea />
									</Form.Item>
								</div>
							))}
							<Form.Item>
								<Button
									className={cx("btn-action")}
									onClick={() => add()}
									icon={<Plus />}
								>
									Add question
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Button
					className={cx("btn-submit")}
					htmlType="submit"
					type="primary"
				>
					Submit
				</Button>
			</Form>
		</div>
	);
}
