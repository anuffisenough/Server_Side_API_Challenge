    
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
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=58a61a91540094cdd0153e73a4505529";

    fetch(geoCodeUrl)
          .then(function (response) {
          return response.json();
      })
          .then(function (data) {
//saves latitude and longitude values
            var latitude = data[0].lat;
            var longitude = data[0].lon;
//Inserts lat and lon values for searched city in weather search API URL

            var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=58a61a91540094cdd0153e73a4505529";
            console.log(forecastUrl);
             fetch(forecastUrl)
                 .then(function (response) {
                 return response.json();
             })
                 .then(function (data) {
                    console.log(data);
//Saves current weather details and icon
            var savedWeatherData = [];
            var currentWeatherData = [];
            var day1WeatherData = [];
            var day2WeatherData = [];
            var day3WeatherData = [];
            var day4WeatherData = [];
            var day5WeatherData = [];
            var currentHumidity = data.list[0].main.humidity;
            var currentTempF = (((((data.list[0].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var currentWind = data.list[0].wind.speed;
            var currentWeatherIcon = data.list[0].weather[0].icon;
            var pElements = $('p');

            currentWeatherData.push(currentHumidity, currentTempF, currentWind, currentWeatherIcon);
            localStorage.setItem(`${cityName}`, currentWeatherData);
            //console.log(currentWeatherData);
            // console.log(cityName);
            // console.log(currentWeatherIcon);
            // console.log(currentTempF + " degrees F");
            // console.log(currentHumidity + "%");
            // console.log(currentWind + "MPH");


            $(pElements[1]).text(`${currentWeatherIcon} ${currentTempF} "degrees F"  ${currentHumidity} "%" ${currentWind} "MPH"`);
                 
             }) 
        });

}
        
function addToSearchList() {
    //     var citySearchArray = [];
    //     var cityName = $("#city-search").val();

    //     citySearchArray.push(cityName);
	// // if there is no search list, create one
	// if (localStorage.getItem("saved search") === null) {
	// 	var citySearchString = JSON.stringify(citySearchArray);
	// 	localStorage.setItem("saved search", citySearchString);
	// };
	// // if there is a search list, or if one is created, parse it here
	// //citySearchArray = JSON.parse(localStorage.getItem("saved search"));
	// // sets maximum length of set-list to 8 songs
	// for (i =0; i < citySearchArray.length; i++) {
	// 	citySearchArray.push(cityName);
	// 	var citySearchString = JSON.stringify(citySearchArray);
	// 	localStorage.setItem("saved search", citySearchString);
	// 	}
};


//Event listener on city search submit button, calls getWeather function, creates button for saved search future reference
 submitBtn.on("click", function() {
    getWeather();
    //addToSearchList();
        //citySearchArray.push(cityName);
       // console.log(citySearchArray);
//function to add new song to locally-stored object


        // citySearchArray.push(cityName);
        // console.log(citySearchArray);
        //localStorage.setItem("saved search", citySeachArray);
        // savedCityButton.text($("#city-search").val());
        // searchListDiv.append(savedCityButton);
        // var currentForecastHeading = $("<h3>").text($("#city-search" + today.format("dd MM YYYY")).val());
        // currentForecastDiv.append(currentForecastHeading);
 });
