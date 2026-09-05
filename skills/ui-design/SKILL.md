---
name: ui-design
description: Use when designing, building, reviewing, or refining product UI or marketing pages; choosing layout, color, typography, spacing, motion, or component structure; fixing generic or templated interfaces; or auditing UX, accessibility, or design consistency.
---

# UI Design

Expanded material lives in `references/`. Consult it when a rule needs more detail. This file governs conflicts with those references.

**The bar**: if another AI, given a similar prompt, would produce substantially the same output, you have failed. Not different for its own sake — different because the interface emerged from *this* user, *this* task, *this* world.

## 1. Read the brief, fork by surface

- **Product UI** (dashboard, admin, tool, settings, data): hierarchy, tokens, states, and system consistency dominate → lean on §5–§9.
- **Marketing surface** (landing, portfolio, redesign): first impression and anti-slop dominate → §5–§9 still apply, plus the hard rules in §11.
- State a one-line **design read** before generating: "Reading this as: <surface> for <audience>, with a <vibe> language, leaning toward <system/aesthetic>." If the read genuinely diverges, ask exactly **one** clarifying question; otherwise declare and proceed.
- Quiet constraints (public-sector, regulated, accessibility-first, kids) override aesthetic preference.
- **Redesigns**: audit before touching — extract brand tokens, IA, conversion paths, patterns to preserve vs retire, SEO baseline (the #1 redesign risk). Never silently change slugs, nav labels, form field names, logos, or legal copy. Modernisation levers in order of lift-per-risk: typography → spacing → color recalibration → motion → hero recomposition → full block replacement.

## 2. Intent first

Answer before touching code — and check every later choice against it:

- **Who is this human?** The actual person, not "users". Where are they, what did they do 5 minutes ago?
- **What must they accomplish?** The verb. It determines what leads, what follows, what hides.
- **What should this feel like?** In words that mean something — "clean and modern" means nothing. Warm like a notebook? Cold like a terminal? Dense like a trading floor?

Intent must be **systemic**: "warm" means every token is warm; "dense" means spacing, type, and IA are all dense. For every choice you must be able to say *why* — "it's common" means you defaulted.

## 3. Explore the domain

Defaults get caught here or not at all. Produce all four before proposing a direction:

- **Domain** — 5+ concepts, metaphors, vocabulary from this product's world. Territory, not features.
- **Color world** — 5+ colors that exist *naturally* in that world. If this product were a physical space, what would you see?
- **Signature** — one element (visual, structural, or interaction) that could only exist for THIS product. Can't name one? Keep exploring.
- **Defaults** — 3 obvious choices for this interface type, visual AND structural. You can't avoid patterns you haven't named.

Then plan the direction as a compact token system: 4–6 named `oklch()` primitive colors plus semantic role tokens; typefaces for 2+ roles (characterful display used with restraint, complementary body, utility face if needed); a layout concept via one-sentence prose + ASCII wireframe; the signature. Preserve an existing project's color notation unless the task is a color-system migration. Review the plan against the brief: any part you'd produce for *any* similar page gets revised before code.

Known AI-default looks to spend freedom away from: warm-cream + high-contrast serif + terracotta accent; near-black + single acid-green/vermilion accent; broadsheet hairlines + zero radius; AI-purple gradients on dark mesh; three equal feature cards; Inter + slate-900; beige/brass/espresso for anything "premium consumer". All legitimate when the brief asks; never as the unchosen default — and don't ship the same palette family twice in a row.

### Design for the web

Play with the medium. Start from what visitors can see, manipulate, and discover about this particular product. A header → hero → CTA → features → pricing stack is not a design brief. Required destinations must remain discoverable, but they do not dictate the page's composition.

Explore scroll timelines, interactive demonstrations, spatial composition, and ambitious WebGPU/WGSL shaders when they express the product's world. For example, let visitors complete a bundle and watch its price change, or reshape a musician's page themselves. These are possibilities, not a checklist of effects to add everywhere. Keep native scrolling, keyboard access, and useful mobile layouts. Give GPU experiences a usable fallback, stop rendering when hidden, and honor reduced motion.

An optional preflight can generate a page image with an available image-generation tool. Use it as a concrete visual reference. Recreate its feasible composition, typography, spacing, and imagery closely in responsive, semantic UI. Inspect it skeptically first: generated layouts can contain impossible controls, illegible text, and interactions that only work in a still image. Correct those problems; never ship the flattened image as the page. Use a model the runtime actually provides.

## 4. Variants only when the user asks for them

The default, greenfield and overhaul included, is one design iterated with the user. Fan out only when the user explicitly asks for variants, alternatives, or directions to compare: 2–4 agents in their own worktrees is a real cost in tokens and review time, and an unasked-for spread hands the user a comparison chore instead of a design. When they do ask:

1. Spawn 2–4 **clean-slate agents**: fresh context, no shared conversation, each in its own worktree so builds don't collide.
2. Every agent gets the same brief and **this SKILL.md in full, inlined verbatim in its prompt** (a fresh context has not loaded it, a path may go unread, and a summary loses the rules that make the variant defensible), plus one **seed phrase** the orchestrator invents per agent — a short evocative nudge ("cast iron", "morning frost", "ledger paper"). Never a leading aesthetic ("brutalist"), a reference product ("like Linear"), or a design system: the seed differentiates exploration without prescribing its outcome.
3. Each agent runs §1–§3 and builds its variant independently; present the variants side by side without ranking.
4. The user picks a winner or iterates one to satisfaction — then freeze it into `DESIGN.md` (§13) before further feature work.

## 5. Use a real design system when the brief names one

Microsoft-ish → Fluent; Material-flavored → `@material/web`; IBM/enterprise analytics → Carbon; Shopify admin → Polaris; Atlassian → Atlaskit; GitHub-style → Primer; UK/US public sector → govuk-frontend/USWDS; modern SaaS you own → shadcn/ui (never default state); Tailwind indie default → Tailwind v4. Install the **official** package — don't recreate its CSS or import its tokens then override 90%. **One system per project.** Aesthetics (glassmorphism, bento, brutalism, editorial) are not systems — build them honestly with native CSS and label approximations (there is no official `liquid-glass.css`).

## 6. Hierarchy & composition

The single biggest "designed vs generated" driver. Defaults produce flatness; craft produces hierarchy.

- **Hierarchy comes from layout, not chrome**: build it with margins, padding, and placement before reaching for borders, colors, or cards. If you deleted every border and background and the structure still read, the hierarchy is real.
- **One focal point per view.** Name it before building, then make it win — size, contrast, or surrounding space. Demote everything else deliberately.
- **Type scale is a ratio**: ~1.2 dense/calm, ~1.25 most product UI, ~1.333 expressive, stepped from a 14–16px body and rounded to whole px.
- **Weight and color beat size**: one 14px size holds three tiers via `600/primary · 500/secondary · 400/muted`. Build hierarchy from all three levers, never size alone. Squint: if headline/body/label blur together, too weak.
- **Density is a decision in px** — Linear-tight (12–16px padding) vs Stripe-airy (24px) — pick deliberately, repeat the number everywhere.
- **Breathe unevenly**: tight within groups, real air between groups. Same card size + same gap + same density everywhere is the sound of no one deciding.
- **Proportions speak**: a 280px sidebar says "navigation serves content"; 360px says "peers". If you can't articulate what a proportion says, it says nothing.
- **Mobile first; creativity scales with viewport**: design the smallest screen first, where space buys information density — asymmetry, big whitespace, and artistic moves are luxuries the layout earns as the viewport grows. On a phone, the content *is* the design.
- **Breakpoints come from the content, not the device catalog**: break where the layout actually stops fitting — the sidebar squeezing content below its minimum measure, the card grid dropping under a usable column width — and collapse late, because an expanded structure that still fits is worth keeping. Components adapt to their container, not the viewport: reach for container queries first. A preset ladder (`768`/`1024`) is a starting guess to verify, never the reason for the break.
- **Text contrast is perceptual**: measure every rendered text/background pair in every theme and interactive state. WCAG AA is the floor; use APCA as the legibility check (`|Lc| ≥ 75` body text, `≥ 60` non-body text). When correcting contrast, adjust OKLCH lightness first; preserve chroma and hue where practical.
- **~60/30/10**: dominant neutral, secondary tone, ~10% accent. One accent used with intention beats five without. Gray builds structure; color communicates.
- **Optical sizing**: negative tracking on large headings, ~1.5 line-height on body.

## 7. Layering, tokens, spacing

- **Surface elevation**: numbered scale, whisper-quiet steps (dark base → +7% → +9% → +12%; light stays light and adds shadow). Sidebars share the canvas background (border, not new color); popovers one level above parent; inputs slightly *darker* than surroundings (inset receives content).
- **Borders**: low-opacity rgba, not solid hex — dark mode ~`rgba(255,255,255,0.06–0.12)`, light slightly higher. Findable when needed, invisible otherwise.
- **The squint test**: blurred, hierarchy still reads and nothing jumps. Get this wrong and nothing else matters.
- **Tokens**: every color traces to primitives (foreground/background/border/brand/semantic). Token names should evoke the product's world — read them aloud; `--ink`/`--parchment` vs `--gray-700`. Four text levels: primary/secondary/tertiary/muted.
- **Spacing**: one base unit (4/8px), multiples only, scaled by context (micro/component/section/major). Symmetrical padding unless content demands otherwise.
- **Direction is an attribute, not a constant**: express inline geometry logically (`padding-inline-start`, `margin-inline-end`, `inset-inline-start`, `text-align: start`) so `dir="rtl"` mirrors the layout for free; reserve physical left/right for genuinely physical things (a device notch, a gesture direction). Anything that encodes progression mirrors too — stars, step indicators, and progress bars fill from the trailing side. Flip icons whose meaning depends on reading direction (back/forward chevrons, text-alignment and indent glyphs, send arrows) and leave the rest alone: logos, checkmarks, clocks, media playback. Digits never reverse.
- **Depth: choose ONE strategy** (borders-only / subtle shadows / layered shadows / surface shifts) and commit. Radius is a scale (small inputs → medium cards → large modals), locked page-wide.
- **Prefer separators over cards**: self-contain sections by giving them the full viewport while content stays in the centered `div.container`; separate with whitespace, layout rhythm, or a single rule rather than boxing everything. A card earns its border/shadow only when elevation communicates real hierarchy — a lean, not a ban; use what the design system does best.
- **Shape language fits the product**: some products want dead-straight edges, others soft radii, others SVG clip-paths or slanted section separators. Choose the angle/shape vocabulary as deliberately as the palette, then lock it like everything else.
- **Themes are named and tokenized from day one**: components bind only to semantic tokens; a theme is just a value-set for those tokens (`[data-theme="..."]` swapping CSS variables). Ship light + dark by default with an auto entrypoint via `prefers-color-scheme`. Design so a third theme — a catppuccin, a high-contrast — is a new value-set, never a refactor. This rules out per-element `dark:` utility pairs as the theming mechanism: they hardcode exactly two themes.
- **Dark mode**: same hierarchy inverted, borders over shadows, slightly desaturated semantics, one hue shifting only lightness. No pure `#000`/`#fff`. Design both modes from the start (testing both is a §12 gate).
- **Increased contrast is a real appearance**: `prefers-contrast: more` gets its own token value-set that widens every foreground/background lightness gap by at least `0.15` L over the default, then remeasure — the increased-contrast variant should clear the *preferred* APCA bar (`|Lc| ≥ 90` body, `≥ 75` non-body), not just the floor.
- **Every design works in black & white**: hierarchy must survive grayscale — meaning that depends on hue alone (status by color, links by color) is broken. High-contrast / `forced-colors` mode strips your palette; design so structure, weight, and spacing carry the interface without it.

## 8. Use what exists

The most common way AI degrades a codebase: hand-rolling what's already there.

- **Discover the codebase first**: the design system may live in `src/lib/components`, in a separate `ui` package in a monorepo, or in a vendor kit — find it before styling anything. Default stack here: **shadcn-svelte**.
- **Controls**: native HTML first (`<button>`, `<dialog>`, `<details>`) → battle-tested headless primitive styled to your direction (bits-ui / melt-ui — what shadcn-svelte composes; Radix / React Aria in React codebases) → hand-roll only as last resort, owing the full contract (keyboard nav, focus trap/return, ARIA, click-outside, scroll-lock).
- **Styling**: project design system first → extract a component on second real reuse → semantic tokens, not literals (`bg-card text-muted-foreground`, never `bg-white text-gray-500`) → inline utilities only for genuine one-offs. The same long className sprayed everywhere is a missing component.
- Check `package.json` before importing anything; output the install command if missing.
- Icons: one family per project, installed as a real dependency, standardized strokeWidth; never hand-roll SVG icon paths. Icons only where they add information — not every button needs one. Never emoji in UI.

## 9. Polish & motion

Static polish:

- **States are not optional**: every interactive element gets default/hover/active/focus/disabled; data gets loading/empty/error — composed empty states, inline errors.
- **Interactive things look interactive; static things don't**: a control earns a background, a border, or a consistent control zone, and is never styled identically to the static text beside it. The inverse holds too — a badge shaped like the buttons around it collects dead clicks.
- **Skeletons are the actual layout, minus the data**: render the real component tree with data absent (e.g. before `PageData` resolves) and shimmer the empty slots. A maintained lookalike drifts; a sorta-close skeleton is worse than a plain spinner — it promises a layout, then breaks it on swap.
- **Data never dictates layout**: the layout owns its dimensions up front and data fills the reserved space. Content shift from lazy-loaded data is forbidden except in areas *designed* to grow — paginated/infinite-scroll lists and tables extend downward by design; a metric card or header never moves.
- Concentric radius (`outer = inner + padding`); `tabular-nums` on all dynamic numbers; optical alignment over geometric.
- Hit areas 44×44px — extend with pseudo-elements when the visible control is smaller.
- Layered transparent shadows for lift: light mode 1px ring + two soft depths; dark mode a single ring (depth shadows don't read on dark).
- Images get a `1px` inset outline at `0.1` alpha — pure black in light mode, pure white in dark, with `outline-offset: -1px` so the ring hugs the corner radius. Never a tinted near-black or near-white from the palette (`slate-900`, `zinc-900`, `#f5f5f7`): a tinted outline picks up the surface beneath it and reads as dirt on the image edge.
- `text-wrap: balance` on headings, `pretty` on body; antialiased font smoothing.
- **Truncation hides content**: `text-overflow: ellipsis` and `line-clamp` are fine, but the full value stays reachable — tooltip, expanded row, or detail view. A clamp is never the only copy of something the user needs to read.
- Mobile inputs render at `16px` (`text-base sm:text-sm`); below that, iOS Safari zooms the whole page on focus. Never fix it with `maximum-scale=1` — Safari ignores the cap for pinch zoom while every other browser honors it and blocks zooming, which fails WCAG.

Motion serves the experience:

- High-frequency actions (100+×/day): **no** animation. Occasional surfaces: standard. Rare moments: delight.
- When implementing animations or transitions, read and use [$transitions-dev](../transitions-dev/SKILL.md). It owns transition recipes and motion tokens; do not duplicate them here.
- Prefer `transform`/`opacity` for ordinary UI motion. Name animated properties explicitly; never use `transition: all`. Measure layout, paint, and GPU costs for more ambitious effects.
- Scroll sequences and shader scenes can be watched and explored. Their pacing follows the experience, rather than a dropdown's duration.
- **Every animation must be justifiable in one sentence** — hierarchy, storytelling, feedback, or state transition; "it looked cool" is not an answer.
- Banned: `window.addEventListener("scroll")` and per-frame scroll/pointer math flowing through reactive state. We work in Svelte: prefer CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`); reach for IntersectionObserver only when the animation is too complex for CSS. Continuous pointer/scroll values drive `transform` directly or via `svelte/motion` springs — never `$state` per frame.
- `prefers-reduced-motion` is non-negotiable: movement collapses, opacity may stay.

## 10. Copy is design material

**Never add eyebrows, ever.** No decorative preheading labels, kickers, overlines, or section numbers above headings, regardless of case or styling. Start with the content or heading itself.

**Strict show, don't tell.** Add prose only when absolutely necessary. Anything a visual example can convey must be conveyed through a visual example. Prefer a working interaction or real components with sample data; use a screenshot when interaction adds nothing. Delete prose that repeats what visitors can already see. Keep necessary control labels, prices, terms, error recovery, and accessible text alternatives. Visual communication must remain understandable to people using assistive technology.

Write from the user's side of the screen: name what people control ("notifications", not "webhook config"). Active voice; a control says what happens ("Save changes", not "Submit") and keeps its name through the flow ("Publish" → "Published"). Consequential confirmations repeat the consequence so the dialog is answerable without reading the body: "Delete this project?" offers `Delete project` and `Cancel`, never `Yes`/`No`/`OK`. Links name their destination — "Read the billing docs", not "Click here" or a bare "Learn more" repeated down the page. Toggles are labelled for the ON state ("Send read receipts"), never the negative. One capitalization policy per element type (all buttons, all headings); sentence case is the safer default. Never assemble a sentence from fragments around a variable (`"You have " + n + " new messages"`) — word order and plural forms differ per language, so ship whole templated strings with real pluralization. Errors explain what went wrong and how to fix it — never apologize, never vague. Empty states invite action. One job per element. **Copy self-audit before shipping**: re-read every visible string; rewrite anything grammatically broken, referent-unclear, or LLM-cute ("performative-craftsman" labels, mock-poetic micro-meta). Plain beats clever. No fake-precise numbers unless real or labeled mock. Quotes ≤3 lines with real attribution.

## 11. Marketing-surface hard rules

The distilled bans (full rationale: `references/design-taste.md`). These are mechanical — check them, don't vibe them:

- **Opening**: make the product understandable through a visual example. A hero is optional. If used, keep its headline short and its primary interaction reachable; omit subtext unless §10 requires it. A text+gradient-blob hero is a placeholder.
- **Layout variety**: let the content determine the structure and section count. No three equal feature cards or repeated image/text zigzags. Bento grids have exactly as many cells as content needs. Split-header (big left headline + small floating right paragraph) is banned as default.
- **CTAs**: one label per intent page-wide; no wrapped button text at desktop (contrast is a §12 gate).
- **Images**: real assets (gen tool → seeded placeholder photography → labeled TODO slots). Div-built fake screenshots are the #1 tell. Real SVG logos in walls (Simple Icons/devicon), logos only — no category labels.
- **Copy tells**: zero em/en-dashes in shipped page copy; no "Quietly trusted by"; no locale/weather strips; no scroll cues; no decorative status dots; no photo-credit-as-decoration; no version footers on marketing pages.
- **Consistency locks**: one theme (no mid-page light/dark flips), one accent, one radius system, one copy register.
- **Long lists**: >5 items gets a real component (grouped chunks, card grid, tabs, marquee — max one marquee per page), never `divide-y` hairlines on every row.
- Names/data: no Jane Doe, no Acme, no `99.99%` — believable, locale-appropriate, messy. **Except fabricated social proof**: customers, reviews, or testimonials we don't actually have must be *blatantly* fictional — funny names and copy so unhinged no real human would write it, while staying relevant to the product. Plausible fake testimonials read as real endorsements; obvious jokes read as placeholders.

## 12. Ship checks

Before presenting, run:

- **Swap test** — swap your typeface/layout for the usual: would anything feel different? Where it wouldn't is where you defaulted.
- **Squint test** — hierarchy reads, nothing harsh.
- **Signature test** — point to five specific places the signature appears; "overall feel" doesn't count.
- **Token test** — do the variable names belong to this product's world?
- **Show, don't tell**: zero eyebrows; every remaining prose passage passes §10. Point to the visual examples and interactions that carry the explanation.
- **A11y is not optional**: semantic HTML first, ARIA where semantics don't cover, a complete keyboard path with visible focus, purposeful alt text, and WCAG AA contrast on every rendered text/background and focus-state pair in each theme. Run a grayscale/high-contrast pass. Ship nothing that fails these.
- **Verify visually** — render or screenshot at desktop + mobile widths, both color modes; fix overlap, blank states, unreadable text before presenting. A picture is worth 1000 tokens. Chanel rule: look in the mirror, remove one accessory.
- **Guidelines review**: for a compliance pass, fetch the living checklist and report findings as `file:line`:
  `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
- Core Web Vitals sanity: LCP <2.5s, INP <200ms, CLS <0.1.

## 13. Tools & memory

- **Design-system database**: the installed `ui-ux-pro-max` skill — searchable styles/palettes/font-pairings/UX rules across 22 stacks. `python <its-dir>/scripts/search.py "<product> <industry> <keywords>" --design-system` (+ `--variance/--motion/--density` 1–10 dials); `--domain ux|color|typography|chart|gsap` for deep-dives; `--stack <stack>` for stack rules. Never present a 0-result search as data.
- **Token extraction**: `npx extract-design-system <url>` reverse-engineers a public site into starter tokens (the installed `extract-design-system` skill has the flags).
- **DESIGN.md**: once a direction is settled (the design, or the chosen variant from §4, iterated to satisfaction), write `DESIGN.md` at the project root capturing the *complete* design system — every decision, not just the direction: typefaces per role, full palette as named tokens with values, icon library + strokeWidth, spacing/margin/padding tokens, density values, radius scale + shape language, depth strategy, motion durations and easings, and measured component patterns (`Button primary — 36px h · 12px 16px pad · 6px radius · 14px/500`). Everything a future agent would otherwise re-decide. When `DESIGN.md` exists: read it and honor it — decisions are made.
- Be invisible: don't narrate modes or checklists; surface the recommendation and the reasoning, keep the monologue private.
