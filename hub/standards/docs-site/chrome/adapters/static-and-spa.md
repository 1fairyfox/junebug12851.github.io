# Adapter — hand-rolled HTML, SPAs, and other generators

For anything that isn't Jekyll or Doxygen: a static HTML site, a React/Vite app (this
is Random AI Prompt's shape), MkDocs, Astro, plain templates.

## Hand-rolled / static HTML

Paste the four HTML parts directly into your page (or your one shared template):
[`head.html`](../head.html) in `<head>`, [`header.html`](../header.html) +
[`subnav.html`](../subnav.html) after `<body>`, [`footer.html`](../footer.html) before
the scripts, then `nav.js`, `reader.js`, `coins.js` (all `defer`). Vendor `main.css` +
the three JS files from the hub into your assets folder. Set the `.active` class by hand
per page.

## React / Vite / other component apps

1. **Vendor the assets, don't hot-link.** Pull `main.css`, `reader.js`, `nav.js`, `coins.js`
   from the hub into `public/` (or import `main.css` through the bundler). `reader.js`,
   `nav.js`, and `coins.js` are plain IIFEs — load them as classic scripts (e.g.
   `<script defer>` in `index.html`), not ES modules; they attach to the DOM on load.
2. **The chrome is not React state.** Render the header/subnav/footer as a static
   `Chrome` component whose markup matches the bundle's HTML exactly (same classes,
   same fixed nav). Don't re-model the primary nav as data the app can reorder — it's
   fixed mesh-wide. Drive only the `.active` marker and the subnav items from the app.
3. **Pre-paint still matters.** Put the [`head.html`](../head.html) theme `<script>`
   inline in `index.html`'s `<head>` (before the app bundle) so the theme is applied
   before React mounts — the same no-flash guarantee as the static sites. If the app
   prerenders/hydrates, the chrome markup should be in the prerendered HTML too.
4. `reader.js` inserts the "Aa" button into `.site-header .wrap` and `coins.js` inserts the
   coin button just left of it; make sure that element exists in the initial DOM
   (prerendered or in `index.html`), not only after a client render, or the buttons won't
   appear until hydration.

## MkDocs / Astro / etc.

Same principle as Doxygen: use the generator's custom-header / custom-footer / extra-CSS
hooks to inject the bundle parts and vendor the assets. If the generator gives you a
base template, the chrome goes there once.

## The universal rules

- **Vendor, never hot-link.** Pulled copies at build time — a deployed project must
  render with the main site offline.
- **Don't edit the fixed parts** (primary nav, reader button, palette). Fill only the
  `{{FF_*}}` slots + `.active`.
- **Keep the pre-paint script in `<head>`**, before anything renders.

## Finish: run the compliance checklist

Chrome adoption is complete when [`../../08-compliance-checklist.md`](../../08-compliance-checklist.md)
passes and the result is recorded in the node's `notes/reference/adoption-manifest.md` — not
when the bundle renders (active nav = Projects; the adaptive subnav; a releasing project's
required Downloads page all live in module 05/06, one link from the slot you just filled).
