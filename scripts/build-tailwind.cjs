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

// Extract @keyframes blocks from src/tailwind.css
const tailwindSrc = fs.readFileSync(path.join(root, "src/tailwind.css"), "utf8");
const keyframeBlocks = tailwindSrc.match(/@keyframes\s+\S+\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/g);

if (keyframeBlocks) {
	parts.push(keyframeBlocks.join("\n\n"));
}

fs.writeFileSync(path.join(root, "dist/tailwind.css"), parts.join("\n"));
