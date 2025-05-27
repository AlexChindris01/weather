import './style.css';
import currWeather from './assets/icons/weather_icons_3/cloudy.png';

document.querySelector('#app').innerHTML = `
  <div id="main-card">
    
    <div id="main-header-grid">
      <h1 id="main-header">Weather App</h1>
      <input type="text" id="location-search" placeholder="Search for a location...">
    </div>
    <div id="data-1-grid">
      <h1 class="large-header">Baia Mare</h1>
      <div id="current-weather">
        <img src="${currWeather}" id="current-weather-icon" alt="weather icon">
        <h1 id="current-temperature">28°C</h1>
      </div>
      
    </div>
    
<!--      <div style="padding: .1rem; margin: 0">-->
      
<!--      </div>-->
      
    
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </div>
`;

