let searchBtn = document.getElementById('search-btn');
let searchField = document.querySelector('.search-control');
let mealListContainer = document.getElementById('meal');
let mealDetailsContainer = document.getElementById('mealDetailContainer');
let detailCloseBtn = document.getElementById('recipe-close-btn');
let message = document.querySelector('.message');

searchField.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        getMealList()
    }
});
mealListContainer.addEventListener('click', getMealDetails);

function getMealList() {
    let searchValue = document.getElementById('searchInput').value.trim();
    document.querySelector('.initial-banner').style.display = 'none'
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
    .then(response => response.json())
    .then(data => {
        let html = '';
        if(data.meals) {
            message.style.display = 'none'
            data.meals.forEach(meal => {
                html += `<div class = "meal-item" data-id='${meal.idMeal}'>
                <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                  <h4>${meal.strMeal}</h4>
                  <a href = "#" class = "recipe-btn">Get Instruction</a>
                </div>
              </div>`
            });
        } else {
            message.style.display = 'block';
        }
        mealListContainer.innerHTML = html;
    })
}

function getMealDetails(e) {
    e.preventDefault();
    document.body.style.overflow = 'hidden'
    if(e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            showDetails(data.meals)
        })
    }
}

function showDetails(meal) {
    meal = meal[0];
    console.log(meal)
    let html = `
            <div class = "recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>  
            <div>
                <h2 class = "recipe-title">${meal.strMeal}</h2>
                <p class = "recipe-category">${meal.strCategory}</p>
            </div>
          

        
        
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>

        <div class = "recipe-link">
        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `
    mealDetailsContainer.innerHTML = html;
    mealDetailsContainer.parentElement.classList.add('showRecipe');
}

detailCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto'
    mealDetailsContainer.parentElement.classList.remove('showRecipe');
})