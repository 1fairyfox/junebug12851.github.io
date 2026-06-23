---
title: "A redesign for the site itself"
subtitle: "fairyfox.io gets a full-bleed, dark-first layout tuned to WCAG AA, real project icons, a fuller documentation library, and a complete favicon set."
date: 2026-06-23
tags: [site, update]
---

The round-ups here usually report what changed in the projects fairyfox.io tracks.
This one turns the same lens on the site itself: it shipped a redesign today, in
several passes, and the work is worth recording on the same terms.

## Layout and theme

The previous design stacked everything into a single narrow column. The rebuilt
`assets/css/main.css` replaces that with a full-width fluid container and
full-bleed section bands, alternating tints to separate them, and a sticky footer
so short pages still anchor it to the bottom. A second pass made the theme
**dark by default**, with the light theme following the operating system
(`prefers-color-scheme`); colour now lives in per-project accents and the brand
mark rather than a bright site-wide gradient.

Contrast was treated as a requirement, not an afterthought. Every text and
background pair was computed against **WCAG 2.1 AA** and meets it — an
`--accent-ink` token carries an AA-safe violet for text, and the primary gradient
was ended at a point where white text on it still passes. The theme also adds
`:focus-visible` outlines and a `prefers-reduced-motion` guard.

## Navigation, home, and icons

The header's Projects menu is now a plain list of project names, each linking
straight to that project's on-site `/docs/<key>/` page, and the section formerly
called **Blog** is now **Updates** throughout the nav, footer, post layout, and
index. The home page lost its oversized hero in favour of a compact masthead
followed by full-width Projects and Latest-updates sections and a documentation
grid. Each project now shows its real application icon, keyed to its own accent,
in place of the old first-letter glyph.

## A fuller documentation library

The `/docs/` library was expanded to surface the whole `notes/` tree under a new
**"This site"** category — architecture, the system map, deployment, the updates
workflow, design decisions, and principles — separated from the shared
cross-project standards, and all rewritten in the site's neutral voice. The
About page was rewritten as a structured page rather than a single column.

## Favicons

Finally, the lone SVG favicon was replaced with a complete cross-platform set:
`favicon.ico`, an SVG, a 96×96 PNG, a 180×180 Apple touch icon, 192/512 web-app
manifest icons, and a `site.webmanifest`, all declared in the document head.

The redesign milestone landed as version `0.3.0`, with the interior-page and
favicon follow-ups taking it to `0.3.1`.
