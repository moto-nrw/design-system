# @moto-nrw/design-system

Shared component library and design tokens for the Ganztagshelden ecosystem. Published to GitHub Packages.

## Quick Start

```bash
pnpm install
pnpm tokens       # generate CSS variables from token JSONs
pnpm storybook    # component playground on localhost:6006
```

## Usage

### Developer Setup (one-time)

GitHub Packages requires auth to install, even for public packages. Each developer needs a GitHub PAT:

1. Go to https://github.com/settings/tokens/new (classic token)
2. Select only the `read:packages` scope
3. Add it to your global `~/.npmrc`:

```bash
echo "//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE" >> ~/.npmrc
```

### Project Setup

Add `.npmrc` to the consuming repo root:

```
@moto-nrw:registry=https://npm.pkg.github.com
```

Install:

```bash
pnpm add @moto-nrw/design-system
```

### CI Setup (GitHub Actions)

```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: https://npm.pkg.github.com
    scope: "@moto-nrw"

- run: pnpm install
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Import

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
