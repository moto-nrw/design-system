import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type StatusDotColor = "green" | "yellow" | "red" | "gray";

export interface StatusDotProps extends HTMLAttributes<HTMLDivElement> {
	color: StatusDotColor;
	tooltip?: string;
	size?: "sm" | "md";
	pulse?: boolean;
}

const colorStyles: Record<StatusDotColor, string> = {
	green: "bg-[var(--semantic-color-brand-primary)]",
	yellow: "bg-warm-400",
	red: "bg-red-500",
	gray: "bg-steel-400",
};

const sizeStyles = {
	sm: "size-2.5",
	md: "size-3",
} as const;

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
			className={cn(
				"shrink-0 rounded-full",
				colorStyles[color],
				sizeStyles[size],
				shouldPulse && "animate-pulse",
				className,
			)}
			title={tooltip}
			{...props}
		/>
	);
}
