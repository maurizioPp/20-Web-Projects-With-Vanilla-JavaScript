// INTERFACE
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-button");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");



// GLOBAL

// Initial score
let score = 0;

// Initial time
let time = 10;

// Difficulty
// get from Local Storage, if not there set to medium
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : localStorage.setItem("difficulty", "medium");
// set select
difficultySelect.value = localStorage.getItem("difficulty");

// Time interval
const timeInterval = setInterval(updateTime, 1000);



// FUNCTIONS

// Get words from API
async function getWordFromAPI() {
    // fetch
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1&swear=0");
    // get data
    const data = await response.json();
    // return
    return data;
}

// Display word
async function displayWord() {
    // get word
    randomWord = await getWordFromAPI();
    // display
    word.innerText = randomWord;
}

// Update score
function updateScore() {
    // increment score
    score++;
    // display new score
    scoreElement.innerText = score;
}

// Update time
function updateTime() {
    // decrease time
    time--;
    // display new time
    timeElement.innerText = `${time} s`;
    // check for time running out
    if (time === 0) {
        // clear timer
        clearInterval(timeInterval);
        // display end game screen
        gameOver();
    }
}

// Game over
function gameOver() {
    endGameElement.innerHTML = `
    <h1>Game over</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
    `;
    endGameElement.style.display = "flex";
}




// EVENT LISTENERS

// Text input
text.addEventListener("input", () => {
    // get input
    const insertedText = text.value;
    // compare input with word
    if (insertedText === word.innerText) {
        // clear input
        text.value = "";
        // display another word
        displayWord();
        // update score
        updateScore();
        // add time
        switch (difficulty) {
            case "easy":
                time += 5;
                break;
            case "medium":
                time += 3;
                break;
            case "hard":
                time += 2;
                break;
            default:
                console.warn("Invalid difficulty setting.");
        }
        // update time
        updateTime();
    }
});

// Settings button
settingsButton.addEventListener("click", () => {
    settings.classList.toggle("hide");
});

// Difficulty
settingsForm.addEventListener("change", eventObject => {
    selectedDifficulty = eventObject.target.value;
    localStorage.setItem("difficulty", selectedDifficulty);
    location.reload();
})



// CALLS

// Set focus on input
text.focus();

// Display word
displayWord();
