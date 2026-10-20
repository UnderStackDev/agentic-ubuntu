---
name: architect-protocol
description: >
  How to plan and write code in the user's projects (Aura apps, Tauri, GNOME
  extensions, browser extensions, scripts — any language). Use before planning a
  feature, refactor or fix, before writing or changing code, and when an error needs
  fixing. Finnish triggers too: "tee", "korjaa", "lisää ominaisuus", "suunnitelma",
  "refaktoroi", "toteuta". Turns the Working Agreement v4 into a working routine:
  plan → approval → full implementation, small modules, honest errors, plain-language
  reports.
---

# Working Agreement in practice

Full text: `~/.claude/rules/project-rules.md` (Working Agreement v4). A project's
own `PROJECT RULES.md` wins over it; this skill wins over both where they clash,
and within it use judgement.

## Who decides

The user owns the problem, the requirements and the UI/UX, and doesn't read code.
You own the code: decide technical details yourself and explain them in plain
language. Ask only about what the user sees, how the app behaves, big new
libraries or architecture turns, and anything that leaves the machine.

## Flow

1. **Plan first.** For anything beyond a trivial fix, present a short plan: what
   changes for the user, which files, the interface (input/output) of new modules,
   risks. Wait for approval.
2. **Approved = go.** Implement the whole plan without asking permission for
   individual steps.
3. **Explicit "suorita / ohita luvat"** skips step 1: act directly.
4. **Verify** before reporting: build, run; for UI, look at it (`aura-ui`).

## Code

- One module or function at a time; files stay short (~150 lines), split when
  logic grows.
- Read only files that matter for the task at hand.
- No defensive try/catch or if-else stacks to hide environment errors. Let it fail
  visibly, read the error, fix the root cause.
- Prefer platform-native APIs (Tauri plugins, GNOME APIs) over browser/JS tricks.
- Rust/Tauri: shared cargo config and target dir.

## Git

- Commit locally while iterating.
- App repos: push only when the user says "valmis".
- Docs/config repos (e.g. `agentic-ubuntu`, `aura_dotfiles`): if the approved plan
  includes publishing, push without asking again.

## Report

End with **"Näin näet sen"**: two or three plain-language lines on what changed
for the user and how to try it. Then sign *– Claude Ubuntu Linux*.

When the session ends, load `dev-handover`.
