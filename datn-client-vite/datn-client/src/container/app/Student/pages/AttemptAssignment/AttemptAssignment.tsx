/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import ModalConfirm from "@/components/ModalConfirm";
import { Col, Divider, Row, Typography } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import QuestionAssignment from "../../../../../components/QuestionAssignment";
import styles from "./AttemptAssignment.module.scss";
import { ChevronLeft } from "lucide-react";

const cx = classNames.bind(styles);

export default function AttemptAssignment() {
	const [getAssignmentAttempt, { data: assignmentAttempt }] =
		assignmentApi.endpoints.getAssignmentAttempt.useLazyQuery();
	const { attemptId } = useParams();
	const [submitAssignment, { isLoading: isSubmitting }] =
		assignmentApi.endpoints.submitAssignment.useMutation();

	useEffect(() => {
		if (attemptId) {
			console.log("attemptId:: ", attemptId);
			getAssignmentAttempt(attemptId);
		}
	}, [attemptId]);

	async function submitAssignmentHandler() {
		try {
			await submitAssignment({
				assignment_attempt_id: attemptId as string,
			}).unwrap();

			toast.success("Assignment submitted successfully!");
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	return (
		<div className={cx("wrapper")}>
			<div className={cx("heading")}>
				<div className={cx("container")}>
					<div className={cx("title")}>
						<ChevronLeft />
						<Typography.Title level={4}>
							{assignmentAttempt?.data?.assignment?.title}
						</Typography.Title>
					</div>
					<div className={cx("description")}>
						{assignmentAttempt?.data?.assignment?.description}
					</div>
				</div>
			</div>
			<div className={cx("content", "container")}>
				<Row gutter={32}>
					<Col span={6}>
						<div className={cx("question-overview")}>
							<div className={cx("time")}>
								<div>Thời gian làm bài</div>
								<Countdown
									renderer={(props) => (
										<div style={{ fontSize: 24 }}>
											{props.formatted.hours} :{" "}
											{props.formatted.minutes} :{" "}
											{props.formatted.seconds}
										</div>
									)}
									date={Date.now() + 600000}
								/>
							</div>
							<div className={cx("notes")}>
								<div className={cx("item")}>1</div>
								<div className={cx("item")}>2</div>
								<div className={cx("item")}>3</div>
								<div className={cx("item")}>4</div>
								<div className={cx("item")}>5</div>
								<div className={cx("item")}>6</div>
								<div className={cx("item")}>7</div>
							</div>
							<ModalConfirm
								handleConfirm={() => {
									submitAssignmentHandler();
								}}
								buttonStyle={{ width: "100%" }}
								isSubmitting={isSubmitting}
								modalMessage="Do you want to submit this assignment?"
								btnText="Submit assignment"
							/>
						</div>
					</Col>
					<Col span={18} className={cx("questions")}>
						{assignmentAttempt?.data?.assignment?.questions?.map(
							(question: any, index: number) => (
								<QuestionAssignment
									key={index}
									data={question}
									order={index}
									mode="ATTEMPT"
								/>
							)
						)}
					</Col>
				</Row>

				<Divider />
			</div>
		</div>
	);
}
