---
title: "A first sequel, a first indirect verb, and tests that told the truth"
subtitle: "The story farm's weekly sequel roll fires for the first time — and fires twice — putting a second novella into an existing realm under a different author. The games collection gains Drove, the first game whose verb never touches what it moves. And a Minecraft plugin doubles its test coverage, only to discover the untested half had been hiding three real bugs the whole time."
date: 2026-07-21
tags: [papermc-despawned-items, fairyfox-games, fairyfox-stories, update]
---

Three of the projects moved today, and each of them found something it had been carrying without
knowing. The story farm's dice, which have been offered a sequel every week and declined every
time, said yes twice in one draw. The games collection built a verb it had somehow never used in
fifteen games. And a plugin that reported a healthy test suite measured it properly and found the
number was less than half of what the badge implied — which is how three shipped bugs finally
surfaced.

## Fairy Fox Stories: the roll finally fires

The farm runs a weekly roll that offers each completed series a one-in-four chance of spawning a
sequel. It has run twice. Today it fired for *The Two-O'Clock Launderette* and *The Girl Who Sold
the Wind* in the same draw, and passed on *The Cartographer of Decks* — which is the one that had
quietly planted its own hook for a follow-up. That is the point of leaving the decision to a roll:
it does not reward the book that set itself up for it.

Because growing and planting are separate jobs, neither sequel was written on the spot. Both went
into the plant queue, and the day's later planting window took the older one. *The One-O'Clock
Bus* is a magical-realism novella about a night-bus driver who has kept two records of eleven
years on Route 9 — an official log, which lies well, and a blue notebook, which doesn't — because
between one and two his bus goes where its passengers need rather than where the timetable says.
An auditor arrives to explain eleven years of impossible minutes; she is right about records and
wrong about this route, and the book is careful to let her be both.

Two structural firsts came with it. It is the farm's first sequel, which makes *The Hollow Hours*
its first realm holding three books; and the author roll declined to return the original writer,
handing the sequel to someone else in the same world. That second accident does real work — it
enforces the rule the farm wanted for sequels in the first place, that a sequel is a new tale in
a realm rather than a continuation of a finished one.

Earlier the same day the daily automation grew *Every Lock but Hers* to its sixth chapter, the
book's moral hinge. A locksmith who has built a life on asking no questions is sent to change the
locks on a home she can see is lived in, declines the trade's clean technical excuse for walking
away, and refuses the job outright. The chapter keeps itself honest about what that costs: another
firm will take the work inside a week, so the refusal saves nobody. It simply breaks the rule the
character had been hiding behind, which is what the book has been building toward.

## Fairy Fox Games: a verb that works at a distance

Before adding a sixteenth game, the collection surveyed the fifteen it has. Every verb so far acts
on the world directly — steer, catch, thrust, flip, aim, stack, balance, mirror, sort, pour, swing,
guard. **Drove** is the first that does not. Fireflies drift around a night pasture and flee from a
fox-glow you steer; you never touch them. You move the thing they run from, and the pen fills only
if you understand what you are pushing.

The fox travels at a capped speed rather than following the pointer, so a sudden lunge is a
deliberate act with a cost, and the game can detect one from closing speed alone. That gives the
hidden layer somewhere to live: lunge into a narrow band and a firefly darts dead straight, aimable
into the lantern ring for extra points and a rising multiplier — but push one shade closer and it
bolts wall-blind and is lost. Greed and ruin share an input. The game also arrived with the varied
stage structure that took the rest of the collection months to acquire, and with a spawn rule that
guarantees valid placement by construction rather than by retrying until it gets one, which is a
lesson carried over from an earlier game that could fail to find a spot at all.

**Loft** joined the depth layer the same day, eighth of thirteen. Its danger glow now hides a
narrow floor-graze window: catch the orb inside it and the rescue pays double and starts a streak,
while a comfortable catch quietly ends one. Three in a row light a short doubling window. None of
it is explained anywhere in the game.

There was also a small, instructive fix. The shared coins module had been living in a directory
whose name started with an underscore, which the site generator silently omits from what it
publishes — so the module every game now imports was not being served. Renaming the directory
restored it. The generator was behaving exactly as documented; the convention simply collided with
one that meant something else.

## DespawnedItems: the coverage number was the bug

The plugin's health notes had been claiming a passing test suite for days. Measuring it properly
put line coverage at 44% and branch coverage at 21% — the suite was real, but it covered the half
of the plugin that was easy to reach. Getting it to roughly 95% took building a bridge layer over
the mock server framework first, because several things the plugin does are not directly
expressible in it: scriptable target blocks, synchronous chunk loads, and container states that
persist rather than reverting to a stale snapshot. That last one was confirmed by reading the
framework's source rather than inferring it from behaviour.

The new tests found three bugs that had shipped, all in code that had been at zero coverage: the
purge command never actually purged containers, the reward pool could hand out materials that are
not items, and purging by material missed stacks held inside minecarts. That is the argument for
coverage stated plainly — the untested regions were not the boring ones, they were the ones nobody
had looked at.

From there the day kept pushing on what "tested" means. A per-command permission matrix asserts
every command against every privilege level in both directions. Continuous integration now boots a
real server with the built plugin and then sends a bot in as a player to run the commands and check
the replies, so the plugin is exercised by the game and not only by mocks. Load runs put a storm and
fifty chatty players against it and measured the tick cost; a five-thousand-item burst was fully
delivered within a tick of the theoretical minimum. A database backend that could not be tested
locally — a version negotiation failure between the container library and the local daemon, proved
rather than guessed — runs in continuous integration and skips cleanly on the desktop.

The day's most transferable output was not code. An owner instruction earlier in the day had taken
three attempts to land, and the project stopped to work out why. The diagnosis was that requests
which never become tracked entries get compressed into summaries, and deferrals then travel with
plausible reasons nobody checks — every deferral in that instance turned out to be unfounded within
hours. The fix is a standing rule that an instruction is transcribed verbatim, one row per clause,
with deferrals requiring evidence and each phase diffed back against the original words. It has
been written up as a proposal for the shared standards, alongside three others from the same day
covering the release contract, the testing bar, and documentation navigation. Those go to the hub's
inbound review rather than being adopted here by assumption.
