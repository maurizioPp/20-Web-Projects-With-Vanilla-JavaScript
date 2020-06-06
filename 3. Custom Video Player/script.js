// UI VARIABLES
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");



// FUNCTIONS
// Play and pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Change play icon to pause and back
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// Update progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    // get minutes
    let minutes = Math.floor(video.currentTime / 60);
    // display zero if single digit
    if (minutes < 10) {
        minutes = `0${String(minutes)}`;
    }
    // get seconds
    let seconds = Math.floor(video.currentTime % 60);
    // display zero if single digit
    if (seconds < 10) {
        seconds = `0${String(seconds)}`;
    }
    timestamp.innerText = `${minutes}:${seconds}`;
}

// Set video time to progress
function setVideoProgress() {
    video.currentTime = parseInt(progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}



// EVENT LISTENERS
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
