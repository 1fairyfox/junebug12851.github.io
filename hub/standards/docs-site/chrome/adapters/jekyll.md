# Adapter — Jekyll

A Jekyll project can consume the bundle with almost no friction, because Jekyll owns
its own `<head>`/layout. (The main site itself is Jekyll — this is how it's wired.)

## Wiring

1. **Pull** `assets/css/main.css` and `assets/js/{reader,nav,coins}.js` from the hub into the
   project's own `assets/` (a build step or a committed vendored copy — not a runtime
   link to fairyfox.io).
2. Drop the bundle HTML into `_includes/` as `header.html`, `subnav.html`,
   `footer.html`, and fold `head.html` into your `_includes/head.html`. Convert the
   fixed absolute URLs to `{{ '/…' | relative_url }}` if you prefer root-relative — both
   resolve on the same origin.
3. A `default.html` layout that assembles them:

```liquid
<!doctype html>
<html lang="en">
<head>{%- include head.html -%}</head>
<body>
  {%- include header.html -%}
  {%- include subnav.html -%}
  <main>{{ content }}</main>
  {%- include footer.html -%}
  <script src="{{ '/assets/js/nav.js' | relative_url }}" defer></script>
  <script src="{{ '/assets/js/reader.js' | relative_url }}" defer></script>
  <script src="{{ '/assets/js/coins.js' | relative_url }}" defer></script>
</body>
</html>
```

4. Fill the slots with Liquid: `{{ page.title }}`, an `.active` class from
   `page.url`, the subnav items from your own data, `{{ site.project_key }}` /
   `{{ site.project_name }}` for the footer.

## Notes

- Keep the primary nav include **byte-identical** to the bundle — don't localize it.
- Point `{{FF_CSS_HREF}}` at your pulled `main.css`.
- This is the reference wiring; the other adapters are the same idea in a stack that
  gives you less control over the page shell.

## Finish: run the compliance checklist

Chrome adoption is complete when [`../../08-compliance-checklist.md`](../../08-compliance-checklist.md)
passes and the result is recorded in the node's `notes/reference/adoption-manifest.md` — not
when the bundle renders (active nav = Projects; the adaptive subnav; a releasing project's
required Downloads page all live in module 05/06, one link from the slot you just filled).
