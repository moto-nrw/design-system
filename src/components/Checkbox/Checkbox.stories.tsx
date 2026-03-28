import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	title: "Components/Checkbox",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: { label: "Administratoren" },
};

export const Checked: Story = {
	args: { label: "Lehrer/Personal", defaultChecked: true },
};

export const Disabled: Story = {
	args: { label: "Nicht verfügbar", disabled: true },
};

export const Group: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
			<Checkbox label="Administratoren" />
			<Checkbox label="Lehrer/Personal" />
			<Checkbox label="Eltern" />
		</div>
	),
};
