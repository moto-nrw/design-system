import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
}

export function Radio({ label, id, name, className, ...props }: RadioProps) {
	const inputId = id || `${name}-${label.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<label
			htmlFor={inputId}
			className={cn(
				"flex items-center gap-[var(--radio-gap)] px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-[var(--duration-fast)] hover:bg-[var(--semantic-color-bg-subtle)]",
				className,
			)}
		>
			<input
				type="radio"
				id={inputId}
				name={name}
				className="size-[var(--radio-size)] rounded-full border border-[var(--semantic-color-border-strong)] accent-[var(--semantic-color-text-default)] cursor-pointer disabled:opacity-[var(--disabled-opacity)] disabled:cursor-not-allowed"
				{...props}
			/>
			<span className="font-sans text-sm text-[var(--semantic-color-text-default)] select-none">
				{label}
			</span>
		</label>
	);
}
