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

Use the split only for independent jobs, such as an audit, a call summary and a month-end report. Anthropic's lead-agent-plus-subagents system beat a single agent by 90.2% on its internal research eval, at about 15 times the tokens of a chat, and Anthropic names jobs where agents need the same context or depend on each other as a poor fit. Parallel agents make implicit decisions that clash (Walden Yan, *Don't build multi-agents*), so keep one piece of work inside one agent.

Build the split into the structure, because an agent told to delegate decides case by case whether work is "small" and often keeps it; Anthropic finds agents "not yet great at coordinating and delegating to other agents in real time". Give the coordinator no tools to do the work; DeepSeek's team runs theirs on a lighter model. Give workers isolated context, full tools and the strongest model, and no direct line to the user. In DeepSeek's synthetic test (5 runs per design, which they call indicative only), a single agent with a neutral prompt delegated in 0 of 5 runs and took a median 20.4 minutes per task; told to delegate first, it delegated in 4 of 5 and took 13.8 minutes median but up to 29.0; the structural split took 12.4 minutes median and at most 15.7, using 2–4 times the tokens.

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

- Pass work between agents as a file plus the five-part handoff note in the prompt above, and have each agent read the source document, not the last agent's summary. Anthropic's subagents store their work and pass back a reference, which "prevents information loss"; chained summaries drop detail at every hop. The "what's decided" line carries the implicit decisions Yan warns get lost.
- Give every scheduled agent the line "If nothing changed since your last run, send me nothing." A routine that pings with no news trains the user to ignore it, and they miss the day it matters: in a study of clinical alerts, the chance of acting on a reminder fell 30% with each extra reminder in the same visit (Ancker et al.).

## Keep, kill, and drift

- Prune weekly with the Friday line, and propose killing any routine the user wouldn't miss.
- Watch for drift as well as crashes: long-running agents loop or wander off the goal while still "running". DeepSeek's design adds a scheduled watchdog agent that judges each worker's progress, retries transient failures, and explains in plain language why something failed. In a small setup, the coordinator putting skipped runs first does this job.

## Always-on agents

An always-on agent watches sources and acts without being asked. The patterns below come from DeepSeek's super-agent design unless another source is named.

**Filter with rules, then the model.** Most incoming events need no action. Draft a filter table with the user that gives every source one mode: respond only to explicit requests, treat as candidate events, or ignore. Drop noise with cheap fixed rules (source, channel, allowlists), and send only ambiguous candidates to the model, under policies the user can edit in plain language.

**Route models once you can measure.** Build on the strongest model first, test it, then move the requests where a cheaper model's results hold to the cheaper path (OpenAI's agent guide). A cheap-then-expensive cascade can match the best single model at up to 98% less cost (Chen, Zaharia and Zou, *FrugalGPT*). The split depends on the job; measure it rather than assuming one.

**Work ahead.** Start likely work in the background so the user only reviews a finished draft, and discard what isn't needed. On a meeting invite, check conflicts, gather background and draft the reply for the user to send. On a reported issue, reproduce and fix it quietly, and speak once it is confirmed.

**Speak in the channel's format.** In chat, notify only when a decision or sign-off is needed, ask direct questions, and cap replies at 100 words (DeepSeek's rule, verified only internally). On GitHub, email and docs, write dense and structured: background, what changed, verification results. Keep reasoning and tool logs out of shared spaces.

**Treat the context window as a cache.** Models recall less as context fills (Anthropic) and miss what sits in the middle of long inputs (Liu et al.), so load what the model is likely to need soon and leave a pointer to the rest:

1. The current object's ID and a summary.
2. Related objects' IDs and nearby content: the first 50 characters, surrounding messages, the message it replies to.
3. Long content cut at a small cap, with a pointer to where it continues.

Give every event, thread and task an ID with its related IDs, so the agent can follow links hop by hop to recover old context.

**Never block.** A long tool starts in the background and reports back as a new event; a blocking call leaves the agent deaf until it finishes. Replace `run()` with `start()`, which returns "Started" at once, and `stop()`. For runs that must survive a crash or a multi-day approval, use a durable workflow engine such as Temporal, which hands a crashed run to another process that resumes where it stopped.

**Keep the brain in the cloud and the hands where they live.** Keep state in a database, run on stateless cloud compute, and reach the user's machines through a thin daemon, so a sleeping laptop doesn't stop the agent. See Anthropic's [Decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents) and DeepSeek's [research prototype](https://github.com/deepseek-ai/dsh-superagent-prototype), which it labels not an official product. A compromised cloud loop reaches every connected machine, so apply [marketing-agents-guardrails](../marketing-agents-guardrails/SKILL.md#treat-what-it-reads-as-data) to each connection.

## Sources

- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: Scaling Managed Agents, decoupling the brain from the hands](https://www.anthropic.com/research/managed-agents)
- [OpenAI: A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [Walden Yan, *Don't build multi-agents* (2025)](https://cognition.com/blog/dont-build-multi-agents)
- [Lingjiao Chen, Matei Zaharia, James Zou, *FrugalGPT* (2023)](https://arxiv.org/abs/2305.05176)
- [Nelson F. Liu et al., *Lost in the middle: how language models use long contexts* (2023)](https://arxiv.org/abs/2307.03172)
- [Jessica S. Ancker et al., *Effects of workload, work complexity, and repeated alerts on alert fatigue in a clinical decision support system* (2017)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)
- [Temporal docs: Understanding Temporal](https://docs.temporal.io/evaluate/understanding-temporal)
- [DeepSeek Harness, *Exploring super-agent design* (2026)](https://x.com/DeepSeekHarness/status/2116857257245987236)
- [DeepSeek: dsh-superagent research prototype](https://github.com/deepseek-ai/dsh-superagent-prototype)
- [Kyle Hunt, *How to build a $1M company with Grok Bot* (2026)](https://x.com/huntkyle/status/2118086670918750341)
