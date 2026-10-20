---
name: dev-handover
description: >
  Write the session snapshot `.ai_context_state.md` in the project root (Dev_Handover
  Protocol). Use when the user ends the session or says work continues later —
  "lopetetaan", "jatketaan huomenna", "jatketaan myöhemmin", "riittää tältä päivältä",
  "tallenna tila" — and at the start of a session in a project that has
  `.ai_context_state.md`, to read it first.
---

# Dev handover

Goal: the next session (any agent) gets the state in ~500–1000 tokens instead of
re-reading the codebase. Full protocol: `~/.claude/rules/dev-handover.md`.

**Session start:** if the project root has `.ai_context_state.md`, read it (and
`PROJECT RULES.md`, `PLAN.md` if present) before anything else, then the open
issues with comments (`gh issue list`).

**Session end:** overwrite `.ai_context_state.md` with the current state. Keep it
terse; facts, paths and commands, no prose. Then commit it with the work (local
commit, no push unless asked).

```markdown
# Dev Handover — <project> (<YYYY-MM-DD>)

## 1. Project Identity & Environment
- Project: <name>
- OS: Linux (Ubuntu 26.10, GNOME 51, Wayland, zsh)
- Last commit: <short hash> <subject>
- Active issue: <#number title, or "none">
- Critical paths: <dirs/files>

## 2. State of Architecture
- Active module: <file/module edited last>
- Key dependencies: <new libs / critical versions>
- Global state: <settings, env, storage keys that affect the whole app>

## 3. Execution Snapshot
- Last successful command: `<exact command>`
- Current blocker/error: <exact message, or "none">
- Pending refactors: <what is ugly or needs attention>

## 4. Logic & Hidden Context
- Invisible rules: <what must not be changed and why>
- Decision log: <choice X over Y — why> (stops rejected ideas coming back)

## 5. Immediate Next Step
- Target: <the first atomic task of the next session>

– Claude Ubuntu Linux
```
