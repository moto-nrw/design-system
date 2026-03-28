import { type ReactNode, useState } from "react";
import styles from "./Accordion.module.css";

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
		<div className={[styles.accordion, className].filter(Boolean).join(" ")}>
			<button type="button" onClick={() => setIsOpen((prev) => !prev)} className={styles.trigger}>
				<span className={styles.label}>
					{label}
					{badge && <span className={styles.badge}>{badge}</span>}
				</span>
				<svg
					className={[styles.chevron, isOpen && styles.chevronOpen].filter(Boolean).join(" ")}
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
				className={[styles.content, isOpen ? styles.contentOpen : styles.contentClosed].join(" ")}
			>
				<div className={styles.contentInner}>{children}</div>
			</div>
		</div>
	);
}
