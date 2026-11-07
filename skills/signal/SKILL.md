---
name: signal
description: Use when the user plans their day or tomorrow, asks what to work on next, wants to prioritise, or returns to a shelved project, and when an agent picks or schedules the next tasks from a vision, roadmap, PRD, or wayfinder map.
---

# Signal

**Signal** is the 3–5 things that must get done in the next 18 waking hours to move the vision forward. Everything else is **noise**, however useful it looks. The framing is Kevin O'Leary's account of how Steve Jobs worked. Seeing the whole roadmap is easy; cutting it down to one day is the hard part, and this skill does the cut.

This is the user's daily planning ritual, run each morning for today or each night for tomorrow. Either way, the 18 hours are the next waking day.

## Two kinds of work

Classify every task as one of two kinds:

- **HITL** (human in the loop): only the user can do it: grilling, decisions, approvals, credentials, sign-ups, reviews, merges. HITL work is scarce, because it runs on the user's attention, one task at a time.
- **AFK** (away from keyboard): an agent finishes it alone. AFK work runs in the background, in parallel, at any hour, faster and at higher volume than HITL work.

That asymmetry drives the whole pick: the user's day is best spent on the HITL tasks that set the most AFK work in motion.

## Find the vision

Read the sources in this order and stop at the first one that states where the effort is heading:

1. Whatever the user handed you: a product idea, roadmap, PRD, or wayfinder map.
2. `DIRECTION.md` at the repo root.
3. The repo's open issues.

A wayfinder map (label `wayfinder:map`) supplies three things: its Destination, its frontier tickets, and its Not yet specified fog. Its research tickets are AFK, its grilling and prototype tickets are HITL, and its task tickets carry either. Read the map body and query the frontier. Open a ticket body only when ranking needs it.

When no source states a destination, ask the user for it in one question before picking, because ranking without a destination ranks by mood.

## Re-entry

A project is **shelved** when the user says they are getting back into it, or when its newest commit, issue, and PR activity is more than a week old. A shelved project gets a **Rebrief** before the pick, because the user has lost the context the pick assumes. The Rebrief restores that context from the tracker and git, never from the user's memory:

- **Where it stopped**: the last merge, the last closed decision, and the last thing the user said they wanted, each in one line with its link.
- **In flight**: every open PR, branch, and worktree with its state (green, approved, conflicting, stale) and what it needs next.
- **Waiting on the user**: questions agents or contributors asked them in issues and PRs that are still unanswered, quoted short.
- **Moved underneath**: what changed while the project sat: base branch commits, releases, dependency or CI breakage.

Stale in-flight work becomes candidates: rebases and CI reruns are AFK; merges and unanswered questions are HITL. On re-entry, open the Signal list with one small warm-up item ahead of the starred one, such as a merge or a reply, so the first action is a quick win.

## Pick

1. **Close out the last day** when its Signal list is available. Mark each item done or not done, then carry or drop each unfinished one. An item carried a second time is mis-sized or was never signal: split it, or move it to Noise.
2. **Name the destination** in one line. Done when a stranger could tell whether a given task moves toward it.
3. **Gather candidates** from every source: wayfinder frontier tickets, unblocked PRD sub-issues, roadmap items, last day's carried items and Noise, and work in flight (open PRs, running delegates, agent output waiting for review). Fog is never a candidate; it clears by resolving the tickets in front of it. Done when every source has been read.
4. **Classify and size.** Mark each candidate HITL or AFK, and keep the ones finishable within the day. When an item is too big, its first finishable piece becomes the candidate, with its own done criterion. A task that mixes both kinds splits into its HITL part and its AFK part. Done when every candidate carries one kind.
5. **Rank the HITL candidates** by leverage, highest first:
   1. **Unblocks AFK work**: count the AFK tasks each HITL task would release, directly or by clearing fog into new AFK tickets. Most released ranks first.
   2. **Critical path**: work the destination cannot be reached without, in dependency order.
   3. **Fog clearing**: decisions whose answer graduates the most fog into tickets.
   4. **Reality contact**: work that puts the product in front of a real user, customer, or payment, because outside feedback reranks everything else.

   Polish, optimisation, and new ideas rank last unless a higher item depends on them.
6. **Cut HITL to 3–5.** Reviewing agent output and briefing an agent count as HITL. Done when the Signal list holds 3–5 items.
7. **Star the one**: the HITL item that makes the day a win if nothing else lands. Put it first.
8. **Queue every unblocked AFK task**, in critical-path order. AFK work has no cap; it is limited only by what is unblocked. Mark the AFK tasks each Signal item releases, so they dispatch the moment it closes.

## Output

```markdown
**Destination:** <one line>

## Rebrief

<re-entry only: the four Re-entry headings, one to three lines each>

## Signal (HITL)

1. ⭐ <item>. Done when <criterion>. Releases: <AFK tasks, or none>
2. <item>. ...

## Agents (AFK)

- <item>: <model>. Done when <criterion>. <now | after Signal item N>

## Noise

- <candidate left out>: <why not today>
```

Give each item a checkable done criterion and its size in concrete units ("one grilling session", "one PR", "3 files"), never in hours. Link issues and PRs as named markdown links.

The Noise list is a parking lot. Naming what was left out lets the user stop holding it in their head, and it is the first place the next pick looks.

A scheduling agent consumes this block as written: it places Signal items in the user's day in order, starred first, dispatches every AFK item marked `now`, and dispatches the rest as their Signal items close.

## During the day

- **A new idea or request arrives:** add it to Noise in one line. When it outranks a Signal item, it replaces that item and the replaced one moves to Noise; the cap holds. The switch costs more than the idea is worth today.
- **A Signal item finishes:** dispatch the AFK tasks it released, then re-run Pick from step 3 to fill the slot.
- **A Signal item blocks:** move it to Noise with its blocker, then re-run Pick from step 3.
- **An agent finishes:** reviewing its output becomes a HITL candidate; it outranks new work when the review releases further AFK tasks.
