---
name: marketing-agents
description: Use when the user asks to automate marketing with agents: automate our weekly report, give a bot our playbook, stop a bot sending or overspending, check a bot's work, put a coordinator over bots, build a research bot, design an always-on agent, or run this campaign with agents.
---

# Marketing agents

Turn marketing work the user already does by hand into agents that run in the user's own stack and hand drafts back for approval. Judge each agent by hours saved and clean runs, not by volume.

## Start from one manual task

Automate one job the user already does by hand, because known steps give the agent its brief and give the user a baseline to judge it against. Add the next agent only once the last one runs clean.

Build in the stack the user already has: their agent tool, scheduler, data sources, and the chat or inbox where they read reports. Ask what they have before proposing anything new. Tools named in the branch skills are practitioners' examples; swap in what the user can reach. Use a plain script where the steps never vary, and an agent where it has to work out the steps toward a goal.

## Context before prompts

An agent returns the most generic answer until it reads the user's own material, so gather it before writing any prompt:

- a process doc: the job step by step, with each decision the user makes ("skip it if the price didn't change")
- 3 finished examples the user was happy with
- a style guide with a banned-words list

Keep them in one folder the agent reads before every run. When output is wrong, fix those files rather than the draft, because most bad output traces to missing input. Build the folder with [marketing-agents-context](../marketing-agents-context/SKILL.md).

## Approval before anything goes out

Agents draft; the user sends. Sending, publishing, deleting, paying, changing a price and messaging a customer each wait for the user's go, enforced in the agent tool's permission settings, because a rule in a prompt is a request and enforces nothing. Route every new agent's output to the user first. Set this up with [marketing-agents-guardrails](../marketing-agents-guardrails/SKILL.md) before any agent runs unattended.

## What stays with the user

Agents take the work and much of the checking; the user keeps the accountability. These calls stay with them: what to build, why it is worth it, who it affects, and what to give up for it, and in a campaign the offer, the claims, the budget and the creative direction. Hand a whole decision to an agent only where a wrong answer is cheap.

- Make every report reviewable: it names the defaults the agent chose, what it treated as out of scope, and which requirement it reinterpreted when two clashed, because summaries otherwise always say everything went well.
- Size the system to the user's review time. One team's observation: a person can follow 3–5 active agent sessions. When finished work waits on the user, tighten the checks so less needs them, or slow down. When the constraint is the user, the next move is a human hire, not another agent.

## Routing

Each job is its own skill. Read the SKILL.md of every branch the job reaches, and follow it with this skill's rules. Any new agent also reaches marketing-agents-guardrails.

| Job | Branch |
| --- | --- |
| First scheduled agent: the weekly report, a competitor check, the charter, dry runs, scheduling | [marketing-agents-first-agent](../marketing-agents-first-agent/SKILL.md) |
| Context folder, standing brief, playbook from recordings, corrections into rules | [marketing-agents-context](../marketing-agents-context/SKILL.md) |
| Permissions, logins, spend caps, quality checks, the review ladder | [marketing-agents-guardrails](../marketing-agents-guardrails/SKILL.md) |
| A coordinator over worker agents, handoffs, always-on agent design | [marketing-agents-coordinator](../marketing-agents-coordinator/SKILL.md) |
| Research bots sharing one folder and a weekly shortlist | [marketing-agents-research-team](../marketing-agents-research-team/SKILL.md) |
| A whole campaign planned, ticketed and reviewed with agents | [marketing-agents-campaign](../marketing-agents-campaign/SKILL.md) |
