---
name: signal
description: Use when the user asks what to work on next or wants to prioritise, and when an agent picks or schedules the next tasks from a vision, roadmap, PRD, or wayfinder map.
---

# Signal

**Signal** is the 3–5 things that must get done in the next 18 waking hours to move the vision forward. Everything else is **noise**, however useful it looks. The framing is Kevin O'Leary's account of how Steve Jobs worked. Seeing the whole roadmap is easy; cutting it down to today is the hard part, and this skill does the cut.

## Find the vision

Read the sources in this order and stop at the first one that states where the effort is heading:

1. Whatever the user handed you: a product idea, roadmap, PRD, or wayfinder map.
2. `DIRECTION.md` at the repo root.
3. The repo's open issues.

A wayfinder map (label `wayfinder:map`) supplies three things: its Destination, its frontier tickets, and its Not yet specified fog. Read the map body and query the frontier. Open a ticket body only when ranking needs it.

When no source states a destination, ask the user for it in one question before picking, because ranking without a destination ranks by mood.

## Pick

1. **Name the destination** in one line. Done when a stranger could tell whether a given task moves toward it.
2. **Gather candidates** from every source: wayfinder frontier tickets, unblocked PRD sub-issues, roadmap items, and work already in flight (open PRs, running delegates, reviews waiting on the user). Fog is never a candidate; it clears by resolving the tickets in front of it. Done when every source has been read.
3. **Filter** to items that are unblocked now and finishable today. When an item is too big for today, its first finishable piece becomes the candidate, with its own done criterion.
4. **Rank** by leverage, highest first:
   1. **Bottlenecks**: work only the user can do (grilling, approvals, credentials, reviews, merges) that unblocks agent work. The user's attention is the constraint, so every hour an agent waits on them is lost.
   2. **Critical path**: work the destination cannot be reached without, in dependency order.
   3. **Fog clearing**: decisions whose answer graduates the most fog into tickets.
   4. **Reality contact**: work that puts the product in front of a real user, customer, or payment, because outside feedback reranks everything else.

   Polish, optimisation, and new ideas rank last unless a higher item depends on them.
5. **Cut to 3–5.** The cap counts the user's attention. A delegated item takes a slot only for the user's part of it: the brief, the review, the merge. Agent work fills freely beneath the cap. Done when the Signal list holds 3–5 items.
6. **Star the one**: the single item that makes the day a win if nothing else lands. Put it first.

## Output

```markdown
**Destination:** <one line>

## Signal

1. ⭐ <item>: <owner: user | agent (model)>. Done when <criterion>. <rank and what it unblocks>
2. <item>: ...

## Agents

- <AFK item>: <model>. Done when <criterion>.

## Noise

- <candidate left out>: <why not today>
```

Give each item a checkable done criterion and its size in concrete units ("one grilling session", "one PR", "3 files"), never in hours. Link issues and PRs as named markdown links.

The Noise list is a parking lot. Naming what was left out lets the user stop holding it in their head, and it is the first place the next pick looks.

A scheduling agent consumes this block as written: it places Signal items in order, starred first, and dispatches the Agents list in parallel.

## During the day

- **A new idea or request arrives:** add it to Noise in one line. When it outranks a Signal item, it replaces that item and the replaced one moves to Noise; the cap holds. The switch costs more than the idea is worth today.
- **An item finishes or blocks:** re-run Pick from step 2 to fill the slot. A resolved ticket may have graduated fog into new frontier tickets.
- **An agent finishes:** reviewing its output becomes a Signal item for the user.

## End of day

List each Signal item as done or not done. Carry or drop each unfinished one. An item carried a second time is mis-sized or was never signal: split it, or move it to Noise.
