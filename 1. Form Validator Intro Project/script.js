// UI VARIABLES

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");



// FUNCTIONS

// Show error message
function showError(input, message) {
    // get form control div
    const formControl = input.parentElement;
    // add error class
    formControl.className = "form-control error";
    // get alert
    const alert = formControl.querySelector("small");
    // insert message into alert
    alert.innerText = message;
}

// Show success message
function showSuccess(input) {
    // get form control div
    const formControl = input.parentElement;
    // add success class
    formControl.className = "form-control success";
}

// Check password match
function checkPasswordMatch(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords don't match");
    } else {
        showSuccess(confirmPassword);
    }
}

// Validate email
function checkEmail(input) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regularExpression.test(String(input.value).trim().toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, `${getInputName(input)} is not valid`);
    }

}

// Check required input
function checkRequiredInput(inputArray) {
    // loop
    inputArray.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getInputName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Get input name
function getInputName(input) {
    let name = "";
    switch (input.id) {
        case "username":
            name = "Username";
            break;
        case "email":
            name = "email";
            break;
        case "password":
            name = "Password";
            break;
        case "confirm-password":
            name = "Password confirmation";
            break;
        default:
            log.error("Invalid input");
    }
    return name;
}

// Check length of input value
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getInputName(input)} must have at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must have at most ${max} characters`);
    } else {
        showSuccess(input);
    }
}



// EVENT LISTENERS

// Register button
form.addEventListener("submit", function (eventObject) {
    // prevent default behaviour
    eventObject.preventDefault();
    // check password match
    checkPasswordMatch(password, confirmPassword);
    // check length of username and password
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    // check required input
    checkRequiredInput([username, email, password, confirmPassword]);
    // check email
    checkEmail(email);
});
