import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	label?: string;
	size?: "sm" | "md";
}

const trackSizes = {
	sm: "w-[var(--toggle-sm-track-width)] h-[var(--toggle-sm-track-height)]",
	md: "w-[var(--toggle-md-track-width)] h-[var(--toggle-md-track-height)]",
} as const;

const thumbSizes = {
	sm: "size-[var(--toggle-sm-thumb-size)]",
	md: "size-[var(--toggle-md-thumb-size)]",
} as const;

const thumbTranslate = {
	sm: "peer-checked:[&>div]:translate-x-[var(--toggle-sm-thumb-translate)]",
	md: "peer-checked:[&>div]:translate-x-[var(--toggle-md-thumb-translate)]",
} as const;

export function Toggle({ label, size = "md", id, name, className, ...props }: ToggleProps) {
	const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

	return (
		<label
			htmlFor={inputId}
			className={cn("inline-flex items-center gap-2.5 cursor-pointer", className)}
		>
			<input
				type="checkbox"
				id={inputId}
				name={name}
				className="peer absolute size-px overflow-hidden [clip:rect(0,0,0,0)]"
				{...props}
			/>
			<div
				className={cn(
					"relative rounded-full bg-[var(--semantic-color-border-strong)] transition-colors duration-150 peer-checked:bg-[var(--semantic-color-brand-primary)] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
					trackSizes[size],
					thumbTranslate[size],
				)}
			>
				<div
					className={cn(
						"absolute top-0.5 left-0.5 rounded-full bg-[var(--semantic-color-bg-default)] shadow-sm transition-transform duration-150",
						thumbSizes[size],
					)}
				/>
			</div>
			{label && (
				<span className="font-sans text-sm text-[var(--semantic-color-text-default)] select-none">
					{label}
				</span>
			)}
		</label>
	);
}
