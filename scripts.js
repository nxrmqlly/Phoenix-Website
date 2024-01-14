// Assuming you have the provided JSON stored in a variable named 'gameData'
let gameData;

const gamesSection = document.getElementById('games-section');
const questionsSection = document.getElementById('questions-section');
const gamesForm = document.getElementById('games-form');
const questionsForm = document.getElementById('questions-form');

// Function to fetch JSON data
async function fetchGameData() {
    const response = await fetch('questions.json'); // Assuming the JSON file is in the same directory
    const data = await response.json();
    return data;
}

// Function to dynamically populate the games section
async function populateGamesSection() {
    gameData = await fetchGameData();

    gameData.games.forEach(game => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'selectedGames';
        checkbox.value = game.name;
        checkbox.id = game.name;

        const label = document.createElement('label');
        label.htmlFor = game.name;
        label.appendChild(document.createTextNode(game.name));

        gamesForm.appendChild(checkbox);
        gamesForm.appendChild(label);
    });
}

// Function to show the questions section
function showQuestions() {
    gamesSection.style.display = 'none';
    questionsSection.style.display = 'block';

    // Dynamically populate the questions section based on selected games
    gameData.games.forEach(game => {
        if (document.getElementById(game.name).checked) {
            game.questions.forEach(question => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question_${game.name}`;
                radio.value = question;
                radio.id = `${game.name}_${question}`;

                const label = document.createElement('label');
                label.htmlFor = `${game.name}_${question}`;
                label.appendChild(document.createTextNode(question));

                questionsForm.appendChild(radio);
                questionsForm.appendChild(label);
                questionsForm.appendChild(document.createElement('br'));
            });
        }
    });
}

// Function to submit answers (You can customize this function as needed)
function submitAnswers() {
    alert('Answers submitted successfully!'); // Placeholder action, you can customize this.
}

// Initial call to populate the games section
populateGamesSection();
