import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	src?: string | null;
	size?: "sm" | "md" | "lg";
}

const sizeStyles = {
	sm: "size-8 text-sm shadow-sm outline-2 outline-white -outline-offset-2",
	md: "size-11 text-base shadow-md",
	lg: "size-16 text-xl shadow-md",
} as const;

function getInitials(name: string): string {
	const parts = name.split(" ").filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return (parts[0]?.[0] ?? "?").toUpperCase();
	return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}

export function Avatar({ name, src, size = "sm", className, ...props }: AvatarProps) {
	const initials = getInitials(name);

	return (
		<div
			className={cn(
				"relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-steel-800 to-steel-500 text-[var(--semantic-color-text-inverse)] font-sans font-semibold",
				sizeStyles[size],
				className,
			)}
			title={name}
			{...props}
		>
			{src ? (
				<img src={src} alt={name} className="size-full object-cover" />
			) : (
				<span className="select-none">{initials}</span>
			)}
		</div>
	);
}
