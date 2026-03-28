import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	component: Modal,
	title: "Components/Modal",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Modal öffnen</Button>
				<Modal isOpen={open} onClose={() => setOpen(false)} title="Bestätigung">
					<p>Möchten Sie diese Aktion wirklich durchführen?</p>
				</Modal>
			</>
		);
	},
};

export const WithFooter: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Modal mit Footer</Button>
				<Modal
					isOpen={open}
					onClose={() => setOpen(false)}
					title="Eintrag löschen"
					footer={
						<>
							<Button variant="secondary" onClick={() => setOpen(false)}>
								Abbrechen
							</Button>
							<Button variant="danger" onClick={() => setOpen(false)}>
								Löschen
							</Button>
						</>
					}
				>
					<p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
				</Modal>
			</>
		);
	},
};

export const FormModal: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Ankündigung bearbeiten</Button>
				<Modal
					isOpen={open}
					onClose={() => setOpen(false)}
					title="Ankündigung bearbeiten"
					footer={
						<>
							<Button variant="outline" onClick={() => setOpen(false)}>
								Abbrechen
							</Button>
							<Button variant="primary" onClick={() => setOpen(false)}>
								Speichern
							</Button>
						</>
					}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
						<Input label="Titel" placeholder="Titel eingeben..." />
						<Textarea label="Inhalt" placeholder="Beschreibung..." rows={5} />
						<Select
							label="Dringlichkeit"
							placeholder="Auswählen..."
							options={[
								{ value: "info", label: "Information" },
								{ value: "warning", label: "Warnung" },
								{ value: "critical", label: "Kritisch" },
							]}
						/>
						<Input label="Version" placeholder="z.B. 1.10a" />
						<div>
							<p
								style={{
									fontSize: "var(--font-size-sm)",
									fontWeight: 500,
									color: "var(--semantic-color-text-default)",
									marginBottom: "8px",
								}}
							>
								Zielgruppen
							</p>
							<div style={{ display: "flex", gap: "8px" }}>
								<Checkbox label="Administratoren" />
								<Checkbox label="Lehrer/Personal" />
							</div>
						</div>
					</div>
				</Modal>
			</>
		);
	},
};

export const NoTitle: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Modal ohne Titel</Button>
				<Modal isOpen={open} onClose={() => setOpen(false)}>
					<div style={{ textAlign: "center", padding: "24px 0" }}>
						<p style={{ fontSize: "18px", fontWeight: 600 }}>Passwort zurücksetzen</p>
						<p style={{ color: "var(--semantic-color-text-muted)", marginTop: "8px" }}>
							Geben Sie Ihre E-Mail-Adresse ein.
						</p>
					</div>
				</Modal>
			</>
		);
	},
};
