---
title: "A release splits in two, and the standards start learning from the nodes"
subtitle: "Random AI Prompt ships 2.7.0 — its repository splits into an active engine and a frozen snapshot — then builds out image generation across many providers with a photo gallery (through 2.7.25); both projects adopt the new process-reports and compliance standards, and the hub folds that feedback back into the standards (0.9.0–0.9.3)."
date: 2026-06-26
tags: [fairyfox-io, random-ai-prompt, pokered-save-editor-2, site, standards, update]
---

A day where the loop the mesh built yesterday actually ran: the projects adopted
the newest standards, reported back on how the runs went, and the hub used those
reports to make the standards better. Alongside that, one project shipped a real
release.

## Random AI Prompt splits in two

[Random AI Prompt](/projects/random-ai-prompt/) cut a milestone release, **2.7.0**,
that restructures the whole repository. It now holds **two separate engines that
share no code**. `engine-v3/` is the active project — an isomorphic prompt engine
written in the dynamic-prompt language (DPL), driven by a React + Vite web app, with
the SFW/NSFW gating and the improved keyword lists; all new work happens there.
`engine-v1-2/` is the original pre-revival system restored as a literal, runnable
snapshot — the CommonJS CLI and the classic Express/Pug web UI — kept self-contained
as a reference and frozen, on its way out.

The release also retired the legacy `<expansion>` mechanism end to end. The engine-v3
pipeline is now `dynamic-prompt → prompt-salt → list → cleanup`; the expansion stage,
its loaders, the web app's Expansions tab and "Save as Expansion" feature, and the
obsolete expansion data are all gone, with the two generators that still referenced
expansions repointed to their migrated dynamic-prompt equivalents. Removing a whole
generation of code dropped the lint warnings from 140 to 18 and left the test suites
green. The downloads page and the project's node here were updated to match the new
`engine-v3/` layout — running it from source now starts in that folder.

## The prompt tool starts generating images

With the split done, most of the day went into the engine-v3 web app, which moved
from producing prompt text to producing pictures. Across the **2.7.x** line — from the
split at 2.7.0 through to **2.7.25** — the app gained an image-generation layer that
dispatches a finished prompt to whichever backend you point it at. The catalogue grew
to more than a dozen providers, both hosted APIs and local servers — OpenAI, Stability,
Replicate, fal.ai, Gemini, Grok, FLUX/BFL, Ideogram, Leonardo, NovelAI, Midjourney,
ComfyUI, Forge/SD.Next, and a plain copy-out — each described by a small capability
config so the settings panel adapts to what the provider actually supports. An optional
AI rewrite pass cleans the generated prompt (and its negative) before it is sent, and
every provider's images land in one central `output/` folder.

On top of that output sits a **photo gallery**. The top bar now switches between three
persistent views — Generate, Gallery, and Single — that stay mounted so each keeps its
own state and scroll position. The gallery is a masonry grid with keyword search over
everything saved to `output/`; clicking an image opens a dedicated single-image page
showing the prompt and negative each in their DPL, engine-roll, AI-translation, and
sent-final layers, a details table over the full settings snapshot, a keyword cloud, and
prev/next navigation. Each generated image is written with a `.json` metadata sidecar —
the prompt, the deterministic engine roll, the translation, the source DPL, the provider,
and a settings snapshot **with API keys stripped**. Because the feed and the on-demand
ImageMagick conversion both need the dev server's filesystem, the gallery is local by
nature; a static build simply shows an empty gallery with a note.

## Both projects adopt process-reports and compliance

The two newest shared standards — the [process-reports](/docs/process-reports/)
feedback loop and the [standards compliance audit](/docs/compliance/) — were written
at the hub the day before. Today both projects pulled them in. Pokered Save Editor 2
also adopted the full **git-flow** branching model in the same pass, moving `main` off
the old fast-forward habit and onto tagged `--no-ff` release merges, and recorded one
deliberate divergence: its release tag is created by CI, so it never tags by hand.
Random AI Prompt took the process-reports and compliance standards plus the `Verify`
sections. Both adoptions were notes-and-process only — no version bump, no release on
either project — and each ended, as the new standard now requires, by writing an honest
report of how the run went.

## The standards fold the feedback back

Those reports are the point of the loop, and the hub spent the day acting on them.

Two pieces of hub work landed. The first, **express authorizations** (0.9.0), addresses
a friction the projects kept hitting: the adopt-updates flow asks for confirmation
before changing anything, which is right by default but redundant when the owner already
gave the go-ahead at the hub. A new tracked ledger (`hub/authorizations.yml`) records
those express go-aheads against specific artifacts; a node adopting a change the ledger
covers skips only that one redundant pause, while every other safety step still runs.
The [adopting-updates](/docs/adopting-updates/) summary now notes the carve-out.

The second was the first real **fold-back of node feedback** (0.9.1). Both projects'
adoption reports, written independently, hit the same two snags: the documented
`--ff-only` refresh of the read-only hub clone aborts every time because the hub's work
branch is routinely force-pushed, and reconstructing "what changed" by hand was awkward
once the old commit was gone. Those drove the changes. The refresh now treats the abort
as expected and leads with a `reset --hard` on the disposable mirror, guardrailed to the
git-ignored clone only. Change detection now anchors on the hub's version and its
append-only changelog rather than a commit hash, which a force-push erases. Four smaller
report items — CI-owned release tags, how a check-then-adopt run is reported, the
chicken-and-egg of a first process report, and an unprompted close-out summary — were
folded in across the adopt, sync, git-workflow, and process-reports standards. No new
machinery, just standards that match how the runs actually go.

## The loop runs once more

Later the same loop turned again. Pokered Save Editor 2 adopted the new
**express-authorizations** standard — the ledger-backed carve-out from earlier in the day
— and, as the process-reports standard now requires, wrote a report on how that run went.
The hub read it and folded it straight back (0.9.3). Two things came out of it. First, the
express-authorization language now states a hard **verification floor**: a pre-authorized
or otherwise automated adoption skips only the one redundant confirmation pause — never the
build, the tests, or the standards checks, which run before *and* after, with a fall back to
check-and-wait if they can't be completed. Skipping a question is not skipping verification.
Second, the report exposed a gap in how the hub tracks which reports it has already digested:
a same-day follow-up couldn't be told apart from its sibling by date alone, so the marker
became an append-only list of report filenames rather than a high-water date. Small, precise
corrections — the kind the loop exists to surface.
