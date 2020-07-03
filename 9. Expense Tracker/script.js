// INTERFACE
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");



// GLOBAL

// Dummy transactions
const dummyTransactions = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
];

// Transactions
let transactions = dummyTransactions;



// FUNCTIONS

// Add transaction to interface list
function addTransaction(transaction) {
    // get plus or minus
    const sign = transaction.amount < 0 ? "-" : "+";
    // create list item
    const listItem = document.createElement("li");
    // add class
    listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
    // add amount
    listItem.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-button">x</button>
    `;
    // add to interface list
    list.appendChild(listItem);
}

// Initialize application
function initializeApplication() {
    // clear interface list
    list.innerHTML = "";
    // loop through transactions
    transactions.forEach(addTransaction);
    // update interface
    updateValues();
}

// Update balance, income and expense
function updateValues() {
    // get amounts
    const amounts = transactions.map(transaction => transaction.amount);
    // get total
    // by adding all values together
    // and two decimal places
    const total = amounts
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);
    // get income
    // by filtering all positive values
    // and adding them together
    // and two decimal places
    const income = amounts
        .filter(item => item > 0)
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);
    // get expense
    // by filtering all negative values
    // and adding them together
    // and making result negative
    // and two decimal places
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((accumulator, item) => (accumulator += item), 0)
        * -1)
        .toFixed(2);
    // display in interface
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}



// EVENT LISTENERS



// CALLS
initializeApplication();
