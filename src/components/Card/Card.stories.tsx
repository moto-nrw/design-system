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
		hoverable: { control: "boolean" },
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

export const Hoverable: Story = {
	args: {
		variant: "default",
		hoverable: true,
		children: "Hover me — blue glow + lift effect",
	},
};

export const HoverableExample: Story = {
	render: () => (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
			{["Leo Fuchs", "Anna Meier", "Tom Müller"].map((name) => (
				<Card key={name} hoverable>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
						<div>
							<strong style={{ color: "#1e293b" }}>{name.split(" ")[0]}</strong>
							<span style={{ color: "#94a3b8", margin: "0 4px" }}>›</span>
							<div style={{ fontWeight: 700, color: "#1e293b" }}>{name.split(" ")[1]}</div>
							<div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
								Tippen für mehr Infos
							</div>
						</div>
						<span
							style={{
								background: "#ef4444",
								color: "white",
								padding: "6px 12px",
								borderRadius: "9999px",
								fontSize: "12px",
								fontWeight: 700,
							}}
						>
							● Zuhause
						</span>
					</div>
				</Card>
			))}
		</div>
	),
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
