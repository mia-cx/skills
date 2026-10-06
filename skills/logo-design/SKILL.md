---
name: logo-design
description: Use when the user asks to design a logo, mark, or app icon for a project, or to draw a construction grid for a logo.
---

# Logo design

Design a mark from a construction grid. Pick a geometric system, build the mark out of it, then draw the grid on a board. The grid comes first, so every curve and angle has a reason, and the board proves it.

Each direction lives in one generator script. The script defines the grid, derives the mark from it, and writes both SVGs, so the board always matches the mark:

```
brand/logo/
  proof.png               # from scripts/proof.mjs
  01-<slug>/
    build.mjs             # writes mark.svg and board.svg
    mark.svg
    board.svg
    board.png             # from scripts/proof.mjs
```

## 1. Brief

Read the project's README, DIRECTION.md, and CONTEXT.md. Write down the name, what the product does in one sentence, and 3 to 5 concept seeds: a mechanism the product uses, a metaphor, a letterform, a shape from its domain. Ask the user only when the name is unknown. A seed drawn from the name's origin needs that origin stated in the docs or confirmed by the user.

Done when the name, the sentence, and the seeds are written down.

## 2. Pick a system per direction

Make 3 directions unless the user names a number. Give each direction a different construction system, grown from one seed. These are hints, not a menu:

- tangent circles of a few related radii
- a triangular or hexagonal lattice
- a square module grid with quarter-circle arcs
- rotational symmetry of order 3, 4, or 6
- a ratio such as 1:√2 or the golden ratio between parts

Fix one unit module U. Express every radius, stroke, gap, and offset as a simple multiple or ratio of U, because shared ratios are what make a mark feel inevitable. When the brief supports only two strong systems, make two and say why: a weak third direction costs the user a decision and teaches nothing.

Done when each direction has a seed, a system, and U written down.

## 3. Build

Write `build.mjs` in plain Node with zero dependencies. Compute every point from grid primitives: circle intersections, tangent points, lattice nodes, extended edges. Emit the mark as filled paths (arcs via the SVG `A` command) in one colour, `#111`, with a viewBox tight around the mark. Aim for a few shapes that read as one silhouette.

Done when `node build.mjs` writes `mark.svg`.

## 4. Correct optically

Geometry gets the mark close; the eye has the final say. Apply each correction in `build.mjs` as a named constant with a one-line reason:

- Round and pointed parts overshoot flat edges by about 1 to 3% of the mark's height.
- Horizontal strokes run slightly thinner than vertical strokes of the same visual weight.
- Centre by visual mass, which often sits above the geometric centre.
- Open counters and joins that fill in at 16 px.

The board draws its guides from the uncorrected geometry, so the corrections stay visible as small, deliberate offsets.

Done when every correction is a named constant with its reason.

## 5. Draw the board

Extend `build.mjs` to write `board.svg`. Take the visual language from the four boards in [references/](references/): thin precise lines, neutral grays, a clear primary/secondary hierarchy, a calm editorial feel. Borrow their tone only; the geometry comes from your mark.

- Canvas 2560×1440, background `#FAFAFA`, neutral grays only, flat fills.
- The board carries only the mark and its geometry. Measurements and names belong in the report.
- Primary guides: solid, 2.4 px, `#333`. Secondary: dashed `8 6`, 1.7 px, `#666`. Auxiliary: solid or dotted, 1.3 px, `#999`.
- Mark copy: fill `rgba(0,0,0,0.10)`, outline 2.6 px `#222`. The mark stays the strongest element.
- Anchors: small hollow circles at key points, a centre marker, small squares at bounding-box corners.
- The mark fills 40 to 45% of the board height, centred. Guides extend about 0.15× the mark height past it.
- Use 25 to 35 guide elements. Mix straight guides, circles or arcs, and anchors wherever the mark has both curves and edges. Directions differ in organization and emphasis, and each one is complete.
- Every guide shows a relationship the build uses. Merge or drop lines that almost coincide with an edge or with each other, because a near miss reads as a mistake.
- Groups, bottom to top: `<g id="auxiliary">`, `secondary`, `primary`, `mark`, `anchors`.

Done when every direction has a `board.svg`.

## 6. Proof

Run `node <this skill's dir>/scripts/proof.mjs brand/logo`. It writes `proof.png` (each mark large, then in 64, 32, and 16 px squares the way app icons and favicons show it, on white and on black) and a `board.png` per direction. Read every PNG and check:

- The mark reads as one silhouette at 16 px.
- It is a mark only this project would use, more than a letter in a circle.
- Its silhouette stays clear of famous marks. Name the closest one you can think of in the report.
- Every guide meets the mark at an edge, tangent, or anchor.
- The line tiers read at a glance, and the mark stays the hero.

Fix and re-render once. When geometry is accurate but a board looks busy, drop the weakest guides: a beautiful board beats a complete one.

Done when every check passes, or each remaining failure is named for the report.

## 7. Report

Per direction, write 2 to 3 lines: the seed, the system and U, the relationships that hold only approximately, and the optical corrections. Embed `proof.png` and each `board.png`. Chat clients cache images by path, so after a re-render embed a copy with a fresh name such as `proof-r2.png`. Ask which direction to refine.

## Existing logo

To grid a logo that already exists, replace steps 1 to 4 with measurement. Parse its SVG path and record the bounding box, centre, and symmetry and how exact it is. Fit circles to curved segments, and check their radii, centres, and tangency. Record edge angles, repeated radii, and the anchors that matter: arc ends, tangent points, fillets.

The board explains the mark as it is. Keep its real shapes and its optical corrections, and name approximate fits in the report. Then run steps 5 to 7 on the original `mark.svg`, with one direction per distinct system the logo supports.
