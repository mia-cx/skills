---
name: signal
description: Use when the user plans their day or tomorrow, asks what to work on next, wants to prioritise, or asks to be caught up on a project, and when an agent picks or schedules the next tasks from a vision, roadmap, PRD, or wayfinder map.
---

# Signal

**Signal** is the 3–5 things that must get done in the next 18 waking hours to move the vision forward. Everything else is **noise**, however useful it looks. The framing is Kevin O'Leary's account of how Steve Jobs worked. Seeing the whole roadmap is easy; cutting it down to one day is the hard part, and this skill does the cut.

This is the user's daily planning ritual, run each morning for today or each night for tomorrow. Either way, the 18 hours are the next waking day.

## Two kinds of work

Classify every task as one of two kinds:

- **HITL** (human in the loop): only the user can do it: grilling, decisions, approvals, credentials, sign-ups, reviews, merges. HITL work is scarce, because it runs on the user's attention, one task at a time.
- **AFK** (away from keyboard): an agent finishes it alone. AFK work runs in the background, in parallel, at any hour, faster and at higher volume than HITL work.

That asymmetry drives the whole pick: the user's day is best spent on the HITL tasks that set the most AFK work in motion.

## Write it the user's way

When the user has skills that define how an agent writes to them, such as `talk-normal` and the response skills it loads, read them before writing and apply every one to the whole output: the Rebrief, the Signal list, and the spoken script. Those skills already record how this user reads fastest and gets to work soonest, which is this skill's purpose.

## Find the vision

Read the sources in this order and stop at the first one that states where the effort is heading:

1. Whatever the user handed you: a product idea, roadmap, PRD, or wayfinder map.
2. `DIRECTION.md` at the repo root.
3. The repo's open issues.

A wayfinder map (label `wayfinder:map`) supplies three things: its Destination, its frontier tickets, and its Not yet specified fog. Its research tickets are AFK, its grilling and prototype tickets are HITL, and its task tickets carry either. Read the map body and query the frontier. Open a ticket body only when ranking needs it.

When no source states a destination, ask the user for it in one question before picking, because ranking without a destination ranks by mood.

## Rebrief

A **Rebrief** restores the context the pick assumes, so the user can pick a project back up where it was left. Include it when the user asks ("catch me up", "rebrief me") or when the project's newest commit, issue, and PR activity is more than a month old.

Scale its depth to the time away, measured from that newest activity:

- **Under a week**: one short paragraph: what moved and what waits on the user.
- **Up to a month**: one paragraph per heading below.
- **Over a month**: every heading in full, opening with the destination and the decisions that shaped the route so far.

The headings:

- **Where it stopped**: the last things merged, decided, and asked for.
- **In flight**: every open PR, branch, and worktree, with its state (green, approved, conflicting, stale) and what it needs next.
- **Waiting on the user**: unanswered questions agents or contributors asked them in issues and PRs.
- **Moved underneath**: what changed while the project sat: base branch commits, releases, dependency or CI breakage.

Write summaries of the material, never pointers to it. For each PR, issue, or decision, say what it changes or decided and why it exists, in plain sentences, so the user understands it without opening it. The link rides inside its name.

Stale in-flight work becomes candidates: rebases and CI reruns are AFK; merges and unanswered questions are HITL. After a Rebrief, open the Signal list with one small warm-up item ahead of the starred one, such as a merge or a reply, so the first action is a quick win.

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

<only when included; depth per Rebrief>

## Signal (HITL)

1. ⭐ **<action>**
   <brief>
   Done when <criterion>. Releases: <AFK tasks, or none>.
2. **<action>** ...

## Agents (AFK)

- <link>: <model>. Done when <criterion>. <now | after Signal item N>

## Noise

- <candidate left out>: <why not today>
```

A Signal item is a self-contained brief, because the user acts on it without opening anything. In 2–4 sentences it says what the thing is (what the PR changes, what the ticket asks), why it exists, and why it is on today's list: its rank, what it unblocks, and why now. Size it in concrete units ("one grilling session", "one PR", "3 files"), never in hours.

An Agents item is a pointer: a link, a model, and a done criterion. Agents read the links themselves, so spend no words explaining them.

The Noise list is a parking lot. Naming what was left out lets the user stop holding it in their head, and it is the first place the next pick looks.

A scheduling agent consumes this block as written: it places Signal items in the user's day in order, starred first, dispatches every AFK item marked `now`, and dispatches the rest as their Signal items close.

## Listen

When the user asks to listen, voice the Rebrief and Signal list with ElevenLabs:

1. Write a spoken script to `~/.cache/signal/<project>-<date>.txt`: the Rebrief and Signal sections as plain spoken prose, every PR and issue called by its name, with no URLs, numbers-as-names, markdown, or Agents and Noise lists. Separate topics with blank lines. Keep it matter-of-fact, the way a colleague reads out a task list: plain statements, no dramatic framing, emphasis words, exclamations, or audio tags.
2. Run `~/.agents/skills/signal/speak.sh <script>.txt <script>.mp3`. It reads `ELEVENLABS_API_KEY` from the environment or `~/.config/elevenlabs/env`, and `ELEVENLABS_VOICE_ID` when set.
3. Embed the mp3 by its absolute path in the reply.

## During the day

- **A new idea or request arrives:** add it to Noise in one line. When it outranks a Signal item, it replaces that item and the replaced one moves to Noise; the cap holds. The switch costs more than the idea is worth today.
- **A Signal item finishes:** dispatch the AFK tasks it released, then re-run Pick from step 3 to fill the slot.
- **A Signal item blocks:** move it to Noise with its blocker, then re-run Pick from step 3.
- **An agent finishes:** reviewing its output becomes a HITL candidate; it outranks new work when the review releases further AFK tasks.
