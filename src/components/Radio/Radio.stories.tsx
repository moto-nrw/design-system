import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
	component: Radio,
	title: "Components/Radio",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
	args: { label: "Option A", name: "demo" },
};

export const Group: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
			<Radio label="Ankündigung" name="type" defaultChecked />
			<Radio label="Release" name="type" />
			<Radio label="Wartung" name="type" />
		</div>
	),
};
