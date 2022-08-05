/////////////////////////////////////////////////////////////////////////////////////
// Imports
/////////////////////////////////////////////////////////////////////////////////////
import View from './view'; // Parent Class
import icons from 'url:../../img/icons.svg'; // parcel 2
/////////////////////////////////////////////////////////////////////////////////////

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn_Open = document.querySelector('.nav__btn--add-recipe');
  _btn_Close = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addhandlerShowWindow();
    this._addhandlerCloseWindow();
  }

  //////////////////////////////////////////////////////
  // Add Recipe - toggle Window
  //////////////////////////////////////////////////////
  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  //////////////////////////////////////////////////////
  // Add Recipe - Show Window
  //////////////////////////////////////////////////////
  _addhandlerShowWindow() {
    this._btn_Open.addEventListener('click', this._toggleWindow.bind(this));
  }

  //////////////////////////////////////////////////////
  // Add Recipe - Close Window
  //////////////////////////////////////////////////////
  _addhandlerCloseWindow() {
    this._btn_Close.addEventListener('click', this._toggleWindow.bind(this));

    //['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  //////////////////////////////////////////////////////
  // Add Recipe - Upload Recipe
  //////////////////////////////////////////////////////
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  //////////////////////////////////////////////////////
  // Add Recipe - Generate mark up
  //////////////////////////////////////////////////////
  _generateMarkUp() {}

  //////////////////////////////////////////////////////
  // Add Recipe - Handle Event
  //////////////////////////////////////////////////////
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.upload');
      console.log(btn);

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }
}

export default new AddRecipeView();
