import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "Foundations/Typography",
};

export default meta;

type Story = StoryObj;

const TypeRow = ({ name, size, weight }: { name: string; size: string; weight?: number }) => (
	<div
		style={{
			display: "flex",
			alignItems: "baseline",
			gap: "24px",
			padding: "8px 0",
			borderBottom: "1px solid var(--semantic-color-border-default)",
		}}
	>
		<span
			style={{
				fontFamily: "var(--font-family-mono)",
				fontSize: "12px",
				color: "var(--semantic-color-text-muted)",
				minWidth: "100px",
			}}
		>
			{name}
		</span>
		<span
			style={{
				fontFamily: "var(--font-family-mono)",
				fontSize: "12px",
				color: "var(--semantic-color-text-muted)",
				minWidth: "60px",
			}}
		>
			{size}
		</span>
		<span
			style={{
				fontFamily: "var(--font-family-sans)",
				fontSize: `var(--font-size-${name.replace("font-", "")})`,
				fontWeight: weight || 400,
			}}
		>
			Inter — The quick brown fox jumps over the lazy dog
		</span>
	</div>
);

export const TypeScale: Story = {
	render: () => (
		<div style={{ maxWidth: "800px" }}>
			<h2
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "24px",
					fontWeight: 700,
					marginBottom: "8px",
				}}
			>
				Typography
			</h2>
			<p
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "14px",
					color: "var(--semantic-color-text-muted)",
					marginBottom: "32px",
				}}
			>
				Inter — system-ui fallback. Sizes in rem, weights 400–700.
			</p>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<TypeRow name="xs" size="12px" />
				<TypeRow name="sm" size="14px" />
				<TypeRow name="base" size="16px" />
				<TypeRow name="lg" size="18px" />
				<TypeRow name="xl" size="20px" />
				<TypeRow name="2xl" size="24px" />
				<TypeRow name="3xl" size="30px" />
				<TypeRow name="4xl" size="36px" />
			</div>

			<h3
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "16px",
					fontWeight: 600,
					marginTop: "32px",
					marginBottom: "16px",
				}}
			>
				Weights
			</h3>
			<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				{[
					{ name: "Regular", weight: 400 },
					{ name: "Medium", weight: 500 },
					{ name: "Semibold", weight: 600 },
					{ name: "Bold", weight: 700 },
				].map((w) => (
					<p
						key={w.name}
						style={{
							fontFamily: "var(--font-family-sans)",
							fontSize: "18px",
							fontWeight: w.weight,
						}}
					>
						{w.weight} — {w.name}: Die schnelle braune Fuchs springt über den faulen Hund.
					</p>
				))}
			</div>
		</div>
	),
};
