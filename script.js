function handlesearchsubmit(event) {
  event.preventDefault();
  let searchinput = document.querySelector("search-form-input");
  let cityElement = searchinput.querySelector("#app-city");
  cityElement.innerHTML = searchinput.value;
}

let searchformElement = document.querySelector("search-form");
searchformElement.addEventListener("submit", handlesearchsubmit);
