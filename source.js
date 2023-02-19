// console.log("Linked!");

// const locationFactory = function(){
//     return {
//         long: 0,
//         lat: 0
//     }
// }

// const locationHandler = (() => {
//     let locationObj = locationFactory();
//     const locationButton = document.querySelector('#get-location');

//     locationButton.addEventListener('click', updateLocation);

//     function updateLocation(){
//         if(navigator.geolocation){
//             navigator.geolocation.getCurrentPosition(accessLocation, accessFailure);

//         } else {
//             console.log('Location not supported :(');
//         }
//     }

//     function accessLocation(locationPosition){
//         locationObj.lat = locationPosition.coords.latitude;
//         locationObj.long = locationPosition.coords.longitude;
//         console.log(locationObj);
//         callAPI();
//     }

//     function accessFailure() {
//         console.log('Could not access browser location! :(');
//     }

//     const callAPI = async () => {
//         const todaysDate = new Date().toLocaleDateString();
//         const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${locationObj.lat}&lng=${locationObj.long}&formatted=0&date=${todaysDate}`);
//         const geoData = await response.json();

//         //RESULT IS IN UTC WITHOUT DAYLIGHT SAVINGS
//         console.log(geoData);

//         //This will convert date fetched from API into current timezone, and formatted
//         const sunsetDate = new Date(geoData.results.sunset);
//         console.log("FETCHED DATE: " + sunsetDate);
//         console.log("SUNSET TIME LOCAL: " + sunsetDate.toLocaleTimeString());

//         const sunriseDate = new Date(geoData.results.sunrise);
//         console.log("SUNRISE TIME LOCAL: " + sunriseDate.toLocaleTimeString());
//     };

//     return {
//         updateLocation
//     }
// })();

// NEW CODE

console.log("Linked.");

class goldenHour {
    constructor() {
        const getLocationButton = document.getElementById("get-location");
        getLocationButton.addEventListener(
            "click",
            this.getLocation.bind(this)
        );
        this.lat = 0;
        this.long = 0;
        this.set = 0;
        this.rise = 0;
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.accessLocation.bind(this), // ** TypeError: Failed to execute 'getCurrentPosition' on 'Geolocation': parameter 1 is not of type 'Function'
                this.accessFailure.bind(this)
            );
        } else {
            console.log("Location not supported :(");
        }
    }

    accessLocation(locationPosition) {
        this.lat = locationPosition.coords.latitude;
        this.long = locationPosition.coords.longitude;
        this.callAPI();
    }

    accessFailure() {
        console.log("Could not access browser location! :(");
    }

    async callAPI() {
        const todaysDate = new Date().toLocaleDateString();
        const response = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.long}&formatted=0&date=${todaysDate}`
        );
        const geoData = await response.json();

        //RESULT IS IN UTC WITHOUT DAYLIGHT SAVINGS
        console.log(geoData);

        //This will convert date fetched from API into current timezone, and formatted
        const sunsetDate = new Date(geoData.results.sunset);
        console.log("FETCHED DATE: " + sunsetDate);
        console.log("SUNSET TIME LOCAL: " + sunsetDate.toLocaleTimeString());
        this.set = sunsetDate.toLocaleTimeString();

        const sunriseDate = new Date(geoData.results.sunrise);
        console.log("SUNRISE TIME LOCAL: " + sunriseDate.toLocaleTimeString());
        this.rise = sunriseDate.toLocaleTimeString();

        this.updateTexts();
    }

    updateTexts() {
        const sunsetInfo = document.createElement("div");
        sunsetInfo.innerHTML = `Sunset: ${this.set}`;
        document.querySelector("body").appendChild(sunsetInfo);

        const sunriseInfo = document.createElement("div");
        sunriseInfo.innerHTML = `Sunrise: ${this.rise}`;
        document.querySelector("body").appendChild(sunriseInfo);
    }
}

const app = new goldenHour();
