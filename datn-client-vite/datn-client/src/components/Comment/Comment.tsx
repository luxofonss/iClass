/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import classNames from "classnames/bind";

import CommentReply from "@/components/CommentReply";
import ConversationInfo from "@/components/ConversationInfo";
import EmojiPicker from "@/components/EmojiPicker";
import { AVATAR_2 } from "@/shared/constants";
import { Avatar, Popover, Typography } from "antd";
import { SmilePlus } from "lucide-react";
import styles from "./Comment.module.scss";
import { CommentSchema } from "@/shared/schema/comment.schema";
const cx = classNames.bind(styles);

interface ICommentProps {
	data: CommentSchema;
}

export default function Comment(props: ICommentProps) {
	const { data } = props;

	// const [isComment, setIsComment] = useState(false);

	// function openCommentBox() {
	// 	setIsComment(true);
	// }
	return (
		<div className={cx("comment")}>
			<div className={cx("avatar")}>
				<Avatar src={AVATAR_2} alt="avatar" />
			</div>
			<div className={cx("content-wrapper")}>
				<ConversationInfo data={data} />
				<div className={cx("content")}>
					<div
						className={cx("text")}
						dangerouslySetInnerHTML={{ __html: data?.content }}
					/>
					<div className={cx("reaction")}></div>
				</div>
				<div className={cx("footer")}>
					{/* <div className={cx("reaction")}>
						<Popover content={<EmojiPicker />}>
							<SmilePlus size={16} />
						</Popover>
					</div> */}
					{/* <button
						onClick={openCommentBox}
						className={cx("reply-btn")}
					>
						Reply
					</button> */}
				</div>
				{/* {isComment && <CommentReply conversationId="" />} */}
			</div>
		</div>
	);
}
