@AGENTS.md

## Claude Code mechanics

- The Agent/Workflow `model` parameter is **unversioned**: it accepts only `opus`, `sonnet`, `fable`, `haiku`, each resolving to the current release of that tier (`opus` is opus-5.5). For any other model or an exact model id, use T3's `delegate_task`.

## Computer use

- If computer use is helpful for completing or verifying work, use the `codex-computer-use` skill: it shells out to `gpt-6.1-sol:medium` via Codex.
