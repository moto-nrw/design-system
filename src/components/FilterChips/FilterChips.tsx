import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
		<div className={cn("flex items-center justify-between", className)} {...props}>
			<div className="flex flex-wrap gap-2">
				{filters.map((filter) => (
					<span
						key={filter.id}
						className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--semantic-color-brand-primary-light)] font-sans text-xs font-medium text-sage-900"
					>
						{filter.label}
						<button
							type="button"
							onClick={filter.onRemove}
							className="flex p-0 border-none bg-transparent text-inherit cursor-pointer transition-colors duration-150 hover:text-sage-700"
						>
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
				<button
					type="button"
					onClick={onClearAll}
					className="p-0 border-none bg-transparent font-sans text-xs font-medium text-[var(--semantic-color-brand-primary)] cursor-pointer whitespace-nowrap transition-colors duration-150 hover:text-[var(--semantic-color-brand-primary-hover)]"
				>
					Alle löschen
				</button>
			)}
		</div>
	);
}
