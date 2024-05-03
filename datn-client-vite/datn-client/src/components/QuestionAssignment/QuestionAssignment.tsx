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

	const [form] = Form.useForm();
	const { attemptId } = useParams();

	async function handleSubmitAnswer(values: any) {
		try {
			await submitAnswer({
				attemptId: attemptId as string,
				questionId: data.id,
				answer: {
					selectedOptionIds:
						data?.type === "MULTIPLE_CHOICES" ? values.answer
							: data?.type === "SINGLE_CHOICE"
								? [values.answer]
								: null,
					textAnswer:
						data?.type === "SHORT_ANSWER" ||
							data?.type === "LONG_ANSWER"
							? values.answer
							: "",
				},
			}).unwrap();

			setSubmittedAnswer(true);
		} catch (error: any) {
			console.log("error:: ", error);
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	function checkAnswer() {
		if (data?.type === "MULTIPLE_CHOICES" || data?.type === "SINGLE_CHOICE") {
			// return data?.answer[0]?.selectedOptions === form.getFieldValue('answer')
			const isRight =
				data?.choices?.find((choice: any) => choice?.is_correct)?.id ===
				data?.answer[0]?.selectedOptions;

			if (isRight) {
				return data?.point;
			} else {
				return 0;
			}
		}

		if (data?.type === "SHORT_ANSWER") {
			// return data?.answer[0]?.text_answer === form.getFieldValue('answer')
			const isRight = data?.choices?.find(
				(choice: any) =>
					choice?.content === data?.answer[0]?.text_answer
			);
			if (isRight) {
				return data?.point;
			} else {
				return 0;
			}
		}

		if (data?.type === "LONG_ANSWER") {
			return data?.answer[0]?.score || 0;
		}

		return 0;
	}

	async function handleScoreLongAnswer() {
		if (data?.answer?.length > 0)
			try {
				await scoreLongAnswer({
					assignment_attempt_id: attemptId as string,
					answer_id: data.answer[0]?.id,
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

	return (
		<div className={cx("wrapper")}>
			<Form form={form} onFinish={handleSubmitAnswer}>
				<Typography.Text className={cx('heading')}>
					<strong>Câu {order + 1}:</strong>{" "}
					{(mode === "RESULT" || mode === "TEACHER") && (
						<Tag color={checkAnswer() === 0 ? "red" : "green"}>
							{checkAnswer()}/{data?.point}
						</Tag>
					)}
					<div dangerouslySetInnerHTML={{ __html: data?.title }} />
				</Typography.Text>
				{data?.image?.url && (
					<Image src={data?.image?.url} alt="question" />
				)}
				{data?.audio_url && (
					<audio src={data?.audio_url} controls>
						<track kind="captions" />
					</audio>
				)}
				{data?.type === "MULTIPLE_CHOICES" && (
					<Form.Item
						rules={[{ required: true }]}
						name="answer"
						valuePropName="value"
						initialValue={
							data?.answer?.selectedOptions?.map(o => o?.id)
						}
					>
						<Checkbox.Group className={cx("choices")}>
							{data?.choices?.map(
								(choice: any, index: number) => (
									<Checkbox
										className={cx("choice-item")}
										value={choice?.id}
										key={index}
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
						initialValue={
							data?.answer?.selectedOptions?.length > 0 ? data?.answer?.selectedOptions[0].id : null
						}
					>
						<Radio.Group className={cx("choices")}>
							{data?.choices?.map(
								(choice: any, index: number) => (
									<Radio
										style={
											choice?.is_correct
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
						name="answer"
						initialValue={
							data?.answer?.length > 0
								? data?.answer[0].text_answer
								: data?.answer?.text_answer
						}
					>
						{data?.answer?.length > 0 ? (
							<div>
								<div>
									Submitted answer:{" "}
									<strong>
										{data?.answer[0].text_answer}
									</strong>
								</div>
								<div>
									Correct answers:{" "}
									<ul>
										{data?.choices?.map((item: any) => (
											<li key={item.content}>
												<strong>{item.content}</strong>
											</li>
										))}
									</ul>
								</div>
							</div>
						) : (
							data?.answer?.text_answer && (
								<div>
									Your answer:{" "}
									<strong>{data?.answer?.text_answer}</strong>
								</div>
							)
						)}
						{mode === "ATTEMPT" && <Input />}
					</Form.Item>
				)}
				{data?.type === "LONG_ANSWER" && (
					<Fragment>
						{mode === "TEACHER" && (
							<div>
								<Form.Item
									name="score"
									initialValue={data?.point}
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
							rules={[{ required: true }]}
							name="answer"
							initialValue={
								data?.answer?.length > 0
									? data?.answer[0].text_answer
									: data?.answer?.text_answer
							}
						>
							<EditorWithCommentSystem
								onValueChange={(v) => {
									console.log("v:: ", v);
									form.setFieldValue("answer", v);
								}}
								value={
									data?.answer?.length > 0
										? data?.answer[0].text_answer
										: data?.answer?.text_answer
								}
								comment={mode === "ATTEMPT" ? false : true}
								answerId={
									data?.answer?.length > 0
										? data?.answer[0].id
										: null
								}
								assignmentAttemptId={attemptId}
								feedbacks={
									data?.answer?.length > 0
										? data?.answer[0].feedback
										: null
								}
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
								? "green"
								: "orange",
						}}
						htmlType="submit"
						loading={isSubmitting}
					// type='primary'
					>
						Submit
					</Button>
				)}
			</Form>
		</div >
	);
}
