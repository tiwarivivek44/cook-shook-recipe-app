/////////////////////////////////////////////////////////////////////////////////////
// Imports
/////////////////////////////////////////////////////////////////////////////////////
import View from './view'; // Parent Class
import icons from 'url:../../img/icons.svg'; // parcel 2
/////////////////////////////////////////////////////////////////////////////////////

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  //////////////////////////////////////////////////////
  // Pagination - Prev button
  //////////////////////////////////////////////////////
  _showPrevBtn(currPage) {
    const prev = currPage;
    return `
        <button data-goto="${prev}" class="btn--inline pagination__btn--prev">
            <span>Page ${prev}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
      `;
  }

  //////////////////////////////////////////////////////
  // Pagination - Next button
  //////////////////////////////////////////////////////
  _showNextBtn(currPage) {
    const next = currPage;
    return `
        <button data-goto="${next}" class="btn--inline pagination__btn--next">
            <span>Page ${next}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }

  //////////////////////////////////////////////////////
  // Pagination - Generate mark up
  //////////////////////////////////////////////////////
  _generateMarkUp() {
    let currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    //////////////////////////////////////////////////////
    if (currPage === 1 && numPages > 1) {
      return `${this._showNextBtn(currPage + 1)}`;
    }

    // Last page
    //////////////////////////////////////////////////////
    if (currPage === numPages && numPages > 1) {
      return `${this._showPrevBtn(currPage - 1)}`;
    }

    // Other Pages
    //////////////////////////////////////////////////////
    if (currPage < numPages) {
      return `${this._showPrevBtn(currPage - 1)} ${this._showNextBtn(
        currPage + 1
      )}`;
    }

    // Page 1 and there are NO other pages
    //////////////////////////////////////////////////////
    return '';
  }

  //////////////////////////////////////////////////////
  // Pagination - Handle Event
  //////////////////////////////////////////////////////
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
