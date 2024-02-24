function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = searchinput.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
}

function searchcity(city) {
  let apikey = "89624f36990b08aabeaatob0f874fe47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function searchsubmit(event) {
  event.preventDefault();
  let searchforminput = document.querySelector("#search-form-input");
  searchcity(searchforminput.value);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", searchsubmit);

searchcity("Kampala");
