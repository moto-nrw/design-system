import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
	component: Spinner,
	title: "Components/Spinner",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: { label: "Wird geladen..." },
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
		</div>
	),
};
