import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SearchBarProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
	value: string;
	onChange: (value: string) => void;
	onClear?: () => void;
	size?: "sm" | "md" | "lg";
}

const sizeStyles = {
	sm: "py-2 pl-9 pr-3 text-sm",
	md: "py-2.5 pl-9 pr-10 text-sm",
	lg: "py-3 px-10 text-base",
} as const;

const iconSizes = {
	sm: "size-4",
	md: "size-4",
	lg: "size-5",
} as const;

export function SearchBar({
	value,
	onChange,
	onClear,
	placeholder = "Name suchen...",
	size = "md",
	className,
	...props
}: SearchBarProps) {
	return (
		<div className={cn("relative", className)}>
			<svg
				className={cn(
					"absolute top-1/2 left-3 -translate-y-1/2 text-[var(--semantic-color-text-muted)]",
					iconSizes[size],
				)}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>

			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(
					"w-full border border-[var(--semantic-color-border-default)] rounded-xl bg-[var(--semantic-color-bg-default)] text-[var(--semantic-color-text-default)] font-sans transition-[border-color] duration-150",
					"placeholder:text-[var(--semantic-color-text-muted)]",
					"focus:outline-none focus:border-[var(--semantic-color-border-strong)]",
					sizeStyles[size],
				)}
				{...props}
			/>

			{value && (
				<button
					type="button"
					onClick={() => {
						onChange("");
						onClear?.();
					}}
					className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center p-1 border-none rounded-full bg-transparent cursor-pointer transition-colors duration-150 hover:bg-[var(--semantic-color-bg-muted)]"
				>
					<svg
						className={cn("text-[var(--semantic-color-text-muted)]", iconSizes[size])}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
