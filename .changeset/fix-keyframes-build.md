---
"@moto-nrw/design-system": patch
---

Fix broken @keyframes in published tailwind.css

The build script's regex for extracting @keyframes blocks from source CSS truncated multi-stop keyframes at the first inner closing brace. All 7 keyframes (wave, ds-spin, modalEnter, modalExit, contentReveal, toastSlideIn, toastSlideOut) were missing their closing braces and secondary stops, causing CssSyntaxError in consumer Tailwind v4 builds.
