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
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${locationObj.lat}&lng=${locationObj.long}`);

    const myJson = await response.json();
    //RESULT IS IN UTC WITHOUT DAYLIGHT SAVINGS
    console.log(myJson);
}
