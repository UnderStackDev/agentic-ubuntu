# AURA UI MANIFESTO v2 — "Midnight Glass"

The visual language of the Aura ecosystem is **quiet, dark and glassy**: not cyberpunk, not neon. The mood is a dark winter night: a deep background, glass effects and a single restrained accent colour (Soft Lilac). The fallback palette is **Catppuccin Mocha**, whose colours sit well on top of the Aura background layers.

---

## 1. CSS variables — the canonical set

These variables are mandatory in every Aura app. Use these names and don't invent new variants.

```css
:root {
  /* ── Backgrounds ──────────────────────────────────── */
  --midnight:      rgba(10, 10, 15, 0.97);   /* App window, opaque state */
  --glass:         rgba(30, 30, 45, 0.60);   /* Floating panels = CTP Base */
  --glass-border:  rgba(255, 255, 255, 0.08);

  /* ── Accent ───────────────────────────────────────── */
  --soft-lilac:    #B6A1E5;
  --accent-glow:   rgba(182, 161, 229, 0.40);

  /* ── Text ─────────────────────────────────────────── */
  --text-main:     #ffffff;
  --text-muted:    #9999aa;

  color-scheme: dark;
}
```

### Catppuccin Mocha — semantic fallback colours

Use these when extra colours are needed (warnings, status colours, diagnostics). Don't add extra `--ctp-*` variables to production code; use the hex values directly, with this table as the reference palette.

| Role           | Catppuccin name | Hex       | Use                              |
|----------------|-----------------|-----------|----------------------------------|
| Base           | Base            | `#1e1e2e` | Reference shade for glass elements |
| Raised         | Surface0        | `#313244` | Hover backgrounds in deeper panels |
| Text           | Subtext0        | `#a6adc8` | Reference for `--text-muted`     |
| Main accent    | Mauve           | `#cba6f7` | Close relative of `--soft-lilac` |
| Error          | Red             | `#f38ba8` | Destructive actions              |
| Success        | Green           | `#a6e3a1` | Success states                   |
| Warning        | Peach           | `#fab387` | Warnings                         |
| Info           | Blue            | `#89b4fa` | Neutral info elements            |

---

## 2. Typography

```css
* {
  font-family: 'Segoe UI Variable', 'Segoe UI', 'Inter', 'Ubuntu',
               'Cantarell', 'Noto Sans', sans-serif;
  box-sizing: border-box;
  user-select: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar { display: none; }
```

### Text hierarchy

| Style                   | Size  | Weight | Transform              | Spacing  | Use                           |
|-------------------------|-------|--------|------------------------|----------|-------------------------------|
| Heading / section label | 11px  | 800    | `uppercase`            | 1.5px    | Sidebar headings, titlebars   |
| Small caps / meta       | 10px  | 700    | `uppercase`            | 1.2px    | Field labels, dates           |
| Body text               | 13-14px | 400  | —                      | —        | General content               |
| Small text              | 12px  | 400    | —                      | —        | Timestamps, meta info         |
| Modal title             | 19px  | 700    | letter-spacing: -0.2px | —        | Event title, main modal title |

---

## 3. Glassmorphism structures

### Floating panel

```css
.aura-panel {
  background:     rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(20px);
  border:         1px solid var(--glass-border);
  border-radius:  18px;
  box-shadow:     0 25px 60px rgba(0, 0, 0, 0.4);
}
```

### Titlebar

```css
#titlebar {
  height:          40px;
  background:      rgba(10, 10, 15, 0.70);
  border-bottom:   1px solid var(--glass-border);
  display:         flex;
  align-items:     center;
}
.titlebar-title {
  font-size:       11px;
  font-weight:     800;
  letter-spacing:  2px;
  text-transform:  uppercase;
  color:           var(--soft-lilac);
}
```

### Sidebar

```css
#sidebar {
  width:           340px;
  background:      rgba(10, 10, 15, 0.20);
  backdrop-filter: blur(20px);
  border-right:    1px solid var(--glass-border);
}
.sidebar-header {
  font-size:       11px;
  font-weight:     800;
  text-transform:  uppercase;
  letter-spacing:  1.5px;
  color:           var(--soft-lilac);
}
```

### Input fields

```css
.aura-input {
  background:   rgba(255, 255, 255, 0.03);
  border:       1px solid var(--glass-border);
  border-radius: 8px;
  padding:      8px 12px;
  color:        var(--text-main);
  font-size:    13px;
  outline:      none;
  transition:   border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.aura-input:focus {
  background:   rgba(255, 255, 255, 0.06);
  border-color: rgba(182, 161, 229, 0.50);
  box-shadow:   0 0 12px rgba(182, 161, 229, 0.08);
}
```

---

## 4. Button system — CANONICAL STRUCTURE

> **Rule: a Soft Lilac background (`background: var(--soft-lilac)`) is never used on interactive buttons.** The accent colour appears only as a border, as text colour and as a light tint on hover.

### btn-accent — primary action

CTA buttons, save buttons, sign-in buttons, modal confirm buttons.

```css
.btn-accent {
  background:      transparent;
  color:           var(--soft-lilac);
  border:          1px solid rgba(182, 161, 229, 0.35);
  border-radius:   8px;       /* pill shape: 50px */
  padding:         10px 28px;
  font-size:       12px;
  font-weight:     700;
  letter-spacing:  1px;
  text-transform:  uppercase;
  cursor:          pointer;
  transition:      all 0.2s ease;
  font-family:     inherit;
}
.btn-accent:hover {
  background:      rgba(182, 161, 229, 0.12);
  border-color:    var(--soft-lilac);
  box-shadow:      0 0 16px rgba(182, 161, 229, 0.12);
  transform:       translateY(-1px);
}
.btn-accent:active {
  transform:       translateY(0);
}
```

### btn-ghost — secondary / navigation

Cancel buttons, page buttons, clickable toolbar items.

```css
.btn-ghost {
  background:   transparent;
  color:        var(--text-muted);
  border:       none;
  border-radius: 8px;
  padding:      8px 16px;
  font-size:    12px;
  font-weight:  600;
  cursor:       pointer;
  transition:   background 0.15s, color 0.15s;
  font-family:  inherit;
}
.btn-ghost:hover {
  background:   rgba(255, 255, 255, 0.06);
  color:        var(--text-main);
}
```

### btn-danger — destructive action

Delete buttons, irreversible actions.

```css
.btn-danger {
  background:   transparent;
  color:        rgba(243, 139, 168, 0.65);   /* CTP Red, dimmed */
  border:       1px solid rgba(243, 139, 168, 0.22);
  border-radius: 8px;
  padding:      10px 18px;
  font-size:    12px;
  font-weight:  600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  cursor:       pointer;
  transition:   all 0.2s ease;
  font-family:  inherit;
}
.btn-danger:hover {
  background:   rgba(243, 139, 168, 0.10);
  border-color: rgba(243, 139, 168, 0.50);
  color:        #f38ba8;
}
```

### Titlebar control buttons (min/max/close)

```css
.titlebar-btn {
  width:        44px;
  height:       40px;           /* same height as the titlebar */
  background:   transparent;
  border:       none;
  color:        var(--text-muted);
  cursor:       pointer;
  display:      flex;
  align-items:  center;
  justify-content: center;
  transition:   background 0.15s, color 0.15s;
  font-family:  inherit;
}
.titlebar-btn:hover        { background: rgba(255, 255, 255, 0.08); color: var(--text-main); }
.titlebar-btn--close:hover { background: rgba(220, 38, 38, 0.85);  color: #fff; }
```

### Round toolbar icons (floating toolbar, sidebar icons)

```css
.float-btn {
  width:        36px;
  height:       36px;
  border-radius: 50%;
  border:       none;
  background:   transparent;
  color:        var(--text-muted);
  cursor:       pointer;
  transition:   background 0.2s, color 0.2s;
  display:      flex;
  align-items:  center;
  justify-content: center;
}
.float-btn:hover  { background: rgba(255, 255, 255, 0.10); color: var(--text-main); }
.float-btn.active { background: rgba(182, 161, 229, 0.12); color: var(--soft-lilac); }
```

### Indicators — allowed solid use

Small static indicators (dot, badge, "today" number) MAY use a solid lilac background:

```css
/* Current day in the calendar */
.day-number.is-today {
  background:   var(--soft-lilac);
  color:        rgba(10, 10, 20, 0.9);
  border-radius: 50%;
}

/* Active state of a toggle indicator */
.toggle-indicator.active {
  background:   var(--soft-lilac);
  border-color: var(--soft-lilac);
}

/* Category dot (list) */
.category-dot {
  width:        6px;
  height:       6px;
  border-radius: 50%;
  background:   var(--soft-lilac);
  opacity:      0.5;
}
```

---

## 5. Coloured accent line — STANDARD PRACTICE

Every list card and event element uses a gradient edge line:

```css
.list-item {
  position: relative;
  padding-left: 16px;
}

.list-item::before {
  content:  "";
  position: absolute;
  left:     0;
  top:      15%;
  height:   70%;
  width:    2px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(
    180deg,
    transparent,
    var(--cal-color, var(--soft-lilac)),
    transparent
  );
  opacity:    0.75;
  transition: opacity 0.25s ease;
}

/* Off */
.list-item.is-off::before { opacity: 0.20; }
/* Hover */
.list-item:hover::before  { opacity: 0.90; }
```

The colour of calendar- or category-coloured elements is set with inline CSS:
```html
<div class="list-item" style="--cal-color: #4285f4">...</div>
```

**Never:** a solid colour bar, a `box-shadow` glow or a `border-left` solution.

---

## 6. Icons — Lucide policy

### Allowed — action buttons

Lucide (or equivalent inline SVG) is fine for:
- Titlebar control buttons (close, minimize, maximize)
- The settings gear icon
- Action icons in modals (edit, trash, link — small `em-btn` style buttons)

```css
/* Standard Lucide icon size in action buttons */
[data-lucide] {
  width:         16px;
  height:        16px;
  stroke:        currentColor;
  stroke-width:  2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill:          none;
  flex-shrink:   0;
}
```

### Forbidden — data content and lists

**A Lucide icon is never used as a decorative prefix in front of a data row.** This applies to:
- Metric rows in the weather app (`thermometer`, `wind`, `droplets` etc.)
- Agenda lists and info panels
- Field labels in the settings panel

**Use instead:**

```html
<!-- Not like this -->
<span class="metric-label"><i data-lucide="thermometer"></i> Feels like</span>

<!-- Like this: a plain text label -->
<span class="metric-label">Feels like</span>

<!-- Or: a Unicode character when visual separation is needed -->
<span class="metric-label">↗ Wind</span>
<span class="metric-label">· Humidity</span>
```

In a data row the value matters more than an icon; the icon adds no information.

---

## 7. Interactions & animations

### Hover effects on cards

```css
.aura-card {
  transition: transform 0.2s ease, background 0.2s ease;
}
.aura-card:hover {
  transform:  translateY(-2px);
  background: rgba(255, 255, 255, 0.06);
}
```

### Modal entrance (bottom up)

```css
@keyframes aura-slide-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
.aura-modal {
  animation: aura-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Delete buttons (hidden, appear on hover)

```css
.delete-btn {
  opacity:    0;
  transition: opacity 0.15s, background 0.15s;
  color:      rgba(243, 139, 168, 0.7);
}
.parent-item:hover .delete-btn {
  opacity:    1;
}
.delete-btn:hover {
  background: rgba(220, 38, 38, 0.80);
  color:      #fff;
}
```

---

## 8. Components

### Confirm modal

```css
.confirm-card {
  background:    rgba(18, 18, 28, 0.98);
  border:        1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
  padding:       32px;
  width:         340px;
  box-shadow:    0 30px 80px rgba(0, 0, 0, 0.6);
}
.confirm-card h2 {
  font-size:      11px;
  font-weight:    800;
  letter-spacing: 2px;
  color:          var(--soft-lilac);
}
/* Buttons: use .btn-accent (OK), .btn-danger (Delete), .btn-ghost (Cancel) */
```

### Custom select

```css
.cs-trigger {
  background:    rgba(30, 28, 48, 0.85);
  border:        1px solid rgba(182, 161, 229, 0.18);
  border-radius: 8px;
  padding:       8px 10px 8px 12px;
  color:         var(--text-main);
  transition:    border-color 0.15s, background 0.15s;
}
.cs-trigger:hover  { border-color: rgba(182, 161, 229, 0.35); }
.cs-trigger:focus  { border-color: rgba(182, 161, 229, 0.60); outline: none; }

.cs-popup {
  background:    rgba(20, 18, 34, 0.98);
  border:        1px solid rgba(182, 161, 229, 0.20);
  border-radius: 10px;
  box-shadow:    0 12px 32px rgba(0, 0, 0, 0.5);
}
.cs-option:hover      { background: rgba(182, 161, 229, 0.10); }
.cs-option.cs-selected {
  color:       var(--soft-lilac);
  font-weight: 600;
}
```

### View tabs (segmented control)

```css
#view-tabs {
  display:       inline-flex;
  gap:           4px;
  padding:       6px;
  border-radius: 50px;
  background:    var(--glass);
  border:        1px solid var(--glass-border);
}
.view-tab {
  border:          none;
  border-radius:   50px;
  background:      transparent;
  color:           var(--text-muted);
  font-size:       11px;
  font-weight:     700;
  text-transform:  uppercase;
  letter-spacing:  1.5px;
  padding:         8px 18px;
  cursor:          pointer;
  transition:      all 0.2s ease;
}
.view-tab:hover:not(.is-active) {
  color:      var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}
.view-tab.is-active {
  color:       var(--soft-lilac);
  background:  rgba(182, 161, 229, 0.10);
}
```

---

## 9. Chat / messages

```css
/* User message */
.msg-user {
  align-self:    flex-end;
  background:    rgba(182, 161, 229, 0.10);
  border:        1px solid rgba(182, 161, 229, 0.20);
  border-radius: 12px;
  color:         var(--text-main);
}

/* AI / system */
.msg-system {
  align-self:    flex-start;
  background:    rgba(255, 255, 255, 0.03);
  border:        1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color:         #eef;
}
```

---

## 10. How to use — new project

Paste this manifesto into the chat and use the prompt:

> *"Build the UI according to AURA UI MANIFESTO v2. Style: Midnight Glass, Catppuccin Mocha fallback palette. Buttons use only the btn-accent / btn-ghost / btn-danger classes — no solid soft-lilac backgrounds. Lucide icons only on action buttons, never in data content."*

### Review checklist

- [ ] All interactive buttons use the `btn-accent`, `btn-ghost` or `btn-danger` structure (transparent background)
- [ ] `background: var(--soft-lilac)` appears only on static indicators (today number, toggle, dot)
- [ ] NO Lucide icons in data lists or in front of metric rows
- [ ] List items have the gradient `::before` accent line (not `border-left`)
- [ ] Scrollbars hidden (`scrollbar-width: none`)
- [ ] Canonical variable set in use (no home-made names like `--accent`, `--bg-primary`)
- [ ] Font: Segoe UI Variable / Inter / Ubuntu / Cantarell stack
