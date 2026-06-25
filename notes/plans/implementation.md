# Implementation Plan — the v2 design direction

_Comprehensive build plan. Started 2026-06-24._ This is the **how** for the **what/why**
in [`../context/design-direction.md`](../context/design-direction.md). It is grounded
in the actual 0.3.0 codebase (read before writing) so the plan is *realistic* — but the
**visual/UX design is wide open and the ambition is high**. Fairy Fox did not fully like
the 0.3.0 look and wants the site to express the craft and "wow" of joshwcomeau.com (in
our own neutral, no-ego key). So the existing CSS is **raw material to mine, not a
baseline to preserve** (see [[ux-design-open-not-preserve]]): redesign palette, type,
spacing, motion, and the look of every component freely, within the fixed constraints
(AA, light/dark, fast, hand-owned, no-ego). What is **not** open: the architecture and
IA (two layers, flat decoupled web, wiki links, live examples) — those are settled.
Read the design doc first; this assumes its vocabulary.

Settled foundations it builds on (design-direction §8): keep gathering separate from
displaying (Option A); no literal mesh-map; wiki-style linking + strict module
decoupling; live examples as Web Components; detailed in-theme pulse; full code
presentation; curatorial voice; mandatory quality.

---

## 0. Guiding constraints (carry these through every task)

- **Static Jekyll now, Laravel later.** The contract between the two layers is
  `_data/*.yml`. Build so the display layer can be swapped without touching the
  gathering layer. Don't bake logic the future Laravel app can't reproduce.
- **No heavy frameworks on the surface.** Vanilla CSS + standards-based Web
  Components + progressive enhancement. Everything works with JS off; islands only
  enhance.
- **Decoupling is a UX law.** Every page self-standing and landable cold; modules
  link to neighbors' major points only, never inspect/depend on each other.
- **Hand-owned, AA, reduced-motion-safe, fast.** Hold the 0.3.0 quality bar.
- **One source of truth per fact.** `VERSION`, `_data/projects.yml`,
  `hub/registry.yml`, `hub/standards/`. Generated data is derived, never authoritative.
- **kramdown `parse_block_html` is off** (see [[fairyfox-kramdown-prose-html]]): inside
  styled HTML wrappers, author HTML, not Markdown. Custom-element tags go in raw HTML.

---

## 1. Inventory — what exists, to mine (not to preserve)

> Posture: this is a catalogue of the current build so we know what's there and can
> reuse the bits that genuinely work (the token *approach*, the band/wrap system, the
> per-project accent idea). It is **not** a mandate to keep the look. The visual design
> is being reimagined to express joshwcomeau-level craft — see the intro and §4.


From reading the repo (2026-06-24):

- **Design tokens** in `assets/css/main.css` `:root` + `@media (prefers-color-scheme)`:
  brand hues, dark+light palettes, `--text*`, `--accent*`, `--link*`, radii
  (`--radius*`), `--maxw`/`--maxw-text` (44rem reading measure), `--gutter`,
  font stacks (`--sans` Inter, `--display` Space Grotesk, `--mono` JetBrains Mono),
  `--ease`. Solid, already light/dark.
- **Component vocabulary** (CSS classes): `.band`/`.band-alt`/`.wrap` (full-bleed
  bands + centered column), `.btn`, `.card`/`.proj-card` (per-project accent via
  `--pc`), `.doc-cat`, `.update-card`/`.update-grid`, `.post-list`, `.tag`,
  `.section-head`, `.eyebrow`, `.cta-strip`, `.masthead`, doc sidebar, downloads tabs.
- **Layouts**: `default.html` (head/header/main/footer + `nav.js`), `page.html`,
  `post.html`, `doc.html` (sidebar from `_data/doc_categories.yml` + crumbs + summary
  lead). **Includes**: `head.html` (fonts, SEO, links `main.css`), `header.html`
  (sticky dropdown nav from `_data/projects.yml` + docs collection, mobile hamburger),
  `footer.html` (4-col site map).
- **Data**: `_data/projects.yml` (name/key/repo/docs/notes/blurb/tags/status/color/
  icon/featured/reference), `_data/doc_categories.yml`, `_data/downloads.yml`.
- **Content**: `index.html` (home), `/projects/`, `docs.html`, `blog.html`,
  `downloads.md`, `about.md`; `_docs` collection (overview · this site · standards ·
  per-project incl. `pokered-save-editor-2.md`, `random-ai-prompt.md`); `_posts`.
- **Build**: GitHub Actions (`.github/workflows/pages.yml`), plugins feed/seo/sitemap.
- **Already-present niceties**: focus-visible, reduced-motion guard, decorative
  `.pulse-dot`, per-project accent system, AA contrast.

**Implication:** the *structure* and *plumbing patterns* are a useful head start, but the
*surface* (color, type, texture, motion, the feel) is being redesigned. Reuse the
engineering (tokens, bands, accents, light/dark mechanism); re-author the aesthetic. The
new work: (a) a **fresh design language** that has real craft and personality-through-
quality, (b) two-layer data plumbing, (c) the self-standing **project node**, (d) **live
examples**, (e) **cross-linking + pulse data**, (f) **code presentation**.

---

## 2. Gap analysis (design-direction pillar → today → to build)

| Pillar (design-direction §) | Today | To build |
|---|---|---|
| Two layers / projection (§4) | `projects.yml` hand-kept; pulse is a decorative dot | Define `_data` contract; management-layer scripts + Actions that **generate** pulse + backlinks from sibling repos |
| Self-standing nodes (§2.3) | Project = a card + a `_docs/<key>` page | A canonical **project node page**: identity, status, live example, connections, activity — landable cold |
| Show don't tell / live examples (§2.4) | None | `<ff-…>` Web Components, PE, first example tied to a real project |
| Flat wiki interconnection (§6) | Nav + footer links only | Wiki-link convention + `connections` (edges out) + "what links here" (backlinks) component |
| Unity via theming + kit (§3) | Good tokens + components, single CSS file | Modularize into component partials; add callout/aside, node, example, connections, code components |
| Alive / pulse (§2.2) | Decorative only | Real "Recently" feed (data-driven) on home + updates |
| Meaningful motion (§2.5) | Hover/transition only | View Transitions (PE); light example interactivity |
| Code presentation (§8) | Basic `pre`/`code`, Rouge default | Custom light/dark Rouge theme + copy button + line highlight |
| a11y/perf rigor (§A.7) | focus-visible, reduced-motion, AA | Convert px media queries → rem; keep no-JS baseline; Lighthouse ≥95 |
| Self-locating header | `page-head` h1+lead; doc crumbs | A shared **self-locate header** (what is this / what's it part of / kind) on every page type |

---

## 3. The two layers, made concrete (the keystone)

### 3.1 The boundary contract
**`_data/*.yml` is the API between the gathering layer and the display layer.** The
site (display) only ever reads `_data`. The management layer only ever writes `_data`
(plus generated content files). Nothing on the site fetches anything live. When the
display becomes Laravel, it reads the same `_data` contract (or its DB import of it),
so the gathering layer is untouched.

### 3.2 Data contracts (schemas)

**`_data/projects.yml`** — *authored* (source of truth, stays hand-kept). Extend the
existing schema with optional fields:
```
- name, key, repo, blurb, color, icon, featured, reference            # existing (kept)
  # --- standardized status taxonomy (replaces the old freeform `status` string) ---
  lifecycle:  alpha | beta | released   # exactly one. Colors are FIXED: alpha=red, beta=yellow, released=green
  version:    "0.14.2"                  # rendered as v0.14.2 (mono)
  activity:   active | inactive         # a SEPARATE axis from lifecycle (active/inactive dot)
  # last_updated is NOT authored — it comes from the generated pulse (_data/pulse.yml)
  summary:    longer self-standing description (node page)              # optional
  example:    id of a live example to embed on the node (or null)       # optional
  tags: [JavaScript, "Node 24", "Web UI"]   # category tags — consistent casing, rendered CLICKABLE (filter)
  links:                                     # outbound "major points" only; external ones render with a ↗ icon
    - {label: "Docs", url: ..., external: true}
    - {label: "Repo", url: ..., external: true}
  related: [keys]  # decoupled edges to sibling projects (major-point links only)
```

**Status taxonomy is a hard standard — do not freeform it** (learned 2026-06-24).
Three independent fields: **lifecycle** (alpha/beta/released, fixed red/yellow/green),
**version**, **activity** (active/inactive). They are not interchangeable and not a
single mashed string. **Correct current values** (don't re-guess): `pokered-save-editor-2`
= alpha / v0.14.2 / active; `random-ai-prompt` = released / v2.6.0 / active;
`pokered-save-editor` (v1) = released / v2.0.1 / inactive. Card conventions also fixed:
category tags are clickable and consistently cased; tags + links are bottom-aligned; the
node link reads **"More details →"**; external links get a **↗**; cards show **last
updated** (from the pulse).

**`_data/pulse.yml`** — *generated* by the management layer. Recent cross-project
activity:
```
generated_at: 2026-06-24T...
projects:
  - key: random-ai-prompt
    last_updated: 2026-06-22
    version: 2.6.0
    recent:                      # last N changelog entries from the repo's notes/version
      - {date: 2026-06-22, text: "...", url: <commit or post>}
```

**`_data/backlinks.yml`** — *generated*. The "what links here" map, computed at build
time from cross-links so no page has to inspect another:
```
"/docs/random-ai-prompt/": [ {title, url}, ... ]
```

**`hub/registry.yml`** stays the machine cross-sync registry (unchanged role). Keep
`projects.yml` ↔ `registry.yml` in step (existing rule).

### 3.3 The management layer (where the "gathering" lives)
- **Location:** `tools/` at repo root (git-tracked, excluded from the Jekyll build via
  `_config.yml`). Scripts are plain Node or Ruby — pick Node (sibling tooling is JS;
  matches Laravel-era portability less but is fine). They **only read** sibling repos
  (shallow clones under `assets/references/`, already the pattern) and **only write**
  `_data/pulse.yml` + `_data/backlinks.yml`.
- **Non-recursive & on-request:** generation runs on demand and/or on a schedule, never
  triggered by a sibling's build. Preserves the anti-recursion rule
  ([`../reference/cross-project-sync.md`](../reference/cross-project-sync.md)).
- **Trigger:** a GitHub Action (`.github/workflows/refresh-data.yml`) on `workflow_dispatch`
  + optional `schedule:` (e.g., daily) that runs the scripts, commits changed `_data`
  to `dev`, and lets the normal deploy flow ship it. The site build itself never runs
  the gathering — it just reads the committed result.
- **Why this honors everything:** heavy logic off the page; one-directional; the site
  stays a dumb fast renderer; Laravel later reads the same `_data`.

---

## 4. Design-system foundation (the component kit)

### 4.0 Design language first (the new look)
Before components, define a **fresh visual language** that expresses joshwcomeau-level
craft in a neutral, no-ego key. **The north star is the Josh teardown, not a blank
canvas and not the old 0.3.0 look:** the look, feel, theme, and wording analysed in
[`../context/design-direction.md`](../context/design-direction.md) Appendix A and the
pillars — content-first calm, generous type and rhythm, real light/dark, element
cohesion, meaningful motion, descriptive/self-explaining wording — are the reference to
adapt into our own neutral voice. Mine the *good engineering* of the current CSS
(tokens, bands, accents); take the *look and feel* from Josh; boast like neither.
This is the creative core and should be explored *visually* (mockups), not specced
blind — see §11 Phase 0.5. It sets: palette (open to change, not locked to the current
violet/amber), type system and scale, spacing/rhythm, surface treatment (depth, texture,
borders, glow), signature flourishes (tasteful meaningful motion; a quiet distinctive
personality), and how light/dark each feel like a real design. The bar: someone lands and
thinks "this is beautifully made," without a word of boasting. Decide it on screen, then
encode it as tokens.

### 4.1 CSS architecture decision
Move from one hand-edited `main.css` to **Sass partials compiled to one stylesheet**
via Jekyll's built-in `jekyll-sass-converter` (no new dependency, no client cost — one
delivered file). Treat the current CSS as reference, not scripture: lift the patterns
that work (token approach, `wrap`/`band`, `--pc` accents, light/dark mechanism) and
re-author the rest to the new design language (§4.0). Source becomes modular and
decoupled, mirroring the philosophy:
```
assets/css/main.scss            # @use the partials, emits one main.css
  _tokens.scss                  # all custom properties (light/dark, + new motion/code/callout tokens)
  _base.scss                    # reset, typography, links, focus, selection
  _layout.scss                  # wrap/band/grid/divider
  components/_button.scss _card.scss _project-node.scss _callout.scss
            _code.scss _example.scss _connections.scss _self-locate.scss
            _nav.scss _footer.scss _pulse.scss _doc.scss _downloads.scss _tag.scss
```
Carry over class *names* where they still fit (so templates stay stable), but the
*values* are redesigned to the new language — a visual refresh, not a port. *If* Sass
feels like overkill, fallback is a well-sectioned single `main.css` — but partials pay
off as the kit grows toward 100+ project nodes.

### 4.2 New/extended tokens (`_tokens.scss`)
- **Motion:** `--motion-fast:.15s; --motion:.25s; --motion-slow:.4s;` (already have
  `--ease`); a `--vt-duration` for View Transitions.
- **Callout variants:** `--cl-info/-success/-warning/-error` bg/border/ink, per theme
  (Josh's element-cohesion — see 4.3).
- **Code:** a full light/dark Rouge token set (see §7).

### 4.3 Component inventory (build/refine, each with light+dark, states, a11y)
1. **Self-locate header** (`_self-locate.scss`) — NEW. Every page-type header answers
   "what is this / what kind / what's it part of": a kicker line (kind + section, e.g.
   "Project · Hub") + h1 + lead, optional status chip. Generalizes the current
   `.page-head` and `doc-crumbs`. Drives "never lost" without a map.
2. **Project node** (`_project-node.scss`) — NEW, the centerpiece. Composes
   self-locate header + status/version/stack + live example slot + prose + connections
   block + activity (from pulse). Reuses `.proj-card` accent system (`--pc`).
3. **Callout / aside** (`_callout.scss`) — NEW. Variants info/success/warning/error;
   **context-aware** (a code block inside a callout adapts — Josh's cohesion trick) via
   contextual selectors + variables.
4. **Code block** (`_code.scss`) — extend. Custom Rouge theme, copy button, line
   highlight, filename caption (see §7).
5. **Live-example shell** (`_example.scss`) — NEW. Frame + controls styling for
   `<ff-example>` (see §6); fallback styling when JS is off.
6. **Connections block** (`_connections.scss`) — NEW. "Related / Connected" (edges out,
   from `related`) and "Referenced by" (from `backlinks.yml`). Doors, not rails.
7. **Pulse feed item** (`_pulse.scss`) — NEW. A dated, per-project "what changed" row;
   reuses update-card styling; replaces the decorative dot with real data.
8. **Carry over verbatim:** button, card/proj-card, tag, nav, footer, doc sidebar,
   downloads, bands, section-head.

---

## 5. Information architecture & templates

### 5.1 Page types → Jekyll mapping (the flat, decoupled web)
- **Home `/`** (`index.html`) → **portal**: short "what this is", featured project
  nodes (described, not bare), the **pulse** ("Recently"), entry points into docs.
  Not a feed, not a journey.
- **Projects `/projects/`** → the spine: every project as a described node-link.
- **Project node `/projects/<key>/`** → NEW canonical rich page (see 5.3). Decision:
  add a `projects` collection OR generate from `projects.yml` via a single
  `project.html` layout + a generator page. **Recommendation:** a `_projects` collection
  (one short md per project carrying `summary`/prose + `key`) rendered by a `project`
  layout that pulls structured data from `projects.yml` by `key`. Keeps prose authorable,
  data single-sourced. (The current `_docs/<key>.md` becomes the *deep docs*; the node
  is the *front door* and links to it.)
- **Docs library `/docs/` + doc pages** → exists (`doc.html`); add self-locate header +
  connections + backlinks; keep sidebar.
- **Updates `/blog/` + posts** → exists; rename surface to "Updates" already done in nav;
  add pulse cross-reference.
- **About**, **Downloads**, **Standards** (in docs) → keep; apply self-locate header.

### 5.2 Wiki-style cross-linking convention (author guidance + mechanism)
- **Authoring rule** (document in `hub/standards/` once proven): link the **first
  meaningful occurrence only**; skip trivial words; place cleanly; a project references
  another project only at **major points** (docs/README/repo).
- **Mechanism:**
  - *Outbound edges*: `related: [keys]` in `projects.yml` → rendered by the
    `connections` include. Decoupled (each node declares its own outward links).
  - *Backlinks ("what links here")*: computed by the management layer into
    `backlinks.yml`, rendered read-only. No page inspects another at build time.
  - *Inline prose links*: plain Markdown/HTML links, authored by the rule above.

### 5.3 Project node page — detailed spec (the vertical slice)
Sections, top to bottom (all landable cold, self-locating):
1. **Self-locate header** — kicker "Project", name, one-line what-it-is, status/version
   chip, accent = project color.
2. **At-a-glance** — stack tags, key facts (language, status, latest version from pulse).
3. **Live example** (if `example` set) — `<ff-example>` embedded; "see it run".
4. **What it is** — `summary` prose (authored in the `_projects` md).
5. **Connections** — Docs / README / Repo (major-point links) + related projects +
   "referenced by" (backlinks). Doors out.
6. **Recent activity** — this project's slice of `pulse.yml` (last few changes).
7. **Footer site-map** (global) — always-present orientation.
Acceptance: open the URL cold in light & dark, JS on and off, mobile and desktop — it
explains itself, the example runs (or shows a graceful fallback), every link is real.

---

## 6. Live examples — Web Components (detailed)

- **Base pattern:** `assets/js/ff-element.js` — a tiny base `class FFElement extends
  HTMLElement` (no framework) handling: token-aware styling (light/dark inherited),
  `prefers-reduced-motion`, lazy init via `IntersectionObserver`, and a **fallback**
  (the element's light-DOM content shows if JS/Custom Elements are unavailable).
- **Per-example elements:** `assets/js/examples/<name>.js` defining e.g.
  `customElements.define('ff-prompt-demo', …)`. ES modules, loaded with
  `<script type="module" defer>` **only on pages that use them** (via the include).
- **Embedding (kramdown-safe):** an include `_includes/example.html` that emits the raw
  custom-element tag + its fallback content + the module `<script>`. Used in `_projects`
  md and docs as `{% include example.html id="prompt-demo" %}`.
- **Styling:** `_example.scss` frame; the element renders into light DOM (not shadow) so
  it inherits tokens and the site theme automatically — simplest, most cohesive, and
  Laravel-portable.
- **First example (proves the slice):** **`ff-prompt-demo`** for `random-ai-prompt` — a
  small live DPL prompt generator (type/seed → generated prompt), pure client JS,
  light, immersive, and it shows the actual project working. Self-contained, decoupled,
  not hacky/heavy/fragile.
- **Quality rules:** keyboard accessible, labelled controls, no layout shift, no network,
  works without JS (fallback explains what it would do + links to the real tool).

---

## 7. Code presentation

- **Custom Rouge theme, light + dark:** add `components/_code.scss` targeting Rouge's
  `.highlight .k/.s/.c/...` token classes, driven by code tokens in `_tokens.scss`,
  switching with `prefers-color-scheme`. Tuned for AA on `--code-bg`.
- **Copy button:** progressive enhancement — a small module (`assets/js/code.js` or a
  `ff-code` wrapper) injects a "Copy" button into every `pre`. No button if JS off.
- **Line highlighting:** use Rouge `hl_lines` via a fenced-code include
  (`{% include code.html lines="3-4" %}`) or kramdown span classes; render a left "bump"
  like Josh's. Keep it optional.
- **Filename caption:** optional `data-file` on the wrapper → small caption row.

---

## 8. The pulse (aliveness)

- **Data:** `_data/pulse.yml` generated by the management layer reading each sibling
  repo's `notes/version/YYYY-MM.md` changelog (+ `VERSION`, last-commit date). Detailed
  but bounded (last N per project).
- **Render:** a "Recently" section on home (replacing the decorative dot with real,
  in-theme rows) and a cross-project strip on `/blog/`; per-project slice on each node.
- **Scope v1:** last-updated + last 3–5 changelog lines per project. Grow later
  (per-commit links, PR/release tracking) once the gathering layer matures.
- **In-theme + within constraints:** rendered with the pulse component; no third-party
  widgets; degrades to "last updated" if generation hasn't run.

---

## 9. Motion, accessibility, performance

- **View Transitions** (PE): cross-fade + shared-element on internal nav, gated behind
  `@media (prefers-reduced-motion: no-preference)` and feature detection. A `ff-link`
  or a small `nav.js` enhancement; never required for navigation.
- **rem media queries:** convert the px breakpoints in `main.css` (820/860/720/540/460)
  to rem so layout scales with user font size (design-direction §A.7). Cheap, on-brand.
- **No-JS baseline:** every page fully usable with JS off; examples/copy/transitions are
  enhancements only.
- **Perf budget:** one CSS file, system-ish fonts already subset via Google Fonts
  (consider self-hosting later), module scripts only where used, no layout shift.
  Target Lighthouse ≥95 all categories; verify per phase.
- **a11y:** semantic landmarks (`header/nav/main/footer` present), labelled controls,
  AA contrast held through new components, visible focus, reduced-motion honored.

---

## 10. File / directory layout (target)

```
assets/
  css/ main.scss + _tokens/_base/_layout + components/_*.scss   # compiled → main.css
  js/  nav.js  ff-element.js  code.js  examples/<name>.js
_data/ projects.yml(authored) doc_categories.yml downloads.yml
       pulse.yml(generated) backlinks.yml(generated)
_projects/ <key>.md            # NEW collection: node prose + key
_layouts/ default page post doc project(NEW)
_includes/ head header footer self-locate.html example.html code.html connections.html pulse.html
tools/   refresh-pulse.(mjs) refresh-backlinks.(mjs)  # management layer, excluded from build
.github/workflows/ pages.yml  refresh-data.yml(NEW)
```
Add `tools/` and `_projects` output rules to `_config.yml` `exclude`/`collections`.

---

## 11. Phased roadmap (versioned, with acceptance criteria)

Phasing is **vertical-slice-first**: prove the language + the data contract on one real
project before scaling. Versions follow SemVer in `VERSION` (MINOR per phase milestone).

### Phase 0 — Architecture groundwork (→ `0.3.x`, low risk)
- Write the **architecture decision** (two layers / `_data` contract) into
  [`../decisions/architecture.md`](../decisions/architecture.md).
- Stand up the Sass-partial structure + `_config` wiring (empty shells fine).
- **Accept:** `jekyll build` green; structure in place for the new design language.

### Phase 0.5 — Design-language exploration (→ the look, decide on screen)
- Produce **visual mockups** of the new language: at minimum the **home (portal)** and a
  **project node**, in **light and dark**, expressing joshwcomeau-level craft in our
  neutral, no-ego key. Iterate with Fairy Fox until it feels right.
- Lock the result into tokens (`_tokens.scss`): palette, type scale, spacing, surface
  treatment, motion, signature flourishes.
- **Accept:** Fairy Fox looks at it and thinks "this is beautifully made"; both themes
  feel intentional; constraints (AA, no-ego) hold. *This sign-off gates Phase 1.*

### Phase 1 — Component kit + one node slice (→ `0.4.0`)
- Build self-locate header, project-node, connections, example shell, callout.
- Create `_projects` collection + `project` layout; build **random-ai-prompt** node
  end-to-end with the **`ff-prompt-demo`** live example.
- **Accept:** the node page is landable cold in light/dark, mobile/desktop, JS on/off;
  example runs with graceful fallback; Lighthouse ≥95; both themes verified by screenshot.

### Phase 2 — Roll out + interconnection + portal (→ `0.5.0`)
- Node pages for all projects; home → portal; wiki cross-linking + `connections` +
  authored inline links; callout adopted in docs.
- **Accept:** every project has a self-standing node; home reads as a portal not a feed;
  first-occurrence link rule applied; no page depends on another at build time.

### Phase 3 — The gathering layer + code + motion (→ `0.6.0`)
- `tools/refresh-*` scripts + `refresh-data.yml` Action generating `pulse.yml` +
  `backlinks.yml`; render real "Recently" + "Referenced by".
- Code presentation (themes + copy + line highlight). View Transitions (PE).
- **Accept:** pulse/backlinks are generated (not hand-kept) and one-directional; copy +
  highlight work; transitions respect reduced-motion; nothing on the page fetches live.

### Phase 4 — Scale & polish (→ `0.7.0`+)
- Generalize for many projects; more examples; perf/a11y audit pass; self-host fonts if
  warranted. Review **Laravel migration readiness** (confirm `_data` is a clean contract).
- **Accept:** adding a project is one `projects.yml` + one `_projects/<key>.md` + optional
  example; everything else generates.

---

## 12. Risks & mitigations
- **Sass refactor regressions** → port verbatim first, screenshot-diff before extending.
- **Web Component scope creep** → strict rule: light DOM, no deps, fallback required,
  one example shipped before generalizing.
- **Gathering layer complexity** → start read-only + tiny (last-updated only), grow;
  never let the site build depend on it (it reads committed data).
- **Interconnection becoming noise** → enforce wiki first-occurrence rule; connections are
  curated edges, not auto-everything.
- **kramdown HTML pitfalls** → author raw HTML in styled wrappers; keep examples in
  includes, not inline Markdown.
- **Laravel drift** → treat `_data/*.yml` as the contract in code review; no display-only
  logic that can't be reproduced.

## 13. Deferred (decide while building, not now)
Exact callout palette values; final node section order; example #2 subject; whether
copy/highlight live in a `ff-code` element vs a standalone script; self-hosting fonts;
scheduled vs manual-only data refresh.

## 14. Immediate next actions (first commits, on `dev`)
1. Land the design-direction + this plan on `dev` (changelog entry; no VERSION bump —
   notes only).
2. Phase 0: write the architecture decision; Sass-partial the CSS (verbatim);
   rem media queries. One reviewable commit each.
3. Then Phase 1 kickoff: scaffold the `project` layout + `_projects/random-ai-prompt.md`
   + the self-locate/node/connections components, and stub `ff-prompt-demo`.
