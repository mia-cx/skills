---
name: devin-subagents
description: Use when delegating work through the local Devin CLI, including Fusion lead/sidekick pairs and resuming workers.
---

# Devin subagents

Run a separate local Devin CLI session for a bounded task. This uses Devin's account and model access. It does not launch a Devin Cloud workspace.

## Choose the model

```bash
devin --version
devin auth status
devin models list --format json |
  jq -r '.families[] | .variants[] | [.model_uid, .label] | @tsv'
```

Use the user's requested model and effort. Select an exact `model_uid` from this account's current inventory. IDs encode reasoning effort, such as `gpt-6-astra-high`, `gpt-5-6-sol-medium`, and `claude-opus-5-high`. There is no separate reasoning flag. Family aliases such as `opus` can change their targets.

Resume keeps the saved model unless you select another. In v3000.10.21, `--model` can switch a resumed session; v3000.4.25 ignored it. Check installed help when supporting older versions. Do not substitute an unavailable model silently.

For a frontier lead paired with a SWE-2 implementation sidekick, use [fusion.md](references/fusion.md). Fusion needs its own launch route in v3000.10.21: listed composite IDs fail through `--model` but work through a per-worker config. Keep the pair inside one Devin worker; let Fusion manage the sidekick.

## Instructions

Devin discovers `~/.agents/skills` automatically. It reads project-root `AGENTS.md` at startup and discovers nested rules when accessing their directories.

Global rules load from `~/.config/devin/AGENTS.md`, not directly from `~/.agents/AGENTS.md`. Mia's installation links the former to the latter. Verify with `devin rules list` and `devin rules show AGENTS` from the target workspace. Check skill discovery with `devin skills show <name>`.

On another installation, explicitly tell the worker to read `~/.agents/AGENTS.md` if that bridge is absent. Preserve any existing global rules when configuring a bridge.

Write the task to a file with the file-writing tool. Include the workspace, owned files, acceptance criteria, and required validation. Start the prompt with:

> You are a subagent. Don't run memo. Do not spawn more agents. Leave commits, pushes, and final integration to the parent.

For Fusion, replace "Do not spawn more agents" with "Fusion's built-in sidekick is authorized; do not spawn additional independent agents or CLI workers." Include the same ownership and completion criteria for the whole pair.

For investigation, explicitly request findings without edits. Invoke only task-relevant skills; discovery does not mean their bodies are already loaded.

## Dispatch

Run from the intended workspace. Give parallel implementation workers separate worktrees and separate artifact directories.

For investigation, use `--permission-mode auto`. It permits ordinary reads but is not a read-only sandbox: existing grants can permit writes. For explicit tool denials, see [permissions.md](references/permissions.md).

```bash
devin --model "$DEVIN_TASK_MODEL" --permission-mode auto \
  --prompt-file "$TASK_FILE" --export "$RUN_DIR/trajectory.json" -p \
  > "$RUN_DIR/stdout.log" 2> "$RUN_DIR/stderr.log" < /dev/null
```

For implementation, grant the required test commands in project-local permissions as described in [permissions.md](references/permissions.md), then run:

```bash
devin --model "$DEVIN_TASK_MODEL" --permission-mode accept-edits \
  --prompt-file "$TASK_FILE" --export "$RUN_DIR/trajectory.json" -p \
  > "$RUN_DIR/stdout.log" 2> "$RUN_DIR/stderr.log" < /dev/null
```

Set the variables to paths and an exact model ID before dispatch. Keep dynamic task text inside the prompt file, outside shell syntax. Place artifacts outside owned source files.

Print mode cannot display workspace trust prompts. For a workspace the parent has inspected and intentionally selected, add `--respect-workspace-trust false`. This skips the trust prompt only.

Await process completion using the host's completion notification or blocking process wait. A yielded session handle means it is still running. Keep the same process; do not launch duplicate workers while waiting.

## Verify and resume

An exit code of zero does **not** prove completion. Print mode can reject a required tool, export an unfinished turn, and still exit zero. Read stderr, the final response, and the actual changed files or test results.

The export is an ATIF transcript, not a final-answer JSON envelope. Extract the session ID and selected model without dumping its full prompt and tool definitions:

```bash
jq '{session_id, model: .agent.model_name}' "$RUN_DIR/trajectory.json"
```

Resume the recorded ID from the same workspace, retaining the appropriate permissions:

```bash
devin --resume "$DEVIN_SESSION_ID" --permission-mode auto \
  --prompt-file "$FOLLOWUP_FILE" --export "$RUN_DIR/followup.json" -p \
  > "$RUN_DIR/followup.stdout.log" 2> "$RUN_DIR/followup.stderr.log" < /dev/null
```

Use `--permission-mode accept-edits` for an implementation follow-up. Add the trust override only under the same condition as the initial run. Avoid `--continue` when multiple workers share a directory; it selects the most recent session. Recover IDs with `devin list --format json`.

Accept the worker's result only after checking its acceptance criteria. Correct incomplete work with a focused follow-up. Keep parent-owned integration outside the worker's scope.

For Devin's internal subagent profiles, configuration details, first-party sources, or local verification evidence, read [cli-research.md](references/cli-research.md). Internal profiles select models differently from these separate CLI workers.
