# Security Policy

Security policy for **fairyfox.io** — the project hub, documentation library, and home
page repo. See `hub/standards/supply-chain-hardening.md` (this satisfies the OpenSSF
Scorecard **Security-Policy** check).

## Reporting a vulnerability

Please report security issues **privately** — do not open a public issue for a suspected
vulnerability.

- Use GitHub's **private vulnerability reporting** for this repo:
  **Security → Report a vulnerability** (enabled under Settings → Code security →
  *Private vulnerability reporting*).
- Or email **junehanabi@gmail.com** with details and, if possible, a reproduction.

You'll get an acknowledgement as soon as it's seen. Please allow a reasonable window for a
fix before any public disclosure.

## Supported versions

Only the latest released version is supported. Fixes ship in a new release rather than as
back-ports. The single source of truth for the current version is the repo-root `VERSION`.

## Scope

This repo builds a **static Jekyll site** deployed to GitHub Pages at the `fairyfox.io`
custom domain. There is no server-side application and no user data stored on a server:
the site is HTML/CSS/JS served as files, and the only client-side state is the shared
reader-preference and coin counters kept in the visitor's own `localStorage`
(`fairyfox:reader:b`, `fairyfox:coins:a`) — see `/legal/privacy/` and `/legal/cookies/`.
The `hub/` and `notes/` trees are documentation and standards; `assets/references/` holds
read-only, git-ignored clones of sibling repos.

In-scope reports: anything that could compromise the build/deploy pipeline (GitHub
Actions), inject content into the served site, or exfiltrate a visitor's local state.
Out of scope: the sibling projects (report those against their own repos).
