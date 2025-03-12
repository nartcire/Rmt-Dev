import {
  BASE_API_URL,
  getData,
  jobListSearchEl,
  numberEl,
  searchFormEl,
  searchInputEl,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderJobList from "./JobList.js";
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
  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;

    state.searchJobItems = jobItems;

    renderSpinner("search");
    numberEl.textContent = jobItems.length;

    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
