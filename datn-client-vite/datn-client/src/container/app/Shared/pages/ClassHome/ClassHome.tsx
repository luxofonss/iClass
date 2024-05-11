/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

// import greeting from '@/assets/images/greeting.png'
import Conversation from "@/components/Conversation";
import styles from "./ClassHome.module.scss";
import AddConversation from "../../components/AddConversation";
import { courseApi } from "@/app-data/service/course.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseViewSchema } from "@/shared/schema/course.schema";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

export default function ClassHome() {
	const [displayData, setDisplayData] = useState<CourseViewSchema[]>([]);
	const { courseId } = useParams<any>();
	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	async function handleGetCourse() {
		try {
			const response = await getCourse({
				id: courseId as string,
			}).unwrap();
			setDisplayData(
				response.data?.conversations?.toSorted((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				})
			);
		} catch (error: any) {
			toast.error(error?.data?.message || "Get course fail");
		}
	}

	useEffect(() => {
		setDisplayData(
			course?.data?.conversations?.toSorted((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			})
		);
	}, [course]);

	useEffect(() => {
		if (courseId) {
			handleGetCourse();
		}
	}, [courseId]);

	console.log(course);
	return (
		<div className={cx("class-home")}>
			<AddConversation />
			<div className={cx("conversations")}>
				{displayData?.map((conversation) => {
					return <Conversation data={conversation} />;
				})}
			</div>
		</div>
	);
}
