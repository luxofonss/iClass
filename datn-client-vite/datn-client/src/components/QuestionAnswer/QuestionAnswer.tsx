/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeQuestion } from "@/components/QuestionTypeIcon/QuestionTypeIcon";
import { QUESTION_TYPE_ENUM } from "@/shared/constants";
import type { FormListFieldData } from "antd";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { QuestionField } from "../../types/question";
import styles from "./QuestionAnswer.module.scss";

const cx = classNames.bind(styles);

const answerType = {
	single_choice: "choices",
	multi_choice: "choices",
	short_answer: "answers",
	long_answer: "answers",
};

export default function QuestionAnswer({
	type,
	field,
	questionKey,
}: {
	type: TypeQuestion;
	field: QuestionField | FormListFieldData;
	questionKey?: number;
}) {
	const name =
		questionKey !== undefined
			? [field.name, answerType[type]]
			: [field.name, field.key, answerType[type]];
	const questionField = field;
	const [choiceList, setChoiceList] = useState<string[]>([]);
	const [answerName, setAnswerName] = useState<any>(name);

	useEffect(() => {
		if (questionKey !== undefined) {
			setAnswerName([field.name, answerType[type]]);
		} else {
			setAnswerName([field.name, field.key, answerType[type]]);
		}
	}, [questionKey]);

	return (
		<div>
			<Form.List name={answerName}>
				{(fields, { add, remove }) => {
					return (
						<div className={cx("wrapper")}>
							<Row gutter={24}>
								{fields.map((field, index) => (
									<Col span={12} key={field.key}>
										<div className={cx("item")}>
											{type ===
											QUESTION_TYPE_ENUM.SINGLE_CHOICE ? (
												<Form.Item
													valuePropName="checked"
													name={[
														field.name,
														"is_correct",
													]}
												>
													{/* <Radio value={field.name} checked={false} onChange={handleRadioChange} /> */}
													<input
														type="radio"
														style={{
															width: 20,
															height: 20,
														}}
														name={questionField.name.toString()}
													/>
												</Form.Item>
											) : type ===
											  QUESTION_TYPE_ENUM.MULTI_CHOICE ? (
												<Form.Item
													valuePropName="checked"
													name={[
														field.name,
														"is_correct",
													]}
												>
													<Checkbox
														name={questionField.name.toString()}
													/>
												</Form.Item>
											) : null}

											<Form.Item
												className={cx("input")}
												style={{ margin: 0 }}
												name={[field.name, "content"]}
											>
												<TextArea
													rows={1}
													onChange={(
														event: React.ChangeEvent<HTMLTextAreaElement>
													) => {
														const newChoiceList = [
															...choiceList,
														];
														newChoiceList[index] =
															event.target.value;
														setChoiceList(
															newChoiceList
														);
													}}
												/>
											</Form.Item>
											<Form.Item
												hidden
												initialValue={index}
												className={cx("input")}
												style={{ margin: 0 }}
												name={[field.name, "order"]}
											>
												<Input />
											</Form.Item>
											<Form.Item
												hidden
												initialValue={false}
												className={cx("input")}
												style={{ margin: 0 }}
												name={[
													field.name,
													"is_correct",
												]}
											>
												<Input />
											</Form.Item>
											<Button
												danger
												icon={<Trash size={14} />}
												className={cx("btn-remove")}
												onClick={() => {
													remove(index);
												}}
											/>
										</div>
									</Col>
								))}
							</Row>
							<Button
								icon={<Plus size={14} />}
								className={cx("btn-add")}
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
			{(type === QUESTION_TYPE_ENUM.MULTI_CHOICE ||
				type === QUESTION_TYPE_ENUM.SINGLE_CHOICE) && (
				<div hidden className={cx("answer")}>
					<Form.Item
						name={
							questionKey !== undefined
								? [field.name, "answers"]
								: [field.name, field.key, "answers"]
						}
						label="Key"
					>
						<Input />
					</Form.Item>
				</div>
			)}
		</div>
	);
}
