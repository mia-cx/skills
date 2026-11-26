#!/usr/bin/env bash
# Voice a spoken script with ElevenLabs.
# Usage: speak.sh <script.txt> <out.mp3>
# Blank-line-separated paragraphs are batched into requests of at most MAX_CHARS characters,
# and the returned MP3 segments are concatenated in order.
set -euo pipefail

in=$1 out=$2
MAX_CHARS=2500

if [ -z "${ELEVENLABS_API_KEY:-}" ] && [ -f ~/.config/elevenlabs/env ]; then
  # shellcheck disable=SC1090
  . ~/.config/elevenlabs/env
fi
: "${ELEVENLABS_API_KEY:?set ELEVENLABS_API_KEY or write it to ~/.config/elevenlabs/env}"
voice=${ELEVENLABS_VOICE_ID:-JBFqnCBsd6RMkjVDRZzb} # premade "George"
model=${ELEVENLABS_MODEL:-eleven_v4}

tmp=$(mktemp -d "${TMPDIR:-/tmp}/signal-voice.XXXXXX")
trap 'rm -rf "$tmp"' EXIT

awk -v RS= -v max="$MAX_CHARS" -v dir="$tmp" '
  { if (chunk != "" && length(chunk) + length($0) > max) { flush() } chunk = chunk (chunk == "" ? "" : "\n\n") $0 }
  END { flush() }
  function flush() { if (chunk == "") return; f = sprintf("%s/%04d.txt", dir, ++n); printf "%s", chunk > f; close(f); chunk = "" }
' "$in"

: >"$out"
for f in "$tmp"/*.txt; do
  # High stability and zero style keep the read even and matter-of-fact.
  jq -Rs --arg model "$model" \
    '{text: ., model_id: $model, voice_settings: {stability: 0.8, similarity_boost: 0.9, style: 0}}' "$f" |
    curl -sSf "https://api.elevenlabs.io/v1/text-to-speech/$voice?output_format=mp3_44100_128" \
      -H "xi-api-key: $ELEVENLABS_API_KEY" -H 'Content-Type: application/json' --data-binary @- >>"$out"
done
