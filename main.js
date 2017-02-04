//Function for getting users coordinates
function getPosition() {
    if (!navigator.geolocation) {
        var location = document.getElementsByClassName("location")
        location.innerHTML = "Your browser does not support geolocation";
    }

    //function for succesfully loading geolocation data
    function geoSuccess(position) {
        var lat = position.coords.latitude + "";
        var lon = position.coords.longitude + "";
        console.log("Coords: " + lat + lon);

        return lat + "," + lon
    }

    //function for errors while loading geoloaction data
    function geoError() {
        console.log("Something went wrong...")
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

//Function for getting weather data and inserting it into DOM
function getWeather() {

    //Prepare URL for fetch()
    var coords = getPosition();
    var key = "e984c7d121044a32a18221132170402";
    var url = 'http://api.apixu.com/v1/current.json?key=' + key + '&q=' + coords;

    var weatherData = fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        //Variable for weather data
        var weather = {
            city: data.location.name,
            country: data.location.country,
            tempC: data.current.temp_C,
            tempF: data.current.temp_F,
            sky: data.current.condition.code,
            wind: data.current.wind_kph,
            pressure: data.current.pressure.mb
        } 
        console.log("Weather: " + weather);
        return weather

    })
    return weatherData;
}