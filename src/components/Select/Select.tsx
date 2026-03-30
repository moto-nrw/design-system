import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
		<div className="flex flex-col gap-1">
			{label && (
				<label
					htmlFor={selectId}
					className="font-sans text-sm font-medium text-[var(--semantic-color-text-default)]"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<select
					id={selectId}
					className={cn(
						"w-full appearance-none border border-[var(--semantic-color-border-default)] rounded-[var(--select-radius)] bg-[var(--semantic-color-bg-default)] py-[var(--select-padding-y)] pl-[var(--select-padding-left)] pr-10 font-sans text-[length:var(--select-font-size)] text-[var(--semantic-color-text-default)] cursor-pointer transition-[border-color,box-shadow] duration-[var(--duration-fast)]",
						"focus:outline-none focus:border-[var(--semantic-color-border-strong)]",
						"disabled:opacity-[var(--disabled-opacity)] disabled:cursor-not-allowed",
						className,
					)}
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
				<div
					className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-[var(--semantic-color-text-muted)] pointer-events-none"
					aria-hidden="true"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>
	);
}
