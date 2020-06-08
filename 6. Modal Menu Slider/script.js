// INTERFACE VARIABLES
const toggle = document.getElementById("toggle");
const closeButton = document.getElementById("close-button");
const open = document.getElementById("open");
const modal = document.getElementById("modal");



// EVENT LISTENERS
toggle.addEventListener("click", () => {
    document.body.classList.toggle("show-nav");
});
open.addEventListener("click", () => modal.classList.add("show-modal"));
closeButton.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", eventObject => {
    if (eventObject.target == modal) {
        modal.classList.remove("show-modal");
    }
});
