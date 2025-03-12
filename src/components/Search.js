import {
  BASE_API_URL,
  getData,
  jobListSearchEl,
  numberEl,
  searchFormEl,
  searchInputEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";
import renderSpinner from "./Spinner.js";

const submitHandler = async (event) => {
  event.preventDefault();

  const searchText = searchInputEl.value;
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;

    state.searchJobItems = jobItems;
    state.currentPage = 1;

    renderSpinner("search");
    numberEl.textContent = jobItems.length;

    renderPaginationButtons();
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
