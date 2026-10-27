---
name: review-relay
description: >-
  Use when the user asks for a review relay or review loop, for repeated review
  passes on a pull request, for a PR to be reviewed until it is clean or
  merge-ready, or to address review comments and resolve review discussions on
  a PR. Several providers reviewing the same head at once is review-council. A
  request for one review pass over a diff is not a relay.
---

# Review relay

Drive the PR for the current branch to merge-readiness as a relay race: each leg, one provider reviews the head read-only, then you verify and fix what is real before handing the new head to the next provider. The race ends when a full lap comes back clean. Do not merge; that is a separate, explicit request.

**The baton is the head SHA.** Every handoff passes a head that already absorbed the previous leg's findings; a provider reviewing a stale head is a dropped baton, and its leg does not count.

## Project status

Before the first leg, find the PR's linked open issues and a relevant GitHub
Project for each. Reuse an attached project, or use a relevant project for the
repository and add the issue to it. If neither exists, skip status tracking.
Move each tracked issue to **In Review**. The PR is under review from the first
leg, not only after it becomes green.

## Scope: the diff, and only the diff

**Every finding must be caused by this diff**: a defect these changes introduce, or a latent one they newly expose. Anchor each finding to a line the diff touched, even when the damage lands elsewhere.

Read as widely as you need to: callers, callees, tests, config, persisted formats, anything that tells you what the change breaks. That reading is how blast radius gets judged, and it is encouraged. What it is not is a review target. A bug that predates this branch and that the diff does not touch or worsen is out of scope, however real. Someone else's PR owns it.

The distinction in practice: the diff changes a function's return shape and an unchanged caller mishandles it. In scope: cite the changed line and name the caller as the consequence. That same caller was already mishandling a case the diff never touches. Out of scope: leave it.

Reviewing beyond the diff is the most common way one leg turns into an unbounded audit. The pressure to leave it comes from the reviewer, and it is persuasive by construction: an out-of-scope finding arrives fully argued with a real defect attached, so agreeing feels like diligence rather than drift. Scope is yours to hold and never the reviewer's to widen; decide it here, before the first report lands.

## The lineup

One reviewer per leg, from one provider, covering correctness, security, and coverage at once. Fix before every handoff; a fresh pair of eyes on fresh code is the point.

At loop start, call `orchestrator_capabilities` once. For each driver kind (`claudeAgent`, `codex`, `cursor`), use the provider instance whose `canRunChildTask` is true. The host is the agent running this skill; its driver is the `driverKind` of `inheritedProviderInstanceId`.

| Host driver | Lineup |
| --- | --- |
| `codex` | claude → codex |
| anything else | codex → claude |

The lap repeats until the stop condition or the budget ends it. The host's own provider never runs the first leg, so the first opinion on the diff comes from outside the agent that wrote it.

**Cursor is opt-in.** When the user asks for Cursor reviews, it joins the end of every lap on model `default` (Auto). Auto is included plan usage and every other Cursor model bills per token, so a request for Cursor on a specific model gets Auto or no Cursor leg, and the report says which. Cursor's PR-side bots (`@cursor review`, `@bugbot run`) are a separate mechanism that stays untriggered.

A user may override the lineup for one run. Record the host, its evidence, and the lineup in the ledger; overrides live there and never in this skill.

### Reviewers review; the host fixes

Every reviewer stays read-only. After a leg, you independently verify each claim against the code, reproduce every surviving finding, and implement the fixes inline in the current worktree. Keep the fixing yourself rather than handing it to a fixer agent: you hold the acceptance criteria, ledger, and blast-radius context needed to make the change coherently. The next reviewer grades the resulting head.

## Models

Every leg runs at high reasoning effort on the top-intelligence model within its own provider. The relay's value is provider diversity, so a leg never switches provider to chase a score. Intelligence outranks cost here, because a leg run cheap costs a whole lap to discover.

| Leg | Driver | `model` | `options` |
| --- | --- | --- | --- |
| claude | `claudeAgent` | `claude-opus-5-5` | `{ "effort": "high" }` |
| codex | `codex` | `gpt-6-astra` | `{ "reasoningEffort": "high" }` |
| cursor | `cursor` | `default` (Auto) | none |

gpt-6-astra varies more from run to run than gpt-6.1-sol, which alternating laps absorb. Fable-5.1 drains usage limits about twice as fast, so it runs only on explicit request. No GPT model scores above 4 on taste in the model table in `~/.agents/AGENTS.md`, so on a UI-heavy diff the claude leg carries taste coverage; say so in the report rather than swapping the codex leg to a Claude model. When a release renames a model, take the top-intelligence model of the same provider.

## Budget

Review depth follows the PR's risk tier, read from the `Risk:` line in its body. When the line is missing, classify the diff by `pr-file`'s tiers, add the line to the PR body, and record the tier in the ledger. A lap is one counted leg from every provider in the lineup.

| Tier | Budget |
| --- | --- |
| low | 1 leg, from the first provider in the lineup; a clean leg is a clean lap |
| standard | 3 laps |
| high | 5 laps |

The user may override the budget for one run.

- **Three laps without a clean one means question the approach**, not the latest patch. Before a fourth lap, write in the ledger whether the design itself is producing the findings. If it is, stop and ask the user instead of patching again.
- **Disputes go to the user.** A finding you have rejected twice that a reviewer raises a third time stops being argued: record both sides in 2–3 lines each and carry it to the final report as a decision for the user.
- **Budget end is not approval.** When the budget runs out first, the final report says so and lists what is still open.

## The ledger

One markdown file per PR at a stable path, `${TMPDIR:-/tmp}/review-<repo>-<pr>/ledger.md`, so a resumed session finds it. You author it; reviewers never touch it or see its path.

**Header**, written before the first leg and kept current:

- PR number, base and head branches, baton SHA, host driver and its evidence, lineup, next leg.
- The environment's posture (cooperative or adversarial, per the trigger test), decided once and reused by every leg.
- Acceptance-criteria source, and the open PR stack (`gh pr list --json number,headRefName,baseRefName,headRefOid`). Compare descendant diffs when deciding whether a finding is live, fixed downstream, or superseded; a base defect that descendants inherit is still live.
- Baseline commands and results, required CI, bot opt-ins, unresolved thread IDs.
- Every attempted leg: provider, reviewed SHA, `taskId`, `clientRequestId`, verdict, score, and whether it counts.

**Findings**, one entry per finding at the moment you disposition it, numbered `[F1]`, `[F2]`, … across the whole relay under a heading per leg:

```markdown
## Leg 2: codex @ 4f1c2ab (CHANGES, 6/10)
- **[F7] `src/auth/session.ts:88`**: expired refresh token accepted on the retry path.
  **Fixed** in `9d3e0f1`: the retry now revalidates expiry; replaying the expired-token path rejects it.
  Diverged from the suggested guard at the call site: the check belongs in the token accessor, since two other callers reach the same path.
- **[F8] `src/ui/Toast.tsx:40`**: toast timeout not cleared on unmount.
  **Rejected**: the component unmounts only with the portal, which clears the timer at `Portal.tsx:61`. No leak path.
- **[F9] `src/db/migrate.ts:12`**: non-transactional migration.
  **Deferred**: real, but the fix restructures migration ownership beyond this PR. Reported as a blocker.
```

Every finding gets exactly one of **Fixed** (fixing SHA plus the verification that proves it), **Rejected** (the evidence that killed it: a traced code path, not an opinion), or **Deferred** (why it outgrew this PR). A finding with no disposition means the leg is not finished. What the ledger records is your verdict after checking the code, never the reviewer's confidence. Attribute each finding to its leg, so a provider that keeps raising noise is visible. The final report is written from the ledger, so write entries for a reader who was not there.

**Your rejections invite challenge.** You have stared at this diff since leg 1, which makes you the least fresh pair of eyes in the race. A later reviewer that disagrees is doing its job. What the ledger rules out is the unargued repeat: re-raising `[F8]` with no new evidence is noise; re-raising it with a second unmount path is a finding, and your rejection was wrong.

**Resume.** Compare the PR head with the recorded baton before doing work. Read any leg still in flight with `task_status` before relaunching it. Reuse valid completed legs and dispositions; rerun only stale, interrupted, failed, or empty-report attempts.

## Launching a leg

**Every leg is a T3 `delegate_task` child**, from every host: it crosses providers, shows the leg in T3, and wakes this thread when the leg finishes.

The reviewer's complete brief is this skill's `references/reviewer-prompt.md`. The reviewer reads it from disk, so it arrives whole and unparaphrased. The task carries only what changes per leg:

```markdown
You are a read-only reviewer. Inspect files and run read-only commands only: no edits, commits, pushes, GitHub comments, thread resolutions, skills, subagents, or delegates.

Read <absolute path to references/reviewer-prompt.md> in full before anything else; it is your brief. If you cannot open it, stop and report that.

- PR: <url>
- Head: <sha>
- Diff: git diff <base>...<sha>
- Review: <"the full diff", or "changes since <sha this provider last reviewed>: git diff <that sha>..<head>, plus open findings">
- Environment: <Cooperative|Adversarial>: <one line on what surrounds this code>
- Acceptance criteria: <verbatim from the PR body, linked issue, or plan file, or "None stated">

## Earlier findings

<the ledger's findings, pasted as they stand at launch, or "You are the first reviewer; nothing has been reviewed yet.">
```

A provider's first leg reviews the full diff. Its later legs review only what changed since the head it last reviewed, plus open findings, because repeat passes over unchanged code mostly resurface old code rather than new bugs. The full diff stays available as context.

Paste the findings; never pass the ledger's path. You append to the ledger while the leg runs, so a reviewer that opens it reads whatever half-written state it catches. The pasted snapshot is what makes each leg reproducible.

```json
{
  "task": "<the filled task above>",
  "title": "Relay leg 3: codex @ 4f1c2ab",
  "role": "review",
  "mode": "async",
  "clientRequestId": "relay-<pr>-leg-3",
  "target": { "providerInstanceId": "<codex instance>", "model": "gpt-6-astra", "options": { "reasoningEffort": "high" } }
}
```

- Leave `isolation` unset: the reviewer reads the shared checkout at the baton SHA. Make no edits while a leg runs.
- Record the returned `taskId` in the ledger, then end your turn. The completion notification wakes you; there is nothing to poll.
- **The report is the task's final `summary`** (`task_status`). A task that ends without one is a failed attempt: record it, fix the task or target, and relaunch the same lineup slot with a new `clientRequestId`. It never counts as a leg.
- Give each leg its own `clientRequestId`, stable across retries of that launch, so a lost response never starts a duplicate.
- **Re-running a provider** is a new `delegate_task` with a freshly filled task. Never continue a leg through `t3_thread_send` on its `childThreadId`.
- **Check `git status` after every leg.** The read-only preamble is the only guard, since every child has write access. A reviewer that writes strands edits outside the fix sequence.
- **One leg is one reviewer.** A coordinator merging sub-reviews it never verified is a second relay hiding inside the first; one spawn on PR #65 became six and cost 925k tokens. If a fan-out happens anyway, read its reports as raw input, verify each finding yourself, and rerun the leg.
- Treat repository decisions and recon as authoritative. A reviewer re-scrapes a live integration only for a concrete unresolved contradiction.

## The leg

1. **Take the baton.** `gh pr view --json number,title,body,headRefName,baseRefName,url`, `gh pr diff`, acceptance criteria, and unresolved review threads (query below). Record the head SHA.
2. **Launch this leg's reviewer** against that head, per "Launching a leg". One reviewer, three domains, no parallel siblings.
3. **Verify findings yourself.** Read the cited code before acting; dedupe against the ledger. A finding survives only with a concrete failure mode; see "What counts as real". Missing coverage without a functional defect is advisory, and the leg is clean. A repeat of a rejected finding needs new evidence, not a second vote; weigh that evidence on the code, not on the earlier rejection. Write the trigger line in the ledger for every finding you carry into step 4. If the pointer you write paraphrases the reviewer's claim rather than naming somewhere you looked, the finding has not survived.
4. **Publish, fix, and verify**, in the sequence under "Fixing". Findings from external threads get the same standard; they already have threads.
5. **Commit and push through the `git-commit-and-push` skill.** Skip only its issue-linking step: the PR already carries the link, and a review fix closes nothing. Then, only if something was pushed, re-trigger enabled bots:
   - **The GitHub Codex bot is opt-in.** Post `@codex review` only when the user asked for the GitHub Codex bot during this run; record the opt-in in the ledger. It is independent of the relay's codex legs.
   - Bots that review on push need nothing. CodeRabbit reviews on its own schedule; leave it untriggered.
6. **Resolve discussions**, now that fixes have SHAs: fixed gets the commit SHA, rationale, and verification; false positive gets the exact code path. Then resolve the thread. Deferred blockers stay unresolved.
7. **Wait for required CI and any bot triggered in step 5**, then hand the baton to the next provider: the new head SHA and the ledger with this leg's section appended. A bot review counts only when its reviewed commit equals the current baton; a review on an older head is stale.

A leg with no fixes still hands off, skipping the push. It still writes its ledger section: "reviewed `<sha>`, nothing real, here is what was inspected" proves the lap is going clean rather than going unrecorded.

## What counts as real

Loop-worthy: evidence-backed problems **this diff causes** that can plausibly cause wrong results, crashes, security exposure, data loss or corruption, broken compatibility, acceptance-criteria violations, or an unreliable required CI gate.

A defect the branch neither touches nor worsens belongs to another PR: log it as advisory and leave the code alone. Fixing it here grows the diff every later leg has to review, and buries the change the PR was opened for.

Missing or incomplete test coverage is not a real finding by itself. Report coverage observations separately, classify a coverage-only leg as clean, and change nothing for them unless the user asks. If a gap exposes an actual wrong runtime outcome, the runtime defect is the finding and the missing test is supporting evidence.

Stop rather than churn on:

- Naming/style preferences and test-helper polish.
- States nothing produces. See the trigger test below; it is the one check a reviewer cannot argue you out of.
- Edge-case exhaustion in tests, and extra tests for behavior already covered at the right boundary.
- Hypothetical fault chains with no credible runtime path, and states already excluded by types.

Impact and plausibility decide, not whether a reviewer can imagine a scenario. Give extra scrutiny to high-impact boundaries (auth, persistence, destructive operations, concurrency) even when failure odds are low.

### The trigger test

Apply it **before** you read the failure mode, not after.

A reviewer's job is to describe a failure vividly, and a good one always will. Vividness is not evidence, and a concrete consequence says nothing about whether anything causes it. So before a finding survives step 3, write one line:

> **`<actor>` does `<action>`, and here is where that happens: `<pointer>`.**

The last clause is the entire test. It has to point at something that exists: a line in this repo, a line in a dependency, a documented platform or browser behaviour, a filed issue, a report from a user. "A host could", "an attacker might", "a caller may one day", "nothing stops the page from": these fill in nothing. They are the reviewer imagining an actor, and **a finding whose actor is imaginary is Rejected however concrete its consequence.** Write the rejection with the clause you could not fill, so the reviewer learns which half was missing.

The environment's posture, recorded once in the ledger, decides most findings:

- **Cooperative**: a page you share a document with, a framework you run inside, a CLI that invokes you, a library you call. It will re-render, remove, replace, reorder and race you, all by accident. Guard against that. It will not go looking for your DOM to reparent into an iframe, rewrite your stylesheet's rules through CSSOM, or mint an element under your id to impersonate you. Those need intent the environment does not have, and a defence against them is speculation wearing a threat model's clothes.
- **Adversarial**: untrusted input crossing a boundary you own. Here intent is the premise, and the trigger is satisfied by the boundary itself: anything a network client can reach is reachable whatever the UI exposes, because CORS and form validation gate browsers, not curl.

Most surfaces are cooperative.

### Fixes to speculation are not free

They cost a fix, its blast radius, the tests that pin it, and every later leg's attention, and they add surface that the next leg reviews as real code. A relay that fixed three imagined findings in a row produced exactly one genuine defect from them: the second fix's own comparison never matched, and reinstalled a stylesheet on every frame for two legs. That is the normal yield. Speculation does not merely waste a leg; it manufactures the next one's findings.

## Fixing

Step 4 in detail. The loop grades its own work on the next pass, so a fix that trades a reported bug for an unreported one reads as progress; this sequence makes that trade visible while it is still cheap to undo. Reviewer reports are evidence to investigate, not implementation briefs.

1. **Baseline before the first fix of a leg.** Run the project's checks (tests, typecheck, build, lint) and record what passes and what already fails. Pre-existing failures stay pre-existing and get reported, not folded into an unrelated fix.
2. **Reproduce before editing.** Trace the actor, trigger, and failing state yourself. A report that does not reproduce is Rejected with the exact path that prevents it. A fix that would grow beyond the PR is Deferred, its thread left unresolved. A reviewer's suggested fix is a proposal: implement at the ownership boundary that actually prevents the failure, and record meaningful divergence in the ledger and the thread reply.
3. **Publish** the reproduced finding as an inline thread, per "Publishing findings", before the code changes.
4. **Fix inline.** Make the smallest coherent change in the current worktree. Check callers, callees, shared state, permissions, persistence, concurrency, and external contracts. Add or update a test only when it protects stable externally observable behavior; otherwise keep the reproduction as proof.
5. **Re-run the baseline. Any check that went pass → fail is a regression**: revert and redesign the fix, because a regression is evidence the fix was wrong, not a new finding to schedule. Leave the check as it was. The one exception is a test that asserted the buggy behavior itself; say so in the commit message and the thread reply, with the reason the old assertion was wrong.
6. **Read the diff before committing.** Compare `git diff` with the pre-fix state, not with the reviewer's suggested patch: it fixes the reproduced failure and nothing else.

**Fixes are findings too.** From leg 2 onward, check whether a finding lands in code an earlier leg of this relay touched. If it does, the earlier fix is the defect; revisit its design instead of patching its output, or the loop converges on a tower of corrections to its own mistakes.

## Publishing findings

The ledger stays local: no relay summary, leg recap, or cumulative comment goes on the PR. Every comment goes through the **`gh-comment` skill**, attribution header included.

- **A reproduced finding** becomes its own inline diff thread against the reviewed head SHA, posted before the code changes. The body holds the stable finding ID, severity, concrete failure mode, and the shortest useful reproduction. Anchor it to the exact affected diff line, or to the nearest causative changed line with the affected location named in the body; a conversation comment is not a fallback. Record the thread ID in the ledger, so a retry replies instead of duplicating.
- **Rejected claims** are not findings and stay in the ledger.
- **After the fix is pushed**, reply in the thread with the fixing SHA, rationale, and verification, then resolve it. Deferred findings stay unresolved as visible blockers. If later evidence overturns a published finding, reply with the rejection evidence and resolve it rather than deleting history.

Text is the finding. Reach for an image only when a defect cannot be stated in words: a layout that breaks at a specific viewport, a wrong-looking render, an animation that never settles. Reproduce it in a desktop environment (a Chromium debug port, or the `codex-computer-use` skill), host the capture with the `upload-file` skill, and embed the URL; put the same URL in the ledger. A stack trace or diff gets pasted as text.

### Discussion thread mechanics

```bash
# List threads; act on isResolved: false, isOutdated: false
gh api graphql -f owner=OWNER -f repo=REPO -F number=N -f query='
  query($owner:String!,$repo:String!,$number:Int!){
    repository(owner:$owner,name:$repo){pullRequest(number:$number){
      reviewThreads(first:100){nodes{
        id isResolved isOutdated path line
        comments(first:20){nodes{author{login} body}}}}}}}'

# Reply, then resolve
gh api graphql -f threadId=ID -F body=@"$BODY" -f query='
  mutation($threadId:ID!,$body:String!){
    addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$threadId,body:$body}){comment{id}}}'
gh api graphql -f threadId=ID -f query='
  mutation($threadId:ID!){resolveReviewThread(input:{threadId:$threadId}){thread{isResolved}}}'
```

## Stop condition

All true for the latest pushed head, or the budget is spent:

- A full lap is clean: every provider in the lineup has reviewed a head no later leg changed, and none found anything real. A provider that reviewed an older head runs again. A coverage-only leg counts as clean; coverage never keeps the relay alive by itself.
- No actionable unresolved discussion threads remain.
- Required CI passes, or a failure is proven unrelated and reported as such.
- Every triggered bot reviewed the latest head and raised nothing real.
- The project's checks pass locally, with nothing regressed from the last baseline.
- The worktree and the pushed PR head agree.
- The acceptance criteria hold against the full cumulative diff, not just the last leg's changes.
- Behavior that depends on a real sandbox, browser, credential, deployment, or third-party integration has been smoke-tested there, or remains an explicit manual handoff. More static review legs do not substitute for that evidence.

## Final report

Stop and hand control to the user. Do not merge, approve, or advance the stack. Write the report from the ledger:

- Whether the relay ended clean or on budget, the final head SHA, PR and base branches, host and its evidence, lineup, and every leg and failed attempt in order with its verdict and score.
- Every finding, grouped by disposition: fixed; rejected with evidence; deferred; already fixed or superseded; advisory coverage observations; disputes left for the user, with both sides. Surface the **Rejected**, **Deferred**, and disputed groups explicitly: they are decisions made on the user's behalf without changing code, so they are the most likely to be wrong and the least likely to be noticed.
- For every real finding: the failure mode, its inline thread, which provider found it, the fixing SHA, affected files, and regression proof.
- Any regression introduced during the relay and how it was corrected, plus pre-existing failures left in place.
- The verification result: local checks, required CI, unresolved-thread count, bot opt-ins and results against the final SHA.
- Remaining risks and exact manual checks for anything automation could not prove, with expected results and failure signals; say so explicitly when none remain.
- For a bug class raised twice or more, one proposed fix at the source so review stops having to catch it: a lint rule, a check, or an `AGENTS.md` line. Propose it; it does not go in this PR.

End by asking the user to review and either merge or send corrections. This report is a user gate, not a progress update, even when every reviewer and check is clean.
