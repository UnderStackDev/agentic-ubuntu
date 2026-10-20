# Shared rules for this machine

Applies to every project on this machine. This is the baseline: skills
(`architect-protocol`, `aura-ui`, `dev-handover` etc.) and their instructions take
precedence when in use, as does the project's own `PROJECT RULES.md` / `CLAUDE.md`.
When they clash, use judgement and pick the best solution.

## Absolute rules

@~/.claude/rules/project-rules.md

## Ending a session

@~/.claude/rules/dev-handover.md

## UI

The UI of Aura apps follows `~/.claude/rules/aura-ui-manifesto.md` (Midnight Glass).
Read it before UI work.

## Clarifications (user, 2026-10-19)

- **Sign-off:** *– Claude Ubuntu Linux*.
- **The approval requirement applies to the plan:** the plan is presented and approved
  before any code. After approval the plan is implemented in full, without asking
  permission for individual steps.
- **sudo:** always `sudo -A`; the password is asked in an askpass window (yad).

## Machine

- Work is done locally. No pushes or cloud services unless the user asks.
- Sources: `~/Projects/aura_radioplayer_2` (Architect Protocol v3.1, UI manifesto v2),
  copied 2026-10-19.
