// UI VARIABLES
const movieSelect = document.getElementById("movie");
let moviePrice = parseInt(movieSelect.value);
const theatre = document.getElementById("theatre");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatCount = document.getElementById("seat-count");
const totalPrice = document.getElementById("price");



// FUNCTIONS

// Update selected seats and total price
function updateSelected() {
    const count = document.querySelectorAll(".row .seat.selected").length;
    seatCount.innerText = count;
    totalPrice.innerText = count * moviePrice;
}


// EVENT LISTENERS

// Seat selecting
theatre.addEventListener("click", (eventObject) => {
    if (eventObject.target.classList.contains("seat") && !eventObject.target.classList.contains("occupied")) {
        eventObject.target.classList.toggle("selected");
    }
    updateSelected();
});

// Movie selecting
movieSelect.addEventListener("change", (eventObject) => {
    // update movie price
    moviePrice = parseInt(eventObject.target.value);
    // call updateSelected() which outputs updated movie price value
    updateSelected();
});
