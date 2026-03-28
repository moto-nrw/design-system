import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "Foundations/Colors",
};

export default meta;

type Story = StoryObj;

const Swatch = ({
	name,
	value,
	textDark = true,
}: {
	name: string;
	value: string;
	textDark?: boolean;
}) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			gap: "12px",
			padding: "12px 16px",
			borderRadius: "8px",
			backgroundColor: value,
			color: textDark ? "#0f172a" : "#ffffff",
			fontFamily: "var(--font-family-sans)",
			fontSize: "13px",
		}}
	>
		<span style={{ fontWeight: 600, minWidth: "120px" }}>{name}</span>
		<span style={{ opacity: 0.7 }}>{value}</span>
	</div>
);

const PaletteSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div style={{ marginBottom: "32px" }}>
		<h3
			style={{
				fontFamily: "var(--font-family-sans)",
				fontSize: "16px",
				fontWeight: 600,
				marginBottom: "12px",
				color: "var(--semantic-color-text-default)",
			}}
		>
			{title}
		</h3>
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>{children}</div>
	</div>
);

export const ColorPalette: Story = {
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
				Ganztagshelden — Brand Color System
			</h2>
			<p
				style={{
					fontFamily: "var(--font-family-sans)",
					fontSize: "14px",
					color: "var(--semantic-color-text-muted)",
					marginBottom: "32px",
				}}
			>
				Steel Logo + Olive Sage Accent
			</p>

			<PaletteSection title="Steel — Logo, Text, Borders, Backgrounds">
				<Swatch name="steel-50" value="#F8FAFC" />
				<Swatch name="steel-100" value="#F1F5F9" />
				<Swatch name="steel-200" value="#E2E8F0" />
				<Swatch name="steel-300" value="#CBD5E1" />
				<Swatch name="steel-400" value="#94A3B8" />
				<Swatch name="steel-500" value="#64748B" textDark={false} />
				<Swatch name="steel-600" value="#475569" textDark={false} />
				<Swatch name="steel-700" value="#334155" textDark={false} />
				<Swatch name="steel-800" value="#1E293B" textDark={false} />
				<Swatch name="steel-900" value="#0F172A" textDark={false} />
			</PaletteSection>

			<PaletteSection title="Sage — Primary Accent (Buttons, CTAs, Links, Success)">
				<Swatch name="sage-100" value="#D4E4C8" />
				<Swatch name="sage-300" value="#A3C48A" />
				<Swatch name="sage-500" value="#7BA05B" textDark={false} />
				<Swatch name="sage-700" value="#577B42" textDark={false} />
				<Swatch name="sage-900" value="#3B4F2A" textDark={false} />
			</PaletteSection>

			<PaletteSection title="Warm — Secondary Accent (Warnings, Highlights, Badges)">
				<Swatch name="warm-50" value="#FEF3C7" />
				<Swatch name="warm-100" value="#FDE68A" />
				<Swatch name="warm-200" value="#FCD34D" />
				<Swatch name="warm-300" value="#FBBF24" />
				<Swatch name="warm-400" value="#F59E0B" />
				<Swatch name="warm-500" value="#D97706" textDark={false} />
				<Swatch name="warm-700" value="#92400E" textDark={false} />
				<Swatch name="warm-900" value="#451A03" textDark={false} />
			</PaletteSection>

			<PaletteSection title="Red / Terracotta — Error, Destructive">
				<Swatch name="red-50" value="#FDF2EE" />
				<Swatch name="red-100" value="#FADDCD" />
				<Swatch name="red-400" value="#D4735A" textDark={false} />
				<Swatch name="red-500" value="#C45E3A" textDark={false} />
				<Swatch name="red-600" value="#A34B2E" textDark={false} />
			</PaletteSection>

			<PaletteSection title="Semantic Colors">
				<Swatch name="brand-primary" value="#7BA05B" textDark={false} />
				<Swatch name="brand-secondary" value="#F59E0B" />
				<Swatch name="feedback-success" value="#7BA05B" textDark={false} />
				<Swatch name="feedback-warning" value="#F59E0B" />
				<Swatch name="feedback-error" value="#C45E3A" textDark={false} />
			</PaletteSection>
		</div>
	),
};
