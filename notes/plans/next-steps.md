# Next Steps

Ordered, current. Check off / remove as done; the history lives in
[`../sessions/`](../sessions/README.md).

## Now (get it live)

1. **Create the GitHub repo** `junebug12851.github.io` (public) and push `dev`
   + `main`.
2. **Enable Pages via Actions** — Settings → Pages → Source = "GitHub Actions".
3. **Confirm the first deploy is green** — `gh run watch` the `pages` workflow;
   fix forward if red.
4. **Wire the custom domain** — DNS for `fairyfox.io` → GitHub Pages, set the
   domain in Settings → Pages, enable Enforce HTTPS once the cert issues.
5. **Local build check** — once Ruby finishes installing, `bundle install` +
   `bundle exec jekyll build` to catch anything CI would.

## Soon (make it real)

- Write the first genuine **project round-up** post once there's a diff to report
  (see [`../reference/blogging-workflow.md`](../reference/blogging-workflow.md)).
- Flesh out `/about/` with whatever I want public.
- Add an Open Graph share image (`assets/og.png`) referenced by `jekyll-seo-tag`.
- Decide whether to schedule a recurring "check projects, draft round-ups" pass.

## Later

See [`future.md`](future.md).
