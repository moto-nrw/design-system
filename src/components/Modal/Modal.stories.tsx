import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
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

export const NoTitle: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Modal ohne Titel</Button>
				<Modal isOpen={open} onClose={() => setOpen(false)}>
					<div style={{ textAlign: "center", padding: "24px 0" }}>
						<p style={{ fontSize: "18px", fontWeight: 600 }}>Passwort zurücksetzen</p>
						<p style={{ color: "#64748b", marginTop: "8px" }}>Geben Sie Ihre E-Mail-Adresse ein.</p>
					</div>
				</Modal>
			</>
		);
	},
};
