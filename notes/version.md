# Changelog (Version History)

A plain-English history of the project, **one entry per commit, newest first.**
Each entry expands the commit message into a short narrative of what actually
changed and why — the diff details left out.

> **Not to be confused with [`reference/versioning.md`](reference/versioning.md).**
> *This* file (and `version/`) is the **changelog** — what changed, per commit.
> `versioning.md` is the **version-number scheme** (SemVer, the `VERSION` file).
> One is the story; the other is the label.

The changelog is **split by month** under [`version/`](version/2026-06.md) so no
single page gets unwieldy. This file is the index; pick a month below (newest
first).

## Months

| Month | Notes |
|-------|-------|
| [June 2026](version/2026-06.md) | Project created |

## How this is kept updated (the inline rule)

**Write each entry as part of the commit it describes — before committing, not
after.** When you make a change, add its entry to the top of the current month's
file under `version/` and stage it in the **same commit** as the change. One
commit = the work plus its own changelog entry. No automated script, no separate
"update the changelog" commit.

This is a deliberate root-cause fix. Writing entries after the fact means a
follow-up commit to document prior commits — but that follow-up is itself an
undocumented commit, which needs another, forever. Folding the entry into the
same commit removes the recursion.

A commit cannot contain its own hash, so **inline entries carry no marker and no
short-hash byline**. To find the commit for an entry, `git blame` the line.

Inline entry format (newest on top; create `version/YYYY-MM.md` and add a row to
the table above when the month rolls over):

```
### YYYY-MM-DD — Short human title

One or two paragraphs in plain English. More for big commits, a sentence or two
for trivial ones. No diff noise.
```

### Exceptions

- **Notes-only / changelog-only maintenance commits are not self-documented** —
  documenting the documentation is exactly the noise this avoids.

## Relationship to the session logs

The changelog is **one entry per git commit**; the
[session logs](sessions/README.md) are **one entry per working day**, broader
than any single commit. They overlap but serve different readers.
