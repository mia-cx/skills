@AGENTS.md

## Subagents & delegation

- When orchestrating subagents, define each task with acceptance criteria and verify the output against them before accepting. See the `codex-subagents` skill for the workflow and exact commands.

## Picking the right models

Higher is better. Scores are Mia's judgement from use, checked against Artificial Analysis benchmarks. Intelligence runs from sonnet-5.5 at 7 to opus-5.5 at 9, spaced by the real gaps, with headroom for future releases. Re-score when a release changes the picture.

- **Cost**: what a task actually costs me, not per-token list price. A low token price means nothing when the model burns millions of tokens per request. Codex is no longer near-free: the subscription changed on 2026-09-29, so GPT work costs real money, gpt-6-astra especially.
- **Intelligence**: how hard a problem the model can handle unsupervised: its ceiling. Still always run at high reasoning effort (token efficiency); bridge the gap to the ceiling with tools, skills, and prompt engineering.
- **Reliability**: how reliably it hits its own ceiling from one run to the next.
- **Taste**: everything user-facing. UI/UX, copy, code quality and API design.

| model       | cost | intelligence | reliability | taste |
| ----------- | ---- | ------------ | ----------- | ----- |
| opus-5.5    | 5    | 9            | 9           | 9     |
| fable-5.1   | 2    | 8.6          | 9.5         | 9     |
| gpt-6-astra | 3    | 8.1          | 4           | 2     |
| gpt-6.1-sol | 8    | 7.8          | 7           | 2     |
| sonnet-5.5  | 7    | 7            | 9           | 7.5   |

How to apply:

- opus-5.5 is the default for everything: planning, implementation, UI, and review. It tops the intelligence column, just above fable-5.1, with the same taste. fable-5.1 is more intuitive: it finds the simpler, more elegant solution more often.
- These are defaults, not limits. You have standing permission to escalate: use cheaper models to gather information and try things first, and if the output doesn't meet the bar, redo the work with a smarter model without asking. Judge the output, not the price tag. Escalating costs less than shipping mediocre work.
- Bulk or mechanical work that nobody sees (clear-spec implementation, data analysis, migrations): gpt-6.1-sol, the cheapest model per task and smarter than sonnet-5.5. Verify its output against acceptance criteria, since it is less reliable. When the work touches anything user-facing, use sonnet-5.5 or opus-5.5 instead.
- Delegate for capability or parallelism, never to dodge cost: long idle loops like babysitting a PR are not worth handing to another model.
- Anything user-facing (UI, copy, API design) needs taste ≥ 7, which rules out the GPT models.
- Beyond bulk work, GPT models are for an independent second opinion on hard reasoning (reviews, debugging), not for building. gpt-6-astra finds the most robust, edge-case-aware solution, but not always the simplest or most elegant one, and it varies run to run: use it to stress-test a design, not to shape one. gpt-6.1-sol is a little less sharp and a little steadier. Verify either before acting on it.
- fable-5.1 is an explicit-request model only, rare even then: it drains usage limits about twice as fast. Reach for opus-5.5 instead.
- Never use Haiku.

Mechanics:

- GPT models are only reachable through the Codex CLI: `codex exec` / `codex review`. Pass `-m` and `-c model_reasoning_effort=...` explicitly; `~/.codex/config.toml` sets no default model. Use the `codex-subagents` skill; for work it doesn't cover (investigation, data analysis), run `codex exec -s read-only` directly with a self-contained prompt.
- Claude models run via the Agent/Workflow `model` parameter, but that parameter is **unversioned**: it accepts only `opus`, `sonnet`, `fable`, `haiku`, each resolving to the current release of that tier (`opus` is opus-5.5). Older point releases are not selectable through Agent/Workflow; use a mechanism that takes an explicit model id if one is ever needed.

Using GPT models inside workflows and subagents (the model parameter only takes Claude models, so use a wrapper):

- Spawn a thin Claude wrapper agent with `model: 'sonnet', effort: 'low'` whose prompt instructs it to shell out to codex via Bash with exactly the prompt it was handed, and return the report (use `schema` on the wrapper to get structured output back).
- Always label these agents with the real model as a prefix, e.g. `{label: 'gpt-6.1-sol:review-auth'}`: the workflow UI shows the wrapper's Claude model, so the label is the only indication of the real worker.
- Codex runs can exceed Bash's 10-minute timeout: pass an explicit timeout, or run in the background and poll for the report file.
- Parallel GPT implementation agents must use `isolation: 'worktree'` so codex edits don't collide in the shared checkout.
- Workflow token budgets only count Claude tokens; codex work is invisible to `budget.spent()` but still costs money, so count it yourself.

## Computer use

- If computer use is helpful for completing or verifying work, use the `codex-computer-use` skill: it shells out to `gpt-6.1-sol:medium` via Codex.
