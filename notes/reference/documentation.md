# Documentation

What documents this project, and the house style for writing it.

## The documentation set

| Doc | Audience | What it's for |
|-----|----------|---------------|
| `README.md` | Humans landing on the repo | What this is, how to run/build it, the map of the repo |
| `CLAUDE.md` | An AI opening the repo cold | The entry point — points at `notes/status.md` and lays out the standing workflow |
| `notes/` | Both | The living knowledge base (this system) |
| `hub/` | Other repos | The shared standards + templates other projects adopt |
| The site itself | The public | `about.md` and the blog explain the project to visitors |

These overlap on purpose, at different depths: the site is the elevator pitch,
the `README` is the repo tour, `CLAUDE.md` + `notes/` are the full manual.

## House style (for `notes/` and `hub/`)

- **Direct and plain.** Notes, not prose poetry. Short beats long. No filler
  intros/outros.
- **Code blocks for code, tables for lookups.**
- **Bold the single most important line** in a section.
- **Cross-link, don't duplicate.** One fact has one home; everything else links
  to it.
- **ASCII**, present tense, project's-eye view.

## Keeping docs current

Docs are **living** and updated by default as work happens — see the maintenance
loop in [`../README.md`](../README.md) and `../../CLAUDE.md`. The rule of thumb:
if a future reader (you in six months, or an AI) would be confused without it,
write it down in the right file now, not later.
