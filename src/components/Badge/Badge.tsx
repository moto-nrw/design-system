import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
	count: number | string;
	label?: string;
	icon?: ReactNode;
	showLabel?: boolean;
	size?: "sm" | "md";
}

const sizeStyles = {
	sm: "px-2 py-1.5 gap-1.5",
	md: "px-3 py-1.5 gap-2",
} as const;

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
		<div
			className={cn(
				"inline-flex items-center rounded-[var(--badge-radius)] border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-bg-subtle)] font-sans",
				sizeStyles[size],
				className,
			)}
			{...props}
		>
			{icon && <span className="flex text-[var(--semantic-color-text-muted)]">{icon}</span>}
			<span className="text-[length:var(--badge-font-size)] font-[number:var(--badge-font-weight)] text-[var(--semantic-color-text-default)]">
				{count}
			</span>
			{showLabel && label && (
				<span className="text-xs text-[var(--semantic-color-text-muted)]">{label}</span>
			)}
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
		<div
			className={cn(
				"inline-flex items-center rounded-[var(--badge-radius)] border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-bg-subtle)] font-sans px-2 py-1.5 gap-1.5",
				className,
			)}
			{...props}
		>
			{icon && <span className="flex text-[var(--semantic-color-text-muted)]">{icon}</span>}
			<span className="text-[length:var(--badge-font-size)] font-[number:var(--badge-font-weight)] text-[var(--semantic-color-text-default)]">
				{count}
			</span>
		</div>
	);
}
