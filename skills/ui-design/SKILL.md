---
name: ui-design
description: Use when the user asks to design, build, review, or refine product UI or marketing pages; choose layout, color, typography, spacing, motion, or components; or fix generic interfaces and poor usability.
---

# UI design

Design the interface around the product's actual work. A recognisable visual identity grows from that work and its audience. This skill sets a process and quality bar, not a house style.

## Read the product

Read the supplied brief, feature definitions, brand rules, and relevant existing implementation before choosing a direction. Separate established requirements from proposed features. Preserve explicit product rules and existing marks.

Identify the user's task, the objects they work with, and the decisions they make. Map the complete journey, including entry, editing, completion, cancellation, and recovery. Make required capabilities concrete before styling. A calendar product needs a usable calendar; a publishing product needs a usable publishing workflow.

Founder background explains motivations. It does not determine customer nationality, sample names, visual style, or marketing copy. Use geography only when it changes a user's decision. About pages describe the product unless a founder story is explicitly requested.

For redesigns, identify behavior and routes that must survive. Change only what the task authorizes. For an authorized rebuild, develop the new design without carrying over rejected layout decisions.

## Choose a direction

Choose composition, typography, color, density, shape, and navigation together. Record the reasoning briefly in `DESIGN.md`, then keep it consistent with the implemented result. Mark proposed choices as proposed.

Start with the product's content and actions. Decide where attention belongs and which relationships should be visible. Explore how the web can express those relationships. A metaphor can help, but must not replace the usable product.

There is no required palette size, typeface count, spacing ratio, neutral-to-accent ratio, container width, card treatment, header, or footer. Use the number of elements the task needs. A supplied design system is a real constraint; an unspecified SaaS is not a request for a component kit.

Navigation follows destinations and frequency of use. Choose its placement and form deliberately. Page requirements do not imply a logo-left header, central links, right-side CTA, hero stack, or repeated footer. Familiar controls can live within a distinctive composition.

Keep related elements aligned. Use proximity, scale, weight, and space to express meaningful groups. Each heading establishes a group that helps someone read or act. Remove headings that merely decorate an already obvious region.

Create variants only when requested. Give parallel builders fresh context, explicit file ownership, the same applicable requirements, and this skill in full. Do not expose sibling outputs or assign aesthetic seeds unless requested.

## Build the product first

Implement the core workflow before building its marketing demonstration. Use the real components and state for embedded product examples. A visitor should be able to perform the action they are shown.

Frontend-only means local data and simulated services. It does not mean decorative controls, generic dashboard fragments, or an incomplete editor. Complete visible interactions, including validation, cancellation, confirmation, and coherent state across routes.

Keep demo reset and failure injection outside ordinary customer controls. Disclose simulations where users might mistake an action for an external transaction. Put detailed implementation limitations in the human README.

Use representative content with enough variation to expose layout problems. Long names, empty days, missing artwork, multiple records, and partially completed forms should remain usable. Preserve factual uncertainty. Do not invent testimonials, customer logos, statistics, or user locations.

Build one meaningful screen, render it, and inspect it before extending its patterns. This is an internal iteration step. It does not add an approval pause to an already authorized implementation.

## Play with the medium

Use capabilities that a static brochure cannot offer. In an expressive web or marketing assignment, implement a substantial product-relevant experience through scroll-driven composition, spatial interaction, animation, procedural imagery, or WebGPU/WGSL. Hover effects, a theme toggle, and a shimmer alone do not meet this requirement.

Choose the technique because it communicates something specific. Let the product remain operable while people explore it. Operational interfaces can be direct and efficient while their marketing experience is more expressive. Do not force a GPU scene into a form that gains nothing from it.

Read and use [$transitions-dev](../transitions-dev/SKILL.md) when implementing motion. It owns transition recipes and motion tokens; do not inline them here.

Keep native scrolling and user control. Prefer CSS scroll timelines for scroll-driven animation. Avoid routing continuous scroll or pointer updates through application reactive state. Animate named properties; do not use `transition: all`. Measure ambitious effects for layout, paint, and GPU cost.

GPU work needs a usable fallback. Stop rendering when hidden. Reduced motion retains content and actions while removing unnecessary movement. Essential controls must remain semantic DOM elements, usable without the visual effect.

An optional preflight can generate a page image through an available image-generation tool. Treat it as a concrete composition reference. Inspect it for impossible interactions, unreadable text, and layouts that cannot adapt. Recreate the feasible design as responsive UI. Never ship a flattened image in place of the interface. Use only models actually available in the runtime.

## Write only what is needed

Never add eyebrows, ever. No decorative preheading labels, kickers, overlines, or section numbers above headings.

Operate a strict show, don't tell rule. Add prose only when absolutely necessary. Convey through a visual example what a visual example can convey. Prefer a working product interaction. Delete text that repeats what is already visible.

Keep necessary labels, prices, terms, instructions, accessible alternatives, and error recovery. A missing label is not brevity. A sentence earns its place when removing it makes an action or decision harder.

Name actions concretely. Keep names consistent through the workflow. Error messages identify the problem and recovery. Confirmations name their consequence. Every displayed field must have a purpose in this product; incidental metadata is not decoration.

Use the response skills for page copy too. Keep implementation commentary, founder research, and design rationale out of customer-facing UI.

## Components and visual system

Inspect installed components and dependencies within the authorized workspace. Reuse working behavior where appropriate. Follow an explicitly requested design system. Otherwise choose components from the product's needs; do not install a styled kit by default.

Prefer native semantic controls. Use available headless behavior when it improves complex keyboard and focus handling. Custom controls own their full interaction contract, including keyboard access, focus return, dismissal, and accessible names.

Use a consistent icon vocabulary where icons help. Controls need recognizable affordances. Static elements must not imply actions. Keep complete content reachable when visual truncation is useful.

Tokenize repeated decisions and name tokens by their role. Choose type, spacing, shape, depth, and color from the design. Do not invent poetic token names or fixed scales to satisfy a checklist. Extract components for coherent behavior or actual reuse.

Support the requested color modes. When unspecified, choose and document an appropriate appearance rather than adding an automatic theme switcher. Preserve explicit brand color pairings in every state. Resolve contrast through placement or treatment without violating those pairings.

## Verify the rendered experience

Code checks do not establish visual quality. Render every delivered route and important state at desktop and phone widths. Inspect the images yourself. Fix awkward alignment, tiny controls, excessive whitespace, clipped content, accidental wrapping, and broken hierarchy before expanding or handing off.

Perform the main journey with the UI. Confirm that saved changes appear where expected, cancellation preserves the correct data, and failures permit recovery. Verify reload when persistence matters. A screenshot alone does not prove an interaction works.

Check keyboard navigation, visible focus, semantic labels, readable contrast, zoom, touch targets, and reduced motion. Meaning cannot depend on color alone. Test each supported theme. Responsive changes follow where content stops fitting, rather than a preset device ladder.

Audit the content as rendered. Remove redundant prose and headings. Check that the composition belongs to this product's task. If replacing the product name leaves an equally plausible page, revisit the structure.

For browser tooling, use the applicable computer-use skill within the task's permissions. Do not start servers or delegate verification when prohibited. If rendering is unavailable, report visual verification blocked and distinguish implementation from a completed design.

Keep screenshots, interaction evidence, and implementation notes outside customer-facing UI. Record actual checks and limitations without claiming unmeasured performance or accessibility scores.
