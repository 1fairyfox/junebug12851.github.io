# Shared chrome bundle — CHANGELOG

What changed between bundle versions, so an adopting node can tell *what to re-verify*
from a read instead of inferring it from `VERSION` + the presence of a new file. The
bundle version lives in [`VERSION`](VERSION); pin the version you adopted in your node's
notes (and manifest) so a later refresh is a clean diff.

Newest on top. A node re-adopting the bundle should read every entry newer than the
version it currently carries, then re-run the [compliance checklist](../08-compliance-checklist.md).

## 2.2.1 — coin-counter polish (current)

- `coins.js` reading-engagement counter shipped and stabilized: the coin button injects
  into the header just left of the reader "Aa" button; first-view-per-day earn; the mini
  balance panel. Load order is `nav.js` → `reader.js` → **`coins.js`** (all `defer`).
- **Adopter action:** add `coins.js` to whatever mechanism copies the bundle's behaviour
  files into your docs output (Doxygen `HTML_EXTRA_FILES`; a Dokka/Copy task `include`;
  the site's script list) — a new bundle JS that isn't vendored will 404. Re-verify the
  coin button renders and counts across page loads, light + dark.
- **Off-chrome (games) note:** on a chrome-less page that still loads `coins.js`, the API
  + first-view earn run but the header button doesn't build — the page draws its own
  affordance. Read-time chip anchors to `main .content`/`.prose`/`article`; keep a drop-cap
  clear of the injected `.ff-readtime` node. See [`coins.md`](../../coins.md).

## 2.1.0 — coins introduced

- Added the `coins.js` behaviour file to the bundle (fourth behaviour file alongside
  `nav.js`, `reader.js`) and the matching `coins.md` standard + `/legal/coins/` disclosure
  expectation.

## 2.0.0 — the one-seamless-site bundle

- The bundle as a copy-verbatim set: `head.html`, `header.html`, `subnav.html`,
  `footer.html` + the master `main.css` / `reader.js` / `nav.js`, pulled over git at build
  time (never hot-linked). Retired the per-project hand-rebuilt chrome; the back-button
  gave way to a brand/Home way-home.

> Entries at and before 2.2.1 were reconstructed when this changelog was introduced
> (2026-07-23); every bundle change from here forward records its delta here in the same
> commit that bumps `VERSION`.
