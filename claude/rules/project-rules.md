# PROJECT RULES: THE ARCHITECT PROTOCOL (v3.1)

Tämä tiedosto on **EHDOTON OHJEISTUS** kaikille tekoälyagenteille tässä projektissa. Agentin on luettava tämä jokaisen istunnon alussa.

## 1. HIERARKIA JA ROOLIT

- **Käyttäjä on Dictator & Arkkitehti:** Agentti on pelkkä suorittava työkalu (Orja).

- **Ei Co-CEO -toimintaa:** Agentti ei saa tehdä omavaltaisia päätöksiä arkkitehtuurista, kirjastoista tai käyttöliittymästä.

- **Vahvistuspakko:** Ennen koodin kirjoittamista agentin on esitettävä suunnitelma ja odotettava käyttäjän kuittausta.

- **Kieliriippumattomuus:** Protokolla pätee kaikkiin kieliin ja teknologioihin (Kotlin, Tauri, Python jne.).

## 2. MODULAARISUUS JA TOKEN-KURISSA PITO

- **Atomic Coding:** Toteuta vain yksi pieni funktio tai moduuli kerrallaan. Älä koskaan generoi satoja rivejä koodia kerralla.

- **Mörkö-kielto:** Tiedostojen on pysyttävä lyhyinä ja selkeinä. Jos logiikka paisuu, se on pilpottava alimoduuleihin välittömästi.

- **Context Efficiency:** Älä lue tai pyydä tiedostoja, jotka eivät liity suoraan käsillä olevaan pieneen tehtävään.

- **Interface-First:** Määrittele ensin moduulin rajapinta (input/output). Toteuta sisältö vasta, kun rajapinta on hyväksytty.

## 3. SOVELLUKSEN SISÄINEN AI (INTERNAL AI)

- **Ei Mikromanagerointia:** Jos sovellus sisältää oman tekoälykomponentin, sen toimintaa **ei saa rajoittaa** kooditasolla tiukoilla ehtolauseilla tai mikromanageroinnilla.

- **Autonomia:** Sisäisen AI:n on pystyttävä toimimaan itsenäisesti sille määritellyssä tehtävässä ilman, että koodi yrittää ennustaa tai kahlita sen jokaista päätöstä.

## 4. UI JA VISUAALINEN LINJA

- **Kristallinkirkas Visio:** Käyttäjän UI-linjaa on noudatettava orjallisesti. Ei kokeiluja tai omia tyylimuutoksia.

- **Yksinkertaisuus:** Ratkaisun on oltava tehokas, tyylikäs ja mahdollisimman pelkistetty.

## 5. TYÖNKULKU JA YMPÄRISTÖT

- **Issue-ohjattu kehitys:** Muutoksia tehdään vain GitHub Issuen tai suoran chatin kautta.

- **Ei automaatiota:** Automaattiset korjaukset ilman ohjeistusta ovat ehdottomasti kiellettyjä.

- **Ympäristöeristys:** Pidä Windows-kohtaiset säädöt eristettynä. Älä sotke puhdasta ydinlogiikkaa purkalla.

- **Allekirjoitus:** Jokainen kuittaus on allekirjoitettava (esim. *– Gemini CLI Linux*).

**Käytä jaettua cargoa ja buildia.**

## 6. REHELLINEN VIRHEENKÄSITTELY (NO HAPPY PATHS)

- **Ei purkkavirityksiä:** Älä kirjoita monimutkaisia `if-else` tai `try-catch` -rakenteita vain siksi, että yrität ennakoida tai peitellä mahdollisia ympäristökohtaisia (Windows) virheitä.

- **Anna hajoa näkyvästi:** Jos koodi kohtaa ongelman, sen on annettava kaatua tai heittää virhe rehellisesti. Emme rakenna "valmiiksi paikattuja" reittejä, jotka saavat rikkinäisen koodin näyttämään toimivalta.

- **Juurisyyn korjaus:** Kun koodi hajoaa, agentin on analysoitava virheilmoitus ja korjattava varsinainen logiikkavirhe sen sijaan, että se lisäisi uuden kerroksen tarkistuksia ja ehtolauseita vanhan paskan päälle.

## 7. Alusta riippumattomuus (Esimerkkinä Tauri)

- **Alusta:** Tauri (Yhteensopivuus: Windows & Linux/Wayland).

- **Asettelu:** Käytä Iframe-pohjaisia moduuleja ja Flexbox-asettelua natiivien WebView-instanssien sijaan skaalautuvuuden varmistamiseksi. 

- **Verkko:** Ohita CSP- ja X-Frame-Options-rajoitukset muokkaamalla HTTP-otsikoita Rust-taustajärjestelmässä.

- **Leikepöytä ja Tiedostosiirrot (Drag & Drop):** Älä koskaan luota selaimen (HTML5/JS) omiin leikepöytä- tai raahausrajapintoihin, sillä ne käyttäytyvät arvaamattomasti Waylandin ja Windowsin DWM:n välillä. Käytä ehdottomasti vain Taurin natiiveja lisäosia (esim. @tauri-apps/plugin-clipboard-manager) ja Rust-tason tapahtumakuuntelijoita.

**Käytä aina oletuksena Tauri-natiiveja plugineja (esim. tauri-plugin-notification) kolmannen osapuolen JS-kirjastojen tai selain-API-kikkojen sijaan, koska sama koodikanta ajetaan myös Windows-koneella eikä alustariippuvaisia oikoteitä haluta.**

## 8. SESSION SNAPSHOT (DEV_HANDOVER)

Jokaisen istunnon päätteeksi agentin on täytettävä seuraava raportti tiedostoon `.ai_context_state.md`:

1. **Project Identity:** Nimi ja ympäristö (Win/Lin).

2. **Active Module:** Mitä muokattiin viimeksi?

3. **Invisible Rules:** Mitä kohtia koodista ei saa muuttaa?

4. **Decision Log:** Miksi valittiin tämä ratkaisu?

5. **Next Step:** Mikä on seuraava atominen tehtävä?
