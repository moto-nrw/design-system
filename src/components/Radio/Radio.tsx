import type { InputHTMLAttributes } from "react";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
}

export function Radio({ label, id, name, className, ...props }: RadioProps) {
	const inputId = id || `${name}-${label.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<label htmlFor={inputId} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<input type="radio" id={inputId} name={name} className={styles.input} {...props} />
			<span className={styles.label}>{label}</span>
		</label>
	);
}
