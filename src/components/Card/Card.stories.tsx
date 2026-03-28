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
			<div style={{ padding: "24px", background: "var(--semantic-color-bg-muted)" }}>
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
		children: "Elevated card with shadow and blur",
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
		hoverable: true,
		children: "Hover me — blue glow + lift effect",
	},
};

export const HoverableCards: Story = {
	render: () => (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
			{["Leo Fuchs", "Anna Meier", "Tom Müller"].map((name) => (
				<Card key={name} hoverable>
					<div>
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<strong style={{ color: "var(--color-steel-800)", fontSize: "18px" }}>
								{name.split(" ")[0]}
							</strong>
							<span style={{ color: "var(--color-steel-400)" }}>›</span>
						</div>
						<div
							style={{
								fontWeight: 600,
								color: "var(--color-steel-700)",
								fontSize: "16px",
							}}
						>
							{name.split(" ")[1]}
						</div>
						<div
							style={{
								fontSize: "12px",
								color: "var(--color-steel-400)",
								marginTop: "12px",
							}}
						>
							Tippen für mehr Infos
						</div>
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
