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
    songCover.src = `images/${song}.jpg`;
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

// Previous song
function previousSong() {
    // change index
    songIndex--;
    // check if first song
    if (songIndex < 0) {
        // change index to last song
        songIndex = songs.length - 1;
    }
    // load
    loadSong(songs[songIndex]);
    // play
    playSong();
}

// Next song
function nextSong() {
    // change index
    songIndex++;
    // check if last song
    if (songIndex > songs.length - 1) {
        // change index to first song
        songIndex = 0;
    }
    // load
    loadSong(songs[songIndex]);
    // play
    playSong();
}

// Update progress bar
function updateProgressBar(eventObject) {
    // get duration and current time
    const { duration, currentTime } = eventObject.srcElement;
    // get progress percent
    const progressPercent = (currentTime / duration) * 100;
    // set progress bar width
    progressBar.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgressBar(eventObject) {
    // get width of progress bar container
    const width = this.clientWidth;
    // get where click occured
    const click = eventObject.offsetX;
    // get duration
    const duration = audio.duration;
    // set current time
    audio.currentTime = (click / width) * duration;
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

// Previous and Next buttons
previousButton.addEventListener("click", previousSong);
nextButton.addEventListener("click", nextSong);

// Update progress bar
audio.addEventListener("timeupdate", updateProgressBar);

// Set progess bar
progressContainer.addEventListener("click", setProgressBar);

// Song end
audio.addEventListener("ended", nextSong);


// CALLS
loadSong(songs[songIndex]);
