import type { InputHTMLAttributes } from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	label?: string;
	size?: "sm" | "md";
}

export function Toggle({ label, size = "md", id, name, className, ...props }: ToggleProps) {
	const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

	return (
		<label htmlFor={inputId} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<input type="checkbox" id={inputId} name={name} className={styles.input} {...props} />
			<div className={[styles.track, styles[size]].join(" ")}>
				<div className={styles.thumb} />
			</div>
			{label && <span className={styles.label}>{label}</span>}
		</label>
	);
}
