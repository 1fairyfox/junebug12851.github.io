# Standard: Git Workflow

Canonical, project-agnostic git standards. A project adopts this by copying it
(and following it); project-specific notes can link back here.

**Goal: a clean, faithful, low-risk history.** Prefer a dull, flat repo over a
clever, screwed-up one.

## The model: full git-flow — the model, not the scripts

The mesh runs **git-flow** (Vincent Driessen's branching model) **in full**, as far
as makes sense for each project — its branch roles, where work happens, and the
release/hotfix flows are the standard, not a stripped-down subset. What it does
**not** require is the `git flow` CLI extension or any wrapper scripts: plain `git`
commands carry the whole model. These are **procedures the AI working in the repo
upholds**, by judgement, not automation — standardize the *policy*, not a script.
Use the policies; skip the scripts.

This *replaces* the old lean `dev → main` fast-forward habit, which was only a
thin shadow of git-flow. git-flow is the fuller, sturdier starting point: adopt as
much of it as the project can meaningfully use.

## Branches

git-flow has **two long-lived branches** and **three kinds of short-lived support
branch**. All are first-class — the support branches are the normal way work flows,
not exceptions.

- **`main`** — production. Every commit on `main` is a **tagged release**. **Never
  commit directly**, and `dev` is **never merged straight in**: `main` advances
  *only* by merging a **`release/*`** or **`hotfix/*`** branch (`--no-ff`), then
  tagging. **The stable branch must be named `main`** — `master` is not used in the
  mesh (see below).
- **`dev`** — the **integration branch** (git-flow's `develop` role; we keep the
  shorter name `dev`). All finished work lands here first. This is the branch the
  hub and other projects track when syncing.
- **`feature/<name>`** — the **normal unit of work**. Branch from `dev`, build the
  feature, merge **back into `dev`** with `--no-ff`, then delete. Never branch a
  feature off `main`.
- **`release/<x.y.z>`** — the **release mechanism**. Branch from `dev` when a
  release is ready to bake; do the release work on it (final polish, version bump,
  changelog), then merge **into `main`** + tag **and** back **into `dev`**
  (`--no-ff` both), then delete.
- **`hotfix/<x.y.z>`** — an **urgent production fix**. Branch from `main`, fix,
  then merge **into `main`** + tag **and** back **into `dev`** (`--no-ff` both),
  then delete.

Support-branch names use a **`type/` prefix** (`feature/`, `release/`, `hotfix/`)
plus a short kebab-case description.

## Developing a feature

```sh
git checkout dev
git checkout -b feature/<name>
# … commit work on the feature branch, push it to back it up …
git checkout dev
git merge --no-ff feature/<name>     # preserves the feature as one revertible unit
git branch -d feature/<name>
git push origin dev
```

The `--no-ff` merge commit keeps the feature's commits grouped under one parent, so
the feature is legible in history and revertible in one move
(`git revert -m 1 <merge>`).

## Cutting a release

Releases go through a **`release/*`** branch — `main` is only ever updated this way
(or by a hotfix). This is what keeps a release a deliberate, reviewable event.

```sh
git checkout dev
git checkout -b release/X.Y.Z
# … finalize: bump VERSION, finish the changelog entry, last polish …
git checkout main
git merge --no-ff release/X.Y.Z
git tag -a vX.Y.Z -m "vX.Y.Z"        # tag matches VERSION
git checkout dev
git merge --no-ff release/X.Y.Z      # carry the release finalizations back
git branch -d release/X.Y.Z
git push origin main dev --tags
```

## Hotfixes

A production problem that can't wait for the next `dev` cycle is fixed on a branch
cut from `main`, then folded back into both lines:

```sh
git checkout main
git checkout -b hotfix/X.Y.Z
# … fix, bump VERSION (patch), changelog …
git checkout main
git merge --no-ff hotfix/X.Y.Z
git tag -a vX.Y.Z -m "vX.Y.Z"
git checkout dev
git merge --no-ff hotfix/X.Y.Z
git branch -d hotfix/X.Y.Z
git push origin main dev --tags
```

## Solo / small-project latitude

git-flow assumes a team; most mesh projects are solo and small, so apply judgement
(this is *latitude within* the model, not a lighter model):

- A genuinely **trivial** change (a typo, a one-line doc fix) may be committed
  directly on `dev` rather than via a `feature/*` branch — anything that is really
  "a feature," or is large/risky, gets its own branch.
- For a **routine release** of accumulated `dev` work where a `release/*` branch
  would only hold a version bump for a moment, merging `dev → main` directly
  (`--no-ff` + tag) is acceptable. Spin up a real `release/*` branch whenever the
  release needs staging, coordination, or review.

Prefer the full flow for anything substantive; reach for the shortcuts only when the
ceremony would buy nothing.

### `master → main` is mandatory

Every project in the mesh uses **`main`** as its stable branch. A project still on
**`master` must rename it to `main`** as part of adoption — this is required, not
optional. Do it the safe way (a rename, never a history rewrite):

```sh
git branch -m master main          # rename locally
git push -u origin main            # publish main
# On GitHub: Settings → Branches → set default branch to `main`,
#            then delete the old origin/master once nothing references it.
```

Then update the references that named the old branch: the **Pages source branch**,
any **CI/release workflow** `on: push` branch filters, and any `tree/master/…` URLs
(e.g. the registry's `notes:` link). GitHub keeps redirects for most links, but fix
the explicit references. The registry's `branch` field tracks the **work** branch
(`dev`) and is unaffected by this rename.

## Merging — `--no-ff`, never rewrite

git-flow merges with `--no-ff`: features back into `dev`, and `release/`/`hotfix/`
branches into both `main` and `dev`, each create a merge commit, so the
feature/release grouping stays legible and revertible as a unit. `main` carries
only release/hotfix merges, each tagged. This is all **additive** — it never
rewrites history. **Do not** squash, rebase, or reorder anything already pushed;
every original commit is preserved through every merge.

## Pushing

Push early and often — don't leave work only on the local machine. Push feature
branches as you go (backup), `git push origin dev` when work lands, and push `main`
with `--tags` at a release after a green checkpoint ("green" = builds +
tests/checks pass).

## Commits

- One **logical, focused** change per commit.
- `type: summary` — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `build:`,
  `chore:`, `content:`, `style:`. Short body when the *why* isn't obvious.
- **Changelog rides inside the commit** (see the versioning + notes-system
  standards): write the entry, stage it in the same commit. No separate
  "document the last commit" commits.
- **Keep `VERSION` current** as part of the release (a `release/*` or `hotfix/*`
  branch is the natural place to bump it); the release tag on `main` matches it.

## Hard safety rules

- **Never** `push --force` / force-with-lease / rewrite pushed history. (git-flow's
  `--no-ff` merge commits are additive and allowed — they are not a rewrite.)
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a **long-lived** branch
  (`main`/`dev`) **without an explicit request.** Spent `feature/`/`release/`/
  `hotfix/` branches are deleted as the normal end of their merge.
- **Stage specific files**, never `git add -A`/`.`. Keep build artifacts and any
  `assets/references/` clones out (git-ignore them).
- Inspect `git status` before and after — every time.
