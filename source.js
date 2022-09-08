console.log("Linked!");

let locationObj = {
    long: 0,
    lat: 0,
};

const locationButton = document.querySelector('#get-location');

locationButton.addEventListener('click', (e) => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(accessLocation);
        
    } else {
        console.log('Location not supported :(');
    }
});

function accessLocation(locationPosition){
    locationObj.lat = locationPosition.coords.latitude;
    locationObj.long = locationPosition.coords.longitude;
    console.log(locationObj);
    sunsetAPI();
}

const sunsetAPI = async () => {
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${locationObj.lat}&lng=${locationObj.long}&formatted=0`);

    const geoData = await response.json();
    //return geoData;

    //RESULT IS IN UTC WITHOUT DAYLIGHT SAVINGS
    console.log(geoData);

    //This will convert date fetched from API into current timezone, and formatted
    const sunsetDate = new Date(geoData.results.sunset);
    console.log("FETCHED DATE: " + sunsetDate);
    console.log("SUNSET TIME LOCAL: " + sunsetDate.toLocaleTimeString());

    const sunriseDate = new Date(geoData.results.sunrise);
    console.log("SUNRISE TIME LOCAL: " + sunriseDate.toLocaleTimeString());
    
}
