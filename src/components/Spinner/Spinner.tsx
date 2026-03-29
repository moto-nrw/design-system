import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
		<>
			<style>{`@keyframes ds-spin{to{transform:rotate(360deg)}}`}</style>
			<div className={cn("flex flex-col items-center gap-3", className)} role="status" {...props}>
				<svg
					width={s}
					height={s}
					viewBox={`0 0 ${s} ${s}`}
					className="animate-[ds-spin_0.8s_cubic-bezier(0.4,0,0.2,1)_infinite]"
				>
					<circle
						cx={s / 2}
						cy={s / 2}
						r={r}
						fill="none"
						stroke="var(--semantic-color-border-default)"
						strokeWidth={stroke}
					/>
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
				{label && (
					<p className="m-0 font-sans text-sm text-[var(--semantic-color-text-muted)]">{label}</p>
				)}
				<span className="sr-only">Laden...</span>
			</div>
		</>
	);
}
