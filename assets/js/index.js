const API_KEY = "b248c5c1ee789732d38aa9fe65ef7935";
const form = document.getElementById("form");
const currentWeatherContainer = document.getElementById("currentWeather");
const forecastWeatherContainer = document.getElementById("forecastWeather");
let city = "";
let lat = "";
let lon = "";
let temp = "";
let icon = "";
let wind = "";
let humidity = "";
let description = "";
let tempDate = "";
let uv = "";
const renderRecentCities = () => {
  const container = document.getElementById("recent");
  const searchContainer = document.getElementById("list");
  searchContainer.remove();
  $("#recent").append(` <div id="list" class="list-group">
            
  </div>`);
  // get recent cities from LS []
  const recentCities = JSON.parse(localStorage.getItem("recentSearches"));
  // if [] is empty then render alert
  if (recentCities !== null) {
    for (i = 0; i < recentCities.length; i++) {
      let city = recentCities[i];
      $("#list")
        .append(`<a  data-value="${city}" id="${i}"class="list-group-item list-group-item-action">
     ${city}
    </a>
  `);
    }
  }
  // else render all recent cities
  // add an event listener on div containing all cities
  $("#list").click(handleRecentSubmit);
};

const renderCurrentWeather = (currentWeatherData) => {
  // render the current weather data and append to section
  let weatherContainer = document.getElementById("weatherContainer");
  $("#weatherContainer").css(
    "background-image",
    `url('./assets/images/backgrounds/${icon}.jpeg')`
  );
  $("#currentWeather").append(`  <div  id="currentWeather" class="border row">
  <div  class="col-auto">
    <h1 class="title">${city}, ${date} <img src="./assets/images/png/${icon}.png" class="img-fluid" alt="..." /></h1>
    <h2 class="title"> ${temp}°C</h2>
  </div>
           
            <div class="col-auto">
             
            <p class="weatherDescription">Wind: ${wind}  mph</p>
            <p class="weatherDescription">Humidity:${humidity}%</p>
            <p class="weatherDescription">${description}</p>
          </div>
           
         
          <div class="col-sm-12">
            
          </div>
        </div>
`);
};

const renderForecastWeather = (forecastWeatherData) => {
  // render the forecast weather data and append each card to section
  $("#forecastWeather").append(`  <div class="card" style="width: 10rem">
  <img src="./assets/images/png/${icon}.png" class="card-img-top rounded float-start" alt="..." />
  <div class="card-body">
    <h5 class="card-title title">${date}</h5>
    <p class="weatherDescription">Temp:${temp}°C</p>
   </div>
</div>`);
};

const renderWeatherData = (search) => {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;
  console.log(currentWeatherUrl);
  let items = [];
  // from the response cherry pick all the data you want to see in the current weather card
  fetch(currentWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      items = result;
      console.log(items);
      lat = items.coord.lat;
      lon = items.coord.lon;
      renderForecastWeatherData(lat, lon);
      city = items.name;
      temp = items.main.temp;
      icon = items.weather[0].icon;
      console.log(icon);
      wind = items.wind.speed;
      humidity = items.main.humidity;
      tempDate = items.dt;
      date = moment.unix(tempDate).format("DD-MM-YYYY");
      uv = description = items.weather[0].description;
      let currentWeatherData = [temp, icon, wind, humidity, description, date];
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
      console.log(items);

      for (i = 1; i < 6; i++) {
        temp = items.daily[i].temp.day;
        icon = items.daily[i].weather[0].icon;
        console.log(icon);
        tempDate = items.daily[i].dt;
        date = moment.unix(tempDate).format("ddd DD-MM");
        let forecastWeatherData = [temp, icon, date];
        renderForecastWeather(forecastWeatherData);
      }
    });
  // render forecast weather data
};
const handleRecentSubmit = (event) => {
  event.preventDefault();
  //get text input
  const container = document.getElementById("weatherContainer");
  container.remove();
  const main = document.getElementById("main");
  $("#main")
    .append(`      <section id="weatherContainer" class="col-sm-12 col-md-9 border">
  <!-- current weather data -->
  <div id="currentWeather" class="border row"></div>

  <!-- forecast weather data -->
    <!-- title -->
   <h2 class="title">5-Day Forecast</h2>
    <div
      id="forecastWeather"
      class="d-flex justify-content-between flex-wrap"
    > 
      <!-- forecast weather card 1 -->
      <!-- <div class="card" style="width: 8rem">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> -->
    </div>
  </div>
</section>`);
  const target = $(event.target);

  if (target.is("a")) {
    console.log("click");
    const search = $(target).attr("data-value");
    renderWeatherData(search);
  }
};
const handleFormSubmit = (event) => {
  // get the city name from input
  event.preventDefault();
  //get text input
  const container = document.getElementById("weatherContainer");
  container.remove();
  const main = document.getElementById("main");
  $("#main")
    .append(`      <section id="weatherContainer" class="col-sm-12 col-md-9 border">
  <!-- current weather data -->
  <div id="currentWeather" class="border row"></div>

  <!-- forecast weather data -->
    <!-- title -->
   <h2>5-Day Forecast</h2>
    <div
      id="forecastWeather"
      class="d-flex justify-content-between flex-wrap"
    > 
      <!-- forecast weather card 1 -->
      <!-- <div class="card" style="width: 8rem">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> -->
    </div>
  </div>
</section>`);
  let search = document.getElementById("input-text").value;
  storeInLS("recentSearches", search);
  if (search) {
    //validate

    // else render weather data
    renderWeatherData(search);
    renderRecentCities();
    // add search to recent searches local storage
    // if city name is empty handle that
  } else {
    alert("enter valid search");
  }
};
// function to store answer in local storage
const storeInLS = (key, value) => {
  //get feedbackResults from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));

  //push answer in to array
  arrayFromLS.push(value);

  //set feedbackResults in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};
const initialiseLocalStorage = () => {
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
  if (!recentSearches) {
    localStorage.setItem("recentSearches", JSON.stringify([]));
  }
};
form.addEventListener("submit", handleFormSubmit);
const onReady = () => {
  // render recent cities
  initialiseLocalStorage();
  renderRecentCities();
};

$(document).ready(onReady);
