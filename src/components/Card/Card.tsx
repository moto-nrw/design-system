import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "glass";
	padding?: "none" | "sm" | "md" | "lg";
	hoverable?: boolean;
	children: ReactNode;
}

export function Card({
	variant = "default",
	padding = "md",
	hoverable = false,
	className,
	children,
	...props
}: CardProps) {
	const classNames = [
		styles.card,
		styles[variant],
		padding !== "none" && styles[`padding-${padding}`],
		hoverable && styles.hoverable,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
}
