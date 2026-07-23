# Standards adoption manifest

The node's **per-standard record of what is actually adopted** — the artifact whose
absence blocks a summary claim. One row per hub standard. It exists so that no
`Standards adopted ✅` can be written without a backing row, and so a future
post-mortem (or the hub's report-review spot-check) can diff a claim against reality
cheaply. Governed by the hub standards `checklists-are-contracts` and `notes-system`
("The adoption manifest"); read by the release gate in `git-workflow` (repoint these to
your node's read-only hub clone if you want live links).

## The rules (do not soften)

- **`copied-only` is not adopted.** A file landing in `notes/reference/` is `copied-only`.
  A row flips to **`implemented`** *only* when that standard's `## Verify` table has been
  run and its result recorded here (date + per-row pass).
- **No summary claim without a row.** `status.md` Health, the registry `adopts_hub` flag,
  and any process report's "adopted X" must be backed by a row in this table. A bare
  `Standards adopted ✅` is banned wording.
- **A partial names its remainder.** Every not-yet-adopted standard is a `gap` row with a
  **due** marker (at minimum "next adopt pass") — the remainder lives here, owned and
  dated, never only in prose.

## State vocabulary

`implemented` (Verify run + recorded) · `copied-only` (file present, Verify not run) ·
`gap(<due>)` (not adopted; when it will be) · `N-A(<reason>)` (does not apply to this
project's kind — say why).

## Manifest

Replace the example rows. `Adopted @` = the hub `VERSION`+commit the row was last
reconciled against. `Last Verify` = date + result (or `—`). `Evidence` = a link/path to
the proof (a config line, a workflow, an audit file).

| Standard | State | Adopted @ | Last Verify | Evidence |
|----------|-------|-----------|-------------|----------|
| git-workflow | copied-only | 0.0.0 / xxxxxxx | — | |
| versioning | copied-only | 0.0.0 / xxxxxxx | — | |
| notes-system | copied-only | 0.0.0 / xxxxxxx | — | |
| ai-context | copied-only | 0.0.0 / xxxxxxx | — | |
| cross-project-sync | copied-only | 0.0.0 / xxxxxxx | — | |
| process-reports | copied-only | 0.0.0 / xxxxxxx | — | |
| compliance | copied-only | 0.0.0 / xxxxxxx | — | |
| checklists-are-contracts | copied-only | 0.0.0 / xxxxxxx | — | |
| mandate-ledger | copied-only | 0.0.0 / xxxxxxx | — | |
| planning | copied-only | 0.0.0 / xxxxxxx | — | |
| docs-site | copied-only | 0.0.0 / xxxxxxx | — | |
| deployment | copied-only | 0.0.0 / xxxxxxx | — | |
| testing | copied-only | 0.0.0 / xxxxxxx | — | |
| engineering-quality | copied-only | 0.0.0 / xxxxxxx | — | |
| ship-contract | copied-only | 0.0.0 / xxxxxxx | — | |
| supply-chain-hardening | copied-only | 0.0.0 / xxxxxxx | — | |
| dependencies | copied-only | 0.0.0 / xxxxxxx | — | |
| repo-hygiene | copied-only | 0.0.0 / xxxxxxx | — | |
| docs-lifecycle | copied-only | 0.0.0 / xxxxxxx | — | |
| research-capture | copied-only | 0.0.0 / xxxxxxx | — | |
| working-rhythm | copied-only | 0.0.0 / xxxxxxx | — | |
| self-hosted-assets | copied-only | 0.0.0 / xxxxxxx | — | |
| legal-docs | copied-only | 0.0.0 / xxxxxxx | — | |
| coins | copied-only | 0.0.0 / xxxxxxx | — | |
| badges | copied-only | 0.0.0 / xxxxxxx | — | |
| agent-tooling | copied-only | 0.0.0 / xxxxxxx | — | |
| maintenance-sweep | copied-only | 0.0.0 / xxxxxxx | — | |
| farm-operating-model | N-A(reason) | 0.0.0 / xxxxxxx | — | integrated-farm tier only |
| new-project-setup | N-A(runbook) | 0.0.0 / xxxxxxx | — | join-time runbook, not a standing rule |
| onboarding-existing-project | N-A(runbook) | 0.0.0 / xxxxxxx | — | join-time runbook |
| adopting-updates | N-A(runbook) | 0.0.0 / xxxxxxx | — | procedure runbook |
