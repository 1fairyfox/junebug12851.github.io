---
title: "What it means to finish something"
subtitle: "Pokered Save Editor 2 puts doors, signs, and the player onto its map screen — each one researched against the real cartridge before a pixel is drawn — and writes itself a rule against building the feature nobody asked for yet. Fairy Fox Games brings its last flat game onto varied structure, completing the rollout at 13 of 13; Fairy Fox Stories reaches the end of its first book."
date: 2026-07-14
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

Yesterday was about *looking at what you actually shipped*. Today the three projects
converge on a quieter question: **what counts as finished.** Pokered Save Editor 2 adds
three kinds of object to its map screen and, in the middle of it, stops to write itself a
rule about *not* building the fourth. Fairy Fox Games brings the last of its thirteen games
onto a standard the other twelve already share. Fairy Fox Stories reaches the end of a book
for the first time.

## Pokered Save Editor 2: the doors go on the map

The map screen could show a town's cast; today it learned about the town's **doors**
(`0.36.0-alpha`). Warps can be placed, dragged, and re-aimed — but, per the discipline the
project has settled into, nothing was drawn until the research was done, and the research was
done against the cartridge, not just the disassembly.

The linchpin is the same shape as the sprite story, by a different mechanism. The game rebuilds
a map's warp list from ROM on every load, and — unlike sprites — there is no escape-hatch bit
that would obviously protect an edited warp. On the face of it, every door you write is erased
the instant the game boots. It isn't, and the reason is a single line in the save-load routine
that flags *"there is no previous map"*, which makes the next header load bail out before it
copies anything. So the edited warps are the ones the console actually runs on. A probe booted a
real cartridge with three tampered saves — a warp moved, a warp re-aimed, and a fourth warp
invented in a three-warp town — and read the result back: the save wins on Continue.

The console **overruled the project on one field and confirmed it on ten**. A byte the model had
been treating as warp state turned out to be an alias for another byte that the continue path
zeroes wholesale, so those bits can never survive a save — written `$FF`, they read back `0x00`.
Every other byte tampered with came back exactly as written. Two more fields the previous editor
exposed as *"From Warp"* and *"From Map"* are **dead**: the game writes them on every warp and
reads them nowhere in the entire disassembly. And the field a person actually reaches for — *where
does a building's exit put me?* — was never on the warp screen at all. It is `wLastMap`, and it now
sits in the toolbar in plain words: **`[ Outside is: Pallet Town ⌄ ]`**, because changing it
re-labels every building door on the canvas at once.

The panel is careful about a distinction that is easy to blur: a byte the game **wipes** on load
and a byte the game simply **never reads** are two different facts, and it says which is which — an
amber mark with the reason for the wiped ones, a quiet grey line for the inert ones. Two other
fields are *loaded guns* — save values the console will use to index a table with no bounds check —
and the old randomiser had been filling them with illegal values; that was fixed before the UI went
on, exactly as an earlier audio bug was. The screenshot review caught a cry-wolf that would have
shipped: an ordinary save carries a resting value the console never looks at, and the first cut lit
a red warning on every file that would ever be opened. The rule now is that a flag needs the value to
be *both* out of range *and* something the console will actually read.

## Pokered Save Editor 2: adjacency is not a brief

The most useful thing to come out of the day isn't a feature; it's a line drawn through one.

Signs load out of the *same ROM block* as warps and have the *same shape*, so they had quietly
walked into the warps phase — a "place sign" tool appeared in the toolbar next to the two that had
actually been asked for. That is how a screen gets built twice, and it got caught:

> *Let's not get too far ahead of ourselves. Signs, connecting routes, wild Pokémon — these are
> things I haven't gotten to yet. I'd hate to undo a lot of work because it was done before I
> explained anything.*

Signs were cut back out of the phase. The rule that replaced them is now written into the project's
standing document: **a feature gets its own conversation first, then research, then a design, then
code — and a phase does not get to absorb a neighbouring feature just because the data sits next to
it in the save.** When a briefed feature genuinely needs an un-briefed one, it *reads* it; it does
not build a UI for it. The old sketches for the unbuilt features were written from the save layout —
a map of what bytes exist, not of what a person should be able to *do* — and they now say so
explicitly: they carry no authority.

Alongside it, a second standing rule: **research lands in the notes, every time.** The shape of a
research pass — primary source, then ask the console when it matters, then a reference note, then
what it means for the code — is now the documented default rather than a thing that happens when
someone remembers to.

## Pokered Save Editor 2: signs, done on their own terms

With that settled, signs were built properly and separately — the full phase in one session
(`0.38.0-alpha`): a place-sign tool, drag and delete on the canvas, and a details panel with X/Y
and a combo box of the sign's real words, grouped as signs, people, and scripts.

This was the rare pass with **no bug to fix first** — the save model was already correct. The work
was in the *words*. A sign stores a text id, a one-based index into the map's own text-pointer table,
and the project's data shipped only the id. A self-validating importer now pulls the real strings out
of the disassembly and adds them to each map, purely additively: strip the new table back out and the
file is byte-identical. So selecting a sign in Pallet Town resolves, on screen, to *"OAK POKéMON /
RESEARCH LAB"* — which is exactly what the cartridge says.

## Pokered Save Editor 2: the player, all 26 bytes

The day's last piece filled in the player's own map-state panel — all 26 bytes the save holds about
him on a given map (`0.39.0-alpha`): facing, coordinates, walk/bike/surf, the strength/fly/surf flags,
the battle group, the door and ledge and link-cable bits, and the rest. Every field is editable across
its full range, hack values included, never refused and never silently rewritten.

The headline, again, is what the console said. A probe booted the ROM twice and read all 26 bytes
back, and **ten of them are rewritten the instant the save loads**: the player's facing is *forced to
down* on every Continue, a whole status byte is *zeroed*, Strength is *reset* unless a battle just
ended, and the door, ledge, and jump bits are *cleared*. Three more are **dead** — written, never
read. All thirteen are gathered behind a *"Reloaded values"* switch, filtered in the model so no view
can leak one, each wearing its own mark. And five fields the previous editor had simply named wrong now
carry the truth. One detail is worth borrowing: reading the load routine alone would have called a
movement byte a unit and cleared it whole — the console showed it is cleared *bit by bit*, some bits
kept, which is the exact mistake an earlier sprite pass made. It is cheaper to ask than to assume.

(The two map-simulation controls — tile animation and NPC walking — also merged into one *Simulation*
button and panel on the way through, `0.37.2-alpha`.)

## Fairy Fox Games: the rollout finishes at 13 of 13

Poise was the last flat game in the collection, and today it came onto varied structure — which means
**every one of the thirteen games now builds a run from named, stage-gated structure** rather than flat
noise (`0.22.2`).

Poise couldn't take the usual treatment. Only one target is ever alive on its tilting beam, so there is
no spawn *wave* to vary. The varied unit had to be the thing that actually shapes a run: **the path the
targets walk you along the beam.** A run is now a seeded sequence of named routes — Scatter and Pendulum
as calm on-ramps, Cradle as the greed window (targets always the shortest hop *inward*, the only route
that makes Poise easier), Feint's tight reversals, Creep's walk out to the lip, The Brink's hover where
a slip is fatal, and The Reel's full-beam swings on the heaviest gravity a run has earned. A `minStage`
gates each, so climbing the stages opens the pool: the calm share falls from over three-quarters at the
start to under 40% at the top, pinned by a test. Poise went from 31 to 43 of its own tests; the
collection is 493 of 493 green.

## Fairy Fox Stories: the first book reaches its ending

A grow day, and a milestone: **The Two-O'Clock Launderette is complete** — the first book on the farm
to reach the end of its plan (`0.3.6`). Its third chapter ends the way the blueprint promised, with no
magic left for the hard part: a phone call at ten past six from the step of a shuttered shop, and a bus.
The "complete" state renders for the first time — *"Complete · 3 ch"*, a full bar — and it needed no
template or CSS change to do it.

The other two chapters advanced *The Cinderwick Job* and *Every Lock but Hers*, and the audit trail is
the honest part again: the farm's random-override roll **did not fire on any slot this time** (rolls of
48, 27, 70; it needs 18 or under), so the blend ran clean and picked, unprompted, exactly the two books
the status file had already flagged as owed.
