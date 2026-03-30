import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "glass";
	padding?: "none" | "sm" | "md" | "lg";
	hoverable?: boolean;
	selected?: boolean;
	children: ReactNode;
}

const variantStyles = {
	default: "border border-[var(--semantic-color-border-default)]",
	elevated:
		"border border-black/5 bg-[var(--semantic-color-bg-default)]/90 shadow-[var(--card-shadow)] backdrop-blur-[var(--card-backdrop-blur)]",
	glass:
		"bg-[var(--semantic-color-bg-default)]/80 shadow-lg backdrop-blur-[var(--card-backdrop-blur)]",
} as const;

const paddingStyles = {
	none: "",
	sm: "p-[var(--card-padding-sm)]",
	md: "p-[var(--card-padding)]",
	lg: "p-[var(--card-padding-lg)]",
} as const;

const selectedStyles =
	"border-2 border-[var(--semantic-color-brand-primary)] bg-[var(--semantic-color-feedback-success-light)]";

export function Card({
	variant = "default",
	padding = "md",
	hoverable = false,
	selected = false,
	className,
	children,
	...props
}: CardProps) {
	if (hoverable) {
		return (
			<div
				className={cn(
					"group relative overflow-hidden rounded-[var(--card-radius)] transition-all duration-[var(--card-transition-duration)]",
					"cursor-pointer border border-black/5 bg-[var(--semantic-color-bg-default)]/90 shadow-[var(--card-shadow)] backdrop-blur-[var(--card-backdrop-blur)]",
					"hover:translate-y-[var(--card-hover-lift)] hover:border-[var(--semantic-color-border-muted)]/50 hover:bg-[var(--semantic-color-bg-default)] hover:shadow-[var(--card-shadow-hover)]",
					"active:scale-[var(--card-active-scale)]",
					selected && selectedStyles,
					className,
				)}
				{...props}
			>
				<div className="absolute inset-0 rounded-[var(--card-radius)] bg-gradient-to-br from-[var(--semantic-color-bg-subtle)]/80 to-[var(--semantic-color-bg-muted)]/80 opacity-[0.03] pointer-events-none" />
				<div className="absolute inset-px rounded-[var(--card-radius)] bg-gradient-to-br from-[var(--semantic-color-bg-default)]/80 to-[var(--semantic-color-bg-default)]/20 pointer-events-none" />
				<div className="absolute inset-0 rounded-[var(--card-radius)] shadow-[inset_0_0_0_1px_var(--card-glass-border)] transition-shadow duration-[var(--card-transition-duration)] pointer-events-none group-hover:shadow-[inset_0_0_0_1px_var(--card-glass-border-hover)]" />
				<div className={cn("relative", paddingStyles[padding])}>{children}</div>
				<div className="absolute inset-0 rounded-[var(--card-radius)] bg-gradient-to-r from-transparent via-[var(--semantic-color-border-muted)]/20 to-transparent opacity-0 transition-opacity duration-[var(--card-transition-duration)] pointer-events-none group-hover:opacity-100" />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-[var(--card-radius)] bg-[var(--semantic-color-bg-default)] transition-all duration-[var(--card-transition-duration)]",
				variantStyles[variant],
				selected && selectedStyles,
				className,
			)}
			{...props}
		>
			<div className={cn("relative", paddingStyles[padding])}>{children}</div>
		</div>
	);
}
