# Shared chrome bundle

The **one canonical bar, subnav, footer, reader/theme, and palette** that every
project wears — shipped as files a project **copies verbatim**, not a spec it
reimplements. This is what makes the mesh actually seamless instead of
almost-seamless: before this bundle, each project hand-rebuilt the header/reader/
footer and each one drifted. Now there is a single source, and adopting it is a copy.

> **Bundle version:** see [`VERSION`](VERSION). Pin the version you adopted in the
> project's notes so a later refresh is a clean diff.

## What's in the bundle

| Part | Where it lives | How a project gets it |
|------|----------------|-----------------------|
| **Stylesheet** (palette, type, every chrome component) | the live master `assets/css/main.css` | **pull over git** (below) |
| **Reader menu** behaviour | the live master `assets/js/reader.js` | **pull over git** |
| **Nav** behaviour (hamburger, dropdowns) | the live master `assets/js/nav.js` | **pull over git** |
| **`<head>` chrome** (theme metas + pre-paint script + fonts) | [`head.html`](head.html) | copy verbatim |
| **Header** (brand + fixed primary nav) | [`header.html`](header.html) | copy verbatim |
| **Subnav** (section row) | [`subnav.html`](subnav.html) | copy, fill `{{FF_SUBNAV_ITEMS}}` |
| **Footer** | [`footer.html`](footer.html) | copy, fill `{{FF_*}}` |

Why split it this way: **CSS and JS are framework-agnostic files** — a project vendors
the master copies directly, so there is exactly one source of truth and no snapshot
lag. The **HTML** can't be pulled from the site's Liquid `_includes/` as-is, so the
static, resolved form lives here in the bundle.

## The consumption model — pull over git at build time

The assets are **hosted in the hub repo and pulled into a project at build time.**
That keeps the mesh **decoupled**: the built, deployed project is self-contained
(it ships its own copies and renders offline), so a bad change to the main site can
**never** live-restyle or break a project — the opposite of hot-linking the main
site's CSS/JS at runtime, which this standard still forbids.

Pull the three live master files from the hub repo. Any of these is fine; pick what
your build already uses:

```sh
# sparse/partial checkout of just the assets you need, into a build folder
git clone --no-checkout --depth 1 https://github.com/1fairyfox/junebug12851.github.io _ff && \
cd _ff && git sparse-checkout set assets/css/main.css assets/js/reader.js assets/js/nav.js \
  hub/standards/docs-site/chrome && git checkout
# → copy assets/css/main.css, assets/js/{reader,nav}.js, and the chrome/*.html partials
#   into your project's build output / static dir.
```

or a git submodule / subtree pinned to the hub, or your generator's own fetch step —
the standard is *"pull it, don't paraphrase it, and don't hot-link it."* Track the
`dev` branch (the mesh work branch), same as every other hub pull.

Then, on every page the generator emits:

1. Paste [`head.html`](head.html) into `<head>` (point `{{FF_CSS_HREF}}` at your
   pulled `main.css`).
2. Paste [`header.html`](header.html) as the first thing in `<body>`; mark the current
   section `.active`.
3. (Recommended) Paste [`subnav.html`](subnav.html) below it; fill this project's pages.
4. Paste [`footer.html`](footer.html) before the scripts; fill `{{FF_PROJECT_KEY}}` /
   `{{FF_PROJECT_NAME}}`.
5. Load `nav.js` then `reader.js` (both `defer`) before `</body>`. `reader.js` injects
   the "Aa" button into the header for you.

## The placeholder contract

Everything in the bundle is **fixed** except the marked slots. A project **must not**
edit the fixed parts (the primary nav set/order, the reader button, the palette) — that
is the whole point; editing them re-introduces the drift the bundle exists to kill.
The only slots you fill:

| Token | Meaning |
|-------|---------|
| `{{FF_CSS_HREF}}` | path to your pulled copy of `main.css` |
| `{{FF_SUBNAV_ITEMS}}` | this project's own section links (subnav only) |
| `{{FF_PROJECT_KEY}}` | repo slug, e.g. `random-ai-prompt` |
| `{{FF_PROJECT_NAME}}` | display name, e.g. `Random AI Prompt` |

Plus the per-page `.active` marker on the current nav/subnav item.

## Doc generators — "some things drop in, some don't"

A generator that lets you set an HTML header/footer and a stylesheet (Doxygen, MkDocs,
many SPA shells) can take the bundle almost as-is. One that owns the whole page and
won't let you wrap it needs an adapter. See [`adapters/`](adapters/):

- [`adapters/jekyll.md`](adapters/jekyll.md) — includes + `relative_url`
- [`adapters/doxygen.md`](adapters/doxygen.md) — `HTML_HEADER` / `HTML_FOOTER` /
  `HTML_EXTRA_STYLESHEET`, and the generated-reference boundary
- [`adapters/static-and-spa.md`](adapters/static-and-spa.md) — hand-rolled HTML,
  React/Vite, and other generators

## Sync — this bundle mirrors the live master

fairyfox.io is the **master copy** (see
[`../09-adopting-and-maintaining.md`](../09-adopting-and-maintaining.md)). The CSS/JS a
project pulls **are** the live master files, so they're never stale. The static HTML
here is the **resolved form of the site's `_includes/{header,subnav,footer}.html` and
`head.html`** — when those change on the site, this bundle is updated in the same
commit and its `VERSION` bumped. It flows **outward only**; an adopting project never
edits it. Full spec + how to adopt/refresh:
[`../12-shared-chrome.md`](../12-shared-chrome.md).
