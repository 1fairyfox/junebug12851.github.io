# 02 · Design Tokens

The exact visual DNA of fairyfox.io. Reproduce these values in your stack
(CSS custom properties, Sass variables, a theme object — whatever fits). **Values
are normative**: match them, don't approximate. The system is **dark-first**, with
a fully designed **light** theme that follows `prefers-color-scheme`, plus a manual
**light / sepia / dark** override chosen in the shared reader menu (see
[the reader section below](#manual-themes--the-reader-aa-menu)).

## Colour — dark theme (default)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#191116` | Page background |
| `--bg-grad-top` | `#211622` | Top of the page background gradient |
| `--panel` | `#241823` | Raised surfaces (header, cards, sidebar) |
| `--panel-2` | `#2a1d29` | Secondary surface (chips, hover) |
| `--panel-3` | `#322433` | Tertiary surface (inline code bg, deep hover) |
| `--line` | `#3a2a37` | Hairline borders/dividers |
| `--line-2` | `#4a3646` | Stronger borders (controls) |
| `--text` | `#f7ece6` | Primary text |
| `--text-soft` | `#cdb8c2` | Secondary text |
| `--text-faint` | `#9c8893` | Muted/meta text |
| `--accent` | `#ff7a5e` (`--violet`) | Accent (warm coral) |
| `--accent-ink` | `#ffb59f` | Accent text on dark (inline code, emphasis) |
| `--on-accent` | `#241016` | Text on an accent fill |
| `--link` | `#ffb59f` | Links |
| `--link-hover` | `#ffd0c2` | Link hover |
| `--glow` | `rgba(255,122,94,.34)` | Accent glow (shadows behind brand/buttons) |
| `--code-bg` | `#120c12` | Code block background |

## Colour — light theme (`prefers-color-scheme: light`)

| Token | Value |
|-------|-------|
| `--bg` | `#fbf2ea` |
| `--bg-grad-top` | `#fff6ee` |
| `--panel` | `#fffaf5` |
| `--panel-2` | `#fdf2e9` |
| `--panel-3` | `#f7e7da` |
| `--line` | `#efddcf` |
| `--line-2` | `#e6cdba` |
| `--text` | `#2c2230` |
| `--text-soft` | `#6a5a62` |
| `--text-faint` | `#9c8b92` |
| `--accent` | `#ef6149` |
| `--accent-ink` | `#c8462f` |
| `--on-accent` | `#fff8f4` |
| `--link` | `#c8462f` |
| `--link-hover` | `#bb3c25` |
| `--glow` | `rgba(239,97,73,.26)` |
| `--code-bg` | `#2b2030` |

## Manual themes & the reader ("Aa") menu

The theme applies **two ways**: the OS default via `prefers-color-scheme` (only when
there's no manual choice) and an explicit pick from the reader menu, set as
`data-theme` on `<html>`. Guard the OS media query with `:not([data-theme])` so a
manual choice always wins:

```css
@media (prefers-color-scheme: light){ :root:not([data-theme]){ /* light tokens */ } }
:root[data-theme="light"]{ /* same light tokens */ }
:root[data-theme="sepia"]{ /* sepia tokens */ }
/* dark is the base :root; data-theme="dark" simply suppresses the OS light query */
```

### Sepia theme (manual only — warm paper for long reading)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `--bg` | `#ece0c8` | | `--text` | `#3d3427` |
| `--bg-grad-top` | `#f3e9d4` | | `--text-soft` | `#63563f` |
| `--panel` | `#f1e7d3` | | `--text-faint` | `#756445` |
| `--panel-2` | `#e7dabf` | | `--accent` | `#bb5a3c` |
| `--panel-3` | `#ddcdac` | | `--accent-ink` | `#8a3a1c` |
| `--line` | `#dccba9` | | `--on-accent` | `#fdf6ea` |
| `--line-2` | `#cdb891` | | `--link` | `#8a3a1c` |
| `--code-bg` | `#33291b` | | `--link-hover` | `#782f14` |

`--glow: rgba(187,90,60,.22)`; shadows as light. Match these **verbatim** — sepia is
part of the shared origin, so it must look identical on the hub and every project.

### The reader menu (required shared component)

Every fairyfox.io site — the hub **and** every project's docs — carries the same
Kindle-style **"Aa"** reader menu in the header. It controls four things and
**remembers the choice under one origin-wide `localStorage` key so the setting is
shared across every same-origin `fairyfox.io` site**:

- **Key:** `fairyfox:reader` → JSON `{ theme, size, lh, width }`.
- **Theme:** `system` (default) · `light` · `sepia` · `dark` → drives `data-theme`.
- **Text size:** index into `[0.92, 0.99, 1.05, 1.14, 1.24, 1.36]rem` (default `2`) → `--reading-fs`.
- **Line spacing:** `tight 1.6` · `normal 1.8` (default) · `relaxed 2.05` → `--reading-lh`.
- **Width:** `narrow 38rem` · `normal 46rem` (default) · `wide 56rem` → `--reading-width`.

These constants are **normative** — keep them byte-identical across the mesh so a
choice made on one site carries to the next. Apply the saved theme + reading vars
**before first paint** (a tiny inline script in `<head>`) to avoid a flash. The
`--reading-*` vars drive the reading surfaces (prose / doc content / article body).
Canonical implementation: the reader module in the bundled reference
([`reference/main.css`](reference/main.css) for the button/panel styles) and
fairyfox.io's `assets/js/reader.js`. Component appearance is in
[`04-components.md`](04-components.md).

## Fixed status hues (both themes)

Lifecycle badges use fixed semantic colour — **not** the per-project accent:

| Status | Token | Dark | Light |
|--------|-------|------|-------|
| alpha | `--hue-alpha` | `#e5484d` (red) | `#e5484d` |
| beta | `--hue-beta` | `#e0a210` (amber) | `#e0a210` |
| released | `--hue-released` | `#22a06b` (green) | `#22a06b` |

## Per-project accent

The accent (`--accent`/`--violet`) is the **one place a project may differ in
colour.** Each project sets its own accent hex (the `color` in its registry entry)
for its brand mark, links, and small highlights. Everything else — surfaces, text,
lines — stays on the shared palette. Default accent if unset: `#ef6149`.

## Typography

Three families, loaded from Google Fonts (or self-hosted equivalents):

| Role | Token | Stack |
|------|-------|-------|
| Display (headings, brand) | `--display` | `"Fraunces", Georgia, "Times New Roman", serif` |
| Sans (body, UI) | `--sans` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| Mono (code) | `--mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |

Weights to load: **Fraunces** 500/600/700 (opsz 9–144), **Inter** 400/500/600/700,
**JetBrains Mono** 400/500.

Base text: `font-size: 16.5px`, `line-height: 1.62`, family `--sans`, colour
`--text`, with `-webkit-font-smoothing: antialiased` and
`text-rendering: optimizeLegibility`.

Heading scale (family `--display`, weight 700, `line-height: 1.14`,
`letter-spacing: -.02em`):

| Element | Size |
|---------|------|
| `h1` | `clamp(2rem, 3.5vw, 2.6rem)`, margin `0 0 .4em` |
| `h2` | `clamp(1.5rem, 2.4vw, 1.9rem)`, margin `0 0 .5em` |
| `h3` | `1.2rem`, margin `1.5rem 0 .4em` |

Note one deliberate exception: the **home hero `h1`** uses `--sans` (Inter), not
Fraunces. Headings inside docs content use Fraunces as above.

Paragraphs/lists: margin `0 0 1.05rem`. Body links: colour `--link`, no underline;
on hover underline with `text-underline-offset: 3px`.

## Spacing, radius, sizing

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `20px` | Cards, panels, dropdowns |
| `--radius-sm` | `13px` | Code blocks, smaller panels |
| `--radius-xs` | `9px` | Tight elements |
| `--maxw` | `1180px` | Page content max width (`.wrap`) |
| `--maxw-text` | `43rem` | Reading-measure max width for prose |
| `--gutter` | `clamp(1.15rem, 4vw, 2.75rem)` | Horizontal page padding |
| `--reading-fs` | `1.05rem` (default) | Reading font size — set live by the reader menu |
| `--reading-lh` | `1.8` (default) | Reading line-height — set live by the reader menu |
| `--reading-width` | `46rem` (default) | Reading measure — set live by the reader menu |

Pill controls (buttons, nav items, chips, badges) use `border-radius: 999px`.

## Shadow & elevation

| Token | Value |
|-------|-------|
| `--shadow` (dark) | `0 1px 0 rgba(255,255,255,.03), 0 18px 40px -24px rgba(0,0,0,.8)` |
| `--shadow-lg` (dark) | `0 34px 80px -30px rgba(0,0,0,.86)` |
| `--shadow` (light) | `0 1px 2px rgba(80,40,30,.05), 0 14px 34px -20px rgba(120,60,40,.28)` |
| `--shadow-lg` (light) | `0 30px 70px -28px rgba(120,55,35,.4)` |

## Motion

- Easing token `--ease`: `cubic-bezier(.22,.61,.36,1)`.
- Typical transitions: `transform .15s var(--ease)` for lifts; `.2s` for
  colour/border/background.
- Hover lift on interactive cards/buttons: `translateY(-2px)`.
- `html { scroll-behavior: smooth }`.
- **Honour `prefers-reduced-motion: reduce`** — drop transforms/animations to near
  zero (see [`07-accessibility.md`](07-accessibility.md)).

## Backdrop (optional but recommended for full match)

The page has two fixed, pointer-events-none background layers behind content:

1. A soft radial-gradient wash (amber top-right, accent top-left) over a vertical
   `--bg-grad-top → --bg` gradient.
2. A faint fractal-noise grain at `opacity: var(--grain-op)` (`.05` dark / `.03`
   light).

These are subtle; reproduce them where the stack allows, but they are lower
priority than colour, type, and the shell.

## Browser-chrome meta

Set both `theme-color` metas so the mobile browser chrome matches:

```html
<meta name="theme-color" content="#ef6149" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#191116" media="(prefers-color-scheme: dark)">
```
