import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	component: Button,
	title: "Components/Button",
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "outline", "outline_danger", "danger", "success", "ghost"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl"],
		},
		isLoading: { control: "boolean" },
		loadingText: { control: "text" },
		disabled: { control: "boolean" },
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: { variant: "primary", children: "Primary Button" },
};

export const Secondary: Story = {
	args: { variant: "secondary", children: "Secondary Button" },
};

export const Outline: Story = {
	args: { variant: "outline", children: "Outline Button" },
};

export const OutlineDanger: Story = {
	args: { variant: "outline_danger", children: "Outline Danger" },
};

export const Danger: Story = {
	args: { variant: "danger", children: "Danger Button" },
};

export const Success: Story = {
	args: { variant: "success", children: "Success Button" },
};

export const Ghost: Story = {
	args: { variant: "ghost", children: "Ghost Button" },
};

export const Loading: Story = {
	args: { isLoading: true, loadingText: "Speichern...", children: "Speichern" },
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="outline_danger">Outline Danger</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="success">Success</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">Extra Large</Button>
		</div>
	),
};
