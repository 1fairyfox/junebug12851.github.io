---
title: "The screenshots had no text in them"
subtitle: "Pokered Save Editor 2 spends a day being reviewed — and the review keeps finding that the instrument was broken, not just the code. Its towns fill with people, the sprite panel stops speaking in numbers, and the soundtrack starts shipping as the game's own sheet music. Fairy Fox Games gives Loft the weather; Fairy Fox Stories writes three chapters."
date: 2026-07-13
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

If yesterday's theme was *the oracle* — asking something outside yourself whether you are
right — today's was narrower and more uncomfortable: **look at what you actually shipped.**

Pokered Save Editor 2 went through five review passes in one day, and the pattern that keeps
coming out of them is not "the code was wrong". It is that the thing doing the checking was
blind, and the blindness is what let the bug live.

## Pokered Save Editor 2: the review that could not read

The first pass opened with an observation about the screenshots the project had been reviewing
itself with: *there is no text in them.* And there wasn't. The app's headless capture flag never
set a font directory, so every screenshot came back with tofu boxes where the labels should be —
and the map screen had been "reviewed" for days on the strength of them. The layout was reviewed.
The screen was not (`0.28.0-alpha`).

With text turned on, the very first honest look found three things immediately: two identical play
buttons sitting side by side in the toolbar, a set of dead zoom controls left behind in the status
bar, and a zoom menu that ran off the bottom of the window. None of them was subtle. All of them
had survived a review.

The zoom itself got rebuilt properly while the screen was open. It had been snapping to whole
numbers because a fractional scale turns pixel art to mush; the fix is a shader that snaps each
sample onto the texel centre but leaves a ramp exactly *one screen pixel* wide across the seam —
crisp like nearest-neighbour, smooth like bilinear, and pixel-identical to nearest at whole zooms,
so nothing was traded away. It promptly caught its own trap: shaders do not run on Qt's software
backend, which is what every headless test in the project uses, so the first automated screenshot
of the new map came back **completely black**. It falls back to plain nearest-neighbour there,
which is the honest behaviour of the only sampler that backend has.

## Pokered Save Editor 2: four bugs that had been writing the opposite of what they said

Before any of the map's people could be drawn, the sprite model had to be true — so the day started
with a research pass against the disassembly and the cartridge, and it found four bugs, three of them
proven on the console (`0.25.1-alpha`).

Three enums were **inverted**. `Moving` was the byte for *stay*; `InGrass` was the byte for *not in
grass*; and the code that set a sprite to "stay" wrote *walk*. So every use of those setters, and
every randomiser run, had been quietly writing the opposite of what the UI said. The fourth is worse
in a different way: two fields the model treated as separate — a sprite's *facing* and its *range* —
are **one byte**, and the model was scattering them into two places.

Each fix is pinned by a test that was **negative-controlled**: the bug was put back, one at a time,
and each case failed by name, with the byte. That is the part worth borrowing. A test that has never
been shown to fail is a claim, not a check.

The research also produced a correction the project owed its own record. Reading the game's map-load
routine is alarming — it zeroes both sprite tables and reloads them from ROM — and the obvious
conclusion is that every sprite edit an editor writes is erased the moment the game boots. That
conclusion was written down with some confidence, and then it was tested: a real cartridge, booted
headless with three edited saves, and its WRAM read back. **The edits survived. All of them** —
including a fourth character invented from nothing in a town that has three. One line in the continue
path sets a flag that means the map header is never re-read, so the saved cast is what the player
walks into. A careful reading of the source would have shipped the wrong answer.

## Pokered Save Editor 2: a town you can cast

The towns had been empty since the map screen was built, for a reason that turned out to be
embarrassingly small: the repository carried exactly one sprite sheet — the player's. The other
seventy-one had never been imported (`0.26.0-alpha`). They are all in now, pulled from the
disassembly by a script that validates itself and **refused its first version**, which is what it is
for: it had been told to expect two art shapes, and came back with twenty files in a third. That
third shape is real — the twenty "still" people (nurses, guards, Mom) who have no walking art at all,
because the game never draws them taking a step.

From there the screen became an editor. You can drag a character in from the rail, drag them around
the map, drag them back out to delete them, and edit every byte they carry (`0.27.0`–`0.31.0-alpha`).
The details panel is the interesting design, and it came straight out of a review note:

> *Don't show boxes if it's unnecessary — some of these raw values have a combo box next to them, and
> I bet that combo box value is going to determine if the textbox raw value is even needed.*

That is the whole design, found by looking at the screen. Every field now declares a **kind**, and the
kind picks the control: a picture is a grid of the actual artwork, so you choose a character by
looking at them; X and Y are one control because they are one fact; a duration is drawn as a duration;
and the raw byte box **only appears when the combo cannot name the value**. Nothing is refused and
nothing is silently corrected — the full byte range stays one click away behind *"Something else…"* —
it just isn't sitting on the screen when it has nothing to say.

Two of the bugs found along the way say something about warnings. The panel had been flagging *"the
game's second copy of the picture id disagrees"* — on every sprite in every save, because that byte is
scratch and the game zeroes it. And an earlier version had compared the save's cast against the
cartridge's, which differs on essentially every real save, because walking NPCs walk. **A warning that
always fires is not a warning, it is noise — and noise is a bug.** It is now written into the project's
reference notes in those words.

## Pokered Save Editor 2: indoors there is no sprite set

The sharpest finding of the day came from a question that sounds like a UI request: *if changing this
value in the save makes no difference because the game overwrites it on load, then the map view should
emulate that — so does the sprite list change if the NPCs are different?*

It does, and the answer sent the project back to the cartridge (`0.32.0-alpha`). **Indoors there is no
sprite set at all.** The game loads each character's own artwork; the cast *is* the set, and anybody
can go anywhere in a building until the video memory runs out — ten walking slots, two still slots, and
that is the real limit. Outdoors the set comes from a ROM table, and the lookup that maps a character to
video memory is a loop **with no bounds check**: a picture that isn't in the set walks off the end of the
table into RAM until some byte happens to match. So "the game draws it as garbage" is literally true, and
*which* garbage depends on what is in memory.

The editor had been asking the save's cached sprite list — twelve bytes the game throws away. On an
indoor map that meant flagging characters that would have drawn perfectly. The question "will this
render?" now goes through the console's own routine, and three tests pin it.

The walk animation was fixed on the same pass, and the second bug in it is a good one: the cast moving
was re-rendering **the entire map image sixty times a second** to shift one 16×16 sprite, because the
sprites and the map shared a change signal. A sprite moving does not change a pixel of the map. It has
its own signal now.

## Pokered Save Editor 2: the harness that could not click

A bug survived a fix, twice, and the review asked the obvious question — *why aren't you using the
development harness we built?* The honest answer was that the harness **could not do it**, and rather
than fix the tool, the work had been done by clicking the screen by hand (`0.33.0-alpha`).

The harness's `click` command emitted a control's *clicked signal*. It drives a button, and it exercises
none of the pointer machinery — no grabs, no handlers, no propagation. The bug being chased was entirely
about pointer delivery, so the harness was blind to it **by construction**. It sends a real mouse event
at a coordinate now, and the bug reproduced on the first try: floating panels sit geometrically over the
map, and both the panel's tap handler and the map's fired, so the map cleared your selection out from
under the panel you were using.

The drop-downs, meanwhile, had been squashed too short to read *and* dead to clicks — two symptoms that
looked like two bugs. They were one **binding loop**: the popup's height depended on its list's height,
which depended on the popup's height, and the framework breaks the loop by dropping bindings. One line.

## Pokered Save Editor 2: the game's own sheet music

The day closed by applying the project's standing file-format rule to the music, and finding that the
rule had been broken in a way nobody had noticed (`0.34.0-alpha`).

The *importer* had always read the disassembly's `.asm` sources. But what shipped was a **binary bank
image with rewritten pointers** — a format invented for this project, opaque and unreviewable — and the
`.asm` it was built from **was not in the repository at all**. Clone the project and you could not
regenerate the music you were shipping.

So the 376 `.asm` files are vendored verbatim now, and parsed on first use (about 85 ms — a hand-rolled
line split, after the first version's regex-per-line took a full second). The binary is demoted to a
**test fixture**: the shipped source must assemble to it byte-identically, and it in turn is byte-diffed
against a real cartridge. Cartridge → importer → fixture → parser, with a check at every seam.

One claim made during the discussion was wrong, and the correction is more interesting than the fix. It
was asserted that the music *had* to stay as bytes, or the glitch tracks would break — that a
misaligned track id would jump to a wild address and play noise. It doesn't, and why it doesn't is the
whole trick: a track header is three bytes **per channel**, and ids are computed by multiplying by three.
So a misaligned id is never off by a byte or two — it always lands cleanly on a *whole entry*, which is a
perfectly well-formed header pointing at a real stream. That is why the glitch track plays a clean
bassline rather than static. The real reason to keep emitting the console's byte encoding is narrower and
honest: the sound engine is already verified frame-by-frame against a cartridge, and it speaks bytes.

## Fairy Fox Games: Loft gets the weather

Every other game brought onto the varied-structure standard got there by varying what it *spawns*. Loft
can't: its orbs are permanent, nothing spawns except a top-up every eight points, and that caps at six.
Varying the spawn would have been a change no player could feel (`0.22.1`).

So the varied unit is **the air**, not the orbs. A run is now a seeded sequence of named currents —
Still, Drift, Thermal, Gust, Downdraft, and The Vortex — each a queue of gravity-and-drift beats,
stage-gated so climbing opens the pool. The Thermal is the greed window: the air holds the orbs up, and
you can push your luck. The Downdraft makes every timed catch late.

Underneath it is the real growth fix. Gravity now rides a smooth asymptote on the score, so a full sky is
no longer the ceiling — with a guardrail that matters: a current is only a *multiplier on the ramp the
score earned*, band-clamped and hard-capped, so no weather can spike the difficulty past what the player
has actually reached. A test asserts that even a malformed current cannot break the cap. And the shell
draws a field of faint dust motes carried by the live current, so a thermal is **visible before it is
named**.

## Fairy Fox Stories: three chapters, and an unlucky-looking day

A grow day (`0.3.5`): *The Wintering House* and *The Cartographer of Decks* reach chapter four, and *The
Girl Who Sold the Wind* chapter three.

The interesting part is the audit trail. The farm picks books by blending "least complete" with "least
recently grown", and gives a small random override a chance to fire on each slot. Today it fired on
**two of three** — roughly a one-in-thirty day — and the log records it exactly as it fell, with the
rolls, rather than re-rolling to a tidier-looking outcome. The consequence is noted too: the
least-complete book on the shelf has now been passed over twice by the dice, and is the runaway next
pick.

That is a small thing, but it is the right kind of honesty for an automated system: the value of the
audit trail is entirely in the days when it records something you'd rather it hadn't.
