---
name: babysit
description: >-
  Use when the user asks to babysit a pull request: watch it for review
  comments from bots and human reviewers, fix what is real, resolve the
  threads, and keep watching until it is green and mergeable. A request for a
  fresh review pass or a review loop is review-relay, not babysitting.
---

# Babysit a pull request

Fix review findings until the current head is clean, green, and mergeable, then stop. The reviewers are whoever already posts on it: Pullfrog, other review bots, and humans. You are the fixer.

**Babysit runs no reviewer of its own and never invokes `review-relay`.** The relay recruits a fresh reviewer every lap; babysitting reacts to the ones already on the PR. If the PR needs another opinion, the user asks for it separately.

## Setup

1. Identify the PR: the number the user gave, else `gh pr view --json number,url,headRefName,baseRefName,headRefOid` from the current branch. `gh repo view --json nameWithOwner` gives `OWNER/REPO`.
2. Baseline: run the project's checks (tests, typecheck, lint, build) and record what passes and what already fails. A fix is only verifiable against a recorded baseline.
3. Read the verification bar once: the sections "What counts as real", "The trigger test", and "Fixing" in [review-relay](../review-relay/SKILL.md). Those govern which comments become code changes. The rest of that skill (lineup, legs, relay log, reviewer prompt) stays closed.
4. Run one tick over the backlog: every unresolved review thread and every unanswered conversation comment already on the PR.
5. Check **Done** before starting the watch. If already done, report once and end the turn.

## The watch

Report findings as currently known, because later reviews can raise more after every fix. Say "one finding is currently open"; never say "one remaining" or imply the next fix ends review. Claim completion only when **Done** is verified.

```bash
~/.agents/skills/babysit/scripts/watch.sh OWNER/REPO N --once   # [base=60s] [max=900s]
```

One line per event: a new conversation comment, inline comment, or review; CI changes; the head moving. `green <sha>`, `merged`, and `closed` are terminal events: the script exits and clears its state. On `green`, finish the current tick, verify **Done**, report once, and end the turn. Bodies carrying the gh-comment attribution header are skipped, so your own replies never re-trigger a tick.

**The script decides when to look.** It backs off exponentially from the base to the max while nothing happens and resets on an event. It remembers bot latency after a push so later rounds start near that wait. State lives in one file per PR under `$TMPDIR` until a terminal event.

**Never poll the watcher.** Polling its process, session, output, or logs duplicates the script's work and wastes tokens. Repeated short `write_stdin`, `wait`, or `tail` calls count as polling too.

**Every watcher invocation must include `--once`.** This makes the next event batch end the process, so completion resumes the task without polling. Launch it with the runner's longest timeout and await completion, directly or through a completion notification. Read the emitted events, perform the tick, and start another `--once` run only if **Done** remains unmet. Never launch the continuous mode, including through an event monitor.

A tool returning a session ID is not a watcher event. Use its completion notification or one blocking wait at the longest supported timeout; do not turn a yielded call into a loop of short checks. Restart after a hard timeout only when the previous process has actually stopped. If the host supports neither event delivery nor blocking completion, report that limitation once instead of substituting a polling loop.

While waiting, make no extra PR requests and send no unchanged-status messages such as "Pullfrog has not finished yet." Resume on an event, process exit, or user input.

Silence means wait only while **Done** remains unmet. Once done, stop the monitor or watcher and end the turn. Late feedback requires a new babysit request.

## The tick

1. **Collect.** Unresolved, non-outdated review threads (the GraphQL query in review-relay "Discussion thread mechanics") plus conversation comments since the last tick. Bots and humans get the same treatment.
2. **Verify.** Read the cited code before acting. Apply the trigger test to every claim. Real: fix it. Imaginary: reply with the code path that prevents it. Real but larger than this PR: leave the thread unresolved and name it as a blocker. A question gets an answer, not a change, unless the answer is a change.
3. **Fix**, per review-relay "Fixing": reproduce, smallest coherent change in the current worktree, re-run the baseline, read the diff. Commit and push through the `git-commit-and-push` skill, skipping only its issue-linking step: the PR already carries the link.
4. **Reply and resolve** every thread through the `gh-comment` skill (attribution header, body in a file). Replies follow say-less: fixed is the SHA plus one sentence on what changed and how it was verified; rejected is the code path, one or two sentences. Then resolve the thread. Deferred blockers stay open.
5. **Re-trigger** bots that need a nudge, only after a push: `@coderabbitai review` when that bot already reviews this PR; `@codex review` only when the user opted in for this run. Bots that review on push need nothing. A human review still at "changes requested" gets re-requested: `gh pr edit N --add-reviewer <login>`.
6. **Check Done.** Return to the watch only if it is unmet.

## Done

All true for the current pushed head:

- Required CI passes, or a failure is proven unrelated and named.
- If Pullfrog reviews this PR, its latest review is clean on the exact current head. A successful workflow only means it ran; findings are not a clean verdict.
- `gh pr view N --json mergeable` reports `MERGEABLE`.
- Zero unresolved threads or deferred blockers. A blocker needs a user decision, not more idle watching.
- No outstanding changes-requested verdict.
- Local checks pass with nothing regressed from the baseline. Worktree and pushed head agree.

Then post one conversation comment through `gh-comment` in this shape, header included:

```md
Green and mergeable at `<sha>`.

Resolved <n> threads: <one line per fix: SHA, what changed>.
Deferred: <blocker and why, or "nothing">.
```

Stop watching after this comment and end the turn. Do not merge; `pr-merge` is a separate request.
