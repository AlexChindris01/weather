import './style.css';
import currWeather from './assets/icons/weather_icons_3/sun.png';
import weather24h1 from './assets/icons/weather_icons_3/cloudy (1).png';
import drop from './assets/icons/weather_icons_3/drop.png';
import { wIcons } from "./iconsMap.js";
// import locations from "./assets/locations.json";
import "flag-icons/css/flag-icons.min.css";
import FlexSearch from "flexsearch";
// import {promises as fs} from 'fs';
// import fs from 'fs';
// const fs = require('fs');

let locationsOriginal;
let locations;
// let index;
// fetch('/locations.json')
//     .then(res => res.json())
//     .then(data => {
//         locationsOriginal = data;
//         console.log('json loaded');
//         // console.log(locations[0]);
//         locations = locationsOriginal.map(item => ({
//             ...item,
//             search: `${item['city']} ${item['city_ascii']} ${item['country']} ${item['iso2']} ${item['iso3']} ${item['admin_name']}
//                 ${item['admin_name'].normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`
//         }));
//         index = new FlexSearch.Document({
//             document: {
//                 id: 'id',
//                 store: ['country', 'city_ascii', 'iso2', 'admin_name', 'lat', 'lng'],
//                 index: [{
//                     field: 'search',
//                     tokenize: 'forward'
//                 }]
//             }
//         });
//         // let indexingChecker = [];
//         locations.forEach(item => index.add(item));
//         console.log("starting search");
//         const indexTest =
//             index
//                 .search('Baia', {index: 'search', enrich: true});
//                 // .flatMap(r => r.result);
//         console.log("index test result: ");
//         console.log(indexTest);
//
//
//
//
//     })
//     .catch(err => {
//         console.error('error loading json', err);
//     })


const index = new FlexSearch.Document({
    document: {
        id: 'id',
        store: ['country', 'city_ascii', 'iso2', 'admin_name', 'lat', 'lng'],
        index: [{
            field: 'search',
            tokenize: 'forward'
        }]
    }
});

// const files = await fs.readdir("./assets/export/");
// for(let i = 0; i < files.length; i++){
//   const data = await fs.readFile("./assets/export/" + files[i], "utf8");
//   await index.import(files[i], data);
// }
fetch('/1.doc')
    .then(res => res.text())
    .then(async text => {
        await index.import('1.doc', text);
    })
fetch('/1.reg')
    .then(res => res.text())
    .then(async text => {
        await index.import('1.reg', text);
    })
for (let i = 1; i <= 6; i++) {
    fetch('search.' + i + '.map')
        .then(res => res.text())
        .then(async text => {
            await index.import('search.' + i + '.map', text);
        })
}

// let workerAvailable = (typeof(Worker) !== 'undefined');
// if (workerAvailable) {
//     console.log("Worker available");
//     var searchWorker = new Worker(new URL('./searchWorker.js', import.meta.url), { type: 'module' });
// }
const WPATH = "";//"/icons/weather";
//console.log(locationsJSON);
//const locations = JSON.parse(locationsJSON);
const weekdaysInLetters = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let content24h = '';
let contentSuggestions = '';
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
contentWeek += `
    <span></span>`;
for (i = 0; i < 7; i++) {
    contentWeek += `
      <div class="weather-week">
        <div class="weather-day-week">Sun</div>
        <img class="weather-icon-week" src="${weather24h1}" alt="week weather icon"/>
        <div class="temperature-week">
          <div class="max-temp-week t">25°C</div>
          <div class="min-temp-week t">10°C</div>
        </div>
      </div>
    `;

}
contentWeek += `
    <span></span>`;


document.querySelector('#app').innerHTML = `
  <div class="main-card">
    
    <div id="main-header-grid">
      <h1 id="main-header">Weather App</h1>
      <div id="search-and-suggestions">
        <input type="text" id="location-search" placeholder="Search for a location..." autocomplete="off"/>
        <div id="suggestions-dropdown">
          ${contentSuggestions}
        </div>
      </div>
    </div>
    <div id="data-1-grid">
      <h1 class="large-header">Baia Mare</h1>
      <div id="current-weather">
        <img src="${currWeather}" id="current-weather-icon" alt="weather icon"/>
        <h1 id="current-temperature" class="t">28°C</h1>
      </div>
    </div>
    <div id="border-container-24h">
        <div id="scrollable-container-24h">
          <div id="data-24h-grid">
            ${content24h}
          </div>
        </div>
    </div>
    
    <div id="border-container-week">
      <div id="scrollable-container-week">
        <div id="data-week-grid">
          ${contentWeek}
        </div>
      </div>
    </div>
    
    <div id="extra-1-wrapper">
      <table id='extra-1'>
          <tr>
            <td id="uvi-data-cell">
              UV index: <br>moderate <span class="uvi-dot moderate"></span>
            </td>
            <td id="humidity-data-cell">
              Humidity: 20%
            </td>
            <td id="wind-data-cell">
              <div id="wind-data-text">
                Wind: 10 km/h<br>Gusts: 40 km/h
              </div>
              
            </td>
            <td id="sunrise-sunset-data-cell">
              <div id="sunrise">06:00</div>
              <div id="sunset">20:00</div>
            </td>
          </tr>
        </table>
    </div>
    
    
    
    
<!--      <div style="padding: .1rem; margin: 0">-->
      
<!--      </div>-->
      
    
    
  </div>
  <a href="/attributions.html" class="link-1">Attributions</a>
`;

let isLMBPressed = false;

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) { // 0 = Left Mouse Button
    isLMBPressed = true;
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    isLMBPressed = false;
  }
});

function simpleFetchWeatherData(location) {
    console.log("fetching");

    const API_URL =
        `https://byscjkn5vvg3zlwrgzhdaa65j40njgws.lambda-url.eu-north-1.on.aws/?lat=${location['lat']}&lon=${location['lng']}`;
        // "https://api.openweathermap.org/data/3.0/onecall?lat=" + location['lat'] + "&lon=" + location['lng'] + "&appid=" + API_KEY;
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("response error");
            }
                document.querySelector("#data-1-grid > .large-header").innerHTML =
                    location['city_ascii'] + ', ' + location['admin_name'] + ', ' + location['iso2'];
            return response.json();
        })
        .then(displayWeatherData)
        .catch(error => {
            console.error("Fetch error: ", error);
        })
}

function inputLocationMatch(searchWords, loc) {
    let strippedAdminName = loc['admin_name'].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const tester =
        [loc["city"], loc["city_ascii"], loc["country"], loc["iso2"], loc["iso3"], loc["admin_name"], strippedAdminName].join(",");
    let word;
    if (searchWords.join().length === 0) {
        return false;
    }
    for (word of searchWords) {
        let strippedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!(tester.includes(word) || tester.includes(strippedWord))) {
            return false;
        }
    }
    return true;
}
function convertTemp() {
    const temps = document.getElementsByClassName("t");
    let i;
    for (i = 0; i < temps.length; i++) {
        temps[i].innerHTML = Math.round(Number(temps[i].innerHTML) - 273.15);
        temps[i].innerHTML += "°C";

    }
}



let search = document.getElementById("location-search");
// let searchAndSuggestions = document.getElementById('search-and-suggestions');
let suggestionsDropdown = document.getElementById('suggestions-dropdown');
search.addEventListener('focus', () => {
    // search.classList.remove('blurring');
    suggestionsDropdown.style.display = 'block';
});
search.addEventListener('blur', () => {
    search.classList.add('blurring');
    if (!isLMBPressed) {
        search.classList.remove('blurring');
    }
    document.body.addEventListener('mouseup', () => {
        if (document.activeElement !== search) {

            setTimeout(() => {
                search.classList.remove('blurring');
                suggestionsDropdown.style.display = 'none';
            }, 10);
        }

    }, { once: true });
});

let lastSearchValue = '';
search.addEventListener("keyup", (e) => {

    console.log('keyup occurred');
    let lastChar = search.value.length > 0 ? search.value[search.value.length - 1] : '';
    // if (/*/^[\w]$/.test(e.key) || */e.code === "Backspace" || (e.key.length === 1 && /\p{L}/u.test(e.key))) {
    if (lastChar === '') {
        document.getElementById('suggestions-dropdown').innerHTML = '';
        search.classList.remove('writing');
        search.classList.remove('has-suggestions');
    }
    let searchValueChanged = lastSearchValue !== search.value;
    lastSearchValue = search.value;
    if (/\p{L}/u.test(lastChar) && lastChar !== '' && searchValueChanged) {
        console.log('passed big if');
        document.getElementById('suggestions-dropdown').innerHTML = '';
        // let searchWords = search.value.split(/[^\w]+/);
        let searchWords = search.value.split(/[^\p{L}]+/u);
        search.classList.toggle('writing', search.value !== '');
        for (let i = 0; i < searchWords.length; i++) {
            if (/^[a-z]$/.test(searchWords[i][0])) {
                searchWords[i] = searchWords[i][0].toUpperCase() + searchWords[i].slice(1);
                console.log("yes");
            }
        }
        console.log("searchWords: ");
        console.log(searchWords);
        // if (workerAvailable) {
        //     searchWorker.postMessage(searchWords);
        //     searchWorker.onmessage = (workerEvent) => {
        //         let workerSuggestions = workerEvent.data;
        //         for (let workerSuggestion of workerSuggestions) {
        //             const myDiv = document.createElement('div');
        //             myDiv.className = 'search-suggestion';
        //             myDiv.dataset.locationData = JSON.stringify(workerSuggestion);
        //             myDiv.innerHTML = `
        //               <span class="fi fi-${workerSuggestion['iso2'].toLowerCase()}"></span>
        //               ${workerSuggestion['city_ascii']}, ${workerSuggestion['admin_name']}
        //             `;
        //             myDiv.onclick = () => simpleFetchWeatherData(workerSuggestion);
        //
        //             document.getElementById('suggestions-dropdown').appendChild(myDiv);
        //             search.classList.toggle('has-suggestions', workerSuggestions.length > 0);
        //             suggestionsDropdown.firstChild.classList.add('selected');
        //             console.log(workerSuggestions);
        //         }
        //     }
        // }
        // else {
        let suggestions = [];
        let loc;
        // console.log(locations[0]);
        console.log("search results: ");
        let indexSearchRaw =
            index.search(searchWords.join(' '), {index: 'search', enrich: true});
        console.log(indexSearchRaw);
        let indexSearch;
        if (indexSearchRaw.length !== 0) {
            indexSearch = indexSearchRaw[0].result.slice(0, 5);
        }
        else {
            indexSearch = indexSearchRaw;
        }

        indexSearch.forEach(item => suggestions.push(item.doc));
        console.log("suggestions: ");
        console.log(suggestions);

        // for (loc of locations) {
        //     console.log('now searching');
        //     if (inputLocationMatch(searchWords, loc)) {
        //         suggestions.push(loc);
        //     }
        //     if (suggestions.length === 5) {
        //         break;
        //     }
        // }
        for (let suggestion of suggestions) {

            const myDiv = document.createElement('div');
            myDiv.className = 'search-suggestion';
            myDiv.dataset.locationData = JSON.stringify(suggestion);
            myDiv.innerHTML = `
            <span class="fi fi-${suggestion['iso2'].toLowerCase()}"></span>
            ${suggestion['city_ascii']}, ${suggestion['admin_name']}
            `;
            myDiv.onclick = () => simpleFetchWeatherData(suggestion);

            document.getElementById('suggestions-dropdown').appendChild(myDiv);
        }
        search.classList.toggle('has-suggestions', suggestions.length > 0);
        suggestionsDropdown.firstChild.classList.add('selected');
        console.log(suggestions);
        // }

    }
    else if (e.key === "Enter") {
        if (document.getElementById('suggestions-dropdown').innerHTML !== '') {
            let data = JSON.parse(document.getElementsByClassName('selected')[0].dataset.locationData);
            document.getElementById('location-search').blur();
            document.getElementById('suggestions-dropdown').style.display = 'none';
            simpleFetchWeatherData(data);
        }
        else {
            // let lat, lon;
            let searchInput =
                search.value
                    .split(/[^\w\s]+/)
                    .join(",");
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

    }
})

search.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
        let oldSelected = document.getElementsByClassName('selected')[0];
        oldSelected.classList.remove('selected');
        if (oldSelected !== suggestionsDropdown.lastChild) {
            oldSelected.nextElementSibling.classList.add('selected');
        }
        else {
            suggestionsDropdown.firstChild.classList.add('selected');
        }
    }
    else if (e.code === 'ArrowUp') {
        let oldSelected = document.getElementsByClassName('selected')[0];
        oldSelected.classList.remove('selected');
        if (oldSelected !== suggestionsDropdown.firstChild) {
            oldSelected.previousElementSibling.classList.add('selected');
        }
        else {
            suggestionsDropdown.lastChild.classList.add('selected');
        }
    }
    else {
        console.log('keydown occurred');
    }
})

function fetchWeatherData(coordsData) {
    console.log("Coords data received: ", coordsData);
    document.querySelector("#data-1-grid > .large-header").innerHTML =
        coordsData[0]["name"] + ", " + (coordsData[0]["state"] ? coordsData[0]["state"] + ", " : "") + coordsData[0]["country"];
    const lat = coordsData[0]["lat"];
    const lon = coordsData[0]["lon"];
    const API_URL =
        "https://byscjkn5vvg3zlwrgzhdaa65j40njgws.lambda-url.eu-north-1.on.aws/?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
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
    let dayNight = (data["current"]["dt"] > data["current"]["sunrise"] && data["current"]["dt"] < data["current"]["sunset"]) ?
        0 : 1;
    document.getElementById("current-weather-icon").src =
        WPATH + wIcons.get(data["current"]["weather"][0]["id"])[dayNight] + ".png";
    console.log(WPATH + wIcons.get(data["current"]["weather"][0]["id"])[dayNight] + ".png");
    const hourlyTemps = document.getElementsByClassName("weather-temperature-24h");
    const hours = document.getElementsByClassName("weather-time-24h");
    const hourlyPOPs = document.getElementsByClassName("rain-chance-text-24h");
    const hourlyIcons = document.getElementsByClassName("weather-icon-24h");
    let i;
    let dateTime;
    let currHourly;
    let sunriseHour = new Date((data["current"]["sunrise"] + data["timezone_offset"]) * 1000).getUTCHours();
    let sunsetHour = new Date((data["current"]["sunset"] + data["timezone_offset"]) * 1000).getUTCHours();
    let currHour;
    for (i = 0; i < hourlyTemps.length; i++) {
        currHourly = data["hourly"][i * 3 + 1];
        hourlyTemps[i].innerHTML = currHourly["temp"];
        dateTime = new Date((currHourly["dt"] + data["timezone_offset"]) * 1000);
        currHour = dateTime.getUTCHours();
        hours[i].innerHTML = dateTime.getUTCHours();
        hours[i].innerHTML += ":00";
        hourlyPOPs[i].innerHTML = Math.round(currHourly["pop"] * 100);
        hourlyPOPs[i].innerHTML += "%";
        dayNight = (currHour > sunriseHour && currHour <= sunsetHour) ?
        0 : 1;

        hourlyIcons[i].src = wIcons.get(currHourly["weather"][0]["id"])[dayNight] + ".png";
    }
    const dailyMaxes = document.getElementsByClassName("max-temp-week");
    const dailyMins = document.getElementsByClassName("min-temp-week");
    const days = document.getElementsByClassName("weather-day-week");
    const dailyIcons = document.getElementsByClassName("weather-icon-week");
    let currDaily;
    for (i = 0; i < dailyMaxes.length; i++) {
        currDaily = data["daily"][i];
        dailyMaxes[i].innerHTML = currDaily["temp"]["max"];
        dailyMins[i].innerHTML = currDaily["temp"]["min"];
        dateTime = new Date((currDaily["dt"] + data["timezone_offset"]) * 1000);
        days[i].innerHTML = weekdaysInLetters[dateTime.getUTCDay()];
        dailyIcons[i].src = wIcons.get(currDaily["weather"][0]["id"])[0] + ".png";
    }
    let uviRisk;
    const uvi = Math.round(data['current']['uvi']);
    if (uvi < 3) uviRisk = 'low';
    else if (uvi < 6) uviRisk = 'moderate';
    else if (uvi < 8) uviRisk = 'high';
    else if (uvi < 11) uviRisk = 'very high';
    else uviRisk = 'extreme';
    const uvi_risk_css_class = uviRisk.split(' ').join('-');
    const uviData = document.getElementById('uvi-data-cell');
    uviData.innerHTML = `UV index: <br>${uviRisk} <span class="uvi-dot ${uvi_risk_css_class}"></span>`;
    document.getElementById('humidity-data-cell').innerHTML = `Humidity: ${data['current']['humidity']}%`;
    document.getElementById('wind-data-text').innerHTML = `Wind: ${Math.round(data['current']['wind_speed'] * 3.6)} km/h`;
    if ('wind_gust' in data['current']) {
        document.getElementById('wind-data-text').innerHTML +=
            `<br>Gusts: ${Math.round(data['current']['wind_gust'] * 3.6)} km/h`;
    }
    dateTime = new Date((data['daily'][0]['sunrise'] + data["timezone_offset"]) * 1000);
    let minutesExtraZero = dateTime.getUTCMinutes() < 10 ? '0' : '';
    document.getElementById('sunrise').innerHTML = dateTime.getUTCHours() + ':' +
        minutesExtraZero + dateTime.getUTCMinutes();
    dateTime = new Date((data['daily'][0]['sunset'] + data["timezone_offset"]) * 1000);
    minutesExtraZero = dateTime.getUTCMinutes() < 10 ? '0' : '';
    document.getElementById('sunset').innerHTML = dateTime.getUTCHours() + ':' +
        minutesExtraZero + dateTime.getUTCMinutes();
    convertTemp();
}