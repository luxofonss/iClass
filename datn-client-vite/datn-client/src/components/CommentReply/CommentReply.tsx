/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import { AVATAR_2 } from "@/shared/constants";
import { Avatar, Button, Form } from "antd";
import { Send } from "lucide-react";
import styles from "./CommentReply.module.scss";
import { conversationApi } from "@/app-data/service/conversation.service";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { courseApi } from "@/app-data/service/course.service";
const cx = classNames.bind(styles);

export default function CommentReply({
	conversationId,
}: {
	conversationId: string;
}) {
	const { courseId } = useParams<any>();

	const [createComment] =
		conversationApi.endpoints.createComment.useMutation();
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();

	const [form] = Form.useForm();

	async function onSubmit(values: any) {
		try {
			const data = {
				content: values.content,
				conversationId: conversationId,
			};

			await createComment(data).unwrap();
			getCourse({ id: courseId as string });
			form.resetFields();
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	return (
		<div className={cx("comment-reply")}>
			<Avatar src={AVATAR_2} alt="avatar" />
			<Form className={cx("form")} form={form} onFinish={onSubmit}>
				<Form.Item className={cx("input")} name={"content"}>
					<TextArea rows={2} autoSize placeholder="Viết bình luận" />
				</Form.Item>
				<Button
					className={cx("button")}
					type="default"
					htmlType="submit"
				>
					<Send
						className={cx("send-btn")}
						size={24}
						color="#787ef5"
					/>
				</Button>
			</Form>
		</div>
	);
}
