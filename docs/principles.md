# Periaatteet

Koko teksti: [`claude/rules/project-rules.md`](../claude/rules/project-rules.md)
(Architect Protocol v3.1). Tässä on lyhennelmä ja syyt sen takana.

## 1. Roolit

Käyttäjä on arkkitehti, agentti suorittaa. Agentti ei tee omin päin päätöksiä
arkkitehtuurista, kirjastoista eikä UI:sta.

**Miksi:** agentti tekee mielellään "parannuksia", joita kukaan ei pyytänyt.
Selkeä roolijako pitää koodikannan sellaisena kuin sen omistaja haluaa.

## 2. Vahvistuspakko koskee suunnitelmaa, ei askelia

Suunnitelma esitetään ja hyväksytetään ennen koodia. Hyväksynnän jälkeen agentti
toteuttaa sen kokonaan eikä kysy enää jokaisesta askeleesta erikseen. Uudelleen
kysytään vain, jos suunnitelma osoittautuu vääräksi tai vastaan tulee päätös,
joka kuuluu käyttäjälle.

**Miksi:** jatkuva luvan kysely on yhtä huonoa kuin sen kokonaan puuttuminen.
Yksi hyväksyntäkohta pitää ihmisen ohjaimissa ja agentin työssä.

## 3. Pienet moduulit

Yksi funktio tai moduuli kerrallaan. Tiedostot pysyvät lyhyinä (noin 150 riviä)
ja pilkotaan, kun logiikka paisuu. Rajapinta (input/output) määritellään ennen
toteutusta. Agentti lukee vain ne tiedostot, jotka liittyvät tehtävään.

**Miksi:** pieni tiedosto mahtuu kontekstiin kokonaan, ja muutos on helppo
tarkistaa. Lisäksi tokeneita kuluu vähemmän.

## 4. Ei happy path -purkkaa

Ei try/catch- tai if-else-kerroksia, joilla peitetään ympäristövirheitä.
Koodi saa kaatua näkyvästi, virheilmoitus luetaan ja juurisyy korjataan.

**Miksi:** "valmiiksi paikattu" koodi näyttää toimivalta, vaikka se on rikki, ja
jokainen purkkakerros vaikeuttaa seuraavaa korjausta.

## 5. Sovelluksen oma AI saa olla autonominen

Jos sovelluksessa on oma tekoälykomponentti, sitä ei kahlita kooditason
ehtolauseilla. Sille annetaan tehtävä, ei käsikirjoitusta.

## 6. Alustanatiivit rajapinnat

Tauri-sovelluksissa käytetään Taurin natiiveja plugineja (leikepöytä,
ilmoitukset, drag & drop) eikä selaimen API-kikkoja, jotka käyttäytyvät eri
tavoin Waylandissa ja Windowsissa. GNOME-puolella käytetään GNOMEn omia
rajapintoja.

## 7. UI-linja on käyttäjän

Visuaalinen kieli ([Aura UI -manifesto](../claude/rules/aura-ui-manifesto.md),
"Midnight Glass") noudatetaan sellaisenaan. Agentti ei kokeile omia tyylejä.

## 8. Paikallinen ensin

Työ tehdään paikallisesti ja commitoidaan iteroidessa. Push ja julkaisu tehdään
vasta, kun käyttäjä sanoo työn olevan valmis.

## 9. Allekirjoitus

Jokainen agentin raportti päättyy allekirjoitukseen (*– Claude Ubuntu Linux*).
Kun samoissa projekteissa käytetään useita agentteja ja koneita (Claude Code,
Gemini CLI, Codex; Ubuntu ja Fedora), allekirjoituksesta näkee, kuka mitäkin teki.
