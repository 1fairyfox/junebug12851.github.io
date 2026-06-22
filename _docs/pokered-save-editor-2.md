---
title: Pokered Save Editor 2
nav_title: Pokered Save Editor 2
category: projects
order: 1
summary: A Qt 6 desktop save-file editor for Pokémon Red & Blue.
---

A desktop application for editing Pokémon Red & Blue (Game Boy) save files,
built in Qt 6 with a C++ core and a QML interface. It is open source.

## What it does

- Edits the full save: trainer card, Pokédex, team and box Pokémon (stats, moves,
  DVs/EVs, nicknames), items, and world state.
- Reads and writes saves **byte-for-byte**: only the bytes for an intended edit
  change, and nothing else — a core design constraint of the project.
- Includes map and full-game randomisation that stays within playable bounds, and
  an in-game font keyboard for name entry.

## Architecture, in brief

The codebase is layered — a common library, a save-file library, a data library,
and the application/QML layer — with a comprehensive automated test suite
(QtTest/CTest) and continuous integration. It originated in 2017–2020 and was
revived in 2026.

It is a ground-up rewrite of the original
[Pokered Save Editor](/docs/pokered-save-editor/) (Electron/Angular). While this
Qt 6 version is still in alpha, that predecessor remains the complete, stable
tool for editing a save.

## Full documentation

The project publishes its own documentation site (generated API documentation
plus its living notes) and is developed in the open:

- Documentation site: <https://fairyfox.io/pokered-save-editor-2/>
- Notes: <https://github.com/junebug12851/pokered-save-editor-2/tree/main/notes>
- Repository: <https://github.com/junebug12851/pokered-save-editor-2>

This project is also the origin of the shared
[engineering standards](/docs/) used across the other repositories.
