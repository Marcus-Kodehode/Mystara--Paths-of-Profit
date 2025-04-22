# Mystara – A Fantasy Trading Adventure

![Mystara banner](/public/images/general/README.png)
---

## 🎮 Introduksjon

**Enchanted Merchant’s Guild** er et eventyrspill hvor du spiller som en handelsreisende i en magisk verden. Målet er å tjene rikdom gjennom smart handel, byreiser og risiko, mens du samler spesialvarer og overlever farlige reiser.

Spillet er bygget i React med fokus på komponentbasert arkitektur, elegant brukergrensesnitt, og et system som bruker `localStorage` for lagring av spillerens fremgang. Du velger en rase ved oppstart, hver med sin unike lore og startutstyr. Derfra venter verden på deg – med varierende priser, skjulte eventyr og farer langs handelsrutene.

> // 💍 One bug to find them  
> // 🔥 One fix to bring them all  
> // 💡 And in the darkness bind them.

---

## 🧾 Oppgaveoversikt og løsningsstruktur

Prosjektet er utviklet for å møte kravene i en frontendspill-oppgave. Her er hvordan kravene er løst:

### ✅ Krav 1: Marked og kjøp/salg
- Dynamiske priser som genereres **kun når spilleren reiser til byen**, og lagres per by i `localStorage`.
- Prisene oppdateres ikke ved åpning/lukking av markedet, som forhindrer urettferdig prisskifte.
- Salgspris vises korrekt med 200% profitt i hjemby, 400% i fremmede byer.
- Spesialtilfeller:
  - Rusty Sword og Leather Tunic gir alltid 5 coins
  - Potions er laget for bruk, ikke for videresalg

### ✅ Krav 2: Reising mellom byer
- Spilleren kan reise mellom minst fire byer: Thalmoor, Grumhollow, Sylvarin, og NymRasha
- Reisemodul med valg: *Safe*, *Risky*, *Camp*
- Antall reisedager vises, og events inntreffer basert på valg
- Ved reise til ny by regenereres markedet

### ✅ Krav 3: UI og fantasy-stemning
- Alle skjermer bruker bakgrunnsbilder, gulldetaljer, og scroll-inspirert modaldesign
- Alle modaler er tilpasset skjermstørrelser og stilet for eventyr/fantasy
- GameHUD alltid synlig og oppdateres automatisk ved kjøp/salg
- InventoryModal med beskrivelse, effekt, bilder, og bruksknapper for potions

### ✅ Krav 4: Persistent lagring med `localStorage`
- Alle statuser og data som:
  - `playerHealth`, `playerStamina`, `playerCoins`, `playerInventory`, `marketPrices`
  - Lagrer også valgt rase og hvilke byer som er besøkt
- Bruker `localStorage` kombinert med React state for synkronisert spillflyt

---

## 🔧 Teknologi og rammeverk

| Teknologi        | Beskrivelse |
|------------------|-------------|
| **React**        | Grunnmur for UI og spillflyt |
| **React Router** | Navigasjon mellom byer og skjermer |
| **localStorage** | Lagrer spillerens fremgang og marked |
| **Custom Events**| Brukes for HUD-oppdateringer uten Redux |
| **CSS Modules**  | Stilark med modulbasert design og fantasy-scroll tema |
| **JS Utils**     | Funksjoner for prislogikk og spillerstatistikkoppdatering |

---

## 📁 Prosjektstruktur

```
src/
├── components/
│   ├── GameHUD.jsx           # Øverste info-linje
│   ├── InventoryModal.jsx    # Inventory-modal
│   ├── ItemCard.jsx          # Kort for items
│
├── locations/
│   ├── mainCities/           # Thalmoor, Grumhollow, osv.
│   ├── market/               # MarketModal og marketData
│   ├── shared/               # GameStart, RaceSelect, CityLayout
│
├── data/
│   ├── items.js              # Full item database med lore, bilder, priser
│   └── marketData.js         # Varer og spesialvarer pr. by
│
├── utils/
│   ├── priceUtils.js         # Prisgenerering og anbefalt pris
│   └── playerUtils.js        # Håndterer effekter av potions, events
```

---

## ⚙️ Spillfunksjonalitet

### 🧝 Rasevalg og start
Spilleren velger mellom fire raser. Valget avgjør hvor du starter og hvilket spesialitem du får:

| Rase    | Startby   | Unik startgjenstand     |
|---------|-----------|--------------------------|
| Kavari  | Thalmoor  | Spice Pack (handel)      |
| Dhurak  | Grumhollow| Helm of Vitality (helse) |
| Elarin  | Sylvarin  | Forest Amulet (stat boost)|
| Felarii | NymRasha  | Jungle Medallion (mystisk)|

### 💰 Marked
- Fire varetyper: *Standard*, *Consumables*, *Trade Goods*, *Special Items*
- Trade goods kan gi *200–400%* profitt, avhengig av hvor de selges
- Alle varer viser:
  - Pris
  - Anbefalt videresalgspris
  - Effekt og lore

### 🛠 Inventory og HUD
- Inventory er delt i tre kategorier
- Potions brukes enkeltvis (selv ved flere av samme type)
- HUD oppdateres i sanntid med `customEvent` ved handel eller potion-bruk

### 🎲 Events og reise
- Reising mellom byer består av dager, risiko og valg
- Random events genereres fra egne JSON-filer:
  - Safe events, Risky Good, Risky Bad, Camp
- Spilleren mister stamina/gull eller vinner bonus

### 💀 Game Over
- Når helsen går til 0 under reise → spilleren dør
- Game Over-skjerm og reset

---

## 📦 Hvordan starte spillet

1. Klon repoet  
2. Kjør `npm install`  
3. Start dev-server: `npm run dev`  
4. Åpne i nettleser: `http://localhost:5173` (eller tilsvarende)

---

## 🚀 Fremtidige utvidelser

- 🎭 Dialogsystem og NPC-handel
- ⚔️ Kamper og PvE-eventyr
- 📜 Lore og quests med valg
- 🧳 Oppgraderbart utstyr og trade-karavaner
- 🏆 Prestasjoner og leaderboard
- 🧩 Inventory slots og vektbegrensning

---

## ✍️ Personlig refleksjon

Som ny student innen frontend og programmering har dette prosjektet lært meg ekstremt mye praktisk:

- Hvordan bygge UI som både er funksjonelt og tematisk
- Hvordan strukturere logikk og data uten Redux
- Hvordan bruke `localStorage` riktig for spill
- Hvordan bygge gjenbrukbare komponenter i React
- Hvordan debugge komplekse state-feil og events

Jeg er spesielt stolt av hvordan markedet ble dynamisk, og at det gir spilleren ekte motivasjon for å reise mellom byene. Dette er mitt mest komplekse og lærerike prosjekt så langt – og jeg gleder meg til å bygge videre på det.

---

Takk for at du sjekker ut prosjektet mitt! 🎮🧙‍♂️