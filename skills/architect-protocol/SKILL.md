---
name: architect-protocol
description: >
  How to plan and write code in the user's projects (Aura apps, Tauri, GNOME
  extensions, browser extensions, scripts — any language). Use before planning a
  feature, refactor or fix, before writing or changing code, and when an error needs
  fixing. Finnish triggers too: "tee", "korjaa", "lisää ominaisuus", "suunnitelma",
  "refaktoroi", "toteuta". Turns the Architect Protocol v3.1 into a working routine:
  plan → approval → full implementation, small modules, honest errors.
---

# Architect Protocol in practice

Full text: `~/.claude/rules/project-rules.md` (v3.1). A project's own
`PROJECT RULES.md` wins over it; this skill wins over both where they clash, and
within it use judgement — the user has given discretion to find the best solution.

## Flow

1. **Plan first.** For anything beyond a trivial fix, present a short plan: what
   changes, which files, the interface (input/output) of new modules, risks. Wait
   for approval.
2. **Approved = go.** After approval, implement the whole plan without asking
   permission for individual steps. Ask again only if the plan turns out wrong or
   a decision is genuinely the user's (architecture, libraries, UI line).
3. **Explicit "suorita / ohita luvat"** skips step 1: act directly.

## Code

- One module or function at a time; files stay short (~150 lines), split when
  logic grows.
- Read only files that matter for the task at hand.
- No defensive try/catch or if-else stacks to hide environment errors. Let it fail
  visibly, read the error, fix the root cause.
- Prefer platform-native APIs (Tauri plugins, GNOME APIs) over browser/JS tricks.
- UI follows the user's line exactly; for Aura UI load the `aura-ui` skill.
- Rust/Tauri: shared cargo config and target dir.

## Machine facts (override the protocol's Windows wording)

- Ubuntu 26.10, GNOME 51, Wayland. No Windows machine any more: don't add
  Windows-only code unless asked.
- Work locally; push only when the user asks. `sudo -A` for root.

## Sign-off

Every report ends with *– Claude Ubuntu Linux*.

When the session ends, load `dev-handover`.
