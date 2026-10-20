---
name: aura-context
description: Use this ALWAYS when starting work in any Aura ecosystem app repo (Notebook, Sonara, RadioPlayer, Skint, TV, News, Hub, etc.), when continuing an earlier session, or when the user asks to update the handover report. Applies equally on every machine (Ubuntu, Fedora) and to every agent.
---

# Aura context: many machines, many agents

## First things first

Aura is not one machine's project. The same repo is worked on from different
machines, by different agents, in different sessions. **This machine's state,
specs and auto-memory are not relevant to the project**: they don't travel with
the repo and the next agent on another machine never sees them. Don't spend time
or tool calls on:

- working out this machine's OS, packages or environment "for context", unless the
  task at hand needs it
- filling this machine's auto-memory with project facts; the next session may be on
  another machine
- guessing the project state from memory or feel

## The only sources of truth: these files + GitHub Issues

Read at the start of every session, before anything else:

1. **`PROJECT RULES.md`** (Working Agreement v4): roles, flow, reports, code,
   git. The user owns the problem, the requirements and the UI/UX; the agent owns
   the code within the agreement. Plan → approval → full implementation.
2. **`.ai_context_state.md`**: the previous session's handover: what was done,
   what is blocked, the next step, the invisible rules.
3. **`PLAN.md`**, if present: the approved plan and the user's decisions.
4. **`AURA_UI_MANIFESTO.md`**: only when the task touches the UI/frontend.
5. **Open GitHub Issues** (`gh issue list`), including comments: the persistent
   log and the channel between machines and agents.

If one of these files is missing, don't assume or invent its contents; ask the
user.

## Updating the report

When the user asks for it, ends the session or says work continues later or on
another machine: overwrite `.ai_context_state.md` in the Dev_Handover format
(Project Identity & Environment incl. active issue, State of Architecture,
Execution Snapshot, Logic & Hidden Context, Immediate Next Step) and commit it.
Goal: the next agent, on any machine, gets the state in one read.

## Summary

Context = the git repo (these files + issues). Not this machine's memory, feel or
specs.
