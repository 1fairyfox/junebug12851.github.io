---
title: "Random AI Prompt: untangling the word lists"
subtitle: "The lists at the heart of the generator get a deep cleanup — folders, a filename-based SFW model, dictionary-grounded categorisation, and group files."
date: 2026-06-20
tags: [random-ai-prompt, update]
---

Lists are the heart of
[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt) — each is a text
file of options, one of which is picked at random when referenced. Over the years they
had accumulated into a tangle: a giant unsorted dictionary, proper nouns mixed with
common words, slurs and extreme content sitting next to ordinary vocabulary, and clunky
duplicate lists. This day was a long, careful overhaul of all of it.

The cleanup ran on a principle worth stating: for proper nouns, a model's world
knowledge is the right classifier (no dictionary knows Achernar is a star), but for
parts of speech a real dictionary *states* the answer rather than guessing it. So the
dictionary dump was re-sorted into parts of speech using WordNet as the authority, and a
roughly 8,800-entry "keyword" junk drawer of proper nouns was hand-classified into
people, places, organisations, mythology, astronomy, religion, history, and more — with
coverage checks so nothing was silently dropped. A content-safety pass also tightened
the lists, keeping ordinary adult content gated rather than deleted, with real place
names and artist handles protected from false positives.

The structural work was just as large. Lists were organised into folders with
path-suffix resolution, so a bare name, a partial path, or a full path all resolve.
The SFW/NSFW model went through several iterations before settling: adult content is
keyed off the filename, a mixed topic is two files plus an implicit combined reference,
and the resolver combines them by mode — designed so a safe-only user never has to type
anything special. Composite lists became real `.group` files that can reference other
lists (and groups) rather than hardcoded definitions; folders with two or more lists
become implied groups automatically; optional description sidecars provide tooltips in
the editor; and "keyword" became a reserved wildcard that draws a word from any loaded
list. A wave of parallel review passes over the curated lists caught and fixed
hundreds of misfiled entries along the way.
