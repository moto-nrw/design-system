import type { HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md" | "lg";
	label?: string;
}

const sizes = { sm: 20, md: 32, lg: 48 };
const strokes = { sm: 2.5, md: 3, lg: 3.5 };

export function Spinner({ size = "md", label, className, ...props }: SpinnerProps) {
	const s = sizes[size];
	const stroke = strokes[size];
	const r = (s - stroke) / 2;
	const circumference = 2 * Math.PI * r;

	return (
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")} role="status" {...props}>
			<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={styles.svg}>
				{/* Track */}
				<circle
					cx={s / 2}
					cy={s / 2}
					r={r}
					fill="none"
					stroke="var(--semantic-color-border-default)"
					strokeWidth={stroke}
				/>
				{/* Arc */}
				<circle
					cx={s / 2}
					cy={s / 2}
					r={r}
					fill="none"
					stroke="var(--semantic-color-brand-primary)"
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
				/>
			</svg>
			{label && <p className={styles.label}>{label}</p>}
			<span className={styles.srOnly}>Laden...</span>
		</div>
	);
}
