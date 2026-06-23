---
title: "Pokered Save Editor 2: a static-analysis gate, and tests beyond values"
subtitle: "A new linting layer catches a percent bug that had been silently rounding to zero, and the test suite grows past asserting values into signals, model contracts, and blank-render detection."
date: 2026-06-23
tags: [pokered-save-editor-2, update]
---

After a run of editor-UI work,
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
turned to the parts of a codebase that don't show up on screen: a static-analysis
gate that didn't exist yet, and a test suite that had been thorough about *values*
but quiet about everything around them. The version moved from `0.14.0-alpha` to
`0.14.2-alpha` across this work.

## A linting layer, and the bug it found

The project had no static analysis. This pass added one: a curated, defect-focused
`.clang-tidy` (the clang static analyzer plus the high-signal bugprone, performance,
and unused-code checks — the noisy style families deliberately left off and
documented as such), a cppcheck suppressions file, `lint` scripts for both shells,
and a GitHub Actions `lint` workflow. The gate runs file-parallel over ~140 Qt
translation units and lands clean: 143 TUs, zero findings.

It got there by fixing the real defects the first run surfaced. The most consequential
was a percentage that had been wrong for most of its range:

```cpp
// PokemonBox::expLevelRangePercent() — returns a float
- return curExp / expEnd;        // both var32: integer divide, THEN widen → truncated
+ return expEnd ? (float)curExp / expEnd : 0.0f;   // float divide + divide-by-zero guard
```

Because both operands were 32-bit integers, the division happened in integer space
and the fractional part was discarded *before* the result widened to the float return
type. The progress-through-level percentage was therefore pinned at 0 until the very
top of a level, where it would finally tick to 1. A new mid-window assertion in
`tst_pokemonbox` now guards it.

The same run caught an unguarded pointer dereference on one branch of `PokemonBox::update()`
(the type-2 path wasn't guarded the way the type-1 path was), a signed/unsigned `char`
comparison, an integer-multiply widening, several loop variables that should have been
const references, and a missing `default` in a switch. One finding — a destructor that
can reach a pure-virtual call on an unusual lifetime path — was suppressed and flagged
for a deliberate refactor rather than patched in place.

## A dead store that wasn't a no-op

One analyzer finding was a behavioural bug, not just a code-smell. When `PokemonMove`
fills an empty slot it calls `randomize()`, which assigns a random 0–3 PP-Ups; the
constructor was then meant to reset that to zero so a brand-new move starts clean. It
didn't:

```cpp
// constructor parameter `ppUp` shadows the member of the same name
- ppUp = 0;          // assigns the parameter — a no-op; the member keeps its random value
+ this->ppUp = 0;    // assigns the member, as intended
```

The assignment targeted the shadowing constructor parameter, so the member kept the
random count and new moves silently carried 0–3 PP-Ups they shouldn't have. The fix is
scoped to construction only; the deliberate "randomize everything" actions are
unaffected.

## Tests that assert more than values

The suite had been strong on values — does a fragment hold the right bytes after an
edit — and largely silent on the machinery around them. This work added the missing
test *types*:

- **Signal/slot coverage** (`tst_signals`, via `QSignalSpy`): mutating a fragment emits
  exactly the right change signal, with the right count, and bound-clamped no-ops still
  honour their always-emit contract. It also verifies the internal `connect()` wiring
  fires by spying the *downstream* signal.
- **Model contracts** (`tst_model_tester`): every `QAbstractItemModel` subclass is wrapped
  in Qt's own `QAbstractItemModelTester`, which validates the framework contract and the
  change-signal protocol (`beginResetModel`/`endResetModel`, `dataChanged`, `layoutChanged`
  bracketing) that hand-written tests tend to miss. All models pass clean.
- **A visual-regression floor** (`tst_visual_regression`): every home-reachable screen is
  grabbed through the offscreen renderer and required to show a non-trivial spread of
  distinct colours — catching the failure a load-without-warnings test can't, a screen
  that loads clean yet *renders blank*. It is deliberately not a pixel-perfect baseline
  diff, which the project treats as a trap during active UI polish.
- **Acceptance scenarios** (`tst_acceptance`): the two user-level promises stated as
  Given/When/Then — an edited value survives save → close → reopen, and browsing every
  screen mutates zero save bytes.

That last one is the project's standing rule, now stated as an executable acceptance test:

```text
GIVEN a loaded save file
WHEN  every screen is visited in turn
THEN  zero save bytes change   // "Save File Integrity Is Sacred"
```

The full `ctest` run stays green across all of it. With the test *types* now broad —
values, signals, model contracts, GUI behaviour, visual rendering, and acceptance — the
remaining testing work is depth: pushing line coverage toward 100%, where a first
gap-fill pass also documented an honest limit, that some uncovered code is reachable only
through QML's meta-object system because the shared libraries export just their
registered classes.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/) ·
  [v0.14.2-alpha release](https://github.com/junebug12851/pokered-save-editor-2/releases/tag/v0.14.2-alpha)
- [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) ·
  [QAbstractItemModelTester](https://doc.qt.io/qt-6/qabstractitemmodeltester.html) ·
  [QSignalSpy](https://doc.qt.io/qt-6/qsignalspy.html)
