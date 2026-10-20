# AURA UI-MANIFESTO v2 — "Midnight Glass"

Aura-ekosysteemin visuaalinen kieli on **hiljainen, tumma ja lasistilainen** — ei cyberpunk, ei neon. Tunnelma on kuin pimeä talviyö: syvä tausta, lasi-efektit, yksi hillitty korostusväri (Soft Lilac). Fallback-palettina toimii **Catppuccin Mocha**, jonka värit sopivat täydellisesti Aura-taustakerrostuksen kanssa.

---

## 1. CSS-muuttujat — kanoninen setti

Nämä muuttujat on pakollinen jokaisessa Aura-sovelluksessa. Käytä näitä nimiä — älä keksi uusia variantteja.

```css
:root {
  /* ── Taustat ──────────────────────────────────────── */
  --midnight:      rgba(10, 10, 15, 0.97);   /* Sovellusikkuna, opaque tila */
  --glass:         rgba(30, 30, 45, 0.60);   /* Kelluvat paneelit = CTP Base */
  --glass-border:  rgba(255, 255, 255, 0.08);

  /* ── Korostusväri ─────────────────────────────────── */
  --soft-lilac:    #B6A1E5;
  --accent-glow:   rgba(182, 161, 229, 0.40);

  /* ── Teksti ───────────────────────────────────────── */
  --text-main:     #ffffff;
  --text-muted:    #9999aa;

  color-scheme: dark;
}
```

### Catppuccin Mocha — semanttiset fallback-värit

Käytä näitä kun tarvitaan lisävärejä (varoitukset, tilavärit, diagnostiikka). Älä lisää ylimääräisiä `--ctp-*`-muuttujia varsinaiseen tuotantokoodiin — käytä suoraan hex-arvoja viitepalettina.

| Rooli          | Catppuccin-nimi | Hex       | Käyttö                          |
|----------------|-----------------|-----------|----------------------------------|
| Base           | Base            | `#1e1e2e` | Lasiselementtien viitesävy       |
| Kohoelementti  | Surface0        | `#313244` | Hover-taustat syvemmissä paneeleissa |
| Teksti         | Subtext0        | `#a6adc8` | Viiteväri `--text-muted`:lle    |
| Pääkorostus    | Mauve           | `#cba6f7` | Lähisukulainen `--soft-lilac`:lle |
| Virhe          | Red             | `#f38ba8` | Destruktiiviset toiminnot        |
| Menestys       | Green           | `#a6e3a1` | Onnistumistilat                  |
| Varoitus       | Peach           | `#fab387` | Varoitukset                      |
| Info           | Blue            | `#89b4fa` | Neutraalit infoelementit         |

---

## 2. Typografia

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

### Tekstihierarkia

| Tyyli                   | Koko  | Paino | Muuntelu                | Välistys | Käyttö                        |
|-------------------------|-------|-------|-------------------------|----------|-------------------------------|
| Otsikko / section-label | 11px  | 800   | `uppercase`             | 1.5px    | Sidebar-otsikot, titlebaret   |
| Kapiteeli / meta        | 10px  | 700   | `uppercase`             | 1.2px    | Kenttäotsikot, päivämäärät    |
| Leipäteksti             | 13-14px | 400 | —                       | —        | Yleinen sisältö               |
| Pienikokoinen teksti    | 12px  | 400   | —                       | —        | Aikaleimat, meta-info         |
| Modal-otsikko           | 19px  | 700   | letter-spacing: -0.2px  | —        | Event-title, modal pääotsikko |

---

## 3. Glassmorphism-rakenteet

### Kelluva paneeli

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

### Input-kentät

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

## 4. Nappisysteemi — KANONINEN RAKENNE

> **Sääntö: Soft Lilac -taustaa (`background: var(--soft-lilac)`) ei käytetä koskaan interaktiivisissa napeissa.** Korostusväri esiintyy ainoastaan reunaviivana, tekstivärinä ja hoverilla kevyenä tintinä.

### btn-accent — päätoimintonappi

CTA-napit, tallennusnapit, kirjautumisnapit, modalien vahvistusnapit.

```css
.btn-accent {
  background:      transparent;
  color:           var(--soft-lilac);
  border:          1px solid rgba(182, 161, 229, 0.35);
  border-radius:   8px;       /* pill-muodolle: 50px */
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

### btn-ghost — toissijainen / navigaationappi

Peruutusnapit, sivunapit, toolbar-klikattavat kohteet.

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

### btn-danger — destruktiivinen toiminto

Poistonapit, peruuttamattomat toiminnot.

```css
.btn-danger {
  background:   transparent;
  color:        rgba(243, 139, 168, 0.65);   /* CTP Red, himmennetty */
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

### Titlebar-kontrollinapit (min/max/close)

```css
.titlebar-btn {
  width:        44px;
  height:       40px;           /* sama korkeus kuin titlebar */
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

### Toolbar-pyöreät ikonit (floating toolbar, sidebar-ikonit)

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

### Indikaattorit — sallittu solid-käyttö

Pienet staattiset indikaattorit (dot, badge, "today"-numero) SAA värittää solidilla lila-taustalla:

```css
/* Nykyinen päivä kalenterissa */
.day-number.is-today {
  background:   var(--soft-lilac);
  color:        rgba(10, 10, 20, 0.9);
  border-radius: 50%;
}

/* Toggle-indikaattorin aktiivitila */
.toggle-indicator.active {
  background:   var(--soft-lilac);
  border-color: var(--soft-lilac);
}

/* Kategoriadotti (lista) */
.category-dot {
  width:        6px;
  height:       6px;
  border-radius: 50%;
  background:   var(--soft-lilac);
  opacity:      0.5;
}
```

---

## 5. Värillistä korostusviiva (Accent Line) — VAKIOKÄYTÄNTÖ

Kaikissa listakorteissa ja tapahtuma-elementeissä käytetään gradient-reunaviivaa:

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

/* Pois päältä */
.list-item.is-off::before { opacity: 0.20; }
/* Hover */
.list-item:hover::before  { opacity: 0.90; }
```

Kalenteri-/kategoriavärillisten elementtien väri asetetaan inline-CSS:llä:
```html
<div class="list-item" style="--cal-color: #4285f4">...</div>
```

**Ei koskaan:** kiinteää väripalkkia, `box-shadow`-hehkua tai `border-left` -ratkaisua.

---

## 6. Ikonit — Lucide-politiikka

### Sallittu — toimintonapit

Lucide (tai vastaava inline-SVG) on OK näissä:
- Titlebarin ohjausnapit (close, minimize, maximize)
- Asetukset-gear-ikoni
- Action-ikonit modaleissa (edit, trash, link — pienet `em-btn`-tyyppiset napit)

```css
/* Lucide-ikonin standardikoko toimintonapeissa */
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

### Kielletty — datasisältö ja listat

**Lucide-ikonia ei käytetä datarivin eteen dekoratiivisena prefiksiksi.** Tämä koskee:
- Sääsovelluksen metririvit (`thermometer`, `wind`, `droplets` jne.)
- Agendalistat ja tietopaneelit
- Asetuspaneelin kenttäotsikot

**Sijaan käytetään:**

```html
<!-- Ei näin -->
<span class="metric-label"><i data-lucide="thermometer"></i> Feels like</span>

<!-- Näin: pelkkä tekstitunniste -->
<span class="metric-label">Feels like</span>

<!-- Tai: Unicode-merkki kun visuaalinen erottelu tarpeen -->
<span class="metric-label">↗ Wind</span>
<span class="metric-label">· Humidity</span>
```

Datarivissä arvo on tärkeämpi kuin ikoni — ikoni ei lisää informaatiota.

---

## 7. Interaktiot & animaatiot

### Hover-efektit korteissa

```css
.aura-card {
  transition: transform 0.2s ease, background 0.2s ease;
}
.aura-card:hover {
  transform:  translateY(-2px);
  background: rgba(255, 255, 255, 0.06);
}
```

### Modal sisääntulo (alhaalta ylös)

```css
@keyframes aura-slide-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
.aura-modal {
  animation: aura-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Poistonapit (piilotettu, hover-ilmestyvä)

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

## 8. Komponentit

### Confirm-modal

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
/* Napit: käytä .btn-accent (OK), .btn-danger (Poista), .btn-ghost (Peruuta) */
```

### Custom Select

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

### View Tabs (segmented control)

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

## 9. Chat / viestit

```css
/* Käyttäjän viesti */
.msg-user {
  align-self:    flex-end;
  background:    rgba(182, 161, 229, 0.10);
  border:        1px solid rgba(182, 161, 229, 0.20);
  border-radius: 12px;
  color:         var(--text-main);
}

/* AI / järjestelmä */
.msg-system {
  align-self:    flex-start;
  background:    rgba(255, 255, 255, 0.03);
  border:        1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color:         #eef;
}
```

---

## 10. Käyttöohje — uusi projekti

Liitä tämä manifesto chattiin ja käytä komentoa:

> *"Rakenna käyttöliittymä AURA UI-MANIFESTO v2:n mukaisesti. Tyyli: Midnight Glass, Catppuccin Mocha fallback-paletti. Napeissa käytetään ainoastaan btn-accent / btn-ghost / btn-danger -luokkia — ei solid soft-lilac -taustoja. Lucide-ikoneja vain toimintonapeissa, ei datasisällössä."*

### Muistilista tarkistukseen

- [ ] Kaikki interaktiiviset napit käyttävät `btn-accent`, `btn-ghost` tai `btn-danger` -rakennetta (transparent background)
- [ ] `background: var(--soft-lilac)` esiintyy vain staattisissa indikaattoreissa (today-numero, toggle, dot)
- [ ] Lucide-ikoneja EI ole datalistossa tai metririvien edessä
- [ ] Listaelementeissä on gradient `::before` accent-line (ei `border-left`)
- [ ] Scrollbarit piilotettu (`scrollbar-width: none`)
- [ ] Kanoninen muuttujasetti käytössä (ei `--accent`, `--bg-primary` yms. omia nimiä)
- [ ] Fontti: Segoe UI Variable / Inter / Ubuntu / Cantarell -stack
