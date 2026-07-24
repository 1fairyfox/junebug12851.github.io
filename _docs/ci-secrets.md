---
title: CI service secrets
nav_title: CI secrets
category: standards
order: 32
summary: The three per-repo GitHub Actions secrets that make the code-quality, coverage, and Scorecard integrations light up — named, sourced, and provisioned by a tool.
---

Three CI integrations each need a **per-repo GitHub Actions secret** before their workflows can
run. They are the values that make the [badges](/docs/badges/), the coverage gate in
[testing](/docs/testing/), and the Scorecard signal in
[supply-chain hardening](/docs/supply-chain-hardening/) actually light up rather than render
"unknown" forever. This standard names the three secrets, records where each value comes from, and
provides the tool that provisions them. The canonical copy is in the repository at
`hub/standards/ci-secrets.md`.

## The secrets

- **`SONAR_TOKEN`** (SonarCloud) — unlocks the quality-gate and tech-debt analysis and the Sonar
  badges.
- **`CODECOV_TOKEN`** (Codecov) — the coverage upload from CI and the coverage badge.
- **`SCORECARD_TOKEN`** (OpenSSF Scorecard) — a GitHub personal access token that reads branch
  protection and publishes results above the default token's reach.

All three are single-line tokens set under the name the workflows reference. The provisioning tool
(`hub/tools/repo-tokens.ps1`) streams each value straight to `gh secret set` from a concealed
prompt — nothing touches disk or history, and a blank entry skips that secret.
