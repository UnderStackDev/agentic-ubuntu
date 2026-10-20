# Hookit, statusline ja plugin

Hookit on määritelty tiedostossa
[`claude/settings.example.json`](../claude/settings.example.json). Ne eivät
ohjaa agenttia vaan kertovat työpöydälle, mitä agentti on tekemässä.

## 1. Agentin tila GNOMEn yläpalkkiin

`~/Projects/gnome_plugin_agents/bin/claude-state-hook` kuuntelee tapahtumia
`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`,
`PermissionRequest`, `Notification`, `Stop`, `StopFailure` ja `SessionEnd`.
Se kirjoittaa jokaisesta istunnosta tilatiedoston hakemistoon
`~/.local/state/understack/agents/sessions/`:

| Tila | Milloin |
|---|---|
| `working` | prompti lähetetty tai työkalu käynnissä |
| `idle` | vuoro päättyi, agentti odottaa |
| `attention` | lupakysely tai kysymys odottaa käyttäjää |

GNOME Shell -laajennus (Claude Status) seuraa hakemistoa ja vaihtaa yläpalkin
ikonia. Kun agentti odottaa vastausta, sen huomaa vaikka toinen ikkuna olisi
päällä. Hook ei koskaan pysäytä Claudea: se palauttaa aina 0 eikä tulosta mitään.

Samassa laajennuksessa on **errwatch**: se seuraa journalia, kirjoittaa
kaatuneista palveluista ja työpöydän virheistä incident-tiedoston ja antaa sen
Claudelle muodossa "lue tämä, etsi syy, ehdota korjausta". Agentti diagnosoi ja
kysyy ennen kuin muuttaa järjestelmää.

## 2. Ghostty-ilmoitukset ja statusline

`~/.local/share/ghostex/hooks/agent-shell-notify.sh` on kaikissa tapahtumissa
mukana. Se näyttää päätteessä ilmoituksen, kun agentti tarvitsee käyttäjää tai
lopettaa. `agent-statusline.sh` piirtää statusrivin. Molemmat tulevat
Ghostex-työkalusta. Jos sitä ei ole, nämä rivit voi poistaa asetuksista.

## 3. selkea-plugin

[`plugins/selkea`](../plugins/selkea) on Claude Coden mod, joka tekee
transkriptista luettavamman:

- omat viestit ja Clauden vastaukset nimetyissä kehyksissä (Sinä / Claude)
- lyhyet välihuomiot himmeinä riveinä
- lihavointi värillä (turkoosi, vihreä, violetti tai pois)
- jokaisen vuoron lopussa viiva ja vuoron kesto

Asetukset (`boxes`, `language`, `bold`) valitaan pluginin asetuksista.
Marketplace on hakemistotyyppinen, joten muokkaukset tulevat voimaan komennolla
`/reload-plugins` ilman uudelleenasennusta.

```bash
claude plugin validate plugins/selkea
```
