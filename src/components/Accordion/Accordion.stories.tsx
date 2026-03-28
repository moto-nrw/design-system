import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../Card/Card";
import { Pill } from "../Pill/Pill";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
	component: Accordion,
	title: "Components/Accordion",
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 600 }}>
				<Card variant="default" padding="none">
					<Story />
				</Card>
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
	args: {
		label: "Kommentare (3)",
		children: (
			<div style={{ padding: "0 20px 16px" }}>
				<p style={{ fontSize: "14px", color: "var(--semantic-color-text-muted)" }}>
					Erster Kommentar hier...
				</p>
			</div>
		),
	},
};

export const WithBadge: Story = {
	args: {
		label: "Kommentare (4)",
		badge: <Pill label="4 neu" color="red" size="sm" dot={false} />,
		children: (
			<div style={{ padding: "0 20px 16px" }}>
				<p style={{ fontSize: "14px", color: "var(--semantic-color-text-muted)" }}>
					Kommentare werden hier angezeigt.
				</p>
			</div>
		),
	},
};

export const DefaultOpen: Story = {
	args: {
		label: "Details",
		defaultOpen: true,
		children: (
			<div style={{ padding: "0 20px 16px" }}>
				<p style={{ fontSize: "14px", color: "var(--semantic-color-text-muted)" }}>
					Dieser Bereich ist standardmäßig offen.
				</p>
			</div>
		),
	},
};

export const Multiple: Story = {
	render: () => (
		<Card variant="default" padding="none">
			<Accordion label="Kommentare (1)">
				<div style={{ padding: "0 20px 16px" }}>
					<p style={{ fontSize: "14px", color: "var(--semantic-color-text-muted)" }}>
						Ein Kommentar.
					</p>
				</div>
			</Accordion>
			<Accordion label="Änderungsverlauf">
				<div style={{ padding: "0 20px 16px" }}>
					<p style={{ fontSize: "14px", color: "var(--semantic-color-text-muted)" }}>
						Keine Änderungen.
					</p>
				</div>
			</Accordion>
		</Card>
	),
};
