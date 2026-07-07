---
title: "Auto-updating prompts, an eleventh game, and a shelf of stories"
subtitle: "A busy day across the mesh. Random AI Prompt reaches 2.49.6 with auto-updating, a gallery composer, a repo restructure, and an interactive prompt-language editor. Fairy Fox Games adds an eleventh game and moves the whole collection onto Jekyll. A new project, Fairy Fox Stories, joins the mesh with its first shelf of illustrated books. Pokered Save Editor 2 rethemes its documentation. And the site turns its shared chrome into a vendored bundle and gives Stories a place in the nav."
date: 2026-07-06
tags: [random-ai-prompt, fairyfox-games, fairyfox-stories, pokered-save-editor-2, site, update]
---

Every thread in the mesh moved on 2026-07-06. [Random AI Prompt](/random-ai-prompt/)
had its largest day in a while, [Fairy Fox Games](/fairyfox-games/) added a game and
changed how it publishes, a new project — [Fairy Fox Stories](/fairyfox-stories/) —
arrived, [Pokered Save Editor 2](/pokered-save-editor-2/) rebuilt its documentation, and
the site itself reworked the chrome every project shares.

## Random AI Prompt, from 2.43.1 to 2.49.6

The day began by closing the loop on the desktop edition: **auto-updating** (`2.44.0`).
The app now checks for a newer release and shows a quiet corner-card banner rather than an
intrusive dialog, and the desktop build can install the update itself. From there the work
moved through the app surface. A **gallery composer** (`2.45.0`) let you build a prompt
straight from the gallery with live placeholders and multi-select delete, alongside an
accessibility and search pass over that view.

Underneath, two structural changes reshaped the repository. A **user content overlay**
(`2.46.0`) added a repo-root `user/` folder beside the built-in `data/`, so your own blocks
and lists live separately from the shipped catalog and survive updates cleanly. Then the
tree was **restructured into `engine/` and `targets/`** (`2.47.0`), the desktop target
renamed to `web-shell`, and — the larger rename — the term *dynamic prompts* became
**blocks** everywhere (`2.48.0`), a plainer word for the reusable pieces a prompt is built
from.

The day closed on the editor itself. An **interactive DPL editor layer** (`2.49.x`) turned
the dynamic-prompt-language editor into something you work in directly: hover a token to
adjust its intensity or focus dial, act on a line in place, with line numbers and an
active-line highlight, and a set of colouring fixes. The Manage view gained an **AI refine
toolbar** and **draft-from-description** for building a block from a sentence, plus a
free-text modify box. A final contrast fix quieted the editor's active line and gutter on
the dark theme. The repository ended the day at `2.49.6`.

## An eleventh game, and the collection moves onto Jekyll

[Fairy Fox Games](/fairyfox-games/) added **Sluice** (`0.18.0`), a colour-sorting game —
a genuinely new verb for a collection whose games otherwise steer, time a catch, thrust,
flip a match, aim and bounce, stack, keep aloft, balance, mirror, and judge power. It
ships to the same bar as the rest: a pure, tested core split from the render shell, the
staged escalation, and the meta-progression the collection holds to. That makes eleven.

The bigger move was structural. The collection **adopted Jekyll** to mesh its games
together the way the hub does. The landing page is now rendered from a `_games` collection
rather than hand-maintained, the changelog and legal pages sit on a shared layout with
pretty URLs, and a new `/tags/` browse page groups games by mechanic through a shared
game-card include — with an in-place tag filter on the landing so you can narrow the grid
without leaving it. The changelog moved to a single `_data/changelog.json` source, the
README game table is now generated from the same `_games` data, and the deploy flipped to
a real Jekyll build. Two early fixes in the day also killed a white flash when opening a
game and when the nav first painted. The repository ended at `0.19.2`.

## A new project: Fairy Fox Stories

The mesh gained a node. [Fairy Fox Stories](/fairyfox-stories/) is an **AI-managed story
farm** — a growing library of short, pre-planned interactive books, genuine fiction
written a chapter at a time, set in living, cross-linked universes. New books are sown
regularly and the ones already growing are deepened over time, and each book ships a public
blueprint you can read before you start. Its first release (`0.2.0`) planted a starting
shelf of five books in distinct genres, styles, and authorial voices, each with cover and
chapter art, on a first-class pseudo-author system so the shelf reads as many hands rather
than one. It arrived already wearing the shared fairyfox chrome, with the same notes system
and mesh-aware conventions as its siblings, and is registered in both project registries —
which is why it now has its own slot in the site's navigation, next to Games.

## Pokered Save Editor 2, rethemed

[Pokered Save Editor 2](/pokered-save-editor-2/) spent the day on its documentation site,
its first change in about ten days. The Doxygen-generated docs **adopted the hub's 0.14
chrome and shared reader menu**, then flattened to match the reference build — no
gradients, a muted rose accent, neutral nav links, a centred prose column, and framed
screenshots. The Overview page was rebuilt into a single left-aligned column with a compact
hero, a status-badge cluster, and a dark framed preview, and re-synced to the hub's exact
measurements rather than approximating them. A themed `/screenshots/` gallery landed as an
internal submenu item, seamless with the rest of the site. The work was documentation only,
so the editor itself stays at `0.14.2-alpha`.

## The site: shared chrome becomes a bundle

The site's own work went to the one part of the design system that had kept drifting. Every
project reimplemented the header, reader menu, and footer slightly differently, so those
shells slowly diverged. The fix (`0.15.0`) makes the chrome a **vendored bundle**: the
static header, submenu, footer, and reader markup live in the hub, and projects copy them
verbatim and refresh over git at build time — a decoupled exact copy, never a runtime
hot-link. Tokens, layout, and page components are still specified and reimplemented per
stack; only the chrome shell is now byte-identical. The same release added a **Stories**
slot to the primary nav, immediately left of Games, and a redirect stub that carries the
site's early-paint so it never flashes white. A follow-up (`0.15.1`) registered Fairy Fox
Stories in both project registries once its real metadata was in hand. An earlier fix that
day (`0.14.5`) gave the Games redirect stub the same early-paint treatment, ending a white
flash on the way to the Games page.
