# Workflow

```
session starts
  └─ .ai_context_state.md exists? → read it first (dev-handover)
request in chat or a GitHub Issue
  └─ architect-protocol loads
       1. plan: what changes, which files, interfaces of new modules, risks
       2. the user approves (or corrects)
       3. full implementation, one module at a time, no per-step permission
       4. check: build / tests / actually run it
       5. local commit
session ends ("lopetetaan", "jatketaan huomenna")
  └─ dev-handover: .ai_context_state.md is updated and committed
"valmis" (done) → only now push / release
```

## Exceptions

- **A trivial fix** (typo, one line) is done directly without a plan.
- **"suorita" / "ohita luvat"** (run it / skip permissions) skips the plan step.
- **A decision that belongs to the user** in the middle of implementation (a new
  library, a UI change, architecture) is asked about even if the plan was already
  approved.

## The handover file

Template: [`templates/.ai_context_state.md`](../templates/.ai_context_state.md).
The file is short and facts only: paths, commands, the latest error, a decision
log and the next atomic task. The decision log stops rejected solutions from
coming back in the next session.

**Why:** chat history gets lost and the agent and the OS change, but a file in the
project root stays. Reading it takes about a thousand tokens, where raking through
the codebase would take tens of thousands.

## Agents picking up each other's work

No single session holds the project. A GitHub Issue states the task, the
approved plan and the commits record what was done, and `.ai_context_state.md`
records where things stand. Any Claude agent, on any day, can read those and
continue where the previous one stopped.

For the human this means two things: nothing has to be re-explained, and every
step can be followed without reading code. Issue → plan → commits → handover is a
trail anyone can read.

## Memory

Claude Code's own memory (`~/.claude/projects/*/memory/`) stores things about the
machine and the user that the code doesn't show: how the machine is set up, what
the user has corrected before and which projects are in progress. Memory files are
personal, so they aren't in this repo.
