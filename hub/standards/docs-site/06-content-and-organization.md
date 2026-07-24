# 06 · Content & Organization

The visual match is half the job; a project's docs should also be **organized the
same way** so the structure feels familiar. This file says what pages a compliant
docs site has, how they're grouped, and where generated API docs fit.

## The two documentation surfaces

A project's documentation lives in two complementary places — keep them in step,
don't duplicate:

| Surface | Where | Depth |
|---------|-------|-------|
| **On-site doc page** | `fairyfox.io/docs/<key>/` (on the main site) | A short entry point — what the project is, links onward. Maintained on the main site. |
| **Project docs site** | `fairyfox.io/<key>/` (the project's own) | The full documentation — overview, guides, reference, changelog. Maintained in the project. |

The on-site page is the elevator pitch and the doorway; the project docs site is
the manual. The project docs site is the one this standard themes.

## Recommended page set for a project docs site

Adapt to the project, but cover these roles; group them in the sidebar by category
(mirroring the main site's grouped doc library):

| Group | Pages | Purpose |
|-------|-------|---------|
| **Overview** | Home / "What it is", Getting started | Orient a newcomer; install/run quickly. |
| **Guides** | Task- and concept-oriented how-tos | The day-to-day usage docs. |
| **Reference** | Configuration, CLI/API, formats | Look-up material; link to generated API docs here. |
| **Project** | Changelog/Updates, About/architecture | What changed, how it's built, how it connects back to Fairy Fox. |

Every docs site should have, at minimum: a **themed home/overview**, a **way to get
started**, and a **changelog or updates** view — plus the required links back to
Fairy Fox (see [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md)).

## Per-page metadata

However your stack expresses it (front matter, a manifest, route config), each docs
page should carry the equivalent of:

- **title** — the page's display name.
- **category** — which sidebar group it belongs to.
- **order** — its position within that group.
- **summary** (optional) — a one-line lead shown under the title.

This is what powers the grouped, ordered sidebar and the breadcrumb. Keep titles
short and consistent in voice.

## Generated docs (Doxygen, JSDoc, TypeDoc, Sphinx, Dokka, …)

**Most projects should ship API docs** — if a project has a public API, surface, or
codebase worth referencing, it should generate reference docs and link them as **API** in the
[canonical subnav](05-navigation-and-cross-linking.md#the-canonical-project-subnav-structure).

**API docs live *only* on the API pages.** The generated reference is confined to its own
**API** section — it must not bleed into or take over the rest of the docs site. Overview,
Notes, Tutorials, Changelog, and Download are hand-authored, chrome-wearing, comfortably
formatted pages (see the [quality bar](#page-quality-comfortable-formatted-connected)); the raw
generator output belongs behind the "API" item and nowhere else. A visitor on any non-API page
should never be looking at un-themed generator markup.

Generators come in **two shapes**, and they need opposite techniques. Decide which
one you're in before you touch any CSS.

### Case A — the generator is a *boundaried zone* inside a hand-authored site

The themed docs site is hand-built (Jekyll, etc.) and the generated reference is one
section reached from it:

- **Link to it from the Reference group** ("API Reference →") so the user crosses an
  intended boundary rather than stumbling out of the theme.
- **Skin it where the generator allows** — apply the palette and fonts via the
  generator's custom-CSS hooks so it at least rhymes with the theme.
- **Always provide a way back** to the themed docs.

### Case B — the generator *is* the site (the generator is the docs site) {#generator-based-docs-sites-the-generator-is-the-site}

When the whole docs site *is* the generator's output (e.g. a JSDoc/docdash site,
with your living notes rendered as the generator's "tutorials"), there is no outer
shell to skin from — **the generator's output is the surface, so you theme the
generator itself.** This is a first-class, supported path. The technique:

- **Replace the generator's stylesheet from scratch — do NOT override it.** Writing
  a few overrides on top of the default theme is whack-a-mole: generators hard-code
  light backgrounds on `body`/`section`/`nav`/tables, and your overrides leak
  (white content panels, unstyled sidebars). **Author one fairyfox-themed stylesheet
  and have the build swap it in for the generator's default** (e.g. overwrite
  docdash's `styles/jsdoc.css`). Use the bundled
  [`reference/main.css`](reference/) and [`11-measurements-reference.md`](11-measurements-reference.md)
  as the exact source.
- **Inject the shared chrome into the generator's *own* layout — don't overlay a
  separate bar.** A bolted-on sticky header fights a generator's fixed sidebar
  (overlap, horizontal scroll). Instead inject the **Fairy Fox brand + Home link** (the
  way home — no separate back-button) **into the generator's persistent sidebar/DOM**
  (most generators expose a `scripts`/template hook). Work *with* the generator's
  structure, not on top of it.
- **Verify your assets actually land in the output.** A generator may *reference*
  your custom CSS/JS in every page's `<head>` but **not copy the files** into the
  build (the docdash `scripts` gotcha → 404s in CI). Make the build step copy your
  theme files (and any logo) into the output directory, and confirm they're there.
- **Lead with the project's own brand** in that injected sidebar's sub-brand — that's
  the [project-forward branding](05-navigation-and-cross-linking.md) the standard
  expects; the shared chrome (theme + brand/Home link) carries the mesh connection.

Per-generator landmines to expect: hard-coded light backgrounds (forces full
replacement, not overrides); fixed-sidebar layouts (inject into them, don't overlay);
asset references that aren't deployed (copy them in the build). A ready-to-adapt
starter skin may live in [`reference/`](reference/) over time — until then, the
`reference/main.css` snapshot is your source of exact values.

### Generated-docs hygiene — audit these often

Generators re-scan on every build and quietly re-introduce these; **check them on a regular
cadence, not once:**

- **The generator's sidebar lists only API pages.** Most generated reference sites have their
  own left sidebar. It must contain **only the API reference** (namespaces, classes, members) —
  **not** the chrome's primary-nav or subnav items, and not the hand-authored pages (Notes,
  Tutorials, Changelog, Download). Those live in the **chrome nav + subnav**, never duplicated
  into the generator's sidebar. Non-API entries **leak** into that sidebar easily (a generator
  picks up a stray tutorial or index) — audit it and prune anything that isn't API.
- **Use the chrome footer — kill the generated one.** The generator's own footer (Doxygen's
  timestamp bar, JSDoc's "Documentation generated by…" line, etc.) must be **removed entirely**
  and replaced with the shared [`chrome/footer.html`](chrome/footer.html). No generated footer
  should render at all — one footer, the chrome's.
- **Notes are one "Notes" item, fully navigable within it.** If a project renders its living
  `notes/` tree on the site (often as a generator's "tutorials"), it is reached through a
  **single `Notes` subnav item** and is **fully navigable inside that section** (its own index /
  in-section sidebar linking every note). Do **not** scatter the notes across several subnav
  links, and do not leave any note unreachable. One door labelled Notes; everything browsable
  behind it.

- Either case: don't hand-maintain what a generator produces — generate it, theme
  it, and (Case A) boundary it or (Case B) make it the themed site.

## Downloads — a real page when a project offers downloads {#downloads-a-real-page-when-a-project-offers-downloads}

If a project offers **downloads** — installers, binaries, packaged builds, release assets — it
**must** have a dedicated **Downloads page**, linked as **Download** in the
[canonical subnav](05-navigation-and-cross-linking.md#the-canonical-project-subnav-structure).
A project with no downloads simply omits it.

- **Source downloads from GitHub, not a divorced copy.** Link to the project's **GitHub
  Releases** — the release page and/or specific release assets — or, where appropriate, direct
  links to those assets. GitHub Releases is the source of truth; don't hand-host binaries that
  can drift from the tagged release.
- **A perma-"latest" section where latest-links exist.** If the project can produce stable
  *always-current* URLs (e.g. GitHub's `releases/latest` page, or
  `releases/latest/download/<asset>` for a fixed asset name), build a clean **Latest** section
  around them: one obvious "get the latest build" area, with a row per platform/artifact, that
  never needs hand-editing on each release. Follow it with a link to **all releases** (and older
  versions) for people who need a specific one.
- **Comfortably formatted, not a URL dump.** Group by platform, label each artifact clearly
  (what it is, which OS/arch, and — where it helps — size and release date). It should read as a
  designed page, not a bare list of links (see the page-quality bar below).
- **Kept current is mandatory.** The visible version, asset names, and platform coverage must
  match the actual latest release. If you *didn't* use perma-latest links, updating the Downloads
  page is part of shipping a release. Stale or broken download links are a compliance failure.

## Notes on the site — a landing + a sidebar {#notes-on-the-site-a-landing--a-sidebar}

**A project's notes are published as a fully navigable, polished on-site interface — never an
external GitHub link.** This is one of the most-botched sections, so it's spelled out hard.
Making the **Project Notes** subnav item point at `github.com/…/tree/main/notes` is a
**failure**: that raw file tree is not themed, not readable, and dumps the visitor out of the
site. (The subnav's right-hand `Notes ↗` link may go to GitHub as a *supplement*; the **centre
Project Notes item must be the on-site interface.**) A disconnected pile of links is equally a
failure — the whole point is that it's comfortable to read and easy to move around.

The shape, reached from the single **Notes** subnav item and **fully navigable**:

- **A landing page = the root note, then jump-off points.** The Notes landing opens with the
  **root/status note itself** — a short readable intro (e.g. *"Living documentation for the
  codebase — start with Status, then explore by section."*) — and then, **after that prose**, a
  set of **section cards/buttons** that jump to each part of the notes (Status, Session Logs,
  Changelog, Context, System Map, Reference, Decisions, Plans, Notes System, reports, …), each a
  comfortable card with a one-line description. Root text first, jump-off points after — not a
  bare wall of links.
- **A persistent, scrolling sidebar lists every note**, organised **by category**, present on
  every Notes page, so the whole tree is reachable from anywhere inside Notes. It **scrolls
  independently** of the content and marks where you are.
- **Nested categories navigate in *and* back out.** Where notes nest (a section with
  sub-pages), the sidebar lets you drill **into** a category and **back out** of it — you can
  always climb back up the tree, never get stranded down a branch. Navigation is real and
  two-way, not a flat dead-end list.
- **The sidebar contains notes only.** It must **not** include the project **README / overview**
  — that is what the **Overview** (project-name) subnav item is for — and must not pull in the
  chrome nav/subnav, API pages, or other non-note pages. These **leak** in easily; prune them.
- **Reader settings work, and apply in the content pane.** An individual **note page is
  readable** → it carries `data-read` so the reading controls (line spacing + width) apply to
  the **content column**. This is frequently wired wrong or not at all — verify the reader menu
  actually reflows a note page. The Notes **landing/index and the sidebar are navigation, not
  reading** → they do **not** carry `data-read`. Same for legal pages: each legal page is
  readable (`data-read`); a bare link index is not.
- **It has to look good.** Themed cards, real headings and spacing, a readable measure in the
  content pane, the shared type and palette — a designed, polished section, not a functional-
  but-ugly link list. The [page-quality bar](#page-quality-comfortable-formatted-connected)
  applies in full.

The [reader reading-page gating](05-navigation-and-cross-linking.md) and the
[no-orphan quality bar](#page-quality-comfortable-formatted-connected) both apply here: notes are
comfortable to read and always navigable, never a raw dump.

## Page quality — comfortable, formatted, connected {#page-quality-comfortable-formatted-connected}

Wearing the chrome is necessary but not sufficient: **every page a project publishes must be a
real, well-made page.** The bar, spelled out:

- **No disconnected / orphan pages.** Every page is reachable from the
  [subnav](05-navigation-and-cross-linking.md#the-canonical-project-subnav-structure) or from
  within another page, and knows where it sits (subnav `.active`, optional breadcrumb). There
  must be **no page you can only reach by guessing a URL**, and no dead-ends with no way onward.
- **No "Related"-style link dumps.** A page titled "Related", "Links", "Misc", "More", etc. that
  is just a slop of raw `<a>` tags with no formatting or context is **not allowed**. If links
  belong together, present them as a **designed** surface — grouped cards or lists *with
  descriptions*, comfortably laid out and reachable through the nav — not an unstyled pile.
- **Comfortable formatting for reading and navigation.** Readable measure, real headings and
  spacing, tables for look-ups, code blocks for code, the shared type and palette. A wall of
  unbroken text or unstyled links fails. Long index pages (a docs library, a downloads list) are
  **broken into scannable groups**, not one towering column — the reader shouldn't have to wade.
- **Only surface what belongs.** A landing or front page curates — it links to the important
  entry points, not *every* page in the project. Depth is reached by drilling in, not by dumping
  every link at the top level.
- **Kept current by the project (spell out the living parts).** The pieces of a page that state
  live facts — the version, the latest download, the changelog, the status/lifecycle, the "last
  updated" on legal pages — are the project's standing responsibility to keep accurate as part of
  every release, the same default-maintenance posture the mesh uses for notes and changelogs. A
  page that looks maintained but states a stale version misleads the user and fails.
- **Generated pages are held to the same bar.** A raw generator index (JSDoc/Doxygen output)
  must be themed and boundaried (above), never left as a public page outside the chrome.

The whole point: a visitor should be able to move around a project comfortably, always know where
they are and how to get home, and never land on a rough, orphaned, or out-of-date page. The
chrome carries the brand; this quality bar keeps it from being let down.

## Voice & house style

Project docs use the **public/website voice** (see
[`01-overview-and-principles.md`](01-overview-and-principles.md)): neutral,
professional, refer to the parent as **Fairy Fox** / **fairyfox.io** (not "the
system"). Keep prose direct; use tables for look-ups and code blocks for code. This
matches the documentation standard the rest of the mesh follows
([`../../standards/`](../) · the notes/documentation conventions).

## Keep it living

Treat the docs site as living documentation, updated as the project changes — the
same default-maintenance posture the mesh uses for notes and changelogs. A stale,
themed docs site still fails the user.
