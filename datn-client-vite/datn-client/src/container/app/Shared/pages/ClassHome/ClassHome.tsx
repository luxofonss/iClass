/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

// import greeting from '@/assets/images/greeting.png'
import Conversation from "@/components/Conversation";
import styles from "./ClassHome.module.scss";
import AddConversation from "../../components/AddConversation";
import { courseApi } from "@/app-data/service/course.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

export default function ClassHome() {
	const { courseId } = useParams<any>();
	const [getCourse, { data: course, isLoading: isGettingCourse }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	useEffect(() => {
		if (courseId) {
			getCourse({ id: courseId });
			console.log(courseId);
		}
	}, [courseId]);

	console.log(course);
	return (
		<div className={cx("class-home")}>
			<AddConversation />
			<div className={cx("conversations")}>
				{course?.data?.conversations?.map((conversation) => {
					return <Conversation data={conversation} />;
				})}
			</div>
		</div>
	);
}
