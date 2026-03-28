import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "outline_danger" | "danger" | "success" | "ghost";
	size?: "sm" | "md" | "lg" | "xl";
	isLoading?: boolean;
	loadingText?: string;
	children: ReactNode;
}

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
	const classNames = [styles.button, styles[variant], styles[size], className]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classNames}
			disabled={disabled || isLoading}
			aria-busy={isLoading || undefined}
			{...props}
		>
			{isLoading ? loadingText : children}
		</button>
	);
}
