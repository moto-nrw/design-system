import type { HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	src?: string | null;
	size?: "sm" | "md" | "lg";
}

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
			className={[styles.avatar, styles[size], className].filter(Boolean).join(" ")}
			title={name}
			{...props}
		>
			{src ? (
				<img src={src} alt={name} className={styles.image} />
			) : (
				<span className={styles.initials}>{initials}</span>
			)}
		</div>
	);
}
