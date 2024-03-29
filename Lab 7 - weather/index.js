let cities;
// fetch json file with API key
var secretConfig, API_KEY;
document.addEventListener("DOMContentLoaded", async () => {
  secretConfig = await fetch("CLIENT_SECRET.json").then((response) =>
    response.json()
  );
  API_KEY = secretConfig.OPENWEATHER_API_KEY;
  cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (cities) {
    console.log("here");
    cities.forEach((city) => {
      getWeatherData(city, (weatherData) => {
        updateWeatherView(city, weatherData);
      });
    });
  }
});

function getWeatherData(city, callback) {
  if (API_KEY === undefined) {
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((weatherData) => {
      callback(weatherData);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateWeatherView(city, weatherData) {
  const weatherContainer = document.createElement("div");
  weatherContainer.className = "card";
  weatherContainer.id = `${city}-container`;

  const weatherImage = document.createElement("img");
  weatherImage.className = "card-img-top";
  weatherImage.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  weatherImage.alt = weatherData.weather[0].main;

  const weatherCardBody = document.createElement("div");
  weatherCardBody.className = "card-body";

  const cityName = document.createElement("h5");
  cityName.className = "card-title";
  cityName.textContent = city;

  const temperature = document.createElement("p");
  temperature.className = "card-text";
  temperature.innerHTML = `Temperature: ${Math.round(
    weatherData.main.temp
  )}&deg;C`;

  const humidity = document.createElement("p");
  humidity.className = "card-text";
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  weatherCardBody.appendChild(cityName);
  weatherCardBody.appendChild(temperature);
  weatherCardBody.appendChild(humidity);
  weatherContainer.appendChild(weatherImage);
  weatherContainer.appendChild(weatherCardBody);
  document.getElementById("cities-container").appendChild(weatherContainer);
}

function addCity(city) {
  getWeatherData(city, (weatherData) => {
    updateWeatherView(city, weatherData);
  });

  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

function saveCity(city) {
  // Check if city is already saved
  const cityIndex = cities.findIndex(
    (c) => c.toLowerCase() === city.toLowerCase()
  );
  if (cityIndex === -1) {
    cities.push(city);
  }

  //   Remove duplicates
  cities = [...new Set(cities)];
  // Save unique cities to localStorage
  localStorage.setItem("cities", JSON.stringify([...cities]));

  //   clear cities container
  document.getElementById("cities-container").innerHTML = "";
  // Update weather data for saved cities
  cities.forEach((c) => {
    if (c.toLowerCase() !== city.toLowerCase()) {
      getWeatherData(c, (weatherData) => {
        updateWeatherView(c, weatherData);
      });
    }
  });

  // Get weather data for current city and display
  getWeatherData(city, (weatherData) => {
    updateWeatherView(city, weatherData);
  });
}

function removeCity(city) {
  const container = document.getElementById(`${city}-container`);
  if (container === undefined) return;
  container.parentNode.removeChild(container);

  const index = cities.indexOf(city);
  cities.splice(index, 1);
  localStorage.setItem("cities", JSON.stringify(cities));
}

document.getElementById("add-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  saveCity(city);
  document.getElementById("city-input").value = "";

  if (cities.length >= 10) {
    document.getElementById("add-button").disabled = true;
  }
});
