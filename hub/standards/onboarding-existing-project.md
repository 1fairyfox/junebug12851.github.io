# Onboarding an Existing Project — folding an established repo into the mesh

How to bring a project that **already exists with its own life** — its own
history, README, structure, version scheme, maybe its own docs — into the hub
mesh for the first time. The job here is to **reconcile, not clobber**: layer the
shared standard onto a living repo without rewriting it.

> Canonical, project-agnostic version (the one other repos copy). Sibling
> runbooks: [`new-project-setup.md`](new-project-setup.md) for a *greenfield*
> repo (blank tree), and [`adopting-updates.md`](adopting-updates.md) for pulling
> *later* hub changes once a project is already in. The model behind all three:
> [`cross-project-sync.md`](cross-project-sync.md).

For AI or human. Use this one when the repo predates its membership — there's
existing work on disk you must respect.

## When this is the right runbook

| You have… | Use |
|-----------|-----|
| An empty/new repo you're standing up | [`new-project-setup.md`](new-project-setup.md) |
| **An established repo (own history/README/docs/version) joining for the first time** | **this doc** |
| A project already in the mesh, pulling newer hub changes | [`adopting-updates.md`](adopting-updates.md) |

A project can also legitimately stay **fully outside** the mesh (follows none of
the standards, isn't registered, isn't referenced). Onboard only when the project
should actually participate.

## The end state

Identical to greenfield — see the checklist in
[`new-project-setup.md`](new-project-setup.md#what-fully-set-up-means). The
difference is purely the **path**: every step below is "fit the standard to what's
already here," not "create from blank."

## The governing rule

**Reconcile, don't overwrite.** The repo already encodes decisions — a version
number, a branch model, a README, possibly docs. Adopt the standard by folding it
*around* those, keeping what's good and recording any deliberate divergence. A
blind template copy that flattens existing work is the failure mode this runbook
exists to prevent.

## Steps

### 1. Survey what already exists (before touching anything)

Inventory the repo so you adopt onto reality, not over it:

- **Branch model** — what's the default branch? `main`? `master`? Anything else?
- **Versioning** — is there a `VERSION`, git tags, a `package.json` version, a
  changelog already?
- **Docs** — existing `README`, a `docs/` or wiki, any AI-context file?
- **Ignores / license / CI** — an existing `.gitignore`, `LICENSE`, workflows.

### 2. Decide the branch model — adopt, don't force

The mesh tracks **`dev`** (work) fast-forwarding to **`main`** (stable). If the
repo already fits or can move cheaply, adopt it. **If it lives on `master` and a
rename would be disruptive** (published URLs, others' clones, CI wired to it),
**don't force it** — record the *real* branch in the registry instead and adopt
the rest. The standard is the default, not a mandate that justifies risky history
surgery.

### 3. Pull a read-only copy of the hub

```sh
mkdir -p assets/references
git -C assets/references clone --depth 1 --branch dev \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io
```

Git-ignored, read-only — never a submodule (see step 4 for the ignore line).

### 4. Adopt the templates by reconciliation

Fold each template in around what's there — never a straight overwrite:

| Template | If absent | If something already exists |
|----------|-----------|-----------------------------|
| `CLAUDE.md` | Copy it in and fill out the project identity. | Fold the standard's structure into the existing AI-context file; keep the project's real landmines/build steps. |
| `VERSION` | Create it — but **seed it from the project's actual version** (latest tag / `package.json`), *not* `0.1.0`. Reconcile the scheme toward SemVer. | Leave the real number; just confirm it matches the SemVer rule. |
| `.gitignore` | Add the `assets/references/` ignore (+ cruft). | **Merge** the `assets/references/` line in; don't replace the existing file. |
| `notes/` skeleton | Drop the skeleton in and seed `status.md` from reality. | Add the skeleton *alongside* existing docs; migrate them in over time, not big-bang. |

### 5. Map existing docs into the notes system

Don't duplicate — **relocate or link.** The existing `README` stays the repo
tour; fold deeper material into the `notes/` tree (status, context, reference) and
link out rather than copy. One fact, one home.

### 6. Register with the hub *(hub-side change)*

A commit **in the hub repo**, not the project:

- Add the entry to [`hub/registry.yml`](../registry.yml) — and set **`branch` to
  the project's real branch** (from step 2), not a wishful `dev`.
- Set `adopts_hub` / `notes_system` **honestly** — partial adoption is fine and
  normal for an existing repo; mark what's actually true today.
- Add the companion row to the site's `_data/projects.yml`.

### 7. Commit on the project's working branch, then fast-forward

Stage specific files (never `-A`; never `assets/references/*`):

```sh
git add CLAUDE.md VERSION .gitignore notes
git commit -m "chore: onboard into hub mesh (adopt standards + notes)"
git push origin <work-branch>
# if on the dev/main model:
git checkout main && git merge --ff-only dev && git push origin main && git checkout dev
```

## Partial adoption is fine

An established repo rarely adopts everything on day one — it might take the notes
system now and the full git model later. That's expected: onboard incrementally,
mark the registry flags honestly, and tighten over subsequent passes via
[`adopting-updates.md`](adopting-updates.md). Joining the mesh is a direction, not
a single switch.

## Verify

- `git status` clean; `assets/references/` untracked/ignored.
- Nothing pre-existing was clobbered — README, license, CI, and history intact.
- `VERSION` reflects the project's **real** version, not a reset to `0.1.0`.
- The registry `branch` matches the repo's actual default branch.
- The project resolves in **both** registries with honest `adopts_hub` /
  `notes_system` flags.

## Gotchas

- **Never rewrite history to fit the standard.** No force-push, no rebase of
  published commits, no branch deletion without an explicit request.
- **Don't reset the version.** Carry the existing number forward.
- **Don't force a `master → main` rename** just for tidiness — record the real
  branch and move on.
- **Honesty over completeness** in the registry — a half-adopted project is a real
  state worth recording accurately.
