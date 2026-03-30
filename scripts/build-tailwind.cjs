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

// Append everything from src/tailwind.css except @import lines and the
// leading comment block — the imported files are already read above.
const tailwindSrc = fs.readFileSync(path.join(root, "src/tailwind.css"), "utf8");
const extraRules = tailwindSrc
	.replace(/\/\*[\s\S]*?\*\//g, "") // strip block comments
	.replace(/@import\s+[^;]+;\s*/g, "") // strip @import statements
	.trim();

if (extraRules) {
	parts.push(extraRules);
}

fs.writeFileSync(path.join(root, "dist/tailwind.css"), parts.join("\n"));
