import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../Card/Card";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
	component: Skeleton,
	title: "Components/Skeleton",
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const TextLine: Story = {
	args: { width: 200, height: 16 },
};

export const MultipleLines: Story = {
	args: { width: "100%", height: 16, count: 3, gap: 12 },
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 400 }}>
				<Story />
			</div>
		),
	],
};

export const Circle: Story = {
	args: { height: 48, circle: true },
};

export const CardSkeleton: Story = {
	render: () => (
		<div style={{ maxWidth: 400 }}>
			<Card>
				<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
					<Skeleton height={48} circle />
					<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
						<Skeleton width="60%" height={18} />
						<Skeleton width="40%" height={14} />
					</div>
				</div>
			</Card>
		</div>
	),
};

export const StudentCardSkeleton: Story = {
	render: () => (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
			{[1, 2, 3].map((i) => (
				<Card key={i} padding="md">
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
							<Skeleton width={100} height={20} />
							<Skeleton width={80} height={18} />
							<Skeleton width={120} height={12} />
						</div>
						<Skeleton width={90} height={32} borderRadius={9999} />
					</div>
				</Card>
			))}
		</div>
	),
};

export const TableSkeleton: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 600 }}>
			<Skeleton width="100%" height={40} borderRadius={8} />
			<Skeleton width="100%" height={40} borderRadius={8} />
			<Skeleton width="100%" height={40} borderRadius={8} />
			<Skeleton width="100%" height={40} borderRadius={8} />
			<Skeleton width="80%" height={40} borderRadius={8} />
		</div>
	),
};
