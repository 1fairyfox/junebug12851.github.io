---
layout: page
title: Projects
eyebrow: The work
subtitle: Fairy Fox's software projects, each linking into its documentation, downloads, and source.
permalink: /projects/
---

<ul class="proj-rows" style="margin-bottom:2.6rem">
{%- for proj in site.data.projects -%}
  <li class="proj-row" style="--pc:{{ proj.color | default: '#8b6cff' }}">
    <span class="proj-glyph" aria-hidden="true">{%- if proj.icon -%}<img src="{{ '/assets/icons/' | append: proj.icon | append: '.png' | relative_url }}" alt="">{%- endif -%}</span>
    <div class="proj-row-body">
      <div class="proj-row-head">
        <h3>{{ proj.name }}</h3>
        {%- if proj.status %}<span class="proj-status"><span class="sdot"></span>{{ proj.status }}</span>{% endif -%}
      </div>
      <p class="blurb">{{ proj.blurb }}</p>
      <div class="tags">
        {%- for t in proj.tags -%}<span class="tag{% if forloop.first %} accent{% endif %}">{{ t }}</span>{%- endfor -%}
      </div>
      <div class="card-links">
        <a href="{{ proj.key | prepend: '/docs/' | append: '/' | relative_url }}">Documentation →</a>
        {%- assign dl = site.data.downloads | where: "key", proj.key | first -%}
        {%- if dl -%}<a href="{{ '/downloads/' | relative_url }}#{{ proj.key }}">Downloads</a>{%- endif -%}
        {%- if proj.docs -%}<a href="{{ proj.docs }}">Docs site ↗</a>{%- endif -%}
        <a href="{{ proj.repo }}">Repository ↗</a>
      </div>
    </div>
  </li>
{%- endfor -%}
</ul>

<div class="prose">
  <h2>How the projects connect</h2>
  <p>This site is the hub for the projects above. The shared engineering standards
  they follow are documented in the <a href="/docs/">documentation library</a>, and
  each project pulls those standards from the hub on demand. In the other direction,
  the hub keeps read-only copies of the projects so their changes can be tracked and
  written up. The connections are deliberately loose — git only, no live coupling —
  which keeps each repository independent. The full model is described under
  <a href="/docs/cross-project-sync/">cross-project sync</a>.</p>
  <p>Because the hub uses a custom domain, the projects' own GitHub Pages sites are
  served under it too — for example, <code>fairyfox.io/pokered-save-editor-2/</code>
  — so the navigation can lead straight into a project's documentation.</p>
</div>
