---
title: "Song List"
layout: default
permalink: /songs
---

# Song list

{% include sheets.html %}

{% assign songs_data = site.env.SONGS_DATA | split: "\n" %}

<ul>
  {% for line in songs_data %}
    <li>{{ line }}</li>
  {% endfor %}
</ul>
