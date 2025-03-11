import {
  BASE_API_URL,
  jobListSearchEl,
  numberEl,
  searchFormEl,
  searchInputEl,
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
    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.description);
    }

    const { jobItems } = data;
    renderSpinner("search");
    numberEl.textContent = jobItems.length;

    renderJobList(jobItems);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
