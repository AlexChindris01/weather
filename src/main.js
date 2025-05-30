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
        <div class="weather-temperature-24h">17°C</div>
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
        <div class="temperature-week">
          <div class="max-temp-week">25°C</div>
          <div class="min-temp-week">10°C</div>
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
        <h1 id="current-temperature">28°C</h1>
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

let search = document.getElementById("location-search");
search.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        let lat, lon;
        const searchInput = search.value.split(" ");
        lat = searchInput[0];
        lon = searchInput[1];
        const API_URL =
            "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("response error");
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received: ", data);
            })
            .catch(error => {
                console.error("Fetch error: ", error);
            })
    }
})