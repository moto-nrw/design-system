import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "Foundations/Spacing",
};

export default meta;

type Story = StoryObj;

const spacings = [
	{ name: "0", value: "0px" },
	{ name: "1", value: "4px" },
	{ name: "2", value: "8px" },
	{ name: "3", value: "12px" },
	{ name: "4", value: "16px" },
	{ name: "5", value: "20px" },
	{ name: "6", value: "24px" },
	{ name: "8", value: "32px" },
	{ name: "10", value: "40px" },
	{ name: "12", value: "48px" },
	{ name: "16", value: "64px" },
];

export const SpacingScale: Story = {
	render: () => (
		<div style={{ maxWidth: "600px" }}>
			<h2
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "24px",
					fontWeight: 700,
					marginBottom: "8px",
				}}
			>
				Spacing
			</h2>
			<p
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "14px",
					color: "var(--semantic-color-text-muted)",
					marginBottom: "32px",
				}}
			>
				4px base unit. Used for padding, margins, gaps.
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				{spacings.map((s) => (
					<div key={s.name} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
						<span
							style={{
								fontFamily: "var(--font-family-mono)",
								fontSize: "12px",
								color: "var(--semantic-color-text-muted)",
								minWidth: "80px",
							}}
						>
							spacing-{s.name}
						</span>
						<span
							style={{
								fontFamily: "var(--font-family-mono)",
								fontSize: "12px",
								color: "var(--semantic-color-text-muted)",
								minWidth: "40px",
							}}
						>
							{s.value}
						</span>
						<div
							style={{
								width: s.value,
								height: "24px",
								backgroundColor: "var(--semantic-color-brand-primary)",
								borderRadius: "4px",
								opacity: 0.8,
							}}
						/>
					</div>
				))}
			</div>
		</div>
	),
};
