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

## Wi-Fi: TP-Link Archer T3U (rtw88)

The USB Wi-Fi stick is an RTL8822BU on the in-kernel `rtw88_8822bu` driver. After
losing a network (e.g. a phone hotspot going out of range) the chip went into its
idle state and never woke up again (`failed to leave ips state` in the kernel
log), so no network was found until a reboot. Fedora didn't have the problem:
Ubuntu turns Wi-Fi power save on by default
(`default-wifi-powersave-on.conf`), Fedora doesn't.

Files in [`machine/rtw88-wifi/`](../machine/rtw88-wifi):

| File | Goes to | What |
|---|---|---|
| `rtw88.conf` | `/etc/modprobe.d/` | `disable_lps_deep=Y`: no deep power save, which hangs the firmware |
| `99-rtw88-powersave.conf` | `/etc/NetworkManager/conf.d/` | Wi-Fi power save off for this driver only |
| `rtw88-ips-watchdog` | `/usr/local/bin/` | Follows the kernel log and resets the USB stick when the chip is stuck (30 s cooldown) |
| `rtw88-ips-watchdog.service` | `/etc/systemd/system/` | Runs the watchdog at boot |

The idle state itself has no module parameter, so the watchdog is the real safety
net: the connection comes back in about 10 seconds instead of never.

```bash
cd machine/rtw88-wifi
sudo -A install -m644 rtw88.conf /etc/modprobe.d/
sudo -A install -m644 99-rtw88-powersave.conf /etc/NetworkManager/conf.d/
sudo -A install -m755 rtw88-ips-watchdog /usr/local/bin/
sudo -A install -m644 rtw88-ips-watchdog.service /etc/systemd/system/
sudo -A systemctl daemon-reload && sudo -A systemctl enable --now rtw88-ips-watchdog
```

The settings take effect after replugging the stick or a reboot. Watchdog log:
`journalctl -u rtw88-ips-watchdog`. The `failed to get tx report from firmware`
lines right after connecting are harmless.
