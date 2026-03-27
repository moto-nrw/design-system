# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`@ganztagshelden/design-system` - shared React component library and design tokens for the Ganztagshelden ecosystem. Published to GitHub Packages. Consumed by project-phoenix, comuneo, and other repos via `pnpm add @ganztagshelden/design-system`.

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm build` | Full production build (tokens + tsup + validation) |
| `pnpm tokens` | Generate CSS vars + TS constants from token JSONs |
| `pnpm dev` | Watch mode for component development |
| `pnpm test:run` | Single test run |
| `pnpm test` | Tests in watch mode |
| `pnpm storybook` | Component playground on localhost:6006 |
| `pnpm lint` | Check with Biome |
| `pnpm lint:fix` | Auto-fix lint + format issues |

Run a single test file: `pnpm vitest run src/components/Button/Button.test.tsx`

## Build Pipeline

`pnpm build` runs three steps sequentially:

1. **`pnpm tokens`** - Style Dictionary compiles `src/tokens/{base,semantic}/**/*.json` into `src/tokens/build/variables.css` and `src/tokens/build/tokens.ts`
2. **`tsup`** - Bundles `src/index.ts` into ESM (`dist/index.js`) + CJS (`dist/index.cjs`) + type declarations
3. **`cp`** - Copies generated token CSS to `dist/tokens.css`

Then `postbuild` validates: `attw` checks export resolution across all module systems, `publint` checks package.json correctness.

## Architecture

### Two-Tier Token System

Components never use raw values. The token system has two layers:

- **Base tokens** (`src/tokens/base/`) - raw primitives: `color.blue.600: "#2563EB"`
- **Semantic tokens** (`src/tokens/semantic/`) - design decisions referencing base tokens: `semantic.color.brand.primary: "{color.blue.600}"`

Style Dictionary generates CSS custom properties with `outputReferences: true`, so semantic vars reference base vars (e.g., `--semantic-color-brand-primary: var(--color-blue-600)`).

Theme files exist in `src/tokens/themes/` (light/dark) but are not yet wired into the build.

### Component Pattern

Every component follows this structure:

```
src/components/ComponentName/
├── ComponentName.tsx           # Component with typed props extending HTML attributes
├── ComponentName.module.css    # CSS Modules using token CSS variables (no hardcoded values)
├── ComponentName.test.tsx      # Vitest + React Testing Library
├── ComponentName.stories.tsx   # Storybook with tags: ["autodocs"]
└── index.ts                    # Barrel re-export
```

Then add the export to `src/components/index.ts` and `src/index.ts`.

### Package Exports

Consumers use two entry points:
```tsx
import { Button } from "@ganztagshelden/design-system";       // components
import "@ganztagshelden/design-system/tokens";                 // CSS variables
```

React and React-DOM are peer dependencies (not bundled).

## Key Constraints

- All component styles must use semantic token CSS variables, never base tokens or hardcoded values
- `src/tokens/build/` is gitignored (generated output) - run `pnpm tokens` after cloning
- TypeScript 6 requires `"ignoreDeprecations": "6.0"` in tsconfig due to tsup's internal use of `baseUrl`
- The `./tokens` export is excluded from `attw` validation (CSS-only exports can't resolve as JS modules)
- Biome uses **tab** indentation and 100-char line width
