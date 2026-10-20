# Packages on this machine

Two package systems are active: **apt** (Ubuntu archive, `ubuntu.sources`
only, no PPAs) and **flatpak** (Flathub, system-wide remote; Firefox and
the other GUI apps). All installs except per-user flatpaks need root →
`sudo -A ...` (see SKILL.md).

**Snap was removed on 2026-10-17** (all snaps + `snapd` purged).
`/etc/apt/preferences.d/no-snap` pins `snapd` and the snap-wrapper
transitional debs (`firefox`, `thunderbird`, `chromium-browser`) to -10 so
updates can't bring them back. Never install those debs; use the flatpak.
`ubuntu-desktop-minimal` went with snapd; its deps were marked manual so
`apt autoremove` is safe. App store = GNOME Software (flatpak plugin);
firmware = GNOME Software or `fwupdmgr`.

## Which one to use

1. **apt** — default for CLI tools, libraries, Python modules
   (`python3-*`), system services. `apt-cache policy <pkg>` shows version.
2. **flatpak** — GUI apps, and anything Ubuntu ships only as a snap:
   `flatpak search <name>`, `sudo -A flatpak install -y flathub <id>`.
3. **Third-party apt repo / PPA / .deb** — only with the user's OK; say
   what is being added.

Don't install the same app from two systems; check first:
`command -v x; flatpak list | grep x; dpkg -l | grep x`.

## Python (PEP 668)

System Python 3.14 is externally managed: `pip install` fails, and `pip`
itself isn't installed. Never use `--break-system-packages`.

- Library for scripts Claude runs → `sudo apt install python3-<name>`
  (e.g. `python3-pypdf`, `python3-openpyxl`, `python3-pandas`).
- Not in apt, or a project → venv. Needs `sudo apt install python3-venv
  python3-pip` first (`ensurepip` is missing now), then
  `python3 -m venv .venv && .venv/bin/pip install ...`.
- Standalone CLI apps → `pipx` (`sudo apt install pipx`).

## Updates

`unattended-upgrades` is enabled (security updates install themselves).
Manual: `sudo apt update && sudo apt full-upgrade`, `flatpak update`. Don't run `do-release-upgrade` without being asked.
