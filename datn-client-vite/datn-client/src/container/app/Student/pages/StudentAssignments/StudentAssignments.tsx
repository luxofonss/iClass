/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import { courseApi } from "@/app-data/service/course.service";
import { AssignmentViewSchema } from "@/shared/schema/assignment.schema";
import { LectureSchema, SectionSchema } from "@/shared/schema/course.schema";
import { Button, Space, TableColumnsType } from "antd";
import Table from "antd/es/table";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StudentAssignments.module.scss";

const cx = classNames.bind(styles);

interface IAssignmentsProps {
	readonly mode: string;
}

interface DataType {
	id: string;
	created_at: string;
	deleted_at: string;
	updated_at: string;
	user_id: string;
	assignment_id: string;
	assignment_time_millis: string;
	point: number;
	teacher_comment: string;
	finished_at: string;
	assignment: AssignmentViewSchema;
}

export default function StudentAssignments({ mode }: IAssignmentsProps) {
	const [lessonData, setLessonData] = useState<LectureSchema[]>([]);
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();
	const [attemptAssignment] =
		assignmentApi.endpoints.attemptAssignment.useMutation();

	const { courseId } = useParams();
	const navigate = useNavigate();

	async function handleGetCourse() {
		if (courseId) {
			const response = await getCourse({ id: courseId }).unwrap();

			const data: LectureSchema[] = [];
			response?.data?.sections?.forEach((section: SectionSchema) => {
				section?.lessons?.forEach((lesson: LectureSchema) => {
					if (lesson?.type === "ASSIGNMENT") {
						data.push(lesson);
					}
				});
			});

			setLessonData(data);
		}
	}

	useEffect(() => {
		handleGetCourse();
	}, [courseId]);

	const expandedRowRender = (row) => {
		console.log("row:: ", row);
		const columns: TableColumnsType<DataType> = [
			{
				title: "Stt",
				dataIndex: "stt",
				key: "stt	",
				render: (_, _attempt, index) => index + 1,
			},
			{ title: "Bắt đầu", dataIndex: "startTime", key: "startTime" },
			{
				title: "Tổng điểm",
				key: "totalMark",
				dataIndex: "totalMark",
			},
			{
				title: "Upgrade Status",
				dataIndex: "upgradeNum",
				key: "upgradeNum",
			},
			{
				title: "Action",
				key: "operation",
				render: () => (
					<Space size="middle">
						<a>Pause</a>
						<a>Stop</a>
					</Space>
				),
			},
		];
		return (
			<Table
				columns={columns}
				dataSource={row?.assignment?.attempts}
				pagination={false}
			/>
		);
	};

	async function handleAttemptAssignment(id: string) {
		try {
			const response = await attemptAssignment(id).unwrap();
			console.log("response:: ", response);
			navigate(`/courses/assignments/${id}/${response?.data?.id}`);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	const columns: TableColumnsType<DataType> = [
		{
			title: "STT",
			dataIndex: "index",
			key: "id",
			render: (_, _attempt, index) => index + 1,
		},
		{ title: "Tên bài học", dataIndex: "name", key: "name" },
		{
			title: "Thời gian",
			dataIndex: "assignment",
			key: "duration",
			render: (assignment) =>
				assignment?.duration
					? assignment?.duration / 1000 + "m"
					: "NaN",
		},
		{
			title: "Số lần làm bài",
			dataIndex: "assignment",
			key: "maxAttemptTimes",
			render: (assignment) => assignment?.maxAttemptTimes,
		},
		{
			title: "Điểm tối đa",
			dataIndex: "assignment",
			key: "totalMark",
			render: (assignment) => assignment?.totalMark,
		},
		{
			title: "Dạng bài tập",
			dataIndex: "assignment",
			key: "assignmentType",
			render: (assignment) => assignment?.assignmentType,
		},
		{
			title: "Số bài nộp",
			dataIndex: "assignment",
			key: "createdAt",
			render: (assignment) => assignment?.attempts?.length,
		},
		{
			title: "Action",
			dataIndex: "assignment",
			key: "operation",
			render: (assignment) => (
				<Button
					onClick={() => {
						console.log(assignment?.id);
						handleAttemptAssignment(assignment?.id);
					}}
					type="primary"
				>
					Làm lại
				</Button>
			),
		},
	];

	return (
		<div className={cx("assignments")}>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
					defaultExpandedRowKeys: ["0"],
				}}
				dataSource={lessonData}
				rowKey={(row) => row?.id}
			/>
		</div>
	);
}
