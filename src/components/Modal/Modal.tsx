import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	const handleClose = useCallback(() => {
		setIsExiting(true);
		setIsAnimating(false);
		setTimeout(() => {
			onCloseRef.current();
		}, 250);
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setIsAnimating(false);
			setIsExiting(false);
			return;
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};

		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";

		const timer = setTimeout(() => setIsAnimating(true), 10);

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
			clearTimeout(timer);
		};
	}, [isOpen, handleClose]);

	if (!isOpen) return null;

	const entering = isAnimating && !isExiting;

	const modalContent = (
		<div className="fixed inset-0 z-[var(--modal-z-index)] flex items-center justify-center">
			<button
				type="button"
				onClick={handleClose}
				className={cn(
					"absolute inset-0 border-none p-0 cursor-default transition-colors duration-150",
					entering ? "bg-black/40" : "bg-transparent",
				)}
				aria-label="Hintergrund - Klicken zum Schließen"
			/>
			<div
				className={cn(
					"relative w-[calc(100%-2rem)] max-w-[var(--modal-max-width)] max-h-[calc(100vh-4rem)] mx-4 overflow-hidden rounded-[var(--modal-radius)] border border-[var(--semantic-color-border-default)] bg-[linear-gradient(135deg,rgb(255_255_255/0.95)_0%,rgb(248_250_252/0.98)_100%)] backdrop-blur-[20px] shadow-[var(--modal-shadow)]",
					entering
						? "animate-[modalEnter_250ms_ease-out_both]"
						: "animate-[modalExit_200ms_ease-in_both]",
				)}
				role="dialog"
				aria-modal="true"
				aria-label={title || undefined}
			>
				{title ? (
					<div className="flex items-center justify-between px-[var(--modal-padding-x)] py-[var(--modal-padding-y)] border-b border-steel-100">
						<h3 className="font-sans text-lg font-semibold text-[var(--semantic-color-text-default)] m-0 pr-4">
							{title}
						</h3>
						<CloseButton onClick={handleClose} />
					</div>
				) : (
					<div className="absolute top-4 right-4 z-10">
						<CloseButton onClick={handleClose} />
					</div>
				)}

				<div
					className={cn(
						"px-[var(--modal-padding-x)] py-[var(--modal-padding-y)] overflow-y-auto max-h-[calc(100vh-8rem)] text-[var(--semantic-color-text-default)] font-sans leading-relaxed opacity-0",
						entering && "animate-[contentReveal_300ms_ease-out_50ms_both]",
					)}
				>
					{children}
				</div>

				{footer && (
					<div className="flex justify-end gap-3 px-[var(--modal-padding-x)] py-[var(--modal-padding-y)] border-t border-steel-100 bg-[rgb(249_250_251/0.5)]">
						{footer}
					</div>
				)}
			</div>
		</div>
	);

	if (typeof document !== "undefined") {
		return createPortal(modalContent, document.body);
	}

	return modalContent;
}

export interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	children: ReactNode;
	confirmText?: string;
	cancelText?: string;
	isConfirmLoading?: boolean;
	isConfirmDisabled?: boolean;
	variant?: "danger" | "primary";
}

export function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title,
	children,
	confirmText = "Bestätigen",
	cancelText = "Abbrechen",
	isConfirmLoading = false,
	isConfirmDisabled = false,
	variant = "primary",
}: ConfirmationModalProps) {
	const footer = (
		<>
			<button
				type="button"
				onClick={onClose}
				className="flex-1 px-4 py-2 border border-[var(--semantic-color-border-strong)] rounded-md bg-transparent font-sans text-sm font-medium text-steel-700 whitespace-nowrap cursor-pointer transition-all duration-150 hover:bg-[var(--semantic-color-bg-subtle)] hover:border-steel-400 hover:scale-105 hover:shadow-md active:scale-100"
			>
				{cancelText}
			</button>
			<button
				type="button"
				onClick={onConfirm}
				disabled={isConfirmLoading || isConfirmDisabled}
				className={cn(
					"flex-1 px-4 py-2 border-none rounded-md font-sans text-sm font-medium text-[var(--semantic-color-text-inverse)] whitespace-nowrap cursor-pointer transition-all duration-150 hover:enabled:scale-105 hover:enabled:shadow-lg active:enabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed",
					variant === "danger" ? "bg-red-600" : "bg-steel-900",
				)}
			>
				{isConfirmLoading ? (
					<span className="flex items-center justify-center gap-2">
						<svg
							className="size-4 animate-[spin_0.7s_linear_infinite]"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle opacity={0.25} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
							<path
								opacity={0.75}
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Wird geladen...
					</span>
				) : (
					confirmText
				)}
			</button>
		</>
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
			{children}
		</Modal>
	);
}

function CloseButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group flex items-center justify-center shrink-0 size-9 p-0 border-none rounded-lg bg-transparent text-[var(--semantic-color-text-muted)] cursor-pointer transition-all duration-150 hover:bg-[var(--semantic-color-bg-muted)] hover:text-[var(--semantic-color-text-default)] hover:scale-105 active:scale-95"
			aria-label="Modal schließen"
		>
			<svg
				className="transition-transform duration-150 group-hover:rotate-90"
				width="20"
				height="20"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	);
}
