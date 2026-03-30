# @moto-nrw/design-system

## 0.4.0

### Minor Changes

- Add `selected` prop to Card component

  When `selected` is true, the Card displays a brand-primary border and a subtle success-light background, useful for selection states in lists and tenant switchers.

- Replace tsup with Vite library mode for correct CSS Modules support

  tsup/esbuild cannot compile CSS Modules - all component style mappings were empty objects `{}`, causing components to render without CSS classes. Vite has native CSS Modules support and resolves this completely.
  - Switched build tool from tsup to Vite library mode
  - Dropped CJS output (no CJS consumers found, ESM-only)
  - Bundled type declarations into single `index.d.ts` via `rollupTypes`
  - Removed post-build CSS Modules patch workaround
  - Smaller bundle: 37KB JS + 25KB CSS (was 50KB + 34KB)

### Patch Changes

- Fix modal flicker on open by adding idle state

  The modal briefly showed the exit animation (10ms flash) before the enter animation started. Added an idle state that keeps the modal invisible until the enter animation triggers.

## 0.3.1

### Patch Changes

- [#34](https://github.com/moto-nrw/design-system/pull/34) [`20dfb5d`](https://github.com/moto-nrw/design-system/commit/20dfb5da67c8ff35b6e3a0c947f10301db052446) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Fix broken @keyframes in published tailwind.css

  The build script's regex for extracting @keyframes blocks from source CSS truncated multi-stop keyframes at the first inner closing brace. All 7 keyframes (wave, ds-spin, modalEnter, modalExit, contentReveal, toastSlideIn, toastSlideOut) were missing their closing braces and secondary stops, causing CssSyntaxError in consumer Tailwind v4 builds.

## 0.3.0

### Minor Changes

- [#24](https://github.com/moto-nrw/design-system/pull/24) [`f13c1cc`](https://github.com/moto-nrw/design-system/commit/f13c1cc0db9fa966ff5deddd627a060d83773b47) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Add blue and purple color palettes to the design token system
  - Added `blue` palette (50, 100, 500, 600, 700) based on Tailwind Blue
  - Added `purple` palette (50, 100, 500, 600, 700) based on Tailwind Violet
  - Updated Pill component to use real blue/purple colors instead of steel grays
  - Registered new colors in the Tailwind v4 theme

### Patch Changes

- [#27](https://github.com/moto-nrw/design-system/pull/27) [`148a0f2`](https://github.com/moto-nrw/design-system/commit/148a0f29d70992ca6854e4fd8d4b340bb31c89af) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Tighten dot-to-label spacing in Pill component

  Reduced margin-right on the dot indicator from 6/8/10px to 4/6/8px
  across sm/md/lg sizes for a more balanced visual weight.

- [#26](https://github.com/moto-nrw/design-system/pull/26) [`bfeed29`](https://github.com/moto-nrw/design-system/commit/bfeed29a25f7260eb92979937b6571434d9d4a40) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Use uniform colored border on Toast instead of thick left-only accent

  Replaces `border-left: 3px solid` with `border-color` matching the toast
  type's icon color, keeping the existing 1px border thickness uniform on
  all sides.

## 0.2.3

### Patch Changes

- [#19](https://github.com/moto-nrw/design-system/pull/19) [`2152063`](https://github.com/moto-nrw/design-system/commit/2152063beb1389ba8e63ba180ca1205e528075a2) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Add `./styles` export for component CSS so consumers can import styles via `@import "@moto-nrw/design-system/styles"` without reaching into `dist/`

## 0.2.1

### Patch Changes

- Switch publishing to npmjs.com (no auth tokens needed for install)

## 0.2.0

### Minor Changes

- [#8](https://github.com/moto-nrw/design-system/pull/8) [`e43a258`](https://github.com/moto-nrw/design-system/commit/e43a25843411ba799be506483f05fa6f72d3af8e) Thanks [@fl0r14n28](https://github.com/fl0r14n28)! - Initial release: 26 components, brand tokens, Tailwind v4 preset, Lucide icons

  Components: Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, ConfirmationModal,
  Divider, DropdownMenu, FilterChips, Input, Logo, Modal, Pill, Radio, SearchBar, Select,
  Skeleton, Spinner, StatusDot, Tabs, Textarea, Toast, Toggle

  Tokens: Steel, Sage (Olive), Warm (Amber), Red (Terracotta) + spacing, radii, typography
