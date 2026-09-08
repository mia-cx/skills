---
name: ui-review
description: Use when the user asks to review, audit, or QA a screen or page, check how it looks at desktop or phone width, verify a UI flow works end to end, or says the interface looks generic, off, or unprofessional. Stage 6 of ui-design.
---

# UI review

Code checks do not establish visual quality. Render it, look at it, and use it.

## Render and inspect

Render every delivered route and important state at desktop and phone widths. Inspect the images yourself. Fix awkward alignment, tiny controls, excessive whitespace, clipped content, accidental wrapping, and broken hierarchy before expanding or handing off.

Compare element bounds before and after each state change at supported widths. Include empty, single-digit, multi-digit, and delayed-content states. Any unintended movement fails; [ui-layout](../ui-layout/SKILL.md) states the rule.

Test each supported theme.

## Perform the journey

Perform the main journey with the UI. Confirm that saved changes appear where expected, cancellation preserves the correct data, and failures permit recovery. Verify reload when persistence matters. A screenshot alone does not prove an interaction works.

Run the checks in [ui-a11y](../ui-a11y/SKILL.md) on the rendered interface.

## Audit the content

Audit the content as rendered. Remove redundant prose and headings per [ui-copy](../ui-copy/SKILL.md). Check that the composition belongs to this product's task. If replacing the product name leaves an equally plausible page, revisit the structure.

When the user reports the UI "doesn't look professional" and the cause is not obvious, read [references/ui-ux-quick-reference.md](references/ui-ux-quick-reference.md) for web, or [references/ui-ux-pro-rules.md](references/ui-ux-pro-rules.md) for native and mobile app UI. For a compliance review against Vercel's Web Interface Guidelines, follow [references/web-design-guidelines.md](references/web-design-guidelines.md).

## Tooling and reporting

For browser tooling, use the applicable computer-use skill within the task's permissions. Do not start servers or delegate verification when prohibited. If rendering is unavailable, report visual verification blocked and distinguish implementation from a completed design.

Keep screenshots, interaction evidence, and implementation notes outside customer-facing UI. Record actual checks and limitations without claiming unmeasured performance or accessibility scores.

The stage is done when every delivered route has been rendered at both widths and inspected, the main journey has been performed end to end, and every defect found was fixed or listed as a known limitation.
