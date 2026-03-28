import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
}

export function Checkbox({ label, id, name, className, ...props }: CheckboxProps) {
	const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");

	return (
		<label htmlFor={inputId} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<input type="checkbox" id={inputId} name={name} className={styles.input} {...props} />
			<span className={styles.label}>{label}</span>
		</label>
	);
}
