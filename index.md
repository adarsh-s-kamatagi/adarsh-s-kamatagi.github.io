---
layout: default
permalink: /
---
<div style="width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; text-align: center; padding: 40px 20px; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 8px; margin-top: 0;">
  <p style="margin: 0 0 10px; font-size: 19px; line-height: 1.7; font-family: var(--font-serif); font-weight: 600; color: var(--gold);">
    असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ।।
  </p>
  <p style="margin: 0; font-size: 13px; font-family: var(--font-mono); color: var(--ink-faint); font-style: italic; letter-spacing: 0.02em;">
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
