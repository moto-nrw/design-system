import type { Meta, StoryObj } from "@storybook/react";
import { Badge, BadgeCompact } from "./Badge";

const meta: Meta<typeof Badge> = {
	component: Badge,
	title: "Components/Badge",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: { count: 42, label: "Kinder" },
};

export const WithoutLabel: Story = {
	args: { count: 7 },
};

export const Small: Story = {
	args: { count: 3, label: "Neu", size: "sm" },
};

export const Compact: Story = {
	render: () => <BadgeCompact count={12} />,
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
			<Badge count={42} label="Kinder" />
			<Badge count={7} label="Räume" size="sm" />
			<BadgeCompact count={3} />
		</div>
	),
};
