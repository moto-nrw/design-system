import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
	beforeEach(() => {
		vi.stubGlobal(
			"ResizeObserver",
			class {
				observe() {}
				disconnect() {}
				unobserve() {}
			},
		);
	});

	it("keeps overflow scrollbars hidden in Firefox and WebKit", () => {
		const { container } = render(
			<Tabs
				items={[
					{ id: "overview", label: "Overview" },
					{ id: "details", label: "Details" },
					{ id: "activity", label: "Activity" },
				]}
				activeTab="overview"
				onTabChange={vi.fn()}
			/>,
		);

		const scrollContainer = container.querySelector(".overflow-x-auto");

		expect(scrollContainer?.className).toContain("[scrollbar-width:none]");
		expect(scrollContainer?.className).toContain("[&::-webkit-scrollbar]:hidden");
	});
});
