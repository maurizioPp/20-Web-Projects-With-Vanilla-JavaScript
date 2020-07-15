// INTERFACE
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game");
const settingsButton = document.getElementById("settings-button");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty-select");



// GLOBAL

// Initial score
let score = 0;

// Initial time
let time = 10;



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
    score++;
    scoreElement.innerText = score;
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
    }
});



// CALLS
displayWord();
