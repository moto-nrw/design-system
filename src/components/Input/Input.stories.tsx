import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
	component: Input,
	title: "Components/Input",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: { label: "E-Mail-Adresse", placeholder: "name@example.com", type: "email" },
};

export const Password: Story = {
	args: { label: "Passwort", type: "password", placeholder: "••••••••" },
};

export const WithError: Story = {
	args: { label: "E-Mail", value: "invalid", error: "Ungültige E-Mail-Adresse" },
};

export const Disabled: Story = {
	args: { label: "Name", value: "Max Mustermann", disabled: true },
};
