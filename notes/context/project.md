# Project Overview

## What It Is

`fairyfox.io` — the personal home page and project **hub** of Fairy Fox
(GitHub `1fairyfox`). It is two things at once:

1. **A website** — a clean, fast Jekyll site that serves as the front door to my
   work: a home page, a generated projects list, a blog, and an about page.
2. **A hub** — the central repository for the standards, templates, and structure
   that my projects share. Other repos pull from it; it reads them back.

## Goals

- **A real front door.** One current place that says what I'm building and links
  straight to it — instead of scattered repos with no index.
- **Low-friction writing.** Deploys itself on every push, so updating costs
  nothing. Blog posts include automatic round-ups when my repos change.
- **Shared scaffolding, not copy-paste rot.** Conventions live once, in `hub/`,
  and projects pull them on demand — so I stop reinventing the same structure.
- **Self-documenting.** Anyone (me later, or an AI cold-opening the repo) can get
  oriented from `README.md` → `CLAUDE.md` → `notes/` without anything trapped in
  my head.

## Why this matters (the bigger picture)

This is more than a homepage. It's a deliberate, heartfelt attempt to bring a
whole body of work together under one **overarching, loosely coupled system** — to
resurface dormant projects and give everything a single connected home. The
long-term aim is a **mesh**: a layer over all the projects, communicating through
cleanly decoupled, non-recursive channels (the hub's pull-only, on-request sync
model is the seed of it), eventually scaling to manage a large set of projects
end to end. The experience to build toward is an integrated, interconnected
landing page — posts, **live/workable examples**, updates, and deep interlinked
docs, all woven together.

Two things follow for how we work on it: quality is **mandatory** (rich, careful,
polished — never dry or minimal for its own sake), and the assistant's standing
role is to be the **persistent systems-management layer** that keeps the system
stable and current across sessions, so the work persists. The neutral
documentation voice (below / in `principles.md`) is about *not boasting* — it is
not a license to do less; the care should be obvious. Longer-term ambitions live
in [`../plans/future.md`](../plans/future.md).

## Hosting

- **Repo:** `1fairyfox/junebug12851.github.io` — created as a GitHub *user site*
  under the old account name; the account is now **`1fairyfox`** and the repo kept
  its name, so it serves the root through the custom domain rather than through a
  `<username>.github.io` host.
- **Custom domain:** `fairyfox.io` via the committed `CNAME` (DNS → GitHub Pages).
- **Build/deploy:** GitHub Actions (`.github/workflows/pages.yml`) builds with
  Bundler + Jekyll and deploys to Pages on every push to `main`.

## Repository

https://github.com/1fairyfox/junebug12851.github.io  (served at https://fairyfox.io)

## Related projects (referenced by the hub)

The canonical list lives in [`../../hub/registry.yml`](../../hub/registry.yml)
(machine) and [`../../_data/projects.yml`](../../_data/projects.yml) (site-facing)
— keep those in step; this is the narrative view, pulled from each project's own
`notes/`. Three projects sit around the hub:

- **[pokered-save-editor-2](https://github.com/1fairyfox/pokered-save-editor-2)**
  — a desktop save-file editor for Pokémon Red & Blue, built in **Qt 6 (C++/QML)**
  over a four-layer architecture (`common → db → savefile → app`) with byte-exact
  save read/write as its prime value. Originated 2019–2020 (~592 commits, last
  pushed March 2020) and **revived in 2026**; currently **`0.14.2-alpha`**,
  functional and in a UI-polish phase, with a comprehensive QtTest/CTest suite
  (~90% library coverage), a clang-tidy/cppcheck static-analysis layer, and CI.
  **This is where the hub's shared conventions came from** — it adopts the hub,
  uses the shared living-notes system, and is pulled into `assets/references/`.

- **[pokered-save-editor](https://github.com/1fairyfox/pokered-save-editor)**
  — the **predecessor** (v1): the original editor in **Electron + Angular
  (TypeScript)**, Apache-2.0. Complete and stable (final release **`2.0.1`**, last
  active 2019), no longer developed — but the **recommended working tool until the
  Qt 6 rewrite reaches parity**. It sits **outside the standards/sync mesh**:
  default branch `master`, does not adopt the hub, no shared notes system, and is
  **not** cloned into `assets/references/`. Listed for completeness and linking.

- **[random-ai-prompt](https://github.com/1fairyfox/random-ai-prompt)**
  — a **Node.js** generator of random/dynamic text prompts for **Stable Diffusion**
  that can also drive the SD WebUI `--api` to produce images, animations, and
  upscales. It runs as a CLI and an Express + Pug web UI over one shared core, plus
  a newer **React + Vite SPA** (`web-app/`). Started 2022 (CommonJS), dormant after
  April 2023, then **modernized in June 2026** (2.0.0: ES modules, Node 24 LTS,
  dependencies to current majors); currently **`2.6.0`**, with a Vitest + Playwright
  test suite, a JSDoc doc-site, and a dynamic-prompt language (DPL). It adopts the
  hub, uses the shared living-notes system, and is pulled into `assets/references/`.

## Developer

Built by Fairy Fox. Open source.
