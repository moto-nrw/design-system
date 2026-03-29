import { type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";

export interface AccordionProps {
	label: string;
	badge?: ReactNode;
	defaultOpen?: boolean;
	children: ReactNode;
	className?: string;
}

export function Accordion({
	label,
	badge,
	defaultOpen = false,
	children,
	className,
}: AccordionProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className={cn("border-t border-[var(--semantic-color-border-default)]", className)}>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex w-full items-center justify-between px-5 py-3 border-none bg-transparent font-sans text-sm font-medium text-[var(--semantic-color-text-secondary)] cursor-pointer transition-colors duration-150 hover:text-[var(--semantic-color-text-default)]"
			>
				<span className="flex items-center gap-2">
					{label}
					{badge && <span className="inline-flex">{badge}</span>}
				</span>
				<svg
					className={cn(
						"shrink-0 text-[var(--semantic-color-text-muted)] transition-transform duration-200",
						isOpen && "rotate-180",
					)}
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			<div
				className={cn(
					"grid transition-[grid-template-rows] duration-200",
					isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
			>
				<div className="overflow-hidden">{children}</div>
			</div>
		</div>
	);
}
