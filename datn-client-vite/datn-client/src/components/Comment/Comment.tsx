/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from "classnames/bind";

import ConversationInfo from "@/components/ConversationInfo";
import { AVATAR_2 } from "@/shared/constants";
import { CommentSchema } from "@/shared/schema/comment.schema";
import { Avatar } from "antd";
import styles from "./Comment.module.scss";
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
