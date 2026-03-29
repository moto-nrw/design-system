import { type ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
	type?: ToastType;
	message: string;
	duration?: number;
	onClose: () => void;
}

const typeStyles: Record<ToastType, string> = {
	success: "border-l-[3px] border-l-[var(--semantic-color-brand-primary)]",
	error: "border-l-[3px] border-l-red-500",
	warning: "border-l-[3px] border-l-warm-400",
	info: "border-l-[3px] border-l-steel-400",
};

const iconColors: Record<ToastType, string> = {
	success: "text-[var(--semantic-color-brand-primary)]",
	error: "text-red-500",
	warning: "text-warm-400",
	info: "text-steel-400",
};

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
		<>
			<style>{`
				@keyframes toastSlideIn {
					from { opacity: 0; transform: translateX(100%); }
					to { opacity: 1; transform: translateX(0); }
				}
				@keyframes toastSlideOut {
					from { opacity: 1; transform: translateX(0); }
					to { opacity: 0; transform: translateX(100%); }
				}
			`}</style>
			<div className="fixed top-6 right-6 z-[99999] pointer-events-none">
				<div
					className={cn(
						"flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[var(--semantic-color-bg-default)] border border-[var(--semantic-color-border-default)] shadow-[0_10px_25px_-5px_rgb(0_0_0/0.15)] font-sans text-sm text-[var(--semantic-color-text-default)] pointer-events-auto max-w-[400px]",
						typeStyles[type],
						isVisible && !isExiting
							? "animate-[toastSlideIn_200ms_ease-out_both]"
							: "animate-[toastSlideOut_200ms_ease-in_both]",
					)}
				>
					<span className={cn("flex shrink-0", iconColors[type])}>{icons[type]}</span>
					<span className="flex-1 leading-[1.4]">{message}</span>
					<button
						type="button"
						onClick={dismiss}
						className="flex shrink-0 p-0.5 border-none rounded-sm bg-transparent text-[var(--semantic-color-text-muted)] cursor-pointer transition-colors duration-150 hover:text-[var(--semantic-color-text-default)]"
						aria-label="Schließen"
					>
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
		</>
	);

	if (typeof document !== "undefined") {
		return createPortal(content, document.body);
	}
	return content;
}
