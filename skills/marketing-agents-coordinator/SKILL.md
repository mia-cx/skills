---
name: marketing-agents-coordinator
description: Put a coordinator over worker agents, and design always-on agents that stay quiet until they matter.
disable-model-invocation: true
---

# Coordinator and always-on agents

Part of [marketing-agents](../marketing-agents/SKILL.md): its context and approval rules apply here.

Put one coordinator over the worker agents so the user hears from one place, once 2 or more agents produce work for them, and design agents that stay on without flooding them.

## One coordinator that never does the work

Twelve agents all reporting to the user is the same mistake as twelve direct reports. One long-lived coordinator talks to the user and routes work, and never executes tasks itself; each worker owns one job and reports back through it.
Build the split into the structure, because an agent told to delegate decides case by case whether work is "small" and often keeps it. Run the coordinator on a lighter model with no tools to do the work. Give workers isolated context, full tools and the strongest model, and no direct line to the user. In one team's synthetic test (5 runs each, indicative only), a neutral prompt delegated in 0 of 5 runs, and the structural split finished in a median 12.4 minutes against 20.4 for one agent told to use subagents, at more tokens.

## Chief-of-staff prompt

List every agent, report and inbox that produces work for the user in the reading list, and set the run time with them.

```
Role: you are my chief of staff. You never do the work yourself. You read what my other agents made and tell me what needs me.

When you run: every weekday at 7am, before I open anything else.

Read everything new since your last run:
- [each worker's output folder]
- [notes pages, draft folders, report sheets]
- the group channel, for anything an agent flagged

Send me one page in [Slack / email], in this order:
1. What needs my decision today. For each: 1 problem, 3 options, 1 recommendation
2. Drafts in my review pile, oldest first, with links
3. Anything off: a missing file, a number that moved more than [20]% since last week, an agent that skipped its run
4. Every client or member still waiting on a reply from me, and anyone untouched for [5] business days

Skip anything that's fine.

Every Friday, add one line per routine: runs, clean runs, how many times I had to fix it, and keep or kill. If I wouldn't notice it gone, say so.

Handoffs between agents: the job, a link to the file, what's decided, what's still open, who's next.

Rules:
- Stay under [250] words. Link to the work, never paste it in.
- If an agent skipped its run, that goes first.
- You can message the other agents to chase a missing piece.
- Ask me first before you contact a client or edit another agent's instructions.
```

## A first worker: the auditor

If the user sells audits, proposals or diagnostics, the first draft is a good worker job. The agent ties every finding to the client's own numbers, and the user spends review time tracing those numbers to the client's file.

```
Role: you are my auditor. You write the first version of every [audit / proposal / diagnostic] I sell.
Read first: every past audit in [folder], my framework doc [link], and this client's intake answers.
When you run: when I message you "start audit for [client]".
Done looks like: my report template, with every finding tied to one of the client's own numbers. Cover every area in my framework, then rank the fixes, so this client gets their own order and not my standard one.
Tag each finding high, medium or low confidence, and list anything you couldn't check.
Ask me first before you: share anything with the client, quote a price, or fill a gap with an assumption.
```

One practitioner's framework covers 8 areas: strategy, delivery, client management, team, quality, recruiting, operations, financials.

## Handoffs and silence

- Pass work between agents as a file plus the five-part handoff note in the prompt above. Chained summaries carry stale ideas, and by the third hop nobody has read the original, so each agent reads the source document.
- Give every scheduled agent the line "If nothing changed since your last run, send me nothing." A routine that pings with no news trains the user to mute it, and they miss the day it matters.

## Keep, kill, and drift

- Prune weekly with the Friday line, and propose killing any routine the user wouldn't miss.
- Watch for drift as well as crashes: long-running agents loop or wander off the goal while still "running". A scheduled watchdog agent judges each worker's progress, retries transient failures, and explains in plain language why something failed. In a small setup, the coordinator putting skipped runs first does this job.

## Always-on agents

An always-on agent watches sources and acts without being asked.

**Filter with rules, then the model.** Most incoming events need no action. Draft a filter table with the user that gives every source one mode: respond only to explicit requests, treat as candidate events, or ignore. Drop noise with cheap fixed rules (source, channel, allowlists), and send only ambiguous candidates to the model, under policies the user can edit in plain language. Route models the same way: a cheap path for easy requests, a reasoning model for hard ones (one checklist's unevidenced split: 95% cheap, 5% escalated).

**Work ahead.** Start likely work in the background so the user only reviews a finished draft, and discard what isn't needed. On a meeting invite, check conflicts, gather background and draft the reply for the user to send. On a reported issue, reproduce and fix it quietly, and speak once it is confirmed.

**Speak in the channel's format.** In chat, notify only when a decision or sign-off is needed, ask direct questions, and cap replies at 100 words (one team's internally verified rule). On GitHub, email and docs, write dense and structured: background, what changed, verification results. Keep reasoning and tool logs out of shared spaces.

**Treat the context window as a cache.** Load what the model is likely to need soon and leave a pointer to the rest:

1. The current object's ID and a summary.
2. Related objects' IDs and nearby content: the first 50 characters, surrounding messages, the message it replies to.
3. Long content cut at a small cap, with a pointer to where it continues.

Give every event, thread and task an ID with its related IDs, so the agent can follow links hop by hop to recover old context.

**Never block.** A long tool starts in the background and reports back as a new event; a blocking call leaves the agent deaf until it finishes. Replace `run()` with `start()`, which returns "Started" at once, and `stop()`. For runs that must survive a crash or a multi-day approval, one checklist suggests a durable workflow engine such as Temporal, which resumes from the exact step.

**Keep the brain in the cloud and the hands where they live.** Keep state in a database, run on stateless cloud compute, and reach the user's machines through a thin daemon, so a sleeping laptop doesn't stop the agent. See Anthropic's [Decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents) and DeepSeek's unofficial [prototype](https://github.com/deepseek-ai/dsh-superagent-prototype). A compromised cloud loop reaches every connected machine, so apply [marketing-agents-guardrails](../marketing-agents-guardrails/SKILL.md#treat-what-it-reads-as-data) to each connection.
