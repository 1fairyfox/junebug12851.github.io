# Git Workflow & Standards

The git standards for this repo. The overriding goal: a **clean, faithful,
low-risk** history — "a dull flat repo over a screwed-up one."

> This is this repo's copy of the shared standard. The canonical, project-
> agnostic version (the one other repos adopt) is
> [`../../hub/standards/git-workflow.md`](../../hub/standards/git-workflow.md).
> Keep them in step; promote changes up to the hub.

## The model: full git-flow — the model, not the scripts

This repo runs **git-flow** (Driessen's branching model) **in full**, as far as
makes sense here — its branch roles, feature flow, and release/hotfix flows are the
standard, not a stripped-down subset. It does **not** use the `git flow` CLI
extension or wrapper scripts: plain `git` carries the whole model, and these are
**procedures the AI working in the repo upholds** by judgement, not automation —
standardize the *policy*, not a script. This replaces the old lean `dev → main`
fast-forward habit, which was only a thin shadow of git-flow; git-flow is the
fuller, sturdier foundation.

## Branches

Two long-lived branches, three kinds of short-lived support branch — all
first-class.

- **`main`** — production; every commit on it is a **tagged release** (always by
  `--no-ff` merge). **Never commit directly.** It advances at a release — a **PATCH**
  goes **directly from `dev`**, a **MINOR/MAJOR** through a **`release/*`** branch — or
  by a **`hotfix/*`** merge. Every push to `main` triggers the Pages deploy, so `main`
  must always build green. `main` is mandatory mesh-wide — `master` is not used (a
  project on `master` renames it; this repo is already on `main`). Full procedure: the
  [git-workflow standard](../../hub/standards/git-workflow.md#master--main-is-mandatory).
- **`dev`** — the **integration branch** (git-flow's `develop` role; we keep the
  shorter name `dev`). Finished work lands here first. Also the branch other repos
  and the hub track when they pull (see [`cross-project-sync.md`](cross-project-sync.md)).
- **`feature/<name>`** — the normal unit of work: branch from `dev`, build, merge
  back into `dev` (`--no-ff`), delete. Never off `main`.
- **`release/<x.y.0>`** — the release mechanism **for MINOR/MAJOR** (a milestone):
  branch from `dev`, finalize (VERSION bump, changelog, polish), merge into `main` +
  tag **and** back into `dev` (`--no-ff` both), delete. PATCH releases skip this.
- **`hotfix/<x.y.z>`** — urgent production fix: branch from `main`, fix, merge into
  `main` + tag **and** back into `dev` (`--no-ff` both), delete.

Support-branch names use a `type/` prefix + a short kebab-case description.

## Feature flow

```sh
git checkout dev && git checkout -b feature/<name>
# … commit + push the feature branch as you go …
git checkout dev && git merge --no-ff feature/<name>   # one revertible unit
git branch -d feature/<name> && git push origin dev
```

## Release flow

**The path depends on the SemVer level** (see [`versioning.md`](versioning.md)) —
ceremony proportional to the change.

**PATCH** (default — fixes, docs, ordinary changes): release **directly** `dev → main`,
no release branch:

```sh
git checkout main && git merge --no-ff dev
git tag -a vX.Y.Z -m "vX.Y.Z"          # tag matches VERSION
git push origin main --tags            # pushing main triggers the Pages deploy
git checkout dev
```

**MINOR / MAJOR** (a milestone): through a `release/X.Y.0` branch (MAJOR is FF's call only):

```sh
git checkout dev && git checkout -b release/X.Y.0
# … bump VERSION, finish the changelog entry, last polish …
git checkout main && git merge --no-ff release/X.Y.0
git tag -a vX.Y.0 -m "vX.Y.0"          # tag matches VERSION
git checkout dev && git merge --no-ff release/X.Y.0   # carry finalizations back
git branch -d release/X.Y.0
git push origin main dev --tags
```

## Hotfix flow

```sh
git checkout main && git checkout -b hotfix/X.Y.Z
# … fix, bump VERSION (patch), changelog …
git checkout main && git merge --no-ff hotfix/X.Y.Z && git tag -a vX.Y.Z -m "vX.Y.Z"
git checkout dev && git merge --no-ff hotfix/X.Y.Z
git branch -d hotfix/X.Y.Z && git push origin main dev --tags
```

## Solo latitude

This repo is solo, so one piece of judgement applies *within* git-flow (not a lighter
model): a **trivial** change (typo, one-line doc fix) may be committed directly on
`dev` instead of a `feature/*` branch. Anything that's really a feature, or is
large/risky, takes its own branch. (The release path is **not** latitude — it's fixed
by the SemVer level: PATCH direct, MINOR/MAJOR via a `release/*` branch.)

## Merging — `--no-ff`, never rewrite

git-flow merges with `--no-ff`: features back into `dev`, `release/`/`hotfix/` into
both `main` and `dev`, and a PATCH release `dev → main`, each leave a merge commit so
the grouping stays legible and revertible (`git revert -m 1 <merge>`). **Every merge
into `main` is a tagged release.** All **additive** — never a history rewrite. We do
**not** squash, rebase, or reorder anything pushed.

## Commit messages

- One **logical, focused** change per commit.
- Imperative, structured: `type: summary` — `feat:`, `fix:`, `content:`,
  `style:`, `docs:`, `build:`, `chore:`. Short body when the *why* isn't obvious.
- **The changelog rides inside the commit.** For a substantive change, add its
  plain-English entry to the top of `notes/version/YYYY-MM.md` and stage it in the
  **same commit** (no separate "update changelog" commit). See
  [`../version.md`](../version.md).
- **Keep `VERSION` current** as part of the release — bumped on `dev` for a PATCH, or
  on the `release/*`/`hotfix/*` branch for a milestone/hotfix (PATCH default, MINOR
  milestone, never MAJOR). The release tag on `main` matches it. See
  [`versioning.md`](versioning.md).

## Hard safety rules

- **Never** `push --force`, force-with-lease, or rewrite pushed history. (git-flow's
  `--no-ff` merge commits are additive and allowed — not a rewrite.)
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a **long-lived** branch
  (`main`/`dev`) **without an explicit request.** Spent `feature/`/`release/`/
  `hotfix/` branches are deleted as the normal end of their merge.
- **Stage specific files**, never `git add -A`/`.` — keep build output
  (`_site/`, `.jekyll-cache/`) and the reference clones (`assets/references/*`)
  out (they're git-ignored anyway, but be deliberate).
- Inspect `git status` before, verify clean/expected after — every time.
