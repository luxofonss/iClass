/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

// import greeting from '@/assets/images/greeting.png'
import { conversationApi } from "@/app-data/service/conversation.service";
import Conversation from "@/components/Conversation";
import { CourseViewSchema } from "@/shared/schema/course.schema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import AddConversation from "../../components/AddConversation";
import styles from "./ClassHome.module.scss";

const cx = classNames.bind(styles);

export default function ClassHome() {
	const [displayData, setDisplayData] = useState<CourseViewSchema[]>([]);
	const { courseId } = useParams<any>();
	const [getConversationByParentId, { data: conversationData }] =
		conversationApi.endpoints.getConversationByParentId.useLazyQuery();

	async function handleGetConversations() {
		try {
			const response = await getConversationByParentId({
				parentId: courseId as string,
			}).unwrap();
			setDisplayData(
				response.data?.toSorted((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				})
			);
		} catch (error: any) {
			toast.error(error?.data?.message || "Get course fail");
		}
	}

	useEffect(() => {
		setDisplayData(
			conversationData?.data?.toSorted((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			})
		);
	}, [conversationData]);

	useEffect(() => {
		if (courseId) {
			handleGetConversations();
		}
	}, [courseId]);

	console.log(conversationData);
	return (
		<div className={cx("class-home")}>
			<AddConversation courseId={courseId as string} />
			<div className={cx("conversations")}>
				{displayData?.map((conversation) => {
					return <Conversation data={conversation} />;
				})}
			</div>
		</div>
	);
}
