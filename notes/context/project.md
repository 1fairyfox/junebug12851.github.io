# Project Overview

## What It Is

`fairyfox.io` — the personal home page and project **hub** of Twilight
(GitHub `junebug12851`). It is two things at once:

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

## Hosting

- **Repo:** `junebug12851.github.io` (a GitHub *user site* — the repo name is
  literally `<username>.github.io`, so it serves at the root).
- **Custom domain:** `fairyfox.io` via the committed `CNAME` (DNS → GitHub Pages).
- **Build/deploy:** GitHub Actions (`.github/workflows/pages.yml`) builds with
  Bundler + Jekyll and deploys to Pages on every push to `main`.

## Repository

https://github.com/junebug12851/junebug12851.github.io  (served at https://fairyfox.io)

## Related projects (referenced by the hub)

- [pokered-save-editor-2](https://github.com/junebug12851/pokered-save-editor-2)
  — Pokémon Red/Blue save editor (Qt 6 C++/QML). The source of the conventions
  this hub standardizes.
- [random-ai-prompt](https://github.com/junebug12851/random-ai-prompt)
  — Stable Diffusion prompt generator (JS) with a WebUI.

## Developer

Built by Twilight. Open source.
