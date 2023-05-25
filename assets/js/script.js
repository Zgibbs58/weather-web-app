var apiKey = "8a0fe5b9b591db8dddd6997be68f3c34";
var cityData = JSON.parse(localStorage.getItem("cityData")) || [];
var today = new Date();
var currentCity = cityData.length > 0 ? cityData[cityData.length - 1].city : null;
var lat = cityData.length > 0 ? cityData[cityData.length - 1].lat : null;
var lon = cityData.length > 0 ? cityData[cityData.length - 1].lon : null;
var cityInput = document.querySelector(".input");
var cityBtn = document.querySelector(".cityBtn");
var currentTempEl = document.querySelector(".currentTemp");
var currentWindEl = document.querySelector(".currentWind");
var currentHumidEl = document.querySelector(".currentHumid");
var historyBtns = document.querySelector(".historyBtns");
var weatherIconEl = document.querySelector(".weather-icon");

cityData.length === 0 ? (document.querySelector(".cityName").textContent = "Search for a City to view your weather") : currentWeather();
fiveDayWeather();

cityBtn.addEventListener("click", getValue);

// testing to display data for clicked history button
historyBtns.addEventListener("click", function (event) {
  var clickedCity = event.target;
  currentCity = clickedCity.textContent;
  var findCity = cityData.findIndex(function (city) {
    return city.city === clickedCity.textContent;
  });
  console.log(findCity);
  if (findCity !== -1) {
    var selectedCity = cityData[findCity];
    cityData.splice(findCity, 1);
    cityData.push(selectedCity);
    localStorage.setItem("cityData", JSON.stringify(cityData));
  }
  currentCity = cityData.length > 0 ? cityData[cityData.length - 1].city : null;
  lat = cityData[cityData.length - 1].lat;
  lon = cityData[cityData.length - 1].lon;
  currentWeather();
  fiveDayWeather();
});

function getValue() {
  var newCity = cityInput.value.toUpperCase().trim();

  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${newCity}&limit=1&appid=${apiKey}`;

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
      fiveDayWeather();
    });
}

function currentWeather() {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityName").textContent = currentCity;
      var iconCode = data.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIconEl.setAttribute("src", iconUrl);
      currentTempEl.textContent = Math.round(data.main.temp);
      currentWindEl.textContent = `${Math.round(data.wind.speed)} MPH`;
      currentHumidEl.textContent = `${Math.round(data.main.humidity)}%`;
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

function fiveDayWeather() {
  var fiveDayWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(fiveDayWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherList = data.list;
      var timeWeatherData = weatherList.filter(function (item) {
        var time = item.dt_txt.split(" ")[1];
        return time === "21:00:00";
      });
      var timeWeatherInfo = timeWeatherData.map(function (item) {
        return [item.main.temp, item.wind.speed, item.main.humidity, item.weather[0].icon];
      });
      iter = 1;

      timeWeatherInfo.forEach(function (info) {
        var iconCode = info[3];
        var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.querySelector(`.five-day-icon-${iter}`).setAttribute("src", iconUrl);
        document.querySelector(`.five-day-temp-${iter}`).textContent = Math.round(info[0]);
        document.querySelector(`.five-day-wind-${iter}`).textContent = Math.round(info[1]);
        document.querySelector(`.five-day-humid-${iter}`).textContent = Math.round(info[2]);
        iter++;
      });
    });
}
