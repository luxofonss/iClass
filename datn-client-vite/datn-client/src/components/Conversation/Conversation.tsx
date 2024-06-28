/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button } from "antd";

import Comment from "@/components/Comment";
import CommentReply from "@/components/CommentReply";
import ConversationInfo from "@/components/ConversationInfo";
import { AVATAR } from "@/shared/constants";
import { ConversationSchema } from "@/shared/schema/conversation.schema";
import classNames from "classnames/bind";
import { MessageCircleIcon, ThumbsUp } from "lucide-react";
import styles from "./Conversation.module.scss";

const cx = classNames.bind(styles);

interface IConversationProps {
	data: ConversationSchema;
}

export default function Conversation(props: IConversationProps) {
	const { data } = props;
	console.log("data:: ", data);
	return (
		<div className={cx("conversation")}>
			<div>
				<Avatar
					className={cx("avatar")}
					size={48}
					src={data?.user?.avatar ?? AVATAR}
					alt="avatar"
				/>
			</div>
			<div className={cx("content-wrapper")}>
				<div className={cx("header")}>
					<ConversationInfo data={data} />
					{/* <Tag color="orange">{data?.type}</Tag> */}
				</div>
				<div className={cx("content")}>
					<div
						className={cx("text")}
						style={{ color: "black" }}
						dangerouslySetInnerHTML={{ __html: data?.content }}
					/>

					<div className={cx("reaction")}>
						<Button
							icon={<ThumbsUp color="green" size={18} />}
							type="text"
						>
							Thích
						</Button>
						<Button
							icon={<MessageCircleIcon color="blue" size={18} />}
							type="text"
						>
							Bình luận
						</Button>
					</div>
				</div>
				{data?.comments?.length > 0 && (
					<div className={cx("comments")}>
						{data?.comments?.map((comment) => (
							<Comment data={comment} />
						))}
					</div>
				)}
				<CommentReply conversationId={data?.id} />
			</div>
		</div>
	);
}
