# assets/references/

Read-only **shallow clones of other repositories**, pulled in on demand so this
hub can track what changed in my projects and write about it on the blog.

**Nothing in here is committed** except this README — see the repo `.gitignore`.
These are external repositories; they are not part of fairyfox.io and must never
be added to its git history (that would nest repos and bloat the hub).

## How it's used

This is the *inbound* half of the cross-project model (full write-up:
`notes/reference/cross-project-sync.md`):

- **This hub → reads projects.** On request, an AI assistant shallow-clones (or
  shallow-pulls) each project listed in `hub/registry.yml` into this folder,
  diffs it against what was last seen, and drafts a blog post about the changes.
- **Projects → read this hub.** The reverse direction is symmetric: each project
  keeps *its own* `assets/references/fairyfox.io` and shallow-pulls this hub to
  refresh the shared standards in `hub/`.

Pulls happen **only on explicit AI request**, never automatically — that's what
keeps the two directions from triggering each other in a loop.

## Branch: track `dev`

Clones here track each project's **`dev`** branch — the latest work — so blog
round-ups can report the newest changes, not just what's been promoted to
`main`. (If a project has no `dev` branch, fall back to its default branch.)

## Typical commands (run from the repo root)

```sh
# First time — shallow clone a project's dev branch here:
git -C assets/references clone --depth 1 --branch dev \
    https://github.com/junebug12851/pokered-save-editor-2

# Later — refresh it (still shallow, dev):
git -C assets/references/pokered-save-editor-2 pull --depth 1 --ff-only origin dev
```
