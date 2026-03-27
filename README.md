# @moto-nrw/design-system

Shared component library and design tokens for the Ganztagshelden ecosystem. Published to GitHub Packages.

## Quick Start

```bash
pnpm install
pnpm tokens       # generate CSS variables from token JSONs
pnpm storybook    # component playground on localhost:6006
```

## Usage

```bash
pnpm add @moto-nrw/design-system
```

`.npmrc` in consuming repo:
```
@moto-nrw:registry=https://npm.pkg.github.com
```

```tsx
import { Button } from "@moto-nrw/design-system";
import "@moto-nrw/design-system/tokens";
```

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm build` | Full production build |
| `pnpm storybook` | Storybook dev server |
| `pnpm test:run` | Run tests |
| `pnpm lint` | Lint with Biome |
| `pnpm knip` | Find unused code |
| `pnpm changeset` | Create a release changeset |

## Release

1. `pnpm changeset` to describe what changed
2. Push to `development`
3. Merge the auto-created "Version Package" PR to publish
