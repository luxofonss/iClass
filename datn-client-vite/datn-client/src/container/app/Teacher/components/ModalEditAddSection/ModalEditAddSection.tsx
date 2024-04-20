/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import { Button, Divider, Form, Input, Modal } from "antd";
import { Plus } from "lucide-react";
import useModal from "../../../../../hooks/useModal";
import styles from "./ModalEditAddSection.module.scss";
import { courseApi } from "@/app-data/service/course.service";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const cx = classNames.bind(styles);

export default function ModalEditAddSection() {
	const { visible, openModal, closeModal } = useModal();
	const [getAllSections] =
		courseApi.endpoints.getAllSectionInCourse.useLazyQuery();

	const [addSection] = courseApi.endpoints.addSection.useMutation();

	const [form] = Form.useForm();
	const { id: courseId } = useParams();

	function handleCancel() {
		closeModal();
	}

	function handleOk() {
		form.submit();
		// closeModal()
	}

	async function onSubmit(values: any) {
		try {
			await addSection({
				courseId,
				data: values,
			}).unwrap();

			toast.success("Add section successfully!");
			closeModal();
			getAllSections({ id: courseId });
		} catch (error: any) {
			toast.error(error?.data?.message || "Error");
		}
	}

	return (
		<div className={cx("modalEditAddSection")}>
			<Button
				icon={<Plus size={16} />}
				type="primary"
				onClick={openModal}
			>
				New Section
			</Button>
			<Modal
				title="Basic Modal"
				open={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} onFinish={onSubmit}>
					<Form.Item name={"name"} label="Section name">
						<Input />
					</Form.Item>

					<Form.Item name="description" label="Section description">
						<Input />
					</Form.Item>
					<Divider />
					<Form.List name={"lectures"}>
						{(fields, { add, remove }) => (
							<div className={cx("list-items")}>
								{fields.map((field) => (
									<div
										className={cx("list-items__item")}
										key={field.key}
									>
										<Form.Item name={[field.name, "name"]}>
											<Input placeholder="Lecture name" />
										</Form.Item>
										<Form.Item
											name={[field.name, "description"]}
										>
											<Input placeholder="Lecture description" />
										</Form.Item>
										<Button
											onClick={() => {
												remove(field.key);
											}}
										>
											Delete
										</Button>
									</div>
								))}
								<Button
									onClick={() => {
										add();
									}}
									htmlType="button"
								>
									Add item
								</Button>
							</div>
						)}
					</Form.List>
				</Form>
			</Modal>
		</div>
	);
}
