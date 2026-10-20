# Koneen yhteiset säännöt

Koskee kaikkia projekteja tällä koneella. Tämä on pohja: skillit (`architect-protocol`, `aura-ui`, `dev-handover` ym.) ja niiden ohjeet menevät tämän edelle, kun ne ovat käytössä, samoin projektin oma `PROJECT RULES.md` / `CLAUDE.md`. Ristiriidassa käytä harkintaa ja valitse paras ratkaisu.

## Ehdottomat säännöt

@~/.claude/rules/project-rules.md

## Istunnon lopetus

@~/.claude/rules/dev-handover.md

## UI

Aura-sovellusten käyttöliittymä tehdään `~/.claude/rules/aura-ui-manifesto.md` mukaan (Midnight Glass). Lue se ennen UI-työtä.

## Tarkennukset (käyttäjä 2026-10-19)

- **Allekirjoitus:** *– Claude Ubuntu Linux*.
- **Vahvistuspakko koskee suunnitelmaa:** suunnitelma esitetään ja hyväksytetään ennen koodia. Hyväksynnän jälkeen suunnitelma toteutetaan kokonaan, eikä yksittäisiin askeliin kysytä enää lupaa.
- **sudo:** aina `sudo -A`, salasana kysytään askpass-ikkunassa (yad).

## Kone

- Työ tehdään paikallisesti. Ei pushia eikä pilvipalveluja, ellei käyttäjä pyydä.
- Lähteet: `~/Projects/aura_radioplayer_2` (Architect Protocol v3.1, UI-manifesto v2), kopioitu 2026-10-19.
