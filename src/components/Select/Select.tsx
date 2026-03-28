import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	placeholder?: string;
	options: SelectOption[];
}

export function Select({ label, placeholder, options, id, className, ...props }: SelectProps) {
	const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

	return (
		<div className={styles.wrapper}>
			{label && (
				<label htmlFor={selectId} className={styles.label}>
					{label}
				</label>
			)}
			<div className={styles.container}>
				<select
					id={selectId}
					className={[styles.select, className].filter(Boolean).join(" ")}
					{...props}
				>
					{placeholder && (
						<option value="" disabled={props.required}>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option key={option.value} value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					))}
				</select>
				<div className={styles.chevron} aria-hidden="true">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>
	);
}
