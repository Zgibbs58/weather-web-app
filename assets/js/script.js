var lat;
var lon;
var cityBtn = document.querySelector(".cityBtn");

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
    });
});
