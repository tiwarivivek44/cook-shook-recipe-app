/////////////////////////////////////////////////////////////////////////////////////
// Importing loadRecipe
/////////////////////////////////////////////////////////////////////////////////////
import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

/////////////////////////////////////////////////////////////////////////////////////
// Hot mdoule accept - not part of JS
/////////////////////////////////////////////////////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////////////////////////////////////
// 4. Importing Polyfilling
/////////////////////////////////////////////////////////////////////////////////////
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////////////////////////////////////////////////////
// 1. Create a showRecipe function to load and diplay recipe
/////////////////////////////////////////////////////////////////////////////////////
const controlRecipes = async function () {
  try {
    // 6. Getting the recipe id //
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //////////////////////////////////////////////////////////////////////////////////
    // 0. Update results view to mark selected search result
    //////////////////////////////////////////////////////////////////////////////////
    resultView.update(model.getSearchResultsPage());

    //////////////////////////////////////////////////////////////////////////////////
    // 1.a. Loading recipe
    //////////////////////////////////////////////////////////////////////////////////
    await model.loadRecipe(id);

    //////////////////////////////////////////////////////////////////////////////////
    // 2. Rendering the recipe
    //////////////////////////////////////////////////////////////////////////////////
    // 2.e. Render recipe using function
    recipeView.render(model.state.recipe);

    //////////////////////////////////////////////////////////////////////////////////
    // Updating bookmarks view
    //////////////////////////////////////////////////////////////////////////////////
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

//////////////////////////////////////////////////////////////////////////////////
// Search function
//////////////////////////////////////////////////////////////////////////////////
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1. Get search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Search Results
    await model.loadSearchResults(query);

    // 3. Render results
    //resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // 4. Render Initial Pagination Buttons
    paginationView.render(model.state.search);
    //
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////
// Pagination Button click
//////////////////////////////////////////////////////////////////////////////////
const controlPagination = function (goToPage) {
  // 3. Render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4. Render new Pagination Buttons
  paginationView.render(model.state.search);
};

//////////////////////////////////////////////////////////////////////////////////
// Control Serving function
//////////////////////////////////////////////////////////////////////////////////
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServing(newServings);

  // Update the recipe view - instead of rendering the whole section
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//////////////////////////////////////////////////////////////////////////////////
// Control Bookmark function
//////////////////////////////////////////////////////////////////////////////////
const controlAddBookmark = function () {
  // 1. Add or Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

//////////////////////////////////////////////////////////////////////////////////
// Control Bookmark function
//////////////////////////////////////////////////////////////////////////////////
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//////////////////////////////////////////////////////////////////////////////////
// Control Add Recipe function
//////////////////////////////////////////////////////////////////////////////////
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // upload recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close model window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('⚠️ Error!', err);
    addRecipeView.renderError(err.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////
// Init function
//////////////////////////////////////////////////////////////////////////////////
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
