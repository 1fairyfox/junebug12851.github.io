---
title: "A theming system, a faster first paint, and a sixth game"
subtitle: "Random AI Prompt spends 2.35.2 through 2.38.1 rebuilding its styling from a monolith into a modular, tokenized theming framework — System/Dark/Light with accent presets and importable custom themes — then makes the online build paint faster by prerendering to static HTML, and drives its SonarCloud tech-debt to zero. Fairy Fox Games adds a sixth game, Skyline, a stack-and-slice tower builder."
date: 2026-07-01
tags: [random-ai-prompt, fairyfox-games, update]
---

A day of foundations rather than new surface. [Random AI
Prompt](/projects/random-ai-prompt/) moved from `2.35.2` to `2.38.1`, spending most of
it on how the app is styled, how fast it paints, and how clean its code reads. [Fairy
Fox Games](/projects/fairyfox-games/) added its sixth game and grew one of the others.

## A styling monolith becomes a theming framework

The headline was a floor-up **CSS overhaul and theming framework**, built in eight
phases (`2.35.4` through `2.37.0`). A single ~4,600-line `styles.css` was split into a
modular `styles/` tree — foundation tokens and per-component files — sitting on a
two-tier token system and organized with explicit cascade layers so overrides stop
fighting each other. On top of that scaffold came a real theme engine: a **System /
Dark / Light** base, **nine accent presets**, and an **Appearance picker** in the
header. The built-in themes were then restructured so that each theme is simply a small
JSON file in a folder — the file *is* the theme — read by isomorphic loaders shared
between the app and the build step. The final phase opened it up entirely: you can now
**import a theme file** to add or override a theme, and **export** the current one to
share it, with strict validation (known fields and hex colours only, no arbitrary CSS)
and imported themes stored on your device like the rest of your settings.

## A faster first paint online

Two changes went after the online build's mobile performance, which profiling had
pinned on the first paint rather than bundle size. First (`2.37.1`), the ~430 KB prompt
corpus was moved off the first-paint path — code-split into its own chunk fetched after
paint, with the building-block palette rendering immediately from path strings while the
content fills in behind it. Then (`2.38.0`) the online build began **prerendering its
first paint to static HTML** at build time and hydrating in the browser, so the palette —
the largest contentful element — is painted from markup before any JavaScript runs.
Together they roughly halve the measured load times on throttled mobile (Lighthouse
Performance climbing from the mid-50s into the 80s) while Accessibility, Best-Practices,
and SEO stay at 100. A returning visitor's saved settings survive the two-pass hydration
intact, and a new Node-environment guard test fails the build if the initial render path
ever reaches for a browser API.

## Tech-debt to zero

The rest of the day was code health. A **tech-debt sweep** (`2.38.1`) cleared **all 70
open SonarCloud code smells** across the active engine as a behavior-preserving cleanup —
mechanical modernizations, seven cognitive-complexity refactors, and seven regex rewrites
that also close a real super-linear-backtracking (ReDoS) class in the prompt-language
parser — verified rule-by-rule against the same SonarJS implementations, with the full
test suite green throughout. Follow-ups resolved the last bug and two vulnerabilities as
documented, confirmed-safe suppressions and fixed the quality-gate's coverage
measurement, taking the board to a clean zero. Earlier in the day a full **dependency
upgrade** (`2.35.2`) brought everything to latest and a **stylelint gate** (`2.35.3`)
cleared the CSS lint backlog, and a process fix made the release flow back-merge `main`
into `dev` with a CI guard so the two branches can't silently drift.

## A sixth game

[Fairy Fox Games](/projects/fairyfox-games/) went from `0.5.1` to `0.6.0` with a
mechanically-distinct sixth game, **Skyline** — a stack-and-slice tower builder. A slab
slides above your tower; you drop it with one control, and only its overlap with the slab
below survives, so every sloppy drop narrows the next target. A flush drop keeps the full
width and pays double, which makes precision the only way to keep climbing, and the slide
speeds up with height. Like the rest, the whole simulation is a pure, tested core — and
notably there is no timer-driven death: a slab only resolves on an explicit drop. The
same release grew **Polarity** with clutch saves (a match landed by a last-moment flip,
tallied and surfaced on the game-over card) and backfilled a missing footer link. The
collection's test count reached 133.
