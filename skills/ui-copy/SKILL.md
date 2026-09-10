---
name: ui-copy
description: Use when the user asks to write or fix text the interface shows, such as labels, button names, headings, error messages, empty states, confirmations, placeholders, tooltips, or marketing page copy. Stage 3 of ui-design.
---

# UI copy

Write only what is needed. Every string the interface shows is a design decision, and the response skills apply to it.

## Show, don't tell

Keep UI prose to controls, results, and requested copy. Add supplementary information, notices, warnings, caveats, or callouts only when the user explicitly asks; the user decides what warrants attention. For example, omit "16.6 d of data" beside a completion estimate unless requested.

Convey through a visual example what a visual example can convey. Prefer a working product interaction. Delete text that repeats what is already visible.

Never add eyebrows. No decorative preheading labels, kickers, overlines, or section numbers above headings.

Keep necessary labels, prices, terms, instructions, accessible alternatives, and error recovery. A missing label is not brevity. A sentence earns its place when removing it makes an action or decision harder.

Every displayed field must have a purpose in this product; incidental metadata is not decoration.

## Name actions

Write from the user's side of the screen: name what people control ("notifications", not "webhook config"). A control says what happens ("Save changes", not "Submit") and keeps its name through the workflow ("Publish" becomes "Published").

Confirmations name their consequence, so the dialog is answerable without reading its body: "Delete this project?" offers "Delete project" and "Cancel", never "Yes", "No", or "OK". Links name their destination ("Read the billing docs", not "Learn more"). Toggles are labelled for the ON state ("Send read receipts"). One capitalization policy per element type; sentence case is the default.

Error messages identify the problem and the recovery. Empty states offer the first action.

Ship whole templated strings with real pluralization. Word order and plural forms differ per language, so a sentence assembled from fragments around a variable breaks in translation.

## Keep it out of the UI

Implementation commentary, founder research, and design rationale live in `DESIGN.md` and the README, never in customer-facing UI.

The stage is done when every visible string has been re-read as rendered, and each one enables an action, names a result, or supplies explicitly requested copy.
