import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	src?: string | null;
	size?: "sm" | "md" | "lg";
}

const sizeStyles = {
	sm: "size-[var(--avatar-size-sm)] text-sm shadow-sm outline-2 outline-[var(--semantic-color-bg-default)] -outline-offset-2",
	md: "size-[var(--avatar-size-md)] text-base shadow-md",
	lg: "size-[var(--avatar-size-lg)] text-xl shadow-md",
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
				"relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--avatar-radius)] bg-gradient-to-br from-[var(--semantic-color-text-strong)] to-[var(--semantic-color-text-muted)] text-[var(--semantic-color-text-inverse)] font-sans font-[number:var(--avatar-font-weight)]",
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
