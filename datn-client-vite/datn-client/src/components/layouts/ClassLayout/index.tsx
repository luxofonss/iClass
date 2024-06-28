/* eslint-disable react-hooks/exhaustive-deps */
import { Content } from "antd/es/layout/layout";
import { Outlet, useParams } from "react-router-dom";

import { courseApi } from "@/app-data/service/course.service";
import { Col, Row } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import ClassLayoutSider from "../components/ClassLayoutSider";
import styles from "./ClassLayout.module.scss";

const cx = classNames.bind(styles);

interface IClassLayout {
	readonly mode: string;
}

function ClassLayout(props: IClassLayout) {
	const { mode } = props;

	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	const { courseId } = useParams();

	useEffect(() => {
		if (courseId) getCourse({ id: courseId });
	}, []);

	console.log("course:: ", course);

	return (
		<div className={cx("class-layout")}>
			<div
				style={{
					backgroundImage: course?.data?.backgroundImage
						? `linear-gradient(
						90deg,
						#9b16f3 32.4%,
						rgba(155, 22, 243, 0.2) 100%
					) , url(${course?.data?.backgroundImage})`
						: `linear-gradient(
					90deg,
					#9b16f3 32.4%,
					rgba(155, 22, 243, 0.2) 100%
				) , url("https://codeop.tech/wp-content/uploads/2023/11/florian-olivo-4hbJ-eymZ1o-unsplash-scaled.jpg")`,
				}}
				className={cx("banner")}
			>
				{course?.data?.name}
			</div>
			<Row gutter={24}>
				<Col span={4}>
					<ClassLayoutSider
						mode={mode}
						data={course?.data}
						siderCollapsed={false}
					/>
				</Col>
				<Col span={20}>
					<Content
						style={{
							padding: 24,
							minHeight: 280,
							background: "#F2F2F2",
						}}
						className={cx("content")}
					>
						<div className={cx("outlet")}>
							<Outlet />
						</div>
					</Content>
				</Col>
			</Row>
		</div>
	);
}

export default ClassLayout;
