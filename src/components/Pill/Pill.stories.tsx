import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta: Meta<typeof Pill> = {
	component: Pill,
	title: "Components/Pill",
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: ["red", "green", "blue", "orange", "purple", "gray"],
		},
		variant: { control: "select", options: ["solid", "subtle"] },
		size: { control: "select", options: ["sm", "md", "lg"] },
		dot: { control: "boolean" },
	},
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {
	args: { label: "Zuhause", color: "red" },
};

export const AllColorsSolid: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
			<Pill label="Zuhause" color="red" />
			<Pill label="Anwesend" color="green" />
			<Pill label="Raum 3" color="blue" />
			<Pill label="Schulhof" color="orange" />
			<Pill label="Krank" color="purple" />
			<Pill label="Unbekannt" color="gray" />
		</div>
	),
};

export const AllColorsSubtle: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
			<Pill label="Zuhause" color="red" variant="subtle" />
			<Pill label="Anwesend" color="green" variant="subtle" />
			<Pill label="Raum 3" color="blue" variant="subtle" />
			<Pill label="Schulhof" color="orange" variant="subtle" />
			<Pill label="Krank" color="purple" variant="subtle" />
			<Pill label="Unbekannt" color="gray" variant="subtle" />
		</div>
	),
};

export const NoDot: Story = {
	args: { label: "Aktiv", color: "green", dot: false },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
			<Pill label="Small" color="blue" size="sm" />
			<Pill label="Medium" color="blue" size="md" />
			<Pill label="Large" color="blue" size="lg" />
		</div>
	),
};
