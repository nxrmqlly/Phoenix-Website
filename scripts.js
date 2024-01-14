// Load questions from JSON
const games = fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const gameForm = document.getElementById('gameForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultContainer = document.getElementById('resultContainer');

    // Add event listener to checkboxes
    document.querySelectorAll('.gameCheckbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        updateQuestions(data);
      });
    });

    // Function to update questions based on selected games
    function updateQuestions(data) {
      questionsContainer.innerHTML = ''; // Clear previous questions

      // Iterate through selected games
      document.querySelectorAll('.gameCheckbox:checked').forEach(checkbox => {
        const selectedGame = data.games.find(game => game.name === checkbox.value);

        // Display questions for selected game
        if (selectedGame) {
          const gameElement = document.createElement('div');
          gameElement.classList.add('question');

          // Game name
          const gameName = document.createElement('h2');
          gameName.textContent = selectedGame.name;
          gameElement.appendChild(gameName);

          selectedGame.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            // Question text
            const questionText = document.createElement('p');
            questionText.textContent = question;
            questionElement.appendChild(questionText);

            // Yes option (radio button)
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `
              <input type="radio" class="optionRadio" name="question${index}" value="Yes"> Yes
            `;
            questionElement.appendChild(optionLabel);

            gameElement.appendChild(questionElement);
          });

          questionsContainer.appendChild(gameElement);
        }
      });

      // Show/hide questions container
      questionsContainer.style.display = questionsContainer.children.length > 0 ? 'block' : 'none';
    }

    // Function to handle form submission (you can customize this)
    window.submitForm = function() {
      const selectedOptions = Array.from(document.querySelectorAll('.optionRadio:checked')).map(radio => ({
        question: radio.name.replace('question', ''),
        value: radio.value
      }));

      // Compile and display selected "Yes" options
      const yesOptions = selectedOptions.filter(option => option.value === 'Yes');
      resultContainer.innerHTML = ''; // Clear previous result

      if (yesOptions.length > 0) {
        const resultMessage = yesOptions.map(option => `Game ${option.question}: Yes`).join('<br>');
        resultContainer.innerHTML = `<h2>Selected "Yes" Options:</h2>${resultMessage}`;
      } else {
        resultContainer.innerHTML = '<h2>No "Yes" options selected.</h2>';
      }
    };
  })
  .catch(error => console.error('Error loading questions:', error));
