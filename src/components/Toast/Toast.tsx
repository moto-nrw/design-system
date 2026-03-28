import { type ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
	type?: ToastType;
	message: string;
	duration?: number;
	onClose: () => void;
}

const icons: Record<ToastType, ReactNode> = {
	success: (
		<svg
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	),
	error: (
		<svg
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	),
	warning: (
		<svg
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 9v2m0 4h.01M10.29 3.86l-8.58 14.57A1 1 0 002.57 20h18.86a1 1 0 00.86-1.57L13.71 3.86a1 1 0 00-1.72 0z"
			/>
		</svg>
	),
	info: (
		<svg
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
};

export function Toast({ type = "info", message, duration = 4000, onClose }: ToastProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isExiting, setIsExiting] = useState(false);

	const dismiss = useCallback(() => {
		setIsExiting(true);
		setTimeout(onClose, 200);
	}, [onClose]);

	useEffect(() => {
		const enterTimer = setTimeout(() => setIsVisible(true), 10);
		const exitTimer = duration > 0 ? setTimeout(dismiss, duration) : undefined;
		return () => {
			clearTimeout(enterTimer);
			if (exitTimer) clearTimeout(exitTimer);
		};
	}, [duration, dismiss]);

	const content = (
		<div className={styles.container}>
			<div
				className={[
					styles.toast,
					styles[type],
					isVisible && !isExiting ? styles.enter : styles.exit,
				]
					.filter(Boolean)
					.join(" ")}
			>
				<span className={styles.icon}>{icons[type]}</span>
				<span className={styles.message}>{message}</span>
				<button type="button" onClick={dismiss} className={styles.close} aria-label="Schließen">
					<svg
						width="14"
						height="14"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	);

	if (typeof document !== "undefined") {
		return createPortal(content, document.body);
	}
	return content;
}
