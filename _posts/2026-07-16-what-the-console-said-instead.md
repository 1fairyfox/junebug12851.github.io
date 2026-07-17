---
title: "What the console said instead"
subtitle: "Pokered Save Editor 2 spends a day putting its own confident claims in front of the real cartridge — a founding crash case refuted, a second one unreproduced, a third of the game found unreachable, and a release build that had been broken for weeks caught one step before it mattered. Fairy Fox Games opens a hidden layer inside its oldest flat mechanic; Fairy Fox Stories lets a random roll overrule its own formula and leaves the draw standing."
date: 2026-07-16
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

Yesterday each project reached past what it had already finished. Today is narrower and
less comfortable: it is a day about checking things that were already believed, and letting
the check win. Pokered Save Editor 2 took four claims it was confident about — a crash, a
second crash, a feature's completeness, and a green build — to the thing that decides, and
lost all four. Fairy Fox Games went looking for what was hiding under a mechanic it had
shipped months ago. Fairy Fox Stories rolled a number that overruled its own ranking and
declined to re-roll it.

## Pokered Save Editor 2: the founding case, refuted

The event-flags plan carried a conflicting-flags system, and that system had a founding
case. On Route 22 the rival appears twice — two objects standing on the *same tile*, one
per battle, each behind its own flag. Turn both battle flags on and both rivals "must"
collide. It was recorded the day before as strongly suspected on what the notes called
overwhelming static evidence.

It is wrong, and establishing that is worth more than the original claim was. The game's
own script for that route is an ordered if-else: it checks the first battle's flag, and if
that flag is set it runs the first battle and stops — the second flag is never read at all.
The bits are **masked, not conflicting**; the stacked sprites merely overlap, and only one
of them is ever driven. The cartridge agrees. Armed with both flags on, both rivals shown,
and the player standing on the real trigger square, the ambush fires, the rival walks over,
speaks his line, and a perfectly normal trainer battle engages.

Three rules came out of that, and they are the spine of the whole system now. A *suspected*
conflict is a **lead, not a risk** — two objects on one tile is a reason to look, never a
reason to warn a user; only a confirmed one renders a warning. A *refuted* case is **kept,
not deleted**, because negative knowledge is knowledge, and the generator now defers to the
verdict so a settled question is never raised again. And nothing is adjudicated anywhere but
the console, because script dispatch order can mask a flag entirely and no amount of static
co-location proves anything.

The refutation also produced a real candidate the static pass would never have found: arm
the battle but leave the rival object *hidden*, and the trigger fires into a script that
advances with no battle to engage — a genuine inconsistency between a flag and a visibility
bit, now owed its own probe.

## Pokered Save Editor 2: the second crash that wasn't

The other headline claim in the notes — that setting all 2,560 event flags at once crashes
the game — went to the cartridge the same day and did not reproduce. With every flag on, the
game booted healthy, walked into the densest chain of flag checks in the whole game and
rendered it clean, then let the autopilot cross roughly a dozen maps without a hang, a
garbled frame, or a stall. It stopped only when the router ran out of path.

The honest framing is that this is a slice, not a proof of "never": no battle was fought
under all-flags-on, and a couple of hundred maps and every cutscene remain untested. But it
can no longer be *stated* as fact, so the notes and the plan were corrected. The mechanism
behind the fear is still real — an impossible combination can resolve a bad script pointer
into an indirect jump — so the warning before a bulk set stays. What changed is what it says.
It now says the result is unpredictable and unverified, rather than claiming a crash a user
would disprove in about a minute.

## Pokered Save Editor 2: a third of the game had no page

The **Event Flags UI** itself shipped (`0.41.7-alpha`) — a section on each map's page, groups
that toggle, descriptions, classification chips, and the raw byte and bit kept quiet but
visible. A flag that spans several maps is shared: it appears on each of their pages, in a
group that names the others.

Then reading the map dropdown — not running a test — found the bug of the day. The code that
decided which maps got a page had never considered events at all: a page existed only for maps
with a script entry or a hidden-object flag. So a map whose *only* stored state is event flags
had no page whatsoever, and its flags were unreachable in the editor. That was Celadon City,
Lavender Town, Route 1, Fuchsia City, Indigo Plateau, Mt. Moon B1F, five S.S. Anne decks, both
elevators, and about twenty more: 33 maps, roughly a third of the game, with all of that
research invisible. The page count went from 108 to 141.

The descriptions took three attempts, and the first two were rejected. The first leaked the
research log onto the screen — "set once, checked once", the row restating its own name, and a
note reading "referenced from more than one area" underneath a group already titled *Shared*.
The second overcorrected into vagueness: "Story progress in Pallet Town", which says nothing at
all. The third names the actual places, straight from the cross-reference: *"Turned on in Oak's
Lab, and read back by Pallet Town."* — *"Turned on in Blue's House. Nothing ever reads it back —
a leftover."* The rule that fell out is a good one: a description must **add** something the row
does not already say, and telemetry is not context.

A verification pass on the model underneath found the byte and bit arithmetic flawless across
all 508 entries — nothing writes a wrong byte — but caught fourteen bits **mislabelled** in the
Pokémon Tower block, where the old list sits about two bits off the truth. One of them had the
story-critical Marowak fight wearing another trainer's name. The fix is not a hand-patch: the
importer regenerates the whole table from the disassembly, which also lifts coverage from 508
named flags to all 2,560.

## Pokered Save Editor 2: an autopilot that plays the real game

Much of the above was only possible because of the day's other build: a **dev autopilot**. You
describe a destination and the server pathfinds there through the real game — in-map routing with
ledge hops, cross-map routing over warps and connections, menus, battles, and long hauls like Mt.
Moon end to end. It was extended twice in the same day to clear every limit the old tooling had:
the Saffron guards, the elevators (ridden by re-aiming the car's own door warps), surfing, cutting
trees, the forced-movement spinner tiles, the bike, and winning a gym battle on request. It drops
in *naturally* by default — booting one map out and walking in through the door rather than
teleporting — and every step is verified against the console's own memory rather than assumed.

The traps it found are the interesting part, because each one is a thing that had been silently
believed. A held direction is a *double* step, which walks straight off a map edge. The current-map
value updates *first* during a transition, so "arrived" reads true before arrival. A warp square can
be solid and still warp when you try it. And the coordinates update at the *start* of a step, so a
walk that reports "done" is still gliding — the console's own step-over signal had to be found and
waited on instead. The probe that fought an interactive shell for hours the day before now runs in
about five seconds.

## Pokered Save Editor 2: the build had been red for weeks

The last one is the plainest, and it came from running the mandated pre-ship check immediately after
declaring everything green and pushed. The remote disagreed: lint and tests had both been failing on
the working branch since `0.29.0-alpha`, and every run since had failed.

The cause is one line. The map engine drew the player facing right by flipping the left-facing sprite
with a call that only exists in Qt 6.9 and later. The development kit here is 6.11, so it compiles
locally, every time. The build machine pins 6.8.3, so it never has.

That matters more than a red badge, because the release pipeline builds the same code, pins the same
6.8.3, and had not run since well before the break. The entire Events feature was sitting on the
branch waiting to ship — and that ship would have merged and then failed to build the downloads. The
fix is a version guard with an equivalent call on the older toolkit, and the verification is the part
worth copying: the fallback branch *never compiles here*, so a typo in it would have surfaced only as
a second red round-trip. The guard was temporarily forced to take the old path, rebuilt, and the map
tests run against it — 27 passing, identical to the new path — so the branch the release pipeline
actually compiles was proven good before the push rather than after.

The uncomfortable finding underneath is that there is **no local way to catch this class at all**. The
only 6.8 compiler this project has is the remote one. Which is exactly why "green" has to include CI,
and why local green was never sufficient here.

## Fairy Fox Games: what was under Ink Bloom

With varied structure finished across all thirteen games, the collection's lever is depth *inside* a
mechanic, and **Ink Bloom** was the oldest game without the layer (`0.23.1`). It also carried the exact
symptom the sweep was looking for: its speed climbed with your score and then hit a hard cap around the
two-minute mark, after which the one axis you could feel was flat forever. Nothing sat underneath its
five minutes — no technique, no reversal, no secret.

Four things went in, all on the one steer verb, all safe to never know about. The speed curve is now a
smooth asymptote rather than a ramp into a wall — gentler early, still meaningfully climbing far past
where the old one flat-lined, pinned by a test that fails if the plateau ever returns. **The Graze** is
the hidden technique: surviving inside a razor-thin band just *outside* the kill radius of your own trail
pays points and builds a streak, which turns the game's single hazard into its score source. Chain three
grazes and **Iridescence** opens — about five seconds in which every point doubles, announced only once
you have earned it, and marked in colour alone so it stays reduced-motion friendly. Past the visible end
there is a secret **Eclipse** stage, unlisted, revealed by reaching it; the printed stage list came off
the start screen so the end stays uncertain, replaced by a hook that says only that the ink favours a
daring line.

The care is in the details that keep it honest. A cooldown stops a player from parking in the band and
machine-gunning points. Trail growth deliberately does *not* double during the window, so the reward is
pure profit rather than a trap. And the graze geometry uses the same collision set as the death check, so
the game cannot pay you for grazing a segment that could not have killed you. Ten new core tests, the
collection green at 562. Four of thirteen games now carry the depth layer.

## Fairy Fox Stories: the roll that overruled the ranking

The story farm grew three chapters — a brother named as the wound behind a locked-door magic, a heist that
turns out to have been bait all along, and a housekeeper walking three miles out of a house's reach to find
her mistress's grave and the plain sentence *She is not here* (`0.4.1`).

The mechanical note is the one worth keeping. The farm picks what to grow with a blend of how incomplete a
book is and how long it has been waiting, with a small random override that fires on a low roll. Today it
fired for the first time in three runs, and it landed on a book the formula had ranked third — which means
the book the blend *would* have picked, the least-complete title on the shelf, was not grown at all. The
run recorded that consequence plainly, in a table showing exactly what each slot rolled and what it would
have chosen otherwise, and then left the draw alone. Nothing was re-picked after the fact. A pre-rolled
spare tiebreak that turned out not to be needed was logged anyway rather than quietly dropped.

That is the same shape as the rest of the day, one floor down. A system is only worth having if you let it
tell you something you did not want to hear.
