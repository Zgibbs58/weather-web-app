var lat = 36.1622767;
var lon = -86.7742984;
var city;
var cityBtn = document.querySelector(".cityBtn");
var currentCity = "";
var defaultCity = "Nashville";
console.log(currentCity);

if (currentCity === "") {
  document.querySelector(".cityName").textContent = defaultCity;
} else {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a0fe5b9b591db8dddd6997be68f3c34`;

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".cityName").textContent = currentCity;
    });
}

cityBtn.addEventListener("click", function getValue() {
  var city = document.querySelector(".input").value;
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8a0fe5b9b591db8dddd6997be68f3c34`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      localStorage.setItem(city, JSON.stringify({ lat, lon }));
      currentCity = city;
      document.querySelector(".cityName").textContent = currentCity;
    });
});
