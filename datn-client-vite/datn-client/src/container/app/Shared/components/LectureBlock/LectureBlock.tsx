/* eslint-disable @typescript-eslint/no-explicit-any */
import { LectureSchema } from "@/shared/schema/course.schema";
import { Typography } from "antd";
import classNames from "classnames/bind";
import { BookText, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import styles from "./LectureBlock.module.scss";
const cx = classNames.bind(styles);

interface ILectureBlock {
	readonly data: LectureSchema;
}

export default function LectureBlock(props: ILectureBlock) {
	const { data } = props;

	const { id: courseId } = useParams();

	return (
		<div className={cx("lecture-block")}>
			<div className={cx("heading")}>
				<Link to={`/teacher/courses/${courseId}/lectures/${data.id}`}>
					<Typography.Title
						level={5}
						ellipsis={{ rows: 2 }}
						className={cx("title")}
					>
						{data?.name}
					</Typography.Title>
				</Link>
				<Typography.Text className={cx("description")}>
					{data?.description}
				</Typography.Text>
			</div>
			<div className={cx("info")}>
				{data?.type === "VIDEO" ? (
					<div className={cx("item")}>
						<Video color={"#8C72FA"} size={14} />
					</div>
				) : (
					<div className={cx("item")}>
						<BookText color="#9BDAF5" size={14} />
					</div>
				)}
			</div>
		</div>
	);
}
