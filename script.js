    
var submitBtn = $("#submit");
var searchListDiv = $("#search-div");
var savedCityButton = $('<button>');
var cityName = $("#city-search").val();
var today = dayjs();
var currentForecastDiv = $("#todays-forecast");

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
//Saves current weather details and icon
             var currentHumidity = data.list[0].main.humidity;
             var currentTempF = ((((data.list[0].main.temp)-273.15)*9)/5)+ 32;
             var currentWind = data.list[0].wind.speed;
             var currentWeatherIcon = data.list[0].weather[0].icon;

            console.log(currentWeatherIcon);
            console.log(currentTempF + " degrees F");
            console.log(currentHumidity + "%");
            console.log(currentWind + "MPH");
                 
             }) 
        });

}


//Event listener on city search submit button, calls getWeather function, creates button for saved search future reference
 submitBtn.on("click", function() {
        getWeather();
        savedCityButton.text($("#city-search").val());
        searchListDiv.append(savedCityButton);
       // var currentForecastHeading = $("<h3>").text($("#city-search" + today.format("dd MM YYYY")).val());
       // currentForecastDiv.append(currentForecastHeading);
 });
