document.addEventListener("DOMContentLoaded", function(){

    getPosition().catch(handleReject)
    .then(getWeather).catch(handleReject)
    .then(processResponse).catch(handleReject)
    .then(showWeather).catch(handleReject)
    .then(addCFSwitch);
});




//Function for getting users coordinates and creating url for fetch()
function getPosition(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(
            function(position){
            var location = position.coords.latitude.toFixed(2) + "," + position.coords.longitude.toFixed(2);
            var key = "e984c7d121044a32a18221132170402"
            var url = "https://api.apixu.com/v1/current.json?key=" + key + "&q=" + "gwanabanakumkwat";
            resolve(url);
            },
            function() {
            reject("Cannot get geolocation data");
            });
    });
}

function getWeather(url){
    return fetch(url)
        .then(function(data){
                return Promise.resolve(data);
            },
            function(){
                return Promise.reject("Cannot connect to the weather service");
            });
}

//Function for processing fetch()'s response
function processResponse(response){
    if (response && response.ok ){
        return response.json()
    }else {
        return Promise.reject("The weather service does not respond correctly");
    }
}


function showWeather(weatherData){

    return new Promise(function(resolve, reject){

        //Check if actually got weather data
        if (!weatherData.current){
             reject("Invalid response from a weather service")
        }

        //Some variables for DOM elements
        var locationField = document.querySelector('.location');
        var tempField = {
            value: document.querySelector('.temp-value'),
            unit: document.querySelector('.temp-unit')
        };
        var pressField = document.querySelector('.pressure');
        var skyField = document.querySelector('.sky');
        var windField = document.querySelector('.wind')


        //Insert pressure value and location name into DOM
        pressField.innerHTML = weatherData.current.pressure_mb + " hPa";
        locationField.innerHTML = weatherData.location.name + ", " + weatherData.location.country;

        //Add icon dependent on sky conditions
        (function addWindIcon(str){

        
            var icons = {
                "Sunny": "<i class='wi wi-day-sunny'></i>",
                "Clear": "<i class='wi wi-night-clear'></i>",
                "Partly cloudy": "<i class='wi wi-cloud'></i>",
                "Cloudy": "<i class='wi wi-cloudy'></i>",
                "Overcast": "<i class='wi wi-cloudy'></i>",
                "Mist": "<i class='wi wi-sprinkle'></i>",
                "Patchy rain nearby": "<i class='wi wi-sprinkle'></i>",
                "Patchy snow nearby": "<i class='wi wi-snow'></i>",
                "Patchy sleet nearby": "<i class='wi wi-sleet'></i>",
                "Patchy freezing drizzle nearby": "<i class='wi wi-rain-mix'></i>",
                "Thundery outbreaks in nearby": "<i class='wi wi-thuderstorm'></i>",
                "Blowing snow": "<i class='wi wi-snow-wind'></i>",
                "Blizzard": "<i class='wi wi-snow-wind'></i>",
                "Fog": "<i class='wi wi-fog'></i>",
                "Freezing fog": "<i class='wi wi-fog'></i>",
                "Patchy light drizzle": "<i class='wi wi-rain-mix'></i>",
                "Light drizzle": "<i class='wi wi-rain-mix'></i>",
                "Freezing drizzle": "<i class='wi wi-rain-mix'></i>",
                "Heavy freezing drizzle": "<i class='wi wi-rain-mix'></i>",
                "Patchy light rain": "<i class='wi wi-rain-mix'></i>",
                "Light rain": "<i class='wi wi-sprinkle'></i>",
                "Moderate rain at times": "<i class='wi wi-rain'></i>",
                "Moderate rain": "<i class='wi wi-rain'></i>",
                "Heavy rain at times": "<i class='wi wi-rain'></i>",
                "Heavy rain": "<i class='wi wi-rain'></i>",
                "Light freezing rain": "<i class='wi wi-sleet'></i>",
                "Moderate or heavy freezing rain": "<i class='wi wi-sleet'></i>",
                "Light sleet": "<i class='wi wi-sleet'></i>",
                "Moderate or heavy sleet": "<i class='wi wi-sleet'></i>",
                "Patchy light snow": "<i class='wi wi-snow'></i>",
                "Light snow": "<i class='wi wi-snow'></i>",
                "Patchy moderate snow": "<i class='wi wi-snow'></i>",
                "Moderate snow": "<i class='wi wi-snow'></i>",
                "Patchy heavy snow": "<i class='wi wi-snow'></i>",
                "Heavy snow": "<i class='wi wi-snow'></i>",
                "Ice pellets": "<i class='wi wi-hail'></i>",
                "Light rain shower": "<i class='wi wi-showers'></i>",
                "Moderate or heavy rain shower": "<i class='wi wi-showers'></i>",
                "Torrential rain shower": "<i class='wi wi-showers'></i>",
                "Light sleet showers": "<i class='wi wi-sleet'></i>",
                "Moderate or heavy sleet showers": "<i class='wi wi-sleet'></i>",
                "Light snow showers": "<i class='wi wi-snow'></i>",
                "Moderate or heavy snow showers": "<i class='wi wi-snow'></i>",
                "Light showers of ice pellets": "<i class='wi wi-hail'></i>",
                "Moderate or heavy showers of ice pellets": "<i class='wi wi-hail'></i>",
                "Patchy light rain in area with thunder": "<i class='wi wi-storm-showers'></i>",
                "Moderate or heavy rain in area with thunder": "<i class='wi wi-storm-showers'></i>",
                "Patchy light snow in area with thunder": "<i class='wi wi-storm-showers'></i>",
                "Moderate or heavy snow in area with thunder": "<i class='wi wi-storm-showers'></i>",
                "default": "<i class='wi wi-na'></i>"
            };

            skyField.innerHTML = icons[str] || icons["default"];
        }(weatherData.current.condition.text));

        //Add wind description
        (function windDesc(speed){
            if (speed < 30) {
                windField.innerHTML = "Moderate wind"
            } else if (speed < 51) {
                windField.innerHTML = "Strong wind"
            } else if (speed < 75) {
                windField.innerHTML = "Very strong wind"
            } else {
                windField.innerHTML = "Windy as fuck!"
            }
        }(weatherData.current.wind_kph));

        //Insert temp
        (function insertTemp(country){
            var countriesUsingF = ["United States of America", "Cayman Islands", "Bahamas", "Belize"];
            if (countriesUsingF.includes(country)){
                tempField.value.innerHTML = weatherData.current.temp_f.toFixed(0);
                tempField.unit.innerHTML = "<sup>&nbspo</sup>F";
            }else {
                tempField.value.innerHTML = weatherData.current.temp_c.toFixed(0);
                tempField.unit.innerHTML = "<sup>&nbspo</sup>C";
            }

        }(weatherData.location.country))

    resolve(weatherData);
    });
}

//Add switching between F and C functionality
function addCFSwitch(weatherData){
    
   var tempField = {
       value: document.querySelector(".temp-value"),
       unit: document.querySelector(".temp-unit")
   }

   tempField.unit.addEventListener('click', function(){
        if (tempField.unit.innerHTML == "<sup>&nbsp;o</sup>C"){
            tempField.unit.innerHTML = "<sup>&nbsp;o</sup>F";
            tempField.value.innerHTML = weatherData.current.temp_f.toFixed(0);
        }else if (tempField.unit.innerHTML == "<sup>&nbsp;o</sup>F"){
            tempField.unit.innerHTML = "<sup>&nbsp;o</sup>C";
            tempField.value.innerHTML = weatherData.current.temp_c.toFixed(0);
        }
   });
}

//Functions for handling promises' rejections
function handleReject(msg){
    var field = document.querySelector(".location");
    field.innerHTML = msg;
    return Promise.reject(msg);
    
}

