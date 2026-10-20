# Principles

Full text: [`claude/rules/project-rules.md`](../claude/rules/project-rules.md)
(Working Agreement v4). This is a summary with the reasons behind it. The same
file is the `PROJECT RULES.md` of every Aura repo.

## Where it came from

The first version, the [Architect Protocol v3.1](history/architect-protocol-v3.1.md),
was written for Gemini CLI, which needed a short leash: it drifted, made
"improvements" nobody asked for and patched over errors. Hence its blunt
"Dictator & Architect / Servant" wording. The Working Agreement v4 keeps what
worked (plan first, small modules, honest errors, handover) and describes the
roles as they really are.

## 1. Roles

I don't code. The human owns the problem, the requirements and the UI/UX; the
agent owns the code, decides technical details with judgement and explains them in
plain language. Problems are solved only from the human's own needs and starting
points, and the work goes on until the result fits them, not until it merely
runs. Decisions that change what the user sees or how the app behaves (UI,
features, big architectural turns) are the human's.

**Why:** an agent left alone drifts into generic defaults and "good enough".
Tailored apps come from someone who knows exactly what they need and keeps sending
it back until it's right. Code-level choices are better made by the one who writes
the code.

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

Work is done locally and committed while iterating. In app repos, pushes and
releases happen only when the user says the work is done. In docs and config repos
(like this one) a push can be part of an approved plan.

## 9. Reports in plain language

Every report ends with "What you'll see": what changed from the user's point of
view and how to try it. The user judges the result, not the diff.

## 10. Sign-off

Every agent report ends with a sign-off (*– Claude Ubuntu Linux*). When several
agents and machines work on the same projects (Claude Code, Gemini CLI, Codex;
Ubuntu and Fedora), the sign-off shows who did what.
