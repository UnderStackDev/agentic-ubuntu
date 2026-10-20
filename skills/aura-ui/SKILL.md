---
name: aura-ui
description: >
  The Aura "Midnight Glass" visual language (UI manifesto v2): dark glass panels,
  Soft Lilac #B6A1E5 accent, Catppuccin Mocha fallback colours, button classes,
  typography and icon policy. Use whenever building, styling or reviewing the UI of
  an Aura app or any of the user's own apps (Tauri, browser extension pages, GNOME
  extension popups, HTML/CSS): new screens, buttons, modals, lists, colours, fonts.
  Finnish triggers: "käyttöliittymä", "UI", "ulkoasu", "tyyli", "nappi", "värit".
---

# Aura UI — Midnight Glass

Read `manifesto.md` in this skill's folder before writing UI. It is the canonical
copy (same as `~/.claude/rules/aura-ui-manifesto.md` and the Aura repos).

The rules that are broken most often — check these every time:

- Interactive buttons are only `btn-accent` / `btn-ghost` / `btn-danger`, all with
  transparent backgrounds. Solid `var(--soft-lilac)` only on small static
  indicators (badge, dot, today, toggle).
- Canonical variable names (`--midnight`, `--glass`, `--glass-border`,
  `--soft-lilac`, `--accent-glow`, `--text-main`, `--text-muted`); don't invent
  `--accent`, `--bg-primary` etc.
- List items get the gradient `::before` accent line, never `border-left`.
- Lucide icons only on action buttons, never as decoration in data rows.
- Scrollbars hidden; font stack Segoe UI Variable / Inter / Ubuntu / Cantarell.
- UI text in English unless the app says otherwise.

GNOME Shell (St) CSS supports no `backdrop-filter`, CSS variables or `::before`:
keep the palette, radii and button logic, and approximate the glass with an opaque
`rgba` background. Use judgement there rather than forcing web CSS.
