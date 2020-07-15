// INTERFACE
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-button");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty-select");



// GLOBAL

// Initial score
let score = 0;

// Initial time
let time = 10;

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
        // update time
        time += 5;
        updateTime();
    }
});



// CALLS

// Set focus on input
text.focus();

// Display word
displayWord();
