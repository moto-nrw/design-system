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
		!hoverable && styles[variant],
		hoverable && styles.hoverable,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const contentClass = [styles.cardContent, padding !== "none" && styles[`padding-${padding}`]]
		.filter(Boolean)
		.join(" ");

	if (hoverable) {
		return (
			<div className={classNames} {...props}>
				<div className={styles.gradientOverlay} />
				<div className={styles.innerGlow} />
				<div className={styles.ringHighlight} />
				<div className={contentClass}>{children}</div>
				<div className={styles.glowBorder} />
			</div>
		);
	}

	return (
		<div className={classNames} {...props}>
			<div className={contentClass}>{children}</div>
		</div>
	);
}
