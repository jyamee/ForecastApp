function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = currentdate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
}

function currentdate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "89624f36990b08aabeaatob0f874fe47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getforecast(city) {
  let apikey = "89624f36990b08aabeaatob0f874fe47";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;

  axios(apiUrl).then(displayforecast);
}

function displayforecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="forecast-temperature">
          <div class="maximum">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="minimum">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
