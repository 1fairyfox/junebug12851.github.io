---
title: Owner mandates become ledgers
nav_title: Mandate ledger
category: standards
order: 31
summary: An owner's multi-part directive is transcribed verbatim into tracked entries, so no clause quietly becomes optional between one message and the next.
---

An owner's multi-part directive is a **checklist**, and the mesh's rule for checklists —
[checklists are contracts](/docs/checklists-are-contracts/) — binds it exactly as it binds a
standard's `## Verify` table. This standard is the owner-directive case spelled out, because it is
where the mesh most visibly bled: a request given in one message that took several prompts to
finish, each round feeling pushed off, each round proving the last was capable all along. The
canonical copy is in the repository at `hub/standards/mandate-ledger.md`.

The mechanism it prevents is a directive that is **lossy-compressed at intake, with the loss never
audited.** A dozen load-bearing words become a task with a short name that keeps only some of them;
once the summary task is checked off, the un-transcribed words are unrecoverable because nothing
re-reads the original message. A request that doesn't become an entry becomes optional.

## The rules

- **Transcribe the directive verbatim, one entry per clause,** before any work starts.
- **Each entry gets a tracked outcome** — done, or deferred with evidence of the attempt — diffed
  back against the original words at every phase.
- **"Do as much as you can" is not permission to re-anchor "done"** to a shippable milestone; done
  means the mandate is exhausted, not that a release went out.
