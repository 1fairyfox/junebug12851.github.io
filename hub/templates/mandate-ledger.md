# Mandate ledger — <date> — "<short mandate title>"

Verbatim transcription of a multi-part owner directive, one row per clause, written
**before** execution. Governed by the hub standard `mandate-ledger` (owner directives are
checklists too). Completion claims cite these rows; the phase-end check diffs delivered work
against the **owner's original words**, not this file.

**Source message (verbatim):**

> <paste the owner's message here, unedited>

## Clauses

`Status`: `done` · `blocked-with-evidence` · `awaiting-owner`.
A `blocked` row **must** carry an attempt log (command/error/version) + a retest trigger.

| # | Owner's words (verbatim) | Interpretation | Status | Evidence / attempt log |
|---|--------------------------|----------------|--------|------------------------|
| 1 | <quote> | <what it concretely means> | awaiting-owner | |
| 2 | <quote> | | awaiting-owner | |

## Rows remaining

**N of M** clauses open (`awaiting-owner` + `blocked`). A release may ship with rows open,
but every completion claim states this count — a green release never implies the mandate is
done. On a repeated mandate, escalate every `awaiting-owner` row to do-now; a second
repetition of the same item is a reportable process failure.

## Not done / read leniently / needs the owner's eyes

- <volunteer everything not fully done, or read leniently — do not wait to be asked>
