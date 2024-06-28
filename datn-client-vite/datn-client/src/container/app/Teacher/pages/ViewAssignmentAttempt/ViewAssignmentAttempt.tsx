/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import CommentInfo from "@/components/CommentInfo";
import QuestionAssignment from "@/components/QuestionAssignment";
import formatTimeString from "@/shared/utils/formatTimeString";
import { Divider, Statistic, Typography } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewAssignmentAttempt.module.scss";

const cx = classNames.bind(styles);
const { Countdown } = Statistic;

export default function ViewAssignmentAttempt({ mode }: { mode: string }) {
	const [getAssignmentAttempt, { data: assignmentAttempt }] =
		assignmentApi.endpoints.getAssignmentAttempt.useLazyQuery();
	const { attemptId } = useParams();

	useEffect(() => {
		if (attemptId) {
			getAssignmentAttempt(attemptId);
		}
	}, [attemptId]);

	return (
		<div className={cx("attempt-assignment")}>
			<Typography.Title level={3}>
				{assignmentAttempt?.data?.assignment?.title}
			</Typography.Title>
			<Typography.Paragraph>
				{assignmentAttempt?.data?.assignment?.description}
			</Typography.Paragraph>
			{mode === "TEACHER" && (
				<div>
					<CommentInfo
						name={
							assignmentAttempt?.data?.student?.firstName +
							" " +
							assignmentAttempt?.data?.student?.lastName
						}
						time={formatTimeString(
							assignmentAttempt?.data?.startTime
						)}
					/>
				</div>
			)}

			{mode === "TEACHER" || mode === "RESULT" ? null : (
				<Countdown
					value={
						Date.now() +
						(new Date(assignmentAttempt?.data?.endTime).getTime() -
							new Date(
								assignmentAttempt?.data?.startTime
							).getTime() >
						0
							? new Date(
									assignmentAttempt?.data?.endTime
							  ).getTime() -
							  new Date(
									assignmentAttempt?.data?.startTime
							  ).getTime()
							: 0)
					}
				/>
			)}
			<Divider />
			{assignmentAttempt?.data?.assignment?.questions?.map(
				(question: any, index: number) => (
					<QuestionAssignment
						key={index}
						data={question}
						order={index}
						mode={mode}
					/>
				)
			)}
		</div>
	);
}
