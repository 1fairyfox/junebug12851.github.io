---
title: "Legal pages, a seedable engine, and a fifth game"
subtitle: "Random AI Prompt spends 2.29.0 through 2.35.1 turning outward — self-hosted legal pages and fonts that end the last third-party data flow, a real release stage for the local edition, in-app dialogs, a seedable and now-deterministic engine, and a plain-English repositioning around what it actually is. Fairy Fox Games adds a fifth game, Ricochet, and deepens the other four. On the hub, the one-seamless-site standards milestone lands and the submenu nav ships."
date: 2026-06-30
tags: [random-ai-prompt, fairyfox-games, fairyfox-io, site, update]
---

Another full day across the mesh. [Random AI Prompt](/projects/random-ai-prompt/)
moved from `2.29.0` to `2.35.1` — less about new surface this time and more about
making the app honest, reproducible, and properly packaged. [Fairy Fox
Games](/projects/fairyfox-games/) added a fifth game and grew the rest, and this site
shipped a standards milestone plus the submenu navigation to match.

## The prompt tool tells the truth about itself

The clearest theme of the day was the app squaring up to reality. It gained its own
**Privacy, Terms, and Cookies pages** (2.30.1) — self-hosted, styled to match the app,
and rewritten to describe what the tool actually does rather than the boilerplate a
generator had produced: no accounts, no analytics, no tracking cookies, settings and
bring-your-own API keys kept only on your device, and prompts sent straight from the
browser to whichever provider you pick. The same change moved the web fonts in-house,
which **ends the one remaining IP-to-Google data flow** on the live site.

That candor extended to the pitch. A README revamp and SEO pass (2.33.3) stopped
leading with Stable Diffusion — it is still supported, but it is one backend among
roughly forty, not the headline — and a follow-up (2.35.1) settled on a single
plain-English description used everywhere the app is named: an open-source generator
for AI image and text prompts that builds richer, more detailed prompts than most
people write by hand, then runs them through 40+ models. The dynamic-prompt language
that powers it is now framed as the engine under the hood rather than the sales line.

## A real release stage, and reproducible output

Two changes fixed things that had quietly been wrong. The local edition **finally has
a proper release stage** (2.32.0): the whole backend had only ever been wired into the
Vite dev server, so the dev server was doubling as the shipped app. The API handler was
factored out and is now mounted by both the dev plugin and a standalone release server,
with a real `npm start` (build, then serve) — one backend, two transports, no drift.
The same pass added full file-watch hot reload and atomic, self-ignoring settings
writes so a live reload can never read or clobber a half-written file.

The engine also became **seedable and deterministic** (2.35.0). A hand-rolled "swap the
global `Math.random`" hack gave way to a real threaded PRNG, so a generation records its
seed and reproduces byte-for-byte from it; the last few generators that captured
`Math.random` at import time were converted too, closing the determinism holes. Async
now lives cleanly at the batch boundary (`generateManyAsync`) while the per-prompt render
stays synchronous by design, keeping the live preview instant — a decision the owner
recorded as settled rather than an open thread.

## Interface polish that reads as maturity

The rest of the day rounded off the edges. Native `alert`/`confirm`/`prompt` were
replaced across the app by a **proper in-app dialog system** (2.34.0) — a small
Promise-based store rendered through one accessible modal host, with focus trapping,
Escape/Enter handling, and red destructive-action buttons — migrating all sixteen call
sites. A header-and-provider batch (2.30.0–2.32.1) added an overflow links menu on every
tab, a syntax-highlighting code editor, a provider-settings accordion that only shows the
knobs a role actually uses, and a unified colour-coded derived-image grid. And a small
content addition (2.33.0) taught the generator to frame artists as "by …" and styles as
"in the style of …", with a new `{#styles}` building block to match the existing
`{#artists}`. Free security and code-health integrations — Dependabot, CodeQL, OpenSSF
Scorecard, Sonar, CodeRabbit, plus Codecov coverage — were wired in on the CI side without
touching the app.

## A fifth game, and depth for the rest

[Fairy Fox Games](/projects/fairyfox-games/) went from `0.4.0` to `0.5.1`. The headline is
**Ricochet** (0.5.0), a mechanically-distinct fifth game: aim and fire a single shot that
bounces off the walls and sweeps up every target in its path, bank chains for escalating
call-outs, and end on three misses while the targets shrink as your score climbs — a pure
`computeShot` core with its own test suite, held to the same bar as the rest. The same
release, and a follow-up depth pass (0.5.1), added one on-mechanic flourish to **every**
game — perfect-catch combos in Echo Chamber, close-pass skims in Orbit Slingshot, deeper
milestones in Polarity and Ink Bloom, chain-bank toasts in Ricochet — all inside the
existing toast and game-over slots so the clean single-screen play stays uncluttered. The
collection's test count climbed to 110.

## The hub becomes one seamless site

On this site, the day's work was the **one-seamless-site milestone** (0.10.0): the docs-site
standard now has every node appear as a *page of fairyfox.io* — wearing the shared header,
the fixed global nav, and the footer — with the old per-project back-button retired in favour
of the brand link as the way home. Two new standards landed alongside it: a **deployment**
policy (static content on GitHub Pages under the shared domain, built apps on Netlify, with
the games collection a recorded Pages exception) and a **planning** standard (plan before you
execute, by default). The matching site code followed the same day (0.11.0): a shared
**submenu nav** (`.subnav`) now sits under the primary navigation on the Projects and Docs
sections, listing each project and each doc category. It is the structural half of making the
separate repositories feel like one continuous site.
