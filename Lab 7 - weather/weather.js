const apiKey = "cd4b0f45f648424e98801106e3984571";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;

document.addEventListener("DOMContentLoaded", async () => {
    // use local storage to get last weather or if 5 minutes have passed, get new weather
    
});

const refreshWeather = async (locationName, lat, lon) => {
    const queryParams = { lat, lon, locationName}
    let url = BASE_URL;

    if(queryParams.locationName && !queryParams.lat && !queryParams.lon) {
        url += "&q=" + queryParams.locationName;
    } else if(queryParams.lat && queryParams.lon) {
        url += "&lat=" + queryParams.lat + "&lon=" + queryParams.lon;
    } else {
        url += "&q=Warsaw";
        console.error("Using default location");
    }
    return await fetch(url)
        .then(response => response.json())
        .then(data => data)
        .finally(data => {
            // if we got weather, save it to local storage
            localStorage.setItem("lastWeather", JSON.stringify(data));
            localStorage.setItem("lastWeatherTime", new Date().getTime());
        });
    }

const getWeather = async (locationName, lat, lon) => {
    const lastWeather = localStorage.getItem("lastWeather");
    const lastWeatherTime = localStorage.getItem("lastWeatherTime");
    const currentTime = new Date().getTime();
    if(lastWeather && lastWeatherTime && currentTime - lastWeatherTime < 300000) {
        console.log("Using last weather");
        return lastWeather;
    } else {
        console.log("Getting new weather");
        return await refreshWeather(locationName, lat, lon);
    }
}
