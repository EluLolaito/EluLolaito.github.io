---
title: "Song List"
layout: songs
permalink: /songs/
---

# Song list

| # | Title | Artist | Language | Duration | Instrument | Key | BPM | Size | Last Updated |
|---|-------|--------|----------|----------|------------|-----|-----|------|-------------|
{% for song in site.data.songs %}
| {{ forloop.index }} | [{{ song.name }}]({{ song.url }}) | {{ song.author }} | {{ song.language }} | {{ song.length }} | {{ song.instrument }} | {{ song.pitch }} | {{ song.bpm }} | {{ song.size }} | {{ song.last_updated }} |
{% endfor %}
