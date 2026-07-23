# Standard: Self-Hosted Assets

A published mesh site makes **no third-party requests** for its own presentation. Fonts, icon
fonts, and any static asset it controls are **self-hosted from its own origin** — never hot-linked
from Google Fonts, a public CDN, or similar, which leak the visitor's IP to that third party on
every page load. Distilled from the games and stories farms (both mandate self-hosted fonts, no
Google Fonts hot-link); general to every user-facing site in the mesh.

> Canonical, project-agnostic standard. Directly supports [`legal-docs.md`](legal-docs.md): a
> truthful "no third-party requests, nothing leaves to a font/CDN provider" is both more private
> and easier to state than disclosing an IP leak.

## The rules

1. **Self-host the fonts.** Ship the font files from the site's own origin (e.g. `assets/fonts/`)
   and reference them locally. Do **not** hot-link Google Fonts / Typekit / a public font CDN.
2. **No third-party hot-links for controlled assets.** Icon fonts, CSS/JS the site owns, and other
   static assets are vendored and served from the site — not pulled from cdnjs/jsDelivr/etc. at
   read time. (Genuinely external, user-invoked services are a different thing — this rule is about
   the site's own chrome and presentation.)
3. **The published site makes no presentation request to a third party.** On load, a visitor's
   browser fetches the site's assets from the site — nothing about them (IP, request metadata) is
   sent to a font or CDN host for the page to render.
4. **Keep the legal pages honest with reality.** If an asset genuinely must come from a third party,
   **disclose the IP exposure** in Privacy/Cookies ([`legal-docs.md`](legal-docs.md)) and record it
   as an exception with a remediation path — don't claim "no third-party requests" while hot-linking.

## Known exception (to remediate)

**Fonts: remediated (0.22.0).** The hub now self-hosts its typefaces — the three OFL variable
subsets (Fraunces / Inter / JetBrains Mono) live in `assets/fonts/` with a local `fonts.css`, and
`_includes/head.html` no longer references `fonts.googleapis.com` / `fonts.gstatic.com`. The shared
chrome bundle ships the same self-hosted fonts (bundle 2.3.0), so **no node needs the font
deviation** any more. Only the item below remains.

**Font Awesome / cdnjs (still open).** The hub still hot-links Font Awesome from cdnjs
(`cdnjs.cloudflare.com`, for the ~22 category/tech icons in the project cards). This is disclosed
truthfully in the hub's `/legal/privacy/` + `/legal/cookies/` pages (IP exposure to Cloudflare
flagged) and is a **recorded exception pending remediation** — either vendor the Font Awesome
webfont subset into `assets/` or replace the icons with inline SVG, then drop the cdnjs `<link>`.
Not a licence to hot-link. The farms (games, stories) carry no Font Awesome, so this is hub-only.

## Verify (is it being followed?)

The per-standard slice the [compliance audit](compliance.md) aggregates — `done`/`partial`/`missing`:

| Passes only when… | How to check |
|-------------------|--------------|
| Fonts are **self-hosted**, not hot-linked | grep the built HTML/CSS for `fonts.googleapis.com` / `fonts.gstatic.com` — should be absent |
| No **third-party CDN hot-links** for the site's own assets | grep for `cdnjs`, `jsdelivr`, `unpkg`, etc. in the built output |
| The published site makes **no presentation request off-origin** | load it and watch the network panel — asset requests stay same-origin |
| Any real exception is **disclosed** in the legal pages + recorded with a remediation path | read Privacy/Cookies; find the exception note |
