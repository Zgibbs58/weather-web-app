var apiKey = "8a0fe5b9b591db8dddd6997be68f3c34";
var defaultCity = "NASHVILLE";
localStorage.setItem(defaultCity, JSON.stringify({ lat: 36.1622767, lon: -86.7742984 }));
var lat;
var lon;
var cityBtn = document.querySelector(".cityBtn");
var currentCity = localStorage.key([localStorage.length - 1]);
var currentTempEl = document.querySelector(".currentTemp");
var currentWindEl = document.querySelector(".currentWind");
var currentHumidEl = document.querySelector(".currentHumid");

if (localStorage.length === 0) {
  document.querySelector(".cityName").textContent = defaultCity;
  lat = JSON.parse(localStorage.getItem(defaultCity)).lat;
  lon = JSON.parse(localStorage.getItem(defaultCity)).lon;
} else {
  lat = JSON.parse(localStorage.getItem(currentCity)).lat;
  lon = JSON.parse(localStorage.getItem(currentCity)).lon;
  console.log(currentCity);
  currentWeather();
}

cityBtn.addEventListener("click", function getValue(event) {
  event.preventDefault();
  var newCity = document.querySelector(".input").value.toUpperCase().trim();
  localStorage.removeItem(newCity);

  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem(newCity.toUpperCase(), JSON.stringify({ lat, lon }));
      console.log(data[0].state);
      lat = data[0].lat;
      lon = data[0].lon;
      document.querySelector(".cityName").textContent = newCity;
      currentCity = newCity;
      currentWeather();
    });
});

function currentWeather() {
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityName").textContent = currentCity;
      currentTempEl.textContent = data.main.temp;
      console.log(currentTempEl);
      console.log(currentCity);
    });
}
