---
name: ui-a11y
description: Use when the user asks to make an interface accessible, add keyboard navigation, fix focus handling, label controls for screen readers, meet contrast or touch-target rules, or support reduced motion, and when building any custom control. Stage 4 of ui-design.
---

# UI accessibility

Every control owns a full interaction contract. Accessibility is that contract made explicit, not a layer added at the end.

## Controls

Prefer native semantic controls. Use available headless behavior when it improves complex keyboard and focus handling. Custom controls own their full interaction contract, including keyboard access, focus return, dismissal, and accessible names.

Essential controls are semantic DOM elements, usable without any visual effect. A GPU scene, a scroll-driven composition, or a hover reveal decorates a control that already works without it.

## Perception

Meaning cannot depend on color alone. Keep readable contrast in every theme and state. Touch targets stay large enough to hit, and the page stays usable at browser zoom.

Reduced motion retains content and actions while removing unnecessary movement.

## Checks

Confirm each with the rendered interface, not the source:

- Every interactive element is reachable and operable by keyboard, in a sensible order.
- Focus is visible on every focusable element and returns to the trigger after dismissal.
- Every control has an accessible name that matches its visible label.
- Text and essential graphics meet contrast in each supported theme.
- The page works at 200% zoom and on a phone-width viewport.
- With reduced motion on, nothing needed is missing.

The stage is done when every check above passes on every delivered route, and each failure found was fixed rather than noted.
