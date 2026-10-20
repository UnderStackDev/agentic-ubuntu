# Principles

Full text: [`claude/rules/project-rules.md`](../claude/rules/project-rules.md)
(Architect Protocol v3.1). This is a summary with the reasons behind it.

## A note on the Architect Protocol

The protocol was written for Gemini CLI, which needed a short leash: it drifted,
made "improvements" nobody asked for and patched over errors. Hence the blunt
"Dictator & Architect / Servant" wording. With Claude Code the protocol is only the
baseline; the [skills](../skills) loosen it, and the agent is trusted to use
judgement on technical matters.

## 1. Roles

I don't code. The human owns the vision and the UI/UX; the agent owns the code,
decides technical details with judgement and explains them in plain language.
Decisions that change what the user sees or how the app behaves (UI, features,
big architectural turns) are still the human's.

**Why:** the look and feel is where the human's judgement matters and where an
agent left alone drifts into generic defaults. Code-level choices are better made
by the one who writes the code.

## 2. Approval applies to the plan, not to every step

The plan is presented and approved before any code. After approval the agent
implements it in full and doesn't ask about each step separately. It asks again
only if the plan turns out to be wrong or a decision comes up that belongs to the
user.

**Why:** constant permission prompts are as bad as none at all. One approval point
keeps the human in control and the agent working.

## 3. Small modules

One function or module at a time. Files stay short (about 150 lines) and are split
when the logic grows. The interface (input/output) is defined before the
implementation. The agent reads only the files relevant to the task.

**Why:** a small file fits in the context whole, and a change is easy to review.
It also uses fewer tokens.

## 4. No happy-path duct tape

No try/catch or if-else layers that hide environment errors. Code may crash
visibly; the error message is read and the root cause is fixed.

**Why:** "pre-patched" code looks like it works when it's broken, and every layer
of duct tape makes the next fix harder.

## 5. The app's own AI may be autonomous

If an app has its own AI component, it isn't shackled with code-level
conditionals. It gets a task, not a script.

## 6. Platform-native APIs

Tauri apps use Tauri's native plugins (clipboard, notifications, drag & drop)
instead of browser API tricks that behave differently on Wayland and Windows.
On GNOME, GNOME's own APIs are used.

## 7. The UI line belongs to the user

The visual language ([Aura UI manifesto](../claude/rules/aura-ui-manifesto.md),
"Midnight Glass") is followed as is. The agent doesn't experiment with its own
styles.

## 8. Local first

Work is done locally and committed while iterating. Pushes and releases happen
only when the user says the work is done.

## 9. Sign-off

Every agent report ends with a sign-off (*– Claude Ubuntu Linux*). When several
agents and machines work on the same projects (Claude Code, Gemini CLI, Codex;
Ubuntu and Fedora), the sign-off shows who did what.
