---
date: 2026-07-23
procedure: report-review
node: fairyfox.io (hub)
outcome: completed
hub_version: 0.21.0
hub_commit: (this release)
---

# Process Report — inbound report-review pass, 2026-07-23

> The hub is a node too. This reports on running the report-review pass itself + the
> fold it produced. Voice: direct, honest over flattering.

## Outcome in one line

Digested 15 undigested process reports across five nodes and folded them into the
standards as **0.21.0** — a MINOR milestone centred on the owner-confirmed, mesh-wide
failure "whole checklists get skipped while marked done". Check → read → synthesize →
fold → release → advance markers, in one session, under an upfront go-ahead to complete.

## What was done

1. Refreshed all five `assets/references/` clones (ff-only; pse2 + random-ai-prompt
   already current, three had new commits). Confirmed the hub was clean on `dev` at
   0.20.7 first — no concurrent live session.
2. Enumerated reports past each node's `reports_through` and read all 15 (pse2 ×2,
   random-ai-prompt ×2, games ×2, stories ×1, **despawned-items' first eight**).
3. Wrote the itemized synthesis + fold plan to `notes/plans/2026-07-23-report-review-foldback.md`
   — 26 items, each mapped to source report · pattern strength · target · disposition ·
   phase (mechanical expansion, deliberately practicing the rule being folded).
4. Folded in seven phases (2 new standards, the adoption-manifest enforcement pulse,
   ship-contract, hardening, testing floor, docs-site, clarifications + machine checks),
   each with `## Verify` + `compliance.md` wiring.
5. Built, released 0.21.0 the git-flow MINOR way, advanced every digested report in
   `hub/.last-seen.yml reports_through`, and wrote this report.

## What went well

- The **process-reports review pass is well-specified** — the `reports_through` filename
  list resumed cleanly, and step 3 (synthesize for patterns) made the despawned-items
  cluster's mesh-wide signal obvious rather than treating each report as a one-off.
- **Cross-node corroboration did real work.** Three independent nodes asking for a
  standards version stamp, three for the coins-inside-chrome coupling — those are
  standard-level fixes, not run feedback, and the pattern lens surfaced them.
- The despawned-items failure analyses were unusually actionable: they arrived with
  reference implementations (S1/S6/S7 already built on the node), so folding was lifting
  working shape, not inventing from a sketch.

## What went wrong / friction

- **The pass produced a very large fold** (26 items, 4 new files, ~18 edited standards).
  This is exactly the "big batch" the nodes flag as hard to adopt — the hub now owes the
  nodes a *clean* `hub/standards/CHANGELOG.md` read (shipped this release) so they aren't
  stuck inferring the delta. Worth watching whether one MINOR was the right granularity or
  whether a fold this size should split across releases.
- **The four despawned-items proposals lacked the canonical `procedure: propose-standard`
  front matter** the process-reports standard fixes for upward proposals (they used
  free-form headers). Folded on merit, but it confirms the standard's own worry — the
  template needs to be easier to reach for. Left as an observation this pass, not a node
  edit (anti-recursion: the hub doesn't edit a node to close its report).
- **Spot-checking claims against the tree (the new step 3a) had no manifest to check
  against** — none of the nodes carry `adoption-manifest.md` yet (it ships this release).
  So the retroactive spot-check the failure analysis recommends (S4, "run once mesh-wide")
  is a genuine open item: it needs the nodes to adopt the manifest first. Recorded as a
  follow-up, not faked.

## Suggestions / feedback (for the hub's own procedure)

- The review pass should **state its release-size posture**: a fold this large is fine as
  one MINOR *if* the standards CHANGELOG is shipped in the same release (it was). Codify
  that pairing so a future large fold doesn't ship without the read-path.
- After the nodes adopt the adoption-manifest, run the **retroactive spot-check (S4)** as
  its own review pass and feed findings back — it's the one recommended fix this pass
  could not execute because its precondition (manifests in the nodes) didn't exist yet.

## Deferred (honest not-done)

- Self-hosting the docs fonts *inside* the chrome bundle (pse2's standing ask) — a
  bundle-content change, its own pass, not this standards fold.
- An auto-generated one-page index of every `## Verify` table (the standards-audit stretch)
  — the `hub/standards/CHANGELOG.md` shipped; the generated Verify index did not.

## Addendum (same session) — Phase A: the retroactive claims-vs-tree spot-check

The main report flagged that the new step-3a spot-check "had no manifest to check against".
On reflection it can be run **without** a manifest — diff each report's adoption *claims*
directly against the node's tree — so it was run this session across all five clones (the
S4 "run once retroactively mesh-wide" ask, hub-executable half). **Read-only; anti-recursion
held — no node was edited.**

Findings — **every node's adoption claims hold against its tree**:

- **pokered-save-editor-2:** `docs/fairyfox/coins.js` present, `CHROME_VERSION` = 2.2.1. ✔ matches the chrome-2.2.1/coins adopt report.
- **random-ai-prompt:** all six claimed standard notes (`engineering-quality`, `planning`, `research-capture`, `working-rhythm`, `self-hosted-assets`, `agent-tooling`) + `coins.md` present; `assets/docs-theme/modules/coins.js` present. ✔
- **fairyfox-games:** `assets/coins.js` + the shared `coins-earn.core.js` (with its `.test.js` + `coins-game.js` bridge) present; 29 `notes/reference/*.md`. ✔ — **one cosmetic inaccuracy:** the report cites the path as `games/_shared/…`; the file actually lives at **`games/shared/…`** (no underscore). Artifact real, path mis-typed in the node's report. Not an adoption gap; worth a node-side note-fix on the node's next pass (not the hub's to edit).
- **fairyfox-stories:** `assets/coins.js` present; 31 `notes/reference/*.md`. ✔ (Phase-2 coins shipped as claimed.)
- **papermc-despawned-items:** the S1/S6/S7 reference implementations are genuinely present — `notes/reference/adoption-manifest.md`, the "Checklists are contracts" instruction in `CLAUDE.md`, and a manifest-linked `status.md` Health row. ✔ (This is why the fold could lift working copy rather than a sketch.)

**Out of tree-scope:** live GitHub config claims (e.g. despawned-items' own finding that
supply-chain was "adopted" with branch protection off) can't be verified from the tree —
they need `gh api` — and that one was the node's own already-closed finding. A future pass
with repo-admin reads could confirm branch-protection/required-status-check state mesh-wide.

**Net:** the new spot-check *works* (it caught a small report inaccuracy on first run) and,
more importantly, confirms the nodes' reported adoptions are **real, not narrative-only** —
the reassuring result. The full manifest-backed version becomes available once the nodes
adopt `adoption-manifest.md` (this release), at which point the diff is a row-by-row read.

## Environment

Windows + PowerShell (Windows-MCP) + the file tools; never the bash sandbox. Hub on `dev`,
clean before and after. Five read-only clones under `assets/references/` (git-ignored).
