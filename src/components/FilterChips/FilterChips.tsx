import type { HTMLAttributes } from "react";
import styles from "./FilterChips.module.css";

export interface ActiveFilter {
	id: string;
	label: string;
	onRemove: () => void;
}

export interface FilterChipsProps extends HTMLAttributes<HTMLDivElement> {
	filters: ActiveFilter[];
	onClearAll?: () => void;
}

export function FilterChips({ filters, onClearAll, className, ...props }: FilterChipsProps) {
	if (filters.length === 0) return null;

	return (
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")} {...props}>
			<div className={styles.chips}>
				{filters.map((filter) => (
					<span key={filter.id} className={styles.chip}>
						{filter.label}
						<button type="button" onClick={filter.onRemove} className={styles.removeButton}>
							<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</span>
				))}
			</div>

			{onClearAll && filters.length > 1 && (
				<button type="button" onClick={onClearAll} className={styles.clearAll}>
					Alle löschen
				</button>
			)}
		</div>
	);
}
