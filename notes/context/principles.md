# Principles

What this project values and what to avoid. These are the standing guardrails;
specifics live in the reference files.

## What the site should feel like

- **Fast and quiet.** A static site that loads instantly, reads well on a phone,
  and respects light/dark. No heavy frameworks, no tracking, no clutter.
- **Always current.** The projects list, blog, and feeds are generated, so they
  never drift. Adding a project is one edit to `_data/projects.yml`.
- **Personal, not corporate.** It's a den, not a landing page. Warm, plain voice.

## What the repo should feel like

- **Self-documenting.** A newcomer (human or AI) gets oriented from
  `README.md` → `CLAUDE.md` → `notes/status.md` with nothing trapped in someone's
  head. The notes are a living document, kept current by default.
- **Low-risk git.** A clean, faithful, linear history: `dev` for work, `main`
  fast-forward-only and always deployable. Never rewrite pushed history. Full
  rules: [`../reference/git-workflow.md`](../reference/git-workflow.md).
- **One source of truth per fact.** The version number lives only in `VERSION`;
  the project list only in `_data/projects.yml`; shared standards only in `hub/`.
  Don't duplicate — link.

## Cross-project discipline (the hub's core rule)

- **Git only, one direction at a time.** Projects communicate with the hub solely
  through git: the hub *reads* projects (clones into `assets/references/`), and
  projects *read* the hub (pull `hub/` standards). No submodules, no live
  dependency, no build-time coupling.
- **Pull on explicit request, never automatically.** This is what prevents a
  loop where one repo's update triggers another's. A human or AI initiates each
  pull deliberately. See
  [`../reference/cross-project-sync.md`](../reference/cross-project-sync.md).
- **The hub is the source of shared standards; projects are the source of their
  own content.** Promote a convention *up* to `hub/` when it's reusable; keep
  project-specific detail *down* in the project.

## What to avoid

- **No external Jekyll theme.** Keep the layout/CSS hand-owned.
- **No secrets in the repo.** It's public.
- **Don't commit the reference clones** (`assets/references/*`) or build output.
- **Don't bump MAJOR** (`→ 1.0.0`) automatically — that's Twilight's call. See
  [`../reference/versioning.md`](../reference/versioning.md).
