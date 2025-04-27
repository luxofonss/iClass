import { notificationApi } from "@/app-data/service/notification.service";
import { logout } from "@/app-data/slices/authSlice";
import AppButton from "@/components/AppButton";
import NotificationItem from "@/components/NotificationItem";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Popover, Typography, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import classNames from "classnames/bind";
import { Bell, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../../app-data";
import styles from "./AppHeader.module.scss";

const cx = classNames.bind(styles);

export default function AppHeader() {
	const user = useSelector((state: RootState) => state.auth.user);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const {
		token: { colorBorderSecondary },
	} = theme.useToken();

	const [getAllNotifications, { data: allNotifications }] =
		notificationApi.endpoints.getAllNotifications.useLazyQuery();

	useEffect(() => {
		getAllNotifications({ userId: user?.id }, false);
	}, []);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/auth/sign-in");
	};

	console.log("allNotifications:: ", allNotifications);

	const userBox = (
		<div className={cx("user-dropdown")}>
			<div className={cx("info")}>
				<Typography.Text className={cx("name")}>
					{user?.firstName + " " + user?.lastName}
				</Typography.Text>
				<Typography.Text className={cx("position")}>
					@{user?.username}
				</Typography.Text>
			</div>
			<Button
				icon={<LogoutOutlined />}
				type="text"
				style={{ width: "100%" }}
				onClick={handleLogout}
			>
				Logout
			</Button>
		</div>
	);

	return (
		<Header
			className={cx("header")}
			style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}
		>
			<div className={cx("left")}>
				<Link className={cx("logo")} to="/">
					<img
						alt="logo"
						src={
							"https://www.learnify.com/wp-content/uploads/2019/02/xLearnify-Primary-2x.png.pagespeed.ic.k2waHY-min.png"
						}
					/>
				</Link>
				<div className={cx("search")}>
					<input placeholder="Bạn muốn học gì? " />
					<SearchIcon size={24} className={cx("icon")} />
				</div>
			</div>

			<div className={cx("right")}>
				{isLoggedIn ? (
					<div className={cx("user")}>
						{user?.role === "ADMIN" && (
							<Link to="/admin/users">
								<AppButton
									title="Admin"
									size={"small"}
									type={"primary"}
									background={"blue"}
								/>
							</Link>
						)}
						{user?.role === "TEACHER" && (
							<Link to="/teacher/courses">
								<AppButton
									title="Giáo viên"
									size={"small"}
									type={"primary"}
									background={"blue"}
								/>
							</Link>
						)}
						{(user?.role === "TEACHER" ||
							user?.role === "USER") && (
							<Link to="/courses/my-enrolled-courses">
								<AppButton
									title="Lớp học"
									size={"small"}
									type={"primary"}
									background={"pink"}
								/>
							</Link>
						)}
						<Popover
							arrow
							content={
								<div className={cx("noti-box")}>
									{allNotifications?.data?.map(
										(notification) => {
											return (
												<NotificationItem
													data={notification}
												/>
											);
										}
									)}
								</div>
							}
							title="Thông báo"
							trigger="click"
							placement="bottomRight"
						>
							<Badge
								className={cx("item")}
								size="small"
								count={allNotifications?.data?.length}
							>
								<Bell
									color={"#CACCCE"}
									style={{ fontSize: "24px" }}
								/>
							</Badge>
						</Popover>
						<Popover content={userBox} trigger="click">
							<Avatar
								className={cx("avatar")}
								src={
									"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								size={"large"}
							/>
						</Popover>
					</div>
				) : (
					<div className={cx("auth-btns")}>
						<Link to="/auth/sign-in">
							{/* <Button type="default">Đăng nhập</Button> */}
							<AppButton
								title="Đăng nhập"
								size={"small"}
								type={"outlined"}
								background={"blue"}
							/>
						</Link>
						<Link to="/auth/sign-up">
							{/* <Button type="primary">Đăng ký</Button> */}
							<AppButton
								title="Đăng ký"
								size={"small"}
								type={"primary"}
								background={"blue"}
							/>
						</Link>
					</div>
				)}
			</div>
		</Header>
	);
}
