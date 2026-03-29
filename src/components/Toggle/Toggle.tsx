import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	label?: string;
	size?: "sm" | "md";
}

const trackSizes = {
	sm: "w-9 h-5",
	md: "w-11 h-6",
} as const;

const thumbSizes = {
	sm: "size-4",
	md: "size-5",
} as const;

const thumbTranslate = {
	sm: "peer-checked:translate-x-4",
	md: "peer-checked:translate-x-5",
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
					"relative rounded-full bg-steel-300 transition-colors duration-150 peer-checked:bg-[var(--semantic-color-brand-primary)] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
					trackSizes[size],
				)}
			>
				<div
					className={cn(
						"absolute top-0.5 left-0.5 rounded-full bg-[var(--semantic-color-bg-default)] shadow-sm transition-transform duration-150",
						thumbSizes[size],
						thumbTranslate[size],
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
