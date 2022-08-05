/////////////////////////////////////////////////////////////////////////////////////
// Imports
/////////////////////////////////////////////////////////////////////////////////////
import View from './view.js'; // Parent Class
import icons from 'url:../../img/icons.svg'; // parcel 2
/////////////////////////////////////////////////////////////////////////////////////

class PreviewView extends View {
  _parentEl = '';

  /////////////////////////////////////////////////////////////////////////////////////
  // Generate Markup - for preview elements
  /////////////////////////////////////////////////////////////////////////////////////
  _generateMarkUp() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link  ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${
                  this._data.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
            </div>
            
            </a>
        </li>
    `;
  }
}

export default new PreviewView();
