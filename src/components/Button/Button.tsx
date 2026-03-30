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
		"bg-[var(--semantic-color-bg-inverse)] text-[var(--semantic-color-text-inverse)] shadow-[var(--shadow-sm)] hover:enabled:bg-[var(--semantic-color-bg-inverse-hover)] hover:enabled:shadow-[var(--shadow-md)]",
	secondary:
		"bg-[var(--semantic-color-bg-emphasis)] text-[var(--semantic-color-text-strong)] shadow-[var(--shadow-sm)] hover:enabled:bg-[var(--semantic-color-bg-emphasis-hover)] hover:enabled:shadow-[var(--shadow-md)]",
	outline:
		"bg-transparent text-[var(--semantic-color-text-tertiary)] border-[var(--semantic-color-border-strong)] hover:enabled:bg-[var(--semantic-color-bg-subtle)] hover:enabled:border-[var(--semantic-color-border-muted)]",
	outline_danger:
		"bg-[var(--semantic-color-feedback-error-light)] text-[var(--semantic-color-feedback-error-text)] border-[var(--semantic-color-feedback-error-border)] hover:enabled:bg-[var(--semantic-color-feedback-error-light)] hover:enabled:border-[var(--semantic-color-feedback-error)]",
	danger:
		"bg-[var(--semantic-color-feedback-error-text)] text-[var(--semantic-color-text-inverse)] shadow-[var(--shadow-sm)] hover:enabled:bg-[var(--semantic-color-feedback-error)] hover:enabled:shadow-[var(--shadow-md)]",
	success:
		"bg-[var(--semantic-color-brand-primary)] text-[var(--semantic-color-text-inverse)] shadow-[var(--shadow-sm)] hover:enabled:bg-[var(--semantic-color-brand-primary-hover)] hover:enabled:shadow-[var(--shadow-md)] active:enabled:scale-95",
	ghost:
		"bg-transparent text-[var(--semantic-color-text-default)] hover:enabled:bg-[var(--semantic-color-bg-muted)]",
} as const;

const sizeStyles = {
	sm: "px-[var(--button-sm-padding-x)] py-[var(--button-sm-padding-y)] text-[length:var(--button-sm-font-size)] leading-normal",
	md: "px-[var(--button-md-padding-x)] py-[var(--button-md-padding-y)] text-[length:var(--button-md-font-size)] leading-normal",
	lg: "px-[var(--button-lg-padding-x)] py-[var(--button-lg-padding-y)] text-[length:var(--button-lg-font-size)] leading-normal",
	xl: "px-[var(--button-xl-padding-x)] py-[var(--button-xl-padding-y)] text-[length:var(--button-xl-font-size)] leading-normal",
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
				"inline-flex items-center justify-center gap-2 border border-transparent rounded-[var(--button-radius)] font-sans font-[number:var(--button-font-weight)] cursor-pointer transition-all duration-[var(--button-transition-duration)] focus-visible:outline-none disabled:opacity-[var(--disabled-opacity)] disabled:cursor-not-allowed",
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
