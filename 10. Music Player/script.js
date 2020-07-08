// INTERFACE
const container = document.getElementById("container");
const title = document.getElementById("title");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const audio = document.getElementById("audio");
const songCover = document.getElementById("song-cover");
const previousButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");



// GLOBAL

// Songs
const songs = ["hey", "summer", "ukulele"];

// Current song
let songIndex = 2;



// FUNCTIONS

// Load song
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    // add "play" class
    container.classList.add("play");
    // change play button to pause button
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    // play song
    audio.play();
}

// Pause song
function pauseSong() {
    // remove "play" class
    container.classList.remove("play");
    // change pause button to play button
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    playButton.querySelector("i.fas").classList.add("fa-play");
    // pause song
    audio.pause();
}



// EVENT LISTENERS

// Play button
playButton.addEventListener("click", () => {
    // get if container has "play" class
    const isPlaying = container.classList.contains("play");
    // check if playing
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});



// CALLS
loadSong(songs[songIndex]);
