import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
	component: Alert,
	title: "Components/Alert",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Error: Story = {
	args: { type: "error", message: "Ungültige E-Mail oder Passwort" },
};

export const Success: Story = {
	args: { type: "success", message: "Änderungen erfolgreich gespeichert" },
};

export const Warning: Story = {
	args: { type: "warning", message: "Ihre Sitzung läuft in 5 Minuten ab" },
};

export const Info: Story = {
	args: { type: "info", message: "Es gibt 3 neue Benachrichtigungen" },
};

export const AllTypes: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
			<Alert type="error" message="Fehler: Ungültige Eingabe" />
			<Alert type="success" message="Erfolgreich gespeichert" />
			<Alert type="warning" message="Achtung: Sitzung läuft ab" />
			<Alert type="info" message="Hinweis: Neue Version verfügbar" />
		</div>
	),
};
