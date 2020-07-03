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
function addTransactionToInterface(transaction) {
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
    transactions.forEach(addTransactionToInterface);
}



// EVENT LISTENERS



// CALLS
initializeApplication();
