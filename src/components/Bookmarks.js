import {
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return;

  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems)
  );

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  renderJobList();
};

const mouseEnterHandler = (event) => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
