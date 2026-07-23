# Plan — Process-report review pass + fold-back (2026-07-23)

Inbound report-review pass (`hub/standards/process-reports.md`) triggered by an
explicit *fairyfox*-named request paired with intent ("do reports ingest procedures
for sub-projects … reach completion in full, in as many phases as needed"). The owner
gave an **upfront go-ahead to carry the fold to completion**, not just report-and-wait
— so this pass runs check → read → synthesize → **fold on the hub side**, in phases,
with the full git-flow discipline (changelog + `VERSION` per commit, `dev` → release).

Run against hub `0.20.7` (`226255f`). Clones refreshed 2026-07-23: pse2, random-ai-prompt
already up to date; papermc-despawned-items → `f3a2d01` (v1.5.0), fairyfox-games →
`898a6de` (0.25.2), fairyfox-stories → `ecc53f9` (0.7.1).

## Reports digested this pass (15, all past their `reports_through` markers)

| Node | Report | Kind |
|------|--------|------|
| pokered-save-editor-2 | 2026-07-19-check-for-updates.md | run feedback (check) |
| pokered-save-editor-2 | 2026-07-19-adopting-updates-chrome-2.2.1.md | run feedback (adopt) |
| random-ai-prompt | 2026-07-19-check-for-updates.md | run feedback (check) |
| random-ai-prompt | 2026-07-19-adopting-updates.md | run feedback (adopt) |
| fairyfox-games | 2026-07-19-update-check.md | run feedback (check) |
| fairyfox-games | 2026-07-20-adopting-updates.md | run feedback (adopt) |
| fairyfox-stories | 2026-07-19-adopting-updates.md | run feedback (adopt, +Phase 2) |
| papermc-despawned-items | 2026-07-19-onboarding.md | run feedback (onboarding) |
| papermc-despawned-items | 2026-07-20-adopt-docs-chrome.md | run feedback (adopt) |
| papermc-despawned-items | 2026-07-20-standards-audit.md | run feedback (audit) |
| papermc-despawned-items | 2026-07-20-checklist-noncompliance-failure-analysis.md | **failure analysis + S1–S9** |
| papermc-despawned-items | 2026-07-21-mandate-execution-failure-analysis.md | **failure analysis + 5 proposals** |
| papermc-despawned-items | 2026-07-21-ship-contract-and-repo-hardening-proposal.md | **proposal (6 items)** |
| papermc-despawned-items | 2026-07-21-subnav-standard-proposal.md | **proposal (docs-site 05)** |
| papermc-despawned-items | 2026-07-21-testing-and-quality-gap-analysis.md | **proposal (5 items)** |

Front-matter note (meta): the four despawned-items proposals do **not** use the
canonical `procedure: propose-standard` front matter the process-reports standard
fixes for upward proposals (they use free-form headers). Not dinged — folded on merit —
but it confirms the standard's own worry and argues the template needs to be easier to
reach for (see Item 24).

## The headline: one root problem, reported hard and owner-confirmed mesh-wide

despawned-items' three failure analyses converge on a single disease the owner calls
**frequent across every project**: *"whole checklists get skipped while being reported
done."* The mesh's working definition of "done" is **"the artifact exists"**; the
standards' real definition (**every `## Verify` row passes**) is written but wired to
nothing, and the only enforcement instrument (`compliance.md`) is opt-in and was never
invoked. Same disease in three organs:

- **Adoption** — "file copied into notes/reference/" counted as adopted; 21 of 27
  standards invisible for a day behind a bare `Standards adopted ✅`; supply-chain
  "adopted" with its mandatory branch protection simply off (live 404).
- **Owner mandates** — a first-message directive with ~9 load-bearing words compressed
  into a 3-word task name; the dropped words became optional; the mandate took three
  prompts, each round proving round 1 was capable all along.
- **Testing** — `✅ tests gate the build` hid 44% line coverage and three shipped,
  dead-feature bugs, each in a 0%-covered layer.

This is the primary fold. The rest are real but secondary.

## Cross-node patterns (strength = number of independent nodes)

- **P1 · "done" is unverified (STRONGEST, owner-confirmed).** despawned-items ×3 +
  the owner. → the S1–S9 enforcement cluster. Phase 1.
- **P2 · Standards/bundle have no version stamp or changelog.** pse2 ×2 (chrome
  CHANGELOG), random-ai-prompt ×2 (`since:`/`updated:` or a standards CHANGELOG),
  games (per-standard applicability hint). 3 nodes. → Item 22 + chrome CHANGELOG (Item 16).
- **P3 · A feature riding *inside* the chrome bundle (coins) is a chrome-adoption task,
  not a standard-text copy.** random-ai-prompt, games ×2, stories. 3 nodes. → coins.md +
  adopting-updates.md (Items 17–18).
- **P4 · `check-links`/`check-tidy` false-positive + npm-flavour.** stories (SKIP classes
  + code-span bug), despawned-items (runtime-agnostic). 2 nodes. → repo-hygiene + template
  fix (Item 20).
- **P5 · Big mixed batches need phasing guidance.** stories, games. 2 nodes. → adopting-updates
  phasing note (Item 17).
- **P6 · agent-tooling gotchas.** games (.NET absolute paths), despawned-items (`gh`
  sandbox forms), stories (PowerShell `-f` quoting → `.ps1`). 3 nodes. → agent-tooling (Item 23).
- **P7 · JVM/Gradle/Dokka is a blind spot** in onboarding + docs-site (every example is
  web/npm). despawned-items ×3. 1 node but pervasive + first-of-kind. → Items 15, 21.

## The item ledger (mechanical expansion — every proposal, one row; the S6 practice)

Disposition: **FOLD** = adopt into the hub · **ALREADY** = already covered · **DEFER** =
record but not this pass · **NODE** = node-side, no hub change.

### Phase 1 — the enforcement cluster ("done means verified")
1. **Checklists-are-contracts** standing rule (S6/S8/S9): new `hub/standards/checklists-are-contracts.md` — enumerate every checklist/`## Verify` item; record each outcome individually; never compress a list to one done-mark; mechanical expansion depth; strict (ambitious) reading of optional items; end every pass with a disclosed not-done list. Verify + compliance row + `templates/CLAUDE.md` standing instruction. **FOLD.**
2. **Adoption manifest** (S1): new `templates/notes-skeleton/notes/reference/adoption-manifest.md` — one row per hub standard (standard · hub VERSION+commit · state {implemented|copied-only|gap(due)|N-A(reason)} · last Verify run+result · evidence). Rules: *copied-only ≠ adopted*; only a recorded Verify pass flips to *implemented*; **no summary claim without a backing manifest row**; `Standards adopted ✅` banned wording. Wire into notes-system + compliance + onboarding + adopting-updates. **FOLD.**
3. **Enforcement pulse** (S2): adopting-updates + onboarding-existing-project end by running the Verify tables of touched standards and updating the manifest; onboarding runs the full compliance matrix once; git-workflow release section + CLAUDE.md workflow step: **read the manifest before release — an overdue `gap` on a mandatory standard holds the release like a red build.** Monthly compliance cadence → maintenance-sweep/compliance. **FOLD.**
4. **Evidence-linked status** (S7): notes-system — a `status.md` Health row asserting standards/compliance state must link its evidence (manifest/audit); bare ✅ on a multi-item claim is drift. **FOLD.**
5. **Report-review spot-check** (S4/F3.3): process-reports — the hub review pass diffs a report's adoption claims against the node's manifest + tree; a claim with no backing manifest row is a review finding. (Applies to *this very procedure*.) **FOLD.**

### Phase 2 — owner mandates are checklists too
6. **Mandate-ledger** standard: new `hub/standards/mandate-ledger.md` + `templates/mandate-ledger.md` — multi-part owner directives transcribed **verbatim**, one row per clause (quote · interpretation · status · evidence); completion claims cite rows; **deferral requires recorded falsification evidence + a retest trigger**; disclosure lists are **stateful** (open `awaiting-owner` rows re-presented first next session); **ban milestone-anchoring** under an open mandate (a green release never implies mandate-done); **convert recorded lessons into rules at write time.** Verify + compliance row + CLAUDE.md instruction. **FOLD.**

### Phase 3 — ship-contract & repo hardening
7. **Ship-contract**: a release, by default, also drives OpenSSF Scorecard toward max with a **≥ 7.0 floor**, removes tech debt (no stale dep PRs / deprecation warnings / skipped tests / TODO-FIXME baseline), and triages every open PR (merge or close-with-reason). Default: **amend `engineering-quality.md` with a "Ship contract" section** (not a new file — keeps one-source-of-truth; revisit if it outgrows the section). Verify + compliance. **FOLD.**
8. **Full-CI-before-`main`, platform-enforced** (dep guardrail §2): git-workflow + supply-chain — no merge to `main` until **every** CI job on the release PR is green; make it branch-protection **required status checks**, not just prose; new-project-setup gains an explicit "populate required-status-check contexts" step. **FOLD.**
9. **Signed-Releases = provenance AS a release asset**: supply-chain — attestation alone scores 0 on Scorecard; also attach the `*.intoto.jsonl` to the GitHub Release. Tiny `templates/provenance-asset` snippet. **FOLD.**
10. **Dependency guardrails** (4 rules): dependencies.md — pin toolchain to the SAST analyzer's supported range (revert Dependabot bumps that outrun it); keep test+runtime dep versions in sync; verify runtime deps against the **real runtime resolver**, not just the build's; handle Dependabot with judgment (close bumps that contradict a deliberate target). **FOLD.**
11. **Canonical badge set**: badges.md — confirm/extend to the shipped wall; commented distribution badges enabled per project. **FOLD (confirm/extend).**

### Phase 4 — testing floor
12. **Measurable coverage floor**: testing.md — a coverage gate wired into the build (**line ≥ 90% default**, tool per-stack: Kover/c8/istanbul/gcov); rule *"a feature without a test at its own layer is not done"*; the Verify table asks for the **gate's config line**, not a vibe. **FOLD.**
13. **SAST outlives toolchain bumps**: supply-chain — language/compiler upgrades must not out-race the SAST analyzer's supported range; failing SAST is a release blocker, not a deferrable. (Pairs with Item 10 §1.) **FOLD.**
14. **Workflow hygiene as a lintable list**: supply-chain/repo-hygiene — top-level `permissions: contents: read` (elevate only at job scope), every action SHA-pinned, wrapper/artifact validation where the ecosystem has one. **FOLD.** + **"probe the mock first"** note + "gate the gates" in the release runbook. **FOLD.**

### Phase 5 — docs-site
15. **Dokka adapter**: new `docs-site/chrome/adapters/dokka.md` (override `includes/*.ftl` not `base.ftl`; footer inside `#main`; vendored assets via `${pathToRoot}`; `HTML_EXTRA_FILES` for new bundle JS); list **Dokka** in module 06's generator list. **FOLD.**
16. **Chrome bundle CHANGELOG** (P2): `docs-site/chrome/CHANGELOG.md` so "what changed 2.0.0→2.2.1" is a read, not an inference. **FOLD.**
19. **Adaptive three-zone subnav**: docs-site 05 + `chrome/subnav.html` comment — keep zones fixed, make **centre membership a function of what the project has** (Overview pill · Project Notes + one door per non-empty notes section · existing project pages Tutorials?/Changelog/API/Download?/Legal? · right = Repository ↗ + Notes ↗). Kills the random-ai-prompt-vs-despawned-items divergence. Adapter note on per-section landing pages; optional conformance check. **FOLD.**
20. **Rules-on-slots** (S3): `chrome/header.html` + `chrome/subnav.html` slot comments carry the rule inline (*active on a sub-project = Projects, always, only (05)*; canonical subnav shape; centre links must be chrome-wearing pages; a releasing project must include Download). Every adapter + `12-shared-chrome.md` end with a mandatory final step: **run 08-compliance-checklist, record in the manifest.** **FOLD.**

### Phase 6 — clarifications, machine checks, tooling
17. **adopting-updates clarifications**: the *"already-practiced, now-filed"* case (adopting a standard distilled from a node's own notes is a filing/cross-ref act); a *"phasing a mixed adoption"* note (headless-safe now + browser-gated later in one combined report); *"a feature inside the chrome bundle (coins) is a chrome-adoption task."* **FOLD.**
18. **coins.md clarifications**: an *"off the shared chrome (games)"* paragraph (the API + first-view earn run without the header button; a game draws its own affordance); read-time chip anchor fragility (readable column should be `main .content`/`.prose`/`article`); drop-cap must exclude `.ff-readtime`. **FOLD.**
21. **repo-hygiene / check-links fixes**: ship a fuller default SKIP + name the two false-positive classes (verbatim-adopted external-doc mirrors; static-site permalink collections); **strip fenced + inline code before matching** (the standard's own docs trip it); note the gates are runtime-agnostic (bare `node`). **FOLD (standard + `templates/check-links.mjs`).**
22. **legal-docs**: state explicitly the coins disclosure ships **with the coins feature**, not with the standard (rule 2, accurate-to-the-code). **FOLD.**
23. **onboarding JVM/Gradle aside**: onboarding-existing-project + new-project-setup — Maven→Gradle, `VERSION` from gradle/tag not package.json, Dokka/Javadoc as the doc generator, `.jar` + Hangar/Modrinth as the "deploy" analogue; which side owns the **live publish** (hub-side); `dependabot.yml` + `README-badges.md` ship commented non-npm variants. **FOLD.**
24. **agent-tooling additions**: `.NET`/`[IO.File]` needs **absolute** paths on Windows (`Set-Location` ≠ `[Environment]::CurrentDirectory`); the `gh` sandbox blocks stdin-piped `gh api PATCH` + `--delete-branch` but passes the field-flag form + plain merge; PowerShell-over-MCP mangles `-f`/backticks → write a `.ps1` and run `-File`; preview a Jekyll node with `bundle exec jekyll serve` (baseurl-aware), not a static server over `_site/`. **FOLD.**
25. **Machine checks** (S5): new `templates/check-standards.mjs` (fails on a docs template marking any primary-nav item other than Projects active; on `VERSION` ≠ newest tag at main-merge; optional subnav-shape grep) + **fix `templates/branch-sync.yml` for the PR path** (re-check after a grace window so it's not red on every compliant PR release). **FOLD.**
26. **Standards versioning mechanism** (P2): a per-standard `Updated:`/`Since:` stamp **or** a hub-side `hub/standards/CHANGELOG.md`, plus (stretch) a generated one-page index of all `## Verify` tables. Default: add a `hub/standards/CHANGELOG.md` + a `Since:`/`Updated:` line to each standard's header going forward. **FOLD (CHANGELOG now; per-file stamp as they're touched).**

### Already-addressed / node-side (recorded, no fold)
- Force-push fallback / shallow-mirror friction (pse2, random-ai-prompt checks) — **ALREADY** (0.9.6 full-history mirrors; the checks describe the *old* shallow behaviour). Note: two 2026-07-19 checks still narrate `reset --hard` after a "forced update" — worth confirming the mirrors are full-history now, else a doc nudge.
- Doxygen `HTML_EXTRA_FILES` note (pse2) — folds into the Dokka/Doxygen adapter guidance (Item 15 neighbourhood). **FOLD (adapter).**
- Self-host fonts in the bundle (pse2, standing) — **DEFER** (bundle-content change, its own pass; already filed).
- `[IO.File]` cwd, `gh` forms, jekyll serve baseurl — **FOLD** into Item 24.

## Design forks I'm resolving by default (owner's eyes — S8/S9 disclosure)
- **Ship-contract → a section of `engineering-quality.md`**, not a new standard (one-source-of-truth; the node offered either). Reversible.
- **Checklists-are-contracts and mandate-ledger → new standalone standards** (each is a distinct load-bearing rule with its own Verify; folding them into planning/compliance would bury them — the exact "rules far from point of use" failure).
- **Coverage floor = line ≥ 90% default**, per-stack tool, overridable per project with a recorded reason (not every stack hits 90 on generated/UI code).
- **Standards versioning = a `hub/standards/CHANGELOG.md` now**; per-file `Updated:` stamps added as each standard is touched this pass (don't rewrite all 27 headers in one go).

## Release shape
A **MINOR** milestone (largest fold-back yet; peers: 0.12.0, 0.18.0, 0.20.0) → **`0.21.0`**,
built on `dev` in themed commits (one per phase, changelog entry + touched-file `## Verify`
+ compliance rows inside each), `jekyll build` green, released `dev → main` the git-flow
MINOR way (release branch, tag `v0.21.0`, back-merge). Then: advance every digested report
in `.last-seen.yml reports_through`, reconcile nothing product-side, and write the hub's
own process report (`notes/fairyfox-reports/2026-07-23-report-review.md`) — fairyfox.io is
a node too. If the session ends before every item ships, the remainder is recorded here as
`gap(next pass)` — never marked done unbuilt (practicing the very rule being folded).
