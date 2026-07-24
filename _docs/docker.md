---
title: Docker — local-first build, test, and setup
nav_title: Docker
category: standards
order: 33
summary: Use Docker to run the Linux half of a project locally — build, test, and setup — instead of deferring it to online CI to discover whether it passes.
---

**Use Docker whenever it helps — and it usually does.** A container gives a project a
reproducible, throwaway environment to build in, test in, and install or run from, on any machine.
The owner develops on Windows with Docker available, so anything that "needs Linux" — a Linux-only
build, a Linux test matrix, a server image, an install flow — can and should run **locally in a
container**, not be quietly deferred to the online CI runner. The canonical copy is in the
repository at `hub/standards/docker.md`; it sits alongside [agent tooling](/docs/agent-tooling/)
and [testing](/docs/testing/).

## The rules

- **Local-first, CI-as-backstop.** Online CI is the gate that must stay green before a release — it
  is not the place you go to *discover* whether a Linux build or test passes. Run it locally in
  Docker first, iterate there, and let CI confirm. Defaulting Linux-only work to "push and see what
  CI says" is the anti-pattern this standard closes.
- **Containerize the loops where it helps** — a reproducible build image, the test suite (especially
  a Linux-only toolchain or a service the app talks to), and a from-scratch setup or install so
  onboarding is one reproducible command.
- **Fix Docker problems, don't route around them,** and mind the Windows↔Linux gotchas (line
  endings, mounts, platform). Record an honest "not applicable" where a container genuinely adds
  nothing.
