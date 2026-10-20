---
name: ubuntu
description: >
  REQUIRED for customizing or administering this machine: stock Ubuntu
  26.10 with GNOME Shell 51 on Wayland (no Hyprland, no Omarchy, no
  HyprMod — those belonged to the old Fedora setup). Use when changing
  desktop settings, keybindings, extensions, appearance/themes, dock,
  workspaces, default apps, terminal (Ghostty) config, or when installing
  or removing software (apt, snap, flatpak, Python packages). Triggers:
  GNOME, gsettings, dconf, extension, keyboard shortcut, theme, dark mode,
  font, wallpaper, dock, tiling, night light, screenshot, Ghostty, install,
  package, apt, snap, flatpak, pip, system info, "what's on this machine".
---

# Ubuntu Skill (GNOME, Wayland)

Manage this machine: an HP ProDesk 600 G3 DM running **Ubuntu 26.10**
with the stock **GNOME Shell 51** Ubuntu session on **Wayland**. It is a
modest box (Pentium G4400T, 2 cores, 14 GiB RAM, Intel HD 510 graphics,
174 GB ext4 root), so avoid heavy local builds and parallel jobs that
assume many cores.

**There is no Hyprland, Omarchy or HyprMod here.** Older skills and
memories may mention `omarchy-*` scripts, `~/.config/hypr/`, `dnf` or
COPR — none of that applies on this machine. Don't install Hyprland to
"make the old instructions work"; use the GNOME way below.

## Machine snapshot (verified 2026-10-15)

| Area | Value |
|---|---|
| OS | Ubuntu 26.10 "Stonking Stingray", kernel 7.3 |
| Desktop | GNOME Shell 51, session `ubuntu`, Wayland |
| Locale / keyboard | `LANG=en_US.UTF-8`, keyboard layout `fi` |
| Appearance | `prefer-dark`, GTK theme `Adwaita` (since 2026-10-18; Rewaita CSS removed), accent `purple` (stock GNOME; no theming extensions — user-accent-colors uninstalled, User Themes disabled, gtk.css files empty; user wants defaults, Blur my Shell installed but off until it supports GNOME 51), icons Reversal-purple-dark, font Ubuntu Sans 11 |
| Terminal | Ghostty (`xdg-terminal-exec` is the default terminal launcher) |
| Shell | zsh (since 2026-10-16) from `~/Projects/aura_dotfiles` (zshrc, starship.toml); `~/.zprofile` sources `~/.profile`, `~/.zshenv` puts `~/.local/bin` + `~/.cargo/bin` on PATH for every zsh; Ghostty `command = /usr/bin/zsh`; `bat`/`fd` are symlinks to `batcat`/`fdfind` in `~/.local/bin`; secrets in `~/.zshrc.local` |
| Browser | Firefox (flatpak `org.mozilla.firefox`, since 2026-10-17) |
| Package tools | `apt`, `flatpak`, `cargo binstall` (no snap — removed 2026-10-17 and pinned out; no `dnf`, `brew`, `pip`) |
| Rust / Tauri | rustup (apt, default `stable`), sccache + mold via `~/.cargo/config.toml`, tauri-cli, cargo-deb, cargo-generate-rpm in `~/.cargo/bin`; Node 24 + npm |
| Python | 3.14, system-managed (PEP 668: `pip install` is blocked) |
| Git / GitHub | `git`, `gh` logged in as UnderStackDev (HTTPS) |

Re-verify before relying on a value: `gsettings get ...`, `command -v`,
`flatpak list --app`.

## Topic Guides

- [`gnome.md`](gnome.md) — settings via `gsettings`, keybindings,
  extensions, dock, appearance, default apps, screenshots.
- [`packages.md`](packages.md) — apt vs flatpak (snap removed), Python
  packages under PEP 668.

This machine is for **Tauri development**. Documents are handled in
Google Docs/Drive via the desktop app, so no local pdf/docx/xlsx/pptx
tooling is installed on purpose — don't install LibreOffice etc. unless
asked. The shared Cargo/Tauri build setup is in place (2026-10-16): prefer
`cargo binstall` (prebuilt) over `cargo install`, which compiles for ages here.

## Safety Rules

**Use `gsettings` (schema-checked) before raw `dconf write`.** `gsettings`
rejects bad keys and types; `dconf` writes anything. Before changing a
setting, read and report its current value so it can be restored.

**Don't edit files under `/usr/share/`** (themes, `.desktop` files,
GNOME Shell extensions shipped by Ubuntu). Override in user space:
`~/.local/share/applications/`, `~/.local/share/gnome-shell/extensions/`,
`~/.config/`.

**Don't disable Ubuntu's own extensions** (`ubuntu-dock`,
`ubuntu-appindicators`, `tiling-assistant`, `ding`, `myna-shell`,
`snapd-*` — inert since snap was removed) unless asked — they make up the stock Ubuntu desktop.

**Leave `unattended-upgrades` enabled** and don't add PPAs or third-party
apt repos without saying so first — prefer flatpak for third-party
apps.

## Privilege Escalation

No passwordless sudo. Use **`sudo -A`**: `SUDO_ASKPASS` (set in
`~/.claude/settings.json` env) points to `~/.local/bin/sudo-askpass`, a
yad dialog (Claude Code icon + password field only, Enter = OK, Esc = cancel; icon `~/.local/share/icons/claude-code-64.svg`, runs via XWayland so it centers). Say in the reply what
the command does *before* running it, since the dialog shows only the
password prompt. Batch root work into one `sudo -A` call where sensible;
sudo caches the credential for a few minutes. If the user cancels the
dialog, don't retry — ask. Never store the password or work around the
prompt. Fallback (no graphical session): the user runs `! sudo ...`.

## System Commands

```bash
hostnamectl; cat /etc/os-release           # machine and OS
gnome-shell --version
gnome-extensions list --enabled
gsettings list-recursively org.gnome.desktop.interface
journalctl --user -b -p warning            # user-session problems this boot
journalctl -b -p err                       # system errors this boot
```

## Decision Framework

1. **Desktop look/behavior (theme, fonts, dock, workspaces, night light,
   keybindings)?** → `gsettings` (see `gnome.md`).
2. **Desktop feature GNOME lacks?** → a GNOME Shell extension
   (`gnome.md`), installed per-user.
3. **Install a GUI app?** → check `apt-cache policy`,
   `flatpak search` and pick per `packages.md`.
4. **Install a CLI tool or library?** → `apt` first; Python packages via
   apt `python3-*` or a venv/pipx (never `pip --break-system-packages`).
5. **Terminal look/behavior?** → `~/.config/ghostty/config.ghostty`.
6. **Needs root?** → `sudo -A ...` (yad password dialog).

## Example Requests

- "Switch to light mode" → `gsettings set org.gnome.desktop.interface
  color-scheme 'default'` (and `gtk-theme 'Yaru-purple'`)
- "Add Super+E to open Files" → custom keybinding (see `gnome.md`)
- "Turn on night light" → `gsettings set
  org.gnome.settings-daemon.plugins.color night-light-enabled true`
- "Pin Ghostty to the dock" → append to `org.gnome.shell favorite-apps`
- "Install VLC" → `sudo -A apt install -y vlc` (or the flatpak)
- "Install pandas" → `sudo -A apt install -y python3-pandas`, or a venv
- "Change terminal font size" → `font-size = 13` in
  `~/.config/ghostty/config.ghostty`
- "Take a screenshot" → `gnome-screenshot` is not guaranteed; use
  `Print` key UI, or see `gnome.md`
