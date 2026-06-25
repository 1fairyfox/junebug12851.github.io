# Next Steps

Ordered, current. Check off / remove as done; the history lives in
[`../sessions/`](../sessions/README.md).

## Now (get it live)

- [x] Create the GitHub repo `junebug12851.github.io` (public), push `dev` + `main`.
- [x] Enable Pages via Actions; first deploy green.
- [x] Local build check (`bundle install` + `jekyll build`, Ruby 3.3.11).
- [ ] **Wire the custom domain** — at the registrar, point `fairyfox.io` at GitHub
  Pages (apex A/AAAA to `185.199.108–111.153` + IPv6, or ALIAS/ANAME →
  `junebug12851.github.io`); optionally `www` CNAME → `junebug12851.github.io`.
  Then set the domain in Settings → Pages and enable Enforce HTTPS once the cert
  issues. (The `CNAME` file is already committed.)

## Soon (make it real)

- **Re-do existing `_posts/` day-centric** — merge posts that share a date, weave in
  that day's discussions from the session notes, re-slug/re-tag by day. **Preserve
  existing content (don't lose changes)** and **include the hub (fairyfox.io) itself as a
  project**, not just the siblings. Big content pass; the model is in
  [`../reference/blogging-workflow.md`](../reference/blogging-workflow.md).
- Going forward, write **day-centric updates** (work + discussion across all projects in
  one post per day), per the same doc.
- Flesh out `/about/` with whatever I want public.
- Add an Open Graph share image (`assets/og.png`) referenced by `jekyll-seo-tag`.
- Decide whether to schedule a recurring day-centric update pass.

## Later

See [`future.md`](future.md).
