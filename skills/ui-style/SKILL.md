---
name: ui-style
description: Use when the user asks to choose or change typography, color, palette, shape, spacing, depth, icons, or design tokens; add or fix dark mode, themes, or contrast; extract a design system from a site; or write DESIGN.md. Stage 2 of ui-design.
---

# UI style

A recognisable visual identity grows from the product's work and its audience. This stage sets a bar, not a house style.

## Choose

Choose typography, color, density, shape, and depth together with the composition from [ui-layout](../ui-layout/SKILL.md). Record the reasoning briefly in `DESIGN.md`, then keep it consistent with the implemented result. Mark proposed choices as proposed.

There is no required palette size, typeface count, spacing ratio, or neutral-to-accent ratio. Choose type, spacing, shape, depth, and color from the design. Do not invent poetic token names or fixed scales to satisfy a checklist.

Use a consistent icon vocabulary where icons help. Controls need recognizable affordances. Static elements must not imply actions.

## Tokens and components

Tokenize repeated decisions and name tokens by their role. Extract components for coherent behavior or actual reuse.

Inspect installed components and dependencies within the authorized workspace. Reuse working behavior where appropriate. Follow an explicitly requested design system. Otherwise choose components from the product's needs; do not install a styled kit by default.

To reverse-engineer a public site's tokens into starter files, read [references/extract-design-system.md](references/extract-design-system.md).

## Color modes

Support the requested color modes. When unspecified, choose and document an appropriate appearance rather than adding an automatic theme switcher. Preserve explicit brand color pairings in every state. Resolve contrast through placement or treatment without violating those pairings.

The stage is done when `DESIGN.md` names every choice the implementation makes, every repeated value is a role-named token, and each supported theme renders every state with those tokens alone.
