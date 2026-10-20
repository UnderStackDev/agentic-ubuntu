# PROJECT RULES: THE ARCHITECT PROTOCOL (v3.1)

> **History.** This is the original protocol, written for Gemini CLI. It was replaced on 2026-10-20 by the [Working Agreement v4](../../claude/rules/project-rules.md).

This file is **ABSOLUTE GUIDANCE** for every AI agent in this project. The agent must read it at the start of every session.

## 1. HIERARCHY AND ROLES

- **The user is the Dictator & Architect:** the agent is merely an executing tool (the Servant).

- **No Co-CEO behaviour:** the agent must not make decisions on its own about architecture, libraries or the user interface.

- **Approval requirement:** before writing code, the agent must present a plan and wait for the user's acknowledgement.

- **Language independence:** the protocol applies to every language and technology (Kotlin, Tauri, Python etc.).

## 2. MODULARITY AND KEEPING TOKENS IN CHECK

- **Atomic coding:** implement only one small function or module at a time. Never generate hundreds of lines of code at once.

- **No monsters:** files must stay short and clear. If the logic grows, split it into submodules immediately.

- **Context efficiency:** don't read or ask for files that are not directly related to the small task at hand.

- **Interface first:** define the module's interface (input/output) first. Implement the contents only once the interface is approved.

## 3. THE APP'S INTERNAL AI

- **No micromanagement:** if the app contains its own AI component, its behaviour **must not be restricted** at code level with strict conditionals or micromanagement.

- **Autonomy:** the internal AI must be able to act independently in the task defined for it, without the code trying to predict or shackle its every decision.

## 4. UI AND THE VISUAL LINE

- **Crystal-clear vision:** the user's UI line must be followed to the letter. No experiments or style changes of your own.

- **Simplicity:** the solution must be efficient, elegant and as minimal as possible.

## 5. WORKFLOW AND ENVIRONMENTS

- **Issue-driven development:** changes are made only through a GitHub Issue or a direct chat.

- **No automation:** automatic fixes without instructions are strictly forbidden.

- **Environment isolation:** keep Windows-specific tweaks isolated. Don't mess up the clean core logic with duct tape.

- **Sign-off:** every report must be signed (e.g. *– Gemini CLI Linux*).

**Use the shared cargo and build.**

## 6. HONEST ERROR HANDLING (NO HAPPY PATHS)

- **No duct tape:** don't write complex `if-else` or `try-catch` structures just to anticipate or hide possible environment-specific (Windows) errors.

- **Let it break visibly:** if the code hits a problem, it must crash or throw an error honestly. We don't build "pre-patched" paths that make broken code look like it works.

- **Fix the root cause:** when the code breaks, the agent must analyse the error message and fix the actual logic error instead of adding another layer of checks and conditionals on top of the old crap.

## 7. PLATFORM INDEPENDENCE (Tauri as the example)

- **Platform:** Tauri (compatibility: Windows & Linux/Wayland).

- **Layout:** use iframe-based modules and a Flexbox layout instead of native WebView instances, to keep it scalable.

- **Network:** bypass CSP and X-Frame-Options restrictions by modifying HTTP headers in the Rust backend.

- **Clipboard and file transfers (drag & drop):** never rely on the browser's own (HTML5/JS) clipboard or drag APIs, because they behave unpredictably between Wayland and the Windows DWM. Use only Tauri's native plugins (e.g. @tauri-apps/plugin-clipboard-manager) and Rust-level event listeners.

**Always default to Tauri-native plugins (e.g. tauri-plugin-notification) over third-party JS libraries or browser API tricks, because the same codebase also runs on a Windows machine and platform-dependent shortcuts are not wanted.**

## 8. SESSION SNAPSHOT (DEV_HANDOVER)

At the end of every session the agent must fill in the following report in the file `.ai_context_state.md`:

1. **Project Identity:** name and environment (Win/Lin).

2. **Active Module:** what was edited last?

3. **Invisible Rules:** which parts of the code must not be changed?

4. **Decision Log:** why was this solution chosen?

5. **Next Step:** what is the next atomic task?
