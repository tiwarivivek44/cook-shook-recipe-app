/////////////////////////////////////////////////////////////////////////////////////
// Imports
/////////////////////////////////////////////////////////////////////////////////////
import View from './view.js'; // Parent Class
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // parcel 2
/////////////////////////////////////////////////////////////////////////////////////

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';
  _message = '';

  /////////////////////////////////////////////////////////////////////////////////////
  // Bookmarks - Generate Mark up
  /////////////////////////////////////////////////////////////////////////////////////
  _generateMarkUp() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Bookmarks - Handler
  /////////////////////////////////////////////////////////////////////////////////////
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();

// This got exported to previewVIew.js
/////////////////////////////////////////////////////////////////////////////////////
// Bookmarks - Generate Mark up Preview
/////////////////////////////////////////////////////////////////////////////////////
//   _generateMarkUpPreview(result) {
//     const id = window.location.hash.slice(1);

//     return `
//         <li class="preview">
//             <a class="preview__link  ${
//               result.id === id ? 'preview__link--active' : ''
//             }" href="#${result.id}">
//             <figure class="preview__fig">
//                 <img src="${result.image}" alt="Test" />
//             </figure>
//             <div class="preview__data">
//                 <h4 class="preview__title">${result.title}</h4>
//                 <p class="preview__publisher">${result.publisher}</p>
//             </div>
//             </a>
//         </li>
//     `;
//   }
