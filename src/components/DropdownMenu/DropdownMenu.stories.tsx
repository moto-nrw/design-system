import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
	component: DropdownMenu,
	title: "Components/DropdownMenu",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
	args: {
		items: [
			{ id: "edit", label: "Bearbeiten", onClick: () => {} },
			{ id: "delete", label: "Löschen", onClick: () => {}, variant: "danger" },
		],
	},
};

export const MoreActions: Story = {
	args: {
		items: [
			{ id: "edit", label: "Bearbeiten", onClick: () => {} },
			{ id: "duplicate", label: "Duplizieren", onClick: () => {} },
			{ id: "archive", label: "Archivieren", onClick: () => {} },
			{ id: "delete", label: "Löschen", onClick: () => {}, variant: "danger" },
		],
	},
};

export const InCard: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "start",
				padding: "24px",
				border: "1px solid #e2e8f0",
				borderRadius: "16px",
				maxWidth: 400,
			}}
		>
			<div>
				<strong>Feedback-Eintrag</strong>
				<p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
					Ein Beispiel-Beitrag mit Kebab-Menü
				</p>
			</div>
			<DropdownMenu
				items={[
					{ id: "edit", label: "Bearbeiten", onClick: () => {} },
					{ id: "delete", label: "Löschen", onClick: () => {}, variant: "danger" },
				]}
			/>
		</div>
	),
};
