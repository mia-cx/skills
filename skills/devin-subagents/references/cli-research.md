# Devin CLI research

Checked 2026-09-12 against first-party web docs and bundled documentation for v3000.4.25.
The local checks below exercised separate CLI workers in a disposable workspace.
Bundled docs live at `/opt/homebrew/Caskroom/devin-cli/3000.4.25/share/devin/docs/`.

The Homebrew installation has since been removed. Current runtime validation uses `/Users/mia/.local/bin/devin`, v3000.10.21. See [fusion.md](fusion.md) for Fusion and the newly verified ability to change ordinary models during resume. The older version and paths below describe the original test, not the current installation.

## Local execution and sessions

The documented command is `devin [OPTIONS] [prompt]`.

| Need | Documented interface |
| --- | --- |
| Noninteractive turn | `-p` / `--print` |
| Prompt from disk | `--prompt-file <FILE>` |
| Model | `--model <MODEL>` / `DEVIN_MODEL` |
| Transcript | `--export <PATH>` writes ATIF after each turn |
| Resume one session | `--resume <SESSION_ID>` |
| Resume directory's latest | `--continue` |
| Discover sessions | `devin list --format json` |
| Account models | `devin models list --format json` |
| Authentication status | `devin auth status` |

Print mode fails in untrusted workspaces because it cannot display the trust prompt. The documented scripting override is `--respect-workspace-trust false`. Scope that override to the intended workspace.

The reference does not document a `--output-format` flag, final-answer JSON schema, stdin prompt protocol, or a standalone reasoning flag. Inspect actual output and exports before designing a parser. Use explicit session IDs when several workers share a directory. [Commands and flags](https://docs.devin.ai/cli/reference/commands)

## Models and reasoning

Short aliases such as `opus`, `sonnet`, `swe`, `codex`, and `gemini` track the newest family version. They are unsuitable for pinning an exact model. Model availability depends on the account and organization.

The docs explain interactive reasoning selection through `Alt+T` / `Opt+T`. They do not specify a separate noninteractive reasoning parameter. Select an exact reasoning variant only after confirming its identifier in the live model list and a session export. [Models](https://docs.devin.ai/cli/models)

## Instructions and skill discovery

Project-root `AGENTS.md` loads at session start. Nested instruction files load when the agent accesses that directory. Global instructions are documented at `~/.config/devin/AGENTS.md`; `AGENT.md` also works there. Devin additionally imports `~/.claude/CLAUDE.md`.

Neither the web rules page nor bundled `extensibility/rules.mdx` promises global discovery of `~/.agents/AGENTS.md`. Supply that file explicitly in a worker prompt unless local testing proves a configured bridge loads it. [Rules and AGENTS.md](https://docs.devin.ai/cli/extensibility/rules)

Global `~/.agents/skills/<name>/SKILL.md` discovery **is documented**. Supported project locations include `.agents/skills`, `.devin/skills`, and `.windsurf/skills`. Devin-native global skills also live under `~/.config/devin/skills`. [Skills overview](https://docs.devin.ai/cli/extensibility/skills/overview)

Use `devin skills paths`, `devin skills list`, and `devin skills show <name>` to inspect what this installation discovers. Rules have corresponding `paths`, `list`, and `show` commands. [Commands and flags](https://docs.devin.ai/cli/reference/commands)

Imports are enabled by default. `read_config_from.agents_standard` controls standard project rules; other provider keys control their imports. Existing config can change discovery. [Configuration import](https://docs.devin.ai/cli/reference/configuration/read-config-from)

## Permissions

- `normal` / `auto` automatically permits reads; shell commands and edits can prompt.
- `accept-edits` also permits workspace edits, but shell commands still prompt.
- `smart` can still prompt when its safety judgment rejects or cannot classify an action.
- `dangerous` / `bypass` / `yolo` automatically permits ordinary tool calls. Organization deny/ask rules still apply.
- The docs describe `autonomous` with `--sandbox`, but direct `edit`/`write` operations still prompt.

Do not equate print mode with unattended tool authorization. Confirm installed flags because bundled docs can describe options absent from local help. [Permissions](https://docs.devin.ai/cli/reference/permissions)

The sandbox isolates exec-tool processes. It is not a general isolation guarantee for every agent tool. macOS uses Seatbelt; Linux requires bubblewrap and socat. [Sandbox](https://docs.devin.ai/cli/sandbox)

## Devin's internal subagents

These differ from launching separate CLI workers. Internal subagents have independent conversations and do not inherit the parent's conversation history. General subagents inherit the parent's model; explore subagents use the configured default subagent model. Background subagents automatically deny tools that need fresh approval.

Custom profiles can pin a model. The spawning tool selects a profile, not an arbitrary model named in prose. [Subagents](https://docs.devin.ai/cli/subagents)

Skill frontmatter supports `model`, `subagent`, `agent`, `allowed-tools`, `permissions`, and `triggers`. Devin documents `triggers: [user]` for user-only invocation. Its reference does not promise Claude's `disable-model-invocation` compatibility. Subagent skills are experimental. [Creating skills](https://docs.devin.ai/cli/extensibility/skills/creating-skills)

## Local verification

The parent agent verified these points on 2026-09-12 using v3000.4.25:

- `devin skills paths` includes `/Users/mia/.agents/skills`.
- A new symlink connects `/Users/mia/.config/devin/AGENTS.md` to `/Users/mia/.agents/AGENTS.md`. `devin rules list` from `/tmp` then reports the global instruction file. This researcher independently checked the symlink.
- Model JSON exposes exact IDs at `.families[].variants[].model_uid`; reasoning variants have distinct IDs, such as `gpt-5-6-sol-medium`.

Runtime checks used `/tmp/devin-subagents-check.kODv3Q` and completed on 2026-09-12:

| Check | Observed result |
| --- | --- |
| Rules and skills | Session `accessible-riverbed` returned the marker present only in project `AGENTS.md`, the marker present only in the fixture skill, and `pnpm` from Mia's global rules. Its transcript records invocation of all four response skills and `fixture-signal`. |
| Exact Sol model | The same session's ATIF export reports `GPT-5.6 Sol Medium Thinking` for `gpt-5-6-sol-medium`. |
| Explicit resume | Resuming `accessible-riverbed` returned a token supplied only in its prior turn. Passing `--model gpt-6-astra-high` emitted a warning that resume ignores the model flag and retained Sol. |
| Exact Astra model | A fresh session, `clean-scilla`, returned `ASTRA_OK`; its ATIF export reports `GPT-6 Astra High Thinking`. |
| Edit and test | Session `feather-title`, using `claude-opus-5-high` and `accept-edits`, changed subtraction to addition through `edit`, then ran `node --test sum.test.mjs` through `exec`. The parent independently reran the test: 1 passed, 0 failed. |
| Permission failure | Sandboxed session `gratis-catshark` rejected the edit and exited zero with an unfinished final response. Explicit write grants in alternate and project-local configs did not resolve it. Switching to `accept-edits` succeeded. |
| Skill discovery | `devin skills show devin-subagents` finds the new skill under `~/.agents/skills`, with both user and model triggers. The skill-creator validator passes. |

The fixture implementation used a project-local `Exec(node --test)` grant. A matching workspace write grant was also present. See [permissions.md](permissions.md) for the operational distinction between permission modes and the sandbox.

The first alternate config triggered setup, including an approximately 92-second cloud-bridge wait. Subsequent turns using that initialized config started promptly. These observations are installation snapshots, not guarantees for another machine or release.
