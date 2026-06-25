---
title: "fairyfox.io launches, and Random AI Prompt ships 2.6.0"
subtitle: "Two threads land in one day: the project hub goes live, and Random AI Prompt closes its revival with a full test suite and a working release path."
date: 2026-06-22
tags: [fairyfox-io, random-ai-prompt, site, update]
---

Two things landed today — the hub you're reading this on went live, and Random AI Prompt
finished its revival sprint.

## fairyfox.io launches

This marks the launch of fairyfox.io: the hub for Fairy Fox's software projects. Until now
those projects lived as separate repositories with no shared front door; this site provides
one, along with a place to document the conventions they share.

It provides three things: a **project index** (the [projects page](/projects/), generated
from a single registry so it stays current), a **documentation library** (the [docs](/docs/)
section — an ecosystem overview, the shared engineering standards, and an entry point into
each project's own docs), and an **updates log** (this blog).

It is also a hub in a more literal sense: it holds the canonical shared standards (git
workflow, versioning, the notes system, cross-project sync), and each project pulls them in
on demand through a plain shallow `git` operation — no submodules, no live dependency. In the
other direction, the hub keeps read-only copies of the projects so their changes can be
tracked and documented. Each flow is one-directional git, which keeps the repositories
independent and avoids circular updates (the model is documented under
[cross-project sync](/docs/cross-project-sync/)). Because the custom domain is configured on
the user site, each project's GitHub Pages site is served under the same domain, so the
navigation can lead straight into a project's documentation.

## Random AI Prompt: a full test suite, and back to shipping

[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt) closed out its revival
with the two things a modernised project needs most: real tests and a working release path.

**From a smoke test to a real suite.** Until now the project had only linting and an import
smoke test. It now has layered coverage — Vitest for the Node engine and the React app,
Playwright for the browser:

```text
$ npm test
✓ lint (0 errors)
✓ smoke (module graph + all prompts)
✓ vitest  — 88 node + 30 web   (118 passed)

$ npm run test:e2e
✓ playwright — e2e + visual + a11y   (8 passed)
```

The browser specs include visual-regression snapshots (with the random suggestion masked so
the page is stable) and accessibility checks via `@axe-core/playwright`.

**The landmine worth documenting.** The underlying utility library captures the global random
function at import time, so you *can't* make its randomness deterministic by overriding
`Math.random` in a test:

```js
// Does NOT work — lodash already captured Math.random on import
Math.random = () => 0.42;
expect(_.sample(list)).toBe(list[0]);   // still random

// What the tests do instead: assert invariants, not exact picks
const out = expandPrompt("{#city}");
expect(out).toMatch(/streetview/);          // structure is stable
expect(out.split(",").length).toBeGreaterThan(2);
```

Only the language's own renderer, which uses its own seeded RNG, is driven deterministically.

**Unbreaking the pipeline.** With tests in place, the focus turned to shipping. The stable
branch had been held at the pre-revival state, and recent commits were red in CI — not from
test failures, but from the install step: the lockfile had drifted, and an incremental
`npm install` on Windows omitted the Linux-only optional packages CI needs. The fix is a
clean, full resolve:

```sh
rm -rf node_modules package-lock.json
npm install        # fresh resolve records @emnapi/*, linux-* bindings, etc.
npm ci             # now passes the sync check
```

Once green, the stable branch fast-forwarded to the current work for the first time in the
revival — which promptly exposed two more first-time deployment breakages in the docs and
release workflows, both fixed. A recurring theme of the week held to the end: the failures
were almost never the code itself, but the build, packaging, and tooling around it.

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- [Vitest](https://vitest.dev/) · [Playwright](https://playwright.dev/) ·
  [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright)
- [cross-project sync](/docs/cross-project-sync/)
