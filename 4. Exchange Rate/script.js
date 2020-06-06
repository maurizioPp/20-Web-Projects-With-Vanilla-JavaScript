// UI VARIABLES
const currencySelectOne = document.getElementById("currency-one");
const currencySelectTwo = document.getElementById("currency-two");
const amountInputOne = document.getElementById("amount-one");
const amountInputTwo = document.getElementById("amount-two");
const swapButton = document.getElementById("swap");
const rateOutput = document.getElementById("rate");



// FUNCTIONS
// Calculate - fetch exchange rates and update UI
function calculate() {
    // get select values
    const currencyOne = currencySelectOne.value;
    const currencyTwo = currencySelectTwo.value;
    // fetch
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        // make JSON
        .then(result => result.json())
        // get rate
        .then(data => {
            const rate = data.rates[currencyTwo];
            // output rate
            rateOutput.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            // output converted amount, two decimals
            amountInputTwo.value = (amountInputOne.value * rate).toFixed(2);
        });
}



// EVENT LISTENERS
currencySelectOne.addEventListener("change", calculate);
amountInputOne.addEventListener("input", calculate);
currencySelectTwo.addEventListener("change", calculate);
amountInputTwo.addEventListener("input", calculate);
swapButton.addEventListener("click", () => {
    // store first value
    const temp = currencySelectOne.value;
    // set first value to second value
    currencySelectOne.value = currencySelectTwo.value;
    // set seconf value to temp (first value)
    currencySelectTwo.value = temp;
    // calculate
    calculate();
});



// INIT RUN
calculate();
