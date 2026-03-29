import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";

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
			className="fixed z-[var(--dropdown-z-index)] w-[var(--dropdown-width)] p-[var(--dropdown-padding)] border border-[var(--semantic-color-border-default)] rounded-[var(--dropdown-radius)] bg-[var(--semantic-color-bg-default)] shadow-[var(--dropdown-shadow)]"
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
					className={cn(
						"flex w-full items-center px-[var(--dropdown-item-padding-x)] py-[var(--dropdown-item-padding-y)] border-none rounded-[var(--dropdown-item-radius)] bg-transparent font-sans text-[length:var(--dropdown-item-font-size)] text-left cursor-pointer transition-colors duration-150",
						item.variant === "danger"
							? "text-red-600 hover:bg-[var(--semantic-color-feedback-error-light)]"
							: "text-steel-700 hover:bg-[var(--semantic-color-bg-muted)]",
					)}
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
				className={cn(
					"flex items-center justify-center p-1 border-none rounded-md bg-transparent text-[var(--semantic-color-text-muted)] cursor-pointer transition-all duration-150 hover:bg-[var(--semantic-color-bg-muted)] hover:text-[var(--semantic-color-text-secondary)]",
					className,
				)}
				aria-label="Aktionen"
				aria-expanded={isOpen}
				aria-haspopup="menu"
			>
				{trigger || (
					<svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				)}
			</button>
			{menu && createPortal(menu, document.body)}
		</>
	);
}
