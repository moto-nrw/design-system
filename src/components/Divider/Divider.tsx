import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
	spacing?: "sm" | "md" | "lg";
	label?: string;
}

const spacingStyles = {
	sm: "my-2",
	md: "my-4",
	lg: "my-8",
} as const;

export function Divider({ spacing = "md", label, className, ...props }: DividerProps) {
	if (label) {
		return (
			<div className={cn("flex items-center gap-4", spacingStyles[spacing], className)}>
				<hr
					className="flex-1 border-0 border-t border-[var(--semantic-color-border-default)]"
					{...props}
				/>
				<span className="font-sans text-xs font-medium text-[var(--semantic-color-text-muted)] whitespace-nowrap">
					{label}
				</span>
				<hr
					className="flex-1 border-0 border-t border-[var(--semantic-color-border-default)]"
					{...props}
				/>
			</div>
		);
	}

	return (
		<hr
			className={cn(
				"border-0 border-t border-[var(--semantic-color-border-default)]",
				spacingStyles[spacing],
				className,
			)}
			{...props}
		/>
	);
}
