# Future / Longer-term

Looser ambitions — no commitment, just direction.

## The north-star vision

The big one this all builds toward (see [`../context/project.md`](../context/project.md)
→ "Why this matters"):

- **A unifying mesh over everything.** Scale the hub model into a real overarching
  system that ties together a large set of projects — eventually on the order of
  **dozens to a couple hundred** — through cleanly decoupled, non-recursive,
  on-request communication. No coupling, no loops; intelligent links.
- **The assistant as the persistent management/stability layer.** Over time, take
  on tracking the system, surfacing changes, and managing the moving parts (GitHub
  activity, pull requests, releases, cross-project state) so it stays stable and
  current beyond any single person's day-to-day capacity. Fairy Fox creates; the
  assistant realizes, manages, and persists.
- **The integrated "maze" landing experience.** A landing page that walks visitors
  through interconnected posts, **live/workable examples**, updates, and deep
  docs — the platform as one woven whole. Design language groundwork is in
  [`../context/design-direction.md`](../context/design-direction.md).

Everything below is a smaller step toward that.

- **More projects in the hub.** As repos adopt the shared standards, grow
  `_data/projects.yml` + `hub/registry.yml` together. Consider auto-generating the
  projects list from the registry if they diverge in practice.
- **Richer round-ups.** A tighter "what changed" pass — e.g. per-project sections,
  links to specific commits, maybe a small changelog feed aggregated across repos.
- **A uses / now page.** What I'm currently into, tools I rely on.
- **Tags / archives** for the blog once there are enough posts to warrant them.
- **A hub adoption checklist** other repos can follow to onboard the standards in
  one sitting (partly covered by `hub/templates/` already).
- **Light analytics that respect privacy** (or none) — only if there's a reason.
- **Promote more conventions to `hub/standards/`** as patterns prove out across
  projects (testing, release, issue templates, etc.).
