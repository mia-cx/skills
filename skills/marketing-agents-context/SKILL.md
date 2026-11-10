---
name: marketing-agents-context
description: Give a marketing agent the context folder, standing brief and playbook it needs to work at the user's level.
disable-model-invocation: true
---

# Context files and playbooks

Part of [marketing-agents](../marketing-agents/SKILL.md): its context and approval rules apply here.

Give an agent the user's own process, examples and rules so it works at their level instead of the generic default. What the agent reads matters more than how the request is worded, so spend effort on the files, not on clever prompts.

## Write the brief first

A vague request lets the agent fill the gaps and return work that only looks finished. Before a job runs, get three things from the user in writing: the audience, what is out of scope, and the definition of done.

When the user can't fill them in, interview them: one question per message about what you don't understand, until all three are written. If two rounds of corrections haven't landed, stop tweaking and rewrite the prompt.

## The context folder

One folder per job, read first on every run:

```
context/
├── brief.md      ← audience, out of scope, definition of done
├── process.md    ← the playbook
├── examples/     ← 3 finished examples the user was happy with
├── style.md      ← style rules and banned words (start with 10)
└── rules.md      ← one line per correction
```

Fit it to the stack: a coding agent reads it from the repo; a Claude Project, custom GPT or Gemini Gem takes the same files as uploads, with the standing brief in its instructions box.

## Standing brief

Fill this with the user and put it where the agent reads it every time, so the user never re-explains the business. The last rule matters most: every correction becomes a new line, so the brief improves each week. One practitioner's advice: give it a month before judging it.

```
ROLE
You are my [job, e.g. "brand designer", "data analyst"] for [business].
You've done this for years and you're picky about quality.

WHAT WE'RE WORKING ON
[the business or project, who it's for, what makes it different]

WHO THE WORK IS FOR
[the customers: what they like, what they hate, what they already know]

WHAT GOOD LOOKS LIKE
[3-5 best examples: texts, designs, screenshots, reports]
What makes them good: [e.g. "short sentences, no jargon", "every number has a source"]

RULES
- always: [e.g. "use our brand colors", "write in British English"]
- never: [e.g. "a stock photo look", "made-up numbers"]

HOW TO WORK WITH ME
- if my request is unclear, ask up to 3 questions before you start
- give me [2-3 options / one finished version] unless I say otherwise
- check everything against these rules and fix what doesn't fit before you show it to me
- when I correct you, suggest a new rule I can add here, so the same mistake doesn't happen again
```

## Extract the playbook

The user doesn't have to write `process.md` from scratch. Have the agent extract it from finished work and recordings of the user doing the job. Comparing recordings side by side shows where the user does the job inconsistently, which is exactly where an agent would guess. One practitioner says this cut a 10–14 day process to 5 days (anecdote).

```
Here are [5] finished examples of [job] and [3] recordings of me doing it. If you can't open a recording, tell me.

Write this job up as a playbook:
1. One line at the top: the input, the steps in order, the finished output
2. Numbered tasks, one action each
3. Under each task, the key points: what a new person would get wrong, and the call I make there
4. How long each task takes
5. A link to where you saw it in my examples

Then compare the [3] recordings side by side and list every place I did the job differently. Ask me which way is right, one question at a time.

Where you can't tell why I did something, ask me. Never guess.
Save it as "[job] playbook" in [folder].
```

- Build a playbook only where it saves 20–30 minutes per client or run (one practitioner's threshold).
- Some agent tools record one browser task and turn it into a draft skill. A recording knows only that one run, so add by hand what to do when a file is missing or a number looks off.

## Turn corrections into rules

Fix the file, not the draft. On every correction, propose one rule line, and add it to `rules.md` or the charter once the user agrees. Write down why the output missed, because that is how the user's taste compounds into the system.

To find the rules that matter most, run a revision diagnostic on the user's past feedback: the last ~500 revision comments from email, Slack or doc comments, or as many as exist.

```
Help me understand the distribution of the top revision reasons based on these comments.
Then for the top 3 reasons, tell me what was missing from the brief, and write each one as a check I can add to my charter.
```

Add the top reason to the charter as a pass/fail line. One former agency COO traced 80% of a 50%+ revision rate to bad briefing, incomplete onboarding information, and no client-specific do's-and-don'ts list. In his example, a creative agency at a 70% average revision rate found 40% of revisions came from incomplete briefs and 30% from onboarding gaps.
