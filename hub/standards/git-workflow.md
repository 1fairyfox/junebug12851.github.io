# Standard: Git Workflow

Canonical, project-agnostic git standards. A project adopts this by copying it
(and following it); project-specific notes can link back here.

**Goal: a clean, faithful, low-risk history.** Prefer a dull, flat repo over a
clever, screwed-up one.

## Branches

- **`main`** — stable, releasable/deployable, pushed. **Never commit directly.**
  Moves only by **fast-forward** to a good `dev` commit.
- **`dev`** — development. Commit **early and often.** This is the branch the hub
  and other projects track when syncing.
- **No feature branches** by default (solo/early). Add one only for a large/risky
  change; FF/merge back and delete it after.

## Merging — fast-forward only

Because `main` is never committed to directly, `dev` is always ahead, so
`dev → main` is always a fast-forward:

```sh
git checkout main && git merge --ff-only dev && git push origin main && git checkout dev
```

Linear history, every original commit preserved. **Do not** squash, rebase, or
reorder pushed history.

## Pushing

Push on every commit — early and often. `git push origin dev` after each commit;
FF + push `main` after a green checkpoint ("green" = builds + tests/checks pass).

## Commits

- One **logical, focused** change per commit.
- `type: summary` — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `build:`,
  `chore:`, `content:`, `style:`. Short body when the *why* isn't obvious.
- **Changelog rides inside the commit** (see the versioning + notes-system
  standards): write the entry, stage it in the same commit. No separate
  "document the last commit" commits.
- **Keep `VERSION` current in the same commit** when warranted.

## Hard safety rules

- **Never** `push --force` / force-with-lease / rewrite pushed history.
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a branch **without an
  explicit request.**
- **Stage specific files**, never `git add -A`/`.`. Keep build artifacts and any
  `assets/references/` clones out (git-ignore them).
- Inspect `git status` before and after — every time.
