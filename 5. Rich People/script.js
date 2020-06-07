// UI VARIABLES
const mainElement = document.getElementById("main");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");

// create empty data array
let data = [];

// Get Random User - fetch random user and add money
async function getRandomUser() {
    // get response from API
    const response = await fetch("https://randomuser.me/api");
    // create JSON
    const responseData = await response.json();
    // get user from response data
    const user = responseData.results[0];
    // create newUser object
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    // add to data array
    addData(newUser);
}

// Add Data - push object to data array
function addData(object) {
    data.push(object);
}

getRandomUser();
