import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ListItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	active?: boolean;
	onClick?: () => void;
	children: ReactNode;
}

export function ListItem({
	active = false,
	onClick,
	children,
	className,
	...props
}: ListItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
				active
					? "border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-brand-primary-light)]"
					: "border border-transparent hover:bg-[var(--semantic-color-bg-subtle)]",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
