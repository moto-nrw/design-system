import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	title: "Components/Avatar",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: { name: "Peter Hoffmann" },
};

export const SingleName: Story = {
	args: { name: "Charlotte" },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<Avatar name="Peter H." size="sm" />
			<Avatar name="Charlotte R." size="md" />
			<Avatar name="Max Mustermann" size="lg" />
		</div>
	),
};

export const WithNames: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
			{["Peter Hoffmann", "Charlotte Ristau", "Max Mustermann", "Anna"].map((name) => (
				<div key={name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<Avatar name={name} size="sm" />
					<span style={{ fontSize: "14px" }}>{name}</span>
				</div>
			))}
		</div>
	),
};
