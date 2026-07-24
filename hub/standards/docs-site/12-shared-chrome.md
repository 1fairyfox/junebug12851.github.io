# 12 · Shared Chrome Bundle (vendored, git-pulled)

The chrome — the header/primary-nav, the submenu, the footer, the reader/theme menu,
and the palette that carries them — is **not reimplemented per project.** It is a
single canonical **bundle**, [`chrome/`](chrome/), that every project **copies
verbatim** and pulls over git. This file is the spec for that bundle; `chrome/README.md`
is the operator's guide.

## Why this exists (and what it changes)

The rest of this standard is a **specification you reimplement** — tokens, layout, and
components touch every page a generator emits, in that generator's own idiom, so they're
described in terms any stack can satisfy. The **chrome is different.** It's a fixed,
framework-agnostic shell: the same markup, the same two vanilla JS files, the same
stylesheet, on every page of every project. Asking each project to *rebuild* that from a
spec is what produced the drift we're fixing — RAP, pse2, and the generated reference
each grew a slightly different bar/reader/footer. A fixed shell is something you
**copy, not paraphrase.**

So, narrowly and deliberately, the chrome **revises the old "reimplement, don't copy a
CSS file" line**: for the chrome bundle, adoption **is** a file copy. Everything else in
`01`–`11` is unchanged — you still reproduce tokens/layout/components in your stack; you
just get the shell as bytes.

## Adopt the WHOLE bundle — half-adopted is not adopted

The bundle is **all-or-nothing**. "Wears the chrome" means **every** part is in place on
**every** page: `head.html` (theme metas + pre-paint script + fonts), `header.html` (brand +
the fixed primary nav), `subnav.html` (the section row), `footer.html`, **and** all of
`main.css` + `reader.js` + `nav.js` + `coins.js` + the fonts. Shipping the header but not the
subnav, or the CSS but not `coins.js`, is **not** partial success — it's a failed adoption,
and it's exactly how sites end up with a missing coin button, a broken subnav, or a reader
menu that doesn't appear. Adopt the whole bundle or you have not adopted it.

**Read the bundle files — don't guess the chrome from memory.** The single most common cause
of a drifted header/subnav/footer is rebuilding it from a mental model instead of **opening
[`chrome/`](chrome/) and copying the actual markup + classes**. If you're unsure what a chunk
of the chrome should look like, the answer is in the bundle file, verbatim — read it. There is
no "close enough" reconstruction; there is the bundle.

## Remove the tool's own default chrome — never leave it alongside

Most stacks (a doc generator, an SPA starter, a static template) ship **their own** default
chrome: a default header, footer, sidebar, theme, and link/type styles. Adopting the fairyfox
chrome means **replacing** those, not laying the fairyfox chrome *on top of* them. The failure
modes to kill on sight:

- **Double footers / headers.** The tool's default footer meshing in below (or above) the
  chrome footer is a defect. **One footer — the chrome's.** Remove the tool's default header
  and footer entirely; don't let both render.
- **Default stylesheet leaking over the chrome.** A tool's default CSS routinely overrides
  links, palette, and type — so links come out the wrong colour, headings the wrong font, etc.
  **Replace the tool's stylesheet from scratch; do not layer overrides on top of it**
  (override-on-top is whack-a-mole and the default styles keep winning). The fairyfox palette,
  type, and link styles must be the ones that render — verify a link and a heading actually
  take the chrome's styling, not the tool's default.
- **Default sidebar full of the tool's own entries.** A generator's default sidebar/nav must
  be pruned to what the standard says belongs there (API-only for a generator's reference
  sidebar — see [`06`](06-content-and-organization.md)), not left populated with the tool's
  defaults.

The test: with the chrome adopted, **nothing of the tool's default shell should be visible** —
no default footer, no default header, no default link/heading styling bleeding through. If any
of it still shows, the adoption isn't done.

## Still decoupled — pull at build, never link at runtime

This does **not** re-introduce coupling. The bundle is **pulled over git at build time
and vendored** into the project; the deployed site ships its own copies and renders with
the main site offline. A bad change to fairyfox.io can't live-restyle or break a project.
**Runtime hot-linking of the main site's CSS/JS is still forbidden** — the distinction is
build-time copy (fine, decoupled) vs. runtime `<link>`/`<script>` to fairyfox.io (not
fine). See [`01-overview-and-principles.md`](01-overview-and-principles.md) ("Match,
don't link") — the bundle satisfies it: a vendored copy is not a link.

## What the bundle is

Full inventory + the pull commands + the placeholder contract live in
[`chrome/README.md`](chrome/README.md). In brief:

- **Pulled from the live master** (one source of truth, never stale): the stylesheet
  `assets/css/main.css`, the reader behaviour `assets/js/reader.js`, the nav behaviour
  `assets/js/nav.js`, the coins behaviour `assets/js/coins.js` (the reading-engagement
  counter — injects the coin button beside the reader "Aa" button).
- **Static HTML in the bundle** (the resolved form of the site's Liquid includes):
  [`chrome/head.html`](chrome/head.html), [`chrome/header.html`](chrome/header.html),
  [`chrome/subnav.html`](chrome/subnav.html), [`chrome/footer.html`](chrome/footer.html).
- **Adapters** per generator: [`chrome/adapters/`](chrome/adapters/) (Jekyll, Doxygen,
  static/SPA) — because a generator that owns the whole page needs a different injection
  point than one that lets you set a header/footer. This is the "drop-in works for some
  things, not others" reality, handled explicitly.

## The fixed / fillable line

The bundle is **fixed** except for marked slots. Fixed (never edited by a project): the
primary-nav set and order (**Home · Projects · Farms [Stories · Games] · Docs · Updates ·
About**, with Stories + Games under the **Farms** `details.dd` dropdown), the reader "Aa"
button, the palette, the footer structure. Fillable per project: `{{FF_CSS_HREF}}`,
`{{FF_SUBNAV_ITEMS}}`, `{{FF_PROJECT_KEY}}`, `{{FF_PROJECT_NAME}}`, and the per-page
`.active` marker (on a Stories/Games page mark both the Farms `<summary>` and the matching
dropdown link). Editing a fixed part is not a "deviation" — it's the drift this bundle
exists to remove.

## The reader's reading-page controls (`data-read` / `data-story`) {#the-readers-story-only-controls-data-story}

The reader menu's **line spacing** and **width** are **reading-page only**: they apply, and
their controls un-lock, only on a page **meant to be read** — one that opts in with
**`data-read` on the `<html>` element** (a note, a legal page, a guide, an article) or
**`data-story`** (a book/chapter; it implies readable). **Exclude the surfaces that aren't
reading:** index/list/link pages, category pages, API reference, and sidebars **do not** get
`data-read`, so their measure stays the designed default. Everywhere without the flag the two
controls sit visible-but-disabled with an "Enables on reading pages" note. **Text size, theme
and accent apply on every page.** The signal lives on `<html>` (not `<body>`) so the pre-paint
`head.html` script can read it before first paint. This is fixed reader behaviour (`reader.js`
+ `head.html`) — a project doesn't reimplement it; it just adds `data-read` (or `data-story`)
to the `<html>` of its own **readable** pages, and **omits it** on non-reading surfaces.
**Notes and legal pages are the biggest readable cases** — mark them; don't mark the notes
landing/index or a link list.

## Versioning & sync

- The bundle carries its own [`chrome/VERSION`](chrome/VERSION) (semver). A project
  records the version it adopted (its notes) so a later refresh is a clean diff.
- fairyfox.io is the **master copy** ([`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)):
  the pulled CSS/JS *are* the live master files; the static HTML is the resolved form of
  the site's `_includes/`. When the site's chrome changes, the bundle is updated **in the
  same commit** and its `VERSION` bumped. Direction is outward only — an adopting project
  never edits the bundle.
- **Bump `chrome/VERSION`** on any change to a bundle file or to the master
  chrome/JS/CSS it mirrors: PATCH for a fix, MINOR for a new slot/part, MAJOR if a copy
  a project already vendored must change by hand.

## Adopting it

First-time and refresh both run through the normal flow in
[`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md) and
[`../adopting-updates.md`](../adopting-updates.md) — check, report, wait, apply on
go-ahead. For the chrome specifically: pull the three master assets, copy the four HTML
parts via the matching [adapter](chrome/adapters/), fill the slots, load `nav.js`,
`reader.js` + `coins.js`, and record the adopted `chrome/VERSION`.

## Verify (is it being followed?)

- The project's shipped chrome is the **vendored bundle**, not a hand-built lookalike:
  its header/subnav/footer markup matches [`chrome/`](chrome/) (same classes, same fixed
  primary nav in the exact order, with **Stories** and **Games** under the **Farms**
  dropdown), and its `main.css` / `reader.js` / `nav.js` are copies of the live master
  (not a re-authored variant).
- **The whole bundle is present on every page** — all four HTML parts (`head`/`header`/
  `subnav`/`footer`) *and* `main.css` + `reader.js` + `nav.js` + `coins.js` + fonts. No part
  is missing (a present header but absent subnav, or absent `coins.js`, is a failed adoption).
- **None of the tool's own default chrome is left visible** — no default footer meshing with
  the chrome footer, no default header, no default link/type styling bleeding through. The
  tool's stylesheet was **replaced, not overridden**: a link and a heading render in the
  chrome's palette/type, not the tool's defaults.
- The assets are **vendored, not hot-linked** — no runtime `<link>`/`<script>` pointing
  at `fairyfox.io`; the site renders with the main site unreachable.
- Only the `{{FF_*}}` slots + `.active` differ from the bundle; no fixed part (primary
  nav, reader button, palette) was edited.
- The reader "Aa" button is present (injected by `reader.js`) and the pre-paint theme
  script is in `<head>`, so there's no flash and the `fairyfox:reader:b` choice carries
  across the boundary.
- The adopted `chrome/VERSION` is recorded in the project's notes, and it's not behind
  the current bundle without a stated reason.
