---
name: ui-layout
description: Use when the user asks to lay out a screen or page, place navigation, arrange or group content, choose density, set breakpoints or make a page responsive, or fix content that shifts or jumps between states. Stage 1 of ui-design.
---

# UI layout

The layout is the product's work made visible. Derive it from the task, never from a page template.

## Read the product

Read the supplied brief, feature definitions, brand rules, and relevant existing implementation before choosing a composition. Separate established requirements from proposed features. Preserve explicit product rules and existing marks.

Identify the user's task, the objects they work with, and the decisions they make. Map the complete journey, including entry, editing, completion, cancellation, and recovery. Make required capabilities concrete before styling. A calendar product needs a usable calendar; a publishing product needs a usable publishing workflow.

Founder background explains motivations. It does not determine customer nationality, sample names, visual style, or marketing copy. Use geography only when it changes a user's decision. About pages describe the product unless a founder story is explicitly requested.

For redesigns, identify behavior and routes that must survive. Change only what the task authorizes. For an authorized rebuild, develop the new design without carrying over rejected layout decisions.

## Compose

Start with the product's content and actions. Decide where attention belongs and which relationships should be visible. Explore how the web can express those relationships. A metaphor can help, but must not replace the usable product.

There is no required container width, card treatment, header, or footer. Use the number of elements the task needs. A supplied design system is a real constraint; an unspecified SaaS is not a request for a component kit.

Navigation follows destinations and frequency of use. Choose its placement and form deliberately. Page requirements do not imply a logo-left header, central links, right-side CTA, hero stack, or repeated footer. Familiar controls can live within a distinctive composition.

Keep related elements aligned. Use proximity, scale, weight, and space to express meaningful groups. Each heading establishes a group that helps someone read or act. Remove headings that merely decorate an already obvious region.

Responsive changes follow where content stops fitting, rather than a preset device ladder. Keep complete content reachable when visual truncation is useful.

Use representative content with enough variation to expose layout problems. Long names, empty days, missing artwork, multiple records, and partially completed forms should remain usable. Preserve factual uncertainty. Do not invent testimonials, customer logos, statistics, or user locations.

## Keep layout stable

Treat unintended content shift as a bug. Loading, hover, focus, selection, count changes, and transient controls must preserve surrounding geometry and hit targets. Reserve space for changing labels, counts, media, and loading states. Put menus and popovers in overlays, outside layout flow.

Explicit layout changes, such as expanding a section, may reflow content. Keep the trigger, row controls, and content columns aligned. Animating an unintended shift does not make it acceptable.

The stage is done when every route and state in the journey has a place on screen, and the empty, single-digit, multi-digit, and delayed-content states of each region share one geometry. [ui-review](../ui-review/SKILL.md) measures that claim.
