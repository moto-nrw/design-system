import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuItem {
	id: string;
	label: string;
	onClick: () => void;
	variant?: "default" | "danger";
}

export interface DropdownMenuProps {
	items: DropdownMenuItem[];
	trigger?: ReactNode;
	className?: string;
}

export function DropdownMenu({ items, trigger, className }: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, right: 0 });
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setIsOpen(false), []);

	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;
			if (!buttonRef.current?.contains(target) && !menuRef.current?.contains(target)) {
				close();
			}
		}

		function handleScroll() {
			close();
		}

		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") close();
		}

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll, true);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll, true);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, close]);

	const handleToggle = () => {
		if (!isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + 4,
				right: window.innerWidth - rect.right,
			});
		}
		setIsOpen((prev) => !prev);
	};

	const menu = isOpen && typeof document !== "undefined" && (
		<div
			ref={menuRef}
			className={styles.menu}
			style={{ top: position.top, right: position.right }}
			role="menu"
		>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					role="menuitem"
					onClick={() => {
						close();
						item.onClick();
					}}
					className={[styles.menuItem, item.variant === "danger" && styles.menuItemDanger]
						.filter(Boolean)
						.join(" ")}
				>
					{item.label}
				</button>
			))}
		</div>
	);

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				onClick={handleToggle}
				className={[styles.trigger, className].filter(Boolean).join(" ")}
				aria-label="Aktionen"
				aria-expanded={isOpen}
				aria-haspopup="menu"
			>
				{trigger || (
					<svg className={styles.dotsIcon} fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				)}
			</button>
			{menu && createPortal(menu, document.body)}
		</>
	);
}
