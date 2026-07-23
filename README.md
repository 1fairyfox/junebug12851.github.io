# fairyfox.io

<!-- Badge block — grouped, flat-square. Standard: hub/standards/badges.md. Only
     services this repo actually wires are shown (no Codecov/Sonar/Scorecard: a static
     Jekyll site has no such service). -->

<!-- Activity / release -->
[![Last commit](https://img.shields.io/github/last-commit/1fairyfox/1fairyfox.github.io?style=flat-square)](https://github.com/1fairyfox/1fairyfox.github.io/commits)
[![Commit activity](https://img.shields.io/github/commit-activity/t/1fairyfox/1fairyfox.github.io?style=flat-square&label=commits)](https://github.com/1fairyfox/1fairyfox.github.io/commits)
[![Version](https://img.shields.io/github/v/tag/1fairyfox/1fairyfox.github.io?style=flat-square&label=version)](https://github.com/1fairyfox/1fairyfox.github.io/releases)

<!-- Build / deploy / docs -->
[![Pages](https://img.shields.io/github/actions/workflow/status/1fairyfox/1fairyfox.github.io/pages.yml?branch=main&style=flat-square&logo=githubpages&logoColor=white&label=pages)](https://github.com/1fairyfox/1fairyfox.github.io/deployments)
[![Site](https://img.shields.io/badge/site-fairyfox.io-4c9?style=flat-square&logo=readthedocs&logoColor=white)](https://fairyfox.io/)

The personal home page and project **hub** of Fairy Fox ([@1fairyfox](https://github.com/1fairyfox)).
A clean, custom [Jekyll](https://jekyllrb.com/) site — home, projects, blog, about
— deployed to GitHub Pages by GitHub Actions, plus the shared standards and
templates that tie my repositories together.

Live at **https://fairyfox.io**.

## What's in this repo

This one repo wears three hats:

1. **The website** — Jekyll site (`_config.yml`, `_layouts/`, `_includes/`,
   `index.html`, `projects.md`, `blog.html`, `about.md`, `_posts/`, `assets/css/`).
   The projects list is generated from `_data/projects.yml`.
2. **A living knowledge base** — `notes/` (status, sessions, changelog, context,
   systems, reference, decisions, plans) and `CLAUDE.md` (the AI/newcomer entry
   point). Excluded from the published site.
3. **The cross-project hub** — `hub/` holds the shared standards
   (`hub/standards/`), copy-paste templates (`hub/templates/`), and the project
   registry (`hub/registry.yml`) that my other repos pull from. Also excluded
   from the site.

## How it deploys

GitHub Actions builds the site with Bundler + Jekyll and publishes to GitHub
Pages on every push to `main` (`.github/workflows/pages.yml`) — no manual step,
and no Pages-gem plugin limits. One-time: set **Settings → Pages → Source =
"GitHub Actions"**, and point DNS for the `fairyfox.io` custom domain
(`CNAME` is committed). Details: `notes/reference/deployment.md`.

## Run it locally

```sh
bundle install
bundle exec jekyll serve        # http://127.0.0.1:4000
```

## The hub model (in brief)

Repos communicate **git-only, one direction per flow, on explicit request** — no
submodules, no live coupling. This hub keeps read-only shallow clones of my
projects under `assets/references/` (git-ignored) to track changes and blog about
them; each project keeps its own shallow clone of this hub to refresh shared
standards. Both track the `dev` branch. This keeps everything modular and avoids
recursion. Full write-up: `notes/reference/cross-project-sync.md` and
`hub/standards/cross-project-sync.md`.

## Versioning

SemVer, single source of truth in `VERSION`. See `notes/reference/versioning.md`.

## Map

```
index.html projects.md blog.html about.md   ← pages
_layouts/ _includes/ assets/css/main.css     ← theme
_posts/ _data/projects.yml                    ← content + registry
.github/workflows/pages.yml CNAME Gemfile     ← build & deploy
CLAUDE.md notes/                               ← AI context + living docs
hub/  (standards · templates · registry)       ← cross-project hub
assets/references/  (git-ignored clones)        ← inbound sync
```

Built by Fairy Fox. Open source.
