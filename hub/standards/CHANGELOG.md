# Standards — CHANGELOG

What changed in `hub/standards/` (and the templates that operationalize them), by hub
`VERSION`, so an **adopting node can tell *new* from *materially-changed* from a read** —
without a full-tree object diff its shallow-then-discarded mirror can't cheaply provide
(three nodes asked for exactly this). Pair it with each node's last-adopted `hub_version`
anchor (from its newest `*-adopting-updates.md` report): read every entry newer than that
anchor, then adopt + record in the [adoption manifest](../templates/notes-skeleton/reference/adoption-manifest.md).

Newest on top. This changelog starts at 0.21.0; earlier standards history lives in the
hub's own `notes/version/` changelog.

## 0.21.0 — process-report fold-back (the "done means verified" release)

Folded the 2026-07-23 inbound report-review pass (15 node reports; the headline: "whole
checklists get skipped while marked done", owner-confirmed mesh-wide).

**New standards**
- **`checklists-are-contracts.md`** — every checklist/`## Verify` item is owed an
  individually-recorded outcome before any "done"; mechanical enumeration; ambitious reading
  of optional items; deferral-requires-falsification; end every pass with a disclosed
  not-done list.
- **`mandate-ledger.md`** — a multi-part owner directive is transcribed verbatim, one row
  per clause; completion claims cite rows; stateful `awaiting-owner`; no milestone-anchoring
  under an open mandate.

**New template artifacts**
- `notes-skeleton/reference/adoption-manifest.md` — per-standard adoption record;
  `copied-only ≠ adopted`; no summary claim without a backing row.
- `mandate-ledger.md`, `provenance-asset.yml`, `check-standards.mjs`.

**Materially changed**
- `notes-system.md` — the adoption manifest + evidence-linked status (no bare ✅ on a
  multi-item claim).
- `process-reports.md` — the review pass now spot-checks a report's claims against the
  node's manifest + tree (step 3a).
- `git-workflow.md` — the pre-release manifest gate + "full CI before `main`, platform-
  enforced (every job in required status checks)".
- `engineering-quality.md` — the **ship contract** (Scorecard ≥ 7.0 floor, tech-debt
  removal, PR triage).
- `supply-chain-hardening.md` — provenance **as a release asset**; full-suite required
  checks; **SAST outlives toolchain bumps**; workflow/artifact hygiene.
- `dependencies.md` — four dependency guardrails (toolchain↔SAST pin, test↔runtime sync,
  real-runtime resolver check, judgment-not-blind-merge).
- `testing.md` — a measurable coverage floor (line ≥ 90% default) wired into the build;
  probe-the-mock-first; gate-the-gates.
- `badges.md` — extended canonical set (watchers, total commits, tech-debt, closed
  issues/PRs, platform, commented distribution badges).
- `coins.md` — coins off the shared chrome (games), read-time chip + drop-cap fragility.
- `legal-docs.md` — coins disclosure ships **with the coins feature**, not the standard.
- `repo-hygiene.md` — check-links false-positive classes + code-span stripping +
  runtime-agnostic note.
- `agent-tooling.md` — `.NET` absolute-paths on Windows, `gh` sandbox passing forms,
  `-f`/backtick → `.ps1 -File`, baseurl-aware Jekyll preview.
- `onboarding-existing-project.md` / `new-project-setup.md` — a JVM/Gradle/Dokka aside;
  the required-status-checks setup step; manifest-seed + first-compliance-pass row.
- `adopting-updates.md` — "already-practiced, now-filed", phasing a mixed adoption,
  coins-is-a-chrome-adoption; step 3a runs Verify + updates the manifest.
- `docs-site/05` + `chrome/{header,subnav}.html` + a new `chrome/adapters/dokka.md` +
  `chrome/CHANGELOG.md` — the adaptive three-zone subnav, rules-on-slots (active nav =
  Projects), and the Dokka adapter.
- `compliance.md` — rows for the two new standards + the ship-contract/coverage additions.
