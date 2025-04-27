/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";

import styles from "./NotificationItem.module.scss";
const cx = classNames.bind(styles);

export default function NotificationItem({ data }: { data: any }) {
	return <div className={cx("wrapper")}>{data?.message}</div>;
}
