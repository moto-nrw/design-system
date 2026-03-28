import type { HTMLAttributes } from "react";
import styles from "./StatusDot.module.css";

export type StatusDotColor = "green" | "yellow" | "red" | "gray";

export interface StatusDotProps extends HTMLAttributes<HTMLDivElement> {
	color: StatusDotColor;
	tooltip?: string;
	size?: "sm" | "md";
	pulse?: boolean;
}

export function StatusDot({
	color,
	tooltip,
	size = "sm",
	pulse,
	className,
	...props
}: StatusDotProps) {
	const shouldPulse = pulse ?? color === "green";

	return (
		<div
			className={[styles.dot, styles[color], styles[size], shouldPulse && styles.pulse, className]
				.filter(Boolean)
				.join(" ")}
			title={tooltip}
			{...props}
		/>
	);
}
