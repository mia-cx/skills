# Permissions for local workers

`-p` runs one turn without a terminal. Calls needing approval are rejected rather than answered interactively. Choose permissions before launching.

## Implementation

Use an isolated worktree and `--permission-mode accept-edits`. Workspace edits auto-approve. Merge only the required command grants into `.devin/config.local.json`, preserving existing settings and denials. For the verified Node test fixture:

```json
{
  "permissions": {
    "allow": ["Exec(node --test)"]
  }
}
```

Replace the command with the actual approved test/build command prefix. Keep the file local and exclude it from commits. Do not overwrite an existing configuration. When the worker is done, remove only the grants you added if this workspace will be reused.

This permission mode is not OS isolation. Commands execute locally with the user's access. A separate worktree prevents overlapping edits, but does not constrain commands to that worktree.

## Sandbox limitation in v3000.4.25

`--sandbox` uses Seatbelt on macOS and selects Autonomous mode, ignoring `--permission-mode accept-edits`. It bounds exec-tool writes, but direct `edit` and `write` tools still require approval.

Local tests rejected direct edits even with a matching `Write(...)` grant in an alternate `--config` file and then in project-local config. The same edit and test passed with `accept-edits` and no sandbox. Do not promise unattended direct editing under `--sandbox` in this version. If OS isolation is required, treat this as an unresolved limitation rather than silently changing modes.

## Investigation without writes

`auto` approves reads but honors existing permission grants. For enforced tool restrictions, merge these denials into an isolated workspace's `.devin/config.local.json`:

```json
{
  "permissions": {
    "deny": ["Write(/**)", "edit", "write", "exec", "mcp__*"]
  }
}
```

This disables shell execution too. Use file tools for inspection. If the review needs shell commands or tests, grant those commands in a separate no-edit workflow and verify the diff. That workflow is not an OS-enforced read-only sandbox.

Tell ordinary workers not to spawn additional agents. For Fusion, explicitly permit its built-in sidekick while keeping independent workers out of scope. `subagents_enabled: false` is documented as a user setting; do not add it to the Fusion workflow.

## Other modes and failures

- `accept-edits` allows workspace edits but shell commands can still prompt.
- `smart` also auto-runs commands judged safe, but can reject unattended calls.
- `dangerous` auto-approves ordinary tools without the sandbox's limits. Do not switch to it merely to recover from a denied call.

Read the denied operation, provide the smallest authorized grant, then resume the recorded session. Inspect the final answer and artifacts even when the process exits zero.

First-time setup can write settings and delay print startup. In the local test, a fresh alternate config waited about 92 seconds while setting up a cloud bridge before local execution began. Later turns reused the initialized config. Diagnose from the current process's file under `~/.local/share/devin/cli/logs`; do not infer a stuck inference request from silence alone.

Sources: [Permissions](https://docs.devin.ai/cli/reference/permissions), [Sandbox](https://docs.devin.ai/cli/sandbox), [Configuration](https://docs.devin.ai/cli/reference/configuration/config-file). Local test evidence is in [cli-research.md](cli-research.md).
