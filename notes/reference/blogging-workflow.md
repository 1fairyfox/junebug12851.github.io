# Blogging Workflow — including project round-ups

How posts get written. Two kinds: ordinary write-ups, and **cross-project
round-ups** that report what changed in my repos.

## Ordinary posts

Create `_posts/YYYY-MM-DD-title.md` with front matter:

```yaml
---
title: "Post title"
subtitle: "Optional one-liner shown in lists and at the top."
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

Write in Markdown. It shows up automatically on the home page (latest few),
`/blog/`, and `/feed.xml`. Commit on `dev`, FF `main` to publish (see
[`git-workflow.md`](git-workflow.md)).

## Project round-ups (the "look for updates, then blog" loop)

The standing job: **regularly check the reference projects for changes and write
about the interesting ones.** It runs on explicit request (a human ask or a
scheduled task that asks the AI to do a pass) — never as silent automation.

The pass:

1. **Refresh the clones.** For each project in
   [`../../hub/registry.yml`](../../hub/registry.yml), shallow-pull its `dev`
   branch into `assets/references/<project>/` (see
   [`cross-project-sync.md`](cross-project-sync.md)).
2. **See what changed since last time.** Compare against the last-seen commit.
   The cheap, reliable signal is each project's own living history — read the new
   entries in its `notes/version/` (changelog) and `notes/sessions/` (day logs),
   plus `git -C assets/references/<project> log --oneline -n 30`. Record the
   commit you stopped at so the next pass knows where to resume (e.g. a small
   `hub/.last-seen.yml`, or just cite the range in the post).
3. **Judge what's worth saying.** Not every commit is a story. Group related
   changes into themes; skip pure chores/typos. Aim for "what got better and why
   it matters," not a raw commit dump.
4. **Draft the post.** `_posts/YYYY-MM-DD-<project>-update.md`, tagged with the
   project name and `update`. Link to the repo and to specific commits/PRs where
   useful. Keep the project's plain, matter-of-fact voice.
5. **Publish** via the normal git flow. Add its changelog entry inline
   ([`../version.md`](../version.md)) and bump `VERSION` (PATCH) in the same
   commit.

### Voice & scope

- Honest and concrete: real changes, real reasons. No hype.
- It's *my* projects from *my* hub — first person is fine, but let the work be the
  star.
- One project per round-up usually reads better than a mega-digest; combine only
  when changes are small.

### Optional: schedule it

A recurring pass can be set up with the scheduled-tasks tooling (e.g. weekly:
"refresh the reference clones and draft round-ups for anything noteworthy").
It still produces a *draft to review*, keeping a human in the loop and the
pull-on-request / anti-recursion rule intact.
