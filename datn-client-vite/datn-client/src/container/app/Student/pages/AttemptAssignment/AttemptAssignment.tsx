/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import ModalConfirm from "@/components/ModalConfirm";
import { Col, Divider, Row, Statistic, Typography } from "antd";
import classNames from "classnames/bind";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
// import Countdown from "react-countdown";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import QuestionAssignment from "../../../../../components/QuestionAssignment";
import styles from "./AttemptAssignment.module.scss";

const cx = classNames.bind(styles);
const { Countdown } = Statistic;

export default function AttemptAssignment() {
	const [getAssignmentAttempt, { data: assignmentAttempt }] =
		assignmentApi.endpoints.getAssignmentAttempt.useLazyQuery();
	const { attemptId } = useParams();
	const [submitAssignment, { isLoading: isSubmitting }] =
		assignmentApi.endpoints.submitAssignment.useMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (attemptId) {
			console.log("attemptId:: ", attemptId);
			getAssignmentAttempt(attemptId);
		}
	}, [attemptId]);

	async function submitAssignmentHandler() {
		try {
			await submitAssignment({
				attemptId: attemptId as string,
			}).unwrap();

			toast.success("Assignment submitted successfully!");
			navigate(-1);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	function getRemainTime() {
		const now = new Date();
		const start = new Date(assignmentAttempt?.data?.startTime);
		const end = new Date(assignmentAttempt?.data?.endTime);

		console.log(start, end, now);
		if (end.getTime() < now.getTime()) return 0;
		else return end.getTime() - now.getTime();
	}

	console.log("getRemainTime()::", getRemainTime());

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
									value={Date.now() + (getRemainTime() ?? 0)}
									format="HH:mm:ss"
								/>
							</div>
							<div className={cx("notes")}>
								{assignmentAttempt?.data?.assignment?.questions?.map(
									(question, index) => (
										<div
											key={question?.id}
											className={cx(
												"item",
												question?.answer ? "active" : ""
											)}
										>
											{index + 1}
										</div>
									)
								)}
							</div>
							<ModalConfirm
								handleConfirm={() => {
									submitAssignmentHandler();
								}}
								buttonStyle={{ width: "100%" }}
								isSubmitting={isSubmitting}
								modalMessage="Bạn có chắc chắn muốn nộp bài?"
								btnText="Nộp bài"
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
