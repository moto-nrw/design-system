import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
	component: Textarea,
	title: "Components/Textarea",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		label: "Inhalt",
		placeholder: "Beschreibe dein Feedback...",
		rows: 5,
	},
};

export const WithValue: Story = {
	args: {
		label: "Beschreibung",
		value: "Neuer Release in dem nichts mehr funktioniert kommt morgen",
		rows: 4,
	},
};

export const WithError: Story = {
	args: {
		label: "Nachricht",
		value: "",
		error: "Dieses Feld ist erforderlich",
		rows: 3,
	},
};

export const Disabled: Story = {
	args: {
		label: "Kommentar",
		value: "Dieser Text kann nicht bearbeitet werden.",
		disabled: true,
		rows: 3,
	},
};
