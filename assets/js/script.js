var apiKey = "8a0fe5b9b591db8dddd6997be68f3c34";
var cityData = JSON.parse(localStorage.getItem("cityData")) || [];
console.log(cityData);
// localStorage.setItem(defaultCity, JSON.stringify({ lat: 36.1622767, lon: -86.7742984 }));
var currentCity = cityData.length > 0 ? cityData[cityData.length - 1].city : null;
var lat = cityData[cityData.length - 1].lat;
var lon = cityData[cityData.length - 1].lon;
var cityBtn = document.querySelector(".cityBtn");
var currentTempEl = document.querySelector(".currentTemp");
var currentWindEl = document.querySelector(".currentWind");
var currentHumidEl = document.querySelector(".currentHumid");

if (cityData.length === 0) {
  document.querySelector(".cityName").textContent = "Search for a City to view your weather";
} else {
  //   lat = JSON.parse(localStorage.getItem(currentCity)).lat;
  //   lon = JSON.parse(localStorage.getItem(currentCity)).lon;
  //   console.log(currentCity);
  currentWeather();
}

cityBtn.addEventListener("click", function getValue(event) {
  event.preventDefault();
  var newCity = document.querySelector(".input").value.toUpperCase().trim();

  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      var newData = {
        city: newCity,
        lat: lat,
        lon: lon,
      };
      cityData.push(newData);

      localStorage.setItem("cityData", JSON.stringify(cityData));
      console.log(data[0].state);
      document.querySelector(".cityName").textContent = newCity;
      currentCity = newCity;
      currentWeather();
    });
});

function currentWeather() {
  console.log(cityData);
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityName").textContent = currentCity;
      currentTempEl.textContent = data.main.temp;
      currentWindEl.textContent = data.wind.speed + " MPH";
      currentHumidEl.textContent = data.main.humidity + " %";
      console.log(currentTempEl);
      console.log(currentCity);
    });
}
