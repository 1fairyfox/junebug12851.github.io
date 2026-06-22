# Versioning — the scheme and the source of truth

The project uses **Semantic Versioning 2.0.0** as the people-facing number.

> This is this repo's copy of the shared standard. Canonical, project-agnostic
> version: [`../../hub/standards/versioning.md`](../../hub/standards/versioning.md).

## The number

`MAJOR.MINOR.PATCH`

- **MAJOR** — `0` while pre-1.0. Going to `1.0.0` is a deliberate "this is real
  and stable" promise — **Twilight's call only, never bumped automatically.**
- **MINOR** — a genuine milestone (a real new section/feature of the site or hub).
- **PATCH** — **the default**: content updates, fixes, styling, ordinary changes.
  Not capped at 9 — let it run (0.1.7 … 0.1.42 …). When unsure, choose PATCH.

Started at **`0.1.0`**: the scaffold exists and builds, but nothing is live yet
and there's lots still to add. A clean runway to `0.x` as it fills in, `1.0.0`
when it's a real, stable home.

## Single source of truth: `VERSION`

The repo-root **`VERSION`** holds the number on one line (`#` comments allowed).
It is the *only* place the version is edited. Don't hardcode a version anywhere
else; if something needs to show it, read it from `VERSION`.

> The changelog lives at `notes/version/` — a subdirectory, so on case-
> insensitive Windows there's no `VERSION` vs `version/` path collision.

## How to bump

1. Edit the one line in **`VERSION`**.
2. Stage it in the **same commit** as the change that warranted it.

That's it — there's no build step that consumes it yet (it's a static site). If
one is added later (e.g. a footer version stamp), derive it from `VERSION` rather
than introducing a second literal.

## Releases / tags (optional)

This is a rolling site, so formal releases aren't expected. If a notable version
is worth anchoring, tag the `main` commit `vX.Y.Z` and push the tag — created on
request, not automatically.

## Relationship to the changelog

- **`VERSION` + this scheme** = the *label* (where you are).
- **[`../version.md`](../version.md) + `version/`** = the *story* (what changed,
  per commit). Complementary, not the same thing.
