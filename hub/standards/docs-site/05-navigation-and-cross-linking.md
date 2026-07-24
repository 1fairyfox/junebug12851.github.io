# 05 · Navigation & Cross-Linking

This is the part that makes a project read as **a page of fairyfox.io** — not a
separate site you traveled to. Two things carry it: the **shared chrome** (the same
header, **primary nav**, footer, and theme across every project) and the **brand/Home
link** that is always the way home. Those are required. A **submenu** for section/context
nav and richer cross-linking (footer link columns) are **recommended** — the mesh is
meant to be *flat*, not a deep web of mandatory links.

## The one-domain model

| URL | What it is |
|-----|-----------|
| `fairyfox.io/` | The main site (the hub) |
| `fairyfox.io/projects/` | The projects **index** (cards) — each links straight to a project |
| `fairyfox.io/<key>/` | The project's **own docs site / page** (themed per this standard) |
| `fairyfox.io/<key>/<...>` | Pages within the project docs site |

> **No hub-local node pages.** The hub keeps **no** per-project "node" page
> (`/projects/<key>/` was retired in `0.13.0`): a re-stated copy of a project's blurb /
> status / connections goes stale and breaks the seamless feel. A card or link leads
> **directly** to the project's own page — which already explains itself and wears the
> shared chrome, so it reads as a page of fairyfox with its own sub-navbar.

`<key>` is the repo slug. Everything is one origin — links between these are plain
same-domain links; never hard-code a different host. How a project actually lands on
this domain (GitHub Pages inherits the custom domain; set the base path to
`/<key>`): [`10-domain-and-publishing.md`](10-domain-and-publishing.md).

## Parent → child (the main site links *in*)

The main site already points at each project; a compliant project just needs to
exist at its URL so these resolve. The links the main site provides:

- **Project cards** (home, `/projects/`): the whole card links **straight through** to
  the project's own page (`fairyfox.io/<key>/`), with a secondary "Repository ↗" link.
  Projects with no hosted page fall back to the repo.
- **Docs library** (`/docs/`): an on-site doc entry per project, plus a link out to
  the project's full docs site.

A project's registry entry (`_data/projects.yml`) carries `docs:` (the docs-site
URL) and `repo:` so these render. Keep that entry accurate.

## Child → parent (the project links *back*)

### Required: the brand/Home link is the way home (no back-button)

A project wears the **shared header**, whose **brand mark and `Home` nav item link to
`https://fairyfox.io/`**. That *is* the way home — always present, by virtue of the
shared chrome. There is **no separate "← Back to Fairy Fox" control**: the project
looks and behaves like a page of fairyfox, so a back-button would be redundant and
would imply you'd left. (This **retires** the earlier required back-button — the brand/
Home link supersedes it.)

### Recommended (not required): richer links back

Add these where they fit, but their absence is **not** a compliance failure:

- A **footer** linking the project's own repo, notes, and the main-site sections.
- A **breadcrumb/locator** near the page top (`Fairy Fox / Projects / <Project>`).

### Branding: project-forward is fine — the chrome is the tie

**A project leads with its own identity** in its content and sub-brand. What keeps it
visibly a page of fairyfox is the **shared chrome** — the same header, primary nav,
footer, palette, and typography from [`02-design-tokens.md`](02-design-tokens.md). The
global brand/Home link stays in the header; the project's own name belongs in the
**submenu locator / sub-brand**, not in place of the global nav. The earlier "never
replace the Fairy Fox brand" rule is retired — the shared chrome, not brand exclusivity,
is what carries membership.

## Shared chrome: primary nav + submenu

A project does **not** invent its own header, and no longer hand-rebuilds one either.
It wears the **same chrome as the main site** by **copying the [`chrome/`](chrome/)
bundle verbatim** (see [`12-shared-chrome.md`](12-shared-chrome.md)) so there is no
visible "jump":

- **Primary nav (global, identical on every page).** Slot order:
  **Home · Projects · Farms (Stories · Games) · Docs · Updates · About** (About last).
  Stories + Games sit inside the **Farms** dropdown (a single `details.dd`); everything
  else is a plain link. These point at the main-site sections (same origin for Pages
  projects). The set and order are fixed across the mesh — don't reorder, drop, or add
  items per project. The exact markup is in [`reference/`](reference/).

  **Active state — a sub-project is always under `Projects`.** On every page of a
  standalone project's docs site, the primary-nav item marked `.active` (with
  `aria-current="page"`) is **`Projects`** — always, and **only** `Projects`, without
  exception. A project lives under Projects and nowhere else, so a project page never marks
  `Home`, `Docs`, `Updates`, or `About` active (those are the hub's own sections, not the
  project's). Do not try to map a project's Overview to `Home` or its API docs to `Docs` —
  the whole project sits under `Projects`. (The two integrated **farms**, Stories and Games,
  are the hub's own top-level slots and mark **Farms**; that is a hub concern, not a
  standalone sub-project. The "mark the current section" guidance elsewhere is about the
  hub's own pages — on a sub-project it is always `Projects`.)
- **Submenu (the section row) — a secondary row directly below the primary nav** that
  carries the **context** links and localizes you within a section. It's the same flat
  pill style as the primary nav. On the **Projects** area it lists the projects; inside a
  **project** it follows the **canonical project subnav structure** below. The primary nav
  never changes between pages; the submenu is the part that changes. Mark the current
  submenu item `.active`. A project docs site **should** carry this row.

### The canonical project subnav structure

Inside a project, the subnav has **fixed zones** but **adaptive centre membership** — the
three zones are constant; *which* centre pills appear is a function of what the project
actually has. This is deliberate: a fixed *example* read two ways produced divergence (one
project shipped a bare `Notes` pill while a sibling broke Notes into per-section doors, both
claiming "canonical"). The latitude is on **membership, not shape**.

```
[ Name=home ]  Overview · Project Notes · <section doors…> · Tutorials? · Changelog · API? · Download? · Legal?  [ Repository ↗ · Notes ↗ ]
  (overview/home)                    (the project's own doc pages — ? = include if it exists)                          (right-aligned pair)
```

- **Left — the project name**, doubling as the **overview / home** link (the project's
  README-equivalent landing page). The project sub-brand locator; *not* a replacement for the
  global brand/Home mark in the header above it.
- **Centre — in this order:**
  - **Overview** — an explicit pill also targeting the home/overview page (redundant with Home
    by design; it reads as the first "section" and matches the sibling convention).
  - **Project Notes** — the notes landing, **plus one door per NON-EMPTY notes section** the
    project has (`Systems`, `Reference`, `Context`, `Decisions`, `Plans`…). Expose exactly the
    sections that exist; an empty section is omitted, **never** a door to a 404. The generator
    emits a section landing page per section that has notes (see the adapters).
  - **The project's own pages that exist**, in order: `Tutorials?` · `Changelog` · `API?` ·
    `Download?` · `Legal?`. Name them consistently; **don't invent parallel names** for the
    same role. `Download` is **mandatory** for any project that offers downloads
    ([06 §Downloads](06-content-and-organization.md#downloads-a-real-page-when-a-project-offers-downloads));
    `Legal` is mandatory per [legal-docs](../legal-docs.md).
  - Read "include the ones that exist" **ambitiously** — build the overview/section pages a
    documented, releasing project is expected to have; do **not** satisfy the rule by shrinking
    the subnav to whatever pages happen to exist (a silent descope is a `gap`, not a pass —
    [`checklists-are-contracts`](../checklists-are-contracts.md)).
- **Right — `Repository ↗` and `Notes ↗`** as a fixed pair (`.subnav-repo`, pushed over with
  `margin-left:auto`): the GitHub repo, and a direct link to `…/tree/main/notes` (both nodes
  keep living notes in-repo). These two `↗` links are the **only** GitHub links in the subnav
  — the **centre `Project Notes` item is an on-site, themed page, never a GitHub link** (see
  the firm rule below).

**The subnav has a firm baseline — a bare subnav is a failure.** "Adaptive membership" sets
*which optional pages* appear; it is **not** licence to ship a near-empty subnav. Read it as a
floor: a documented, releasing project's subnav has, at minimum, **Overview · Project Notes
(+ a door per non-empty notes section) · Changelog · [API if the project has any API/surface —
most do] · [Download if it offers downloads] · Legal**, plus the right-hand `Repository ↗ ·
Notes ↗` pair. Shipping a subnav with one or two pills when the project plainly has notes,
a changelog, and an API is a `gap`, not a pass — **build the pages a real project should have**
rather than shrinking the subnav to whatever happens to exist. If you're unsure of the exact
markup, **copy a sibling's working subnav** (e.g. Random AI Prompt's) and adapt the items —
don't hand-invent the structure. The primary nav is fixed mesh-wide; only the subnav's centre
items are yours to fill.

**Dividers separate the three zones, not every pill.** Use the shared pill style with a divider
(or the designed spacing) **between zones** — left name │ centre pills │ right `↗` pair — not a
divider crammed between every centre item. Match the sibling markup; getting dividers "creative"
is a common way the bar ends up looking wrong.

**Active state, restated because it's still missed:** on every page of a standalone project the
active **primary-nav** item is **`Projects`** — never `Docs`, `Home`, `Updates`, or `About`
(those are the hub's own sections). Marking `Docs` active because the page is documentation is
the exact, recurring mistake — the whole project lives under `Projects`. The active **subnav**
item is the current centre pill.

Mark the current centre item `.active aria-current="page"`. **Every centre link must go to a
real, chrome-wearing, comfortably-formatted page** — never a raw generated index dumped
outside the theme, and never a raw GitHub link in the centre zone (see the quality bar in
[`06-content-and-organization.md`](06-content-and-organization.md#page-quality-comfortable-formatted-connected)).
A tiny conformance check — assert the subnav has a door for every non-empty notes section —
is the machine check that catches this divergence before a human has to.
- **Reader ("Aa") menu (required).** The header also carries the shared Kindle-style
  reader control, at the far right of the header (past the primary nav) — same on every site, wired to the
  origin-wide `fairyfox:reader` key so a theme/size/spacing/width choice carries across
  the whole mesh. See [`04-components.md`](04-components.md#reader-menu-ff-reader-btn--ff-reader-panel--required)
  and [`02-design-tokens.md`](02-design-tokens.md#the-reader-menu-required-shared-component). (The shared chrome's submenu row is live on
  the main site — `.subnav` in [`reference/`](reference/); until a project carries it,
  its section links may live in a project-local nav of the same style.)

## Seamlessness checklist (no visible "jump")

To make crossing the boundary feel like one site, match these so nothing flashes or
shifts:

- **Same header** — height (64px), sticky, translucent blur, hairline, brand on the
  left, nav on the right.
- **Same fonts, preloaded** — Fraunces/Inter/JetBrains with the same weights and the
  `preconnect`/`display=swap` setup, so type doesn't reflow on arrival.
- **Same `theme-color` metas** (light + dark) so mobile browser chrome doesn't
  change colour mid-journey.
- **Same favicon and web-manifest** family, so the tab identity is continuous.
- **Same default colour scheme behaviour** — dark-first, OS-driven light; never
  force a project to a different default than the main site.
- **No interstitial** — links between main site and project resolve directly (same
  origin), with no redirect bounce.
- **Same reader menu + shared key** — the "Aa" control and its `fairyfox:reader`
  localStorage key are identical everywhere, so the reader's theme/size/spacing/width
  choice persists unbroken as you cross between the hub and a project.

## Generated docs (two cases)

Many projects document via a generator (JSDoc, Doxygen, TypeDoc, Sphinx). There are
two distinct situations — don't conflate them:

1. **The generator is a *boundaried zone* inside a hand-authored docs site.** Reach
   it through a themed "API Reference →" link, theme it as far as the generator
   allows, and always give a way back to the themed docs.
2. **The generator *is* the whole docs site** (e.g. the docs site is JSDoc/docdash
   output). Then you don't "rhyme with" the theme from outside — you **replace the
   generator's stylesheet and inject the shared chrome (brand + Home link) into its own
   layout.** This is a first-class, fully-supported path with its own technique and
   gotchas: see [`06-content-and-organization.md`](06-content-and-organization.md#generator-based-docs-sites-the-generator-is-the-site).

Either way, the brand/Home way-home link still applies.
