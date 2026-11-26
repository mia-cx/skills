---
name: subtext
description: 'Use when the user asks to find what users (or they themselves) really want from a repo''s issues, to map hidden links or patterns across open and closed issues and PRs, or to propose milestones and new issues from a backlog.'
---

# Subtext

People file solutions; the **need** sits underneath. Ten issues asking for an export button, a CSV option, and an API token are one need: get my data out. This skill reads every open and closed issue and pull request, links them by what they share, names the needs nobody wrote down, and proposes the milestones and issues that answer them. The aim is the user's: reduce complexity, so the best answer dissolves several issues at once.

The analysis is read-only. Milestones, issues, labels, and comments go out only after the user approves the proposal, because the tracker is public and posts notify people.

## 1. Pull the corpus

Read the repo, or every repo the user names. Closed items count as much as open ones: a request closed as not planned that keeps coming back is the strongest signal there is.

```sh
<this skill's directory>/scripts/corpus.sh [owner/repo] [out-dir] > edges.txt
```

It writes `issues.json` and `prs.json` to a fresh temp dir (named on stderr) for `jq` queries, and prints every explicit link. Done when its counts match the tracker.

The tracker holds only what someone filed. Also read:

- `DIRECTION.md`, `CONTEXT.md`, and `.out-of-scope/`: the stated vision, the domain terms, and past rejections.
- Specs, wayfinder maps, ADRs, and the owner's notes, including gitignored ones: the owner's unfiled wants live there.
- The branch where the work happens. When open PRs target a long-lived branch, read code and docs there and diff them against the default branch: what the branch drops is a finding.

## 2. Map the explicit links

`edges.txt` holds one link per line: `parent-of`, `blocked-by`, `closes`, `mentions`, `closed duplicate` or `closed not_planned`, `closed-by-hand` (completed with no closing PR), and `targets` (a PR into a non-default branch). Read the issues each `closed` line points to. Many `closed-by-hand` and `targets` lines together mean work lives off the default branch, where issues never auto-close and triage bots read the wrong code.

Done when every edge kind is counted and each odd one is read.

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
- **Smallest answer**: the one change that satisfies the most items in the cluster. Prefer removing a step or a concept over adding a feature. It is often a feature suggestion built on a piece that already exists; name that piece. For example, a join-request flow for a second person on a shared device dissolves when the person already signed in adds the newcomer: their consent is built in, so the request concept disappears.
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

Then propose the graph the findings imply:

- **Milestones**: each with one overarching goal in a sentence, and its exit criterion.
- **New issues**: title, milestone, the goal they serve, and the evidence they link. Mark the ones only the user can do.
- **Edges**: blocked-by, parent and sub-issue, and which existing issues and PRs move under which milestone or close.

Close with the explicit links that look wrong: issues blocked by closed work, duplicates closed against still-open originals, PRs that closed an issue without meeting its need, issues whose title contradicts what shipped. Then offer one next step: file the graph, or grill the top finding first.

## 7. File the approved graph

Follow `gh-comment` for the attribution header on every issue body, use the repo's existing labels, and write bodies to files.

```sh
gh api repos/<owner>/<repo>/milestones -f title="<name>" -f description="<goal. Done when …>"
gh issue create --title "<title>" --body-file <file> --milestone "<name>" --label "<labels>" [-a <login>] [--blocked-by <n>]
gh issue edit <n> --milestone "<name>" --add-blocked-by <m>
gh pr edit <n> --milestone "<name>"
```

Done when every proposed milestone, issue, and edge exists. Link filed issues to the thread only when this thread owns the project; otherwise the project's own thread picks them up.
