# Machine

| | |
|---|---|
| Hardware | HP ProDesk 600 G3 DM: Pentium G4400T (2 cores), 14 GiB RAM |
| OS | Ubuntu 26.10, kernel 7.3 |
| Desktop | GNOME Shell 51, Wayland, stock Ubuntu session |
| Terminal | Ghostty + zsh (starship) |
| Packages | apt and flatpak (snap removed), `cargo binstall` |
| Used for | Tauri apps, GNOME Shell extensions, browser extensions |

The machine is modest, so the agent's instructions (`skills/ubuntu`) say outright
not to start heavy parallel builds.

## Shared Rust/Tauri build

[`machine/cargo-config.toml`](../machine/cargo-config.toml) → `~/.cargo/config.toml`

- **sccache:** every dependency (tokio, serde, tauri…) is compiled once, and the
  next project gets it from the cache.
- **mold + clang:** large GUI binaries link several times faster.
- **dev profile:** `line-tables-only` debug info and dependencies at `opt-level 2`.
- Tools are installed as prebuilt binaries with `cargo binstall` (tauri-cli,
  cargo-deb, cargo-generate-rpm), because `cargo install` would take forever to
  compile them on two cores.
- Releases are .deb and .rpm packages.

## sudo for the agent: `sudo -A` + yad

Passwordless sudo is not used. The agent runs root commands as `sudo -A ...`.
`SUDO_ASKPASS` (set in the `env` field of `settings.json`) points to the script
[`machine/sudo-askpass`](../machine/sudo-askpass), which opens a small yad window
with just a password field.

- The agent says what the command does **before** running it, because the window
  shows only the password field.
- If the user cancels, the agent doesn't retry; it asks.
- The password never ends up in the agent's context.

```bash
sudo apt install yad
install -m 755 machine/sudo-askpass ~/.local/bin/sudo-askpass
```
