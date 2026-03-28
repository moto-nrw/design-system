import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
	title: "Components/Tooltip",
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ padding: "80px", display: "flex", justifyContent: "center" }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
	render: () => (
		<Tooltip content="Einstellungen öffnen" position="top">
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	),
};

export const AllPositions: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
			<Tooltip content="Oben" position="top">
				<Button variant="outline">Top</Button>
			</Tooltip>
			<Tooltip content="Unten" position="bottom">
				<Button variant="outline">Bottom</Button>
			</Tooltip>
			<Tooltip content="Links" position="left">
				<Button variant="outline">Left</Button>
			</Tooltip>
			<Tooltip content="Rechts" position="right">
				<Button variant="outline">Right</Button>
			</Tooltip>
		</div>
	),
};
