---
title: "One name, one header, one colour table"
subtitle: "Pokered Save Editor 2 turns the map's progression blueprints into a live picker, then spends the rest of the day making the map screen speak a single language — one colour table, one gate for the edits the game ignores, sprites that always look like themselves. Fairy Fox Games adds a defence verb and adopts the shared header so it matches the rest of the mesh. Fairy Fox Stories plants a book whose dice reuse an existing world and author for the first time. And a site-wide outage is closed the only way it could be: by renaming the repository so every project resolves under the domain again — the same day the site folds its two daily collections under one nav menu."
date: 2026-07-18
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, site, update]
---

Yesterday shipped every map's story stages as data. Today put that data to work and then
turned to a quieter, wider job: making things match. Pokered Save Editor 2 gave its map
screen one colour table, one gate, one name where three had drifted apart. Fairy Fox Games
took on the shared header so its chrome stops being the odd one out. Fairy Fox Stories
watched its dice do something they had never done, and had its live pages restored by a
rename that finally lined the whole mesh up under one domain — which is the same rename the
hub had been carrying as an open question for weeks. The theme of the day is convergence:
fewer names for the same thing, one surface instead of several.

## Pokered Save Editor 2: the map states go live, then the screen learns one language

The progression blueprints from the day before — ninety-eight per-map descriptions of what a
map looks like at each point the story moves it — became something you can actually drive. A
map now carries a progression picker: numbered stages with plain names, rolled forward or
back one at a time, so changing maps builds a proper destination instead of a loose set of
bytes. With it came a small, honest rename that had been overdue — on the map screen "map
script" is now "map state", because the stage was never really the script byte.

The larger part of the day was a consistency overhaul, and its headline is a single colour
table. The canvas had quietly grown three palettes — one for the tile overlays, one hardcoded
in the block hotspots, one for the panel swatches — and they disagreed exactly where the eye
landed: the panel called the flag boxes sky blue while the canvas drew them green, the player
was grey in the list and blue in his outline. Now one table, keyed to the layers panel's own
rows, feeds the swatches, the canvas, and every object, so what the legend says is what the
map draws.

Two more threads pulled the same direction. A hidden sprite used to either vanish or render
as a bare black outline; now it always renders as a recognisable, dimmer version of itself —
art and silhouette flattened into one layer that fades as a group, served as plain pixels by
the image provider so even the offscreen test renderer can finally see it. (The lesson written
down alongside it: a fix you cannot capture is a fix you have not verified.) And the tangle of
switches for "values the game overwrites or never reads" collapsed into one gate on the top
toolbar — the same button, one concept, one word for it everywhere: *useless edits*. The map's
storage dock, formerly "Map Storage", is now simply "World"; its event flags group under the
stage that sets them; its door and sign boxes lost their centre glyphs and read as clean
outlines. Ninety-two tests green across the whole overhaul.

## Fairy Fox Games: a defence verb, and the shared header

Every verb the collection had was offence or navigation — steer, time a catch, thrust, aim,
stack, balance, pour, recall, sort. None was defence. **Ward** is the fifteenth game and the
first to be about guarding a point: shards converge on a central core and you orbit a single
shield to cover them, with a turn-rate cap that makes two opposite threats a real read. It
ships with the full pattern from birth — a precise "parry" window that pays a rising
multiplier over a merely safe block, a hidden Surge when you chain five parries, a secret
Aegis stage past the visible end, and stage-gated formations instead of flat noise. The
older **Ricochet** got the same depth layer the collection has been rolling out one game at a
time: a hidden dead-centre window on each target, a Blaze that doubles your next shots after
three in a row, and a secret Legend stage. Six of the thirteen older games now carry the
layer.

The other half of the day was catching up to the mesh. The hub had moved its two grown-daily
collections — Stories and Games — under a single **Farms** nav dropdown, and the games site
still ran the old flat header. Adopting it turned out to be a two-file change rather than a
scary re-vendor, because most of the shared chrome was already in place; the header now
matches every other fairyfox.io site. Housekeeping rode along: the owner rename to
`1fairyfox` swept through the live references, and three games that had shipped without an
icon got one — code-rendered app tiles in the collection's own style — behind a fallback so
no future icon-less game can ever show a broken image.

## Fairy Fox Stories: the dice reuse a world

The story farm plants a new book roughly every three days, and every choice about it is a
die it records exactly as it falls. This time two of those rolls did something they never had
before. The universe roll came up *existing* for the first time, and the author roll came up
*existing* too — so **The Hundredth Wind**, the eighth book, is a desert fable set on the
Salt Road, the world *The Girl Who Sold the Wind* already lives in, written by Amara Okri,
who wrote *Girl*. It is a genuinely separate tale — an old, proud wind-catcher commissioned to
catch the one wind that opens shut things and answers only to the name he will not say — with
no shared cast and no plot dependence, exactly the "same author, new story" move the farm's
own rules describe. Nothing was re-rolled to make it tidy; the two firsts simply landed
together and were honoured.

Two housekeeping decisions settled alongside it. The grow cadence, which the runs had kept
flagging as contradictory — one file said two books a day, another said up to five, the runs
actually grew three — was resolved to one book a day, written down in the operating model.
And new books now generate their cover and header art as part of planting, rather than
shipping text-only and backfilling later.

## fairyfox.io: one nav menu, and one name at last

The site made the change the games and stories sites then adopted: its two daily collections,
Stories and Games, now sit under a single **Farms** dropdown in the primary nav, and the
reader's line-spacing and width controls became story-only — they apply, and un-lock, only on
a page that is actually a book or chapter, so an ordinary documentation page keeps its
designed measures. Both changes were mirrored into the shared chrome bundle every project
vendors, so the whole mesh stays identical.

The bigger event was infrastructure, and it closed a real outage. After the GitHub account
was renamed to `1fairyfox`, the hub repository was still named `junebug12851.github.io` — no
longer a user site under the new account — and one consequence surfaced as a site-wide 404:
`fairyfox.io/fairyfox-stories/` had gone dark. The fix was the rename the hub had been
carrying as an open question precisely because it touches so much: the repository is now
`1fairyfox.github.io`, a proper user site again, so the custom domain resolves every project
under it as before. It was the owner's call to make, and making it turned the long-flagged
"should we rename it?" into a closed item — one name, and every surface pointing at it.
