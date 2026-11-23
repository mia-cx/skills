---
name: design-post
description: 'Use when drafting a design post about one of Mia''s projects for mia.cx: why the project exists, the thinking behind its main features, and why she chose them over the obvious alternatives.'
---

# Design post

A design post tells a stranger why a project exists and why it went this way and not the obvious way. It is Mia's writing under Mia's name, so every claim traces to the repo, and nothing leaves her machine until she says yes.

Read these in one turn before you start: [say-less](../say-less/SKILL.md), [say-more](../say-more/SKILL.md), [momentum](../momentum/SKILL.md), [talk-like-mia](../talk-like-mia/SKILL.md), and two of Mia's own posts in `mia-cx/mia-cx` under `vaults/blog/`: `Crunch Time.md` and `The Quiet Cost of Carelessness.md`. Those two are the shape to match.

## 1. Read the repo

Read the README, `CONTEXT.md`, `DIRECTION.md`, the research notes (`docs/research/`, `research/`, ADRs), and the code behind each feature you might write about. Check the repo's visibility with `gh repo view --json visibility`.

Then read the GitHub history. It holds most of the *why*: PRDs and their sub-issues, wayfinder maps, issues, and pull requests both open and closed, with their review threads. A closed PR that never merged is often the obvious version Mia rejected, with her reason in the thread.

```sh
gh issue list --state all --limit 200 --json number,title,state,labels
gh pr list --state all --limit 200 --json number,title,state,mergedAt
gh issue view <n> --comments
gh pr view <n> --comments
```

Done when each claim you plan to make has a source: a file and line, a commit, an issue or PR, or a decision in DIRECTION. A claim without one becomes a question for Mia.

## 2. Ask Mia for the story

The repo holds the decisions, not the moment that started them. Ask Mia one question: what made her build this, and what was wrong with what already existed? Her answer is usually a few drivers. They are the post's spine: one section each, in her order, and the first sentence names them. When DIRECTION or a research note already records the moment, ask her to confirm it in stead.

## 3. Pick one reader, one action, one takeaway

- **Reader**: one kind of person and where they will find the post, e.g. "a developer who stores data about real people, from Lobsters".
- **Action**: what they do after reading, e.g. "check what their own userscript re-renders on every fetch". The post earns it; it never asks for it.
- **Takeaway**: the one sentence they remember.
- **Titles**: a primary and an alternative, each a claim, not a topic.

Pick 2–4 main features that serve the takeaway. A feature that doesn't serve it waits for its own post.

## 4. Draft

Write the draft to `vaults/work/<Project>/<Title>.md` in a `mia-cx/mia-cx` checkout, and leave it uncommitted: the repo is public, so a commit publishes the text even with `draft: true`. Start the file like this:

```md
---
description: <one line for cards and the blog index>
tags:
  - post
created_at: <today, YYYY-MM-DDT00:00>
draft: true
---

<!--
Reader: …
Action: …
Takeaway: …
Title: …
Alternative title: …
-->
```

Then the body, in this shape:

1. **Open on Mia's story or the claim**, in one plain sentence. Crunch Time opens on the moment; Quiet Cost opens on the claim.
2. **Why it exists**: the annoyance in a paragraph or two of prose, as Mia would tell it.
3. **Each feature**: lead with the rule it follows, in one sentence, stated as what the project does in Mia's voice ("Caelestis draws inside Wplace's map"), not as an instruction to the reader. Then the obvious version a reader would expect, and why Mia didn't build it. Then only as much of how it works as proves the rule. Give each feature a `##` heading when there are three or more; the page title is the post's only `#`.
4. **What it can't do yet**, when that serves the takeaway: anything unbuilt is "planned" or "next", with what it waits on. A roadmap belongs in DIRECTION, not here.
5. **Close** on the takeaway in one line, and stop.

Rules for every sentence:

- **Plain words.** CONTEXT.md terms are for your grounding. In the post, "the artist", not "the Author"; "a name it hides", not "a Redacted name". Explain a term once, where the reader first needs it.
- **Prose that thinks out loud**, like Mia's posts. A list only for a procedure or a recap.
- **Code**: in a private repo, quote the smallest snippet that proves the claim, 10 lines at most. In a public repo, link the file at a commit (`https://github.com/<owner>/<repo>/blob/<sha>/<path>#L<a>-L<b>`) and quote only when the snippet is the point.
- **Links prove, they don't decorate.** Link where a reader would doubt the claim or want to dig in, a few per section at most. Your full claim-to-source list goes in the hand-back, not the post.
- **Mia's own words stay verbatim**: her title, her drivers, any phrase she gave you, even where the voice level wouldn't produce them.
- **Shipped means merged to main.** Everything else is planned, next, or an idea, said as such.
- **Synthetic examples only.** Invent every name, message, track and record. Real user data, real people's personal details and anything from Mia's own data stay out, even when the repo's fixtures hold them.
- **The project is the subject.** Leave out Mia's identity: her gender, health, background and where she lives.
- **Voice**: talk-like-mia at the subtle level, with its spelling (British for ordinary words, `in stead`) and its Never list. say-less: each point once, no preamble or recap. say-more: one mechanism per feature, the rest held back as a handle a reader can ask about.

Done when the post is 800–1500 words and every feature has its rule, its rejected obvious version and its reason.

## 5. Check

Read the draft as it will render, line by line, against:

- every claim against its source from step 1, and every "shipped" against a merged PR;
- shipped versus planned against `main`;
- every name and example: invented, never real;
- talk-like-mia's Never list and the subtle level;
- the opening sentence and the closing line against the comment's reader, action and takeaway.

## 6. Hand back

Give Mia the draft's path, its word count, the claims with their sources, and every open question. The draft stays uncommitted and nothing is posted anywhere. When she says yes: delete the HTML comment, drop `draft: true`, and file the post as a pull request on `mia-cx/mia-cx`.
