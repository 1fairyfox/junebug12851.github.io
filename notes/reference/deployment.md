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

- **Repo:** `1fairyfox/junebug12851.github.io`. The repo was created as a GitHub
  **user site** back when the account was named `junebug12851`; the account has
  since been renamed **`1fairyfox`**, and the repo kept its old name, so it no
  longer matches the `<username>.github.io` pattern. It still serves correctly —
  the Pages API reports `https://fairyfox.io/` with HTTPS enforced, and the
  project sites still resolve at `fairyfox.io/<key>/` — because everything is
  reached through the **custom domain**, not the `<username>.github.io` host.
  (Renaming the repo to `1fairyfox.github.io` would restore the user-site shape;
  that's Fairy Fox's call, not a maintenance change.)
- **Settings → Pages → Build and deployment → Source = "GitHub Actions"** (not
  "Deploy from a branch"). This is required for the workflow above to publish.
- **Custom domain:** the committed `CNAME` (`fairyfox.io`) plus DNS:
  - Apex `fairyfox.io` → A/AAAA records to GitHub Pages' IPs
    (`185.199.108–111.153` and the IPv6 equivalents), **or** an `ALIAS/ANAME`
    to the Pages host.
  - `www.fairyfox.io` → `CNAME` to the Pages host (optional).
  - In Settings → Pages set the custom domain and enable **Enforce HTTPS** once
    the certificate issues.

## Verifying a deploy

- Watch the run: `gh run list --workflow pages.yml -L 1` then
  `gh run watch <id>` (the GitHub CLI is installed + authed as `1fairyfox`).
- A failed build publishes nothing (the previous deploy stays live) — fix forward
  and push again.

## Local preview

```sh
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

For a production-equivalent build: `JEKYLL_ENV=production bundle exec jekyll build`.
