# Hooks, statusline and plugin

The hooks are defined in
[`claude/settings.example.json`](../claude/settings.example.json). They don't
steer the agent; they tell the desktop what the agent is doing.

## 1. Agent state in the GNOME top bar

`~/Projects/gnome_plugin_agents/bin/claude-state-hook` listens to the events
`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`,
`PermissionRequest`, `Notification`, `Stop`, `StopFailure` and `SessionEnd`.
It writes a state file for each session into
`~/.local/state/understack/agents/sessions/`:

| State | When |
|---|---|
| `working` | prompt submitted or a tool running |
| `idle` | the turn ended, the agent is waiting |
| `attention` | a permission prompt or question is waiting for the user |

A GNOME Shell extension (Claude Status) watches the directory and changes the
top-bar icon. When the agent is waiting for an answer, you notice it even with
another window on top. The hook never blocks Claude: it always exits 0 and prints
nothing.

The same extension has **errwatch**: it watches the journal, writes an incident
file for crashed services and desktop errors, and hands it to Claude as "read
this, find the cause, propose a fix". The agent diagnoses and asks before changing
the system.

## 2. Ghostty notifications and statusline

`~/.local/share/ghostex/hooks/agent-shell-notify.sh` runs on every event. It shows
a notification in the terminal when the agent needs the user or finishes.
`agent-statusline.sh` draws the status line. Both come from the Ghostex tool; if
you don't have it, remove those lines from the settings.

## 3. The selkea plugin

[`plugins/selkea`](../plugins/selkea) ("selkeä" is Finnish for "clear") is a
Claude Code mod that makes the transcript easier to read:

- your messages and Claude's answers in named frames (`language`: `fi` = Sinä /
  Claude, `en` = You / Claude)
- short notes between steps as dim lines
- bold text in colour (`bold`: `turkoosi` = cyan, `vihreä` = green, `violetti` =
  magenta, `pois` = off)
- a rule with the turn's duration at the end of every turn
- `boxes`: `vastaukset` frames only multi-line answers, `kaikki` frames everything

The option values are Finnish because the code matches on them. The marketplace is
a directory marketplace, so edits take effect with `/reload-plugins` without
reinstalling.

```bash
claude plugin validate plugins/selkea
```
