import type { Preview } from "@storybook/react";
import "../src/tokens/build/variables.css";
import "./global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
