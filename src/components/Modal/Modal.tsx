import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

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
		<div className={styles.overlay}>
			<button
				type="button"
				onClick={handleClose}
				className={[styles.backdrop, entering && styles.backdropVisible].filter(Boolean).join(" ")}
				aria-label="Hintergrund - Klicken zum Schließen"
			/>
			<div
				className={[styles.dialog, entering ? styles.dialogEnter : styles.dialogExit].join(" ")}
				role="dialog"
				aria-modal="true"
				aria-label={title || undefined}
			>
				{title ? (
					<div className={styles.header}>
						<h3 className={styles.title}>{title}</h3>
						<CloseButton onClick={handleClose} />
					</div>
				) : (
					<div className={styles.closeAbsolute}>
						<CloseButton onClick={handleClose} />
					</div>
				)}

				<div
					className={[styles.content, entering && styles.contentVisible].filter(Boolean).join(" ")}
				>
					{children}
				</div>

				{footer && <div className={styles.footer}>{footer}</div>}
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
	const confirmClass = variant === "danger" ? styles.confirmDanger : styles.confirmPrimary;

	const footer = (
		<>
			<button type="button" onClick={onClose} className={styles.cancelButton}>
				{cancelText}
			</button>
			<button
				type="button"
				onClick={onConfirm}
				disabled={isConfirmLoading || isConfirmDisabled}
				className={[styles.confirmButton, confirmClass].join(" ")}
			>
				{isConfirmLoading ? (
					<span className={styles.confirmLoading}>
						<svg className={styles.confirmSpinner} fill="none" viewBox="0 0 24 24">
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
			className={styles.closeButton}
			aria-label="Modal schließen"
		>
			<svg
				className={styles.closeIcon}
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
