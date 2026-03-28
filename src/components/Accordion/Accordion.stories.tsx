import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "../Pill/Pill";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
	component: Accordion,
	title: "Components/Accordion",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
	args: {
		label: "Kommentare (3)",
		children: (
			<div style={{ padding: "0 20px 16px" }}>
				<p style={{ fontSize: "14px", color: "#64748b" }}>Erster Kommentar hier...</p>
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
				<p style={{ fontSize: "14px", color: "#64748b" }}>Kommentare werden hier angezeigt.</p>
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
				<p style={{ fontSize: "14px", color: "#64748b" }}>
					Dieser Bereich ist standardmäßig offen.
				</p>
			</div>
		),
	},
};

export const Multiple: Story = {
	render: () => (
		<div style={{ border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" }}>
			<Accordion label="Kommentare (1)">
				<div style={{ padding: "0 20px 16px" }}>
					<p style={{ fontSize: "14px", color: "#64748b" }}>Ein Kommentar.</p>
				</div>
			</Accordion>
			<Accordion label="Änderungsverlauf">
				<div style={{ padding: "0 20px 16px" }}>
					<p style={{ fontSize: "14px", color: "#64748b" }}>Keine Änderungen.</p>
				</div>
			</Accordion>
		</div>
	),
};
