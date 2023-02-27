    
var submitBtn = $("#submit");
// var searchListDiv = $("#search-div");
// var savedCityButton = $('<button>');
// var cityName = $("#city-search").val();
// var today = dayjs();
// var currentForecastDiv = $("#todays-forecast");
 var searchedCities = [];
 var cityName = "";

 //function to add new button for each searched city
//  function addSavedButton() {
    // let cityName = $("#city-search").val();
    // var searchedCityButton = $('<button>').text(cityName);
    // $('#search-div').append(searchedCityButton);
// };

// function renderSavedCitiesButtons() {
//     if (localStorage.getItem("searched cities") !== null) {
//         searchedCities.push(JSON.stringify(localStorage.getItem("searched cities")));
//         console.log(searchedCities);
// }

// renderSavedCitiesButtons();
//Function uses OpenWeatherAPI to get weather data

 function getWeather() {
//Saves searched city name and inserts into geocoding API URL for lat and lon values first
    let cityName = $("#city-search").val();
    var geoCodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=58a61a91540094cdd0153e73a4505529";

    fetch(geoCodeUrl)
          .then(function (response) {
          return response.json();
      })
          .then(function (geoCodedata) {
            //console.log(geoCodedata);
//saves latitude and longitude values
            var latitude = geoCodedata[0].lat;
            var longitude = geoCodedata[0].lon;
           // var searchedCities = [];
            var foundCity = geoCodedata[0].name
//stores the city name locally (stores the Open Weather return for city, not the user entered value)
            searchedCities.push(foundCity);
            localStorage.setItem("searched cities", searchedCities);

//Inserts lat and lon values for searched city in weather search API URL
            var currentForecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=58a61a91540094cdd0153e73a4505529";

            fetch(currentForecastUrl)
                 .then(function (response) {
                 return response.json();
             })
                 .then(function (currentData) {
                   
            var currentWeatherData = [];
            //var currentCity = ;
            var currentHumidity = currentData.main.humidity;
            var currentTempF = (((((currentData.main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var currentWind = ((currentData.wind.speed)*2.237).toFixed(2);
            var currentWeatherIcon = currentData.weather[0].icon;

            //currentWeatherData.push(searchedCity, dayjs().format("(M/DD/YYYY)"), currentHumidity, currentTempF, currentWind, currentWeatherIcon);
            //console.log(currentWeatherData);
            $('#city-name').text(foundCity);
            $('#current-date').text(dayjs().format("(M/DD/YYYY)"));
            $('#current-icon').text(currentWeatherIcon);
            $('#current-temp').text(`Temp: ${currentTempF} F`);
            $('#current-wind').text(`Wind: ${currentWind} MPH`);
            $('#current-humidity').text(`Humidity: ${currentHumidity}%`);

            // console.log(foundCity);

            let cityName = $('#city-name');
                  //console.log(cityName);

            var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=58a61a91540094cdd0153e73a4505529";
            //console.log(fiveDayForecastUrl);
             fetch(fiveDayForecastUrl)
                 .then(function (response) {
                 return response.json();
             })
                 .then(function (fiveDayData) {
                   console.log(fiveDayData);
//Saves current weather details and icon
            // var savedWeatherData = [];
             
            // var day1WeatherData = [];
            // var day2WeatherData = [];
            // var day3WeatherData = [];
            // var day4WeatherData = [];
            // var day5WeatherData = [];

            //date, icon, temp, wind, humidity
            var day1Date =(dayjs().add(1, 'day').format("M/DD/YYYY"));
            var day1Icon = fiveDayData.list[3].weather[0].icon;
            var day1Temp = (((((fiveDayData.list[3].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var day1Wind = ((fiveDayData.list[3].wind.speed)*2.237).toFixed(2);
            var day1Humidity = fiveDayData.list[3].main.humidity;
            var day2Date = (dayjs().add(2, 'day').format("M/DD/YYYY"));
            var day2Icon = fiveDayData.list[11].weather[0].icon;
            var day2Temp = (((((fiveDayData.list[11].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var day2Wind = ((fiveDayData.list[11].wind.speed)*2.237).toFixed(2);
            var day2Humidity = fiveDayData.list[11].main.humidity;
            var day3Date = (dayjs().add(3, 'day').format("M/DD/YYYY"));
            var day3Icon = fiveDayData.list[19].weather[0].icon;
            var day3Temp = (((((fiveDayData.list[19].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var day3Wind = ((fiveDayData.list[19].wind.speed)*2.237).toFixed(2);
            var day3Humidity = fiveDayData.list[19].main.humidity;
            var day4Date = (dayjs().add(4, 'day').format("M/DD/YYYY"));
            var day4Icon = fiveDayData.list[27].weather[0].icon;
            var day4Temp = (((((fiveDayData.list[27].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var day4Wind = ((fiveDayData.list[27].wind.speed)*2.237).toFixed(2);
            var day4Humidity = fiveDayData.list[27].main.humidity;
            var day5Date = (dayjs().add(5, 'day').format("M/DD/YYYY"));
            var day5Icon = fiveDayData.list[35].weather[0].icon;
            var day5Temp = (((((fiveDayData.list[35].main.temp)-273.15)*9)/5)+ 32).toFixed(2);
            var day5Wind = ((fiveDayData.list[35].wind.speed)*2.237).toFixed(2);
            var day5Humidity = fiveDayData.list[35].main.humidity;
            // day1WeatherData.push(day1Date, day1Icon, day1Temp, day1Wind, day1Humidity);

            $('#day-one-date').text(`${day1Date}`);
            $('#day-one-icon').text(`${day1Icon}`);
            $('#day-one-temp').text(`Temp: ${day1Temp}`);
            $('#day-one-wind').text(`Wind: ${day1Wind} MPH`);
            $('#day-one-humidity').text(`Humidity: ${day1Humidity}%`);
    
            $('#day-two-date').text(`${day2Date}`);
            $('#day-two-icon').text(`${day2Icon}`);
            $('#day-two-temp').text(`Temp: ${day2Temp}`);
            $('#day-two-wind').text(`Wind: ${day2Wind} MPH`);
            $('#day-two-humidity').text(`Humidity: ${day2Humidity}%`);

            $('#day-three-date').text(`${day3Date}`);
            $('#day-three-icon').text(`${day3Icon}`);
            $('#day-three-temp').text(`Temp: ${day3Temp}`);
            $('#day-three-wind').text(`Wind: ${day3Wind} MPH`);
            $('#day-three-humidity').text(`Humidity: ${day3Humidity}%`);

            $('#day-four-date').text(`${day4Date}`);
            $('#day-four-icon').text(`${day4Icon}`);
            $('#day-four-temp').text(`Temp: ${day4Temp}`);
            $('#day-four-wind').text(`Wind: ${day4Wind} MPH`);
            $('#day-four-humidity').text(`Humidity: ${day4Humidity}%`);

            $('#day-five-date').text(`${day5Date}`);
            $('#day-five-icon').text(`${day5Icon}`);
            $('#day-five-temp').text(`Temp: ${day5Temp}`);
            $('#day-five-wind').text(`Wind: ${day5Wind} MPH`);
            $('#day-five-humidity').text(`Humidity: ${day5Humidity}%`);

            // $("#city-search").text("");

            // console.log(day1Date);
            // console.log(day1Icon);
            // console.log(day1Temp);
            // console.log(day1Wind);
            // console.log(day1Humidity);


             
                 //   console.log(data.main.name);
             

            //  console.log(currentHumidity);
            //  console.log(currentTempF);
            //  console.log(currentWind);
            //  console.log(currentWeatherIcon);
            // var pElements = $('p');

            // currentWeatherData.push(currentHumidity, currentTempF, currentWind, currentWeatherIcon);
            // localStorage.setItem(`${cityName}`, currentWeatherData);
            // console.log(currentWeatherData);
            // console.log(cityName);
            // console.log(currentWeatherIcon);
            // console.log(currentTempF + " degrees F");
            // console.log(currentHumidity + "%");
            // console.log(currentWind + "MPH");


            // $(pElements[1]).text(`${currentWeatherIcon} ${currentTempF} "degrees F"  ${currentHumidity} "%" ${currentWind} "MPH"`);
            var searchedCityButton = $('<button>').text(foundCity);
            searchedCityButton.on("click", function() {
                
            })

            $('#search-div').append(searchedCityButton);
                 
             }) 
        });

})
        
// function createSavedButton() {
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
    // addSavedButton();
    getWeather();
    // getFiveDayForecast();
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

// renderSavedCitiesButtons();
 })

