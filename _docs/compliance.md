---
title: Standards compliance audit
nav_title: Compliance audit
category: standards
order: 12
summary: One on-request pass that runs every standard's own check at once and reports, per standard, whether a repository follows it.
---

A standard is only real if two things are true: it is **established** — written once,
canonically, and reflected everywhere it is used — and it is **enforced** — there is a
concrete check that catches a violation. A rule with no check is just a suggestion.
This standard is the enforcement instrument. Its canonical copy lives in the
repository at `hub/standards/compliance.md`; this page is the readable summary.

## Establishment vs. enforcement

Establishment is consistency: the rule in `hub/standards/` matches the templates, the
skeleton, the runbooks, and the `CLAUDE.md` files that operationalize it. Drift
between the spec and those artifacts is exactly why a project "forgets" a rule — it
follows the stale artifact, not the spec. Enforcement is the separate question of
whether anyone actually *checks*. Each atomic standard now answers it in its own
`## Verify` section — a short pass/fail check for that one rule.

## The audit

The compliance audit is the **single, recurring, whole-set** pass: run on request
against the hub or any one project, it runs every standard's `Verify` check at once
and reports `done`, `partial`, or `missing` for each, naming the exact gap for
anything not done. A repository that looks clean but has one `missing` row is not
compliant, and the report says which. It sits alongside two narrower checks: the
[onboarding completeness audit](/docs/onboarding-existing-project/) is the join-time
gate ("did this project join the mesh yet?"), and the docs-site checklist is the deep
check for that one standard — while this audit asks "is it *still* following
everything?"

## Same decoupled posture

The audit introduces no new flow. It reuses the read-only, on-request reads of the
[cross-project sync](/docs/cross-project-sync/) model, reports its findings, and
changes nothing on disk. On a go-ahead it fixes only the right side: hub drift is
fixed in the hub standard; a project's gap is the project's to close through ordinary
[adoption](/docs/adopting-updates/). The hub never edits a project to make it pass.
