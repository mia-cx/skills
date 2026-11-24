---
name: subtext
description: 'Use when the user asks what users (or they themselves) really want, asks for patterns, themes, or duplicates across issues, or wants a backlog read between the lines.'
---

# Subtext

People file solutions; the **need** sits underneath. Ten issues asking for an export button, a CSV option, and an API token are one need: get my data out. This skill reads every open and closed issue and pull request, links them by what they share, and names the needs behind them, so one change can answer many requests. The aim is the user's: reduce complexity, so the best answer dissolves several issues at once.

The work is read-only. Labels, comments, and new issues go out only when the user asks, because the tracker is public and posts notify people.

## 1. Pull the corpus

Read the repo, or every repo the user names. Closed items count as much as open ones: a request closed as not planned that keeps coming back is the strongest signal there is.

```sh
gh issue list --state all --limit 1000 --json number,title,state,stateReason,author,createdAt,closedAt,labels,body,comments,reactionGroups,parent,subIssues,blockedBy,blocking,closedByPullRequestsReferences > issues.json
gh pr list --state all --limit 1000 --json number,title,state,author,createdAt,mergedAt,body,comments,closingIssuesReferences,files > prs.json
```

Write both to your scratch directory and query them with `jq`. Also read `DIRECTION.md`, `CONTEXT.md`, and `.out-of-scope/` when they exist: they hold the stated vision, the domain terms, and past rejections. Done when the item counts match the tracker.

## 2. Map the explicit links

These are links someone already wrote down:

- parent and sub-issues; blocked-by and blocking
- PRs that close issues, and the files those PRs touch
- `#n` references in bodies and comments
- issues closed as duplicate or not planned, and what they point to

Done when every link in the corpus is recorded as a pair with its kind.

## 3. Find the implicit links

These are links nobody wrote down. Two items share a need when they share any of:

- **A domain concept under different words.** Translate each request into the terms in `CONTEXT.md`, or into plain nouns when there is none. "Sync is slow" and "offline mode" may both be about trusting local state.
- **A code area.** Issues whose fixes touched the same files, or would.
- **A workaround.** A user describing what they do instead is describing the need directly.
- **A recurrence.** The same request reopened, refiled, or +1'd across months, especially after a not-planned close.
- **A person.** One reporter filing several issues that circle one goal.

Count reactions and "same here" comments as votes. Done when every item belongs to a cluster or is marked as standing alone.

## 4. Name the need behind each cluster

For each cluster, separate what was asked for from what is wanted:

- **Asked for**: the solutions as filed.
- **Need**: the job the person is trying to get done, in one sentence in their words, free of any solution.
- **Smallest answer**: the one change that satisfies the most items in the cluster. Prefer removing a step or a concept over adding a feature.
- **Next request**: what this cluster will ask for next if nothing changes.

A need backed by two or more items from two or more people is a finding. A need backed by one item is a hypothesis; label it so. When the repo owner filed issues, report their needs apart from other users', so the user sees where their own wants and their users' wants agree and where they pull apart.

Check every need against `DIRECTION.md` and `.out-of-scope/`. A need the direction ignores, or one that matches a past rejection and still recurs, ranks first.

## 5. Keep only what the user can't already see

The user knows their own roadmap. Drop a need from the report when any of these holds, because restating it costs their attention and tells them nothing:

- It is in flight: an open PR, an epic, or a milestone already carries it.
- It is settled or deliberately deferred in `DIRECTION.md`, a spec, or a decision thread.
- It is product identity: the reason the product exists, its voice, its strategy. Identity shapes copy and direction, not tickets. Mention it in one line only when the code or docs drift from it.

What stays is **non-obvious**: a link between areas nobody connected, a cost out of proportion to the need it serves, a decision that went missing from the docs, process friction with one root cause, an expensive subsystem whose user-facing payoff is unbuilt. Done when every remaining need would surprise a reader who knows the roadmap.

## 6. Report

Rank by evidence: distinct people first, then items, then recency. Cap at five findings.

```markdown
### <Need or pattern, one sentence>

**Evidence:** #12, #40 (closed, not planned), #77, PR #81 · 4 people, 6 items, latest 2026-11-02
**Why it's not obvious:** <the link or cost nobody wrote down>
**Smallest answer:** <one change that reuses what exists, and which items it closes>
**Next request:** <the predicted follow-up>
```

The smallest answer is often a feature suggestion: the existing piece that already does most of the job. For example, a request for a join-request flow on a shared device is answered by showing the existing invite link as a QR code on the profile already signed in. Name the piece it reuses.

Then propose the graph that the findings imply:

- **Milestones**: each with one overarching goal in a sentence, and its exit criterion.
- **New issues**: title, the goal they serve, and the evidence they link.
- **Edges**: parent and sub-issue, blocked-by, and which existing issues move under which milestone or close.

Close with the explicit links that look wrong: issues blocked by closed work, duplicates closed against still-open originals, PRs that closed an issue without meeting its need. Then offer one next step: file the proposed graph, or grill the top finding first.
