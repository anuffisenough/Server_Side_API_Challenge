    
var submitBtn = $("#submit");

//Function uses OpenWeatherAPI to get weather data

 function getWeather() {
//Saves searched city name and inserts into geocoding API URL for lat and lon values first
    var cityName = $("#city-search").val();
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=b2ab37233d2801840074355b6147390f";

    fetch(geoCodeUrl)
          .then(function (response) {
          return response.json();
      })
          .then(function (data) {
//saves latitude and longitude values
            var latitude = data[0].lat;
            var longitude = data[0].lon;
//Inserts lat and lon values for searched city in weather search API URL

            var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=b2ab37233d2801840074355b6147390f";
            console.log(forecastUrl);
             fetch(forecastUrl)
                 .then(function (response) {
                 return response.json();
             })
                 .then(function (data) {
                    console.log(data);
                 
             }) 
        });

}


//Event listener on city search submit button, calls getWeather function
 submitBtn.on("click", function() {
        getWeather();
 });
