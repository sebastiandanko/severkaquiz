# Zoologický kvíz Severka - Mladší starší

Interaktivní webová aplikace pro testování znalostí o zvířatech s dvěma úrovněmi obtížnosti.

## Funkce

### Hlavní funkce
- **Dvě úrovně obtížnosti**: Mladší (80 zvířat) a Starší (140 zvířat)

- **Pět typů otázek**:
  1. Poznávání zvířat (30 náhodných zvířat)
  2. Rozdíly mezi zvířaty (3 dvojice)
  3. Podrobné otázky o vybraných druzích (3 druhy)
  4. Poznávání stop (5 stop)
  5. Teoretický test (15 otázek)

### Požadavky pro splnění
- **Mladší úroveň**: 23/30 v poznávačce + 75% v testu
- **Starší úroveň**: 27/30 v poznávačce + 75% v testu

### Uživatelské rozhraní
- Responzivní design pro mobil i počítač
- Přehledné zobrazení obrázků zvířat a stop
- Intuitivní navigace mezi sekcemi
- Okamžité vyhodnocení odpovědí
- Podrobný přehled výsledků

## Struktura projektu

```
SeverkaQuiz/
├── index.html          # Hlavní HTML soubor
├── css/
│   └── style.css      # Styly aplikace
├── js/
│   ├── app.js         # Hlavní aplikace a navigace
│   └── quiz-logic.js  # Logika kvízu a hodnocení
├── data/
│   └── quiz-data.js   # Databáze zvířat a otázek
├── images/
│   ├── animals/       # Obrázky zvířat
│   ├── tracks/        # Obrázky stop
│   └── placeholder-info.txt
└── README.md
```

## Použití

**Pro import na severácké stránky**: Kvíz bude aktivní přes github pages a bude se dát importovat přes iframe do wordpressu.

## Použití přes github

1. **Stažení projektu**: Naklonujte nebo stáhněte všechny soubory
2. **Přidání obrázků**: Vložte obrázky zvířat do `images/animals/` a stopy do `images/tracks/`
3. **Otevření aplikace**: Otevřete `index.html` v prohlížeči
4. **Začátek kvízu**: Vyberte úroveň a klikněte na "Začít kvíz"

### Vložení na web
Pro vložení na WordPress použij:
```html
<iframe src="Ješte Přidám" width="100%" height="1000"></iframe>
```

## Technologie

- **Frontend**: Čistý HTML5, CSS3, Vanilla JavaScript
- **Data**: JSON struktura v JavaScriptu
- **Design**: Responzivní CSS Grid a Flexbox
- **Ukládání**: localStorage pro průběh kvízu

## Přizpůsobení

### Přidání nových zvířat
V `data/quiz-data.js` přidej do pole `animals`:
```javascript
{
  id: 101,
  name: "název zvířete",
  difficulty: "mladsi/starsi",
  image: "images/animals/soubor.jpg",
  characteristics: "popis vzhledu",
  diet: "potrava",
  interestingFacts: "zajímavosti",
  track: "images/tracks/stopa.png",
  classification: {
    class: "třída",
    order: "řád",
    family: "čeleď"
  }
}
```

### Úprava otázek
Přidejte otázky do příslušných sekcí v `quiz-data.js`:
- `differences` - rozdíly mezi zvířaty
- `detailedQuestions` - detailní otázky
- `theoryQuestions` - teoretické otázky
- `tracks` - poznávání stop

## Datová struktura

### Zvíře (Animal)
```javascript
{
  id: Number,
  name: String,
  difficulty: String,
  image: String,
  characteristics: String,
  diet: String,
  interestingFacts: String,
  track: String,
  classification: Object
}
```

### Konfigurace kvízu
```javascript
quizConfig: {
  mladsi: {
    animalsCount: 30,
    requiredCorrect: 23,
    detailedSpecies: 35,
    theoryQuestions: 15,
    requiredTheoryPercent: 75
  },
  starsi: {
    animalsCount: 30,
    requiredCorrect: 27,
    detailedSpecies: 45,
    theoryQuestions: 15,
    requiredTheoryPercent: 75
  }
}
```

## Možná vylepšení

1. **Audio funkce**: Přidání zvuků ptáků
2. **Žebříček výsledků**: Ukládání nejlepších skóre, spíš blbost protože se mi nechce dělat datábáze, ale možnost tam je.

## 🐛 Řešení problémů

### Chybějící obrázky
- Zkontrolujte cesty k obrázkům v `quiz-data.js`
- Ujistěte se, že soubory existují ve správných složkách

### Problémy s JavaScriptem
- Otevřete vývojářské nástroje (F12) pro debugování
- Zkontrolujte konzoli pro chybové zprávy

## Licence
Tento projekt je opensource a může být volně používán pro vzdělávací účely.

**Vyvinuto pro 32.pto Severka**