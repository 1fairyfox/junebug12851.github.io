---
title: "A keyboard that tells the truth, a new verb, and code that stops repeating itself"
subtitle: "Random AI Prompt deletes its duplicated mobile port, finds a build that had been broken on dev for four commits, and discovers it had been quietly capping its own users. Pokered Save Editor 2 rebuilds the name entry as an actual keyboard. Fairy Fox Games plants Tether, its twelfth game and first pendulum."
date: 2026-07-11
tags: [random-ai-prompt, pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

The theme of 2026-07-11, across two very different projects, was **removal** — of duplicated
code, of limits that were never meant to exist, and of interface elements that were lying
about what they did. Nothing on this day was added that wasn't first paid for by deleting
something.

## Random AI Prompt: the mobile app stops being a copy

The Android edition shipped the day before was fast, tested, and at parity — and it was also
a **second copy of the app**. Three days of work turned that around, one duplicated layer at
a time (`2.53.0`–`2.55.0`).

The root cause was mechanical: the web target discovers its providers, themes, and lists with
a Vite `import.meta.glob`, which Metro (React Native's bundler) cannot run. So the mobile app
had done the only thing available to it — **hand-transcribed** them. All ~40 providers and
their transports, as an 892-line file. All nine accent themes, by hand. The list operations,
byte-for-byte.

The fix was to generate **one static registry** every runtime can import — Vite, Node, and
Metro alike — and to make the transport *injectable* rather than assumed, so the shared
provider code can be handed a phone's networking instead of a browser's. With that, the
892-line hand-port collapsed into a 268-line adapter with **no provider or transport logic of
its own**, the nine transcribed themes became one source, and the list operations moved into
the engine where they always belonged.

The best part is what came out with them. The project had built **drift checks** — scripts
whose whole job was to compare the mobile copy against the web original and shout when they
diverged. Five of the seven are now **deleted**, on the grounds that *you cannot drift from
yourself*. The one that stays is the one that was never about duplication: the gate asserting
the mobile UI actually exposes every web feature.

## Random AI Prompt: two things the tests were defending

The same day turned up two problems that had survived precisely because the checks around
them were built wrong.

**The build had been broken on `dev` for four commits** (`2.57.1`). A file had been moved out
of the web target and its old path deleted, but a component still imported the dead path — so
the committed tree did not compile. Every gate had reported green, because a multi-path
`git add` had silently staged only 13 of 17 files, leaving the fixes on disk while the tests,
the build, and the parity checks all happily read the **working tree**. The lesson is stated
plainly in the project's notes — *a working tree is not evidence* — and a new
`check:committed` gate now fails when a tracked source file differs from `HEAD`, so "the
suite is green" can no longer be claimed over an uncommitted fix.

**The app had been capping its own users** (`2.57.0`), which is the more interesting of the
two because it inverted a stated principle. The tool advertises support for 1,000 prompts,
a 100k-image gallery, and a 100k-line editor — numbers that are a promise about *behaviour*,
not a permission slip. But a constant in the web roll builder truncated **every** roll to 50,
without saying so: ask for 200 prompts, get 50. The mobile screen clamped to 1,000 in five
places. The number input refused anything above 50 as invalid. All gone — and the engine's
measurements back the principle up (1,000 prompts in 257 ms, 25,000 in 3.9 s, linear
throughout, and cheaper *per prompt* at the top end).

The defect had survived because a test was **asserting it**: `expect(len(999)).toBe(50);
// capped`. An assertion like that enshrines a bug as a specification and makes the fix look
like a regression — which is why it went unfixed. It is now recorded as a fix pattern in its
own right: *a test that asserts a bug is the bug's best defender.*

Earlier the same day, a missing **shuffle** control was found on mobile — not by a test, but
by running the visual harness and *looking at the screenshots*, a standing rule that had never
actually been honoured for the phone build. The parity marker meant to guard that feature had
been satisfiable by an unrelated identifier that merely shared a word, which is worse than no
marker at all: it buys false confidence.

## Pokered Save Editor 2: the name entry becomes a real keyboard

[Pokered Save Editor 2](/pokered-save-editor-2/) spent the day on a screen most editors treat
as a formality. The in-game name entry had been a grid of character buttons; it is now an
**actual ASDF keyboard deck** (`0.16.0`–`0.16.6`), and the rebuild is a small case study in
interfaces that tell the truth about themselves.

The governing rule, stated during the work: *a tile goes where a real keyboard would put it
whenever it can, and must never fake it.* So punctuation moved onto its own keys (36 → 47),
lowercase became the base layer with a **real Caps Lock** — one that locks the shift *page*,
and which Shift inverts rather than cancels, as on any keyboard — and modifier chords that
had been invented for convenience were removed. Where the deck types exactly what a physical
keyboard would (`a` on A, `!` on Shift+1), the little corner legend **disappears**: there is
nothing left to teach, because the key already says what it is.

Two of the day's fixes were about the interface no longer pretending. Keyboard mode had shown
a text field — an underline, a placeable caret, a placeholder, every affordance of a thing you
type *into* — while the thing you actually typed into was the deck below it; it is now a plain
label with a soft caret. And a latched modifier page could silently override a **real** Shift
key, so every letter came out capital and the keyboard had quietly stopped describing itself:
touching a physical modifier now drops the latch, because the moment you press it you are
saying *I'm driving*.

The nicest detail belongs to the game's box-drawing glyphs, which were laid out **as the box**
— `Q W E` over `A S D` over `Z X C` mapping to the corners and edges, with S left empty as the
box's hollow middle. Drawing a border is now literally typing `Q W W W E … Z X X X C`. The
keys *are* the picture.

## Fairy Fox Games: Tether, and a verb the collection didn't have

[Fairy Fox Games](/fairyfox-games/) planted its **twelfth** game (`0.21.0`) and its first
pendulum. **Tether** has one control: hold to rope onto the nearest anchor and swing beneath
it, release to fly.

What makes it a game rather than a physics toy is that exit velocity is the swing's
*tangential* velocity — so the angle you release at **is** the launch angle. Let go near the
bottom and you fly fast but flat into the ground; hang on to the top and you are high but
stalled. The sweet spot is the classic 45°, partway up the forward swing, and hitting it both
raises the score multiplier **and** boosts the launch — which is the distance that clears the
next gap. Skill and survival are the same act.

It ships with the collection's full growth architecture from birth, including the *depth
inside the mechanic* layer devised for Polarity two days earlier: a hidden snap window
straddling the true optimum, a double-score window earned by a snap streak, and a secret final
stage. Two bugs nearly killed it in development, both now pinned by regression tests, and both
worth naming because they presented identically from the outside — a run that was alive but
going nowhere. A flat speed clamp let a fast catch on a long rope carry enough energy to swing
*over the top* of its anchor, after which the angle ran away unbounded; capping **energy**
instead bounds the amplitude by construction. Applying that cap in the wrong place then pinned
the pendulum's angular velocity at zero and froze it solid in mid-air. The soak test now
asserts the real invariant: if a run is still breathing, it is because it is thriving, not
because it is stuck.

The day also brought **Ricochet** onto varied structure (`0.20.3`), its targets now arriving
as named, stage-gated layouts. 435 tests green across twelve games.

## Fairy Fox Stories: a grow day

[Fairy Fox Stories](/fairyfox-stories/) ran a pure grow pass (`0.3.3`) — no plant, the cadence
gate not yet open — advancing three books by a chapter each: *The Cinderwick Job*, *The
Two-O'Clock Launderette*, and the newly planted *Every Lock but Hers*. The farm also closed a
planting gap it had left behind: the new book had shipped without its book-notes bible, the
continuity document every other book has, and that has now been written.
