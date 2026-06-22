# Deployment — GitHub Pages via Actions

The site builds and deploys itself. There is **no manual publish step.**

## The pipeline (`.github/workflows/pages.yml`)

On every push to `main` (and via manual `workflow_dispatch`):

1. **Checkout** the repo.
2. **`ruby/setup-ruby`** (Ruby 3.3) with `bundler-cache: true` — installs the
   `Gemfile` gems and caches them.
3. **`actions/configure-pages`** — provides the correct base path.
4. **`bundle exec jekyll build`** with `JEKYLL_ENV=production`.
5. **`actions/upload-pages-artifact`** uploads `_site/`.
6. **`actions/deploy-pages`** publishes it to the `github-pages` environment.

Building with our own Bundler + Jekyll (rather than GitHub's built-in Pages-gem
build) means **we are not limited to GitHub's plugin allowlist** — any Jekyll
version and any plugin in the `Gemfile` works.

## One-time setup on GitHub

- **Repo:** `junebug12851/junebug12851.github.io` (a user site — repo name =
  `<username>.github.io`).
- **Settings → Pages → Build and deployment → Source = "GitHub Actions"** (not
  "Deploy from a branch"). This is required for the workflow above to publish.
- **Custom domain:** the committed `CNAME` (`fairyfox.io`) plus DNS:
  - Apex `fairyfox.io` → A/AAAA records to GitHub Pages' IPs
    (`185.199.108–111.153` and the IPv6 equivalents), **or** an `ALIAS/ANAME`
    to `junebug12851.github.io`.
  - `www.fairyfox.io` → `CNAME` to `junebug12851.github.io` (optional).
  - In Settings → Pages set the custom domain and enable **Enforce HTTPS** once
    the certificate issues.

## Verifying a deploy

- Watch the run: `gh run list --workflow pages.yml -L 1` then
  `gh run watch <id>` (the GitHub CLI is installed + authed as `junebug12851`).
- A failed build publishes nothing (the previous deploy stays live) — fix forward
  and push again.

## Local preview

```sh
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

For a production-equivalent build: `JEKYLL_ENV=production bundle exec jekyll build`.
