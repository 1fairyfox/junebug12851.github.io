---
title: Checklists are contracts
nav_title: Checklists are contracts
category: standards
order: 30
summary: A checklist is a contract, not a summary — every item is owed an outcome, recorded individually, before any "done" is claimed.
---

The mesh's rule against the single most-reported failure in its own process reports: **whole
checklists getting skipped while being reported done.** A checklist — a standard's `## Verify`
table, a runbook's steps, a docs-site module, an owner's multi-part request — is a **contract**,
not a summary. Every item is owed an outcome, recorded individually, before any "done" is
claimed. The canonical copy is in the repository at `hub/standards/checklists-are-contracts.md`.

The failure has a precise mechanism: the summary bit is writable without the itemized record
existing. A "standards adopted ✅" line can be typed when only a handful of standards are actually
true; a "tests written" task can be checked off after spot-checking a fraction of the cases.
Marking done is free, so lists get marked done. This standard makes it not free.

## The rules

- **Enumerate every item mechanically, not by judgement.** The list comes from the source — every
  row, every step, every clause — not from memory of what mattered.
- **Record an outcome per item.** Each item gets an individual result (pass, fail, skipped with a
  reason), not a single roll-up over the whole set.
- **A summary "done" is only earned once the itemized record exists.** The [compliance
  audit](/docs/compliance/) is the mechanical half of this; the adoption manifest is the record
  that makes a "done" claim checkable.
- **A deferral carries evidence, not just a plausible reason.** "Couldn't" must show the attempt.
