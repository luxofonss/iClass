/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { conversationApi } from "@/app-data/service/conversation.service";
import { courseApi } from "@/app-data/service/course.service";
import { SimpleEditor } from "@/components/Tiptap";
import { AVATAR } from "@/shared/constants";
import { Avatar, Button, Form } from "antd";
import { File, Image, Plus, SendIcon, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import styles from "./AddConversation.module.scss";
const cx = classNames.bind(styles);

export default function AddConversation() {
	const [isAdding, setIsAdding] = useState(false);

	const { courseId } = useParams();

	const [form] = Form.useForm();

	const [addConversation, { isLoading: isAddingConversation }] =
		conversationApi.endpoints.createConversation.useMutation();
	const [getCourse] = courseApi.endpoints.getCourseById.useLazyQuery();

	function onValueChange(value: any) {
		form.setFieldValue("content", value);
	}

	async function onSubmit(values: any) {
		try {
			const data = {
				content: values.content,
				type: "ANNOUNCEMENT",
				courseId: courseId as string,
			};

			await addConversation(data).unwrap();
			getCourse({ id: courseId });
			form.resetFields();
			setIsAdding(false);
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong!");
		}
	}

	return (
		<div className={cx("wrapper")}>
			{!isAdding && (
				<Button
					type="primary"
					icon={<Plus size={16} />}
					onClick={() => {
						setIsAdding(true);
					}}
				>
					Tạo bài viết
				</Button>
			)}
			<div
				style={isAdding ? {} : { display: "none" }}
				className={cx("add-conversation")}
			>
				<div>
					<Avatar src={AVATAR} />
				</div>
				<Form form={form} onFinish={onSubmit} className={cx("form")}>
					<Form.Item name="content">
						<SimpleEditor
							placeholder="Tạo thông báo hoặc trao đổi ở đây"
							onValueChange={onValueChange}
						/>
					</Form.Item>
					<div className={cx("footer")}>
						<div className={cx("attachment")}>
							<Button type="text" className={cx("item")}>
								<Image size={18} color="#02B644" />
								Thêm ảnh
							</Button>
							<Button type="text" className={cx("item")}>
								<File size={18} color="#187EDC" />
								Thêm tài liệu
							</Button>
						</div>
						<div className={cx("btns")}>
							<Button
								onClick={() => {
									setIsAdding(false);
								}}
								type="default"
								icon={<X color="#9B16F3" size={18} />}
							>
								Hủy
							</Button>
							<Button
								htmlType="submit"
								type="primary"
								icon={<SendIcon size={18} />}
								loading={isAddingConversation}
							>
								Tạo bài viết
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
