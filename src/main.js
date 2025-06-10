import './style.css';
import currWeather from './assets/icons/weather_icons_3/sun.png';
import weather24h1 from './assets/icons/weather_icons_3/cloudy (1).png';
import drop from './assets/icons/weather_icons_3/drop.png';
import { API_KEY } from "./secret.js";

let content24h = '';
let i;
for (i = 0; i < 8; i++) {
    content24h += `
      <div class="weather-24h">
        <div class="weather-time-24h">15:00</div>
        <img class="weather-icon-24h" src="${weather24h1}" alt="24h weather icon"/>
        <div class="weather-temperature-24h t">17°C</div>
        <div class="rain-chance-24h">
          <img class="rain-chance-icon-24h" src="${drop}" alt="24h rain chance icon"/>
          <div class="rain-chance-text-24h">15%</div>
        </div>
      </div>
    `;
}

let contentWeek = '';
for (i = 0; i < 7; i++) {
    contentWeek += `
      <div class="weather-week">
        <div class="weather-day-week">Sun</div>
        <img class="weather-icon-week" src="${weather24h1}" alt="week weather icon"/>
        <div class="temperature-week t">
          <div class="max-temp-week t">25°C</div>
          <div class="min-temp-week t">10°C</div>
        </div>
      </div>
    `;
}



document.querySelector('#app').innerHTML = `
  <div id="main-card">
    
    <div id="main-header-grid">
      <h1 id="main-header">Weather App</h1>
      <input type="text" id="location-search" placeholder="Search for a location..."/>
    </div>
    <div id="data-1-grid">
      <h1 class="large-header">Baia Mare</h1>
      <div id="current-weather">
        <img src="${currWeather}" id="current-weather-icon" alt="weather icon"/>
        <h1 id="current-temperature" class="t">28°C</h1>
      </div>
    </div>
    
    <div class="scrollable-container">
      <div id="data-24h-grid">
        ${content24h}
      </div>
    </div>
    
    
    <div id="data-week-grid">
      ${contentWeek}
    </div>
    
    
    
<!--      <div style="padding: .1rem; margin: 0">-->
      
<!--      </div>-->
      
    
    
  </div>
`;

function convertTemp() {
    const temps = document.getElementsByClassName("t");
    let i;
    for (i = 0; i < temps.length; i++) {
        temps[i].innerHTML = Math.round(Number(temps[i].innerHTML) - 273.15);
        temps[i].innerHTML += "°C";
    }
}

let search = document.getElementById("location-search");
search.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        // let lat, lon;
        const searchInput = search.value;
        const COORD_API_URL =
            "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + API_KEY;
        fetch(COORD_API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("response error");
                }
                return response.json();
            })
            .then(fetchWeatherData)
            .catch(error => {
                console.error("Coords fetch error: ", error);
            })








    }
})

function fetchWeatherData(coordsData) {
    console.log("Coords data received: ", coordsData);
    const lat = coordsData[0]["lat"];
    const lon = coordsData[0]["lon"];
    const API_URL =
        "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("response error");
            }
            return response.json();
        })
        .then(displayWeatherData)
        .catch(error => {
            console.error("Fetch error: ", error);
        })
}

function displayWeatherData(data) {
    console.log("Weather data received: ", data);
    document.getElementById("current-temperature").innerHTML = data["current"]["temp"];
    const hourlyTemps = document.getElementsByClassName("weather-temperature-24h");
    const hours = document.getElementsByClassName("weather-time-24h");
    const hourlyPOPs = document.getElementsByClassName("rain-chance-text-24h");
    let i;
    let dateTime;
    let currHourly;
    for (i = 0; i < hourlyTemps.length; i++) {
        currHourly = data["hourly"][i * 3];
        hourlyTemps[i].innerHTML = currHourly["temp"];
        dateTime = new Date(currHourly["dt"] * 1000);
        hours[i].innerHTML = dateTime.getHours();
        hours[i].innerHTML += ":00";
        hourlyPOPs[i].innerHTML = currHourly["pop"] * 100;
        hourlyPOPs[i].innerHTML += "%"
    }
    convertTemp();
}