/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./LessonLearningLayout.module.scss";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
const cx = classNames.bind(styles);

export default function LessonLearningLayout() {
	return (
		<div className={cx("wrapper")}>
			<AppHeader />
			<Outlet />
		</div>
	);
}
