---
layout: page
title: Projects
subtitle: Things I've built, am building, or keep coming back to.
permalink: /projects/
---

This page is generated from a single registry (`_data/projects.yml`), which also
feeds the home page and mirrors the cross-project sync registry. So it's always
current — add a project once, it shows up everywhere.

<div class="grid cols-2" style="margin-top:1.5rem">
{%- for proj in site.data.projects -%}
  <a class="card" href="{{ proj.site | default: proj.repo }}">
    <h3>{{ proj.name }}</h3>
    <p>{{ proj.blurb }}</p>
    <div style="margin-bottom:.5rem">
      {%- for t in proj.tags -%}<span class="tag">{{ t }}</span>{%- endfor -%}
    </div>
    <div class="muted" style="font-size:.85rem">
      {% if proj.status %}{{ proj.status }} · {% endif %}
      {{ proj.repo | remove: "https://github.com/" }}
      {%- if proj.site %} · live ↗{% endif %}
    </div>
  </a>
{%- endfor -%}
</div>

<h2>How this hub connects to my projects</h2>

This site is more than a homepage — it's the **hub** that ties my repositories
together. Shared standards (git workflow, the notes system, versioning,
templates) live here in [`hub/`](https://github.com/{{ site.author.github }}/{{ site.author.github }}.github.io/tree/main/hub),
and each project pulls them in on demand. In return, this hub keeps shallow,
read-only clones of those projects so I can track what changed and write about
it. The wiring is deliberately loose — git only, no live coupling — so each
repo stays simple and independent. The full model is written up in the repo
under `notes/reference/cross-project-sync.md`.
