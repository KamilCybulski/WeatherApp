function getPosition(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(
            function(position){
            var location = position.coords.latitude.toFixed(2) + "," + position.coords.longitude.toFixed(2);
            location ? resolve(location) : reject("Cannot get geolocation data");
        });
    });
}

function getWeather(coordinates){
    return new Promise(function(resolve, reject){

        //Some variables to create url
        var key = "e984c7d121044a32a18221132170402";
        var latLon = coordinates;
        var url = "http://api.apixu.com/v1/current.json?key=" + key + "&q=" + latLon;

        var weatherData = fetch(url)
                            .then(function(data){
                                return data.json();
                            });
        
        weatherData ? resolve(weatherData) : reject("Cannot get weather data");
    });
}

function showWeather(weatherData){

    //Some variables for DOM elements
}




document.addEventListener("DOMContentLoaded", function(){

    var t = getPosition();
    t.then(getWeather)
    .then(function(data){
        console.log(data);
    });
});