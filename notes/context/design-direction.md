# Design Direction — proposition (v2, rethought)

_A working document, not a decision yet._ Started 2026-06-24; rethought the same
day across a deeper conversation about what this platform actually is.

**What changed from the first draft.** v1 framed the work as subtraction — "Josh's
site is a high-craft blog; how much do we strip to stay quiet and neutral?" Wrong
question. It mistook *neutral voice* (no ego) for *low ambition* (do less), and
treated the richest parts — interactivity, interconnection, motion — as costs
rather than the point. v2 starts from what fairyfox.io is and uses Josh as a
**vocabulary**, not a template.

**Key refinement (this is load-bearing — read it).** Interconnection is **not** the
same as depth, journeys, or rails, and must never be confused with them. A
"journey" with a start, middle, and end is *coupled* and easy to get lost in — the
opposite of what this project values. The right model is **decoupling carried all
the way up into the UX**: every page is a self-standing node — reachable directly,
understandable on its own, never dependent on how you arrived, never buried behind
a path. Densely interlinked **and** flat **and** simple, at the same time. Nothing
deep, nothing on rails, never lost, never complicated. (See
[[ux-decoupling-flat-not-deep]] in memory.)

Sources: the live [joshwcomeau.com](https://www.joshwcomeau.com/) homepage, his
write-up [*How I Built My Blog*](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/),
and this project's [`principles.md`](principles.md), [`project.md`](project.md),
[`../plans/future.md`](../plans/future.md),
[`../decisions/architecture.md`](../decisions/architecture.md).

---

## 1. The thesis: this is the legible surface of a living mesh

fairyfox.io is **not a documentation library with a nice homepage.** It is the
visible surface — the portal, the control-room, the museum floor — of an
**overarching, decoupled, non-recursive mesh over a large and growing body of
work** (see [`project.md`](project.md) → "Why this matters" and
[`../plans/future.md`](../plans/future.md)). Its job is to make that whole system
**legible, alive, and effortlessly explorable** — to a visitor, to Fairy Fox, and
to the assistant acting as the persistent management layer.

That reframing changes almost every downstream choice. The design's job is no
longer "present some pages calmly." It is **to make a hundred decoupled things feel
like one coherent, living system that anyone can step into anywhere** — every part
standing on its own, none coupled to the others, and none flattering its author.
Everything below follows from that.

---

## 2. The five pillars (what the thesis forces)

### 2.1 The architecture is the aesthetic
The site should *embody* the systems philosophy it documents: decoupled,
non-recursive, interconnected, intelligent. Concretely:
- **The connective tissue is a first-class visual citizen.** The links between
  projects, docs, posts, and examples are the substance of a mesh — surface them,
  design them, make them beautiful, don't bury them in body text.
- **Cohesion through composition, not uniformity.** Build the UI from a small kit
  of decoupled, self-consistent components (the §A.4 "element cohesion" idea,
  elevated) that compose cleanly the way the mesh's parts do. The design system is
  itself a small demonstration of the architecture: independent pieces that fit.

### 2.2 Alive, not merely current
v1 said "always current." Too weak. The surface should show the **pulse** of the
mesh — what changed, what's active, how things connect right now — and stay true
without manual upkeep. This is reachable *because* of the architecture in §3: the
site is a build-time **projection** of mesh state that the management layer keeps
fed. Currency stops being a chore and becomes a property of the system.

### 2.3 Decoupled all the way up — flat, simple, never lost
This is the strongest expression of the project's core value, applied to the
interface itself. **Decoupling isn't only how the backend talks; it's how the UX
behaves.**
- **Every page is a self-standing node.** You can land on *any* page cold — from a
  search result, a deep link, a sidebar — and immediately know what it is, what it's
  part of, and what you can do next. No page assumes you came from somewhere
  specific. No prerequisite reading. No "you are on step 3 of 7."
- **Everything is shallowly reachable.** Never make someone go deep to get to
  something. Nothing important is more than a hop or two from anywhere. No burying.
- **Interconnected ≠ on rails.** Links are *optional lateral doors*, not a track you
  must follow. There is no enforced start→middle→end. A reader weaves their own way
  or doesn't weave at all; both work. That is what a decoupled web *is*, and it's
  precisely why it can't get you lost — there's no labyrinth to be lost in, just
  rooms that each tell you where you are.
- **Simple, always.** Interconnection is achieved by clean links and consistent
  global navigation, not by complexity, depth, hidden state, or a map you have to
  decode. If a feature makes the user wonder "where am I / how did I get here," it's
  wrong by definition.

Note this *re-aligns* us with Josh's "shallow, predictable, never-lost" instinct
(which v1 had wrongly proposed diverging from) — and then **adds** rich, decoupled
lateral interconnection on top, without importing any depth or journey.

### 2.4 Show, don't just tell
The work should **prove itself in place.** A project or concept page shouldn't only
describe — it should let you *see it run*: live/workable examples, embedded demos,
real output. This is Josh's actual superpower (§A.5) and it is **core** to the
platform, not a garnish. Interaction here means *manipulating a self-contained
example* — which is decoupled and flat by nature (each demo stands alone), so it
adds richness without adding depth. Implemented as progressive-enhancement islands
(§3), it stays fast and open.

### 2.5 Meaningful motion, not spectacle
The old "less super effects" line was right about the symptom, wrong about the cure.
The test for any motion or effect is **not "is it subtle?" but "does it carry
meaning about the work?"**
- **Reject ego-spectacle:** the cursor-rainbow, sound effects, like buttons,
  hit-counter cuteness. Decoration that flatters, signifying nothing.
- **Embrace substance-motion and light interactivity:** a cross-link whose
  transition hints at the connection it's making, demo interactions that teach, a
  quiet cue that content is fresh. The default lean is **interactive when it's light
  and frictionless** — the extra mile makes the place feel alive and immersive — but
  never heavy, hacky, or fragile. **Fairy Fox actively wants more of these little
  interactive touches** (the first mockup's DPL demo was a hit) — lean in, keep them
  light. Motion that *explains* connection, state, or aliveness earns its place; motion
  as garnish does not.

We're not turning the volume down — we're changing the *signal*. Spectacle out;
meaning in.

---

## 3. Unity without coupling — the real "signature"

v1 proposed a literal map of the mesh (a graph-database-style viewer) as the
signature element. **Dropped — that's overkill, and honestly a bit silly.** A graph
visualizer is heavy, and it implies navigating by studying a diagram, which is the
opposite of flat-and-simple.

The actual signature is subtler and truer to the philosophy: **the site feels like
one cohesive place even though every module is fully independent.** That effect is
produced by exactly two things, no map required:

- **Consistent theming and a shared component kit.** One palette, one type system,
  one set of components (§2.1) across every page — so wherever you land, it's
  unmistakably the same site.
- **Clean, elegant cross-linking between decoupled modules.** Pages reference each
  other where it genuinely helps (wiki-style rules in §6), so the system is richly
  connected by *links* — not by any module knowing or depending on another.

**The hard constraint that makes this honest (and that resolves "how deep is the
mesh"):** a module never manages, inspects, or concerns itself with another module.
The most a project page does is hold a *general awareness* of its neighbors — a clean
link to their docs / README / repo, the major points, nothing more. No deep mutual
entanglement. So the "mesh" is the **link graph itself** — loose, outbound, fully
decoupled — not a web of dependencies. If a *deep* mesh isn't reachable under that
constraint, that's fine and expected: **the constraint wins.** Connectivity serves
the philosophy, never the reverse.

The lean toward interactivity stands (§2.5) — *light and frictionless* embellishment
that makes the place feel alive — but never a visualization the user has to decode.

---

## 4. The architecture that makes all this possible (and honors every principle)

The instinct that ambition fights the "fast / quiet / no heavy frameworks"
principles is **false**, and the resolution is itself on-philosophy. In plain terms:
**keep the part that *gathers and manages* information across the projects separate
from the part that *displays* it.**

> **The site is just a display. A separate management layer (the assistant + tooling
> + GitHub Actions) does the gathering across all the projects and writes the
> results into the repo as ready-made data/content. The site only reads that
> prepared data — it never reaches out to other projects live.**

**This is about layers, not hosting.** The "display" layer is static Jekyll on
GitHub Pages today (the deliberate free choice) and may become **Laravel on a larger
server** later as needs grow. That migration changes only the *display* layer; the
decoupled management/gathering layer stays exactly the same and feeds whichever
front end is in place. So none of this locks the project into "static forever" — it
keeps the gathering decoupled from the showing, which is what survives the move.

- **Communication is one-directional and non-recursive** — exactly the hub's
  existing rule ([`../reference/cross-project-sync.md`](../reference/cross-project-sync.md)).
  The management layer *writes* `_data`/generated pages; the site *reads* them. The
  site never reaches back.
- **The heavy lifting lives off the surface.** Aggregating a hundred repos,
  tracking PRs/releases, computing cross-project relationships and the pulse — that's
  the management layer's job, and it can be as sophisticated as needed *without*
  putting weight on the page. The visitor still gets a static, instant,
  framework-free site.
- **Interactivity is islands.** Live examples and any embellishment are
  progressive-enhancement components layered onto static HTML, not an app runtime.
  No React/MDX lock-in on the surface (Josh's own post admits his heavy stack hurt
  performance and dev speed — §A.7).
- **It demonstrates the thesis.** A fast static face over a powerful decoupled
  backstage *is* the decoupled-mesh philosophy, made physical. The medium is the
  message.

**This is the most important thing to ratify**, because it's the model the whole
build follows. If this architecture is endorsed, ambition and the principles stop
trading off — you get both.

---

## 5. Josh as vocabulary: take / elevate / leave

Reframed from v1's "adopt/adapt/reject." Most of his craft we *take*; several
things we **elevate** beyond how he uses them; and we **leave** the ego and the
spectacle. (Mechanics referenced as §A.x are in the appendix.)

| Josh trait | Verdict | For fairyfox.io |
|---|---|---|
| Element cohesion / context-aware components (§A.4) | **Elevate** | From "nice detail" to the **core method**: a composable component kit that mirrors the mesh (decoupled pieces that fit). The foundation of cohesion across 100+ parts. |
| Information scent / wayfinding (§A.2) | **Elevate** | From "describe your links" to genuine, flat **interconnection**: cross-links, "related," self-locating page headers, multiple lenses — the connective tissue of a decoupled web (§2.3). |
| Interactive / live examples (§A.5) | **Elevate → core** | From his signature feature to **our substance** (§2.4). Self-contained, progressive-enhancement islands; ambitious experience, disciplined stack. |
| Motion / View Transitions (§A.appendix) | **Elevate (reframed)** | From "whimsy to minimize" to **meaningful motion** (§2.5): expresses relationships and state; light interactivity welcome when it adds immersion without friction. Meaning is the bar, not subtlety. |
| Shallow, predictable, never-lost nav (§A.8) | **Take (and extend)** | Keep all of it — shallow, predictable, two-hops-to-anything, never lost. Then **add** rich decoupled lateral interconnection (§2.3) on top, without any depth or journey. v1 wrongly proposed diverging here. |
| Content-first reading column (§A.1) | **Take** | Real reading measure for prose inside the full-bleed bands. Calm where you read; rich where you explore. |
| Light/dark, both designed (§A.3) | **Take** | Already 0.3.0. Hold the bar through code blocks and every island. |
| Performance & a11y rigor (§A.7) | **Take** | rem media queries, semantic HTML, focus-visible, reduced-motion. The richness is *paid for* with this; non-negotiable. |
| Warm *persona* voice (first person, emoji, mascot) | **Leave** | Ego. Ruled out by [`principles.md`](principles.md). Keep only *service* warmth (§7). |
| Ego-spectacle: rainbow, sounds, like button, hit counters | **Leave** | Decoration that signifies nothing (§2.5). |
| Heavy framework stack on the surface (Next/React/MDX/Mongo) | **Leave (on the surface)** | The *site* stays static/islands (§4). The *management layer* off-site may use whatever it needs — that's where heavy logic belongs. |
| Closed-source | **Leave** | This platform is intentionally open; openness is part of the point. |

---

## 6. Information architecture: a flat, decoupled web

Not Josh's blog IA (categories of articles · courses · goodies), not a maze, not a
guided journey, and (per §3) not a map. Ours is a **flat web of self-standing
nodes**, all shallowly reachable, seen through **three independent lenses on the
same nodes**:

- **By project** (the spine) — each project a rich, self-contained node: what it is,
  status/version, stack, live example(s), links to its docs and repo, and clean
  outbound links to its neighbors' major points. Understandable on its own,
  landed-on cold.
- **By kind** — docs · shared standards · updates · examples · site notes. A second
  durable axis so the same node is reachable more than one way (many doors; no
  single required route).
- **By connection** — clean, wiki-style cross-links between pages. Optional lateral
  *doors, not rails*. The lens Josh lacks and we most want.

**Wiki-style linking rules** (how the interconnection stays elegant, not noisy):
- Link where it genuinely helps a reader; **don't** link trivial or low-value terms
  (grammar, filler, incidental words).
- **Link the first meaningful occurrence only**, not every occurrence on the page.
- Keep references clean and elegant — placed where they read naturally, never
  stuffed in.
- A project references other projects only at the level of **major points** (their
  docs / README / repo) — general awareness, never deep entanglement. Modules link;
  they never inspect, manage, or depend on each other (§3).

What keeps it simple and never-lost (the §2.3 guarantees, made concrete — no map
needed):
- **Every page self-locates.** A clear header answers "what is this / what's it part
  of" without the reader needing history. No page depends on the path taken to it.
- **Shallow everywhere.** Everything important is a hop or two from anywhere; nothing
  is buried.
- **One consistent global nav + footer** on every page, so orientation is permanent
  and free.
- **Home as portal, not feed.** A sense of the *whole* and the *pulse* (what changed
  lately) and clear *entry points* — not an endless list, not a "start here and
  proceed."

Throughline: **full-bleed bands for structure; a calm column for reading; rich
self-standing nodes, connected by clean wiki-style links; everything shallow and
simple; consistent theming so it's unmistakably one site; alive and honest because
it's generated.**

---

## 7. Voice: curatorial, not personal

The resolution of the neutral-vs-warm tension (v1 still holds, sharpened): the voice
is **curatorial** — the confident, clear, generous register of a beautifully-designed
museum where *every exhibit also runs.* It speaks **about** the work with obvious
care and authority, never in the first person, never flattering its author. "Warm"
here means *service* warmth — nothing is intimidating, every page signposts itself,
hard things are made approachable — not *persona* warmth (no "I", no emoji, no
mascot). Neutral about ego; rich about the work. See
[[neutral-voice-is-ego-not-heart]] in memory and [`principles.md`](principles.md).

**UI copy rule (learned from the first mockup, 2026-06-24):** the page must *be* its
qualities, not *narrate* them. No sentimental or self-congratulatory taglines ("the
work, brought together — and kept alive"); no section subtitles explaining the obvious
("each is its own self-standing node…"); no announcing the architecture to the visitor
("a live pulse… never stale"). Label things plainly ("Projects", "Recently") and let
structure and content carry the meaning. Terse and factual beats lyrical. When in doubt,
cut the copy. (The philosophy lives in these notes — not on the page.)

---

## 8. Decisions — settled and still open

Updated as Fairy Fox weighs in. Settled items become the spec; the keystone remains.

**Settled (2026-06-24):**
- **Keep gathering separate from displaying — the keystone (§4). Confirmed: yes,
  Option A.** The website is a display that reads ready-made data; a separate,
  decoupled worker (the assistant + scripts + Actions) gathers across the projects
  and writes that data in; the site never reaches into projects live. Holds on the
  free static host now and survives the eventual move to Laravel (only the display
  layer swaps). This is the model the whole build follows.
- **No literal mesh-map / graph viewer** (was the §3 "signature"). Overkill and a
  bit silly. Unity comes instead from consistent theming + a shared component kit +
  clean cross-linking (§3). Lean interactive only when light and frictionless.
- **Interconnection = wiki rules + strict module decoupling.** First *meaningful*
  occurrence only, skip trivial words, clean elegant placement; a project links to
  neighbors' **major points** (docs/README/repo) only, never inspecting, managing,
  or depending on them. The mesh is the link graph, kept as deep as the decoupling
  constraint allows — and no deeper. The constraint wins (§3, §6).
- **Live-example technique: modern, standards-based, decoupled.** Target **Web
  Components / custom elements with progressive enhancement** — self-contained,
  framework-free, not hacky, not heavy, not fragile. Each example is its own
  decoupled module, which fits the philosophy exactly. (Validate on the first slice;
  if a given example is trivial, a plain Jekyll include is fine — don't over-engineer
  the simple ones.)
- **Pulse: detailed, but in-theme and within constraints.** Surface
  recent-activity / what-changed across repos, generated by the off-site management
  layer (§4) and rendered fully in the site's styling. Detail is welcome as long as
  it honors theming and the constraints.
- **Code presentation: yes.** Custom light/dark code themes, copy button, line
  highlighting — to the full quality bar, in-theme.

**Nothing blocking remains.** The keystone (§4) and all of §8's design choices are
settled, so the proposition is internally consistent and ready to act on — see §9
for where to start. Remaining choices from here are build-time details (exact
component set, palette tuning, which examples come first), best made while building
the first slice rather than in the abstract.

---

## 9. Where to start (grounded — don't boil the ocean)

The vision is large; the first moves are small and load-bearing. Once §8.1 (and
ideally 8.2–8.4) are settled:

1. **Decide the architecture (§4)** and write it into
   [`../decisions/architecture.md`](../decisions/architecture.md). Nothing else is
   stable until this is chosen.
2. **Build the component kit seed** — a handful of cohesive, composable pieces (rich
   self-standing project node/card, callout, code block, live-example shell,
   related-links block, self-locating page header) in light/dark at the full quality
   bar.
3. **Prove it on one vertical slice** — a single project rendered as a rich,
   self-standing node: description + live example + edges + docs links, landable
   cold, both themes, end to end. Tests the language and the §4 model at once.
4. **Lock the theming tokens + the wiki-linking convention** — the two things that
   make independent modules read as one site (§3, §6) — so every later page inherits
   the cohesion for free.
5. Then promote the settled principles into [`principles.md`](principles.md) and
   translate the rest into [`../plans/next-steps.md`](../plans/next-steps.md).

Build the language and the model first, on one real slice, at full quality. The
hundred-project web is the destination; a single honest, alive, self-standing node
is the first step that proves the road.

---

## Appendix A — Reference: the mechanics behind Josh's UX

Preserved from the teardown; the factual analysis the proposition draws on. Most of
these are quiet machinery, not spectacle.

**A.1 Content-first reading column.** Everything subordinate to prose: ~65–70char
measure, generous line-height, large readable type, thin chrome. A calm reading
surface first, a "website" second.

**A.2 Information scent / wayfinding.** You always know where a link goes: homepage
is a *described* index (title + hook + summary), a ranked "Popular Content" entry
path, durable browse-by-category, anchor links on headings, visible "last updated."

**A.3 Light/dark as first-class.** Both themes designed, not one inverted: custom
per-mode syntax themes, per-mode imagery, separately tuned palettes, always-reachable
toggle.

**A.4 Element cohesion.** Components adapt to context (a code snippet inside an aside
changes background, copy-button color, padding, per variant and theme). Everything
reads as one designed thing. Achievable in plain CSS via contextual selectors +
variables — no framework needed.

**A.5 Interactive embeddable explanations (his superpower).** MDX drops live,
manipulable demos into prose — drag a slider, watch the layout respond; reading
becomes doing. The single biggest differentiator from a normal blog. Each demo is
self-contained — richness without depth.

**A.6 Whimsy as optional, layered reward.** Boops, springs, rainbow, sounds — on top
of a calm base, dismissible, reduced-motion-safe, rewards-for-noticing. The
transferable part is the *discipline* (optional, non-blocking, a11y-safe); the
effects themselves are mostly ego-spectacle we leave (§2.5).

**A.7 Performance & a11y rigor.** rem-based media queries (layout scales with the
user's font size), static generation, semantic HTML, visible focus, production
sourcemaps for transparency. Richness paid for with discipline. His own write-up
notes the heavy stack still cost him performance and dev speed — a caution we heed.

**A.8 Shallow, predictable navigation.** Despite ~100k lines behind it, the surface
is tiny: header + reading column + footer that repeats the map. Two clicks to
anything, never lost. We **keep** this and add decoupled interconnection on top
(§2.3) — we do *not* trade it away for depth.

**A.appendix — View Transitions.** He uses the View Transitions API for subtle
cross-fades and shared-element slides between pages, as progressive enhancement. We
reclassify this from "whimsy" to *meaningful motion* (§2.5): a transition can quietly
signal the relationship between two linked nodes. It is polish on flat navigation,
never a substitute for it and never a "journey."
