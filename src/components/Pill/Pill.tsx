import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type PillColor = "red" | "green" | "blue" | "orange" | "purple" | "gray";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
	label: string;
	color?: PillColor;
	variant?: "solid" | "subtle";
	size?: "sm" | "md" | "lg";
	dot?: boolean;
}

const solidStyles: Record<PillColor, string> = {
	red: "bg-[var(--semantic-color-feedback-error-strong)] text-[var(--semantic-color-text-inverse)]",
	green: "bg-[var(--semantic-color-brand-primary)] text-[var(--semantic-color-text-inverse)]",
	blue: "bg-[var(--semantic-color-feedback-info)] text-[var(--semantic-color-text-inverse)]",
	orange: "bg-[var(--semantic-color-feedback-warning)] text-[var(--semantic-color-text-inverse)]",
	purple: "bg-[var(--semantic-color-feedback-accent)] text-[var(--semantic-color-text-inverse)]",
	gray: "bg-[var(--semantic-color-border-muted)] text-[var(--semantic-color-text-inverse)]",
};

const subtleStyles: Record<PillColor, string> = {
	red: "bg-[var(--semantic-color-feedback-error-light)] text-[var(--semantic-color-feedback-error-text)]",
	green:
		"bg-[var(--semantic-color-feedback-success-light)] text-[var(--semantic-color-feedback-success-text)]",
	blue: "bg-[var(--semantic-color-feedback-info-light)] text-[var(--semantic-color-feedback-info-text)]",
	orange:
		"bg-[var(--semantic-color-brand-secondary-light)] text-[var(--semantic-color-feedback-warning-text)]",
	purple:
		"bg-[var(--semantic-color-feedback-accent-light)] text-[var(--semantic-color-feedback-accent-text)]",
	gray: "bg-[var(--semantic-color-bg-muted)] text-[var(--semantic-color-text-secondary)]",
};

const sizeStyles = {
	sm: "px-2 py-0.5 text-xs",
	md: "px-3 py-1.5 text-xs",
	lg: "px-4 py-2 text-sm",
} as const;

const dotSizes = {
	sm: "size-1 mr-1.5",
	md: "size-1.5 mr-2",
	lg: "size-2 mr-2.5",
} as const;

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
			className={cn(
				"inline-flex items-center rounded-full font-sans font-bold whitespace-nowrap",
				variant === "solid" ? solidStyles[color] : subtleStyles[color],
				sizeStyles[size],
				className,
			)}
			{...props}
		>
			{dot && <span className={cn("rounded-full bg-current opacity-80", dotSizes[size])} />}
			{label}
		</span>
	);
}
