import {
  BASE_API_URL,
  jobListSearchEl,
  numberEl,
  searchFormEl,
  searchInputEl,
} from "../common.js";

import renderError from "./Error.js";
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

      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
                <li class="job-item">
                  <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                      <h3 class="third-heading">${jobItem.title}</h3>
                      <p class="job-item__company">${jobItem.company}</p>
                      <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                      </div>
                    </div>
                    <div class="job-item__right">
                      <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                      <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                  </a>
                </li>`;

        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
