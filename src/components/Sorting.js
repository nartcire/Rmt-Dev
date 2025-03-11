import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
} from "../common.js";

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".sorting__button");
  if (!clickedButtonEl) return;

  const recent = clickedButtonEl.className.includes("--recent") ? true : false;
};

sortingEl.addEventListener("click", clickHandler);
