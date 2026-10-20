# Kone

| | |
|---|---|
| Rauta | HP ProDesk 600 G3 DM: Pentium G4400T (2 ydintä), 14 GiB RAM |
| OS | Ubuntu 26.10, kernel 7.3 |
| Työpöytä | GNOME Shell 51, Wayland, vakio-Ubuntu-istunto |
| Pääte | Ghostty + zsh (starship) |
| Paketit | apt ja flatpak (snap poistettu), `cargo binstall` |
| Käyttö | Tauri-sovellukset, GNOME Shell -laajennukset, selainlaajennukset |

Kone on vaatimaton, joten agentin ohjeissa (`skills/ubuntu`) sanotaan suoraan,
ettei se käynnistä raskaita rinnakkaisbuildeja.

## Jaettu Rust/Tauri-build

[`machine/cargo-config.toml`](../machine/cargo-config.toml) → `~/.cargo/config.toml`

- **sccache:** jokainen riippuvuus (tokio, serde, tauri…) käännetään kerran, ja
  seuraava projekti saa sen välimuistista.
- **mold + clang:** isot GUI-binäärit linkittyvät moninkertaisesti nopeammin.
- **dev-profiili:** `line-tables-only`-debug ja riippuvuudet `opt-level 2`:lla.
- Työkalut asennetaan valmiina binääreinä komennolla `cargo binstall`
  (tauri-cli, cargo-deb, cargo-generate-rpm), koska `cargo install` kääntäisi
  ne kahdella ytimellä ikuisuuden.
- Julkaisut tehdään .deb- ja .rpm-paketteina.

## sudo agentille: `sudo -A` + yad

Salasanaton sudo ei ole käytössä. Agentti ajaa root-komennot muodossa
`sudo -A ...`. `SUDO_ASKPASS` (asetettu `settings.json`:n `env`-kentässä)
osoittaa skriptiin [`machine/sudo-askpass`](../machine/sudo-askpass), joka avaa
pienen yad-ikkunan, jossa on pelkkä salasanakenttä.

- Agentti kertoo **ennen** komentoa, mitä se tekee, koska ikkunassa näkyy vain
  salasanakenttä.
- Jos käyttäjä peruuttaa, agentti ei yritä uudelleen vaan kysyy.
- Salasana ei koskaan päädy agentin kontekstiin.

```bash
sudo apt install yad
install -m 755 machine/sudo-askpass ~/.local/bin/sudo-askpass
```
