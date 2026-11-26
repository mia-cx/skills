#!/usr/bin/env bash
# Generate or edit an image through CLIProxyAPI's OpenAI-compatible images endpoint.
set -euo pipefail

usage() {
	cat >&2 <<'EOF'
Usage:
  imagegen.sh "<prompt>" [-o OUT.png] [-i INPUT ...] [-m MODEL]

  -o OUT     where to write the PNG (default ./image-<timestamp>.png)
  -i INPUT   reference or source image; repeat for several. Any -i makes it an edit.
  -m MODEL   default gpt-image-2.5

Config (env wins):
  CPA_API_KEY    default: contents of ~/.config/cpa/api-key
  CPA_BASE_URL   default https://cpa.mia.cx
EOF
	exit 64
}

[[ $# -ge 1 && $1 != -* ]] || usage
prompt=$1
shift
out="image-$(date +%Y%m%d-%H%M%S).png"
model=gpt-image-2.5
inputs=()
while getopts ":o:i:m:" opt; do
	case $opt in
	o) out=$OPTARG ;;
	i) inputs+=("$OPTARG") ;;
	m) model=$OPTARG ;;
	*) usage ;;
	esac
done

KEY_FILE="${XDG_CONFIG_HOME:-$HOME/.config}/cpa/api-key"
key=${CPA_API_KEY:-$(cat "$KEY_FILE" 2>/dev/null || true)}
if [[ -z $key ]]; then
	echo "No CPA key: set CPA_API_KEY or write it to $KEY_FILE" >&2
	exit 78
fi
base="${CPA_BASE_URL:-https://cpa.mia.cx}"
base="${base%/}"

for f in "${inputs[@]}"; do
	[[ -f $f ]] || { echo "No such file: $f" >&2; exit 66; }
done

response=$(mktemp)
trap 'rm -f "$response"' EXIT

# Generation takes 15-20s; edits with several inputs take longer.
request=(curl -sS -m 300 -o "$response" -w '%{http_code}' -H "Authorization: Bearer $key")
if [[ ${#inputs[@]} -eq 0 ]]; then
	status=$("${request[@]}" "$base/v1/images/generations" -H 'Content-Type: application/json' \
		-d "$(jq -n --arg model "$model" --arg prompt "$prompt" '{model: $model, prompt: $prompt}')")
else
	form=(-F "model=$model" -F "prompt=$prompt")
	for f in "${inputs[@]}"; do form+=(-F "image[]=@$f"); done
	status=$("${request[@]}" "$base/v1/images/edits" "${form[@]}")
fi

if [[ $status != 200 ]]; then
	echo "CPA $status: $(jq -r '.error.message? // .error? // .' "$response" 2>/dev/null || cat "$response")" >&2
	exit 1
fi

mkdir -p "$(dirname "$out")"
jq -r '.data[0].b64_json' "$response" | base64 --decode >"$out"
echo "$out"
