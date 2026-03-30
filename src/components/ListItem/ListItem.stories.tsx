import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";

const meta: Meta<typeof ListItem> = {
	component: ListItem,
	title: "Components/ListItem",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
	args: { children: "Grundschule Musterstadt" },
};

export const Active: Story = {
	args: { active: true, children: "Grundschule Musterstadt" },
};

export const Inactive: Story = {
	args: { active: false, children: "Grundschule Beispielstadt" },
};

export const WithCustomContent: Story = {
	render: () => (
		<div style={{ maxWidth: 320, display: "flex", flexDirection: "column", gap: 4 }}>
			<ListItem active>
				<div
					style={{
						width: 32,
						height: 32,
						borderRadius: "50%",
						background: "#7ba05b",
						flexShrink: 0,
					}}
				/>
				<div>
					<div style={{ fontWeight: 600, fontSize: 14 }}>OGS Sonnenschein</div>
					<div style={{ fontSize: 12, color: "#6b7280" }}>Musterstadt</div>
				</div>
			</ListItem>
			<ListItem>
				<div
					style={{
						width: 32,
						height: 32,
						borderRadius: "50%",
						background: "#94a3b8",
						flexShrink: 0,
					}}
				/>
				<div>
					<div style={{ fontWeight: 600, fontSize: 14 }}>OGS Regenbogen</div>
					<div style={{ fontSize: 12, color: "#6b7280" }}>Beispielstadt</div>
				</div>
			</ListItem>
			<ListItem>
				<div
					style={{
						width: 32,
						height: 32,
						borderRadius: "50%",
						background: "#94a3b8",
						flexShrink: 0,
					}}
				/>
				<div>
					<div style={{ fontWeight: 600, fontSize: 14 }}>OGS Waldblick</div>
					<div style={{ fontSize: 12, color: "#6b7280" }}>Testdorf</div>
				</div>
			</ListItem>
		</div>
	),
};
