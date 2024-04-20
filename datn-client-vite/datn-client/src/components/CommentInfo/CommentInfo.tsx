/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { AVATAR_2 } from "@/shared/constants";
import { Avatar, Typography } from "antd";
import styles from "./CommentInfo.module.scss";
const cx = classNames.bind(styles);

export default function CommentInfo({
	name,
	time,
	avatar,
}: {
	name?: string;
	time?: string;
	avatar?: string;
}) {
	console.log("avatar:: ", avatar);
	return (
		<div className={cx("conversation-info")}>
			<Avatar src={AVATAR_2} alt="avatar" />
			<div>
				<div className={cx("name")}>{name ? name : "Nguyễn Văn A"}</div>
				<div className={cx("time")}>
					<Typography.Text type="secondary">
						{" "}
						{time ? time : "10/11/2022 6:40 AM"}
					</Typography.Text>
				</div>
			</div>
		</div>
	);
}
