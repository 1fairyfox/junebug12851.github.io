# fairyfox.io — AI Context

Personal home page **and** cross-project hub for Twilight (github.com/junebug12851).
A clean, custom Jekyll site deployed to GitHub Pages by GitHub Actions, plus the
shared standards/templates that tie my repositories together. Served at
`junebug12851.github.io` and the `fairyfox.io` custom domain.

## Start Here

Read `notes/status.md` first — current state, what's in flight, what's next.

The full notes system is in `notes/` (map: `notes/README.md`). Quick index:

| File | What's in it |
|------|-------------|
| `notes/status.md` | **Current state** — start here |
| `notes/sessions/` | Per-day session logs (`YYYY-MM/YYYY-MM-DD.md`, newest on top) |
| `notes/version.md` | Changelog (plain-English, per commit; months under `version/`) |
| `notes/context/` | `project.md` · `architecture.md` · `principles.md` |
| `notes/systems/overview.md` | The system map (site · blog · hub · sync) |
| `notes/reference/` | `git-workflow` · `versioning` · `deployment` · `documentation` · `cross-project-sync` · `blogging-workflow` |
| `notes/decisions/` | `architecture.md` (choices) · `rejected.md` (don't repeat) |
| `notes/plans/` | `next-steps.md` · `future.md` |
| `hub/` | The cross-project standards, templates, and project registry |

## Critical Things Not to Get Wrong

- **Use PowerShell + the editor tools, NOT the bash/sandbox.** The Cowork bash
  sandbox is unreliable here (stale/truncated reads, can corrupt data). All shell
  work goes through PowerShell on the real Windows machine; file work through
  Read/Write/Edit.
- **Never commit `assets/references/*`** — those are read-only shallow clones of
  OTHER repos (git-ignored). Committing them nests repos and bloats history.
- **`notes/`, `hub/`, and `assets/references/` are excluded from the site** in
  `_config.yml`. If you add a top-level folder that shouldn't publish, exclude it.
- **One source of truth per fact:** version → `VERSION`; project list →
  `_data/projects.yml` (+ `hub/registry.yml`); shared standards → `hub/`. Don't
  duplicate; link.
- **Don't bump MAJOR** (`→ 1.0.0`) — Twilight's call only.
- **Cross-project pulls are on-request only, never auto-chained** (anti-recursion;
  see `notes/reference/cross-project-sync.md`).

## Build / Run

You CAN build, run, commit, and push — via **PowerShell** on the local machine
(git + the `gh` CLI are installed and authed as `junebug12851`; Ruby/Jekyll are
installed locally for build checks). CI builds regardless of the local setup.

```sh
bundle install
bundle exec jekyll serve     # local preview at http://127.0.0.1:4000
JEKYLL_ENV=production bundle exec jekyll build   # production-equivalent build
```

Deploy is automatic: every push to `main` runs `.github/workflows/pages.yml`
(Bundler + Jekyll → Pages). See `notes/reference/deployment.md`.

## Default Workflow — Do These By Default (a standing instruction)

After making changes, without being asked:

1. **Build-check** the site (`jekyll build`); fix any errors before shipping.
2. **Commit + push on `dev`**, staging specific files (never `git add -A`). The
   **changelog entry rides inside the commit** (top of `notes/version/YYYY-MM.md`,
   no hash marker), and **bump `VERSION`** in the same commit when warranted
   (PATCH default, MINOR milestone, never MAJOR).
3. When the build is green, **fast-forward `main`** and push:
   `git checkout main && git merge --ff-only dev && git push origin main && git checkout dev`.
   Pushing `main` triggers the Pages deploy.

**Hard safety rules:** never `push --force` / rewrite pushed history; never
`reset --hard` / `rebase` / `clean -fd` / delete a branch without an explicit
request. Inspect `git status` before and after. Full rules:
`notes/reference/git-workflow.md`.

## Maintaining the Notes — Your Responsibility

The notes are a living document — keep them current as you work, by default.

| Trigger | Action |
|---------|--------|
| Did work worth recording this session | Append to today's `notes/sessions/YYYY-MM/YYYY-MM-DD.md` (newest on top) |
| Made a substantive commit | Inline changelog entry atop `notes/version/YYYY-MM.md`, same commit |
| Health / what's-next changed | Update `notes/status.md` |
| Made / rejected a decision | `notes/decisions/architecture.md` / `rejected.md` |
| A change warrants a version | Bump `VERSION`, same commit |
| A convention becomes reusable across projects | Promote it to `hub/standards/` |

## The hub & cross-project sync

This repo is the **hub**: `hub/standards/` (canonical shared rules),
`hub/templates/` (copy-paste starters), `hub/registry.yml` (the project list).
The model is git-only, one-directional per flow, on-request: the hub reads
projects into `assets/references/` (to blog about changes — see
`notes/reference/blogging-workflow.md`), and projects read `hub/` to adopt
standards. Both track the `dev` branch. Full model:
`notes/reference/cross-project-sync.md`.
