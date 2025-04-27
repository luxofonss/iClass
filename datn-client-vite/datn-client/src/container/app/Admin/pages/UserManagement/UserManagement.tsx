/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { userApi } from "@/app-data/service/user.service";
import type { TableProps } from "antd";
import { Button, Table, Tag, Typography } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./UserManagement.module.scss";

const cx = classNames.bind(styles);

interface DataType {
	key: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	deletedAt: string;
	id: string;
}

export default function UserManagement() {
	const [getAllUsers, { data: users, isLoading: isGettingAllUsers }] =
		userApi.endpoints.getAllUsers.useLazyQuery();

	const [activateUser, { isLoading: isActivatingUser }] =
		userApi.endpoints.activateUser.useMutation();

	const [deactivateUser, { isLoading: isDeactivatingUser }] =
		userApi.endpoints.deactivateUser.useMutation();

	useEffect(() => {
		getAllUsers(null, false);
	}, []);

	async function handleActivateUser(userId: string) {
		try {
			await activateUser(userId).unwrap();

			toast.success("Activate user successfully!");
			getAllUsers(null, false);
		} catch (error: any) {
			toast.error(
				error?.data?.message ||
					"Something went wrong, please try again later!"
			);
		}
	}

	async function handleDeactivateUser(userId: string) {
		try {
			await deactivateUser(userId).unwrap();

			toast.success("Deactivate user successfully!");
			getAllUsers(null, false);
		} catch (error: any) {
			toast.error(
				error?.data?.message ||
					"Something went wrong, please try again later!"
			);
		}
	}

	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Họ và tên",
			dataIndex: "name",
			key: "name",
			render: (_, { firstName, lastName }) => firstName + " " + lastName,
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Phân quyền",
			dataIndex: "role",
			key: "role",
		},
		{
			title: "Trạng thái",
			key: "status",
			dataIndex: "status",
			render: (_, { deletedAt }) => {
				if (deletedAt === null) {
					return (
						<Tag color={"geekblue"} key={"active"}>
							Active
						</Tag>
					);
				} else {
					return (
						<Tag color={"geekvolcanoblue"} key={"inactive"}>
							Inative
						</Tag>
					);
				}
			},
		},
		{
			title: "Action",
			key: "action",
			render: (_, { id, deletedAt }) => {
				if (deletedAt === null) {
					return (
						<Button
							onClick={() => {
								handleDeactivateUser(id);
							}}
							loading={isDeactivatingUser}
							danger
						>
							Deactivate
						</Button>
					);
				} else {
					return (
						<Button
							onClick={() => {
								handleActivateUser(id);
							}}
							loading={isActivatingUser}
						>
							Activate
						</Button>
					);
				}
			},
		},
	];

	return (
		<div className={cx("userManagement")}>
			<Typography.Title level={3}>Quản lý người dùng</Typography.Title>
			<Table
				rowKey={(record) => record?.id}
				columns={columns}
				dataSource={users?.data}
				loading={isGettingAllUsers}
			/>
		</div>
	);
}
