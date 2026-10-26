---
name: autopilot
description: >-
  Use when the user says "autopilot": carry an issue or change unattended to a
  pull request that is ready to merge, or merged when they also say "ship it".
---

# Autopilot

The user is not watching this thread. Your updates and final message go unread until long after you stop, so own the work from its current state to the finish without waiting to be prompted.

- **"autopilot"** finishes at a PR that passes the gate, open and unmerged.
- **"autopilot, ship it"**, or an explicit merge request in the same ask, finishes merged.

Only an explicit "autopilot" grants this. Without it, each skill below keeps its own stopping point.

## The grant

For this task only, the request authorizes:

- Committing, pushing, rebasing, and `--force-with-lease` on the task's own branch.
- Running the whole chain below without a go between steps. Where a skill would stop and report (address-issue at the filed PR, review-relay at its user gate, babysit at green), hand off to the next step instead.
- Any test method Proof needs, including running the app, browser automation, and computer use, even where a project rule says to ask first. Rules about *how* to test still apply: the named command, fixture, browser, or check.
- Merging through `pr-merge`, only with "ship it".

It grants nothing listed under "Asking the user", and it does not bypass a harness approval prompt.

## Steps

1. **Build.** An issue goes through `address-issue`, which files the PR. For any other change, branch off the default branch if you are on it, make the smallest change that completes the goal, and file it with `pr-file`. Fix the case that happened, not every case that could.
2. **Prove** every change, per "Proof". Add one line to the PR description saying how.
3. **Review** with `review-relay`, or `review-council` when the user asked for a council.
4. **Babysit** with `babysit` until its Done holds. Prove each fix before pushing it.
5. **Gate.** Check "The gate" against the live PR.
6. **Finish.** Without "ship it", leave the PR open. With it, merge through `pr-merge`.
7. **Report**: the PR link, final head and merge commit if any, your proof, each reviewer's verdict and score, every decision you made for the user, remaining risks, and whether the PR is open or merged.

Stay active from step 1 to step 6. Ending a turn while checks, bots, or delegates are pending stops the work, because nobody will prompt you again. Wait only on something that wakes you: a delegate's completion notification, babysit's `--once` watcher, or `watch_pull_request` in T3. Call `unwatch_pull_request` before you ask a question or stop.

## Proof

Proof is evidence you observed yourself in this session: command output, a reproduction, a screenshot. Use the most direct proof the change allows:

- Reproduce the original failure, apply the fix, and watch the same reproduction pass.
- Run the checks the repo's CI runs.
- Add one focused test that fails without the fix, when the behavior has none and the `testing` skill calls for one.
- For UI and runtime behavior, run the app and look at it, because green mocked tests do not prove the experience works. UI PRs carry before-and-after captures, per address-issue.

A change you cannot prove is a change you are not confident in: ask.

## The gate

All true on the latest pushed commit:

- Babysit's Done holds.
- Proof covers every change in the diff, review fixes included.
- The review ended on a clean lap or round, not on budget, with no dispute left for the user.
- Without "ship it": auto-merge is off and the PR is in no merge queue. Disable both before the first push, and report that you did.

## Asking the user

A question in a normal message goes unseen, and the thread looks finished. Ask through the harness's question tool (`AskUserQuestion` in Claude Code, `request_user_input` in Codex) so the thread shows it is waiting. Put everything in the question: the PR link, what blocks you, and the options with your recommendation first.

Ask only when you cannot continue alone:

- You cannot prove the change.
- The gate cannot pass, and you cannot fix that yourself.
- The next step is outside the grant: deleting data, touching production or live services, changing things outside the repo, closing a PR, or force-pushing another branch.
- The goal is ambiguous in a way that changes the result.
- Another PR makes this one obsolete.
- A review dispute reached the user.

Decide everything else with sensible defaults, and list those decisions in the report. If no question tool exists or it returns no answer, leave the PR open and unmerged, and start the final message with the question.
