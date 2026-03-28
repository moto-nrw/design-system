import type { Meta, StoryObj } from "@storybook/react";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
	component: StatusDot,
	title: "Components/StatusDot",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatusDot>;

export const Green: Story = {
	args: { color: "green", tooltip: "Online" },
};

export const Yellow: Story = {
	args: { color: "yellow", tooltip: "Warnung" },
};

export const Red: Story = {
	args: { color: "red", tooltip: "Fehler" },
};

export const AllColors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<StatusDot color="green" tooltip="Aktiv" />
			<StatusDot color="yellow" tooltip="Warnung" />
			<StatusDot color="red" tooltip="Fehler" />
			<StatusDot color="gray" tooltip="Inaktiv" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<StatusDot color="green" size="sm" />
			<StatusDot color="green" size="md" />
		</div>
	),
};
