import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "glass";
	padding?: "none" | "sm" | "md" | "lg";
	hoverable?: boolean;
	children: ReactNode;
}

const variantStyles = {
	default: "border border-[var(--semantic-color-border-default)]",
	elevated:
		"border border-black/5 bg-white/90 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-[12px]",
	glass: "bg-white/80 shadow-lg backdrop-blur-[12px]",
} as const;

const paddingStyles = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-10",
} as const;

export function Card({
	variant = "default",
	padding = "md",
	hoverable = false,
	className,
	children,
	...props
}: CardProps) {
	if (hoverable) {
		return (
			<div
				className={cn(
					"group relative overflow-hidden rounded-[24px] bg-[var(--semantic-color-bg-default)] transition-all duration-150",
					"cursor-pointer border border-black/5 bg-white/90 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-[12px]",
					"hover:translate-y-[-2px] hover:border-steel-400/50 hover:bg-white hover:shadow-[0_12px_40px_rgb(0_0_0/0.18)]",
					"active:scale-[0.98]",
					className,
				)}
				{...props}
			>
				<div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-steel-50/80 to-steel-100/80 opacity-[0.03] pointer-events-none" />
				<div className="absolute inset-px rounded-[24px] bg-gradient-to-br from-white/80 to-white/20 pointer-events-none" />
				<div className="absolute inset-0 rounded-[24px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)] transition-shadow duration-150 pointer-events-none group-hover:shadow-[inset_0_0_0_1px_rgb(148_163_184/0.4)]" />
				<div className={cn("relative", paddingStyles[padding])}>{children}</div>
				<div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-transparent via-steel-400/20 to-transparent opacity-0 transition-opacity duration-150 pointer-events-none group-hover:opacity-100" />
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-[24px] bg-[var(--semantic-color-bg-default)] transition-all duration-150",
				variantStyles[variant],
				className,
			)}
			{...props}
		>
			<div className={cn("relative", paddingStyles[padding])}>{children}</div>
		</div>
	);
}
