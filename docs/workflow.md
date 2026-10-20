# Työnkulku

```
istunto alkaa
  └─ .ai_context_state.md olemassa? → lue se ensin (dev-handover)
pyyntö chatissa tai GitHub Issuessa
  └─ architect-protocol latautuu
       1. suunnitelma: mitä muuttuu, mitkä tiedostot, uusien moduulien rajapinnat, riskit
       2. käyttäjä hyväksyy (tai korjaa)
       3. toteutus kokonaan, moduuli kerrallaan, ilman askelkohtaisia lupia
       4. tarkistus: build / testit / ajetaan oikeasti
       5. paikallinen commit
istunto loppuu ("lopetetaan", "jatketaan huomenna")
  └─ dev-handover: .ai_context_state.md päivitetään ja commitoidaan
"valmis" → vasta nyt push / release
```

## Poikkeukset

- **Triviaali korjaus** (kirjoitusvirhe, yksi rivi) tehdään suoraan ilman
  suunnitelmaa.
- **"suorita" / "ohita luvat"** ohittaa suunnitelmavaiheen.
- **Käyttäjälle kuuluva päätös** kesken toteutuksen (uusi kirjasto, UI-muutos,
  arkkitehtuuri) kysytään, vaikka suunnitelma olisi jo hyväksytty.

## Handover-tiedosto

Pohja: [`templates/.ai_context_state.md`](../templates/.ai_context_state.md).
Tiedosto on lyhyt ja pelkkää faktaa: polut, komennot, viimeisin virhe,
päätösloki ja seuraava atominen tehtävä. Päätösloki estää hylättyjä ratkaisuja
palaamasta seuraavassa istunnossa.

**Miksi:** chat-historia katoaa, agentti ja käyttöjärjestelmä vaihtuvat, mutta
projektin juuressa oleva tiedosto säilyy. Sen lukemiseen kuluu noin tuhat
tokenia, kun koodikannan haravointiin menisi kymmeniä tuhansia.

## Muisti

Claude Coden oma muisti (`~/.claude/projects/*/memory/`) tallentaa koneesta ja
käyttäjästä asioita, jotka eivät näy koodista: miten kone on säädetty, mitä
käyttäjä on aiemmin korjannut ja mitkä projektit ovat käynnissä. Muistitiedostot
ovat henkilökohtaisia, joten ne eivät ole tässä repossa.
