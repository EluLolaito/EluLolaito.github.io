---
layout: default
title: CSV Data Test
permalink: /song2
---

## CSV Data Test

<ul>
  {% for song in site.data.songs %}
    <li>{{ song.name }} by {{ song.author }}</li>
  {% endfor %}
</ul>

<pre>{{ site.data.songs | inspect }}</pre>
