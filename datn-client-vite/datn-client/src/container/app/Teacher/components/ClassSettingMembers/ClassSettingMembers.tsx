/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { courseApi } from "@/app-data/service/course.service";
import { Button, Modal, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useModal from "../../../../../hooks/useModal";
import ModalAddUserToCourses from "../ModalAddUserToCourses";
import styles from "./ClassSettingMembers.module.scss";

const cx = classNames.bind(styles);

interface DataType {
	id: string;
	key: React.Key;
	userId: string;
	courseId: string;
	price: string;
	studentId: string;
	status: string;
	createdAt: string;
	student: {
		id: string;
		deletedAt: string;
		createdAt: string;
		updatedAt: string;
		firstName: string;
		lastName: string;
		gender: string;
		dob: string;
		email: string;
	};
}

const onChange: TableProps<DataType>["onChange"] = (
	pagination,
	filters,
	sorter,
	extra
) => {
	console.log("params", pagination, filters, sorter, extra);
};

export default function ClassSettingMembers() {
	const { visible, openModal, closeModal } = useModal();
	const { courseId } = useParams();

	const [getAllEnrolledStudents, { data: enrollments }] =
		courseApi.endpoints.getAllEnrolledStudents.useLazyQuery();
	const [deleteEnrollment, { isLoading: isDisabling }] =
		courseApi.endpoints.deleteCourseEnrollment.useMutation();
	const [enableEnrollment, { isLoading: isEnabling }] =
		courseApi.endpoints.enableCourseEnrollment.useMutation();
	const [getCourse, { data: course }] =
		courseApi.endpoints.getCourseById.useLazyQuery();

	useEffect(() => {
		if (courseId) getCourse({ id: courseId });
	}, []);

	useEffect(() => {
		if (courseId) getAllEnrolledStudents({ id: courseId });
	}, []);

	function getCourseStudentHandler() {
		if (courseId) getAllEnrolledStudents({ id: courseId });
	}
	async function handleDeleteEnrollment(id: string) {
		try {
			await deleteEnrollment({ id: id }).unwrap();
			toast.success("Disable user successfully");
			getCourseStudentHandler();
		} catch (error) {
			toast.error("Disable user failed");
			console.log(error);
		}
	}

	async function handleEnableEnrollment(id: string) {
		try {
			await enableEnrollment({ id: id }).unwrap();
			toast.success("Enable user successfully");
			getCourseStudentHandler();
		} catch (error) {
			toast.error("Enable user failed");
			console.log(error);
		}
	}

	const columns: ColumnsType<DataType> = [
		{
			title: "Họ và tên",
			key: "fullName",
			render: (_, { student }) => {
				return `${student?.lastName} ${student?.firstName}`;
			},
		},
		{
			title: "Email",
			key: "email",
			render: (_, { student }) => {
				return `${student?.email}`;
			},
		},
		{
			title: "Số báo danh",
			dataIndex: "studentId",
			sorter: {
				compare: (a, b) => a.studentId.localeCompare(b.studentId),
				multiple: 3,
			},
		},
		{
			title: "Giới tính",
			dataIndex: "gender",
			sorter: {
				compare: (a, b) =>
					a.student.gender.localeCompare(b.student.gender),
				multiple: 3,
			},
			render: (_, { student }) => {
				return student?.gender;
			},
		},
		{
			title: "Ngày sinh",
			dataIndex: "dateOfBirth",
			sorter: {
				compare: (a, b) =>
					a.student?.dateOfBirth.localeCompare(
						b.student?.dateOfBirth
					),
				multiple: 2,
			},
			render: (_, { student }) => {
				return student?.dateOfBirth;
			},
		},
		{
			title: "Ngày tham gia",
			dataIndex: "createdAt",
			sorter: {
				compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
				multiple: 2,
			},
			render: (_, { createdAt }) => {
				return createdAt?.slice(0, 19);
			},
		},
		{
			title: "Trạng thái",
			key: "status",
			dataIndex: "status",
			render: (_, { status }) => {
				let color;
				if (status === "inactive") {
					color = "volcano";
				} else {
					color = "green";
				}
				return (
					<Tag color={color} key={status}>
						{status.toUpperCase()}
					</Tag>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => {
				if (record?.status === "ACTIVE")
					return (
						<Space>
							<Button
								loading={isDisabling}
								onClick={() => {
									handleDeleteEnrollment(record?.id);
								}}
								danger
							>
								Disable
							</Button>
						</Space>
					);
				else
					return (
						<Space>
							<Button
								loading={isEnabling}
								onClick={() => {
									handleEnableEnrollment(record?.id);
								}}
							>
								Enable
							</Button>
						</Space>
					);
			},
		},
	];
	return (
		<div className={cx("class-setting-member")}>
			<div className={cx("options")}>
				<ModalAddUserToCourses />
				<Button onClick={openModal}>Get course code</Button>
				<Modal
					title="Get course code"
					open={visible}
					onCancel={closeModal}
					onOk={closeModal}
				>
					<Typography.Title level={3}>
						{course?.data?.code}
					</Typography.Title>
				</Modal>
			</div>
			{enrollments?.data && (
				<Table
					pagination={false}
					columns={columns}
					dataSource={enrollments?.data}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
