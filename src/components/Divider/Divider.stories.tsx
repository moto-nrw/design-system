import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
	component: Divider,
	title: "Components/Divider",
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 500 }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: { label: "oder" },
};

export const Spacings: Story = {
	render: () => (
		<div>
			<p>Oben</p>
			<Divider spacing="sm" />
			<p>Small spacing</p>
			<Divider spacing="md" />
			<p>Medium spacing</p>
			<Divider spacing="lg" />
			<p>Large spacing</p>
		</div>
	),
};
