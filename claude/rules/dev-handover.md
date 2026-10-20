Guide for tracking the state of a project.

Applies to: ALL

This is a strict, technical reporting protocol designed to minimise token use and
maximise continuity, whether Gemini CLI or Codex is used or the operating system
switches between Windows and Linux. It also minimises the "oh shit" moments caused
by lost chat histories.

The format is optimised so that the AI gets, in one read (about 500–1000 tokens),
the same information it would otherwise spend tens of thousands of tokens raking
through the codebase for.

Dev_Handover Protocol (v1.0)

Copy this section at the end of a session and ask the AI to fill it in. Save the
answer in the project root as `.ai_context_state.md`.

1. Project Identity & Environment

Project Name: [Name]

OS Context: [Win (PowerShell/CMD) / Linux (Bash)]

Last Commit/Hash: [If Git is used]

Critical Paths: [E.g. ./src/api, C:\Users\Project\bin]

2. State of Architecture (The "Map")

Active Module: [Which file/module was edited last?]

Key Dependencies: [New libraries or critical versions]

Global Variables/State: [Which variables affect the whole app right now?]

3. Execution Snapshot

Last Successful Command: [Exact command, e.g. npm run dev or go build]

Current Blocker/Error: [If you got stuck, the exact error message here]

Pending Refactors: [Which part of the code is "ugly" or needs attention next?]

4. Logic & Hidden Context

Invisible Rules: [E.g. "Don't touch file X, it's legacy" or "Use only snake_case in this module"]

Decision Log: [Why was X chosen over Y? (Stops the AI from suggesting a rejected solution again)]

5. Immediate Next Step

Target: [What must happen first when the new session starts?]

Done whenever the user announces the session is ending or says work continues
later/tomorrow.
