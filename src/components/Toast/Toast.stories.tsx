import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
	component: Toast,
	title: "Components/Toast",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
	render: () => {
		const [show, setShow] = useState(false);
		return (
			<>
				<Button variant="success" onClick={() => setShow(true)}>
					Erfolg anzeigen
				</Button>
				{show && (
					<Toast
						type="success"
						message="Änderungen erfolgreich gespeichert."
						onClose={() => setShow(false)}
					/>
				)}
			</>
		);
	},
};

export const Error: Story = {
	render: () => {
		const [show, setShow] = useState(false);
		return (
			<>
				<Button variant="danger" onClick={() => setShow(true)}>
					Fehler anzeigen
				</Button>
				{show && (
					<Toast
						type="error"
						message="Speichern fehlgeschlagen. Bitte erneut versuchen."
						onClose={() => setShow(false)}
					/>
				)}
			</>
		);
	},
};

export const AllTypes: Story = {
	render: () => {
		const [toasts, setToasts] = useState<string[]>([]);
		const types = ["success", "error", "warning", "info"] as const;
		const messages = {
			success: "Erfolgreich gespeichert.",
			error: "Ein Fehler ist aufgetreten.",
			warning: "Sitzung läuft bald ab.",
			info: "Neue Version verfügbar.",
		};
		return (
			<div style={{ display: "flex", gap: "8px" }}>
				{types.map((type) => (
					<Button key={type} variant="outline" onClick={() => setToasts((prev) => [...prev, type])}>
						{type}
					</Button>
				))}
				{toasts.map((type, i) => (
					<Toast
						key={`${type}-${i}`}
						type={type as "success"}
						message={messages[type as keyof typeof messages]}
						onClose={() => setToasts((prev) => prev.filter((_, j) => j !== i))}
					/>
				))}
			</div>
		);
	},
};
