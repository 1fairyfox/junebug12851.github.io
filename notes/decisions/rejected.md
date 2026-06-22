# Rejected / Not Done

Things considered and deliberately not done — so they aren't re-litigated.

### Git submodules for cross-project sharing — rejected

Submodules pin a commit and couple repos at clone/build time, which is the
opposite of the loose, modular wiring wanted here. Replaced by on-demand shallow
clones in a git-ignored `assets/references/`. See
[`../reference/cross-project-sync.md`](../reference/cross-project-sync.md).

### Automatic cross-repo triggers (webhooks / CI chaining) — rejected

Having one repo's update automatically pull/build another is exactly the
recursion risk the model avoids. All sync pulls are manual / on explicit AI
request. A *scheduled* pass is allowed, but it produces a draft for review and
doesn't push into other repos.

### An off-the-shelf Jekyll theme (Minima etc.) — not used

A gem theme would be faster to start but adds upgrade churn and hides the markup.
For a small personal site, a hand-owned custom theme is simpler to live with.

### Committing the reference clones — rejected

Tracking `assets/references/*` would nest repos and bloat history for content
that's a throwaway read. Git-ignored instead.

### Putting the version number in `_config.yml` — rejected

The single source of truth is repo-root `VERSION`. A second copy in `_config.yml`
would drift. If the site ever needs to display the version, read it from
`VERSION` at build time. See [`../reference/versioning.md`](../reference/versioning.md).
