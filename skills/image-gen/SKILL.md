---
name: image-gen
description: >-
  Generate or edit images with gpt-image through CLIProxyAPI, billed to the
  user's Codex subscription. Use when the user asks to generate, draw, render,
  or create an image, illustration, icon, mockup, or photo, or to edit, restyle,
  or combine existing images.
---

# Image generation

`scripts/imagegen.sh` calls CLIProxyAPI's OpenAI-compatible images endpoint with `curl`, so it works from any agent or harness that has a shell. It writes one PNG and prints its path.

```bash
imagegen.sh "a fox reading under a tree, gouache, wide 16:9" -o art/fox.png
imagegen.sh "put a wizard hat on the cat" -i cat.png -o cat-hat.png        # edit
imagegen.sh "the cat sits beside the lighthouse" -i cat.png -i lh.png      # combine
imagegen.sh "..." -m gpt-image-2.5-flare                                   # other model
```

Each call takes 15-20 seconds and returns one image. For several variations, run the calls in parallel.

## Prompting

The Codex backend ignores `size`, `quality`, and `output_format`: it always returns PNG and chooses its own dimensions. To get an aspect ratio, write it into the prompt, like "tall 9:16 portrait" or "wide 16:9".

Write the prompt the way you would brief an illustrator: the subject, the composition, the medium or style, the lighting, and any text that must appear verbatim, in quotes.

Look at the result with your image-reading tool before you hand it over. If the image misses the brief, revise the prompt, or pass the image back with `-i` and ask for the change.

## Models

The default is `gpt-image-2.5`. CPA also serves `gpt-image-2.5-flare`, `gpt-image-2.5-sunburst`, `gpt-image-2`, and `gpt-image-1.5`.

## Config

The key comes from `CPA_API_KEY`, or from `~/.config/cpa/api-key` when that variable is unset. `CPA_BASE_URL` defaults to `https://cpa.mia.cx`, which resolves only on the NetBird mesh. A `curl: (6)` error means the host is off the mesh or holds stale DNS: run `netbird down && netbird up`. Never print the key or commit it.

Exit codes: 1 for an API error (the script prints CPA's message), 64 for bad usage, 66 for a missing input file, and 78 for a missing key.

To share an image as a link, use the `upload-file` skill.
