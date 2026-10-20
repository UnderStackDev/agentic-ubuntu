---
name: gnome-extension-dev
description: Use when creating, editing, debugging or styling a GNOME Shell extension (extension.js, metadata.json, panel indicators, popup menus, St/Clutter UI) on this machine. Sets up a hot-reload loader so code changes apply with disable+enable instead of logging out, and covers loading a brand-new extension without logout, headless debugging of popups, and GNOME 49–51 API pitfalls.
---

# GNOME Shell extension development without logout

GNOME Shell (51 here, Wayland) caches every ES module for the whole session,
so by default an edited extension needs log out + in. Avoid that from the
first commit by using the loader pattern below. Reference implementation:
`~/Projects/gnome_plugin_agents` (extension.js, impl.js).

## 1. Loader pattern (set up when the extension is created)

`extension.js` stays tiny and rarely changes; all logic lives in `impl.js`,
imported with a fresh query string on every enable, which makes a new module
URL and therefore fresh code.

```js
// extension.js
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class MyExtension extends Extension {
    enable() {
        const generation = Date.now();
        this._generation = generation;
        import(`./impl.js?v=${generation}`).then(mod => {
            if (this._generation !== generation)
                return; // disabled (or re-enabled) while loading
            this._impl = new mod.MyImpl(this);
            this._impl.enable();
        }).catch(e => console.error(`[my-ext] load failed: ${e}\n${e.stack}`));
    }

    disable() {
        this._generation = 0;
        this._impl?.disable();
        this._impl = null;
    }
}
```

In `impl.js`, pass the same query on to submodules and make GType names
unique per load (a GType name can be registered only once per process):

```js
const VERSION = import.meta.url.replace(/^[^?]*/, '');   // "?v=123" (no URL class in gjs)
const GEN = VERSION.replace(/\W/g, '');
const {Helper} = await import(`./helper.js${VERSION}`);

const Indicator = GObject.registerClass({
    GTypeName: `MyExtIndicator${GEN}`,
}, class Indicator extends PanelMenu.Button { /* ... */ });
```

`impl.js` gets the `Extension` object (for `path`, `uuid`, `getSettings()`).
Every subclass in impl.js needs a `${GEN}` GTypeName. `stylesheet.css` is
also reloaded by disable + enable.

Reload after editing impl.js / submodules / stylesheet:

```sh
gnome-extensions disable <uuid> && gnome-extensions enable <uuid>
journalctl --user -b --since "-20s" -o cat | grep -i "<uuid-or-tag>\|JS ERROR"
```

Only a change to `extension.js` itself (or metadata.json) still needs a
relogin. Keep heavy or volatile logic out of the shell altogether where
possible: helper scripts in `bin/` (run with `Gio.Subprocess`, async) take
effect immediately.

Retrofitting an existing extension: move its code to impl.js and add the
loader; that one change needs a final relogin, after which reloads work.

## 2. Loading a brand-new extension without logout

`gnome-extensions enable` only takes effect at next login for an extension
the shell has not scanned. Symlink the project into
`~/.local/share/gnome-shell/extensions/<uuid>`, compile schemas if any
(`glib-compile-schemas schemas/`), enable it, then ask the user to run in
Looking Glass (Alt+F2 → `lg` → Evaluator):

```js
Main.extensionManager.loadExtension(Main.extensionManager.createExtensionObject('<uuid>', imports.gi.Gio.File.new_for_path(imports.gi.GLib.get_home_dir() + '/.local/share/gnome-shell/extensions/<uuid>'), 2))
```

This did not work on 2026-10-17 (focus-on-launch): neither the snippet above
nor an `import('gi://Gio').then(...)` variant made the shell see the
extension, and `org.gnome.Shell.Eval` is locked (`(false, '')`), so it can't
be done from here. Check with `gnome-extensions info <uuid>`; if it still
"doesn't exist", ask the user to log out and in straight away. After login
the extension is INITIALIZED but not enabled: run `gnome-extensions enable`.

## 3. Debugging UI you can't see

- Log with `console.log('[tag] ...')`; read with
  `journalctl --user -b --since "-20s" -o cat | grep tag`.
- Layout only happens when actors are shown. To measure a popup without the
  user, temporarily open and close it from `enable()`, log sizes in the
  allocation path, reload, read the log, then restore the file:
  ```js
  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 3000, () => { this._indicator?.menu.open(); return GLib.SOURCE_REMOVE; });
  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 4500, () => { this._indicator?.menu.close(); return GLib.SOURCE_REMOVE; });
  ```
  Back up impl.js to the scratchpad first and copy it back afterwards.
- Theme CSS (Yaru) for checking paddings/borders:
  `gresource extract /usr/share/gnome-shell/gdm-theme.gresource /org/gnome/shell/theme/Yaru/gnome-shell-dark.css`
- Render an SVG to check it: gjs + `GdkPixbuf.Pixbuf.new_from_file_at_size(...).savev(png)` (no rsvg-convert installed).

## 4. GNOME 49–51 pitfalls

- `St.BoxLayout` has no `vertical` any more: use
  `orientation: Clutter.Orientation.VERTICAL`.
- `PanelMenu.Button` opens its menu from a `Clutter.ClickGesture` that takes
  any button. For a separate right-click action set
  `this._clickGesture.required_button = Clutter.BUTTON_PRIMARY` and add a
  second `ClickGesture({required_button: Clutter.BUTTON_SECONDARY, recognize_on_press: true})`.
- `PopupMenu.open()` refuses an empty menu: build the menu eagerly (on
  every state update), not only in `open-state-changed`.
- In-shell notifications with working actions: `MessageTray.Source` +
  `MessageTray.Notification` (`addAction`, `'activated'`). `notify-send
  --wait` from a helper process loses the click.
- Progress bars: don't size a fill child from the track's `notify::width`
  inside Bin/FixedLayout — the fill feeds back into the track's preferred
  size (bars end up narrow/centred, overlay rows get 0 height). Subclass
  `St.Widget`, return only theme-node padding in `vfunc_get_preferred_*`,
  and allocate the fill by hand in `vfunc_allocate`
  (see `Meter` in gnome_plugin_agents/impl.js).
- St CSS has no alpha for `-st-accent-color`; tint with the actor's
  `opacity` instead.
- Panel buttons pad icons 12px a side, so the hover highlight is a wide
  pill. For a round button, strip the icon's padding/margin in CSS
  (`#panel .panel-button .my-icon { padding: 0; margin: 0; }`) and set
  `-natural-hpadding`/`-minimum-hpadding` to `(height - iconWidth) / 2` on
  `notify::height` (see `makeRound` in either project).
- A full-colour (non-symbolic) SVG keeps its colours in the panel; a
  `-symbolic` one is recoloured by the theme.

## 5. Conventions here

- UUID suffix `@understack.dev`; projects in `~/Projects/<name>`,
  symlinked into the extensions dir; `metadata.json` shell-version
  includes "51".
- Commit while iterating; push only when the user says it's done.
