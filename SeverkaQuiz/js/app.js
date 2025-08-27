// Controller hlavní aplikace
class QuizApp {
    constructor() {
        this.currentDifficulty = 'mladsi';
        this.currentSection = 0;
        this.sections = ['animal-recognition', 'differences', 'detailed-questions', 'track-recognition', 'theory-test'];
        this.scores = {
            animals: 0,
            differences: 0,
            detailed: 0,
            tracks: 0,
            theory: 0
        };
        
        this.initializeEventListeners();
        this.updateRequirementsDisplay();
    }

    initializeEventListeners() {
        // Změna obížnosti (Mladší/Starší)
        document.getElementById('difficulty-toggle').addEventListener('change', (e) => {
            this.currentDifficulty = e.target.checked ? 'starsí' : 'mladsi';
            this.updateRequirementsDisplay();
        });

        // Tlačítko začít kvíz
        document.getElementById('start-quiz').addEventListener('click', () => {
            this.startQuiz();
        });

        // Navigace mezi sekcemi
        document.getElementById('next-section').addEventListener('click', () => {
            this.nextSection();
        });

        document.getElementById('prev-section').addEventListener('click', () => {
            this.previousSection();
        });

        // Tlačítko restart a zpátky
        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.restartQuiz();
        });

        document.getElementById('back-to-welcome').addEventListener('click', () => {
            this.showWelcomeScreen();
        });
    }

    updateRequirementsDisplay() {
        const mladsiReq = document.getElementById('mladsi-requirements');
        const starsiReq = document.getElementById('starsi-requirements');
        
        if (this.currentDifficulty === 'mladsi') {
            mladsiReq.style.display = 'block';
            starsiReq.style.display = 'none';
        } else {
            mladsiReq.style.display = 'none';
            starsiReq.style.display = 'block';
        }
    }

    startQuiz() {
        // Inicializovat všechny sekce kvízu
        quizLogic.initializeAnimalRecognition(this.currentDifficulty);
        quizLogic.initializeDifferences(this.currentDifficulty);
        quizLogic.initializeDetailedQuestions(this.currentDifficulty);
        quizLogic.initializeTrackRecognition(this.currentDifficulty);
        quizLogic.initializeTheoryTest(this.currentDifficulty);

        // Schovat uvítací obrazovku, ukázat sekci kvízu
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('quiz-sections').classList.add('active');
        
        // Ukázat první sekci
        this.showSection(0);
    }

    showSection(sectionIndex) {
        // Schovat všechny sekce
        this.sections.forEach(section => {
            document.getElementById(section).style.display = 'none';
        });

        // Ukázat aktuální sekci
        document.getElementById(this.sections[sectionIndex]).style.display = 'block';
        
        // Atualizovat pokrok kvízu 
        document.getElementById('current-section').textContent = `${sectionIndex + 1}/${this.sections.length}`;
        
        // Aktualizovat navigační tlačítka
        document.getElementById('prev-section').style.display = sectionIndex > 0 ? 'block' : 'none';
        document.getElementById('next-section').textContent = sectionIndex === this.sections.length - 1 ? 'Dokončit kvíz' : 'Další část';
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.showSection(this.currentSection);
        } else {
            this.completeQuiz();
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.showSection(this.currentSection);
        }
    }

    completeQuiz() {
        // Kalkulace celkového skore
        const totalScore = Object.values(this.scores).reduce((sum, score) => sum + score, 0);
        const maxScore = 30 + 3 + 9 + 5 + 15; // Max possible points
        
        // Zkontrolovat jestli jsou požadavky splněny
        const animalsRequired = this.currentDifficulty === 'mladsi' ? 23 : 27;
        const theoryRequired = 0.75; // 75%
        
        const animalsPassed = this.scores.animals >= animalsRequired;
        const theoryPassed = (this.scores.theory / 15) >= theoryRequired;
        const overallPassed = animalsPassed && theoryPassed;

        // Aktualizovat zobrazení výsledků
        document.getElementById('animal-score').textContent = `${this.scores.animals}/30`;
        document.getElementById('difference-score').textContent = `${this.scores.differences}/3`;
        document.getElementById('detailed-score').textContent = `${this.scores.detailed}/9`;
        document.getElementById('track-score').textContent = `${this.scores.tracks}/5`;
        document.getElementById('theory-score').textContent = `${this.scores.theory}/15`;
        
        document.getElementById('final-result').textContent = overallPassed ? 
            '✅ Splnil/a jsi zkoušku!' : '❌ Zkoušku jsi nesplnil/a';
        
        document.getElementById('requirements-check').textContent = overallPassed ?
            'Gratulujeme! Splnil/a jsi všechny požadavky.' :
            `Pro splnění je potřeba: ${animalsRequired}/30 v poznávačce a ${theoryRequired * 100}% v testu.`;

        // Ukázat obrazovku výsledků
        document.getElementById('quiz-sections').classList.remove('active');
        document.getElementById('results-screen').classList.add('active');
    }

    restartQuiz() {
        // Resetování skore
        this.scores = {
            animals: 0,
            differences: 0,
            detailed: 0,
            tracks: 0,
            theory: 0
        };
        
        // Resetování aktuální sekce
        this.currentSection = 0;
        
        // Ukázat uvítací obrazovku
        this.showWelcomeScreen();
    }

    showWelcomeScreen() {
        document.getElementById('results-screen').classList.remove('active');
        document.getElementById('quiz-sections').classList.remove('active');
        document.getElementById('welcome-screen').classList.add('active');
    }

    updateScore(section, score) {
        this.scores[section] = score;
    }
}

// Spustit aplikaci když je DOM načten
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});