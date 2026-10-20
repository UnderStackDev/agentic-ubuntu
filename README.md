# agentic-ubuntu

> **English summary:** How agentic coding with Claude Code is set up on a
> personal Ubuntu 26.10 / GNOME 51 (Wayland) desktop used for Tauri apps and
> GNOME extensions. The human is the architect; the agent plans, waits for
> approval, then implements the whole plan, in small modules with honest errors,
> and writes a handover file at the end of every session. This repo has the rules,
> the skills, the hooks and a terminal mod, all as plain files you can copy.

Tämä repo näyttää, miten agenttikoodaus (Claude Code) on toteutettu omalla
Ubuntu-koneellani: millä säännöillä agentti toimii, mitkä skillit ohjaavat työtä,
mitkä hookit kertovat työpöydälle agentin tilan ja millainen plugin tekee
päätteestä luettavamman. Kaikki on tavallisia tiedostoja, jotka voi kopioida.

## Ydinajatus

1. **Ihminen on arkkitehti, agentti suorittaa.** Agentti ei päätä
   arkkitehtuurista, kirjastoista eikä käyttöliittymästä omin päin.
2. **Suunnitelma → hyväksyntä → koko toteutus.** Ennen koodia agentti esittää
   suunnitelman. Kun se on hyväksytty, agentti tekee koko suunnitelman eikä kysy
   jokaiseen askeleeseen lupaa erikseen.
3. **Pienet moduulit, rehelliset virheet.** Ei satojen rivien kertarysäyksiä eikä
   try/catch-purkkaa. Koodi saa hajota näkyvästi, ja korjaus tehdään juurisyyhyn.
4. **Jatkuvuus tiedostossa, ei chatissa.** Istunnon lopussa agentti kirjoittaa
   `.ai_context_state.md`:n, josta seuraava istunto (mikä tahansa agentti) saa
   tilan noin tuhannella tokenilla.
5. **Paikallinen ensin.** Työ tehdään koneella. Push ja pilvipalvelut vain
   pyynnöstä.

Lisää: [docs/principles.md](docs/principles.md) ja [docs/workflow.md](docs/workflow.md).

## Sisältö

| Polku | Mitä |
|---|---|
| [`claude/CLAUDE.md`](claude/CLAUDE.md) | Globaali pohja (`~/.claude/CLAUDE.md`): tuo säännöt mukaan `@`-importeilla |
| [`claude/rules/`](claude/rules) | Architect Protocol v3.1, Dev_Handover Protocol, Aura UI -manifesto v2 |
| [`claude/settings.example.json`](claude/settings.example.json) | Siistitty `settings.json`: hookit, statusline, askpass, plugin |
| [`skills/`](skills) | Omat skillit: `architect-protocol`, `dev-handover`, `aura-ui`, `ubuntu`, `gnome-extension-dev` |
| [`plugins/`](plugins) | Plugin-marketplace `agentic-ubuntu`: `selkea`-mod (luettavampi transkripti) |
| [`machine/`](machine) | Jaettu `~/.cargo/config.toml` (sccache + mold) ja `sudo-askpass` (yad) |
| [`templates/`](templates) | Tyhjä `.ai_context_state.md`-pohja |
| [`install.sh`](install.sh) | Kopioi säännöt ja skillit `~/.claude`:en (oletuksena kuivaharjoitus) |
| [`docs/`](docs) | Periaatteet, työnkulku, kone, hookit |

## Säännöt vs. skillit

`CLAUDE.md` ja `rules/` ovat **pohja**, joka ladataan jokaiseen istuntoon.
Skillit ovat **työrutiineja**, jotka latautuvat silloin, kun tehtävä niitä
vaatii, ja ne menevät pohjan edelle. Projektin oma `PROJECT RULES.md` tai
`CLAUDE.md` menee molempien edelle. Ristiriidassa agentti käyttää harkintaa.

| Skill | Milloin latautuu |
|---|---|
| `architect-protocol` | ennen suunnittelua tai koodin kirjoittamista ("tee", "korjaa", "toteuta") |
| `dev-handover` | istunnon lopussa ("lopetetaan", "jatketaan huomenna") ja alussa, jos handover-tiedosto on olemassa |
| `aura-ui` | UI-työssä: Midnight Glass, Soft Lilac, napit, typografia |
| `ubuntu` | koneen säätö: gsettings, laajennukset, apt/flatpak, `sudo -A` |
| `gnome-extension-dev` | GNOME Shell -laajennukset ilman uloskirjautumista (hot reload) |

Lisäksi käytössä on Anthropicin valmiita skillejä (mm. `docs`, `skill-creator`,
`deep-research`). Ne eivät ole tässä repossa, koska ne eivät ole minun
tekemiäni.

## Asennus

```bash
git clone https://github.com/UnderStackDev/agentic-ubuntu ~/Projects/agentic-ubuntu
cd ~/Projects/agentic-ubuntu
./install.sh          # näyttää, mitä tekisi
./install.sh --apply  # kopioi (olemassa olevat tiedostot varmuuskopioidaan .bak-päätteellä)
```

Sen jälkeen:

1. Vaihda allekirjoitus ja konetiedot omiksesi: `claude/CLAUDE.md`,
   `skills/architect-protocol`, `skills/ubuntu`.
2. Yhdistä `claude/settings.example.json` omaan `~/.claude/settings.json`:iin
   käsin. Korvaa `/home/YOU` ja jätä pois hookit, joiden skriptejä sinulla ei ole
   (ks. [docs/hooks.md](docs/hooks.md)).
3. Plugin: `claude plugin install selkea@agentic-ubuntu`, kun marketplace on
   lisätty asetuksiin. Muutokset tulevat voimaan komennolla `/reload-plugins`.

## Lisenssi

MIT, ks. [LICENSE](LICENSE).
