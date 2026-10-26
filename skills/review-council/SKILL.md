---
name: review-council
description: >-
  Use when the user asks for a council or a review council: Claude and Codex
  review the same pull request head in parallel, you fix what is real, and the
  council reconvenes until a round comes back clean.
---

# Review council

Review the PR for the current branch with a council: one reviewer per provider, all reading the same head at the same time. You verify and fix what is real, then the whole council reviews the new head. It ends when every member approves the same head. Do not merge; that is a separate, explicit request.

Run [review-relay](../review-relay/SKILL.md) with the changes below. Its project status, scope, models, ledger, launching, verification bar, fixing, publishing, and stop condition all apply; where it says *leg*, read *member review*, and where it says *lap*, read *round*.

## Members

| Member | Driver | `model` | `options` |
| --- | --- | --- | --- |
| Claude | `claudeAgent` | `claude-opus-5-5` | `{ "effort": "high" }` |
| Codex | `codex` | `gpt-6-astra` | `{ "reasoningEffort": "high" }` |

Resolve each driver's instance from `orchestrator_capabilities` as review-relay's lineup does. Every member sits in every round, the host's own provider included: a round's opinions are independent, so no member goes first. If a member's provider cannot run a child task, report that instead of substituting another model.

## A round

1. **Convene.** Launch every member in one turn against the same head SHA, each with the same filled task from review-relay's "Launching a leg" and its own `clientRequestId` (`council-<pr>-r<round>-<member>`). Record each `taskId`, then end your turn.
2. **Wait for the whole council.** One completion notification wakes you per member. Read each finished report as it arrives, but change no code until every member of the round has reported or failed. A failed member is relaunched on the same head; its round is not complete without it.
3. **Verify the union.** Dedupe findings across members before checking them: two members citing the same failure mode is one finding, attributed to both. Then verify, publish, fix, and push exactly as review-relay's leg steps 3–7.
4. **Reconvene** on the new head with the ledger's updated findings, or stop.

## Budget and scope

Review-relay's budget applies in rounds: 3 by default, up to 5 while a real security, auth, permissions, data-loss, or concurrency finding stays open, or on request.

Fight scope creep. Several reviewers raise more out-of-scope material than one, and each item arrives argued. The diff rule in review-relay holds for every member; an out-of-scope finding is logged advisory and changes nothing, however many members raise it.

## Stop condition

Review-relay's stop condition, with the clean lap replaced by a clean round: every member reviewed the latest pushed head in the same round, and nothing any of them raised survived verification. A member that returned `CHANGES` on findings you rejected still counts; the rejections go in the final report.

## Scores in the PR

Each report ends with a score. Record it per member per round in the ledger, and put the table in the PR description, above the model and harness line. Edit the description; this never goes in a comment.

```markdown
## Council review

Rounds: 2

| Member | Round 1 | Round 2 |
| --- | --- | --- |
| claude-opus-5.5 | 7/10 | 9/10 |
| gpt-6-astra | 6/10 | 9/10 |
```

A member that gave no score gets `no score`. Update the table after every round, so the PR always shows where the council stands.

## Final report

Review-relay's final report, with rounds in place of legs: each round's head SHA and every member's verdict and score, findings attributed to the members that raised them, and where members disagreed with each other and how you decided.
