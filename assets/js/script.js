var apiKey = "8a0fe5b9b591db8dddd6997be68f3c34";
var cityData = JSON.parse(localStorage.getItem("cityData")) || [];
console.log(cityData);
// localStorage.setItem(defaultCity, JSON.stringify({ lat: 36.1622767, lon: -86.7742984 }));
var currentCity = cityData.length > 0 ? cityData[cityData.length - 1].city : null;
var lat = cityData.length > 0 ? cityData[cityData.length - 1].lat : null;
var lon = cityData.length > 0 ? cityData[cityData.length - 1].lon : null;
var cityInput = document.querySelector(".input");
var cityBtn = document.querySelector(".cityBtn");
var currentTempEl = document.querySelector(".currentTemp");
var currentWindEl = document.querySelector(".currentWind");
var currentHumidEl = document.querySelector(".currentHumid");
var historyBtns = document.querySelector(".historyBtns");

cityData.length === 0 ? (document.querySelector(".cityName").textContent = "Search for a City to view your weather") : currentWeather();

cityBtn.addEventListener("click", getValue);

// testing to display data for clicked history button
historyBtns.addEventListener("click", function (event) {
  var clickedCity = event.target;
  currentCity = clickedCity.textContent;
  var findCity = cityData.findIndex(function (city) {
    console.log(city.city);
    console.log(clickedCity);
    return city.city === clickedCity.textContent;
  });
  console.log(findCity);
  if (findCity !== -1) {
    var selectedCity = cityData[findCity];
    cityData.splice(findCity, 1);
    cityData.push(selectedCity);
    localStorage.setItem("cityData", JSON.stringify(cityData));
  }
});

function getValue(event) {
  event.preventDefault();
  var newCity = cityInput.value.toUpperCase().trim();

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
}

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
  cityInput.value = "";
  historyBtns.textContent = "";
  for (let i = 0; i < cityData.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.classList.add("button", "is-dark", "is-outlined", "is-fullwidth");
    historyBtn.textContent = cityData[i].city;
    historyBtns.appendChild(historyBtn);
  }
}
