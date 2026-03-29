import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	type: AlertType;
	message: string;
}

const typeStyles: Record<AlertType, string> = {
	error:
		"bg-[var(--semantic-color-feedback-error-light)] text-[var(--semantic-color-feedback-error-text)] border-[var(--semantic-color-feedback-error-border)]",
	success:
		"bg-[var(--semantic-color-feedback-success-light)] text-[var(--semantic-color-feedback-success-text)] border-[var(--semantic-color-feedback-success-border)]",
	warning:
		"bg-[var(--semantic-color-feedback-warning-light)] text-[var(--semantic-color-feedback-warning-text)] border-[var(--semantic-color-feedback-warning-border)]",
	info: "bg-[var(--semantic-color-bg-muted)] text-[var(--semantic-color-text-tertiary)] border-[var(--semantic-color-border-strong)]",
};

const icons: Record<AlertType, ReactNode> = {
	error: (
		<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
				clipRule="evenodd"
			/>
		</svg>
	),
	success: (
		<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	),
	warning: (
		<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
			<path
				fillRule="evenodd"
				d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
				clipRule="evenodd"
			/>
		</svg>
	),
	info: (
		<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
			<path
				fillRule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
				clipRule="evenodd"
			/>
		</svg>
	),
};

export function Alert({ type, message, className, ...props }: AlertProps) {
	if (!message) return null;

	return (
		<div
			role="alert"
			className={cn(
				"flex items-center gap-2 px-4 py-3 rounded-md border font-sans text-sm shadow-sm",
				typeStyles[type],
				className,
			)}
			{...props}
		>
			<span className="shrink-0 flex">{icons[type]}</span>
			<span>{message}</span>
		</div>
	);
}
