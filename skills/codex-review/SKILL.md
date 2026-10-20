---
name: codex-review
description: >-
  Get an independent code review from Codex (gpt-6.1-sol) through T3's delegate_task — uncommitted changes, a branch diff, a commit, or a specific implementation.
disable-model-invocation: true
---

# Codex Review

Use Codex as an independent reviewer when the user wants a second-pass review or when a change is broad enough that another perspective is useful. For small local checks, review directly — and read the code yourself either way. Treat Codex's output as evidence, not authority.

## Workflow

1. Identify the review target and the command that reproduces it: `git diff` plus `git status` for uncommitted changes, `git diff <base>...HEAD` for a branch, `git show <sha>` for a commit, or specific files.
2. Write the review prompt below, naming that command.
3. Launch it with `delegate_task`:

```json
{
  "task": "<review prompt>",
  "title": "Codex review: <target>",
  "role": "review",
  "mode": "async",
  "target": { "providerInstanceId": "codex", "model": "gpt-6.1-sol", "options": { "reasoningEffort": "high" } }
}
```

4. End your turn; the completion notification wakes you. The report is the task's final `summary` (`task_status`). Check `git status` afterwards.
5. Verify important claims against the code before presenting them.

- Use `gpt-6-astra` when the review needs its extra reach.
- Leave `isolation` unset so Codex reads the same checkout, uncommitted changes included.

## Review Prompt

Keep the prompt simple and self-contained — Codex needs no Claude-style scaffolding:

```text
You are a subagent. Don't run memo.

Review the changes shown by `<command>` for bugs, regressions, security issues, and requirement mismatches.

Prioritize findings over summary. For each finding include:
- severity
- file and line reference
- concrete failure mode
- suggested fix direction

Do not edit files, invoke skills, or delegate. If there are no substantive findings, say so and name what you inspected. List any changed behaviour that nothing proves separately, as advisory.
```

Keep "Do not edit files": the child has write access to the shared checkout, and sol is eager to start fixing what it reviews.

Add task-specific context when useful: requirements, risky areas, expected behavior, relevant tests, or files you are unsure about.

## Reporting Back

Before relaying a finding, inspect the cited code or diff enough to decide whether it is real. In the user-facing response, separate confirmed issues from unverified Codex suggestions. If Codex finds nothing, say that clearly and mention what review target it inspected.
