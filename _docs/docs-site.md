---
title: Docs-site design system
nav_title: Docs-site design system
category: standards
order: 10
summary: The shared look, structure, and cross-linking that make every project's documentation site feel like one continuous site with fairyfox.io.
---

Each project publishes its own documentation site, and this standard is what makes
those sites feel like one continuous surface with fairyfox.io — so moving from the
main site into a project's docs, and back again, is seamless. Its canonical machine
copy lives in the repository under `hub/standards/docs-site/`; this page is the
readable summary.

## A specification, not a theme package

The standard is written as a **specification that each project implements in its own
stack** — Jekyll, a JavaScript app, a generated API reference, or hand-written HTML —
rather than a CSS file to copy. The goal is a result a visitor cannot tell apart from
fairyfox.io, not byte-identical source. Where a project's tooling cannot match
exactly, it matches what it can and keeps the unavoidable difference behind a clear,
intentional boundary.

## What it covers

The standard is split into focused files: the overview and principles, the exact
**design tokens** (the dark and light palettes, typography, spacing, radii, shadow,
and motion), the **layout and structure** (page anatomy and the sidebar/content
documentation shell), the shared **components** (brand, navigation, buttons, cards,
code, callouts, tables, badges, footer), **navigation and cross-linking**,
**content organization**, **accessibility** to WCAG 2.1 AA, a **compliance
checklist**, a guide to **adopting and maintaining** it, the **domain and
publishing** model, and a precise **measurements reference** that pins every value.
A read-only copy of the master stylesheet is bundled as the ultimate exact
reference — to reimplement, not to link.

## One domain, two-way links

Seamlessness rests on three things. Every project publishes its docs **under the
same domain** as the main site (served at `fairyfox.io/<project>/`); every site
wears the **same tokens, layout, and components**; and the links run **both ways** —
each project's header offers the way back to fairyfox.io and to the project's own
node page, while the main site links into each project's docs. Get those right and
the boundary between the hub and a project disappears.

## fairyfox.io is the master copy

The design system originates at fairyfox.io, and this site is the **master copy**.
Changes to the theme here are made deliberately, through a separate manual review,
and are **never** auto-applied to fairyfox.io by the update flow. The direction is
one-way: the master is curated here, and projects adopt outward from it.
