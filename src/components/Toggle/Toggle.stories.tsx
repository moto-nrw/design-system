import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
	component: Toggle,
	title: "Components/Toggle",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
	args: { label: "Benachrichtigungen" },
};

export const Checked: Story = {
	args: { label: "Dark Mode", defaultChecked: true },
};

export const Small: Story = {
	args: { label: "Kompakte Ansicht", size: "sm" },
};

export const Disabled: Story = {
	args: { label: "Gesperrt", disabled: true },
};

export const Group: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
			<Toggle label="E-Mail-Benachrichtigungen" defaultChecked />
			<Toggle label="Push-Benachrichtigungen" />
			<Toggle label="SMS-Benachrichtigungen" disabled />
		</div>
	),
};
