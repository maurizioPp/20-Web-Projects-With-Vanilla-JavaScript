// INTERFACE
const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const popUpElement = document.getElementById("pop-up-container");
const notificationElement = document.getElementById("notification");
const popUpHeader = document.getElementById("pop-up-header");
const playAgainButton = document.getElementById("play-again-button");
const figureParts = document.querySelectorAll(".figure-part");



// GLOBAL VARIABLES

// available words array
const wordsArray = ["application", "programming", "interface", "wizard"];
// choose random word
let selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
// guessed letters arrays
const correctLettersArray = [];
const wrongLettersArray = [];



// FUNCTIONS

// Display word - show hidden word
function displayWord() {
    wordElement.innerHTML = `
        ${selectedWord
            // convert to array and split to letters
            .split("")
            // map through array and return
            // check if letter is in correct letters
            // if yes return letter, if no return empty string
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter : ""}
                </span>
            `)
            // convert to string
            .join("")
        }
    `;
    // globally replace new line at end of each letter with empty string
    const innerWord = wordElement.innerText.replace(/\n/g, "");
    // check for winning
    if (innerWord === selectedWord) {
        // set message
        popUpHeader.innerText = "Congratulations, you have won!";
        // display pop-up
        popUpElement.style.display = "flex";
    }
}

// Display wrong letters
function displayWrongLetters() {
    // check for wrong letters
    if (wrongLettersArray.length > 0) {
        // display wrong letters header
        wrongLettersElement.innerHTML = "<p>Wrong Letters:</p>";
        // map through array, append letter to element
        wrongLettersArray.map(letter => wrongLettersElement.innerHTML += `<span>${letter}, </span>`);
    } else {
        wrongLettersElement.innerHTML = "";
    }
}

// Display figure parts
function displayFigureParts() {
    // loop
    figureParts.forEach((part, index) => {
        // get wrong letters count
        const wrongLetters = wrongLettersArray.length;
        // show or hide parts
        if (index < wrongLetters) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });
}

// Check if lost
function checkIfLost() {
    if (wrongLettersArray.length === figureParts.length) {
        // set message
        popUpHeader.innerText = "You have lost";
        // display pop-up
        popUpElement.style.display = "flex";
    }
}

// Display notification
function displayNotification() {
    // show
    notificationElement.classList.add("show");
    // hide after 2 seconds
    setTimeout(() => {
        notificationElement.classList.remove("show");
    }, 2000);
}



// EVENT LISTENERS

// Key input
window.addEventListener("keydown", eventObject => {
    // check if letter
    if (eventObject.keyCode >= 65 && eventObject.keyCode <= 90) {
        // put letter into variable
        const letter = eventObject.key;
        // check if letter is in selected word
        if (selectedWord.includes(letter)) {
            // check if not already entered
            if (!correctLettersArray.includes(letter)) {
                // add letter into correct letters
                correctLettersArray.push(letter);
                // update interface
                displayWord();
            } else {
                displayNotification();
            }
        } else {
            // check if not already entered
            if (!wrongLettersArray.includes(letter)) {
                // add letter into wrong letters
                wrongLettersArray.push(letter);
                // update interface
                displayWrongLetters();
                displayFigureParts();
                checkIfLost();
            } else {
                displayNotification();
            }
        }
    }
});

// Play again
playAgainButton.addEventListener("click", () => {
    // empty letter arrays
    // by splice because they are constant variables
    correctLettersArray.splice(0);
    wrongLettersArray.splice(0);
    // choose random word
    let selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    // update interface
    displayWord();
    displayWrongLetters();
    displayFigureParts();
    // hide pop-up
    popUpElement.style.display = "none";
});



// CALLS
displayWord();
