---
"@moto-nrw/design-system": minor
---

Replace tsup with Vite library mode for correct CSS Modules support

tsup/esbuild cannot compile CSS Modules - all component style mappings were empty objects `{}`, causing components to render without CSS classes. Vite has native CSS Modules support and resolves this completely.

- Switched build tool from tsup to Vite library mode
- Dropped CJS output (no CJS consumers found, ESM-only)
- Bundled type declarations into single `index.d.ts` via `rollupTypes`
- Removed post-build CSS Modules patch workaround
- Smaller bundle: 37KB JS + 25KB CSS (was 50KB + 34KB)
