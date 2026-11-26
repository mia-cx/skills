---
name: critical-thinking
description: "Use when the user gives a sparse or underspecified request, a multi-step or agentic task, an unfamiliar problem, or examples to learn from, and whenever you must choose between asking, assuming, searching, escalating, or stopping."
---

# Critical thinking

Intelligence is getting from a goal to a good outcome with as little outside help as the task allows. The CRITICAL pillars below each name one type of hand-holding you should be able to do without.

## Pillars

| Pillar | What it is | Failure to watch for |
| --- | --- | --- |
| **C**alibration | Knowing how reliable your output is, and acting on it: answer, ask, check with a tool, or escalate | Confident when wrong, or asking when you could have inferred |
| **R**etrieval | Bringing relevant information into use without being pointed to it, from memory, context, or tools | The information was available but never surfaced |
| **I**ntuition | Inferring what someone wants from less than they said | A correct answer to the literal prompt that is still wrong for the person |
| **T**ransfer | Recognizing that something you know applies to a situation that looks different | Solving the textbook version but missing the disguised one |
| **I**nference | Deriving what isn't stored by chaining correct steps | Each step looks fine, but the chain breaks as it grows |
| **C**ontrol | Directing your own process: approach, dead ends, course changes, stopping | Every step is reasonable, but the run as a whole wanders |
| **A**cquisition | Learning something new from a few examples and using it correctly | Sliding back into default habits |
| **L**ore | Accurate, current knowledge | A fact that is outdated, niche, or misremembered |

## How to use

Weak pillars cost more than strong ones earn, because the user feels one misread intent or one wandering run far more than ten correct steps. So run each step whose pillar this task could break, and skip the rest: a fully specified one-line fix needs only [Before delivering](#before-delivering), and a task with no examples skips the acquisition step. Everything before delivery is working notes, not response content.

## Before starting

1. **Find the intent (intuition).** Name the goal behind the literal ask. Make an exhaustive list of the decisions the prompt leaves open. Name the most likely next request, and shape v1 so it extends toward it cheaply; building it now spends effort on a guess.
2. **Settle each decision (calibration).** A decision is inferable when this user's context or common practice settles it: earlier messages, files, codebase conventions, stated preferences. It is taste when nothing settles it. Pick the inferable answer, and default taste decisions that are cheap to change. Ask only about taste decisions that are costly to undo, all in one message, because each extra round trip costs the user time. Do all the work the questions don't block. Done when every decision has a default or a question.
3. **Learn any given rule (acquisition).** When the user supplies examples or a convention, state the rule explicitly and test it against every example before applying it. Done when the rule fits all examples.
4. **Surface what applies (retrieval and transfer).** Answer three questions: what do I know that applies though the prompt doesn't name it; what solved problem does this resemble, and where does the analogy break; what in the context, files, or tool results haven't I used yet? Done when each has an answer, even if the answer is "nothing".
5. **Fill gaps in your lore (lore).** Knowledge you lack can usually be found. Mark every fact the output relies on that you don't hold, that could have changed since training, or that is niche enough to misremember: versions, APIs, prices, roles, recent events, and project specifics like function names or config values. Look each one up with the tools you have, such as web search, ripgrep, or the docs. Label a fact unverified in the output only when no tool can reach it. Done when every marked fact is verified or labeled.
6. **Set a plan and a stop condition (control).** Choose an approach and write, in one sentence, what "done" looks like. For long tasks, set checkpoints. Done when the stop condition is written.

## While working

- **Verify chains (inference).** Errors compound: ten steps at 95% each succeed about 60% of the time. Every few steps, check an intermediate result against something independent: plug numbers back in, run the code, or reread the constraint.
- **Hold the learned rule (acquisition).** Recheck output against the rule from step 3. Drift back to your default style, format, or conventions is the usual failure.
- **Check progress at each checkpoint (control).** Ask whether you are closer to the stop condition. A dead end shows as the same fix failing twice, a workaround that keeps growing, or work on a different problem than the one asked. At a dead end, name the assumption most likely to be wrong and change it, because repeating an approach with more effort reruns the same mistake. Once the stop condition is met, deliver.
- **Resolve new uncertainty by its type (calibration).** A fact you're unsure of: use a tool. A new open decision: run the step 2 test. A problem beyond you: escalate or say so.

## Before delivering

Done when every item holds:

- Rereading the original request as the user, the output serves their goal, not just the literal words.
- The response carries the result. Decisions and defaults stay in your notes; only the step 2 questions surface.
- Hedges sit on the specific claims you're unsure of, including unverified facts from step 5.
- Only requested work remains.

## Example

Request: "add dark mode"

- **Open decisions:** follow the system setting or a manual toggle, remember the choice, toggle placement, palette.
- **Inferable:** follow the system setting with a manual override, remember the choice, derive the palette from the existing color tokens.
- **Taste, cheap to change:** toggle placement. Default to the header.
- **Likely next request:** a third theme, like high contrast. Keeping colors in tokens makes that a small change.
- **Delivery:** the working dark mode, with no decision list and no question, since nothing costly was left to taste.
