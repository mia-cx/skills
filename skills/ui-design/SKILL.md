---
name: ui-design
description: Use when the user asks to design, build, review, or refine product UI or marketing pages, or to fix generic interfaces and poor usability. Routes through the ui-layout, ui-style, ui-copy, ui-a11y, expressive-web, and ui-review stages.
---

# UI design

Design the interface around the product's actual work. A recognisable visual identity grows from that work and its audience. These skills set a process and quality bar, not a house style.

## Build the product first

Implement the core workflow before building its marketing demonstration. Use the real components and state for embedded product examples. A visitor should be able to perform the action they are shown.

Frontend-only means local data and simulated services. It does not mean decorative controls, generic dashboard fragments, or an incomplete editor. Complete visible interactions, including validation, cancellation, confirmation, and coherent state across routes.

Keep demo reset and failure injection outside ordinary customer controls. Disclose simulations where users might mistake an action for an external transaction. Put detailed implementation limitations in the human README.

Build one meaningful screen, render it, and inspect it before extending its patterns. This is an internal iteration step. It does not add an approval pause to an already authorized implementation.

## Stages

Composition, typography, color, density, shape, and navigation are chosen together. The stages order the work, not the decisions. For a new screen or page, read each stage's SKILL.md as you enter it. For a narrow task, read only the stage it names.

1. [ui-layout](../ui-layout/SKILL.md): the product's work, its journey, the composition that carries it, and stable geometry across states.
2. [ui-style](../ui-style/SKILL.md): typography, color, shape, tokens, color modes, and `DESIGN.md`.
3. [ui-copy](../ui-copy/SKILL.md): every string the interface shows.
4. [ui-a11y](../ui-a11y/SKILL.md): the interaction contract of every control.
5. [expressive-web](../expressive-web/SKILL.md): scroll, spatial, animated, and GPU experiences, for expressive or marketing assignments only.
6. [ui-review](../ui-review/SKILL.md): render, inspect, and perform the journey before handing off.

## Variants and parallel builders

Create variants only when requested. Give parallel builders fresh context, explicit file ownership, the same applicable requirements, and this skill with every stage. Do not expose sibling outputs or assign aesthetic seeds unless requested.

The work is done when every stage's completion criterion holds for every delivered route.
