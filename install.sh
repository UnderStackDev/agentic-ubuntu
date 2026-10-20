#!/usr/bin/env bash
# Puts the rules and skills of this repo into ~/.claude.
#   (no flag)  dry run: show what would happen
#   --apply    copy the files
#   --link     symlink them, so this repo stays the only source
# Existing files and dirs are moved to ~/.claude/backups/<timestamp>/ first
# (not left as .bak next to them: a skills/x.bak dir would load as a duplicate skill).
# settings.json is never touched: merge claude/settings.example.json by hand.
set -euo pipefail

repo="$(cd "$(dirname "$0")" && pwd)"
dest="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
mode="${1:-dry}"
backup="$dest/backups/$(date +%Y%m%d-%H%M%S)"
case "$mode" in dry|--apply|--link) ;; *) echo "usage: $0 [--apply|--link]" >&2; exit 2 ;; esac

place() {
  local src="$1" dst="$2"
  if [[ "$mode" == dry ]]; then
    echo "would place  $src → $dst"
    return
  fi
  if [[ -L "$dst" && "$(readlink "$dst")" == "$src" ]]; then
    echo "already      $dst"
    return
  fi
  mkdir -p "$(dirname "$dst")"
  if [[ -e "$dst" || -L "$dst" ]]; then
    mkdir -p "$backup/$(dirname "${dst#"$dest"/}")"
    mv "$dst" "$backup/${dst#"$dest"/}"
  fi
  if [[ "$mode" == --link ]]; then ln -s "$src" "$dst"; else cp -a "$src" "$dst"; fi
  echo "placed       $dst"
}

place "$repo/claude/CLAUDE.md" "$dest/CLAUDE.md"
for f in "$repo"/claude/rules/*.md; do
  place "$f" "$dest/rules/$(basename "$f")"
done
for s in "$repo"/skills/*/; do
  place "${s%/}" "$dest/skills/$(basename "$s")"
done

[[ "$mode" == dry ]] && echo "dry run: use --apply to copy or --link to symlink"
echo "next: merge claude/settings.example.json into $dest/settings.json by hand"
