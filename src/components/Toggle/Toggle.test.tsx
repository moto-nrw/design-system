import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
	it("applies the checked translation selector to the track instead of the thumb", () => {
		const { container } = render(<Toggle label="Enable feature" />);

		const track = container.querySelector("label > div");
		const thumb = track?.querySelector("div");

		expect(track?.className).toContain(
			"peer-checked:[&>div]:translate-x-[var(--toggle-md-thumb-translate)]",
		);
		expect(thumb?.className).not.toContain("peer-checked:");
	});
});
