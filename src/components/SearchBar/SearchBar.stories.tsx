import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
	component: SearchBar,
	title: "Components/SearchBar",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return <SearchBar value={value} onChange={setValue} placeholder="Name suchen..." />;
	},
};

export const WithValue: Story = {
	render: () => {
		const [value, setValue] = useState("Max Mustermann");
		return <SearchBar value={value} onChange={setValue} />;
	},
};

export const AllSizes: Story = {
	render: () => {
		const [v1, setV1] = useState("");
		const [v2, setV2] = useState("");
		const [v3, setV3] = useState("");
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 400 }}>
				<SearchBar value={v1} onChange={setV1} size="sm" placeholder="Small" />
				<SearchBar value={v2} onChange={setV2} size="md" placeholder="Medium" />
				<SearchBar value={v3} onChange={setV3} size="lg" placeholder="Large" />
			</div>
		);
	},
};
