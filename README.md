# agentic-ubuntu

How agentic coding with Claude Code is set up on my Ubuntu desktop: the rules the
agent works by, the skills that drive the work, the hooks that show the agent's
state on the desktop, and a plugin that makes the terminal transcript easier to
read. Everything is plain files you can copy.

The machine is Ubuntu 26.10 with GNOME 51 on Wayland, used for Tauri apps, GNOME
Shell extensions and browser extensions.

## Core ideas

1. **The human is the architect; the agent executes.** The agent doesn't decide
   on architecture, libraries or the UI by itself.
2. **Plan → approval → full implementation.** The agent presents a plan before
   writing code. Once it's approved, the agent carries out the whole plan without
   asking permission for every step.
3. **Small modules, honest errors.** No hundreds of lines in one go and no
   try/catch duct tape. Code may break visibly; the fix goes to the root cause.
4. **Continuity lives in a file, not in the chat.** At the end of a session the
   agent writes `.ai_context_state.md`, from which the next session (any agent)
   gets the state in about a thousand tokens.
5. **Local first.** Work happens on the machine. Push and cloud services only on
   request.

More: [docs/principles.md](docs/principles.md) and [docs/workflow.md](docs/workflow.md).

## Contents

| Path | What |
|---|---|
| [`claude/CLAUDE.md`](claude/CLAUDE.md) | Global baseline (`~/.claude/CLAUDE.md`): pulls in the rules with `@` imports |
| [`claude/rules/`](claude/rules) | Architect Protocol v3.1, Dev_Handover Protocol, Aura UI manifesto v2 |
| [`claude/settings.example.json`](claude/settings.example.json) | Cleaned-up `settings.json`: hooks, statusline, askpass, plugin |
| [`skills/`](skills) | Own skills: `architect-protocol`, `dev-handover`, `aura-ui`, `ubuntu`, `gnome-extension-dev` |
| [`plugins/`](plugins) | Plugin marketplace `agentic-ubuntu`: the `selkea` mod (more readable transcript) |
| [`machine/`](machine) | Shared `~/.cargo/config.toml` (sccache + mold) and `sudo-askpass` (yad) |
| [`templates/`](templates) | Empty `.ai_context_state.md` template |
| [`install.sh`](install.sh) | Copies the rules and skills into `~/.claude` (dry run by default) |
| [`docs/`](docs) | Principles, workflow, machine, hooks |

## Rules vs. skills

`CLAUDE.md` and `rules/` are the **baseline**, loaded into every session. Skills
are **working routines** that load when a task calls for them, and they take
precedence over the baseline. A project's own `PROJECT RULES.md` or `CLAUDE.md`
takes precedence over both. When they clash, the agent uses judgement.

| Skill | When it loads |
|---|---|
| `architect-protocol` | before planning or writing code ("tee", "korjaa", "toteuta") |
| `dev-handover` | at the end of a session ("lopetetaan", "jatketaan huomenna") and at the start, if a handover file exists |
| `aura-ui` | UI work: Midnight Glass, Soft Lilac, buttons, typography |
| `ubuntu` | machine admin: gsettings, extensions, apt/flatpak, `sudo -A` |
| `gnome-extension-dev` | GNOME Shell extensions without logging out (hot reload) |

I talk to the agent in Finnish, so the skill descriptions include Finnish trigger
words next to the English ones.

Some of Anthropic's built-in skills are used too (e.g. `docs`, `skill-creator`,
`deep-research`). They aren't in this repo because I didn't write them.

## Installation

```bash
git clone https://github.com/UnderStackDev/agentic-ubuntu ~/Projects/agentic-ubuntu
cd ~/Projects/agentic-ubuntu
./install.sh          # shows what it would do
./install.sh --apply  # copies (existing files are backed up with a .bak suffix)
```

Then:

1. Change the sign-off and machine facts to your own: `claude/CLAUDE.md`,
   `skills/architect-protocol`, `skills/ubuntu`.
2. Merge `claude/settings.example.json` into your own `~/.claude/settings.json`
   by hand. Replace `/home/YOU` and leave out the hooks whose scripts you don't
   have (see [docs/hooks.md](docs/hooks.md)).
3. Plugin: `claude plugin install selkea@agentic-ubuntu` once the marketplace is in
   your settings. Edits take effect with `/reload-plugins`.

## License

MIT, see [LICENSE](LICENSE).
