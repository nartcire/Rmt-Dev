import { errorEl, errorTextEl } from "../common.js";

const renderError = (message = "An error has occured") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, 3500);
};

export default renderError;
