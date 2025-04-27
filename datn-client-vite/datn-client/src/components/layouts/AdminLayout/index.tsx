/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Layout, Menu, Row } from "antd";
import classNames from "classnames/bind";

import Sider from "antd/es/layout/Sider";
import { UserIcon } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

const cx = classNames.bind(styles);
const { Content } = Layout;

const AdminLayout = () => {
	const menuItems = [
		{
			key: "/admin/users",
			icon: <UserIcon size={16} />,
			label: "Quản lý người dùng",
		},
		// {
		// 	key: "/admin/users",
		// 	icon: <School size={16} />,
		// 	label: "Quản lý khóa học",
		// },
		// {
		// 	key: "/admin/users",
		// 	icon: <Newspaper size={16} />,
		// 	label: "Quản lý bài đăng",
		// },
	];

	const navigate = useNavigate();

	return (
		<Layout className={cx("admin-layout")}>
			<Row gutter={24} style={{ width: "100%" }}>
				<Col span={4}>
					<Sider
						className={cx("sider")}
						theme="light"
						trigger={null}
						collapsible
						collapsed={false}
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
										style={{ fontSize: 14, color: "black" }}
										key={item.key}
										icon={item.icon}
									>
										{item.label}
									</Menu.Item>
								) : null
							)}
						</Menu>
					</Sider>
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
		</Layout>
	);
};

export default AdminLayout;
