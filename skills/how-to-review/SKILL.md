---
name: how-to-review
description: >-
  Use stage 1 every time you write, edit, or audit code. Use stages 2 and 3
  before you call a change done, and when the user asks you to review a diff or
  check that something works.
---

# How to review

Review starts at production. Not the environment, the act of producing the code.
The reviewer's question is "does this do the thing it was for", and the answer
lives in your head while you write it and nowhere afterwards. So the first
review pass happens at the keyboard, the second happens with the code running,
and the diff comes last.

Stage 1 runs every time you touch code, whether or not a review is coming.
Stages 2 and 3 run when you review, and they only pay off if stage 1 happened.
Jumping straight to stage 3 is reading text and calling it a review. To hand the
diff to an outside reviewer once you are done here, use `codex-review` or
`review-relay`.

## 1. Produce with the reason attached

Code that only explains itself can be checked against itself, never against its
purpose. Intent has to outlive the session that wrote it, so put it in writing
while you produce. It can live in five places, nearest to the code first:

1. The code. A name and a signature that state the job beat a comment restating
   the body.
2. The docstring on the export. What it is for, not what the body does.
3. A comment on a non-obvious choice: why this lock, why three retries, why this
   order. The obvious mechanism needs nothing.
4. The spec, PRD, or ADR the change implements.
5. The PR description and the issues it links.

Nearer is better, because it travels with the code. A reason that only lives in
a PR description is one refactor away from lost, and nobody reads it while
editing the function.

Often none of the five says anything, because the code predates the habit. Then
reconstruct the reason, cheapest source first:

1. `git log -p` and `git blame` on the lines. The commit that introduced them,
   and the PR that commit came from.
2. The tests. What they assert is what the code was for.
3. The callers. What the rest of the system needs from this thing.
4. The issue tracker, searched for the symbol name.

Write the reconstruction down where it was missing, and mark it as one: "Appears
to exist for X, per the test at Y." A stated guess in a docstring beats a reason
nobody has, and the next reader corrects it instead of repeating the
archaeology. Ask the author when one is reachable and the stakes are real, and
keep reviewing while you wait.

**Bound:** for every file you touched, you can state why it changed and point at
which of the five says so, or name your answer as a reconstruction. Where
nothing says it, write yours down at the nearest level that fits before you move
on.

## 2. Run it

A diff read in the abstract shows what the code says. Running it shows what it
does, and those differ exactly where the bugs are.

1. Start the thing that carries the change: the server, the CLI, the test suite.
   The `run` skill covers launching this project's app.
2. Exercise the new path yourself. Hit the route, call the function, click the
   button. If there is UI, look at it; `ui-review` covers visual QA.
3. Read the log while you do it. Errors and unexplained warnings are findings
   you get for free.
4. Then break it, adversarially. Empty input, huge input, wrong type, the same
   action twice fast, a missing permission, a dropped connection, the back
   button. You know where your code is thin. Go there first.

When the change has nothing to run, docs or config or types, the nearest
executable proof stands in: the type check, the linter, the built artifact, the
rendered page. Something has to tell you it works besides you reading it.

**Bound:** the log is clean, meaning zero errors and every surviving warning
explained, and you have watched the new behaviour happen. Fix what this stage
turns up before moving on; reading a diff you already know is broken wastes the
read. When something breaks and the cause is not obvious, switch to
`diagnosing-bugs`.

## 3. Read the diff

Now read it, hunting the failures a run cannot reach:

- Error paths you did not trigger. What happens when the call you stubbed
  actually fails?
- Ordering and concurrency. Two of these at once, out of order, retried.
- Resources. What opens and never closes, what grows without a bound.
- What you deleted. A removed line is invisible in a running app and loud in a
  diff.
- Trust boundaries. Input from a user or an external API, validated once at the
  edge.

**Bound:** every hunk accounted for. Walk `git diff` hunk by hunk and explain or
fix each one. A file you skimmed is a file you did not review.

## Code you did not write

Same three stages. Stage 1 becomes a read instead of a write, and you work the
five places from the far end: the linked issues, the PR description, the spec,
then down into the docstrings and the code. When they are silent, reconstruct as
above and say out loud what you reconstructed. An unstated guess grades the
wrong exam; a stated one gets corrected by whoever knows better.

Stages 2 and 3 are unchanged, and stage 2 matters more here, because you have no
memory of the code ever working.

## When you hand it off

Say what you ran, what you tried to break, what you found, and any intent you
had to reconstruct. "Tests pass" is not a review. "Ran the dev server, hit /invite with an expired token, got a 500,
fixed the null check at `auth.ts:88`" is.
