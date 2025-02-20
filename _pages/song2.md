---
layout: default
title: CSV Data Test
permalink: /song2
---

## CSV Data Test

<ul>
{% for song in site.data.songs %}
  <li>
    <a href="https://github.com/{{ song.author }}">
      {{ song.name }}
    </a>
  </li>
{% endfor %}
</ul>

<pre>{{ site.data.songs | inspect }}</pre>
