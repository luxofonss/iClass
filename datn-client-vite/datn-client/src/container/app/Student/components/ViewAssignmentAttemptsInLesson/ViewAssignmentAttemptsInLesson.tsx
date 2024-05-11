/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { assignmentApi } from "@/app-data/service/assignment.service";
import { AssignmentViewSchema } from "@/shared/schema/assignment.schema";
import { AssignmentAttemptSchema } from "@/shared/schema/assignmentAttempt.schema";
import {
	Button,
	Collapse,
	Divider,
	Space,
	Table,
	TableColumnsType,
} from "antd";
import { BookIcon, ChevronRight, EyeIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./ViewAssignmentAttemptsInLesson.module.scss";
const cx = classNames.bind(styles);

interface IViewAssignmentAttemptsInLessonProps {
	assignment: AssignmentViewSchema;
}

export default function ViewAssignmentAttemptsInLesson(
	props: IViewAssignmentAttemptsInLessonProps
) {
	const { assignment } = props;
	const navigate = useNavigate();

	const [attemptAssignment] =
		assignmentApi.endpoints.attemptAssignment.useMutation();

	const columns: TableColumnsType<AssignmentAttemptSchema> = [
		{
			title: "Stt",
			key: "index",
			render: (_text, _record, index) => index + 1,
		},
		{
			title: "Nộp vào",
			key: "submitedAt",
			render: (_, assignment) => {
				if (assignment.submittedAt === null) {
					return `${assignment.endTime} (auto)`;
				} else {
					return assignment.submittedAt;
				}
			},
		},
		{
			title: "Thời gian làm bài (min)",
			dataIndex: "duration",
			render: (_, attempt) => {
				if (checkIfAttemptEnd(attempt.endTime)) {
					if (attempt.submittedAt === null) {
						return assignment?.duration / 1000;
					} else {
						return (
							new Date(attempt.submittedAt).getMinutes() -
							new Date(attempt.createdAt).getMinutes()
						);
					}
				} else {
					return "Đang trong thời gian làm bài";
				}
			},
		},
		{
			title: "Điểm",
			dataIndex: "totalMark",
			key: "totalMark",
		},
		{
			title: "Lời phê",
			dataIndex: "teacherComment",
			key: "teacherComment",
		},
		{
			title: "Hành động",
			key: "action",
			render: (_, attempt) => {
				if (checkIfAttemptEnd(attempt.endTime)) {
					return (
						<Space>
							Review <EyeIcon size={18} />
						</Space>
					);
				} else return "Làm tiếp";
			},
		},
	];

	async function handleAttemptAssignment(id: string) {
		try {
			const response = await attemptAssignment(id).unwrap();
			console.log("response:: ", response);
			navigate(`/courses/assignments/${id}/${response?.data?.id}`);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	function checkIfAttemptEnd(endTime: string): boolean {
		if (
			new Date().getMilliseconds() - new Date(endTime).getMilliseconds() >
			0
		) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className={cx("wrapper")}>
			<div className={cx("heading")}>
				<div className={cx("left")}>
					<div className={cx("icon")}>
						<BookIcon color="#fff" />
					</div>
					<div className={cx("title")}>{assignment?.title}</div>
				</div>
				<div className={cx("right")}>
					<Button
						onClick={() => {
							console.log("assignment:: ", assignment);
							handleAttemptAssignment(assignment?.id);
						}}
						type="primary"
						icon={<ChevronRight />}
					>
						Làm bài
					</Button>
				</div>
			</div>
			<div className={cx("attempt-info")}>
				<div className={cx("attempt-info__item")}>
					<div className={cx("title")}> Số lần thực hiện </div>
					<div className={cx("value")}>
						{" "}
						{assignment?.attempts?.length}
					</div>
				</div>
				<Divider type="vertical" style={{ height: "48px", width: 2 }} />
				<div className={cx("attempt-info__item")}>
					<div className={cx("title")}>Điểm cao nhất</div>
					<div className={cx("value")}>80/100</div>
				</div>
			</div>
			<Collapse>
				<Collapse.Panel key={1} header="Lịch sử làm bài">
					<Table
						columns={columns}
						dataSource={assignment?.attempts}
						size="small"
					/>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
}
