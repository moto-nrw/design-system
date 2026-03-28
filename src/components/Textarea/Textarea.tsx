import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

export function Textarea({ label, error, id, name, rows = 4, className, ...props }: TextareaProps) {
	const textareaId = id || name;

	return (
		<div className={styles.wrapper}>
			{label && (
				<label htmlFor={textareaId} className={styles.label}>
					{label}
				</label>
			)}
			<textarea
				id={textareaId}
				name={name}
				rows={rows}
				className={[styles.textarea, error && styles.error, className].filter(Boolean).join(" ")}
				aria-invalid={error ? "true" : undefined}
				aria-describedby={error ? `${textareaId}-error` : undefined}
				{...props}
			/>
			{error && (
				<p id={`${textareaId}-error`} className={styles.errorText}>
					{error}
				</p>
			)}
		</div>
	);
}
