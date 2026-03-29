# CLAUDE.md

This file gives coding agents a current map of the repository so edits stay aligned with how the package is actually built, tested, and published.

## What This Repo Is

`@moto-nrw/design-system` is the shared React component library and token package for the Ganztagshelden ecosystem.

- Published to npmjs.com
- Consumed by apps like project-phoenix, PyrePortal, the website, and other frontend repos
- Built as a React component package plus CSS entrypoints for tokens and Tailwind v4 integration

## Day-To-Day Commands

| Command | Purpose |
|---------|---------|
| `pnpm build` | Full production build: tokens, JS bundles, CSS entrypoints, and package validation |
| `pnpm tokens` | Regenerate token artifacts in `src/tokens/build/` |
| `pnpm dev` | Watch JS/TS bundle output via `tsup --watch` |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Run the full test suite once |
| `pnpm storybook` | Local Storybook at `localhost:6006` |
| `pnpm build-storybook` | Production Storybook build for broad render sanity checks |
| `pnpm lint` | Run Biome checks |
| `pnpm lint:fix` | Apply Biome fixes |
| `pnpm format` | Format files with Biome |
| `pnpm knip` | Detect unused exports, files, and dependencies |
| `pnpm changeset` | Create a release note for the next package version |
| `pnpm version` | Apply pending changesets and update `CHANGELOG.md` |
| `pnpm release` | Publish the package via Changesets |

Useful one-off commands:

- Run a single test file: `pnpm vitest run src/components/Button/Button.test.tsx`
- Typecheck locally the same way CI does: `pnpm tsc --noEmit`

## Build Pipeline

`pnpm build` currently does the following:

1. `pnpm tokens`
   Style Dictionary compiles `src/tokens/{base,semantic}/**/*.json` into:
   - `src/tokens/build/variables.css`
   - `src/tokens/build/tokens.ts`
2. `tsup`
   Bundles `src/index.ts` into:
   - `dist/index.js` (ESM)
   - `dist/index.cjs` (CJS)
   - `dist/index.d.ts` and `dist/index.d.cts`
3. Tailwind CLI builds `src/tailwind.css` into `dist/tailwind.css`
4. Tailwind CLI builds `src/styles.css` into `dist/styles.css`
5. The generated token CSS is copied to `dist/tokens.css`

After that, `postbuild` runs:

- `attw --pack --exclude-entrypoints ./tokens ./tailwind ./styles`
- `publint`

If packaging behavior changes, update both `README.md` and this file in the same PR.

## Package Entry Points

The package exposes four main public surfaces:

```tsx
import { Button, Logo } from "@moto-nrw/design-system";     // React components
import "@moto-nrw/design-system/styles";                     // prebuilt component CSS
import "@moto-nrw/design-system/tokens";                     // CSS variables only
import "@moto-nrw/design-system/tailwind";                   // Tailwind v4 theme + tokens + keyframes
```

### Tailwind v4 consumption

For apps that want utilities generated in the consumer build:

```css
@import "tailwindcss";
@import "@moto-nrw/design-system/tailwind";
@source "../node_modules/@moto-nrw/design-system/dist";
```

Important details:

- `@moto-nrw/design-system/tailwind` is expected to be self-contained for tokens, theme values, component variables, and custom keyframes
- `@source` is required so the consumer’s Tailwind build sees utility classes inside the published component bundle

### Prebuilt CSS consumption

For apps that want the library’s compiled CSS directly:

```css
@import "@moto-nrw/design-system/styles";
```

`./styles` is expected to include:

- semantic token variables
- component-level CSS variables
- all utility rules referenced by shipped components
- custom keyframes used by component animation classes

## Styling Architecture

This repo no longer uses component-level CSS Modules for component styling.

Components now render:

- Tailwind utility classes directly in TSX
- semantic CSS custom properties for colors and design decisions
- component-scoped custom properties for sizing, spacing, and behavior knobs

Current styling source files:

- `src/tailwind-theme.css`
  Tailwind v4 `@theme` definitions and component variable defaults
- `src/tailwind.css`
  Tailwind integration source that imports generated token variables, theme definitions, and custom keyframes
- `src/styles.css`
  Prebuilt stylesheet source that layers Tailwind theme/utilities over the package’s Tailwind integration

### Token model

The token system has two layers:

- Base tokens in `src/tokens/base/`
- Semantic tokens in `src/tokens/semantic/`

Generated outputs in `src/tokens/build/` are artifacts, not hand-maintained source.

The semantic layer should remain the default interface for components:

- Use `var(--semantic-color-...)` in components
- Avoid hardcoding raw brand values inside component code
- Keep `tailwind-theme.css` aligned with the token system so Tailwind utilities and CSS variables do not drift apart

Theme files exist in `src/tokens/themes/`, but they are not wired into the published build yet.

## Component Structure

Most components follow this folder pattern:

```text
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx
├── ComponentName.test.tsx      # optional but preferred for non-trivial behavior
└── index.ts
```

Notes:

- Tests are present for some components, not every component yet
- Storybook stories exist broadly and are useful for package-level manual QA
- Public exports must be added to both `src/components/index.ts` and `src/index.ts`

## Working Conventions

### Styling rules

- Prefer semantic CSS variables over base token values in component code
- Keep the sage palette constrained to the intended brand steps: `100/300/500/700/900`
- If you add Tailwind utilities that depend on custom keyframes, make sure the relevant entrypoint still ships those keyframes
- If you add utilities used by published components, verify they are available in either:
  - the prebuilt `./styles` bundle, and
  - the documented Tailwind + `@source` integration path

### Generated files

- `src/tokens/build/` is gitignored and regenerated
- Do not hand-edit generated token files unless you are debugging the generator itself
- Biome excludes `src/tokens/build` because those files are generated by Style Dictionary

### TypeScript and tooling

- Biome uses tabs and a 100-character line width
- `vitest` runs in `jsdom`
- Storybook uses the Vite builder
- React and `react-dom` are peer dependencies and are not bundled into the package

## QA Expectations

For component or styling work, the usual confidence ladder is:

1. `pnpm lint`
2. `pnpm test:run`
3. `pnpm build`
4. `pnpm build-storybook` for broad render/package sanity when changes affect styling, packaging, or many components

When touching packaging or CSS entrypoints, also verify the built outputs in `dist/` if something looks suspicious.

Good spot checks after build:

- `dist/tailwind.css` includes tokens and custom keyframes
- `dist/styles.css` includes the utility rules used by components
- README examples still match the real published entrypoints

## CI And Release

### CI

`.github/workflows/ci.yml` currently runs on pushes and PRs targeting `development` and executes:

- `pnpm lint`
- `pnpm tsc --noEmit`
- `pnpm test:run`
- `pnpm build`
- `pnpm knip`

### Release

`.github/workflows/release.yml` runs on pushes to `development` and uses Changesets to either:

- open a version PR, or
- publish to npmjs.com using `NPM_TOKEN`

This repo is no longer documented as publishing to GitHub Packages.

## Constraints To Keep In Mind

- Keep published entrypoints coherent: `./styles`, `./tokens`, and `./tailwind` should each do exactly what the docs say they do
- Tailwind integration changes are package API changes, not just internal refactors
- Storybook is a major QA surface here, so don’t leave stories broken after component changes
- The logo source of truth is `src/assets/logo.svg`, surfaced through the `Logo` component
- If you change export structure, build scripts, release behavior, or consumption docs, update this file too
