import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
	component: Card,
	title: "Components/Card",
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "elevated", "glass"],
		},
		padding: {
			control: "select",
			options: ["none", "sm", "md", "lg"],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "24px", background: "#f1f5f9" }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		variant: "default",
		children: "Default card with a border",
	},
};

export const Elevated: Story = {
	args: {
		variant: "elevated",
		children: "Elevated card with a shadow",
	},
};

export const Glass: Story = {
	args: {
		variant: "glass",
		children: "Glass card with backdrop blur",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
			<Card variant="default" style={{ width: 240 }}>
				<strong>Default</strong>
				<p>Border variant</p>
			</Card>
			<Card variant="elevated" style={{ width: 240 }}>
				<strong>Elevated</strong>
				<p>Shadow variant</p>
			</Card>
			<Card variant="glass" style={{ width: 240 }}>
				<strong>Glass</strong>
				<p>Blur + translucent</p>
			</Card>
		</div>
	),
};
