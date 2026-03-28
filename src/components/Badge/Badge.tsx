import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
	count: number | string;
	label?: string;
	icon?: ReactNode;
	showLabel?: boolean;
	size?: "sm" | "md";
}

export function Badge({
	count,
	label,
	icon,
	showLabel = true,
	size = "md",
	className,
	...props
}: BadgeProps) {
	return (
		<div className={[styles.badge, styles[size], className].filter(Boolean).join(" ")} {...props}>
			{icon && <span className={styles.icon}>{icon}</span>}
			<span className={styles.count}>{count}</span>
			{showLabel && label && <span className={styles.label}>{label}</span>}
		</div>
	);
}

export function BadgeCompact({
	count,
	icon,
	className,
	...props
}: Omit<BadgeProps, "label" | "showLabel">) {
	return (
		<div className={[styles.badge, styles.sm, className].filter(Boolean).join(" ")} {...props}>
			{icon && <span className={styles.icon}>{icon}</span>}
			<span className={styles.count}>{count}</span>
		</div>
	);
}
