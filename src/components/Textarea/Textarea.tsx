import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

export function Textarea({ label, error, id, name, rows = 4, className, ...props }: TextareaProps) {
	const textareaId = id || name;

	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label
					htmlFor={textareaId}
					className="font-sans text-sm font-medium text-[var(--semantic-color-text-default)]"
				>
					{label}
				</label>
			)}
			<textarea
				id={textareaId}
				name={name}
				rows={rows}
				className={cn(
					"block w-full resize-y border border-[var(--semantic-color-border-default)] rounded-[var(--textarea-radius)] bg-[var(--semantic-color-bg-default)] px-[var(--textarea-padding-x)] py-[var(--textarea-padding-y)] font-sans text-[length:var(--textarea-font-size)] text-[var(--semantic-color-text-default)] transition-[border-color] duration-150",
					"placeholder:text-[var(--semantic-color-text-muted)]",
					"focus:outline-none focus:border-[var(--semantic-color-border-strong)]",
					"disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--semantic-color-bg-subtle)]",
					error && "border-[var(--semantic-color-feedback-error)]",
					className,
				)}
				aria-invalid={error ? "true" : undefined}
				aria-describedby={error ? `${textareaId}-error` : undefined}
				{...props}
			/>
			{error && (
				<p
					id={`${textareaId}-error`}
					className="font-sans text-xs text-[var(--semantic-color-feedback-error-text)] m-0"
				>
					{error}
				</p>
			)}
		</div>
	);
}
