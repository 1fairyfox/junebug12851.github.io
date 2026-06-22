---
title: "Welcome to the den"
subtitle: "Why I built fairyfox.io, and what it's for."
date: 2026-06-22
tags: [meta, site]
---

I finally gave myself a home page.

For years my stuff has been scattered across GitHub repos with no front door —
no single place that says *here's what I'm building and why*. `fairyfox.io` is
that front door. It's a small, fast [Jekyll](https://jekyllrb.com/) site that
deploys itself on every push, so the friction to write or update is basically
zero.

## Three jobs

This site is doing three things at once:

1. **A hub for my projects.** The [projects page](/projects/) is generated from
   a single registry, so it's always current. Right now that's
   [Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
   and [Random AI Prompt](https://github.com/junebug12851/random-ai-prompt),
   with more to come.
2. **A blog.** Short write-ups of what I'm tinkering with — including automatic
   round-ups whenever something meaningful changes in one of my repos.
3. **Shared scaffolding.** The common conventions all my projects use — the git
   workflow, the living-notes system, versioning, ready-to-copy templates — live
   here so I stop reinventing them in every repo.

## The loosely-wired part

The bit I'm most pleased with is how this connects to my other projects without
tangling them together. The hub holds the canonical standards; each project
pulls them in **on demand, via a plain shallow git pull** — no submodules, no
live dependency, no build-time coupling. In the other direction, this hub keeps
read-only clones of my projects so I can see what changed and write about it
here. Communication is one-way git in each direction, which keeps every repo
simple and independent. If you want the gory details, they're in the repo under
`notes/reference/cross-project-sync.md`.

That's the whole idea: a quiet little hub that makes everything else easier to
find, and easier to keep tidy. Welcome in.
