# Plan — Seamless project links + the shared "Kindle" reader (0.13.0)

_Written 2026-07-05. A MINOR milestone: it adds a user-facing feature and changes
a site convention (project cards stop pointing at local node pages)._

## Why

Two asks, from the same instinct — make the mesh feel like **one seamless site**:

1. **Share the reader.** Random AI Prompt's refreshed docs theme (its `0.13.x`
   docs-theme rebuild — ES-module JS + CSS-module theme files) ships a
   **Kindle-style "Aa" reader menu**: Theme (Auto / Light / Sepia / Dark), text
   size, line spacing, reading width — saved under an **origin-wide** localStorage
   key `fairyfox:reader`, so the choice already carries across every same-origin
   `fairyfox.io` site. fairyfox.io itself doesn't have it yet (and its theming is
   OS-only: no `data-theme`, no sepia). Bring the same control to the hub so the
   setting is shared both ways, and codify it in the docs-site standard so every
   node has the identical menu + key.

2. **Retire the local node pages.** The `/projects/<key>/` pages re-state each
   project's blurb / status / "what it is" / connections — **locally cached
   details** that go stale and break the seamless feel. Each project already
   explains itself on its own page (served under the domain at `fairyfox.io/<key>/`,
   wearing the shared chrome). So a project card should click **straight through to
   that live page** — same look, plus its own sub-navbar — not to a hub-local copy.

## Decisions (confirmed with Fairy Fox)

- **Reader scope:** global — the "Aa" button sits in the site header on every page;
  Theme (incl. a real **Sepia**) restyles the whole site via `data-theme`;
  size / spacing / width drive `--reading-*` on reading surfaces. Matches RAP exactly.
- **Card target:** primary click → `fairyfox.io/<key>/` (the project's own `docs`
  URL). Projects with no hosted page (the v1 predecessor) fall back to the repo.
- **Scope:** ship the site change **and** the hub `docs-site` standard update in the
  same release.

## Work breakdown

### A. Reader feature (site)
- `assets/css/main.css`: wrap the light `@media` in `:root:not([data-theme])`; add
  `:root[data-theme="light"]`, `:root[data-theme="sepia"]` (values shared with RAP's
  `tokens.css`); add `--reading-fs/-lh/-width` to `:root`; apply them to reading
  surfaces (`.content`, `.prose`); add `.ff-reader-btn` / `.ff-reader-panel` / `.ff-seg`
  styles (adapted from RAP `reader.css` — same token names).
- `assets/js/reader.js`: the Aa button + panel. **Identical constants + key**
  (`fairyfox:reader`, SIZES/LH/WIDTH/DEFAULTS) to RAP so prefs are interchangeable.
  Insert the button into `.site-header .wrap` before `.nav`.
- `_includes/head.html`: tiny inline no-flash script — apply saved theme + reading
  vars before first paint. Also stop hot-linking Google Fonts? (out of scope; leave.)
- `_layouts/default.html`: load `reader.js` (defer).

### B. Retire node pages / retarget cards (site)
- Delete `_projects/*.md` and `_layouts/project.html`; remove the `projects`
  collection + its `defaults` entry from `_config.yml`.
- `_includes/project-card.html`: whole-card link → `p.docs` else `p.repo`
  (meta/site card → `/docs/`); drop the "More details →" node link; keep one
  "Repository ↗".
- `_includes/subnav.html`: projects branch lists each project → its live page
  (`p.docs` / repo fallback), not `/projects/<key>/`.
- `about.md`: repoint the five node links to live pages (repo for v1, `/docs/` for
  the site itself).
- `projects.md`: tidy the "How the projects connect" prose (cards now open the
  project's own page).

### C. Hub standard (mesh-wide)
- `hub/standards/docs-site/`: document the reader as a **required shared component**
  (04-components + 05-navigation), the origin-wide `fairyfox:reader` key + the theme
  set incl. Sepia (02-design-tokens), and record that hub **node pages are retired**
  (cards deep-link to the live node). Refresh the bundled snapshots
  (`reference/main.css`, `reference/chrome.html`), `11-measurements-reference.md`,
  and the `08-compliance-checklist.md` row.

### D. Verify + release
- Local `jekyll build` green; serve + screenshot home / projects / a doc page across
  light-dark-sepia with the reader panel open.
- Bump `VERSION` → `0.13.0`; changelog atop `notes/version/2026-07.md`; session log;
  `status.md`. Release git-flow MINOR: `release/0.13.0` → `main`, tag, back-merge dev.

## Open items / watch
- Applying `--reading-*` to `.content` must not disturb the doc sidebar layout —
  scope width to `.prose`, verify the doc page in a screenshot.
- fairyfox.io is the **master** docs-site copy: the standard must mirror what the
  site becomes here, but is never auto-applied back onto the site.
- Don't touch blog posts that mention `fairyfox.io/<key>/` — those are live-page URLs.
