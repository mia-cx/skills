#!/usr/bin/env bash
# Poll a pull request and print one line per event worth a babysit tick:
#   comment <id> <login>: <first line>   new or edited conversation comment
#   inline  <id> <login> <path>:<line>   new or edited inline review comment
#   review  <id> <login> <STATE>         submitted review with a body or verdict
#   checks  <name: state, ...>           completed CI checks changed
#   head    <sha>                        the PR head moved
#   merged | closed                      terminal; the script exits
# Comments carrying the gh-comment attribution header are skipped so the
# caller's own posted replies never trigger a tick. Everything else, including
# what the user types by hand, comes through.
#
# Polling backs off: BASE seconds, doubling to MAX while nothing happens, reset
# to BASE by any event. After the head moves it first waits the slowest bot's
# last measured review latency on this PR, so a later round does not re-poll
# at the short rate while the bots are still reading. The measurement lives
# only for this run.
#
# Usage: watch.sh OWNER/REPO PR_NUMBER [BASE_SECONDS=60] [MAX_SECONDS=900]
set -u

repo=$1
n=$2
base=${3:-60}
max=${4:-900}

command -v gh >/dev/null || { echo "watch.sh: gh CLI not found; install it from https://cli.github.com" >&2; exit 2; }
gh auth status >/dev/null 2>&1 || { echo "watch.sh: gh is not authenticated; run gh auth login" >&2; exit 2; }
mine='(.body // "" | test("commenting on behalf of") | not)'
since=$(date -u +%Y-%m-%dT%H:%M:%SZ)
checks=""
head=""
interval=$base
pushed_at=$(date +%s)
learned=0

while true; do
  now=$(date -u +%Y-%m-%dT%H:%M:%SZ)

  events=$(
    gh api "repos/$repo/issues/$n/comments?since=$since" --jq \
      ".[] | select($mine) | \"comment \(.id) \(.user.login): \(.body | split(\"\n\")[0])\"" 2>/dev/null
    gh api "repos/$repo/pulls/$n/comments?since=$since" --jq \
      ".[] | select($mine) | \"inline \(.id) \(.user.login) \(.path):\(.line // .original_line)\"" 2>/dev/null
    gh api "repos/$repo/pulls/$n/reviews" --jq \
      ".[] | select(.submitted_at >= \"$since\" and $mine and (.state != \"COMMENTED\" or .body != \"\")) | \"review \(.id) \(.user.login) \(.state)\"" 2>/dev/null
  )

  pr=$(gh pr view "$n" -R "$repo" --json state,headRefOid,statusCheckRollup 2>/dev/null) || { sleep "$interval"; continue; }

  state=$(jq -r .state <<<"$pr")
  case $state in
    MERGED) echo merged; exit 0 ;;
    CLOSED) echo closed; exit 0 ;;
  esac

  cur=$(jq -r '[.statusCheckRollup[]
    | select(.status == "COMPLETED" or .state != null)
    | select(.conclusion != "SKIPPED")
    | "\(.name // .context): \(.conclusion // .state)"] | unique | join(", ")' <<<"$pr")
  [ -n "$cur" ] && [ "$cur" != "$checks" ] && events+=$'\n'"checks $cur"
  checks=$cur

  h=$(jq -r .headRefOid <<<"$pr")
  if [ -n "$head" ] && [ "$h" != "$head" ]; then
    events+=$'\n'"head $h"
    pushed_at=$(date +%s)
    # Bots review the new head: wait roughly as long as they took last round.
    interval=$(( learned * 3 / 4 > base ? learned * 3 / 4 : base ))
  fi
  head=$h

  events=$(sed '/^$/d' <<<"$events")
  if [ -n "$events" ]; then
    echo "$events"
    # A bot event this round: remember how long it took since the push.
    grep -q '\[bot\]' <<<"$events" && learned=$(( $(date +%s) - pushed_at ))
    grep -q '^head ' <<<"$events" || interval=$base
  else
    interval=$(( interval * 2 < max ? interval * 2 : max ))
  fi

  since=$now
  sleep "$interval"
done
