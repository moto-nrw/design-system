import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
	component: Sidebar,
	title: "Components/Sidebar",
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div
				style={{
					height: "600px",
					border: "1px solid #e2e8f0",
					borderRadius: "12px",
					overflow: "hidden",
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
	render: () => {
		const [active, setActive] = useState("groups");
		return (
			<Sidebar
				activeId={active}
				onNavigate={setActive}
				items={[
					{
						id: "my-group",
						label: "Meine Gruppe",
						icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
						children: [
							{ id: "groups", label: "Sonnengruppe" },
							{ id: "moon", label: "Mondgruppe" },
						],
					},
					{
						id: "search",
						label: "Kindersuche",
						icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
					},
					{
						id: "activities",
						label: "Aktivitäten",
						icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
					},
					{
						id: "rooms",
						label: "Räume",
						icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
					},
					{
						id: "staff",
						label: "Mitarbeiter",
						icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
					},
					{
						id: "messages",
						label: "Nachrichten",
						icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
						disabled: true,
						disabledLabel: "Bald",
					},
				]}
				bottomItems={[
					{
						id: "feedback",
						label: "Feedback",
						icon: "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783",
						badge: 4,
					},
					{
						id: "settings",
						label: "Einstellungen",
						icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0",
					},
				]}
			/>
		);
	},
};
