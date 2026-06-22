# Architecture Decisions

Key structural choices and why. Newest on top.

### Track the `dev` branch for cross-project sync (2026-06-22)

Both sync flows (hub-reads-projects, projects-read-hub) track **`dev`**, not
`main`. Rationale: round-ups should report the *latest* work, and projects
adopting standards want the current version. `dev` is where work lands first in
this branch model. (If a project lacks a `dev` branch, fall back to its default.)

### User site repo (`junebug12851.github.io`) + custom domain (2026-06-22)

Chose a GitHub **user site** (repo literally named `<username>.github.io`) rather
than a project repo. A user site serves at the root, which suits a personal hub,
and the `fairyfox.io` custom domain is pointed at it via `CNAME`. The same repo
doubles as the standards/sharing hub — one thing to clone, one home for standards.

### Build with our own Bundler + Jekyll in Actions, not the Pages gem (2026-06-22)

GitHub's built-in "Deploy from a branch" Pages build restricts plugins to an
allowlist and pins Jekyll. Building ourselves (`ruby/setup-ruby` → `bundle exec
jekyll build` → `upload/deploy-pages`) lifts both limits and is the modern,
recommended path. Source must be set to "GitHub Actions" in repo settings.

### Custom Jekyll, no external theme (2026-06-22)

Hand-owned layouts/includes/CSS instead of a gem theme. Full control over a small
surface, no theme upgrade churn, and the markup stays legible. The cost (writing
our own CSS) is small for a site this size.

### One repo holds site + notes + hub (2026-06-22)

The website, the living `notes/`, and the cross-project `hub/` all live in the
same repo, with `notes/`, `hub/`, and `assets/references/` excluded from the
rendered site in `_config.yml`. Rationale: the hub *is* the home page's repo, so
there's exactly one thing to clone and one place standards live.

### Reference clones git-ignored, not committed (2026-06-22)

`assets/references/*` (shallow clones of other repos) are git-ignored — only the
folder's `README.md` is tracked. Committing them would nest repositories, bloat
history, and couple the repos. The pull-on-demand model needs only a throwaway
working copy. See [`../reference/cross-project-sync.md`](../reference/cross-project-sync.md).

### Adopted the living-notes system + inline-changelog rule (2026-06-22)

Mirrored the proven system from `pokered-save-editor-2`: status / sessions /
changelog / context / systems / reference / decisions / plans, with each
commit's changelog entry written *inside* that commit (no recursion-prone
"document the last commit" follow-ups). Keeps the repo self-documenting.
