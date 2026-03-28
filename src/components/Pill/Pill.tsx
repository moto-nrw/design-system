import type { HTMLAttributes } from "react";
import styles from "./Pill.module.css";

export type PillColor = "red" | "green" | "blue" | "orange" | "purple" | "gray";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
	label: string;
	color?: PillColor;
	variant?: "solid" | "subtle";
	size?: "sm" | "md" | "lg";
	dot?: boolean;
}

export function Pill({
	label,
	color = "gray",
	variant = "solid",
	size = "md",
	dot = true,
	className,
	...props
}: PillProps) {
	return (
		<span
			className={[styles.pill, styles[`${variant}-${color}`], styles[size], className]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			{dot && <span className={[styles.dot, styles[`dot-${size}`]].join(" ")} />}
			{label}
		</span>
	);
}
