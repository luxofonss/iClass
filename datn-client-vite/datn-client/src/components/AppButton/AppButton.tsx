/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariantProps, cva } from "class-variance-authority";

import React from "react";
import styles from "./AppButton.module.scss";
const buttonStyle = cva(styles.base, {
	variants: {
		background: {
			blue: styles.blue,
			pink: styles.pink,
			violet: styles.violet,
		},
		size: {
			small: styles.small,
			medium: styles.medium,
			large: styles.large,
		},
		type: {
			primary: styles.primary,
			outlined: styles.outlined,
		},
		defaultVariants: {
			background: "blue",
			size: "medium",
		},
	},
});

export interface IAppButton
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonStyle> {}

export default function AppButton(props: IAppButton) {
	const { type, background, size, title, ...buttonProps } = props;

	return (
		<button
			className={buttonStyle({ background, size, type })}
			{...buttonProps}
		>
			{title}
		</button>
	);
}
