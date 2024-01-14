// Assuming you have the provided JSON stored in a variable named 'gameData'
let gameData;

const gamesSection = document.getElementById('games-section');
const questionsSection = document.getElementById('questions-section');
const resultsSection = document.getElementById('results-section');
const gamesForm = document.getElementById('games-form');
const questionsForm = document.getElementById('questions-form');
const resultsDiv = document.getElementById('results');
const submitGamesButton = document.getElementById('submit-games');
const submitQuestionsButton = document.getElementById('submit-questions');

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

        // Check if at least one game is selected
        checkbox.addEventListener('change', checkGamesSelection);
    });
}

// Function to check games selection and enable/disable the submit button
function checkGamesSelection() {
    const selectedGames = Array.from(document.querySelectorAll('input[name="selectedGames"]:checked')).length > 0;

    if (selectedGames) {
        submitGamesButton.removeAttribute('disabled');
    } else {
        submitGamesButton.setAttribute('disabled', 'true');
    }
}

// Function to show the questions section
function showQuestions() {
    gamesSection.style.display = 'none';
    questionsSection.style.display = 'block';

    // Dynamically populate the questions section based on selected games
    gameData.games.forEach(game => {
        if (document.getElementById(game.name).checked) {
            const gameHeader = document.createElement('h3');
            gameHeader.appendChild(document.createTextNode(`Questions for ${game.name}`));
            questionsForm.appendChild(gameHeader);

            let questionsSelected = false; // Flag to check if at least one question is selected for the game

            game.questions.forEach(question => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `question_${game.name}`;
                checkbox.value = question;
                checkbox.id = `${game.name}_${question}`;

                const label = document.createElement('label');
                label.htmlFor = `${game.name}_${question}`;
                label.appendChild(document.createTextNode(question));

                questionsForm.appendChild(checkbox);
                questionsForm.appendChild(label);
                questionsForm.appendChild(document.createElement('br'));

                // Check if at least one question is selected for the game
                checkbox.addEventListener('change', () => {
                    questionsSelected = Array.from(document.querySelectorAll(`input[name="question_${game.name}"]:checked`)).length > 0;
                    checkSubmitButton();
                });
            });

            // Function to check the submit button status
            function checkSubmitButton() {
                const submitButton = document.getElementById('submit-questions');
                if (questionsSelected) {
                    submitButton.removeAttribute('disabled');
                } else {
                    submitButton.setAttribute('disabled', 'true');
                }
            }

            // Initial check for submit button
            checkSubmitButton();
        }
    });
}

// Function to submit answers and show results
function submitAnswers() {
    resultsDiv.innerHTML = ''; // Clear previous results

    gameData.games.forEach(game => {
        if (document.getElementById(game.name).checked) {
            let questionsSelected = false; // Flag to check if at least one question is selected for the game

            game.questions.forEach(question => {
                const checkbox = document.getElementById(`${game.name}_${question}`);
                if (checkbox && checkbox.checked) {
                    questionsSelected = true;
                    const resultItem = document.createElement('div');
                    resultItem.appendChild(document.createTextNode(`${game.name}: ${question}`));
                    resultsDiv.appendChild(resultItem);
                }
            });

            // Check if at least one question is selected for each game
            if (!questionsSelected) {
                alert(`Please select at least one question for ${game.name}.`);
                return; // Stop further processing if condition not met
            }
        }
    });

    questionsSection.style.display = 'none';
    resultsSection.style.display = 'block';
}

// Initial call to populate the games section
populateGamesSection();

// Function to open the Discord bot authorization URL
function openBotAuthorization() {
    window.open('https://discord.com/api/oauth2/authorize?client_id=1185961899024715928&permissions=139586948161&scope=bot');
}

// Add event listener to the "Add bot" button
const addBotButton = document.getElementById('addBotButton');
addBotButton.addEventListener('click', openBotAuthorization);

// Function to copy the generated text to the clipboard
function copyToClipboard() {
    const resultsText = resultsDiv.innerText;
    navigator.clipboard.writeText(resultsText).then(() => {
        alert('Done! Text copied to clipboard.');
    }).catch(err => {
        console.error('Unable to copy text to clipboard.', err);
    });
}

// Add event listener to the "Copy" button
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', copyToClipboard);