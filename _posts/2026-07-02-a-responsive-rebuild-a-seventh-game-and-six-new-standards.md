---
title: "A responsive rebuild, a seventh game, and six new standards"
subtitle: "Random AI Prompt goes from 2.38.1 to 2.41.0, rebuilding its interface to work across phone, tablet, and desktop, flattening the repository to a single project, and hardening its release path. Fairy Fox Games reaches 0.11.2 with a seventh game, Loft, a growth architecture rolled across the whole collection, and Netlify retired for a single host. On the hub, six new and updated standards land."
date: 2026-07-02
tags: [random-ai-prompt, fairyfox-games, fairyfox-io, site, update]
---

A day about reach and structure. [Random AI Prompt](/projects/random-ai-prompt/) moved
from `2.38.1` to `2.41.0`, making the interface work on small screens and simplifying the
repository underneath it. [Fairy Fox Games](/projects/fairyfox-games/) went from `0.6.0`
to `0.11.2` with a seventh game and a depth pass across the whole collection. And the hub
folded a batch of the projects' own proposals into six shared standards.

## An interface that fits a phone

The headline for Random AI Prompt was a **responsive rebuild** of the web app. It landed
in phases (`2.40.1` onward): a fluid token foundation, a dedicated layout cascade layer,
and then the actual small-screen behaviour — the top-bar control pile collapses behind an
overflow menu, the building-block palette and the Manage editor become phone drawers and
master/detail views, the single-image view stacks its image over its metadata, and every
interactive control grows to a comfortable touch target. Header submenus turn into
full-width bottom sheets, and the composer keeps its Generate button anchored bottom-right
even as the field bar wraps. A closing pass (`2.41.0`) added a **tablet tier** — split-screen
layouts and compact chrome between 769 and 1024px — so the three form factors each get a
layout designed for them rather than one stretched to fit.

## One project at the root

Underneath the UI work, the repository was **flattened**. The earlier revival had kept the
codebase split into an active `engine-v3/` and a frozen `engine-v1-2/` snapshot of the
pre-revival CommonJS CLI and classic web UI. That split is now gone: the active project
lives at the repository root — engine under `src/`, prompt content under `data/`, the React
+ Vite app under `gui/`, tests under `tests/`, all commands run from one place — and the
pre-revival system was removed from the tree, preserved in git history and as a read-only
reference clone. The architecture deep-dives were rewritten to the current shape and a
stale-reference sweep followed.

That change rippled into the hub's own data: the [downloads](/downloads/) page and the
[Random AI Prompt](/projects/random-ai-prompt/) node both still told people to `cd` into
`engine-v3/`, so both were corrected to run from the repository root.

## A firmer release path

The day also hardened how releases ship. The `main` branch is now **branch-protected** —
releases run through a pull request rather than a local push to `main`, with strict status
checks and force-push and deletion blocked — and the release workflow **keyless-signs** its
assets so each published build carries a verifiable signature. Repo-hygiene guardrails (a
broken-doc-link check, a tidy check, auto-deletion of merged branches) and dependency bumps
rounded it out.

## A seventh game, and a growth architecture for all of them

[Fairy Fox Games](/projects/fairyfox-games/) had its busiest day yet, climbing from `0.6.0`
to `0.11.2`. A seventh game joined the collection — **Loft**, a keepy-uppy juggle where you
tap each glowing orb as it *falls* to bat it back up; it rewards reading a cluster and
catching several in a row rather than mashing.

The larger move was a **growth architecture** rolled across every game. Each one now shares
the same three layers on top of its own core hook: a readable **stage arc** (a HUD chip and
a field tint that shift as you climb), persistent **meta-progression** (a per-game lifetime
record with skill-safe badges and an end-of-run report), and feel-and-feedback depth — while
Polarity was rebuilt as the reference implementation, a precision-combo runner whose
last-instant flips grow a multiplier. Every layer is pure, tested logic; the collection's
test count reached 217. Housekeeping came with it: game icons across the collection, a
public-copy refresh that leads with the AI-experiment story, and **Netlify retired** so
GitHub Pages is the single host.

## Six standards folded into the hub

The site's own work was on the shared standards. Several of the projects' process reports
had proposed conventions worth making mesh-wide, and the hub adopted six of them (`0.12.0`):
a **git-workflow fix** (after any release, `dev` must contain `main`, closing a drift the
projects had actually hit) plus five new standards — **supply-chain hardening** (least-privilege
workflow permissions, pinned Actions, a security policy, signed releases, branch protection),
**dependencies** (upgrade aggressively behind a real test gate), **legal-docs** (self-hosted,
code-accurate Privacy/Terms/Cookies), **agent-tooling**, and **badges**. Each ships with a
`Verify` check wired into the compliance audit, alongside six new templates. A follow-up
(`0.12.1`) made adopting these the default posture for a node running the check flow, without
loosening any of the anti-recursion or reconciliation safeguards.
