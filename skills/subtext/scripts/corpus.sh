#!/usr/bin/env bash
# Pull a repo's full issue and PR corpus, then print every explicit link, one per line.
# Usage: corpus.sh [owner/repo] [out-dir]
# Writes issues.json and prs.json to out-dir (a fresh temp dir by default) for jq queries.
set -euo pipefail

repo=${1:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}
out=${2:-$(mktemp -d "${TMPDIR:-/tmp}/subtext.XXXXXX")}
default=$(gh repo view "$repo" --json defaultBranchRef --jq .defaultBranchRef.name)

gh issue list -R "$repo" --state all --limit 1000 --json number,title,state,stateReason,author,createdAt,closedAt,labels,milestone,body,comments,reactionGroups,parent,subIssues,blockedBy,blocking,closedByPullRequestsReferences >"$out/issues.json"
gh pr list -R "$repo" --state all --limit 1000 --json number,title,state,author,createdAt,mergedAt,baseRefName,body,comments,closingIssuesReferences,files >"$out/prs.json"

echo "corpus: $out ($(jq length "$out/issues.json") issues, $(jq length "$out/prs.json") PRs, default branch $default)" >&2

jq -r --arg default "$default" --slurpfile prs "$out/prs.json" '
  def refs($n): [(.body // ""), (.comments[]?.body // "")] | join("\n")
    | [scan("(?<![\\w/])#([0-9]+)") | .[0] | tonumber] | unique | map(select(. != $n))[];
  ([$prs[0][].closingIssuesReferences[]?.number] | unique) as $prClosed |
  (.[] | .number as $n |
    (if .parent then "#\(.parent.number) parent-of #\($n)" else empty end),
    (.blockedBy.nodes[]? | "#\($n) blocked-by #\(.number)"),
    (if .stateReason == "DUPLICATE" or .stateReason == "NOT_PLANNED" then "#\($n) closed \(.stateReason | ascii_downcase)" else empty end),
    (if .state == "CLOSED" and .stateReason == "COMPLETED" and (.closedByPullRequestsReferences | length) == 0 and ($prClosed | index($n) | not) then "#\($n) closed-by-hand" else empty end),
    (refs($n) | "#\($n) mentions #\(.)")),
  ($prs[0][] | .number as $n |
    (.closingIssuesReferences[]? | "PR#\($n) closes #\(.number)"),
    (if .baseRefName != $default then "PR#\($n) targets \(.baseRefName) (\(.state | ascii_downcase))" else empty end),
    (refs($n) | "PR#\($n) mentions #\(.)"))
' "$out/issues.json"
