# <PROJECT NAME> — AI Context

<One-line description. What it is, who builds it, current state.>
Built by Twilight (github.com/junebug12851).

## Start Here

Read `notes/status.md` first — current state, what's in flight, what to do next.

The full notes system is in `notes/` (see `notes/README.md` for the map). It
follows the shared living-notes standard. Highlights:

| File | What's in it |
|------|-------------|
| `notes/status.md` | **Current state** — start here |
| `notes/sessions/` | Per-day session logs (`YYYY-MM/YYYY-MM-DD.md`, newest on top) |
| `notes/version.md` | Changelog index (plain-English, per commit; months under `version/`) |
| `notes/context/` | `project.md` · `architecture.md` · `principles.md` |
| `notes/systems/overview.md` | The system map |
| `notes/reference/` | Quick lookups (git-workflow, versioning, …) |
| `notes/decisions/` | `architecture.md` (choices) · `rejected.md` (don't repeat) |
| `notes/plans/` | `next-steps.md` · `future.md` |

## Critical Things Not to Get Wrong

- <Project-specific landmine #1 — the stuff that has bitten before.>
- <Landmine #2.>

## Build / Run

> State capabilities honestly: which shell/tools the assistant actually has, and
> that it CAN build/test/run/commit. Don't claim a limitation that isn't real.

- <How to build.>
- <How to test.>
- <How to run.>

## Default Workflow — Do These By Default (a standing instruction)

After making changes, run this loop **without being asked**:

1. **Build / check** the change.
2. **Test** the affected area; full suite/check before FF `main`. Only proceed on
   green.
3. **Commit + push on `dev`**, staging specific files (never `git add -A`). The
   **changelog entry rides inside the commit** (top of `notes/version/YYYY-MM.md`,
   no hash marker), and **bump `VERSION`** in the same commit when warranted
   (PATCH default, MINOR milestone, never MAJOR).
4. When green, **fast-forward `main`** and push:
   `git checkout main && git merge --ff-only dev && git push origin main && git checkout dev`.

**Hard safety rules:** never `push --force` / rewrite pushed history; never
`reset --hard` / `rebase` / `clean -fd` / delete a branch without an explicit
request. Inspect `git status` before and after. Full rules: the shared
`git-workflow` standard (pulled into `notes/reference/git-workflow.md`).

## Maintaining the Notes — Your Responsibility

The notes are a living document — keep them current as you work, by default.

| Trigger | Action |
|---------|--------|
| Did work worth recording this session | Append to today's `notes/sessions/YYYY-MM/YYYY-MM-DD.md` |
| Made a substantive commit | Inline changelog entry atop `notes/version/YYYY-MM.md`, same commit |
| Health / next changed | Update `notes/status.md` |
| Made / rejected a decision | `notes/decisions/architecture.md` / `rejected.md` |
| A change warrants a version | Bump `VERSION`, same commit |

## Cross-project standards

This project pulls shared standards from the fairyfox.io hub on request — see
`notes/reference/cross-project-sync.md`. Don't add automation that pulls across
repos automatically (anti-recursion).
