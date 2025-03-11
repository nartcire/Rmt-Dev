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

const submitHandler = (event) => {
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

  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        console.log("Something went wrong");
        return;
      }

      return res.json();
    })
    .then((data) => {
      const { jobItems } = data;
      renderSpinner("search");
      numberEl.textContent = jobItems.length;

      renderJobList(jobItems);
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
