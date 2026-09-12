# Fusion workers

Fusion uses a frontier lead for planning and review, and a sidekick for implementation. Each keeps its own context. They exchange briefs and results through Devin's built-in `sidekick` tool. This differs from launching two independent CLI workers or choosing an explore/general subagent profile. [Architecture](https://cognition.com/blog/local-fusion)

## Select the pair

Fusion requires a paid plan and CLI v3000.10.20 or newer. Interactive `/fusion` opens the lead, effort, sidekick, and fast-mode picker. Both models contribute to account usage at their respective rates; check `/session-stats` for actual usage and any current promotion. [Fusion docs](https://docs.devin.ai/cli/fusion)

Discover current SWE-2 pairs:

```bash
devin models list --format json |
  jq -r '.families[] | select(.slug == "fusion") | .variants[] |
    select(.model_uid | contains("-sidekick-swe-2-")) |
    [.model_uid, .label] | @tsv'
```

The tested pair is `fusion-gpt-6-astra-high-sidekick-swe-2-medium`. Its lead uses high effort; its SWE-2 sidekick uses medium effort. Preserve the user's requested lead and effort. Select a listed pair instead of constructing an ID from assumed naming conventions. Do not switch to Fable or a fast variant merely because the provider recommends it.

## Noninteractive launch

In v3000.10.21, `--model fusion-gpt-6-astra-high-sidekick-swe-2-medium` fails with `Unknown model`, although the ID appears in the model inventory. The bare `fusion` family is intended for the interactive picker. For unattended work, use the verified config route:

1. Create an initialized per-worker copy of the user's Devin config at `$RUN_DIR/config.json`. Preserve existing settings, imports, and permissions. Keep the copy private and outside source control.
2. Set `agent.model` and `agent.preferred_family_models.fusion` to the exact pair ID. Preserve other preferred-family entries. These are user-config settings, so do not put them in project `.devin/config.local.json`.
3. Use `--config` and omit `--model`. Give the worker the same project-local test-command grants as an ordinary implementation worker.

The relevant portion of the copied config is:

```json
{
  "agent": {
    "model": "fusion-gpt-6-astra-high-sidekick-swe-2-medium",
    "preferred_family_models": {
      "fusion": "fusion-gpt-6-astra-high-sidekick-swe-2-medium"
    }
  }
}
```

Run from the assigned workspace:

```bash
devin --config "$RUN_DIR/config.json" --permission-mode accept-edits \
  --respect-workspace-trust false --prompt-file "$TASK_FILE" \
  --export "$RUN_DIR/trajectory.json" -p \
  > "$RUN_DIR/stdout.log" 2> "$RUN_DIR/stderr.log" < /dev/null
```

The trust override is for the workspace the parent inspected and deliberately selected. This command leaves the user's global model default unchanged. Keep existing denials; configuring Fusion does not grant new permission to tools.

## Prompt and verify

Use this worker boundary:

> You are a subagent. Don't run memo. Fusion's built-in SWE-2 sidekick is authorized for this task. Do not spawn additional independent agents or CLI workers. Leave commits, pushes, and final integration to the parent.

Give the lead the desired result, file ownership, and required validation. Let it form the sidekick's brief and review the result. Do not add `subagents_enabled: false` or a blanket ban on delegation to this workflow. The sidekick needs the constraints of its assignment; do not assume it inherits the parent's entire conversation.

Verify the selected pair and the actual handoff from the transcript:

```bash
jq '{session_id, model: .agent.model_name,
  sidekick_handoffs: [.steps[]?.tool_calls[]? |
    select(.function_name == "sidekick")] | length}' "$RUN_DIR/trajectory.json"
```

A selected Fusion label alone does not prove the lead used the sidekick. Check the handoff and completion notification, then inspect the files and test results yourself. Tiny requests may not require delegation. As with ordinary print mode, exit zero is not sufficient proof of completion.

Resume the recorded ID using the same config and workspace, adding `--resume "$DEVIN_SESSION_ID"` to the command. Omit `--model` to preserve the pair. A different model in the config alone does not establish that a saved session switched pairs. For a new pair, start a fresh worker with a handoff.

## Local evidence

Checked on 2026-09-12 with `/Users/mia/.local/bin/devin`, v3000.10.21, in `/tmp/devin-fusion-check.5yNbXp`:

- The CLI rejected the exact Fusion UID passed through `--model` with exit 1.
- `/fusion` saved `agent.model` and `agent.preferred_family_models.fusion`. Those temporary global changes were restored after capturing the format.
- Session `literate-behavior`, launched through `--config`, reports `Fusion (GPT-6 Astra High Thinking + SWE-2 Medium)` in ATIF. Lead step metadata identifies `gpt-6-astra-high`.
- Its `sidekick` call delegated `clamp.mjs`. The sidekick reported a failing baseline, changed `return value` to a clamp expression, and reported both tests passing. The lead then read the implementation and tests to review the result.

The original run was interrupted during final verification, then resumed with the same per-worker config. The resumed session preserved the Fusion pairing and remembered `FUSION_RESUME_77a2`. Astra reran the tests and completed its report. The parent independently ran `node --test clamp.test.mjs`: 2 passed, 0 failed.

A separate ordinary session successfully switched from Sol to Astra using `--resume accessible-riverbed --model gpt-6-astra-high`, while retaining its prior token. This replaces the old v3000.4.25 restriction on model switching during resume.
