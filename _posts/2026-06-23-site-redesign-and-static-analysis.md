---
title: "A redesign for the site, and a static-analysis gate for the save editor"
subtitle: "fairyfox.io gets a full-bleed dark-first layout (0.3.x); Pokered Save Editor 2 adds a clang-tidy/cppcheck gate that catches a real percent bug, plus tests that assert more than values."
date: 2026-06-23
tags: [fairyfox-io, pokered-save-editor-2, site, update]
---

Today split between the hub and the save editor: the site itself shipped a redesign, and
Pokered Save Editor 2 turned to the parts of a codebase that don't show up on screen.

## A redesign for the site itself

The previous design stacked everything into a single narrow column. The rebuilt
`assets/css/main.css` replaced that with a full-width fluid container and full-bleed section
bands, alternating tints to separate them, and a sticky footer. A second pass made the theme
**dark by default**, with the light theme following the OS (`prefers-color-scheme`); colour
moved into per-project accents and the brand mark.

Contrast was treated as a requirement: every text/background pair was computed against
**WCAG 2.1 AA** and meets it, with `:focus-visible` outlines and a `prefers-reduced-motion`
guard. The header's Projects menu became a plain list of project names linking to each
project's on-site docs, "Blog" became "Updates" throughout, and the home page traded its
oversized hero for a compact masthead, full-width Projects and Latest-updates sections, and a
documentation grid. Each project gained its real application icon.

The `/docs/` library was expanded to surface the whole `notes/` tree under a new "This site"
category — architecture, the system map, deployment, the updates workflow, decisions, and
principles — and the lone SVG favicon was replaced with a complete cross-platform set. The
milestone landed as `0.3.0`, with follow-ups taking it to `0.3.2`.

## Pokered Save Editor 2: a static-analysis gate, and tests beyond values

[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2) added a
static-analysis gate that didn't exist yet, and grew its test suite past asserting *values*.
The version moved from `0.14.0-alpha` to `0.14.2-alpha`.

**A linting layer, and the bug it found.** The pass added a curated, defect-focused
`.clang-tidy` (the clang analyzer plus bugprone/performance/unused-code checks; the noisy
style families deliberately left off), a cppcheck suppressions file, lint scripts, and a
GitHub Actions `lint` workflow — file-parallel over ~140 Qt translation units, landing clean
(143 TUs, zero findings). It got there by fixing the real defects the first run surfaced. The
most consequential was a percentage wrong for most of its range:

```cpp
// PokemonBox::expLevelRangePercent() — returns a float
- return curExp / expEnd;        // both var32: integer divide, THEN widen → truncated
+ return expEnd ? (float)curExp / expEnd : 0.0f;   // float divide + divide-by-zero guard
```

Because both operands were 32-bit integers, the fractional part was discarded *before* the
result widened to float — so the progress-through-level percentage was pinned at 0 until the
top of a level. The same run caught an unguarded pointer dereference, a signed/unsigned
comparison, an integer-multiply widening, loop variables that should have been const
references, and a missing `default` in a switch.

**A dead store that wasn't a no-op.** One finding was a behavioural bug: a constructor meant
to reset a random PP-Up count to zero assigned the shadowing parameter instead of the member,
so new moves silently carried 0–3 PP-Ups they shouldn't have:

```cpp
- ppUp = 0;          // assigns the parameter — a no-op; the member keeps its random value
+ this->ppUp = 0;    // assigns the member, as intended
```

**Tests that assert more than values.** The suite gained the missing test *types*: signal/slot
coverage (`QSignalSpy`), model contracts (`QAbstractItemModelTester`), a visual-regression
floor (every screen must render a non-trivial spread of colours — catching a screen that
loads clean yet renders blank), and acceptance scenarios stated as Given/When/Then:

```text
GIVEN a loaded save file
WHEN  every screen is visited in turn
THEN  zero save bytes change   // "Save File Integrity Is Sacred"
```

The full `ctest` run stays green. With the test types now broad — values, signals, model
contracts, GUI behaviour, visual rendering, and acceptance — the remaining work is depth.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [v0.14.2-alpha release](https://github.com/junebug12851/pokered-save-editor-2/releases/tag/v0.14.2-alpha)
- [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) ·
  [QAbstractItemModelTester](https://doc.qt.io/qt-6/qabstractitemmodeltester.html)
