---
name: babysit
description: >-
  Use when the user asks to babysit a pull request: watch it for review
  comments from bots and human reviewers, fix what is real, resolve the
  threads, and keep watching until it is green and mergeable. A request for a
  fresh review pass or a review loop is review-relay, not babysitting.
---

# Babysit a pull request

Sit with the PR until it is green and mergeable. The reviewers are whoever already posts on it: review bots (`coderabbitai`, `chatgpt-codex-connector`, Cursor Bugbot) and humans. You are the fixer.

**Babysit runs no reviewer of its own and never invokes `review-relay`.** The relay recruits a fresh reviewer every lap; babysitting reacts to the ones already on the PR. If the PR needs another opinion, the user asks for it separately.

## Setup

1. Identify the PR: the number the user gave, else `gh pr view --json number,url,headRefName,baseRefName,headRefOid` from the current branch. `gh repo view --json nameWithOwner` gives `OWNER/REPO`.
2. Baseline: run the project's checks (tests, typecheck, lint, build) and record what passes and what already fails. A fix is only verifiable against a recorded baseline.
3. Read the verification bar once: the sections "What counts as real", "The trigger test", and "Fixing" in [review-relay](../review-relay/SKILL.md). Those govern which comments become code changes. The rest of that skill (lineup, legs, relay log, reviewer prompt) stays closed.
4. Run one tick over the backlog: every unresolved review thread and every unanswered conversation comment already on the PR.
5. Start the watch.

## The watch

```bash
~/.claude/skills/babysit/scripts/watch.sh OWNER/REPO N   # [base=60s] [max=900s]
```

One line per event: a new conversation comment, inline comment, or review; CI checks reaching a new state; the head moving; the PR merging or closing (then it exits). Bodies carrying the gh-comment attribution header are skipped, so your own posted replies never re-trigger a tick while everything the user types on the PR comes through.

**Every look costs a tool call, so the script decides when to look and you never do.** Review bots take minutes, sometimes tens of minutes. The script backs off exponentially from the base to the max while nothing happens, resets on an event, and remembers how long the slowest bot took after the last push so the next round starts its wait at that latency instead of the base. That state is one file per PR under `$TMPDIR`, deleted when the PR merges or closes, so it survives a restart and never outlives the PR.

Your side of the bargain is one tool call per wait, however long the wait:

- **Claude Code**: start it once through the Monitor tool with `persistent: true`, then end the turn. Each event line arrives as a notification and starts a tick. There is nothing to check in between, so no reading its output, no `sleep`, no second look at the PR.
- **Any other host**: run it with `--once` in the foreground at the tool's longest timeout. It blocks until the next batch of events, prints it, and exits; a timeout with no output was one wait, so call it again. Never wrap it in a loop of shorter calls.

Silence means keep waiting. The watch ends when the PR merges or the user ends the session.

## The tick

1. **Collect.** Unresolved, non-outdated review threads (the GraphQL query in review-relay "Discussion thread mechanics") plus conversation comments since the last tick. Bots and humans get the same treatment.
2. **Verify.** Read the cited code before acting. Apply the trigger test to every claim. Real: fix it. Imaginary: reply with the code path that prevents it. Real but larger than this PR: leave the thread unresolved and name it as a blocker. A question gets an answer, not a change, unless the answer is a change.
3. **Fix**, per review-relay "Fixing": reproduce, smallest coherent change in the current worktree, re-run the baseline, read the diff. Commit and push through the `git-commit-and-push` skill, skipping only its issue-linking step: the PR already carries the link.
4. **Reply and resolve** every thread through the `gh-comment` skill (attribution header, body in a file). Replies follow say-less: fixed is the SHA plus one sentence on what changed and how it was verified; rejected is the code path, one or two sentences. Then resolve the thread. Deferred blockers stay open.
5. **Re-trigger** bots that need a nudge, only after a push: `@coderabbitai review` when that bot already reviews this PR; `@codex review` only when the user opted in for this run. Bots that review on push need nothing. A human review still at "changes requested" gets re-requested: `gh pr edit N --add-reviewer <login>`.
6. **Back to the watch.**

## Done

All true for the current pushed head:

- Required CI passes, or a failure is proven unrelated and named.
- `gh pr view N --json mergeable` reports `MERGEABLE`.
- Zero unresolved threads other than deferred blockers.
- No review still requesting changes from before the last push, or its re-request is out.
- Local checks pass with nothing regressed from the baseline. Worktree and pushed head agree.

Then post one conversation comment through `gh-comment` in this shape, header included:

```md
Green and mergeable at `<sha>`.

Resolved <n> threads: <one line per fix: SHA, what changed>.
Deferred: <blocker and why, or "nothing">.
```

Do not merge; `pr-merge` is a separate request. Keep the watch running: a later comment starts a new tick, and a fresh done comment goes out only when new fixes landed.
