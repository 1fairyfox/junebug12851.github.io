# Principles

What this project values and what to avoid. These are the standing guardrails;
specifics live in the reference files.

## What the site should feel like

- **Fast and quiet.** A static site that loads instantly, reads well on a phone,
  and respects light/dark. No heavy frameworks, no tracking, no clutter.
- **Always current.** The projects list, blog, and feeds are generated, so they
  never drift. Adding a project is one edit to `_data/projects.yml`.
- **Professional and clear.** A plain, direct voice — no gimmicks, no fox/fairy
  puns, no cutesy filler.
- **Neutral documentation voice.** The site is written *about* the projects and
  the work, not in the owner's first person and not as a personal brand. Refer to
  Fairy Fox by name only for attribution; never multiple lines of third-person
  praise or elevation. The site documents and indexes the work — it does not boast
  about it. Mentioning and referencing capabilities is fine; glorifying is not.
  This rule targets **ego, not passion**: the platform is heartfelt and built with
  deep care, and the craft and quality should be *maximal*. Neutral never means
  dry, minimal, or low-effort. See [`design-direction.md`](design-direction.md).

## What the repo should feel like

- **Self-documenting.** A newcomer (human or AI) gets oriented from
  `README.md` → `CLAUDE.md` → `notes/status.md` with nothing trapped in someone's
  head. The notes are a living document, kept current by default.
- **Low-risk git.** A clean, faithful history (full git-flow): `dev` for work,
  `main` advancing only by `--no-ff` **tagged** releases and always deployable.
  Never rewrite pushed history. Full rules:
  [`../reference/git-workflow.md`](../reference/git-workflow.md).
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
- **Don't bump MAJOR** (`→ 1.0.0`) automatically — that's Fairy Fox's call. See
  [`../reference/versioning.md`](../reference/versioning.md).
