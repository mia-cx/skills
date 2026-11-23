---
description: "My alliance needed a shared template server for Wplace, and since I was writing a userscript anyway, I fixed what bugged me about every other overlay too."
tags:
  - post
created_at: 2026-11-23T00:00
slug: yet-another-overlay-mod
draft: true
---

<!--
Reader: a developer building a userscript or extension on top of a web app they don't own (r/userscripts, Lobsters, Wplace tool makers).
Action: check what their own userscript or extension redoes on every fetch, and whether the host already computes it.
Takeaway: build on the host's own state (its camera, its canvas) in stead of reprocessing its output, and the features you couldn't build before come with it.
Title: Why I felt the need to build yet another fucking wplace overlay mod
Alternative title: The overlays I tried repainted Wplace's tiles. Mine draws inside the map.
-->

In August last year, my alliance started a pretty big project: painting every room from Celeste on Wplace.

Wplace is a shared pixel canvas laid over a map of the world, and anything bigger than a doodle gets painted from a template (the picture you're working from, laid over the map so you can see which colour goes where). This summer more and more new people started joining my Discord server and the project, and it got kinda convoluted having to point every one of them to a GitHub repository with a folder of images, one for each room.

So I started thinking, and landed on the same answer other devs came to back in the very first r/place: a shared template server. Nobody had built one for Wplace yet, so I figured I'd make my own. And since I was gonna write a userscript for it *anyway*, I figured why not go one step further and just... improve on every existing overlay mod out there. They were slow, and they all looked the same, and both of those bugged me.

## Why they're slow

Caelestis draws inside Wplace's map, with the camera Wplace already used for that frame.

Wplace loads its painted pixels in chunks (tiles), and the overlays that existed, like Blue Marble and Skirk, [painted the template into those images as they came in](https://github.com/mia-cx/Caelestis/pull/39). That made sense to me at first, I literally wrote ["ship raster first"](https://github.com/mia-cx/Caelestis/issues/14): Wplace takes care of moving and zooming the result, and the overlay doesn't need to know anything about how Wplace draws its map. What makes it slow is the repetition. Every pan costs a 36 MB pixel read per tile, and Wplace re-downloads every tile on screen every 6 seconds, changed or not ([PR #519](https://github.com/mia-cx/Caelestis/pull/519)), so the overlay redoes all of it for every tile under the template, even when nobody painted anything.

Then I [looked at how Wplace draws its map](https://github.com/mia-cx/Caelestis/issues/11) and found MapLibre, an open-source library that handles moving, zooming and drawing it. My first try was a second canvas stacked on top of the map, which was close, but two pixel grids that disagree by half a pixel show seams, and anything on my canvas covered Wplace's own crosshair ([PR #45](https://github.com/mia-cx/Caelestis/pull/45)). So Caelestis draws in a layer inside the map itself, using [the projection matrix MapLibre sends to the GPU for each tile](https://github.com/mia-cx/Caelestis/blob/209b44bc53683da316216dba42ad6248eba83354/apps/userscript/src/gl-observer.ts#L25-L34) (the math that says where that tile goes on your screen). It takes the map's answer in stead of working its own out from the zoom and position, so it lines up exactly, even when the map snaps its tiles to whole screen pixels.

That does mean depending on how Wplace draws its map, which is the exact thing the tile approach avoids. If Wplace ever swaps out MapLibre, that part is mine to redo.

## Why they all look the same

In Caelestis the template lives in a layer of its own, so how it looks is a setting, not a new image.

A dot in the middle of each pixel (so you can still see what's painted under it) sounds like a tiny change, until the template is baked into the tile. Then you have to make the *whole tile* bigger just to have room to draw the dot, which is why Blue Marble draws every tile at 3×, 3000 by 3000 pixels, and once the template is inside Wplace's tile there's no other look to switch to.

I'd figured I'd pick a few viewing modes and [give each its own render scale](https://github.com/mia-cx/Caelestis/issues/15). In its own layer, a template pixel is just one shape with settings: a small round dot or a square tucked into the corner, and you change it depending on how much of the painting you want to see, without asking Wplace for anything. It can [draw an outline under the painting and markers above it](https://github.com/mia-cx/Caelestis/blob/209b44bc53683da316216dba42ad6248eba83354/apps/userscript/src/gl/layer-stack.ts#L27-L35), so a pixel covers its own outline once it's painted, and still gets marked if it's the wrong colour. And when I'm working on one colour, it marks just the pixels left that need it.

## From template server to dashboard

The server part is the simple bit: the group's templates live in one place, and when a room changes there, everyone gets the new one, already in its place on the map, and nobody has to go back to the GitHub repo. If you're painting on your own, templates can still live in your browser.

Once the server had the templates, it had something to compare the painting with, and that's where it got kinda out of hand. Caelestis still sees the tiles come in, it just never changes them: the hook every other overlay uses to draw is the one Caelestis uses to measure. A report that I painted a hundred pixels can't tell you whether someone painted over them an hour later, so [the two stay separate](https://github.com/mia-cx/Caelestis/issues/5). The server compares the tiles people's browsers saw with the template to work out progress, and counts contributions from the paint reports people share, which means progress is only as current as the last time someone looked at each tile. That's how a place to put the group's images turned into [a whole dashboard](https://caelest.is) where you can see how much is left, how fast it's going, and what each painter did (or just play the timelapse).

## Anyway

So yeah, there were no overlays with a shared template server out there yet, and like I always do, I over-engineered my own version, so it's better (in my opinion) than anything else out there. Even the built-in overlays Wplace added one month into Caelestis' development (😭).

If you wanna try it out, get Caelestis from the [Chrome Web Store](https://chromewebstore.google.com/detail/caelestis/jmbohgmekgjlfdkoffmlmmcmbibhcdfb) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/caelestis/).
