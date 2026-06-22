# Session Logs

The running history of the project — **what changed each working session and
why.** One file per calendar day, grouped into **month folders**:
`sessions/YYYY-MM/YYYY-MM-DD.md` (e.g. `sessions/2026-06/2026-06-22.md`).

[`../status.md`](../status.md) holds the *current* state. These files hold the
*story* of how it got there. Reusable lessons live in [`../reference/`](../reference/)
and rationale in [`../decisions/`](../decisions/); the session logs are the
narrative and the pointer.

## The system (how to keep this updated)

**Each working day gets one file: `sessions/YYYY-MM/YYYY-MM-DD.md`.** When you
do work worth recording, append an entry to *today's* file (create it — and the
`YYYY-MM/` month folder, if it's a new month — if it's the first entry of the
day). Within a day, newest entry on top. Keep it current by default, the same
way the [changelog](../version.md) is.

Day file skeleton:

```markdown
# 2026-06-22 — Session Log

## <short title of the change> — <one-line outcome>

What changed, the root cause if it was a bug, the files touched, the
verification result, and any follow-up. Plain English, no diff noise.
```

### Conventions

- **One file per day**, `YYYY-MM-DD.md`, inside a **`YYYY-MM/` month folder**.
  Both folders and files sort chronologically on their own.
- **Newest entry on top** within a day; **newest day** is the highest-numbered
  file in the newest month folder.
- **Cross-link, don't duplicate.** Reusable lessons → `../reference/`. Current
  health → `../status.md`. The session log says *what happened and points at the
  detail.*
- **Voice:** plain and matter-of-fact, from the project's perspective.

### Relationship to the changelog

The [changelog](../version.md) (`version/YYYY-MM.md`) is **one entry per git
commit**, written *inside* the commit. The session log is **one entry per
working day**, broader than any single commit (a day often spans several commits,
or none yet). They overlap but serve different readers.
