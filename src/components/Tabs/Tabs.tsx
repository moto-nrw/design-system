import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

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
		<div className={cn("relative", className)}>
			{showMobileDropdown && (
				<MobileTabDropdown
					items={items}
					activeTab={activeTab}
					activeLabel={activeLabel}
					onTabChange={onTabChange}
				/>
			)}

			<div className={cn("relative", showMobileDropdown && "hidden md:block")}>
				{canScrollLeft && (
					<div className="absolute top-0 bottom-0 left-0 z-10 w-6 bg-gradient-to-r from-[var(--semantic-color-bg-default)] to-transparent pointer-events-none" />
				)}

				<div
					ref={scrollRef}
					className="relative flex gap-[var(--tabs-gap)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				>
					{items.map((tab, index) => (
						<button
							key={tab.id}
							ref={(el) => {
								tabRefs.current[index] = el;
							}}
							type="button"
							onClick={() => onTabChange(tab.id)}
							className={cn(
								"relative pb-3 border-none bg-transparent font-sans text-sm font-medium cursor-pointer transition-colors duration-[var(--duration-fast)] whitespace-nowrap",
								activeTab === tab.id
									? "text-[var(--semantic-color-text-default)] font-semibold"
									: "text-[var(--semantic-color-text-muted)] hover:text-[var(--semantic-color-text-tertiary)]",
							)}
						>
							<span className="whitespace-nowrap">{tab.label}</span>
						</button>
					))}

					<div
						className="absolute bottom-0 h-[var(--tabs-indicator-height)] rounded-full bg-[var(--semantic-color-text-default)] transition-[left,width] duration-[var(--duration-slow)] ease-out"
						style={{
							left: `${indicatorStyle.left}px`,
							width: `${indicatorStyle.width}px`,
						}}
					/>
				</div>

				{canScrollRight && (
					<div className="absolute top-0 right-0 bottom-0 z-10 w-6 bg-gradient-to-l from-[var(--semantic-color-bg-default)] to-transparent pointer-events-none" />
				)}
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
		<div className="relative md:hidden" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center gap-2 px-4 py-2.5 border-none rounded-lg bg-[var(--semantic-color-bg-default)] font-sans text-base font-semibold text-[var(--semantic-color-text-default)] shadow-sm cursor-pointer transition-colors duration-[var(--duration-fast)]",
					isOpen && "bg-[var(--semantic-color-bg-subtle)]",
				)}
			>
				<span>{activeLabel}</span>
				<svg
					className={cn(
						"shrink-0 text-[var(--semantic-color-text-muted)] transition-transform duration-[var(--duration-fast)]",
						isOpen && "rotate-180",
					)}
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
				<div className="absolute top-full left-0 z-[var(--tabs-mobile-z-index)] mt-1 min-w-48 border border-[var(--semantic-color-border-default)] rounded-lg bg-[var(--semantic-color-bg-default)] py-1 shadow-lg">
					{items.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => {
								onTabChange(item.id);
								setIsOpen(false);
							}}
							className={cn(
								"block w-full text-left px-4 py-2.5 border-none bg-transparent font-sans text-base text-[var(--semantic-color-text-secondary)] cursor-pointer transition-colors duration-[var(--duration-fast)] hover:bg-[var(--semantic-color-bg-subtle)]",
								item.id === activeTab &&
									"bg-[var(--semantic-color-bg-subtle)] font-semibold text-[var(--semantic-color-text-default)]",
							)}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
