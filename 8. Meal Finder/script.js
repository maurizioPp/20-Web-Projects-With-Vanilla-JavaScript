// INTERFACE
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const resultHeading = document.getElementById("result-heading");
const mealsElement = document.getElementById("meals");
const singleMealElement = document.getElementById("single-meal");



// FUNCTIONS

// Search meal
function searchMeal(eventObject) {
    // prevent default behaviour
    eventObject.preventDefault();
    // clear single meal
    singleMealElement.innerHTML = "";
    // get search input
    const term = searchInput.value;
    // check for empty input
    if (term.trim()) {
        // fetch response
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            // convert to JSON
            .then(response => response.json())
            // get data
            .then(data => {
                // log response
                console.clear();
                console.log(data);
                // set heading
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                // check for empty response
                if (data.meals === null) {
                    // display message
                    mealsElement.innerHTML = "<p>There are no meals with that name, please try again.</p>"
                } else {
                    // loop
                    mealsElement.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-info" data-mealid="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                        // convert to string
                        .join("");
                }
            });
        // clear search input
        searchInput.value = "";
    } else {
        alert("Please enter a search term");
    }
}

// Get meal by ID
function getMealByID(mealID) {
    // fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        // convert to JSON
        .then(response => response.json())
        // get data
        .then(data => {
            // get meal from response array
            const meal = data.meals[0];
            // call
            addMealToDOM(meal);
        });
}

// Add meal to DOM
function addMealToDOM(meal) {
    // initialize array
    const ingredientsArray = [];
    // loop
    for (let i = 1; i <= 20; i++) {
        // check for ingredient
        if (meal[`strIngredient${i}`]) {
            // push to array
            ingredientsArray.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }
    // output
    singleMealElement.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">\
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients:</h2>
                <ul>
                    ${ingredientsArray.map(ingredient => `<li>${ingredient}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}

// Get random meal
function getRandomMeal() {
    // clear
    mealsElement.innerHTML = "";
    resultHeading.innerHTML = "";
    // fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        // convert to JSON
        .then(response => response.json())
        // get data
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })
}



// EVENT LISTENERS

// Search button
searchButton.addEventListener("click", searchMeal);

// Random button
randomButton.addEventListener("click", getRandomMeal);

// Meals
mealsElement.addEventListener("click", eventObject => {
    // loop through child elements with find
    const mealInfo = eventObject.path.find(element => {
        // check for class
        if (element.classList) {
            // return elements with "meal-info" class
            return element.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    // check for meal info
    if (mealInfo) {
        // get meal ID
        const mealID = mealInfo.getAttribute("data-mealid");
        // call
        getMealByID(mealID);
    } else {
        return false;
    }
});
