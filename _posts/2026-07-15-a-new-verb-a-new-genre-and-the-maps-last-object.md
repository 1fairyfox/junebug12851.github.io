---
title: "A new verb, a new genre, and the map's last object"
subtitle: "Pokered Save Editor 2 puts the last big object type — the edge connections — onto its map screen, catches a byte-order bug while building a wild-encounter panel, and opens its largest feature yet: naming and classifying all 2,560 world-event flags. Fairy Fox Games ships a fourteenth game on a genuinely new verb and deepens an old one; Fairy Fox Stories plants its first mystery."
date: 2026-07-15
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

Yesterday was about what counts as finished. Today each project reaches past it.
Pokered Save Editor 2 sets the last big object type onto its map screen — and, the same
day, opens the largest research project it has ever taken on. Fairy Fox Games, having
brought all thirteen of its games onto one shared structure, ships a fourteenth on a verb
none of the others use, and starts pushing depth *into* a mechanic rather than breadth
across the collection. Fairy Fox Stories plants a book unlike anything already on the
shelf.

## Pokered Save Editor 2: the map's last object type

The map screen already knew about a town's cast, its doors, and its signs. Today it learned
about the four **edge connections** — the joins to the neighbouring maps — which were the
last big object type it hadn't yet let you edit (`0.39.1`–`0.39.8-alpha`).

The load-bearing insight is that a connection looks like eleven raw bytes but has only **two
human inputs**: the neighbouring map, and a single signed offset for how the two maps line up
along the shared edge. The other nine bytes are derived from those two by the game's own
macro, so the editor derives them too — set the map and the offset, and it recomputes the rest
from the same table the cartridge uses, rather than asking a person to hand-edit a strip width
they have no way to reason about. Editing is now direct: a neighbouring map renders full, right
up to the border and bleeding off it, and you drag it along the edge to set the offset, with a
light magnetism that snaps to the natural landmarks (flush corners, centred). Adding one is
either clicking a ghost arrow on an empty edge and picking a map, or dragging a map onto the
arrow. Rotation is simply not representable in a save, so the editor never offers it; what it
offers instead is *re-homing* a connection to another edge, which is one flag bit and one slot.

The subtler piece is what the rendered map now *is*. A fidelity pass reframed the whole view as
a **Continue-load**: the ring of neighbouring terrain around the edges is drawn from the save's
own connection bytes — edits and all — exactly as the game would restore them when you press
Continue, and reverting only when the player walks off the map and back on. That answered a real
question the build had raised — is a connection rewritten at boot, or kept from the save? — with
the same linchpin the doors and signs turned on: a Gen 1 save is a full memory snapshot, and the
continue path bails out before it would re-read the map header, so your edit is what the console
actually runs.

## Pokered Save Editor 2: the panel that caught a byte-order bug

A **wild Pokémon panel** for the map (`0.40.1-alpha`) followed the discipline the project now
runs by default — research the save layout first, fix the model, *then* draw the UI — and the
research paid for itself immediately.

The plan was a panel of ten encounter slots drawn like the storage box, each with a species, an
editable level, and a calculated appearance percentage, plus a second table for water. But
checking the disassembly against a real save showed the model had the two bytes of each slot the
wrong way round: it read **species-first**, when the cartridge stores **level, then species**. It
had been quietly inverting every real save's encounter table and writing cartridge-wrong bytes.
That was fixed as a model change before any panel went on, and pinned with a test that writes a
known level and species and checks the bytes land in the right order. A second, smaller finding
rode along: the panel's artwork field is zero-based, so the first cut asked for the sprite one
slot off and errored — the same `+1` the storage box already uses. Neither bug would have been
visible in a mockup; both were caught because the model was made true before it was made pretty.

## Pokered Save Editor 2: the map becomes the whole state

Three more panels filled in the rest of what a save holds about a map, each built research →
console-probe → model-fix → UI, with the UI last. An **Area State** panel restored the fields the
previous editor's "Map" page carried (the force-bike-ride lock, the current map script paired with
its auto-run bit, the camera view pointer) — nothing had been lost, a v2 UI for them had simply
never been built. A **Character State** panel surfaced the nine transient NPC flags, with three of
the previous editor's labels corrected against the disassembly and every value shown as a
first-class row — no hidden fields, the standing preference recorded this session. A **Map Storage**
panel gathered the six per-map minigame bytes (the Vermilion trash-can switches, the Cinnabar
next-wrong-answer, the Safari counters) that live in the save's global block but belong to one map
each — including a two-byte, big-endian step counter the model already handled correctly.

The thread running through all three is a doctrine the project sharpened out loud today: a derived
value is **kept in sync by default** — a novice editing the map must not break it by neglecting a
field they had no reason to touch — while raw-byte editing and a deliberate *break-sync* stay
available for power users. And every panel tells the truth about which of its bytes the console
keeps and which it wipes the instant a save loads, each wearing its own mark, because a byte the
game *rewrites* and a byte it simply *never reads* are two different facts.

## Pokered Save Editor 2: 2,560 flags, before a line of UI

The largest feature the project has ever been handed also began today: research and properly edit
**every one of the 2,560 world-event flags** — the cryptic "Events" page the first editor exposed
as raw hex. The mandate is exhaustive. Every bit — named, unnamed, unused, temporary, even the ones
that can crash the game — gets a real name, a description, a map, group membership, and a
classification, with no shortcuts for the boring ones.

The count was fixed by pinning it to the source, not to memory: the flag array is exactly `$A00` =
2,560 bits = 320 bytes, ending precisely where the next save structure begins. The disassembly names
507 of them; the other 2,053 are gaps. A self-validating importer attributed all 2,560 to their map
regions, and a usage scan across the whole game tree sorted them into a taxonomy — 507 named, thirty
that a range-clear sweeps as a block, and the remaining ~2,023 confirmed as **placeholders**: bits
with no code presence at all, the byte-alignment padding between each map's block. The one correction
worth recording is that the earlier claim "event flags can't crash the console" was **wrong** — flags
drive script-pointer tables that end in an indirect jump, so a bulk or impossible state can resolve a
bad pointer and crash the game. That is exactly why the editor's plan puts a warning before any
bulk-set, and why none of this ships until the research is finished and the UI is designed. Today was
the groundwork; there is no editor screen yet, on purpose.

## Fairy Fox Games: Reprise, a verb the collection didn't have

With the varied-structure rollout complete at thirteen games, the fourteenth had room to be about
something new — and **Reprise** is (`0.23.0`, a new game). Every existing game is a real-time reflex:
steer, time a catch, thrust, flip-match, aim-and-bounce, stack, keep-aloft, balance, mirror,
judge-power, swing, pour, sort. None of them asks the player to *remember and repeat*. Reprise does —
call-and-response, Simon-clean on the surface.

Four pads flash a call; you echo it. Land it and the phrase grows by one and plays a little faster;
miss and you lose a life, but the call replays, so a slip is recoverable rather than fatal. The depth
is in the **tempo**: the call plays on a beat, and echoing *on* the beat is worth a rising multiplier
while an off-beat-but-correct press still scores and merely breaks the streak — so the precise play is
the greedy play, the same scoring shape the collection's reference game uses, retargeted from reflex to
memory and rhythm. A run is a stage-gated sequence of named phrases with a mirror-echo greed window,
and the endless ramp is carried by tempo rather than by ever-longer phrases. Pure, tested core split
from the shell as always; 39 core tests, the collection green at 552.

## Fairy Fox Games: depth inside an old mechanic

Because breadth is done, the day's other game work went the other direction — **depth inside a single
mechanic**, taking a game that was one clean verb and finding more inside it without adding a second
(`0.22.3`). Echo Chamber, a timing-and-precision catch, gained a razor-tight dead-centre window taught
nowhere that pays a bonus and builds a streak; three of those in a row open a several-second window
where every catch scores double; a difficulty curve that now creeps toward a cap on a smooth asymptote
rather than flat-lining into a plateau; and a secret fifth stage past the visible end, revealed only by
reaching it. All of it rides the existing press-to-catch verb, and all of it is safe to never notice —
the reversal being, again, that the precise play quietly becomes the greedy one. It is the third of the
thirteen games to get this depth layer; the rest are queued, lowest-coverage first.

## Fairy Fox Stories: the shelf's first mystery

The story farm planted a seventh book, and deliberately an unfamiliar one: **The Blindfold Act**
(`0.4.0`), a 1926 carnival murder mystery. It fills two gaps in a single plant — the shelf's **first
mystery**, and its **first grounded, non-magical setting**, everything before it having been
speculative. Madame Sonora is the show's mind-reader, a cold-reader and fraud who has spent fifteen
years seeing through strangers and letting no one see her; when the show's owner is found dead in his
locked pay-wagon with the week's takings gone, she reads her own found-family to keep the law off them,
and reads the truth in the one face she never wanted to. The vise is the quiet, comfortable-monstrous
choice — let an outsider take the fall, keep the girl and the show and the blindfold — that costs her
nothing, and the arc is that she refuses it and pays everything. The restraint stays at the shelf's
standing bar: the death is accidental, off-page, and un-lurid.

The plant also exercised a mechanism for the first time. A "sequel-lock" roll came up locked — a first
for the farm — so the book carries a flag marking it as meant to end where it ends, and the shelf
already renders the "complete, no sequel" state for it. And the same day's grow run recorded an honest
correction worth keeping: an eyeballed pick was walked back when the farm's own blend formula ranked a
different book third, because hand-boosting a favourite a second time is exactly the thumb on the scale
the operating model forbids. The draft written under the wrong pick was discarded, and the mechanical
choice stood.
