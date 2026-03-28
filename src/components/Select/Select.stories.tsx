import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
	component: Select,
	title: "Components/Select",
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
	},
};

export default meta;

type Story = StoryObj<typeof Select>;

const sampleOptions = [
	{ value: "school-a", label: "Grundschule Am Park" },
	{ value: "school-b", label: "OGS Sonnenschein" },
	{ value: "school-c", label: "Ganztagsschule Musterstadt" },
];

export const Default: Story = {
	args: {
		label: "Einrichtung",
		placeholder: "Bitte auswählen...",
		options: sampleOptions,
	},
};

export const WithoutLabel: Story = {
	args: {
		placeholder: "Auswählen...",
		options: sampleOptions,
	},
};

export const Disabled: Story = {
	args: {
		label: "Einrichtung",
		placeholder: "Nicht verfügbar",
		options: sampleOptions,
		disabled: true,
	},
};
