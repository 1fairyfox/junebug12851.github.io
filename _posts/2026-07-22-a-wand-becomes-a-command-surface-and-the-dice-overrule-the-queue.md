---
title: "A wand becomes a command surface, and the dice overrule the queue"
subtitle: "A Minecraft plugin deletes the clever item it had added and replaces it with plain commands and an optional client mod that keeps the server in charge. Two games and a story shelf each gain something small and deliberate — a depth layer that pays only a precise hand, and the first time the story farm's dice overrule its own queue. And a second Minecraft project joins the hub."
date: 2026-07-22
tags: [papermc-despawned-items, fairyfox-games, fairyfox-stories, site, update]
---

Four fronts moved today, and the theme across them is restraint — a feature removed because a
plainer one is more honest, a bonus that fires only for a precise hand, and a roll that hands a
day to the book that had waited longest for it rather than the one next in line.

## DespawnedItems: a wand becomes a command surface

An earlier pass had added a "despawn wand" — a tagged item that made right-click mean something
special — plus a chest-inventory menu that stood in for a settings screen. Both are gone. The
objection that removed them is the right one: an item that pretends to be a tool, and a container
that pretends to be a settings screen, are *less* predictable than a command, and a chat command
is the more intuitive interface on a vanilla client. The replacement is `/despi target`, operating
on whatever block you are looking at: report its settings, enable or disable it without forgetting
its configuration, set how often it is drawn from, and decide whether it accepts banned items or
destroys them. Your own targets by default; anyone's with the elevated permission. Underneath, the
pipeline gained per-user throttling, a void chance, and a catch-all store for whatever has nowhere
else to go.

The more interesting half is an optional client-mod protocol. A container screen has only real
slots, so a plugin cannot put a button in one without replacing the whole screen and risking the
player's items — but a client mod can, in a few lines. So the work is split cleanly: the client
draws and clicks, the server owns the truth. The bridge is a bidirectional handshake, and the
server owner is in charge as a first-class setting — a server that disallows client mods makes the
plugin refuse the handshake, so a conforming mod simply hides its interface rather than showing
dead controls, and the command path is unaffected either way. Nothing the client sends is trusted:
permission, reach, ownership and the location limit are all re-checked server-side, so a modified
client can do nothing it could not already do by typing. Nothing is sent to a client that has not
registered the channel, so vanilla players never notice. A Fabric companion mod for 1.21.x is the
first client to speak it.

The day also automated the plugin's own release screenshots. Continuous integration now boots a
real Paper server with the freshly built plugin, joins it with a director bot, builds each scene
from the server console, and captures the frame at the exact tick the subject is on screen — with
two capture backends, a pure-Node renderer that runs anywhere and a real client under a virtual
display for the one thing no server-side renderer can see, the particle effects. Multi-platform
publishing and a rewritten README rounded the day out.

## Fairy Fox Games: Poise gets its depth

Poise was the oldest game still missing the collection's depth layer, and it already carried one of
the four pieces, so today added the other three to its single tilt verb without bolting on a new
control. The hidden technique is the **Still**: a catch counts as one only when the ball arrives
essentially at rest *and* the approach genuinely peaked first. That second clause is the whole
design — you cannot creep the beam at a crawl and collect; you have to carry speed and kill it dead
on the mark. It is taught nowhere and tuned against a bot, so a naive chaser lands none of them and
a first-timer's game is untouched, while a deliberate braker is rewarded. Three stills in a row
settle the beam into an **Equilibrium** that doubles every point for about five seconds, and a
gravity curve that never plateaus keeps the pressure climbing. Ninth of thirteen games on the
layer.

## Fairy Fox Stories: the dice overrule the queue

The daily grow picks a book to extend, usually the one the blend ranks most incomplete and most
stale — but it also holds a small random override, and today the override fired for the first time
on the shelf. A low roll drew the pick purely at random from the incomplete books and handed the
day to *The One-O'Clock Bus*, which sat only fourth on the blend behind the staleness leaders. That
is exactly what the override exists to do: a day-old book got the day instead of the book that had
waited longest. The chapter it grew, "The Auditor," puts its antagonist's case at full strength
before the book starts to argue with it — a room papered on three sides with eleven years of route
telemetry, three independent measurements that agree, and a creed enlarged past its index card by a
real case told fairly and never cruelly.

## This site: a second Minecraft project joins the hub

Minecraft Automated Driver was onboarded on the hub side — a pre-alpha MCP server that puts the
whole Minecraft development loop behind one tool surface an assistant can drive. With a second
Minecraft project on the board, the project category broadened from "PaperMC Plugins" to the more
general "Minecraft Projects," which now holds the driver alongside DespawnedItems.
