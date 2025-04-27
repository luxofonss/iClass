/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { assignmentApi } from "@/app-data/service/assignment.service";
import { EditorWithCommentSystem } from "@/components/Tiptap/EditorWithCommentSystem";
import {
	Button,
	Checkbox,
	Form,
	Image,
	Input,
	Radio,
	Tag,
	Typography,
} from "antd";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import styles from "./QuestionAssignment.module.scss";
const cx = classNames.bind(styles);

interface IQuestionAssignmentProps {
	data: any;
	order: number;
	mode?: string;
}

export default function QuestionAssignment({
	data,
	order,
	mode,
}: IQuestionAssignmentProps) {
	const [submittedAnswer, setSubmittedAnswer] = useState(
		data?.answer ? true : false
	);
	const [submitAnswer, { isLoading: isSubmitting }] =
		assignmentApi.endpoints.submitAnswer.useMutation();
	const [scoreLongAnswer, { isLoading: isScoring }] =
		assignmentApi.endpoints.scoreLongAnswer.useMutation();
	const [getAssignmentAttempt] =
		assignmentApi.endpoints.getAssignmentAttempt.useLazyQuery();

	const [form] = Form.useForm();
	const { attemptId } = useParams();

	async function handleSubmitAnswer(values: any) {
		try {
			await submitAnswer({
				attemptId: attemptId as string,
				questionId: data.id,
				answer: {
					selectedOptionIds:
						data?.type === "MULTIPLE_CHOICES"
							? values.answer
							: data?.type === "SINGLE_CHOICE"
							? [values.answer]
							: null,
					textAnswer:
						data?.type === "SHORT_ANSWER" ||
						data?.type === "LONG_ANSWER"
							? values.answer.textAnswer
							: "",
				},
			}).unwrap();

			setSubmittedAnswer(true);
			toast.success("Cập nhật câu trả lời thành công");
			// TODO: use state
			getAssignmentAttempt(attemptId as string);
		} catch (error: any) {
			console.log("error:: ", error);
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	function checkAnswer() {
		if (
			data?.type === "MULTIPLE_CHOICES" ||
			(data?.type === "SINGLE_CHOICE" && data?.answer)
		) {
			console.log("data?.choices:: ", data?.choices);
			console.log(
				"data?.answer?.selectedOptions:: ",
				data?.answer?.selectedOptions
			);
			const totalCorrectAnswer = data?.choices?.filter(
				(choice) => choice?.isCorrect
			)?.length;
			const totalCorrectSelectedAnswer =
				data?.answer?.selectedOptions?.filter(
					(option) => option?.isCorrect
				)?.length;

			const isRight = totalCorrectAnswer === totalCorrectSelectedAnswer;

			if (isRight) {
				return data?.mark;
			} else {
				return 0;
			}
		}

		if (data?.type === "SHORT_ANSWER" && data?.answer) {
			// return data?.answer[0]?.textAnswer === form.getFieldValue('answer')
			const isRight = data?.choices?.find(
				(choice: any) => choice?.content === data?.answer?.textAnswer
			);
			if (isRight) {
				return data?.mark;
			} else {
				return 0;
			}
		}

		if (data?.type === "LONG_ANSWER" && data?.answer) {
			return data?.answer?.score || 0;
		}

		return 0;
	}

	async function handleScoreLongAnswer() {
		if (data?.answer)
			try {
				await scoreLongAnswer({
					attemptId: attemptId as string,
					questionId: data?.id,
					score: form.getFieldValue("score"),
				}).unwrap();

				toast.success("Scored successfully!");
			} catch (error: any) {
				toast.error(error?.data?.message || "Something went wrong!");
			}
		else {
			toast.error("This question does not have answer!");
		}
	}

	console.log(
		"data?.answer?.selectedOptions:: ",
		data?.answer?.selectedOptions
	);

	return (
		<div className={cx("wrapper")}>
			<Form form={form} onFinish={handleSubmitAnswer}>
				<Typography.Text className={cx("heading")}>
					<strong>Câu {order + 1}:</strong>{" "}
					{(mode === "RESULT" || mode === "TEACHER") && (
						<Tag color={checkAnswer() === 0 ? "red" : "green"}>
							{checkAnswer()}/{data?.mark}
						</Tag>
					)}
					<div dangerouslySetInnerHTML={{ __html: data?.title }} />
				</Typography.Text>
				{data?.image && (
					<div className={cx("center")}>
						<Image
							style={{ maxHeight: 400, alignContent: "center" }}
							src={data?.image}
							alt="question"
						/>
					</div>
				)}
				{data?.audio && (
					<div className={cx("center")}>
						<audio src={data?.audio} controls>
							<track kind="captions" />
						</audio>
					</div>
				)}
				{data?.type === "MULTIPLE_CHOICES" && (
					<Form.Item
						rules={[{ required: true }]}
						f
						name="answer"
						style={{ marginTop: "4px" }}
						valuePropName="value"
						initialValue={data?.answer?.selectedOptions?.map(
							(o) => o?.id
						)}
					>
						<Checkbox.Group className={cx("choices")}>
							{data?.choices?.map(
								(choice: any, index: number) => (
									<Checkbox
										className={cx("choice-item")}
										value={choice?.id}
										key={index}
										style={
											choice?.isCorrect &&
											(mode === "TEACHER" ||
												mode === "RESULT")
												? { backgroundColor: "#e4ffdf" }
												: {}
										}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: choice?.content,
											}}
										/>
									</Checkbox>
								)
							)}
						</Checkbox.Group>
					</Form.Item>
				)}
				{data?.type === "SINGLE_CHOICE" && (
					<Form.Item
						rules={[{ required: true }]}
						name="answer"
						valuePropName="value"
						style={{ marginTop: "4px" }}
						initialValue={
							data?.answer?.selectedOptions?.length > 0
								? data?.answer?.selectedOptions[0].id
								: null
						}
					>
						<Radio.Group className={cx("choices")}>
							{data?.choices?.map(
								(choice: any, index: number) => (
									<Radio
										style={
											choice?.isCorrect &&
											(mode === "TEACHER" ||
												mode === "RESULT")
												? { backgroundColor: "#e4ffdf" }
												: {}
										}
										className={cx("choice-item")}
										key={index}
										value={choice?.id}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: choice?.content,
											}}
										/>
									</Radio>
								)
							)}
						</Radio.Group>
					</Form.Item>
				)}
				{data?.type === "SHORT_ANSWER" && (
					<Form.Item
						rules={[{ required: true }]}
						name={["answer", "textAnswer"]}
						style={{ marginTop: "4px" }}
						initialValue={
							data?.answer?.length > 0
								? data?.answer[0].textAnswer
								: data?.answer?.textAnswer
						}
					>
						{data?.answer?.textAnswer && (
							<div>
								<div>
									Your answer:{" "}
									<strong>{data?.answer?.textAnswer}</strong>
								</div>
								{/* <div>
									Correct answers:{" "}
									<ul>
										{data?.choices?.map((item: any) => (
											<li key={item.content}>
												<strong>{item.content}</strong>
											</li>
										))}
									</ul>
								</div> */}
							</div>
						)}
						{mode === "ATTEMPT" && <Input />}
					</Form.Item>
				)}
				{data?.type === "LONG_ANSWER" && (
					<Fragment>
						{mode === "TEACHER" && (
							<div>
								<Form.Item
									style={{ marginTop: "4px" }}
									name="score"
									initialValue={data?.answer?.score}
									normalize={(v) => parseInt(v)}
								>
									<Input type="number" />
								</Form.Item>
								<Button
									loading={isScoring}
									type="primary"
									onClick={() => {
										handleScoreLongAnswer();
									}}
								>
									Send
								</Button>
							</div>
						)}
						<Form.Item
							style={{ marginTop: "4px" }}
							rules={[{ required: true }]}
							name={["answer", "textAnswer"]}
							initialValue={
								data?.answer?.teacherFixedTextAnswer
									? data?.answer?.teacherFixedTextAnswer
									: data?.answer?.textAnswer
							}
						>
							<EditorWithCommentSystem
								onValueChange={(v) => {
									form.setFieldValue("answer", v);
								}}
								value={
									data?.answer?.teacherFixedTextAnswer
										? data?.answer?.teacherFixedTextAnswer
										: data?.answer?.textAnswer
								}
								comment={mode === "ATTEMPT" ? false : true}
								answerId={data?.answer?.id}
								assignmentAttemptId={attemptId}
								feedbacks={data?.answer?.feedbacks}
								questionId={data?.id}
								canComment={mode === "TEACHER" ? true : false}
							/>
						</Form.Item>
					</Fragment>
				)}
				{mode === "ATTEMPT" && (
					<Button
						style={{
							backgroundColor: submittedAnswer
								? "#A3F5C1"
								: "#FFF4CC",
						}}
						htmlType="submit"
						loading={isSubmitting}
						// type='primary'
					>
						Submit
					</Button>
				)}
			</Form>
		</div>
	);
}
