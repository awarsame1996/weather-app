const API_KEY = "b248c5c1ee789732d38aa9fe65ef7935";
const form = document.getElementById("form");
let lat = "";
let lon = "";
const renderRecentCities = () => {
  console.log("recent cities needs to be done");
  // get recent cities from LS []
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
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
      console.log(lat);
      lon = items.coord.lon;
      console.log(lon);
      renderForecastWeatherData(lat, lon);
    });

  // render current weather data
};
const renderForecastWeatherData = (lat, lon) => {
  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
  console.log(forecastWeatherUrl);
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
