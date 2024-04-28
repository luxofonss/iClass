/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { COURSE_VIEW_MODE } from "@/shared/constants";
import { CourseViewSchema } from "@/shared/schema/course.schema";
import { Button, Divider, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./ClassBlock.module.scss";
const cx = classNames.bind(styles);

interface IClassBlockProps {
	readonly data: CourseViewSchema;
	readonly mode: string;
}

export default function ClassBlock(props: IClassBlockProps) {
	const { data, mode } = props;

	console.log(props.data);
	return (
		<div className={cx("class-block")}>
			<div className={cx("thumbnail")}>
				<img
					src={
						data?.thumbnail ??
						"https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg"
					}
					alt="thumbnail"
				/>
			</div>
			<Divider />
			<div className={cx("info")}>
				<div className={cx("tags")}>
					<Tag color="lime">{data?.subject?.name}</Tag>
					<Tag color="cyan">{data?.level}</Tag>
					<Tag color="geekblue">
						{data?.teacher?.lastName +
							" " +
							data?.teacher?.firstName}
					</Tag>
				</div>
				<Link
					to={
						mode.toUpperCase() === COURSE_VIEW_MODE.TEACHER
							? `/teacher/courses/${data?.id}/home`
							: mode.toUpperCase() === COURSE_VIEW_MODE.ENROLLED
							? `/courses/${data?.id}/home`
							: `/courses/${data?.id}`
					}
				>
					<Typography.Title level={5} className={cx("name")}>
						{data?.name}
					</Typography.Title>
				</Link>
				<div className={cx("info")}></div>
			</div>
			<div className={cx("footer")}>
				<Link
					to={
						mode.toUpperCase() === COURSE_VIEW_MODE.TEACHER
							? `/teacher/courses/${data?.id}/home`
							: mode.toUpperCase() === COURSE_VIEW_MODE.ENROLLED
							? `/courses/${data?.id}/home`
							: `/courses/${data?.id}`
					}
				>
					<Button>View detail</Button>
				</Link>
				{mode.toUpperCase() === COURSE_VIEW_MODE.NOT_ENROLLED && (
					<Button type="primary">Enroll</Button>
				)}
			</div>
		</div>
	);
}
