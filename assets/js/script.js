var lat;
var lon;
function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=nashville&limit=1&appid=8a0fe5b9b591db8dddd6997be68f3c34";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
    });
}

getApi();
