/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { ROLE } from "@/shared/constants";
import { SimpleCourseView } from "@/shared/schema/course.schema";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
	BookCheck,
	BookText,
	Folder,
	GraduationCap,
	Settings,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClassLayoutSider.module.scss";
const cx = classNames.bind(styles);

interface IClassLayoutSiderProps {
	siderCollapsed: boolean;
	data: SimpleCourseView;
	mode: string;
}

export default function ClassLayoutSider({
	siderCollapsed,
	data,
	mode,
}: IClassLayoutSiderProps) {
	const navigate = useNavigate();

	console.log("mode:: ", mode, data);
	const { courseId } = useParams();

	const menuItems = [
		{
			key:
				mode === ROLE.TEACHER
					? `/teacher/courses/${courseId}/home`
					: `/courses/${courseId}/home`,
			icon: <GraduationCap size={16} />,
			label: "Bảng tin",
		},
		{
			key:
				mode === ROLE.TEACHER
					? `/teacher/courses/${courseId}/lectures`
					: `/courses/${courseId}/lessons`,
			icon: <BookCheck size={16} />,
			label: "Chương trình học",
		},
		{
			key:
				mode === ROLE.TEACHER
					? `/teacher/courses/${courseId}/assignments`
					: `/courses/${courseId}/assignments`,
			icon: <BookText size={16} />,
			label: "Bài tập",
		},
		{
			key:
				mode === ROLE.TEACHER
					? `/teacher/courses/${courseId}/files`
					: `/courses/${courseId}/about`,
			icon: <Folder size={16} />,
			label: "Về lớp học",
		},

		mode === ROLE.TEACHER && {
			key: `/teacher/courses/${courseId}/settings`,
			icon: <Settings size={16} />,
			label: "Quản lý lớp học",
		},
	];

	return (
		<Sider
			className={cx("sider")}
			theme="light"
			trigger={null}
			collapsible
			collapsed={siderCollapsed}
			width={"100%"}
		>
			<Menu
				className={cx("menu")}
				theme="light"
				mode="inline"
				defaultSelectedKeys={[location.pathname]}
				onClick={(e: any) => {
					navigate(e.key);
				}}
			>
				{menuItems.map((item) =>
					item ? (
						<Menu.Item
							style={{ fontSize: 14 }}
							key={item.key}
							icon={item.icon}
						>
							{item.label}
						</Menu.Item>
					) : null
				)}
			</Menu>
		</Sider>
	);
}
