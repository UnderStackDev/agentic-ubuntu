
Ohje projektin tilan seurantaan.

Koskee: KAIKKIA

Tässä on tiukka ja tekninen raportointi-protokolla, joka on suunniteltu minimoimaan token-kulutus ja maksimoimaan jatkuvuus riippumatta siitä, käytetäännkö Gemini CLI:tä, Codexia tai vaihdetaanko käyttöjärjestelmää Windowsin ja Linuxin välillä. Lisäksi minimoidaan chat keskustelujen tallennnusten hukkumisien aiheuttamat "hupsis saatanat".

Tämä formaatti on optimoitu siten, että tekoäly saa yhdellä lukemisella (n. 500–1000 tokenia) saman tiedon, johon se muuten kuluttaisi kymmeniä tuhansia tokeneita haravoinnilla.

Dev_Handover Protocol (v1.0)

Kopioi tämä osio istunnon päätteeksi ja pyydä tekoälyä täyttämään se. Tallenna vastaus projektin juureen tiedostona: .ai_context_state.md.

1. Project Identity & Environment

Project Name: [Nimi]

OS Context: [Win (PowerShell/CMD) / Linux (Bash)]

Last Commit/Hash: [Jos käytössä Git]

Critical Paths: [Esim. ./src/api, C:\Users\Project\bin]

2. State of Architecture (The "Map")

Active Module: [Mitä tiedostoa/moduulia muokattiin viimeksi?]

Key Dependencies: [Uudet kirjastot tai kriittiset versiot]

Global Variables/State: [Mitkä muuttujat vaikuttavat koko sovellukseen juuri nyt?]

3. Execution Snapshot

Last Successful Command: [Tarkka komento esim. npm run dev tai go build]

Current Blocker/Error: [Jos jäit jumiin, tarkka virheilmoitus täähän]

Pending Refactors: [Mikä osa koodista on "rumaa" tai vaatii huomiota seuraavaksi?]

4. Logic & Hidden Context

Invisible Rules: [Esim. "Älä koske tiedostoon X, se on legacya" tai "Käytä vain snake_casea tässä moduulissa"]

Decision Log: [Miksi tehtiin valinta X eikä Y? (Estää tekoälyä ehdottamatta hylättyä ratkaisua uudelleen)]

5. Immediate Next Step

Target: [Mitä pitää tapahtua ensimmäisenä, kun uusi istunto alkaa?]

Tehdään aina kun käyttäjä ilmoittaa istunnon päättyväksi tai ilmaisee että jatketaan myöhemmin/huomenna.
