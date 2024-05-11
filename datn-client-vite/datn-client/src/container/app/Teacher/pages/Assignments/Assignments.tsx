/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from "@/app-data/service/course.service";
import LineChart from "@/components/Charts/LineChart";
import { LectureSchema, SectionSchema } from "@/shared/schema/course.schema";
import { Button, Space, Table, TableColumnsType, Typography } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Assignments.module.scss";

const cx = classNames.bind(styles);

interface IAssignmentsProps {
	readonly mode: string;
}

export default function Assignments({ mode }: IAssignmentsProps) {
	const [lessonData, setLessonData] = useState<LectureSchema[]>([]);
	const [dataset, setDataset] = useState<any>({
		labels: [],
		datasets: [
			{
				label: "Số học sinh làm bài",
				data: [],
				backgroundColor: "#ffc107",
			},
			{
				label: "Số bài nộp",
				data: [],
				backgroundColor: "#ffc107",
			},
		],
	});
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();

	const { courseId } = useParams();

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

			console.log(data);

			setLessonData(data);
		}
	}

	function handleSetDataSource() {
		const labels: any[] = [];
		const attemptTotal = {
			label: "Số bài nộp",
			data: [],
			backgroundColor: "#ffc107",
		};

		const studentTotal = {
			label: "Số học sinh làm bài",
			data: [],
			backgroundColor: "#ffc107",
		};

		lessonData.forEach((lesson) => {
			if (lesson?.type === "ASSIGNMENT") {
				const students: string[] = [];
				const attempts: number =
					lesson?.assignment?.attempts?.length || 0;
				labels.push(lesson?.name);

				lesson?.assignment?.attempts?.forEach((attempt) => {
					if (
						students?.includes(attempt?.student?.id) !== null &&
						!students?.includes(attempt?.student?.id)
					) {
						students.push(attempt.student.id);
					}
				});

				attemptTotal.data.push(attempts);
				studentTotal.data.push(students?.length);
			}
		});

		console.log(attemptTotal, studentTotal);
		const data = {
			labels: labels,
			datasets: [attemptTotal, studentTotal],
		};

		setDataset(data);
	}

	useEffect(() => {
		handleGetCourse();
	}, [courseId]);

	useEffect(() => {
		console.log(lessonData);
		handleSetDataSource();
	}, [lessonData]);

	const columns: TableColumnsType<LectureSchema> = [
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
				assignment?.duration ? assignment?.duration + "m" : "NaN",
		},
		{
			title: "Số lần làm bài",
			dataIndex: "assignment",
			key: "maxAttemptTimes",
			render: (_, lesson) => {
				console.log(lesson);
				return lesson?.assignment?.maxAttemptTimes;
			},
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
			align: "center",
			render: (assignment) => (
				<Space>
					<Button
						onClick={() => {
							console.log(assignment?.id);
						}}
						type="primary"
					>
						Xem đề
					</Button>
					<Button>Xem bài làm</Button>
				</Space>
			),
		},
	];

	return (
		<div className={cx("assignments")}>
			<Typography.Title level={4}>
				Bài tập trong khóa học
			</Typography.Title>
			<Table
				columns={columns}
				dataSource={lessonData}
				size="small"
				rowKey={(row) => row?.id}
			/>

			<LineChart title={"title"} data={dataset} />
		</div>
	);
}
