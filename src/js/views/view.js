/**
 * The change tha we make to code is in starter/src but the the content on the web UI
 * comes from /dist folder after build so the icon path do not change
 * To have the updated icon path import icons - parcel does that
 * Replace all the icon src path with '${icons}'
 */
/////////////////////////////////////////////////////////////////////////////////////
// 3. Importing parcel icon
/////////////////////////////////////////////////////////////////////////////////////
//import icons from '../img/icons.svg'; // parcel 1
//import icons from 'url:../img/icons.svg'; // parcel 2
import icons from 'url:../../img/icons.svg'; // parcel 2
/////////////////////////////////////////////////////////////////////////////////////

export default class View {
  _data;

  /////////////////////////////////////////////////////////////////////////////////////
  // Render data to UI
  /////////////////////////////////////////////////////////////////////////////////////
  /**
   * Renders data to UI
   * @param {*} data
   * @param {*} render
   * @returns
   * @this
   * @author
   * @todo
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clear();
    //////////////////////////////////////////////////////////////////////////////////
    // 2.b. Rendering the recipe
    //////////////////////////////////////////////////////////////////////////////////
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

    // Recipe is rendered along with the default message and invalid ingredients etc..
    // recipeContainer.insertAdjacentHTML('afterbegin', markup);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Update - DOM elements instead of rendering
  /////////////////////////////////////////////////////////////////////////////////////

  update(data) {
    this._data = data;

    // New markup
    const newMarkup = this._generateMarkUp();

    // Creating a new dom object with updates
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Getting new elements and current elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    // Compare new markup with old and change only those attributes that has changed
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Refactoring - Empting the default html
  /////////////////////////////////////////////////////////////////////////////////////
  _clear() {
    // 2.c. Empting the default html to remove default html contents
    this._parentEl.innerHTML = '';
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // 5. Loading Spinner
  /////////////////////////////////////////////////////////////////////////////////////
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Render Error Message
  /////////////////////////////////////////////////////////////////////////////////////
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Render Success Message
  /////////////////////////////////////////////////////////////////////////////////////
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
