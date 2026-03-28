import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	width?: number | string;
	height?: number | string;
	circle?: boolean;
	borderRadius?: number | string;
	count?: number;
	gap?: number;
}

export function Skeleton({
	width,
	height = 16,
	circle = false,
	borderRadius,
	count = 1,
	gap = 8,
	className,
	style,
	...props
}: SkeletonProps) {
	const resolvedRadius = circle
		? "9999px"
		: borderRadius != null
			? typeof borderRadius === "number"
				? `${borderRadius}px`
				: borderRadius
			: "var(--radius-md)";

	const itemStyle: CSSProperties = {
		width: circle ? height : width,
		height,
		borderRadius: resolvedRadius,
		...style,
	};

	if (count === 1) {
		return (
			<div
				className={[styles.skeleton, className].filter(Boolean).join(" ")}
				style={itemStyle}
				aria-hidden="true"
				{...props}
			/>
		);
	}

	return (
		<div className={styles.group} style={{ gap }} aria-hidden="true" {...props}>
			{Array.from({ length: count }, (_, i) => (
				<div
					key={`skeleton-${i}`}
					className={[styles.skeleton, className].filter(Boolean).join(" ")}
					style={itemStyle}
				/>
			))}
		</div>
	);
}
