import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	title: "Components/Tabs",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: () => {
		const [active, setActive] = useState("alphabetical");
		return (
			<Tabs
				items={[
					{ id: "alphabetical", label: "Alphabetisch" },
					{ id: "pickup", label: "Nächste Abholung" },
				]}
				activeTab={active}
				onTabChange={setActive}
			/>
		);
	},
};

export const MultipleTabs: Story = {
	render: () => {
		const [active, setActive] = useState("overview");
		return (
			<Tabs
				items={[
					{ id: "overview", label: "Übersicht" },
					{ id: "students", label: "Kinder" },
					{ id: "activities", label: "Aktivitäten" },
					{ id: "rooms", label: "Räume" },
					{ id: "staff", label: "Mitarbeiter" },
				]}
				activeTab={active}
				onTabChange={setActive}
			/>
		);
	},
};
