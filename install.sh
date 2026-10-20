#!/usr/bin/env bash
# Copies the rules and skills of this repo into ~/.claude.
# Dry run by default; --apply copies. Existing files get a .bak copy first.
# settings.json is never touched: merge claude/settings.example.json by hand.
set -euo pipefail

repo="$(cd "$(dirname "$0")" && pwd)"
dest="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
apply=false
[[ "${1:-}" == "--apply" ]] && apply=true

place() {
  local src="$1" dst="$2"
  if ! $apply; then
    echo "would copy  $src → $dst"
    return
  fi
  mkdir -p "$(dirname "$dst")"
  [[ -e "$dst" ]] && cp -a "$dst" "$dst.bak"
  cp -a "$src" "$dst"
  echo "copied      $dst"
}

place "$repo/claude/CLAUDE.md" "$dest/CLAUDE.md"
for f in "$repo"/claude/rules/*.md; do
  place "$f" "$dest/rules/$(basename "$f")"
done
for s in "$repo"/skills/*/; do
  name="$(basename "$s")"
  if $apply && [[ -d "$dest/skills/$name" ]]; then
    rm -rf "$dest/skills/$name.bak"
    mv "$dest/skills/$name" "$dest/skills/$name.bak"
  fi
  place "${s%/}" "$dest/skills/$name"
done

$apply || echo "dry run: run with --apply to copy"
echo "next: merge claude/settings.example.json into $dest/settings.json by hand"
