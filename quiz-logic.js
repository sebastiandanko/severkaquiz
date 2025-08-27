// Logika kvízu a správa stavů
const quizLogic = {
    // Aktuální stav pro každou sekci
    currentState: {
        animals: {
            currentIndex: 0,
            selectedAnimals: [],
            userAnswers: [],
            score: 0
        },
        differences: {
            currentIndex: 0,
            selectedPairs: [],
            userAnswers: [],
            score: 0
        },
        detailed: {
            currentIndex: 0,
            selectedSpecies: [],
            currentSpeciesIndex: 0,
            userAnswers: [],
            score: 0
        },
        tracks: {
            currentIndex: 0,
            selectedTracks: [],
            userAnswers: [],
            score: 0
        },
        theory: {
            currentIndex: 0,
            selectedQuestions: [],
            userAnswers: [],
            score: 0
        }
    },

    // Pomocné funkce
    getRandomItems: function(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Sekce poznávačky zvířat
    initializeAnimalRecognition: function(difficulty) {
        const animals = quizDatabase.animals.filter(a => a.difficulty === difficulty);
        this.currentState.animals.selectedAnimals = this.getRandomItems(animals, quizDatabase.quizConfig[difficulty].animalsCount);
        this.currentState.animals.currentIndex = 0;
        this.currentState.animals.userAnswers = [];
        this.currentState.animals.score = 0;
        
        this.showCurrentAnimal();
    },

    showCurrentAnimal: function() {
        const state = this.currentState.animals;
        const animal = state.selectedAnimals[state.currentIndex];
        
        document.getElementById('animal-image').src = animal.image;
        document.getElementById('animal-image').alt = animal.name;
        document.getElementById('animal-name-input').value = '';
        document.getElementById('animal-feedback').textContent = '';
        document.getElementById('animal-feedback').className = 'feedback';
        document.getElementById('animal-counter').textContent = `${state.currentIndex + 1}/${state.selectedAnimals.length}`;
    },

    checkAnimalAnswer: function() {
        const state = this.currentState.animals;
        const animal = state.selectedAnimals[state.currentIndex];
        const userAnswer = document.getElementById('animal-name-input').value.trim().toLowerCase();
        const correctAnswer = animal.name.toLowerCase();
        
        const isCorrect = userAnswer === correctAnswer;
        
        state.userAnswers[state.currentIndex] = {
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect
        };
        
        if (isCorrect) {
            state.score++;
            document.getElementById('animal-feedback').textContent = '✅ Správně!';
            document.getElementById('animal-feedback').className = 'feedback correct';
        } else {
            document.getElementById('animal-feedback').textContent = `❌ Špatně. Správná odpověď: ${animal.name}`;
            document.getElementById('animal-feedback').className = 'feedback incorrect';
        }
        
        // Aktualizovat app skore
        quizApp.updateScore('animals', state.score);
    },

    nextAnimal: function() {
        const state = this.currentState.animals;
        if (state.currentIndex < state.selectedAnimals.length - 1) {
            state.currentIndex++;
            this.showCurrentAnimal();
        }
    },

    previousAnimal: function() {
        const state = this.currentState.animals;
        if (state.currentIndex > 0) {
            state.currentIndex--;
            this.showCurrentAnimal();
        }
    },

    // Sekce rozdílů zvířat
    initializeDifferences: function(difficulty) {
        this.currentState.differences.selectedPairs = this.getRandomItems(quizDatabase.differences, 3);
        this.currentState.differences.currentIndex = 0;
        this.currentState.differences.userAnswers = [];
        this.currentState.differences.score = 0;
        
        this.showCurrentDifference();
    },

    showCurrentDifference: function() {
        const state = this.currentState.differences;
        const pair = state.selectedPairs[state.currentIndex];
        
        document.getElementById('animal1-image').src = pair.image1;
        document.getElementById('animal1-name').textContent = pair.animal1;
        document.getElementById('animal2-image').src = pair.image2;
        document.getElementById('animal2-name').textContent = pair.animal2;
        document.getElementById('difference-question').textContent = pair.question;
        
        // Vytvořit možnosti
        const optionsContainer = document.getElementById('difference-options');
        optionsContainer.innerHTML = '';
        
        pair.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => this.selectDifferenceOption(index);
            optionsContainer.appendChild(button);
        });
        
        document.getElementById('difference-counter').textContent = `${state.currentIndex + 1}/${state.selectedPairs.length}`;
    },

    selectDifferenceOption: function(optionIndex) {
        const state = this.currentState.differences;
        const pair = state.selectedPairs[state.currentIndex];
        
        // Odstranit vybranou třídu ze všech tlačítek
        document.querySelectorAll('#difference-options .option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Přidat vybranou třídu na kliknuté tlačítko
        document.querySelectorAll('#difference-options .option-btn')[optionIndex].classList.add('selected');
        
        state.userAnswers[state.currentIndex] = optionIndex;
        
        if (optionIndex === pair.correctAnswer) {
            state.score++;
            quizApp.updateScore('differences', state.score);
        }
    },

    nextDifference: function() {
        const state = this.currentState.differences;
        if (state.currentIndex < state.selectedPairs.length - 1) {
            state.currentIndex++;
            this.showCurrentDifference();
        }
    },

    previousDifference: function() {
        const state = this.currentState.differences;
        if (state.currentIndex > 0) {
            state.currentIndex--;
            this.showCurrentDifference();
        }
    },

    // Sekce detailních otázek
    initializeDetailedQuestions: function(difficulty) {
        const animals = quizDatabase.animals.filter(a => a.difficulty === difficulty);
        this.currentState.detailed.selectedSpecies = this.getRandomItems(animals, 3);
        this.currentState.detailed.currentIndex = 0;
        this.currentState.detailed.currentSpeciesIndex = 0;
        this.currentState.detailed.userAnswers = [];
        this.currentState.detailed.score = 0;
        
        this.showCurrentDetailedQuestion();
    },

    showCurrentDetailedQuestion: function() {
        const state = this.currentState.detailed;
        const animal = state.selectedSpecies[state.currentSpeciesIndex];
        const questions = quizDatabase.detailedQuestions.find(q => q.animalId === animal.id)?.questions || [];
        
        document.getElementById('detailed-animal-image').src = animal.image;
        document.getElementById('detailed-animal-name').textContent = animal.name;
        document.getElementById('detailed-question-text').textContent = questions[state.currentIndex]?.question || 'Žádné otázky';
        
        // Vytvořit možnosti
        const optionsContainer = document.getElementById('detailed-options');
        optionsContainer.innerHTML = '';
        
        if (questions[state.currentIndex]) {
            questions[state.currentIndex].options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option;
                button.onclick = () => this.selectDetailedOption(index);
                optionsContainer.appendChild(button);
            });
        }
        
        document.getElementById('detailed-counter').textContent = `${state.currentIndex + 1}/${9}`;
    },

    selectDetailedOption: function(optionIndex) {
        const state = this.currentState.detailed;
        const animal = state.selectedSpecies[state.currentSpeciesIndex];
        if (questions[state.currentIndex]) {
            // Odstranit vybranou třídu ze všech tlačítek
            document.querySelectorAll('#detailed-options .option-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Přidat vybranou třídu na kliknuté tlačítko
            document.querySelectorAll('#detailed-options .option-btn')[optionIndex].classList.add('selected');
            
            state.userAnswers[state.currentIndex] = optionIndex;
            
            if (optionIndex === questions[state.currentIndex].correctAnswer) {
                state.score++;
                quizApp.updateScore('detailed', state.score);
            }
            
            if (state.currentIndex < 8) {
                state.currentIndex++;
                setTimeout(() => this.showCurrentDetailedQuestion(), 500);
            }
        }
    },

    // Sekce poznávání stop
    initializeTrackRecognition: function(difficulty) {
        this.currentState.tracks.selectedTracks = this.getRandomItems(quizDatabase.tracks, 5);
        this.currentState.tracks.currentIndex = 0;
        this.currentState.tracks.userAnswers = [];
        this.currentState.tracks.score = 0;
        
        this.showCurrentTrack();
    },

    showCurrentTrack: function() {
        const state = this.currentState.tracks;
        const track = state.selectedTracks[state.currentIndex];
        
        document.getElementById('track-image').src = track.image;
        document.getElementById('track-counter').textContent = `${state.currentIndex + 1}/${state.selectedTracks.length}`;
        
        // Vytvořit možnosti
        const optionsContainer = document.getElementById('track-options');
        optionsContainer.innerHTML = '';
        
        track.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => this.selectTrackOption(index);
            optionsContainer.appendChild(button);
        });
    },

    selectTrackOption: function(optionIndex) {
        const state = this.currentState.tracks;
        const track = state.selectedTracks[state.currentIndex];
        
        // Odstranit vybranou třídu ze všech tlačítek
        document.querySelectorAll('#track-options .option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Přidat vybranou třídu na kliknuté tlačítko
        document.querySelectorAll('#track-options .option-btn')[optionIndex].classList.add('selected');
        
        state.userAnswers[state.currentIndex] = optionIndex;
        
        if (optionIndex === track.correctAnswer) {
            state.score++;
            quizApp.updateScore('tracks', state.score);
        }
    },

    nextTrack: function() {
        const state = this.currentState.tracks;
        if (state.currentIndex < state.selectedTracks.length - 1) {
            state.currentIndex++;
            this.showCurrentTrack();
        }
    },

    previousTrack: function() {
        const state = this.currentState.tracks;
        if (state.currentIndex > 0) {
            state.currentIndex--;
            this.showCurrentTrack();
        }
    },

    // Sekce teorie testu
    initializeTheoryTest: function(difficulty) {
        const questions = quizDatabase.theoryQuestions;
        this.currentState.theory.selectedQuestions = this.getRandomItems(questions, quizDatabase.quizConfig[difficulty].theoryQuestions);
        this.currentState.theory.currentIndex = 0;
        this.currentState.theory.userAnswers = [];
        this.currentState.theory.score = 0;
        
        this.showCurrentTheoryQuestion();
    },

    showCurrentTheoryQuestion: function() {
        const state = this.currentState.theory;
        const question = state.selectedQuestions[state.currentIndex];
        
        document.getElementById('theory-question-text').textContent = question.question;
        document.getElementById('theory-counter').textContent = `${state.currentIndex + 1}/${state.selectedQuestions.length}`;
        
        // Vytvořit možnosti
        const optionsContainer = document.getElementById('theory-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => this.selectTheoryOption(index);
            optionsContainer.appendChild(button);
        });
    },

    selectTheoryOption: function(optionIndex) {
        const state = this.currentState.theory;
        const question = state.selectedQuestions[state.currentIndex];
        
        // Odstranit vybranou třídu ze všech tlačítek
        document.querySelectorAll('#theory-options .option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Přidat vybranou třídu na kliknuté tlačítko
        document.querySelectorAll('#theory-options .option-btn')[optionIndex].classList.add('selected');
        
        state.userAnswers[state.currentIndex] = optionIndex;
        
        if (optionIndex === question.correctAnswer) {
            state.score++;
            quizApp.updateScore('theory', state.score);
        }
    },

    nextTheory: function() {
        const state = this.currentState.theory;
        if (state.currentIndex < state.selectedQuestions.length - 1) {
            state.currentIndex++;
            this.showCurrentTheoryQuestion();
        }
    },

    previousTheory: function() {
        const state = this.currentState.theory;
        if (state.currentIndex > 0) {
            state.currentIndex--;
            this.showCurrentTheoryQuestion();
        }
    }
};

// Spustit event listeners pro sekci kvízu
document.addEventListener('DOMContentLoaded', function() {
    // Eventy poznávačky zvířat
    document.getElementById('check-animal').addEventListener('click', () => {
        quizLogic.checkAnimalAnswer();
    });

    document.getElementById('next-animal').addEventListener('click', () => {
        quizLogic.nextAnimal();
    });

    document.getElementById('prev-animal').addEventListener('click', () => {
        quizLogic.previousAnimal();
    });

    // Eventy rozdílů zvířat
    document.getElementById('next-difference').addEventListener('click', () => {
        quizLogic.nextDifference();
    });

    document.getElementById('prev-difference').addEventListener('click', () => {
        quizLogic.previousDifference();
    });

    // Eventy stop
    document.getElementById('next-track').addEventListener('click', () => {
        quizLogic.nextTrack();
    });

    document.getElementById('prev-track').addEventListener('click', () => {
        quizLogic.previousTrack();
    });

    // Eventy Teorie
    document.getElementById('next-theory').addEventListener('click', () => {
        quizLogic.nextTheory();
    });

    document.getElementById('prev-theory').addEventListener('click', () => {
        quizLogic.previousTheory();
    });

    // Enter pro zadávání údajů o zvířatech
    document.getElementById('animal-name-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            quizLogic.checkAnimalAnswer();
        }
    });
});
        const questions = quizDatabase.detailedQuestions.find(q => q.animalId === animal.id)?.questions || [];