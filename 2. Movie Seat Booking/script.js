// UI VARIABLES
const movieSelect = document.getElementById("movie");
const theatre = document.getElementById("theatre");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatCount = document.getElementById("seat-count");
const totalPrice = document.getElementById("price");

// populate UI from LS
populateUI();

// get movie price from selected movie
let moviePrice = parseInt(movieSelect.value);

// FUNCTIONS

// Store movie index and price
function storeMovieData(index, price) {
    localStorage.setItem("selectedMovieIndex", index);
    localStorage.setItem("selectedMoviePrice", price);
}

// Update selected seats and total price
function updateSelected() {
    // get selected seats
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    // copy selected seats into array
    // map through array
    // return new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });
    // store selected seats in LS
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    // get selected count
    const selectedCount = selectedSeats.length;
    // output into UI
    seatCount.innerText = selectedCount;
    totalPrice.innerText = selectedCount * moviePrice;
}

// Get data from LS and populate UI
function populateUI() {
    // get selected seats from LS
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    // check if LS not empty
    if (selectedSeats !== null && selectedSeats.length > 0) {
        // get all unocuppied seats and loop through them
        seats.forEach((seat, index) => {
            // check if the seat is in LS
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    // get movie index from LS
    const selectedMovie = localStorage.getItem("selectedMovieIndex");
    // check if LS not empty
    if (selectedMovie !== null) {
        // set movie select index
        movieSelect.selectedIndex = selectedMovie;
    }
}



// EVENT LISTENERS

// Movie selecting
movieSelect.addEventListener("change", (eventObject) => {
    // update movie price
    moviePrice = parseInt(eventObject.target.value);
    // store selected movie's index and price
    storeMovieData(eventObject.target.selectedIndex, eventObject.target.value);
    // call updateSelected() which outputs updated movie price value
    updateSelected();
});

// Seat selecting
theatre.addEventListener("click", (eventObject) => {
    // if target is seat and not occupied
    if (eventObject.target.classList.contains("seat") && !eventObject.target.classList.contains("occupied")) {
        // toggle class "selected"
        eventObject.target.classList.toggle("selected");
        // update
        updateSelected();
    }
});

// initial run
updateSelected();
