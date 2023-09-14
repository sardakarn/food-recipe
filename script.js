let recipes = [];

function displayRecipeList() {
    const recipeListContainer = document.getElementById('recipe-list-container');
    recipeListContainer.innerHTML = '';

    let row = null;
    recipes.forEach((recipe, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row');
            recipeListContainer.appendChild(row);
        }

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-4', 'mb-4'); 

        const card = document.createElement('div');
        card.classList.add('card', 'shadow-sm'); 

        const thumbnailImage = document.createElement('img');
        thumbnailImage.src = recipe.image || 'placeholder-image.jpg';
        thumbnailImage.alt = recipe.title;
        thumbnailImage.classList.add('card-img-top'); 

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = recipe.title;

        const ingredients = document.createElement('p');
        ingredients.classList.add('card-text');
        ingredients.textContent = 'Ingredients: ' + recipe.ingredients;

        const steps = document.createElement('p');
        steps.classList.add('card-text');
        steps.textContent = 'Preparation Steps: ' + recipe.steps;

        const viewButton = document.createElement('a');
        viewButton.href = `recipe-detail.html?recipeId=${index}`; 
        viewButton.classList.add('btn', 'btn-primary');
        viewButton.textContent = 'View Recipe';

        cardBody.appendChild(title);
        cardBody.appendChild(ingredients);
        cardBody.appendChild(viewButton);

        card.appendChild(thumbnailImage);
        card.appendChild(cardBody);

        recipeCard.appendChild(card);

        if (row) {
            row.appendChild(recipeCard);
        }
    });
}

function displayRecipeDetail(recipeId) {
    const recipeDetailSection = document.getElementById('recipe-detail');
    recipeDetailSection.innerHTML = '';

    const recipe = recipes[recipeId];

    const title = document.createElement('h2');
    title.textContent = recipe.title;

    const ingredients = document.createElement('p');
    ingredients.textContent = 'Ingredients: ' + recipe.ingredients;

    const steps = document.createElement('p');
    steps.textContent = 'Preparation Steps: ' + recipe.steps;

    const image = document.createElement('img');
    image.src = recipe.image || 'placeholder-image.jpg'; 
    image.alt = recipe.title;

    recipeDetailSection.appendChild(title);
    recipeDetailSection.appendChild(ingredients);
    recipeDetailSection.appendChild(steps);
    recipeDetailSection.appendChild(image);
}

function viewRecipe(recipeId) {
    window.location.href = `recipe-detail.html?recipeId=${recipeId}`;
}

function deleteRecipe(recipeId) {
    recipes.splice(recipeId, 1);
    displayRecipeList();
    saveRecipesToLocal();
}

function saveRecipesToLocal() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipesFromLocal() {
    const localRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (localRecipes) {
        recipes = localRecipes;
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const recipe = {
        title: formData.get('title'),
        ingredients: formData.get('ingredients'),
        steps: formData.get('steps'),
        image: formData.get('image')
    };

    const recipeId = parseInt(formData.get('recipeId'), 10);

    if (!isNaN(recipeId)) {
        recipes[recipeId] = recipe;
    } else {
        recipes.push(recipe);
    }

    saveRecipesToLocal();
    form.reset();

    window.location.href = 'index.html';
}

function init() {
    loadRecipesFromLocal();

    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'recipe-list.html') {
        displayRecipeList();
    } else if (currentPage === 'recipe-detail.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = parseInt(urlParams.get('recipeId'), 10);
        if (!isNaN(recipeId)) {
            displayRecipeDetail(recipeId);
        }
    }

    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleFormSubmit);
    }

    if (currentPage === 'index.html') {
        displayRecipeList();
    }
}

init();
