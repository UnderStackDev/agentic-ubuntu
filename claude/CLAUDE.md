# Shared rules for this machine

Applies to every project on this machine. This is the baseline: skills
(`architect-protocol`, `aura-ui`, `dev-handover` etc.) take precedence when in use,
as does the project's own `PROJECT RULES.md` / `CLAUDE.md`. When they clash, use
judgement and pick the best solution.

The user speaks Finnish; answer in Finnish.

## Working agreement

@~/.claude/rules/project-rules.md

## Ending a session

@~/.claude/rules/dev-handover.md

## UI

The UI of Aura apps follows `~/.claude/rules/aura-ui-manifesto.md` (Midnight Glass).
Read it before UI work.

## Machine

- Sign-off: *– Claude Ubuntu Linux*.
- sudo: always `sudo -A`; the password is asked in an askpass window (yad).
- These rules live in `~/Projects/agentic-ubuntu` and are symlinked here: edit them
  there and commit.
