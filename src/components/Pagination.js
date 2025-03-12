import {
  RESULTS_PER_PAGE,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";

const renderPaginationButtons = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");

  if (!clickedButtonEl) {
    return;
  }

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  nextPage ? state.currentPage++ : state.currentPage--;

  renderPaginationButtons();
  renderJobList();

  clickedButtonEl.blur();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;
