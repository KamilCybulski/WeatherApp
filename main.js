//Function for getting users coordinates
function getPosition() {
    if (!navigator.geolocation) {
        var location = document.getElementsByClassName("location")
        location.innerHTML = "Your browser does not support geolocation";
    }

    //function for succesfully loading geolocation data
    function geoSuccess(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        console.log("Latitude: " + lat + ", Longitude: " + lon);
    }

    //function for errors while loading geoloaction data
    function geoError() {
        console.log("Something went wrong...")
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

window.addEventListener('DOMContentLoaded', getPosition)