# 08 · Compliance Checklist

Run this to verify a project docs site conforms. "Compliant" = **as faithful a
match to fairyfox.io as the stack allows**, with the required two-way links and
accessibility bar met. Where a check can't be met for a real, documented reason,
record the deviation (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).

> **The disqualifying anti-pattern — read first.** A stack's **default-theme build** with
> only cosmetic changes (a couple of accent colours swapped, one "fairyfox.io" mention in the
> footer) is **NOT compliant, and not "partial" — it's `missing`.** Wearing the shared chrome
> means the *actual* bundle (header, primary nav, subnav, footer, palette, type, reader + coin
> buttons) on every page, with the tool's own default chrome removed. Two recoloured variables
> over a default template is the exact failure this checklist exists to catch. **Actually look
> at the rendered page** (light, dark, sepia; desktop + mobile) and walk every box below —
> don't self-certify "done to spec" from a diff. Claiming done without running this is a
> [checklists-are-contracts](../checklists-are-contracts.md) violation.

## Tokens & colour

- [ ] Dark theme uses the exact dark palette from [`02-design-tokens.md`](02-design-tokens.md).
- [ ] Light theme is implemented (not inverted) and uses the exact light palette.
- [ ] Colour scheme follows the OS (`prefers-color-scheme`); dark is the default, and
      the OS query is guarded with `:not([data-theme])` so a manual pick wins.
- [ ] **Sepia** theme (`data-theme="sepia"`) is implemented with the exact sepia palette.
- [ ] Lifecycle status uses the **fixed** hues (red/amber/green), not the accent.
- [ ] The per-project accent is applied only to brand/links/highlights; surfaces and
      text stay on the shared palette.

## Typography

- [ ] Fraunces (display), Inter (sans/body+UI), JetBrains Mono (code) are loaded at
      the specified weights.
- [ ] Base size/line-height and the heading scale match the tokens.
- [ ] Fonts are preconnected and don't reflow on page load.

## Shell & layout

- [ ] Sticky 64px header: translucent blur, hairline, brand left, nav right.
- [ ] Footer matches the multi-column structure.
- [ ] `main` grows so the footer sits at the bottom on short pages.
- [ ] Content sits in a centred container at `--maxw` with the `--gutter` padding.
- [ ] Docs pages have a grouped, ordered sidebar with the current page marked, a
      breadcrumb, and a capped reading measure for prose.

## Components

- [ ] Buttons, cards, chips, badges, code, blockquote, tables match the component
      specs (shape, radius, border, shadow, hover).
- [ ] The **reader ("Aa") menu** is present in the header with its controls
      (theme / accent / size / spacing / width), saving to the origin-wide
      `fairyfox:reader` key with the normative constants, applied before first paint.
      **Line spacing + width are reading-page only** — locked (disabled + "Enables on reading
      pages" note) unless the page carries `data-read` (or `data-story`) on `<html>`; text size
      / theme / accent stay live everywhere. **On a readable page the reader actually reflows
      the content column** — verify it works, don't just confirm the menu renders.
- [ ] The **coin button** is present in the header — **MANDATORY**, injected by the shared
      `coins.js`, just left of the "Aa" button, counting to the origin-wide `fairyfox:coins:a`
      key. It is **never omitted as "not needed"** (that's a `missing`, not a judgment call).
      Nothing in the project is gated on coins; any project-*added* coin moments are subtle
      and optional (see [`../coins.md`](../coins.md#verify-is-it-being-followed)).
- [ ] `:focus-visible` shows the accent outline on every interactive element.

## Chrome, cross-linking & branding

**Required:**

- [ ] The chrome is the **vendored [`chrome/`](chrome/) bundle** (copied verbatim +
      pulled over git), **not** a hand-built lookalike: header/subnav/footer markup and
      the `main.css`/`reader.js`/`nav.js`/`coins.js` match the master; only `{{FF_*}}` slots +
      `.active` differ; no runtime hot-link to fairyfox.io; the adopted `chrome/VERSION`
      is recorded. Full check: [`12-shared-chrome.md`](12-shared-chrome.md#verify-is-it-being-followed).
- [ ] **The whole bundle is adopted** (all four HTML parts + `main.css`/`reader.js`/`nav.js`/
      `coins.js` + fonts on every page) and **none of the tool's own default chrome remains** —
      no double footer/header, no default sidebar entries, no default stylesheet overriding the
      chrome's links/type/palette (the tool's CSS was **replaced, not overridden**). A link and
      a heading render in the chrome's styling, not the tool's defaults.
- [ ] The **shared header** is present with the **global primary nav** in the fixed
      order **Home · Projects · Farms (Stories · Games) · Docs · Updates · About** (not
      reordered or trimmed per project; Stories + Games under the **Farms** dropdown).
- [ ] The **brand mark and `Home` nav item link to `https://fairyfox.io/`** — this is
      the way home. There is **no separate "← Back to Fairy Fox" back-button**.
- [ ] **Active primary-nav item is `Projects` — always, and only `Projects`** — on every
      page of a standalone sub-project (never Home/Docs/Updates/About). See
      [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md).
- [ ] The site is reachable at `fairyfox.io/<key>/` and the registry entry
      (`docs:`, `repo:`) is accurate so the main site links *in* resolve.

**Recommended (absence is not a failure), but when present follow the canonical shape:**

- [ ] A **submenu** row below the primary nav following the **adaptive three-zone
      contract** — `[Name=home] · Overview · Project Notes · <section doors…> · Tutorials? ·
      Changelog · API? · Download? · Legal? · [Repository ↗ · Notes ↗]` — centre membership
      built from the pages/sections the project actually has (one door per non-empty notes
      section; existing pages only; read optionality ambitiously, not by shrinking to what
      exists), in the shared pill style, current item `.active`, every centre link a
      chrome-wearing page (no raw GitHub links in the centre)
      ([`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md#the-canonical-project-subnav-structure)).
      **Not a bare subnav** — a documented, releasing project shows at least Overview · Project
      Notes (+ section doors) · Changelog · API (most projects) · Legal + the `↗` pair; one or
      two lonely pills is a `gap`. **Dividers go between the three zones, not every pill.** The
      centre **`Project Notes` is the on-site notes interface, never a GitHub link** (only the
      right-hand `Notes ↗` may go to GitHub). If unsure of the markup, copy a sibling's subnav.
- [ ] A footer linking the project's repo, notes, and the main-site sections.
- [ ] A breadcrumb/locator near the page top.

**Branding:** the project may lead with its **own name** in its sub-brand/content.
Membership is carried by the **shared chrome** (header, primary nav, footer, theme) +
the brand/Home way-home — not by brand precedence.

## Seamlessness

- [ ] Header height/position/blur, fonts, `theme-color` metas, and favicon/manifest
      match the main site (no visible jump crossing the boundary).
- [ ] The reader menu + its `fairyfox:reader` key are identical to the main site, so a
      saved theme/size/spacing/width choice persists across the boundary.
- [ ] Links between the main site and the project resolve directly (same origin, no
      redirect bounce).

## Content & organization

- [ ] Pages cover the recommended roles (overview, getting started, reference,
      changelog) grouped by category.
- [ ] **API docs** (most projects should have them) are generated, themed/boundaried, and
      appear **only** in the **API** section — never bleeding into non-API pages.
- [ ] Generated API docs are linked from the **API** subnav item as a clear boundary,
      skinned where possible, with a way back.
- [ ] The generator's **sidebar lists only API pages** — no chrome nav/subnav items and no
      hand-authored pages leaked in (audit regularly; generators re-add them).
- [ ] The generator's **own footer is gone** — the shared chrome footer is the only footer
      (no Doxygen/JSDoc generated footer rendering).
- [ ] The project's `notes/` are a **fully navigable, polished on-site interface — never an
      external GitHub link**: under a **single `Notes`** subnav item, a landing that opens with
      the **root note prose then section cards/buttons**, a **persistent scrolling sidebar**
      listing **every note by category** with **nested drill-in *and* back-out** navigation, the
      sidebar **excluding the README/overview** and any non-note pages (not scattered, none
      unreachable). Individual note pages carry `data-read` and the **reader controls actually
      reflow the content pane**; the landing/sidebar do not. It **looks designed** (themed cards,
      readable measure), not a raw link pile.
      See [`06`](06-content-and-organization.md#notes-on-the-site-a-landing--a-sidebar).
- [ ] **Reader reading-controls follow readability** — readable pages (notes, legal, guides,
      articles) carry `data-read`/`data-story` so line-spacing + width apply; index/list,
      category, API, and sidebar pages **omit it** and keep the designed measure.
- [ ] If the project **offers downloads**, a **Downloads** page exists (linked as
      **Download**), sourced from GitHub releases, comfortably formatted, kept current, with
      a perma-"latest" section where latest-links exist
      ([`06`](06-content-and-organization.md#downloads-a-real-page-when-a-project-offers-downloads)).
- [ ] **No orphan / disconnected pages** and **no "Related"-style raw-link dumps**; every
      page is reachable, comfortably formatted, and its living parts (version, latest
      download, changelog, status) are kept current
      ([`06`](06-content-and-organization.md#page-quality-comfortable-formatted-connected)).
- [ ] **Legal pages** (Privacy · Terms · Cookies) are self-hosted, accurate to the code, dated,
      reachable from the **`Legal`** subnav item / primary menu, and linked from the **vendored
      chrome footer's legal column** (not a hand-built/derailed footer) — full breakdown +
      maintenance in [`../legal-docs.md`](../legal-docs.md#verify-is-it-being-followed).
- [ ] Public/website voice; refers to the parent as Fairy Fox / fairyfox.io.

## Accessibility (WCAG 2.1 AA)

- [ ] AA contrast in both themes (re-checked for any custom accent).
- [ ] Visible focus everywhere; logical focus order; keyboard-operable nav.
- [ ] `prefers-reduced-motion` honoured (ticker/lifts/scroll calm down).
- [ ] Proper landmarks and heading order; decorative images hidden, informative
      images described.

## Sign-off

- [ ] **This checklist was actually run and its result recorded in the node's
      `notes/reference/adoption-manifest.md`** — chrome adoption is complete only when the
      checklist passes and the manifest row is updated, not when the bundle renders
      ([`../checklists-are-contracts.md`](../checklists-are-contracts.md)).
- [ ] Deviations (if any) are recorded with their reason.
- [ ] Checked in light, dark **and sepia**, desktop and mobile widths.
- [ ] For the fairyfox.io master copy only: changes went through Fairy Fox's manual
      review — never auto-applied (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).
