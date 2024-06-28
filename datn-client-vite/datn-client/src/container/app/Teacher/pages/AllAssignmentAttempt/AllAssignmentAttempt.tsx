/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import { AssignmentAttemptSchema } from "@/shared/schema/assignmentAttempt.schema";
import formatTimeString from "@/shared/utils/formatTimeString";
import { Button, Table, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import classNames from "classnames/bind";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import styles from "./AllAssignmentAttempt.module.scss";

const cx = classNames.bind(styles);

interface DataType {
	id: string;
	deleted_at: string | null;
	createdAt: string;
	updated_at: string;
	user_id: string;
	assignment_id: string;
	assignment_time_millis: number;
	point: number;
	teacher_comment: string;
	finishedAt: string;
	assignment: null;
	question_answer: null;
	user: {
		id: string;
		deleted_at: string | null;
		createdAt: string;
		updated_at: string;
		last_name: string;
		first_name: string;
		dob: string;
		gender: string;
	};
}

const onChange: TableProps<DataType>["onChange"] = (
	pagination,
	filters,
	sorter,
	extra
) => {
	console.log("params", pagination, filters, sorter, extra);
};

export default function AllAssignmentAttempt() {
	const { assignmentId, courseId } = useParams();

	const [getAlAssignmentAttemptResults, { data: allAttempts }] =
		assignmentApi.endpoints.getAlAssignmentAttemptResults.useLazyQuery();
	const [getAssignmentById, { data: assignmentData }] =
		assignmentApi.endpoints.getOneById.useLazyQuery();

	useEffect(() => {
		if (assignmentId) {
			handleGetAssignment();
		}
	}, [assignmentId]);

	useEffect(() => {
		if (assignmentId) {
			getAlAssignmentAttemptResults({ assignment_id: assignmentId });
		}
	}, [assignmentId]);

	async function handleGetAssignment() {
		try {
			await getAssignmentById(assignmentId).unwrap();
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	const columns: ColumnsType<AssignmentAttemptSchema> = [
		{
			title: "Họ và tên",
			key: "user",
			render: (_, { student }) => {
				return `${student?.lastName} ${student?.firstName}`;
			},
		},
		{
			title: "Bắt đầu",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (_, { createdAt }) => formatTimeString(createdAt),
		},
		{
			title: "Thời gian làm bài",
			key: "finishedAt",
			render: (_, attempt) => {
				const startTime = new Date(attempt.startTime);
				const endTime = attempt?.submittedAt
					? new Date(attempt.submittedAt)
					: new Date(attempt.endTime);

				// Calculate the difference in milliseconds
				const diffInMilliseconds =
					endTime.getTime() - startTime.getTime();

				// Convert milliseconds to minutes
				const diffInMinutes = Math.floor(
					diffInMilliseconds / 1000 / 60
				);

				return diffInMinutes;
			},
		},
		{
			title: "Tổng điểm",
			dataIndex: "totalMark",
			key: "totalMark",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => {
				return (
					<Link
						to={`/teacher/courses/${courseId}/assignments/${assignmentId}/attempts/${record?.id}`}
					>
						<Button type="primary">Chấm lại</Button>
					</Link>
				);
			},
		},
	];
	return (
		<div className={cx("wrapper")}>
			<Typography.Title level={4}>
				Bài tập: {assignmentData?.data?.title}
			</Typography.Title>
			<div>Thời gian: {assignmentData?.data?.duration} phút</div>
			<div>
				Số lần làm bài tối đa: {assignmentData?.data?.maxAttemptTimes}
			</div>
			{assignmentData?.data && (
				<Table
					pagination={false}
					columns={columns}
					dataSource={assignmentData?.data?.attempts}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
