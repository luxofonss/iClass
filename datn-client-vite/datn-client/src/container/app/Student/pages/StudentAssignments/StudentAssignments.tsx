/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignmentApi } from "@/app-data/service/assignment.service";
import { courseApi } from "@/app-data/service/course.service";
import { AssignmentViewSchema } from "@/shared/schema/assignment.schema";
import { LectureSchema, SectionSchema } from "@/shared/schema/course.schema";
import { formatTimestamp } from "@/shared/utils/formatTimeString";
import { Button, TableColumnsType } from "antd";
import Table from "antd/es/table";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
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
	const [getAllByCourseId, { isLoading: isGettingAssignments }] =
		assignmentApi.endpoints.getAllByCourseId.useLazyQuery();

	const { courseId } = useParams();
	const navigate = useNavigate();

	async function handleGetCourse() {
		if (courseId) {
			const response = await getCourse({ id: courseId }).unwrap();
			const assignmentData = await getAllByCourseId({
				courseId: courseId as string,
			}).unwrap();

			const data: LectureSchema[] = [];
			response?.data?.sections?.forEach((section: SectionSchema) => {
				section?.lessons?.forEach((lesson: LectureSchema) => {
					console.log("lessons:: ", lesson);
					if (lesson?.type === "ASSIGNMENT") {
						let lessonAssignment = null;
						assignmentData?.data?.forEach((assignment) => {
							console.log("assignment:: ", assignment);
							if (assignment.lessonId === lesson?.id) {
								lessonAssignment = assignment;
							}
						});

						data.push({ ...lesson, assignment: lessonAssignment });
					}
				});
			});

			setLessonData(data);
		}
	}

	console.log("lesson data:: ", lessonData);

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
			{
				title: "Bắt đầu",
				dataIndex: "startTime",
				key: "startTime",
				render: (_, record) => formatTimestamp(record?.startTime),
			},
			{
				title: "Kết thúc",
				dataIndex: "endTime",
				key: "endTime",
				render: (_, record) => {
					return record?.submittedAt
						? formatTimestamp(record?.submittedAt)
						: formatTimestamp(record?.endTime);
				},
			},
			{
				title: "Tổng điểm",
				key: "totalMark",
				dataIndex: "totalMark",
			},
			{
				title: "Action",
				key: "operation",
				render: (_, attempt) => (
					<Link
						to={`/courses/${courseId}/assignments/attempt-review/${attempt?.id}`}
					>
						<Button>Xem chi tiết</Button>
					</Link>
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
				assignment?.duration ? assignment?.duration + " (phút)" : "NaN",
		},
		{
			title: "Số lần làm bài",
			dataIndex: "assignment",
			key: "maxAttemptTimes",
			render: (assignment) =>
				assignment?.attempts?.length +
				"/" +
				assignment?.maxAttemptTimes,
		},
		{
			title: "Điểm tối đa",
			dataIndex: "assignment",
			key: "totalMark",
			render: (assignment) =>
				Math.max(
					...(assignment?.attempts?.map(
						(attempt) => attempt.totalMark
					) || [0])
				) +
				"/" +
				assignment?.totalMark,
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
				loading={isGettingAssignments}
			/>
		</div>
	);
}
