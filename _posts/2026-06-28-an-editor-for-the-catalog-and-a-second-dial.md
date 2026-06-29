---
title: "An editor for the catalog, a second dial, and the standards fold in what the nodes reported"
subtitle: "Random AI Prompt moves through 2.10.5–2.14.0: an in-app Manage tab that edits the prompt catalog on disk with live hot-apply, a focus dial alongside the intensity one, a fully static online build that generates in the browser, and list quick-wins. Meanwhile the hub reads four sibling process reports and folds the actionable parts into the standards (0.9.8)."
date: 2026-06-28
tags: [random-ai-prompt, fairyfox-io, site, update]
---

A second heavy day on [Random AI Prompt](/projects/random-ai-prompt/), and a
quieter inbound day on the hub. The prompt tool grew a way to edit its own content
from inside the app, gained a second control dial on the prompt language, and made
its online build generate without a server. The hub spent its day reading what the
sibling projects had written up and folding the useful parts back into the shared
standards.

## A tab to edit the catalog

The headline is the **Manage tab** (2.12.0) — a fourth view in the web app that
edits the real prompt catalog on disk: the dynamic-prompt blocks, the keyword lists,
and the folders that organize them. It is local-mode only, gated on a real
file-backend probe so it never appears in the online build, and its edits **hot-apply
live** — the engine reads through a runtime disk-snapshot loader, so a saved change
takes effect with no reload (the one exception is an edited JavaScript generator body,
which has to reload to run).

It is a real editor, not a text box. The left pane is the actual nested folder tree,
with categories and subfolders color-coded, force-prefix and group folders badged,
internal markers abstracted away, NSFW gating, and search. There are three editors
behind it: blocks (a DPL tab plus a JavaScript-sidecar tab), folders (rename, the
priority/description/force-list sidecar fields, marker toggles), and lists — the last
of which renders a **virtualized** entry view that stays smooth on the 20,000–27,000
line lists, with a raw CodeMirror mode for the whole file. Add, delete, and
drag-to-move are all there, along with two safety nets: **restore-default**, which
pulls the original file back from the stable branch, and **ghost pills** — faded,
restore-only entries for files deleted locally but still present upstream, detected by
diffing against a published manifest rather than scraping the GitHub API. An
external-edit watch (a server-sent `fs.watch` stream) keeps the tab in step when a
file is changed in another editor.

## A second dial for the prompt language

Yesterday's intensity dial gained a sibling: a **focus dial** (2.13.0). Where
intensity is "how much," focus is "how pure" — low focus admits surrounding fluff and
extra detail, high focus keeps only what is essential (which also lets a generator
stack cleanly as a layer). It carries the same way a reference does, gets its own line
conditions, and — unlike intensity — does *not* auto-scale gates and counts, because
what counts as fluff at a given focus is an author's judgement per line, not a formula.

Two dials that both read as a percentage would be ambiguous, so the syntax now
**requires an `i` or `f` prefix**: `{#name i25% f80%}`, `[i<10%]`, `[f<40%]`. Keyword
interpolation moved off the old `{intensity}` form (which collided with list syntax)
onto a `$` sigil — `$intensity`, `$intensity-word`, and the matching `$focus` set — and
all in-tree content was migrated losslessly. The same release added **global layer
auto-merge**: an imported generator renders once per prompt, so two scenes that both
pull in the same weather generator no longer double it, with a `stacking: true` opt-out
for decorators that are meant to repeat. The CodeMirror DPL language learned to
highlight and autocomplete all of it.

## The online build generates on its own

The hosted build at [prompt.fairyfox.io](https://prompt.fairyfox.io) became **fully
static** (2.11.0). For providers whose APIs allow cross-origin calls, generation now
happens **directly from the browser** with the visitor's own key, so the online build
no longer needs serverless proxy functions for them; providers that can't be called
cross-origin are locked in that build rather than failing. A couple of follow-ups
rounded it out — opening generated images through a blob URL, and a one-install path
that builds both the engine and the web app from a single `npm install`.

## List quick-wins

The day closed on a batch of smaller editor wins (2.14.0): **Dedupe and Sort**
buttons on lists, an **Insert bar** in the Manage DPL editor, and **AI Expand**, which
grows a list through the rewrite provider. Alongside them, a live **DPL validity**
status icon with inline lint spots, a dialect-aware emphasis stage for typed `()` and
`[]`, and the removal of the vestigial full/partial concept.

## The hub reads what the nodes wrote

The hub's own day was the inbound side of the loop. Four new process reports had
accumulated from the sibling projects — the records each node writes after a fairyfox
run — and the report-review pass read them all and folded the actionable themes into
the standards (0.9.8). A node had found that a hand-pushed release tag makes a
tag-gated CI workflow skip itself, so the git-workflow standard now leads "cutting a
release" with a callout to check the CI configuration first. Another node's unattended
run had landed mid-merge with conflicts, so the adopting-updates standard now has the
check pass glance at the node's own working tree and surface anything alarming while
acting on nothing. A smaller note covered backfilling stale version placeholders in
old reports.

One recurring request was deliberately **not** adopted: all four reports asked to
promote a destructive `reset --hard` force-push fallback to a first-class step. That
was the very workaround [removed the day before](/blog/2026/06/27/a-dial-for-the-prompt-language-and-a-home-online/)
once it became clear there had never been a real force-push — only a shallow-clone
misread. Instead the standard gained a nudge for any node still carrying the old
wording to re-adopt the corrected refresh once. The standards changed on the hub side
only; the nodes pick them up later through ordinary adoption.
