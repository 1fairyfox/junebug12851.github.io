---
title: Pokered Save Editor (predecessor)
nav_title: Pokered Save Editor (v1)
category: projects
order: 2
summary: The original Electron/Angular save editor for Pokémon Red & Blue — complete and stable.
---

A desktop application for editing Pokémon Red & Blue (Game Boy) save files,
built with Electron and Angular (TypeScript). It is open source under Apache-2.0
and is the **predecessor** to [Pokered Save Editor 2](/docs/pokered-save-editor-2/),
the in-progress Qt 6 rewrite.

It is complete and stable: while the rewrite is still in alpha, this is the
recommended working tool for actually editing a save.

## What it does

- Edits the full save file used by the game — every bit and byte — including the
  trainer/player card, Pokédex, party and box Pokémon, items, world events,
  hidden items, and the Hall of Fame.
- Provides a full slide-out virtual keyboard for name entry, exposing all 255
  tiles and control codes (with shorthand like `<f>` / `<B>`) that aren't
  directly typable.
- Can wipe unused save space, cleaning up the file and stripping any tampering or
  injected data without changing in-game behaviour.

The interface is built for an intuitive, jump-in-and-use experience, with UI/UX
treated as a first-class concern.

## Status and relationship to v2

This project reached a stable release (15 releases, last tagged in 2019) and is
no longer under active development. Its successor,
[Pokered Save Editor 2](/docs/pokered-save-editor-2/), is a ground-up Qt 6
(C++/QML) rewrite that aims for byte-exact editing with a comprehensive test
suite. Until the rewrite reaches parity, this original remains the
fully-working option.

It is **outside the shared standards / cross-project sync** used by the newer
repositories — it predates them and is listed here for reference only.

## Links

- Repository: <https://github.com/junebug12851/pokered-save-editor>
- Readme: <https://github.com/junebug12851/pokered-save-editor#readme>
