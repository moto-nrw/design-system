import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "outline_danger" | "danger" | "success" | "ghost";
	size?: "sm" | "md" | "lg" | "xl";
	isLoading?: boolean;
	loadingText?: string;
	children: ReactNode;
}

const variantStyles = {
	primary:
		"bg-steel-900 text-[var(--semantic-color-text-inverse)] shadow-sm hover:enabled:bg-steel-700 hover:enabled:shadow-md",
	secondary:
		"bg-steel-200 text-steel-800 shadow-sm hover:enabled:bg-steel-300 hover:enabled:shadow-md",
	outline:
		"bg-transparent text-steel-700 border-[var(--semantic-color-border-strong)] hover:enabled:bg-[var(--semantic-color-bg-subtle)] hover:enabled:border-steel-400",
	outline_danger:
		"bg-red-50 text-red-600 border-red-400 hover:enabled:bg-[var(--semantic-color-feedback-error-light)] hover:enabled:border-red-500",
	danger:
		"bg-red-600 text-[var(--semantic-color-text-inverse)] shadow-sm hover:enabled:bg-red-500 hover:enabled:shadow-md",
	success:
		"bg-[var(--semantic-color-brand-primary)] text-[var(--semantic-color-text-inverse)] shadow-sm hover:enabled:bg-[var(--semantic-color-brand-primary-hover)] hover:enabled:shadow-md active:enabled:scale-95",
	ghost:
		"bg-transparent text-[var(--semantic-color-text-default)] hover:enabled:bg-[var(--semantic-color-bg-muted)]",
} as const;

const sizeStyles = {
	sm: "px-3 py-1 text-sm leading-normal",
	md: "px-5 py-2 text-base leading-normal",
	lg: "px-5 py-3 text-lg leading-normal",
	xl: "px-6 py-3 text-xl leading-normal",
} as const;

export function Button({
	variant = "primary",
	size = "md",
	isLoading = false,
	loadingText = "Laden...",
	className,
	children,
	disabled,
	type = "submit",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(
				"inline-flex items-center justify-center gap-2 border border-transparent rounded-md font-sans font-medium cursor-pointer transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
				variantStyles[variant],
				sizeStyles[size],
				className,
			)}
			disabled={disabled || isLoading}
			aria-busy={isLoading || undefined}
			{...props}
		>
			{isLoading ? loadingText : children}
		</button>
	);
}
