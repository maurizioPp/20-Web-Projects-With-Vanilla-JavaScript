// INTERFACE
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
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
                            <div class="meal-info" data-mealID="${meal.idMeal}">
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



// EVENT LISTENERS

// Search button
searchButton.addEventListener("click", searchMeal);
