var defaultCity = "nashville";
var lat = JSON.parse(localStorage.getItem(defaultCity));
var lon = JSON.parse(localStorage.getItem(defaultCity));
var city;
var cityBtn = document.querySelector(".cityBtn");
var currentCity = localStorage.key([0]);
console.log(currentCity);

if (currentCity === null) {
  document.querySelector(".cityName").textContent = defaultCity;
} else {
  lat = JSON.parse(localStorage.getItem(currentCity)).lat;
  lon = JSON.parse(localStorage.getItem(currentCity)).lon;
  console.log(lat);
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
