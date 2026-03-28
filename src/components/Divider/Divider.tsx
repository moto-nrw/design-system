import type { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	spacing?: "sm" | "md" | "lg";
	label?: string;
}

export function Divider({ spacing = "md", label, className, ...props }: DividerProps) {
	if (label) {
		return (
			<div className={[styles.labeled, styles[spacing], className].filter(Boolean).join(" ")}>
				<hr className={styles.line} {...props} />
				<span className={styles.label}>{label}</span>
				<hr className={styles.line} {...props} />
			</div>
		);
	}

	return (
		<hr
			className={[styles.divider, styles[spacing], className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}
