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

        const editButton = document.createElement('a');
        editButton.href = `add-edit-recipe.html?recipeId=${index}`;
        editButton.classList.add('btn', 'btn-warning', 'mr-2');
        editButton.textContent = 'Edit Recipe';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete Recipe';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this recipe?')) {
                deleteRecipe(index);
            }
        });

        const viewButton = document.createElement('a');
        viewButton.href = `recipe-detail.html?recipeId=${index}`;
        viewButton.classList.add('btn', 'btn-primary');
        viewButton.textContent = 'View Recipe';

        cardBody.appendChild(title);
        cardBody.appendChild(ingredients);
        cardBody.appendChild(editButton); 
        cardBody.appendChild(deleteButton); 
        cardBody.appendChild(viewButton);

        card.appendChild(thumbnailImage);
        card.appendChild(cardBody);

        recipeCard.appendChild(card);

        if (row) {
            row.appendChild(recipeCard);
        }
    });
}


function editRecipe(recipeId) {
    window.location.href = `add-edit-recipe.html?recipeId=${recipeId}`;
}

function displayRecipeDetail(recipeId) {
    const recipeDetailSection = document.getElementById('recipe-detail');
    recipeDetailSection.innerHTML = '';

    const recipe = recipes[recipeId];

    if (recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const image = document.createElement('img');
        image.src = recipe.image || 'placeholder-image.jpg';
        image.alt = recipe.title;
        image.classList.add('recipe-image');

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('recipe-details');

        const title = document.createElement('h2');
        title.textContent = recipe.title;

        const ingredients = document.createElement('p');
        ingredients.textContent = 'Ingredients: ' + recipe.ingredients;

        const steps = document.createElement('p');
        steps.textContent = 'Preparation Steps: ' + recipe.steps;

        const backButton = document.createElement('a');
        backButton.href = 'recipe-list.html';
        backButton.classList.add('recipe-button', 'btn', 'btn-primary');
        backButton.textContent = 'Back to Recipe List';

        detailsContainer.appendChild(title);
        detailsContainer.appendChild(ingredients);
        detailsContainer.appendChild(steps);
        detailsContainer.appendChild(backButton);

        recipeCard.appendChild(image);
        recipeCard.appendChild(detailsContainer);

        recipeDetailSection.appendChild(recipeCard);
    } else {
        // Handle the case when the recipe is not found
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Recipe not found.';
        recipeDetailSection.appendChild(errorMessage);
    }
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

function searchRecipes() {
    const searchInput = document.getElementById('recipe-search');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        displayRecipeList(); 
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.toLowerCase().includes(searchTerm) ||
            recipe.steps.toLowerCase().includes(searchTerm)
        );
    });

    displayFilteredRecipes(filteredRecipes);
}

function displayFilteredRecipes(filteredRecipes) {
    const recipeListContainer = document.getElementById('recipe-list-container');
    recipeListContainer.innerHTML = '';

    let row = null;
    filteredRecipes.forEach((recipe, index) => {
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');

    if (recipeId !== null) {
        const recipe = getRecipeById(parseInt(recipeId));
        if (recipe) {
            document.getElementById('recipeId').value = recipeId;
            document.getElementById('recipe-title').value = recipe.title;
            document.getElementById('recipe-ingredients').value = recipe.ingredients;
            document.getElementById('recipe-steps').value = recipe.steps;
            document.getElementById('recipe-image').value = recipe.image;
        }
    }

    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleFormSubmit);
    }
});

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
            displayRecipeDetail(recipeId); // Display the recipe detail for the specified recipeId
        } else {
            // Handle the case when the recipeId is not valid or not provided
            const recipeDetailSection = document.getElementById('dynamic-recipe-content');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Recipe not found.';
            recipeDetailSection.appendChild(errorMessage);
        }
    } else if (currentPage === 'add-edit-recipe.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = parseInt(urlParams.get('recipeId'), 10);
        if (!isNaN(recipeId)) {
            displayRecipeForm(recipeId);
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

