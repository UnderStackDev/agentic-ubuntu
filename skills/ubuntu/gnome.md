# GNOME on this machine

Stock Ubuntu GNOME 51 on Wayland. Settings live in dconf; change them
with `gsettings`. Always read the current value first and mention it.

```bash
gsettings get   <schema> <key>
gsettings set   <schema> <key> <value>
gsettings reset <schema> <key>             # back to default
gsettings list-keys <schema>
gsettings range <schema> <key>             # allowed values for enums
dconf watch /                              # see which key a Settings-app click changes
```

## Appearance

```bash
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'   # or 'default'
gsettings set org.gnome.desktop.interface gtk-theme 'Yaru-purple-dark' # light: 'Yaru-purple'
gsettings set org.gnome.desktop.interface icon-theme 'Yaru-purple-dark'   # light: 'Yaru-purple'
gsettings set org.gnome.desktop.interface accent-color 'purple'
gsettings set org.gnome.desktop.interface font-name 'Ubuntu Sans 11'
gsettings set org.gnome.desktop.interface text-scaling-factor 1.0
gsettings set org.gnome.desktop.background picture-uri-dark 'file:///path/to/img.jpg'
```

Ubuntu's accent colour is the Yaru variant (`Yaru-<accent>[-dark]`) plus
`org.gnome.desktop.interface accent-color` — set both to match. Keep the
`-dark` suffix in sync with `color-scheme`.

## Keybindings

Built-in bindings: schemas `org.gnome.desktop.wm.keybindings`,
`org.gnome.shell.keybindings`, `org.gnome.mutter.keybindings`,
`org.gnome.settings-daemon.plugins.media-keys`. Check for a clash before
adding one:

```bash
gsettings list-recursively | grep -i "'<Super>e'"
```

Custom bindings (custom0 = Vicinae, Ctrl+Space → `vicinae toggle`; next free: custom1). Read the list,
append, never overwrite existing entries:

```bash
base=org.gnome.settings-daemon.plugins.media-keys
path=/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/
gsettings set $base custom-keybindings "['$path']"   # merge with existing list!
gsettings set $base.custom-keybinding:$path name 'Files'
gsettings set $base.custom-keybinding:$path command 'nautilus'
gsettings set $base.custom-keybinding:$path binding '<Super>e'
```

## Dock and workspaces

```bash
gsettings get org.gnome.shell favorite-apps     # ['firefox_firefox.desktop', 'org.gnome.Nautilus.desktop']
gsettings set org.gnome.shell favorite-apps "[..., 'com.mitchellh.ghostty.desktop']"
gsettings list-keys org.gnome.shell.extensions.dash-to-dock   # Ubuntu Dock settings
gsettings get org.gnome.mutter dynamic-workspaces             # true
```

Find a `.desktop` id: `ls /usr/share/applications ~/.local/share/applications
/var/lib/snapd/desktop/applications /var/lib/flatpak/exports/share/applications`.

## Extensions

Enabled now: Ubuntu's own (`ubuntu-dock`, `ubuntu-appindicators`,
`tiling-assistant`, `ding`, `myna-shell`, `snapd-prompting`,
`snapd-search-provider`, `web-search-provider`) plus user-installed
`blur-my-shell@aunetx` (in `~/.local/share/gnome-shell/extensions/`).

```bash
gnome-extensions list --enabled
gnome-extensions enable|disable <uuid>
gnome-extensions prefs <uuid>
gnome-extensions info <uuid>          # check shell-version compatibility
```

Extension settings: `gsettings --schemadir
~/.local/share/gnome-shell/extensions/<uuid>/schemas list-keys <schema>`.
On Wayland the shell can't be restarted in place: a newly installed
extension needs log out / log in before it appears.

## Other common settings

```bash
gsettings set org.gnome.settings-daemon.plugins.color night-light-enabled true
gsettings set org.gnome.desktop.session idle-delay 600            # seconds, 0 = never
gsettings set org.gnome.desktop.screensaver lock-enabled true
gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'fi')]"
gsettings set org.gnome.desktop.wm.preferences button-layout 'appmenu:minimize,maximize,close'
```

## Default apps

```bash
xdg-mime query default x-scheme-handler/https     # firefox_firefox.desktop
xdg-mime default <app>.desktop <mime/type>
xdg-settings get default-web-browser
```

Terminal: `org.gnome.desktop.default-applications.terminal exec` is
`xdg-terminal-exec`, which launches Ghostty. Its preference list lives in
`~/.config/xdg-terminals.list` (create it to pin a terminal).

## Ghostty

Config: `~/.config/ghostty/config.ghostty` (currently empty → defaults).
Show valid options and defaults with `ghostty +show-config --default
--docs`; list fonts with `ghostty +list-fonts`, themes with
`ghostty +list-themes`. Reload in a running window with
Ctrl+Shift+, .

## Screenshots

GNOME's built-in tool: `Print` opens the screenshot UI; files go to
`~/Pictures/Screenshots/`. Wayland blocks arbitrary screen grabbing from
the CLI, so for scripted captures prefer the portal (asks for
permission) over X11 tools like `scrot`/`import`, which don't work here.
