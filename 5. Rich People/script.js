// INTERFACE VARIABLES
const output = document.getElementById("output");
const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");



// FUNCTIONS

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

// Double Money - 
function doubleMoney() {
    data = data.map(person => {
        // return object
        return { ...person, money: person.money * 2 };
    });
    updateInterface();
}

// Add Data - push object to data array
function addData(object) {
    data.push(object);
    // update interface with default data
    updateInterface();
}

// Update Interface
function updateInterface(providedData = data) {
    // set output to default content
    output.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    // loop through provided data
    providedData.forEach(person => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        output.appendChild(element);
    });
}

// Format Money - format number as money
function formatMoney(number) {
    // https://stackoverflow.com/a/14428340/12792462
    return `${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} USD`;
}



// EVENT LISTENERS
addUserButton.addEventListener("click", getRandomUser);
doubleButton.addEventListener("click", doubleMoney);
