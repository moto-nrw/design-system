import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
				className={cn(
					"animate-[wave_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--semantic-color-bg-muted)_25%,var(--semantic-color-bg-subtle)_50%,var(--semantic-color-bg-muted)_75%)]",
					className,
				)}
				style={itemStyle}
				aria-hidden="true"
				{...props}
			/>
		);
	}

	return (
		<div className="flex flex-col" style={{ gap }} aria-hidden="true" {...props}>
			{Array.from({ length: count }, (_, i) => (
				<div
					key={`skeleton-${i}`}
					className={cn(
						"animate-[wave_1.5s_ease-in-out_infinite] bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--semantic-color-bg-muted)_25%,var(--semantic-color-bg-subtle)_50%,var(--semantic-color-bg-muted)_75%)]",
						className,
					)}
					style={itemStyle}
				/>
			))}
		</div>
	);
}
