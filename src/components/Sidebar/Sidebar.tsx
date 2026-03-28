import { type ReactNode, useCallback, useState } from "react";
import styles from "./Sidebar.module.css";

export interface SidebarItem {
	id: string;
	label: string;
	icon?: string;
	badge?: number;
	disabled?: boolean;
	disabledLabel?: string;
	children?: SidebarItem[];
}

export interface SidebarProps {
	items: SidebarItem[];
	activeId?: string;
	onNavigate: (id: string) => void;
	bottomItems?: SidebarItem[];
	header?: ReactNode;
	className?: string;
}

export function Sidebar({
	items,
	activeId,
	onNavigate,
	bottomItems,
	header,
	className,
}: SidebarProps) {
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const toggle = useCallback((id: string) => {
		setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
	}, []);

	const isActive = (id: string) => activeId === id;

	const isParentActive = (item: SidebarItem) =>
		item.children?.some((child) => child.id === activeId) ?? false;

	return (
		<nav className={[styles.sidebar, className].filter(Boolean).join(" ")}>
			{header && <div className={styles.header}>{header}</div>}

			<div className={styles.scrollArea}>
				{items.map((item) =>
					item.children ? (
						<AccordionItem
							key={item.id}
							item={item}
							isExpanded={expanded[item.id] || isParentActive(item)}
							onToggle={() => toggle(item.id)}
							activeId={activeId}
							onNavigate={onNavigate}
						/>
					) : (
						<NavItem
							key={item.id}
							item={item}
							isActive={isActive(item.id)}
							onNavigate={onNavigate}
						/>
					),
				)}
			</div>

			{bottomItems && bottomItems.length > 0 && (
				<div className={styles.bottomSection}>
					{bottomItems.map((item) => (
						<NavItem
							key={item.id}
							item={item}
							isActive={isActive(item.id)}
							onNavigate={onNavigate}
						/>
					))}
				</div>
			)}
		</nav>
	);
}

function NavItem({
	item,
	isActive,
	onNavigate,
}: {
	item: SidebarItem;
	isActive: boolean;
	onNavigate: (id: string) => void;
}) {
	return (
		<button
			type="button"
			onClick={() => !item.disabled && onNavigate(item.id)}
			className={[
				styles.navItem,
				isActive && styles.navItemActive,
				item.disabled && styles.navItemDisabled,
			]
				.filter(Boolean)
				.join(" ")}
			title={item.disabled ? item.disabledLabel : undefined}
		>
			{item.icon && (
				<svg
					className={styles.navIcon}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
				</svg>
			)}
			<span className={styles.navLabel}>
				{item.label}
				{item.disabled && item.disabledLabel && (
					<span className={styles.comingSoon}>{item.disabledLabel}</span>
				)}
			</span>
			{item.badge != null && item.badge > 0 && (
				<span className={styles.badge}>{item.badge > 99 ? "99+" : item.badge}</span>
			)}
		</button>
	);
}

function AccordionItem({
	item,
	isExpanded,
	onToggle,
	activeId,
	onNavigate,
}: {
	item: SidebarItem;
	isExpanded: boolean;
	onToggle: () => void;
	activeId?: string;
	onNavigate: (id: string) => void;
}) {
	return (
		<div className={styles.accordion}>
			<button type="button" onClick={onToggle} className={styles.accordionTrigger}>
				{item.icon && (
					<svg
						className={styles.navIcon}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
					</svg>
				)}
				<span className={styles.accordionLabel}>{item.label}</span>
				<svg
					className={[styles.accordionChevron, isExpanded && styles.accordionChevronOpen]
						.filter(Boolean)
						.join(" ")}
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isExpanded && item.children && (
				<div className={styles.accordionContent}>
					{item.children.map((child) => (
						<button
							key={child.id}
							type="button"
							onClick={() => onNavigate(child.id)}
							className={[styles.subItem, activeId === child.id && styles.subItemActive]
								.filter(Boolean)
								.join(" ")}
						>
							{child.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
