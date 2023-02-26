    
var submitBtn = $("#submit");
// var searchListDiv = $("#search-div");
// var savedCityButton = $('<button>');
// var cityName = $("#city-search").val();
// var today = dayjs();
// var currentForecastDiv = $("#todays-forecast");
 var searchedCities = [];
 var cityName = "";

 //function to add new button for each searched city
 function addSavedButton() {
    let cityName = $("#city-search").val();
    var searchedCityButton = $('<button>').val(cityName);
    $('#search-div').unshift(searchedCityButton);    
};

function renderSavedCitiesButtons() {
    if (localStorage.getItem("searched cities") !== null) {
        searchedCities.push(JSON.stringify(localStorage.getItem("searched cities")));
        console.log(searchedCities);
}

renderSavedCitiesButtons();
//Function uses OpenWeatherAPI to get weather data

 function getCurrentWeather() {
//Saves searched city name and inserts into geocoding API URL for lat and lon values first
    let cityName = $("#city-search").val();
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=58a61a91540094cdd0153e73a4505529";

    fetch(geoCodeUrl)
          .then(function (response) {
          return response.json();
      })
          .then(function (geoCodedata) {
            console.log(geoCodedata);
//saves latitude and longitude values
            var latitude = geoCodedata[0].lat;
            var longitude = geoCodedata[0].lon;
           // var searchedCities = [];
            var searchedCity = geoCodedata[0].name
//stores the city name locally (stores the Open Weather return for city, not the user entered value)
            searchedCities.push(searchedCity);
            localStorage.setItem("searched cities", searchedCities);

//Inserts lat and lon values for searched city in weather search API URL
            var currentForecastUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=58a61a91540094cdd0153e73a4505529";

            fetch(currentForecastUrl)
                 .then(function (response) {
                 return response.json();
             })
                 .then(function (data) {
                   
            var currentWeatherData = [];
            //var currentCity = ;
            var currentHumidity = data.main.humidity;
            var currentTempF = (((((data.main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var currentWind = ((data.wind.speed)*2.237).toFixed(2);
            var currentWeatherIcon = data.weather[0].icon;

            //currentWeatherData.push(searchedCity, dayjs().format("(M/DD/YYYY)"), currentHumidity, currentTempF, currentWind, currentWeatherIcon);
            //console.log(currentWeatherData);
            $('#city-name').text(searchedCity);
            $('#current-date').text(dayjs().format("(M/DD/YYYY)"));
            $('#current-icon').text(currentWeatherIcon);
            $('#current-temp').text(`Temp: ${currentTempF} F`);
            $('#current-wind').text(`Wind: ${currentWind} MPH`);
            $('#current-humidity').text(`Humidity: ${currentHumidity}%`);



            //var currentCity = $('#city-name');
                  // console.log(cityName);

//             var fiveDayForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=58a61a91540094cdd0153e73a4505529";
//             //console.log(fiveDayForecastUrl);
//              fetch(fiveDayForecastUrl)
//                  .then(function (response) {
//                  return response.json();
//              })
//                  .then(function (data) {
//                    console.log(data);
// //Saves current weather details and icon
             //var savedWeatherData = [];
             
//             var day1WeatherData = [];
//             var day2WeatherData = [];
//             var day3WeatherData = [];
//             var day4WeatherData = [];
//             var day5WeatherData = [];
             
                    //console.log(data.main.name);
             

            //  console.log(currentHumidity);
            //  console.log(currentTempF);
            //  console.log(currentWind);
            //  console.log(currentWeatherIcon);
//             var pElements = $('p');

            //currentWeatherData.push(currentHumidity, currentTempF, currentWind, currentWeatherIcon);
            // localStorage.setItem(`${cityName}`, currentWeatherData);
            //console.log(currentWeatherData);
            // console.log(cityName);
            // console.log(currentWeatherIcon);
            // console.log(currentTempF + " degrees F");
            // console.log(currentHumidity + "%");
            // console.log(currentWind + "MPH");


            // $(pElements[1]).text(`${currentWeatherIcon} ${currentTempF} "degrees F"  ${currentHumidity} "%" ${currentWind} "MPH"`);
                 
             }) 
        });

}
        
function createSavedButton() {
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
    addSavedButton();
    getCurrentWeather();
    getFiveDayForecast();
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

renderSavedCitiesButtons();
 })
};

