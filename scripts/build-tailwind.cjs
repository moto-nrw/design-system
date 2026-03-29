/**
 * Concatenates the raw Tailwind v4 theme source files into dist/tailwind.css.
 *
 * Unlike the styles.css build (which runs through Tailwind CLI to compile
 * utilities), the tailwind export must preserve @theme directives so that
 * consumer Tailwind builds can register the design-system theme keys.
 */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const parts = [
	fs.readFileSync(path.join(root, "src/tokens/build/variables.css"), "utf8"),
	fs.readFileSync(path.join(root, "src/tailwind-theme.css"), "utf8"),
];

// Extract keyframes from src/tailwind.css (everything that isn't an @import)
const tailwindSrc = fs.readFileSync(path.join(root, "src/tailwind.css"), "utf8");
const keyframes = tailwindSrc
	.split("\n")
	.filter((line) => !line.startsWith("@import") && !line.startsWith(" *") && !line.startsWith("/*") && !line.startsWith(" */"))
	.join("\n")
	.trim();

if (keyframes) {
	parts.push(keyframes);
}

fs.writeFileSync(path.join(root, "dist/tailwind.css"), parts.join("\n"));
