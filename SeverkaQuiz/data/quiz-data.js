// Zoologický kvíz schéma databáze
const quizDatabase = {
  // Databáze zvířat pro sekci poznávačky
  animals: [
    // Zvířata pro mladší (80 celkem)
    // Musí se dodělat, ideálně naskenovat kartičky z klubovny
    // Obrázky zatím nejsou
    {
      id: 1,
      name: "sýkora koňadra",
      difficulty: "mladsi",
      image: "./images/animals/sykora_konadra.jpg",
      characteristics: "žluté břicho, černá čepička, bílé líce",
      diet: "hmyz, semena, bobule",
      interestingFacts: "nejběžnější sýkora v ČR, hnízdí v budkách",
      track: "./images/tracks/sykora_track.png",
      classification: {
        class: "Ptáci",
        order: "Pěvci",
        family: "Sýkorovití"
      }
    },
    {
      id: 2,
      name: "vrabec domácí",
      difficulty: "mladsi",
      image: "./images/animals/vrabec_domaci.jpg",
      characteristics: "šedohnědé zbarvení, černá skvrna na hrudi (samec)",
      diet: "semena, zbytky potravy, hmyz",
      interestingFacts: "žije v blízkosti člověka, společenský pták",
      track: "./images/tracks/vrabec_track.png",
      classification: {
        class: "Ptáci",
        order: "Pěvci",
        family: "Vrabcovití"
      }
    },
    {
      id: 3,
      name: "zajíc polní",
      difficulty: "mladsi",
      image: "./images/animals/zajic_polni.jpg",
      characteristics: "dlouhé uši, silné zadní nohy, hnědošedá srst",
      diet: "tráva, byliny, kůra stromů",
      interestingFacts: "může běžet rychlostí až 70 km/h",
      track: "./images/tracks/zajic_track.png",
      classification: {
        class: "Savci",
        order: "Zajícovci",
        family: "Zajícovití"
      }
    },
    // Add more animals here...
    
    // Older level animals (140 total)
    {
      id: 81,
      name: "mlok skvrnitý",
      difficulty: "starsí",
      image: "./images/animals/mlok_skvrnity.jpg",
      characteristics: "černý s žlutými skvrnami, jedovatý",
      diet: "hmyz, pavouci, červi",
      interestingFacts: "chráněný druh, jed vylučuje kůží",
      track: "./images/tracks/mlok_track.png",
      classification: {
        class: "Obojživelníci",
        order: "Mlokotvaří",
        family: "Mlokovití",
        protectionStatus: "silně ohrožený"
      }
    },
    {
      id: 82,
      name: "rys ostrovid",
      difficulty: "starsí",
      image: "./images/animals/rys_ostrovid.jpg",
      characteristics: "střapce na uších, krátký ocas, skvrnitá srst",
      diet: "srnčí zvěř, zajíci, ptáci",
      interestingFacts: "největší evropská kočkovitá šelma, noční lovec",
      track: "./images/tracks/rys_track.png",
      classification: {
        class: "Savci",
        order: "Šelmy",
        family: "Kočkovití",
        protectionStatus: "kriticky ohrožený"
      }
    }
    // Tady přidat víc zvířat...
  ],

  // Páry zvířat pro poznávání rozdílů
  differences: [
    {
      id: 1,
      animal1: "vrána",
      animal2: "havran",
      image1: "./images/animals/vrana.jpg",
      image2: "./images/animals/havran.jpg",
      question: "Jaký je hlavní rozdíl mezi vránou a havranem?",
      options: [
        "Tvar zobáku",
        "Velikost těla", 
        "Barva peří",
        "Zpěv"
      ],
      correctAnswer: 0,
      explanation: "Havran má kuželovitý zobák s bílým kořenem, vrána má rovný černý zobák"
    },
    {
      id: 2,
      animal1: "srnec",
      animal2: "jelen",
      image1: "./images/animals/srnec.jpg",
      image2: "./images/animals/jelen.jpg",
      question: "Jaký je hlavní rozdíl mezi srncem a jelenem?",
      options: [
        "Typ paroží",
        "Velikost těla",
        "Barva srsti",
        "Způsob života"
      ],
      correctAnswer: 0,
      explanation: "Srnec má parůžky (jednoduché výčnělky), jelen má paroží (větvené)"
    }
    // Zde přidat více párů...
  ],

  // Detailní otázky o specifických zvířatech
  detailedQuestions: [
    {
      animalId: 1, // sýkora koňadra
      questions: [
        {
          question: "Jakou barvu má bříško sýkory koňadry?",
          options: ["Žlutou", "Bílou", "Černou", "Hnědou"],
          correctAnswer: 0
        },
        {
          question: "Čím se sýkora koňadra živí?",
          options: ["Hmyzem", "Rybičkami", "Ovocem", "Vše výše uvedené"],
          correctAnswer: 3
        },
        {
          question: "Kde sýkora koňadra hnízdí?",
          options: ["V budkách", "Na zemi", "Ve skalách", "Ve vodě"],
          correctAnswer: 0
        }
      ]
    }
    // Zde přidat více detailních otázek...
  ],

  // Otázky teorie pro psaný test
  theoryQuestions: [
    {
      id: 1,
      question: "Které zvíře patří mezi obojživelníky?",
      options: ["Žába", "Had", "Pták", "Ryba"],
      correctAnswer: 0,
      type: "multiple"
    },
    {
      id: 2, 
      question: "Všechny ptáci migrují na zimu.",
      options: ["Pravda", "Nepravda"],
      correctAnswer: 1,
      type: "truefalse"
    }
    // Zde přidat více otázek z teorie...
  ],

  // Poznávačka stop
  tracks: [
    {
      id: 1,
      image: "./images/tracks/srnci_track.jpg",
      options: ["Srnec", "Jelen", "Liška", "Zajíc"],
      correctAnswer: 0
    }
    // Zde přidat více stop...
  ],

  // Konfigurace kvízu
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
};

// Export pro použití ve více souborech
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizDatabase;
}