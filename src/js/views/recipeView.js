/////////////////////////////////////////////////////////////////////////////////////
// 3. Importing parcel icon
/////////////////////////////////////////////////////////////////////////////////////
import icons from 'url:../../img/icons.svg'; // parcel 2
import { Fraction } from 'fractional';
import View from './view'; // Parent Class

/////////////////////////////////////////////////////////////////////////////////////
// 2. Rendering the recipe
/////////////////////////////////////////////////////////////////////////////////////
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'We couldnot find that recipe. Please try another one!';
  _message = '';

  /////////////////////////////////////////////////////////////////////////////////////
  // Recipe - Generate Mark up
  /////////////////////////////////////////////////////////////////////////////////////

  //2.a. Add the html to display and replace the default values with current object
  // 2.d. Loop over the ingredients array using map as it returns new array of same length
  _generateMarkUp() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }<" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to=${
            this._data.servings - 1
          }>
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to=${
            this._data.servings + 1
          }>
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">

      ${this._data.ingredients.map(this._generateMarkUpIngredient).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  //////////////////////////////////////////////////////
  // Recipe - Refactoring Map method
  //////////////////////////////////////////////////////
  _generateMarkUpIngredient(ing) {
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction.Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>`;
  }

  //////////////////////////////////////////////////////////////////////////////////
  // 8. Refactoring Step 6 and 7 event handler code below
  //////////////////////////////////////////////////////////////////////////////////
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Recipe - Update Servings
  //////////////////////////////////////////////////////////////////////////////////
  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Recipe - Add Bookmark
  //////////////////////////////////////////////////////////////////////////////////
  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();

//
//
//
//
//
//////////////////////////////////////////////////////////////////////////////////
// 6. User Selects Recipe
//////////////////////////////////////////////////////////////////////////////////
/**
 * Just hardcode some recipe id's in search results of index.html
 * Click on the links and observe that the hash is changing
 * We want to display recipe based on the recipe id.
 * So a eventhandler need to be added for "hashchange"
 * Comment out the above controlRecipes() and put it in the event handler
 * Noticed that the same result is displayed for all recipes
 */
// window.addEventListener('hashchange', controlRecipes);

//////////////////////////////////////////////////////////////////////////////////
// 7. Page Load With Recipe Id
//////////////////////////////////////////////////////////////////////////////////
/**
 * Copy the searched recipe url and paste it in another tab or browser. for e.g.
 * "http://localhost:1234/#5ed6604691c37cdc054bd0d4" then the results are not displayed
 * So, We need to add an event listener for page reload as well
 */
// window.addEventListener('load', controlRecipes);
