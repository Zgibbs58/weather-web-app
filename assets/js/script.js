var defaultCity = "nashville";
var lat;
var lon;
var cityBtn = document.querySelector(".cityBtn");
var currentCity = localStorage.key([localStorage.length - 1]);
var currentTempEl = document.querySelector(".currentTemp");
var currentWindEl = document.querySelector(".currentWind");
var currentHumidEl = document.querySelector(".currentHumid");
localStorage.setItem(
  defaultCity,
  JSON.stringify({ lat: 36.1622767, lon: -86.7742984 })
);

if (localStorage.length === 0) {
  document.querySelector(".cityName").textContent = defaultCity;
  lat = JSON.parse(localStorage.getItem(defaultCity)).lat;
  lon = JSON.parse(localStorage.getItem(defaultCity)).lon;
} else {
  currentCity = localStorage.key([localStorage.length - 1]);
  lat = JSON.parse(localStorage.getItem(currentCity)).lat;
  lon = JSON.parse(localStorage.getItem(currentCity)).lon;
  console.log(lat);
  currentWeather();
}

cityBtn.addEventListener("click", function getValue(event) {
  event.preventDefault();
  var currentCity = document.querySelector(".input").value;
  localStorage.removeItem(currentCity);

  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=1&appid=8a0fe5b9b591db8dddd6997be68f3c34`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      localStorage.setItem(currentCity, JSON.stringify({ lat, lon }));
      document.querySelector(".cityName").textContent =
        currentCity.toUpperCase();
      currentWeather();
    });
});

function currentWeather() {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a0fe5b9b591db8dddd6997be68f3c34&units=imperial`;

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityName").textContent =
        currentCity.toUpperCase();
      currentTempEl.textContent = data.main.temp;
      console.log(currentTempEl);
      console.log(currentCity);
    });
}
