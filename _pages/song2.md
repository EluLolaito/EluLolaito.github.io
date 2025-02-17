---
layout: default
title: CSV Data Test
permalink: /song2
---

## CSV Data Test

<table class="table-container">
  <tr>
    <th>Name</th>
    <th>Author</th>
    <th>Language</th>
    <th>Length</th>
    <th>BPM</th>
  </tr>
  {% for song in site.data.songs %}
  <tr>
    <td>{{ song.name }}</td>
    <td>{{ song.author }}</td>
    <td>{{ song.language }}</td>
    <td>{{ song.length }}</td>
    <td>{{ song.bpm }}</td>
  </tr>
  {% endfor %}
</table>
<pre>{{ site.data.songs | inspect }}</pre>
