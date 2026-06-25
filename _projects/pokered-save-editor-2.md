---
key: pokered-save-editor-2
---
A desktop save-file editor for the Pokémon Red &amp; Blue generation, built in Qt 6
(C++/QML) over a clean four-layer architecture (common → db → savefile → app). Its prime
value is **byte-exact** save read/write, so every edit round-trips perfectly. It covers
team, box, item, and randomiser editing, plus an in-game-font on-screen keyboard, and
carries a comprehensive QtTest/CTest suite (~90% library coverage), a clang-tidy/cppcheck
static-analysis layer, and CI. This is the project the hub's shared conventions came from.
