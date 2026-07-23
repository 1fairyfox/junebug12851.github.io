# Adapter — Doxygen

Doxygen generates the whole page, but it exposes exactly the three hooks the bundle
needs: a custom header, a custom footer, and an extra stylesheet. This is the path
Pokered Save Editor 2 uses.

## Wiring (`Doxyfile`)

```
GENERATE_TREEVIEW      = YES
DISABLE_INDEX          = NO
HTML_HEADER            = docs/ff-header.html
HTML_FOOTER            = docs/ff-footer.html
HTML_EXTRA_STYLESHEET  = docs/main.css        # your pulled copy of the master
HTML_EXTRA_FILES       = docs/reader.js docs/nav.js docs/coins.js
HTML_COLORSTYLE        = LIGHT                 # let the shared CSS/reader own theming
```

1. **`ff-header.html`** = a Doxygen header template: the doctype/`<head>` opening,
   then the bundle's [`head.html`](../head.html) lines, then the bundle's
   [`header.html`](../header.html) and [`subnav.html`](../subnav.html) right after
   `<body>`. Keep Doxygen's `$relpath^`, `$projectname`, and the required
   `<!--BEGIN/END-->` markers intact — paste the chrome *around* them.
2. **`ff-footer.html`** = the bundle's [`footer.html`](../footer.html), then the
   `<script>` tags for `nav.js`, `reader.js`, and `coins.js`, then just Doxygen's closing
   `</body></html>`. **Drop Doxygen's own generated footer / timestamp bar** — the chrome
   footer is the only footer; don't let the generated one render underneath it.
3. Pull `main.css` + `reader.js` + `nav.js` + `coins.js` from the hub into `docs/` as part
   of the build; don't hot-link them.

## The generated-reference boundary

Doxygen's API pages (class lists, member tables) can't fully become fairyfox
components — and shouldn't be faked. Wear the **chrome** (header/subnav/footer/reader/
palette) so the frame reads as fairyfox, and let the reference body be reference. Mark
it a clean, intentional zone (an "API Reference" submenu item) with the way back always
present via the shared header. This is the sanctioned "match what you can + boundary the
rest" case — see [`../../06-content-and-organization.md`](../../06-content-and-organization.md)
and [`../../09-adopting-and-maintaining.md`](../../09-adopting-and-maintaining.md).

## Notes

- `HTML_COLORSTYLE = LIGHT` stops Doxygen from injecting its own dark inversion that
  would fight the shared theme; the bundle's CSS + reader own light/sepia/dark.
- Re-check the header/footer templates after a Doxygen major upgrade — the
  `<!--BEGIN/END-->` block set can change.
- **A new bundle behaviour file (e.g. a future JS) must be added to `HTML_EXTRA_FILES`**,
  or its `<script>` tag 404s (`coins.js` hit this on the first rebuild).

## Finish: run the compliance checklist

Chrome adoption is complete when [`../../08-compliance-checklist.md`](../../08-compliance-checklist.md)
passes and the result is recorded in the node's `notes/reference/adoption-manifest.md` —
**not** when the bundle renders. Injecting the chrome without running module 05's rules
(active nav = Projects; the adaptive subnav; a releasing project's required Downloads page)
is how a chrome-adopted site ships with the wrong active nav and a missing page.
