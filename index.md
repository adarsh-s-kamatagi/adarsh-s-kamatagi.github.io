---
layout: default
permalink: /
---
<div class="intro" style="text-align: center; padding: 28px 0 8px;">
  <p style="margin: 0 0 6px; font-size: 17px; line-height: 1.6; color: var(--ink-soft);">
    असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ।।
  </p>
  <p style="margin: 0; font-size: 13px; font-family: var(--font-mono); color: var(--ink-faint); font-style: italic;">
    lead me from untruth to truth, from darkness to light, from death to immortality
  </p>
</div>
<div class="section-label">Series</div>
<div class="series-grid">
  {% assign series_slugs = site.chapters | map: "series" | uniq %}
  {% for s in series_slugs %}
    {% assign s_chapters = site.chapters | where: "series", s | sort: "chapter" %}
    {% assign first = s_chapters.first %}
    <a class="series-card" href="{{ '/series/' | append: s | append: '/' | relative_url }}">
      <div class="series-card-meta">{{ s_chapters.size }} chapter{% if s_chapters.size != 1 %}s{% endif %}</div>
      <h2 class="series-card-title">{{ first.series_title }}</h2>
      <p class="series-card-desc">{{ first.series_description }}</p>
    </a>
  {% endfor %}
</div>

<div class="section-label">Notes</div>
<div class="log">
  {% assign total = site.posts.size %}
  {% for post in site.posts %}
    {% assign num = total | minus: forloop.index0 %}
    {% assign num_str = num | append: "" %}
    {% if num < 10 %}{% assign num_str = "00" | append: num_str %}{% elsif num < 100 %}{% assign num_str = "0" | append: num_str %}{% endif %}
    <a class="log-entry" href="{{ post.url | relative_url }}">
      <span class="log-num">№ {{ num_str }}</span>
      <span class="log-body">
        <h2 class="log-title">{{ post.title }}</h2>
        <p class="log-desc">{{ post.description }}</p>
        <span class="log-tags">{% for tag in post.tags %}#{{ tag }} {% endfor %}</span>
      </span>
      <span class="log-date">{{ post.date | date: "%b %Y" }}</span>
    </a>
  {% endfor %}
</div>
