import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterChips } from "./FilterChips";

const meta: Meta<typeof FilterChips> = {
	component: FilterChips,
	title: "Components/FilterChips",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FilterChips>;

export const Default: Story = {
	render: () => {
		const [filters, setFilters] = useState([
			{ id: "room-a", label: "Raum A" },
			{ id: "room-b", label: "Raum B" },
			{ id: "status-active", label: "Aktiv" },
		]);

		return (
			<FilterChips
				filters={filters.map((f) => ({
					...f,
					onRemove: () => setFilters((prev) => prev.filter((p) => p.id !== f.id)),
				}))}
				onClearAll={() => setFilters([])}
			/>
		);
	},
};

export const SingleFilter: Story = {
	args: {
		filters: [{ id: "1", label: "Sonnenkinder", onRemove: () => {} }],
	},
};
