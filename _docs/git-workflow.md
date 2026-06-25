---
title: Git workflow
nav_title: Git workflow
category: standards
order: 1
summary: The shared git-flow branch model, no-fast-forward merges, and the safety rules used across repositories.
---

The shared git standard favours a clean, faithful, low-risk history. The mesh
follows **git-flow** — Vincent Driessen's branching model — for its procedures and
policies, not the `git flow` scripts: plain `git` commands carry the whole model,
upheld by judgement rather than automation. Its canonical machine copy lives in the
repository at `hub/standards/git-workflow.md`; this page is the readable summary.

## Branches

Two long-lived branches and three kinds of short-lived support branch — all
first-class, not exceptions.

- **`main`** is production; every commit on it is a tagged release, always made with
  `--no-ff`. It is never committed to directly. It advances at a release — a **PATCH**
  goes directly from `dev`, a **MINOR or MAJOR** through a `release/*` branch — or by a
  `hotfix/*` merge. On the hub, every push to `main` triggers a deployment. The stable
  branch must be named `main`; `master` is not used in the mesh.
- **`dev`** is the integration branch (git-flow's `develop` role), where finished
  work lands first. It is also the branch the hub and other repositories track when
  they sync.
- **`feature/<name>`** is the normal unit of work: branched from `dev`, built, then
  merged back into `dev` with `--no-ff` and deleted.
- **`release/<x.y.0>`** is the release mechanism for a **MINOR or MAJOR** release:
  branched from `dev` to finalize it (version bump, changelog, last polish), merged
  into `main` and tagged, carried back into `dev`, then deleted. A PATCH skips this.
- **`hotfix/<x.y.z>`** is an urgent production fix: branched from `main`, then
  merged into both `main` (tagged) and `dev`, and deleted.

## No-fast-forward merges

Every merge uses `--no-ff`, so each feature or release stays a legible, revertible
unit in the history, and every merge into `main` is a tagged release. The release
path follows the SemVer level: a **PATCH** releases accumulated `dev` work directly,

```sh
git checkout main && git merge --no-ff dev && git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin main --tags && git checkout dev
```

while a **MINOR or MAJOR** goes through a `release/X.Y.0` branch. The merge commits
are additive — history is never squashed, rebased, or rewritten once pushed. On a
small solo project there is one piece of latitude *within* the model: a truly
trivial change may be committed straight on `dev` rather than on a `feature/*` branch.

## Commits

Each commit is one focused change with a `type: summary` message (`feat`, `fix`,
`docs`, `content`, `build`, `chore`, and so on). Where a change warrants it, its
changelog entry and any version bump are made in the **same commit** rather than
in a follow-up.

## Safety rules

Force-pushing, history rewriting, hard resets, rebases, and deleting a *long-lived*
branch (`main` or `dev`) are not performed without an explicit request; spent
`feature/`, `release/`, and `hotfix/` branches are deleted as the normal end of
their merge. Files are staged individually rather than with `git add -A`, so build
output and reference clones stay out of history.
