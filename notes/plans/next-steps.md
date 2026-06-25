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

- [x] **Re-do existing `_posts/` day-centric** (done 2026-06-24) — merged the two
  double-post days, added the Jun 24 design-day post, tagged the hub as a project. Optional
  follow-up: re-title the older single-focus days to a day narrative.
- Going forward, write **day-centric updates** (work + discussion across all projects in
  one post per day), per the same doc.
- **List `fairyfox.io` as a project** — add it to `_data/projects.yml` + `hub/registry.yml`
  (lifecycle beta, active, its own docs), treated the same as the siblings.
- Flesh out `/about/` with whatever I want public.
- Add an Open Graph share image (`assets/og.png`) referenced by `jekyll-seo-tag`.
- Decide whether to schedule a recurring day-centric update pass.

## Later

See [`future.md`](future.md).
