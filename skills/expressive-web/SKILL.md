---
name: expressive-web
description: Use when the user asks for a scroll-driven, spatial, animated, procedural, or WebGPU experience, a hero or landing page that feels alive, or asks to make a marketing page use the web as a medium. Micro-interactions belong to transitions-dev. Stage 5 of ui-design.
---

# Expressive web

Use capabilities that a static brochure cannot offer. In an expressive web or marketing assignment, implement a substantial product-relevant experience through scroll-driven composition, spatial interaction, animation, procedural imagery, or WebGPU/WGSL. Hover effects, a theme toggle, and a shimmer alone do not meet this requirement.

## Choose the technique

Choose the technique because it communicates something specific. Let the product remain operable while people explore it. Operational interfaces can be direct and efficient while their marketing experience is more expressive. Do not force a GPU scene into a form that gains nothing from it.

Read and use [transitions-dev](../transitions-dev/SKILL.md) when implementing motion. It owns transition recipes and motion tokens; do not inline them here.

An optional preflight can generate a page image through an available image-generation tool. Treat it as a concrete composition reference. Inspect it for impossible interactions, unreadable text, and layouts that cannot adapt. Recreate the feasible design as responsive UI. Never ship a flattened image in place of the interface. Use only models actually available in the runtime.

## Keep the page usable

Keep native scrolling and user control. Prefer CSS scroll timelines for scroll-driven animation. Avoid routing continuous scroll or pointer updates through application reactive state. Animate named properties; do not use `transition: all`. Measure ambitious effects for layout, paint, and GPU cost.

GPU work needs a usable fallback. Stop rendering when hidden. Reduced motion retains content and actions while removing unnecessary movement. Essential controls remain semantic DOM elements, usable without the visual effect; [ui-a11y](../ui-a11y/SKILL.md) owns that contract.

The stage is done when the experience communicates one specific thing about the product, the page stays operable with the effect disabled, hidden, or reduced, and the measured cost of the effect is recorded rather than assumed.
