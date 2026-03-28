import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
	id: string;
	label: string;
	count?: number;
}

export interface TabsProps {
	items: TabItem[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
	className?: string;
}

export function Tabs({ items, activeTab, onTabChange, className }: TabsProps) {
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const showMobileDropdown = items.length >= 2;

	const activeIndex = useMemo(
		() => items.findIndex((item) => item.id === activeTab),
		[items, activeTab],
	);

	const activeLabel = items[activeIndex]?.label ?? "";

	const updateScrollState = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 0);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, []);

	const updateIndicator = useCallback(() => {
		const activeTabElement = tabRefs.current[activeIndex];
		if (activeTabElement && activeTabElement.offsetWidth > 0) {
			setIndicatorStyle({
				left: activeTabElement.offsetLeft,
				width: activeTabElement.offsetWidth,
			});
		}
	}, [activeIndex]);

	useEffect(() => {
		updateIndicator();
		const activeTabElement = tabRefs.current[activeIndex];
		if (activeTabElement && scrollRef.current) {
			const container = scrollRef.current;
			const tabLeft = activeTabElement.offsetLeft;
			const tabRight = tabLeft + activeTabElement.offsetWidth;
			const containerLeft = container.scrollLeft;
			const containerRight = containerLeft + container.clientWidth;

			if (tabLeft < containerLeft) {
				container.scrollTo({ left: tabLeft - 16, behavior: "smooth" });
			} else if (tabRight > containerRight) {
				container.scrollTo({
					left: tabRight - container.clientWidth + 16,
					behavior: "smooth",
				});
			}
		}
	}, [activeIndex, updateIndicator]);

	useEffect(() => {
		updateScrollState();
		updateIndicator();
		const el = scrollRef.current;
		if (!el) return;
		el.addEventListener("scroll", updateScrollState, { passive: true });
		const observer = new ResizeObserver(() => {
			updateScrollState();
			updateIndicator();
		});
		observer.observe(el);
		return () => {
			el.removeEventListener("scroll", updateScrollState);
			observer.disconnect();
		};
	}, [updateScrollState, updateIndicator]);

	return (
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			{showMobileDropdown && (
				<MobileTabDropdown
					items={items}
					activeTab={activeTab}
					activeLabel={activeLabel}
					onTabChange={onTabChange}
				/>
			)}

			<div
				className={[styles.tabsContainer, showMobileDropdown && styles.hiddenMobile]
					.filter(Boolean)
					.join(" ")}
			>
				{canScrollLeft && <div className={styles.fadeLeft} />}

				<div ref={scrollRef} className={styles.scrollable}>
					{items.map((tab, index) => (
						<button
							key={tab.id}
							ref={(el) => {
								tabRefs.current[index] = el;
							}}
							type="button"
							onClick={() => onTabChange(tab.id)}
							className={[
								styles.tab,
								activeTab === tab.id ? styles.tabActive : styles.tabInactive,
							].join(" ")}
						>
							<span className={styles.tabLabel}>{tab.label}</span>
						</button>
					))}

					<div
						className={styles.indicator}
						style={{
							left: `${indicatorStyle.left}px`,
							width: `${indicatorStyle.width}px`,
						}}
					/>
				</div>

				{canScrollRight && <div className={styles.fadeRight} />}
			</div>
		</div>
	);
}

function MobileTabDropdown({
	items,
	activeTab,
	activeLabel,
	onTabChange,
}: {
	items: TabItem[];
	activeTab: string;
	activeLabel: string;
	onTabChange: (id: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.mobileDropdown} ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={[styles.mobileToggle, isOpen && styles.mobileToggleOpen]
					.filter(Boolean)
					.join(" ")}
			>
				<span>{activeLabel}</span>
				<svg
					className={[styles.mobileChevron, isOpen && styles.mobileChevronOpen]
						.filter(Boolean)
						.join(" ")}
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className={styles.mobileMenu}>
					{items.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => {
								onTabChange(item.id);
								setIsOpen(false);
							}}
							className={[
								styles.mobileMenuItem,
								item.id === activeTab && styles.mobileMenuItemActive,
							]
								.filter(Boolean)
								.join(" ")}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
