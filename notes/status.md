# Project Status

_Current state only._ For the chronological history see [`sessions/`](sessions/README.md);
for the commit-by-commit changelog see [`version.md`](version.md).

**Version:** `0.1.0` (single source of truth: repo-root `VERSION`; see
[`reference/versioning.md`](reference/versioning.md)).

## Current state (read this first)

The site is **freshly scaffolded** (2026-06-22). It's a clean, custom Jekyll
build — no external theme — deployed to GitHub Pages by GitHub Actions on every
push to `main`. The structure is in place end to end:

- **Site:** home, `/projects/`, `/blog/`, `/about/`, a first blog post, RSS feed,
  SEO tags, sitemap. Custom responsive CSS with light/dark.
- **Hub:** [`../hub/`](../hub/) holds the cross-project standards + templates and
  the project registry. This is what other repos pull.
- **Notes:** this living-notes system, mirroring the convention used across my
  projects.
- **Sync:** the pull-only cross-project model is documented
  ([`reference/cross-project-sync.md`](reference/cross-project-sync.md)) and the
  two reference repos are cloned under `assets/references/` (git-ignored).

## In flight / awaiting

- **GitHub repo + first deploy.** Repo `junebug12851.github.io` to be created,
  pushed, and Pages enabled (build via Actions). Until then nothing is live.
- **Custom domain `fairyfox.io`.** `CNAME` is committed; DNS must point at GitHub
  Pages and the domain must be set in repo Settings → Pages for HTTPS to issue.
- **Local build check.** Ruby/Jekyll being installed locally to verify the build
  before relying on CI.

## Next

See [`plans/next-steps.md`](plans/next-steps.md). Headline items: confirm the
first Actions deploy is green, wire DNS for the custom domain, and write the
first real "what changed in my projects" round-up once there's a diff to report.

## Health

| Area | Status |
|------|--------|
| Jekyll config + layouts | ✅ Scaffolded |
| Content pages (home/projects/blog/about) | ✅ In place |
| Pages deploy workflow | ✅ Written — not yet run |
| Custom domain | ⏳ CNAME committed; DNS pending |
| Local build verification | ⏳ Pending Ruby install |
