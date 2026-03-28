import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
	component: Logo,
	title: "Brand/Logo",
	tags: ["autodocs"],
	argTypes: {
		size: { control: { type: "range", min: 24, max: 200, step: 8 } },
	},
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
	args: { size: 64 },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
			<Logo size={32} />
			<Logo size={48} />
			<Logo size={64} />
			<Logo size={96} />
			<Logo size={128} />
		</div>
	),
};
