const API_KEY = "b248c5c1ee789732d38aa9fe65ef7935";
const form = document.getElementById("form");
const currentWeatherContainer = document.getElementById("currentWeather");
let city = "";
let lat = "";
let lon = "";
let temp = "";
let icon = "";
let wind = "";
let humidity = "";
let description = "";
const renderRecentCities = () => {
  console.log("recent cities needs to be done");
  // get recent cities from LS []
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
  $("#currentWeather").append(`<div class="col-sm-12">
  Current Weather Data
  <h1>${city}</h1>
  <p>Temp:${temp}</p>
  <p>Wind: ${wind}</p>
  <p>Humidity:${humidity}</p>
  <p>${description}</p>
</div>
<div class="col-sm-12">
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="img-fluid" alt="..." />
</div>`);
};

const renderForecastWeather = (forecastWeatherData) => {
  // render the forecast weather data and append each card to section
};

const renderWeatherData = (cityName) => {
  // use API to fetch current weather data
  let search = document.getElementById("input-text").value;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`;
  console.log(currentWeatherUrl);
  let items = [];
  // from the response cherry pick all the data you want to see in the current weather card
  fetch(currentWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      items = result;
      lat = items.coord.lat;
      lon = items.coord.lon;
      renderForecastWeatherData(lat, lon);
      city = items.name;
      temp = items.main.temp;
      icon = items.weather[0].icon;
      console.log(icon);
      wind = items.wind.speed;
      humidity = items.main.humidity;
      description = items.weather[0].description;
      let currentWeatherData = [temp, icon, wind, humidity, description];
      renderCurrentWeather(currentWeatherData);
    });

  // render current weather data
};
const renderForecastWeatherData = (lat, lon) => {
  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
  console.log(forecastWeatherUrl);
  // from the response cherry pick all the data you want to see in the current weather card
  let items = [];
  // from the response cherry pick all the data you want to see in the current weather card
  fetch(forecastWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      items = result;
    });
  // render forecast weather data
};

const handleFormSubmit = (event) => {
  // get the city name from input
  event.preventDefault();
  //get text input
  let search = document.getElementById("input-text").value;

  if (search) {
    //validate

    // else render weather data
    renderWeatherData();
    // add search to recent searches local storage
    // if city name is empty handle that
  } else {
    alert("enter valid search");
  }
};
form.addEventListener("submit", handleFormSubmit);
const onReady = () => {
  // render recent cities
  renderRecentCities();
};

$(document).ready(onReady);
