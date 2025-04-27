/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from "@/app-data/service/course.service";
import ClassBlock from "@/components/ClassBlock";
import { Col, Row } from "antd";
import classNames from "classnames/bind";

import JoinCourseModel from "@/container/app/Shared/components/JoinCourseModel";
import { COURSE_VIEW_MODE } from "@/shared/constants";
import styles from "./MyEnrolledCourses.module.scss";

const cx = classNames.bind(styles);

export default function MyEnrolledCourses() {
	const { data: allCourses } =
		courseApi.endpoints.getMyEnrolledCourses.useQuery(null);

	console.log("allCourses:: ", allCourses);
	return (
		<div className={cx("join-course-wrapper")}>
			<div className={cx("banner")}>
				<div>Lớp học của tôi</div>
			</div>
			<div className={cx("content", "container")}>
				<Row gutter={[24, 24]}>
					<Col className={cx("tabs")} span={6}>
						<ul>
							<li className={cx("active")}>Tất cả lớp học</li>
							{/* <li>Đang học </li>
							<li>Lớp đã lưu</li>
							<li>Đã hoàn thành</li> */}
						</ul>
						<div className={cx("join-btn")}>
							<JoinCourseModel />
						</div>
					</Col>
					<Col span={18}>
						<Row gutter={24}>
							{allCourses?.data?.length > 0 &&
								allCourses.data.map((courseAttempt: any) => {
									return (
										<Col span={8} key={courseAttempt.id}>
											<ClassBlock
												mode={
													courseAttempt?.status ===
													"ACTIVE"
														? COURSE_VIEW_MODE.ENROLLED
														: COURSE_VIEW_MODE.INACTIVE
												}
												data={courseAttempt?.course}
											/>
										</Col>
									);
								})}
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}
