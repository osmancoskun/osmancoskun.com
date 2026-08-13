#!/usr/bin/env bash
# Generate gallery thumbnails from full-size images.
# Usage: ./scripts/gallery/generate-thumbs.sh [album-slug]
# Example: ./scripts/gallery/generate-thumbs.sh 2025-08-taurus-mountains

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SLUG="${1:-}"

if [[ -z "$SLUG" ]]; then
	echo "Usage: ${0##*/} <album-slug>" >&2
	echo "Example: ${0##*/} 2025-08-taurus-mountains" >&2
	exit 1
fi

FULL_DIR="$ROOT/static/gallery/$SLUG/full"
THUMB_DIR="$ROOT/static/gallery/$SLUG/thumbs"

if [[ ! -d "$FULL_DIR" ]]; then
	echo "Missing full images dir: $FULL_DIR" >&2
	exit 1
fi

mkdir -p "$THUMB_DIR"

shopt -s nullglob
files=("$FULL_DIR"/*.{jpg,jpeg,JPG,JPEG,png,webp})
shopt -u nullglob

if ((${#files[@]} == 0)); then
	echo "No images found in $FULL_DIR" >&2
	exit 1
fi

for src in "${files[@]}"; do
	base="$(basename "$src")"
	name="${base%.*}"
	out="$THUMB_DIR/${name}.jpg"

	magick "$src" \
		-resize 160x160^ -gravity center -extent 160x160 \
		-strip -sampling-factor 4:2:0 -quality 58 \
		"$out"

	echo "  $out"
done

echo "Done. ${#files[@]} thumbnail(s) in $THUMB_DIR"
