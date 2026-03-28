import type { InputHTMLAttributes } from "react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
	value: string;
	onChange: (value: string) => void;
	onClear?: () => void;
	size?: "sm" | "md" | "lg";
}

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
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<svg
				className={[styles.searchIcon, styles[`icon-${size}`]].join(" ")}
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
				className={[styles.input, styles[size]].join(" ")}
				{...props}
			/>

			{value && (
				<button
					type="button"
					onClick={() => {
						onChange("");
						onClear?.();
					}}
					className={styles.clearButton}
				>
					<svg
						className={[styles.clearIcon, styles[`icon-${size}`]].join(" ")}
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
