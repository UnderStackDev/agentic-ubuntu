# PROJECT RULES: THE WORKING AGREEMENT (v4)

Every AI agent working in this project reads this file at the start of every
session. It replaces the Architect Protocol v3.1.
Source: https://github.com/UnderStackDev/agentic-ubuntu

## 1. Roles

- **The user owns the problem, the requirements and the UI/UX**, and decides when
  something is done. Every solution starts from the user's own needs.
- **The agent owns the code**, within this agreement. It decides technical details
  with judgement and explains them in plain language: the user doesn't read code.
- **Still the user's call:** anything the user sees or how the app behaves (UI,
  features), new major libraries or architectural turns, and anything that leaves
  the machine (push, release, cloud services).

## 2. Flow

1. **Task:** a GitHub Issue or a direct chat request.
2. **Plan:** what changes from the user's point of view, which files, the interface
   (input/output) of new modules, risks. Wait for approval.
3. **Approved = go.** Implement the whole plan without asking permission for each
   step. Ask again only if the plan turns out wrong or a user decision comes up.
4. **Verify:** build, run, and for UI changes look at the result.
5. **Commit locally** and report.

A trivial fix (typo, one line) is done directly. "suorita" / "ohita luvat" skips
the plan step. No automatic fixes nobody asked for.

## 3. Reports

- End every report with **"What you'll see"** ("Näin näet sen" in Finnish): two or
  three plain-language lines on what changed for the user and how to try it.
- Sign every report: *– <agent> <OS>*, e.g. *– Claude Ubuntu Linux*.

## 4. Code

- One module or function at a time. Files stay short (~150 lines); split when the
  logic grows. Define the interface before the implementation.
- Read only the files that matter for the task at hand.
- **Honest errors, no happy paths:** no try/catch or if-else layers that hide
  environment errors. Let it fail visibly, read the error, fix the root cause.

## 5. The app's internal AI

If the app has its own AI component, don't shackle it with strict conditionals or
micromanagement. Give it a task, not a script.

## 6. UI

The Aura UI manifesto ("Midnight Glass", `AURA_UI_MANIFESTO.md`) is followed
exactly. No style experiments. The user nitpicks every detail, so show the result
(run it, a screenshot when possible) rather than describe it.

## 7. Platform and architecture

- **Machines:** Linux (Ubuntu GNOME and Fedora, both Wayland). There is no Windows
  machine; don't add Windows-only code unless asked.
- **Tauri:** native plugins (clipboard, drag & drop, notifications) over browser
  APIs or third-party JS libraries. Shared cargo config and target dir. Linux
  releases as .deb and .rpm.
- **Existing Aura architecture:** iframe-based modules in a Flexbox layout; CSP and
  X-Frame-Options are handled by modifying HTTP headers in the Rust backend. Don't
  replace these without asking.
- **GNOME:** GNOME's own APIs; GNOME Shell extensions per the GNOME version in use.

## 8. Git and publishing

- Commit locally while iterating.
- App repos: push and release only when the user says the work is done ("valmis").
- Docs and config repos: a push can be part of an approved plan.

## 9. Continuity

No single session or machine holds the project. The trail is:
**GitHub Issue** (what was asked) → **plan** (what was agreed) → **commits** (what
was done) → **`.ai_context_state.md`** (where things stand).

- **Session start:** read this file, `.ai_context_state.md`, `PLAN.md` if present,
  and the open issues with their comments (`gh issue list`).
- **Session end** (or "lopetetaan", "jatketaan huomenna"): overwrite
  `.ai_context_state.md` with: project & environment, active module, key
  dependencies, last successful command, current blocker, pending refactors,
  invisible rules, decision log, next atomic step. Facts only. Commit it.
- The repo is the source of truth, not one machine's memory. Don't guess the
  project state from memory or feel.
