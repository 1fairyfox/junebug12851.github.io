# Adapter — Dokka

Dokka (Kotlin's API doc generator) owns the whole page, like Doxygen — but it hooks
through **FreeMarker templates** and Gradle asset tasks, not `Doxyfile` settings. This is
the path `papermc-despawned-items` uses. Dokka is effectively the Doxygen case with a
different injection mechanism.

## Wiring (Gradle + `templatesDir`)

Override Dokka's FreeMarker **includes** (not `base.ftl`) so its viewport/layout stays
intact, and vendor the bundle assets into the docs root with a Copy task.

```kotlin
// build.gradle.kts (Dokka v2)
dokka {
  pluginsConfiguration.html {
    templatesDir.set(file("docs-theme/dokka-templates"))
    customStyleSheets.from(file("docs-theme/chrome/main.css"))   // your pulled master copy
    customAssets.from(/* favicon, etc. */)
  }
}

// vendor the behaviour files flat into the docs root, then generate
val vendorChromeAssets by tasks.registering(Copy::class) {
  from("docs-theme/chrome") { include("main.css","reader.js","nav.js","coins.js") }
  into(layout.buildDirectory.dir("dokka/html"))
}
tasks.named("dokkaGenerate") { finalizedBy(/* or dependsOn */ vendorChromeAssets) }
```

Override these FreeMarker includes under `docs-theme/dokka-templates/includes/`:
`page_metadata.ftl` (the bundle's [`head.html`](../head.html) lines),
`header.ftl` (the bundle's [`header.html`](../header.html) + [`subnav.html`](../subnav.html)
right after Dokka's body open), and `footer.ftl` (the bundle's
[`footer.html`](../footer.html) + the `nav.js`/`reader.js`/`coins.js` script tags).

## Three Dokka-specific gotchas (learned in adoption)

1. **Override `includes/*.ftl`, never `base.ftl`.** Replacing `base.ftl` throws away Dokka's
   viewport layout; the `includes/` overrides slot the chrome in while Dokka keeps owning the
   page frame.
2. **Keep the shared footer INSIDE `#main`.** Dokka uses a 100vh internal-scroll layout; a
   body-level footer creates a *second* window-scroll that unpins the sticky masthead. Put the
   footer in Dokka's content column, not full-bleed under the sidebar. (Record this as a
   deliberate deviation in `decisions/architecture.md`.)
3. **Reference vendored assets via `${'$'}{pathToRoot}`** (wrapped in
   `<@template_cmd name="pathToRoot">`), so a deep package page resolves the flat-vendored
   `main.css`/`*.js` at any depth. And — the same trap as Doxygen — **any new bundle
   behaviour file (e.g. a future `coins.js`) must be added to the vendor Copy task's `include`
   list**, or its `<script>` tag 404s.

## `main.css` load order (avoid global bleed)

The bundle CSS sets `html{font-size}`, `body{display:flex}`, and bare element selectors that
leak into a generator's body. Load **the bundle CSS before Dokka's own stylesheet**, and a
small per-stack harmony sheet *after*, so the boundary is deliberate. See
[`../../09-adopting-and-maintaining.md`](../../09-adopting-and-maintaining.md) ("boundary the
reference").

## The generated-reference boundary

Same rule as Doxygen: Dokka's API pages wear the **chrome** (header/subnav/footer/reader/
palette) so the frame reads as fairyfox, and the reference body stays reference — a clean
"API Reference" subnav zone with the way home always in the shared header. Keep Dokka's own
reference bar below the masthead as API controls (a recorded deviation). See
[`../../06-content-and-organization.md`](../../06-content-and-organization.md).

## Finish: run the compliance checklist

**Chrome adoption is not complete when the bundle renders — it is complete when
[`../../08-compliance-checklist.md`](../../08-compliance-checklist.md) passes and the result
is recorded in the node's `notes/reference/adoption-manifest.md`.** Injecting the chrome
without running module 05's rules (active nav = Projects; the adaptive subnav; the required
Downloads page for a releasing project) is exactly how a chrome-adopted docs site ships with
the wrong active nav and a missing page.
