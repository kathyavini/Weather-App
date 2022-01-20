/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "getWeatherSimple": () => (/* binding */ getWeatherSimple),
/* harmony export */   "getLocationFromInput": () => (/* binding */ getLocationFromInput),
/* harmony export */   "getAddressFromCoords": () => (/* binding */ getAddressFromCoords),
/* harmony export */   "getAddressFromId": () => (/* binding */ getAddressFromId)
/* harmony export */ });
async function getWeather(latitude, longitude) {
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=8f12dfab0de38099e0b5a7a2ddc45e37`,
      { mode: 'cors' },
    );
    const weatherData = await weather.json();

    // console.log({ weatherData });

    const mainWeather = weatherData.current.weather[0].main;
    const weatherDescription = weatherData.current.weather[0].description;
    const weatherIcon = weatherData.current.weather[0].icon;
    const currentTemp = weatherData.current.temp;
    const feelsLike = weatherData.current.feels_like;
    const time = weatherData.timezone;

    return {
      mainWeather,
      weatherDescription,
      weatherIcon,
      currentTemp,
      feelsLike,
      time,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getWeatherSimple(city) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f12dfab0de38099e0b5a7a2ddc45e37`,
    { mode: 'cors' },
  );
  const weatherData = await weather.json();
  // console.log({ weatherData });
  const mainWeather = weatherData.weather[0].main;
  const weatherDescription = weatherData.weather[0].description;
  const weatherIcon = weatherData.weather[0].icon;
  const currentTemp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const latitude = weatherData.coord.lat;
  const longitude = weatherData.coord.lon;
  const cityName = weatherData.name;
  const countryCode = weatherData.sys.country;
  const time = weatherData.timezone;
  return [
    latitude,
    longitude,
    mainWeather,
    weatherDescription,
    weatherIcon,
    currentTemp,
    feelsLike,
    cityName,
    countryCode,
    time,
  ];
}

// Lat, lon, and OpenStreetMap ID
async function getLocationFromInput(inputString) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${inputString}&format=json&limit=1`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    if (!addressData[0]) {
      return 'City not found';
    }

    // Not a city/town/state - I've only seen this data format from entering US zip codes
    if (!addressData[0].osm_type) {
      return 'Please search by place name';
    }

    const latitude = addressData[0].lat;
    const longitude = addressData[0].lon;
    const id = addressData[0].osm_type[0].toUpperCase() + addressData[0].osm_id;

    return [latitude, longitude, id];
  } catch (err) {
    console.log({ err });
    return err;
  }
}

// Convert geolocation coordinates to address
// Needed for use with user prompt geolocationAPI only
async function getAddressFromCoords(latitude, longitude) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    const placeType = Object.keys(addressData.address)[0];

    let city = '';

    if (addressData.address.city) {
      city = addressData.address.city;
    } else if (addressData.address.village) {
      city = addressData.address.village;
    } else if (addressData.address.town) {
      city = addressData.address.town;
    } else if (addressData.address.county) {
      city = addressData.address.county;
    } else {
      // This might return something weird like your street
      city = addressData.address[placeType];
    }

    const { state } = addressData.address;
    const { country } = addressData.address;
    const countryCode = addressData.address.country_code.toUpperCase();

    return {
      city, state, country, countryCode,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Convert geolocation coordinates to address
async function getAddressFromId(id) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=${id}&format=json`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    const placeType = Object.keys(addressData[0].address)[0];
    const city = addressData[0].address[placeType];

    const { state } = addressData[0].address;
    const { country } = addressData[0].address;
    const countryCode = addressData[0].address.country_code.toUpperCase();

    return {
      city, state, country, countryCode,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createNewElement)
/* harmony export */ });
function createNewElement(
  type,
  classes = null,
  text = null,
  attributes = null,
) {
  const createdElement = document.createElement(type);

  if (classes) {
    createdElement.classList.add(...classes);
  }

  if (text) {
    createdElement.textContent = text;
  }

  if (attributes) {
    for (const key in attributes) {
      createdElement.setAttribute(key, attributes[key]);
    }
  }

  return createdElement;
}


/***/ }),

/***/ "./src/weatherIcons.js":
/*!*****************************!*\
  !*** ./src/weatherIcons.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fullMapDay": () => (/* binding */ fullMapDay),
/* harmony export */   "fullMapNight": () => (/* binding */ fullMapNight)
/* harmony export */ });
const weatherIcons = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'overcast',
  '04n': 'overcast',
  '09d': 'overcast-rain',
  '09n': 'overcast-rain',
  '10d': 'partly-cloudy-day-rain',
  '10n': 'partly-cloudy-night-rain',
  '11d': 'thunderstorms',
  '11n': 'thunderstorms',
  '13d': 'partly-cloudy-day-snow',
  '13n': 'partly-cloudy-day-snow',
  '50d': 'fog-day',
  '50n': 'fog-night',
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherIcons);

const fullMapDay = {
  200: 'thunderstorms-day-rain',
  201: 'thunderstorms-day-rain',
  202: 'thunderstorms-day-overcast-rain',
  210: 'thunderstorms-day',
  211: 'thunderstorms',
  212: 'thunderstorms-overcast',
  221: 'thunderstorms-overcast',
  230: 'thunderstorms-day-rain',
  231: 'thunderstorms-day-rain',
  232: 'thunderstorms-day-rain',
  300: 'partly-cloudy-day-drizzle',
  301: 'partly-cloudy-day-drizzle',
  302: 'overcast-day-drizzle',
  310: 'overcast-day-drizzle',
  311: 'drizzle',
  312: 'overcast-drizzle',
  313: 'overcast-drizzle',
  314: 'overcast-rain',
  321: 'overcast-rain',
  500: 'partly-cloudy-day-rain',
  501: 'partly-cloudy-day-rain',
  502: 'overcast-day-rain',
  503: 'overcast-day-rain',
  504: 'overcast-rain',
  511: 'sleet',
  520: 'partly-cloudy-day-rain',
  521: 'partly-cloudy-day-rain',
  522: 'overcast-day-rain',
  531: 'overcast-day-rain',
  600: 'partly-cloudy-day-snow',
  601: 'partly-cloudy-day-snow',
  602: 'overcast-day-snow',
  611: 'partly-cloudy-day-sleet',
  612: 'partly-cloudy-day-sleet',
  613: 'overcast-day-sleet',
  615: 'partly-cloudy-day-sleet',
  616: 'partly-cloudy-day-sleet',
  620: 'partly-cloudy-day-snow',
  621: 'partly-cloudy-day-snow',
  622: 'overcast-snow',
  701: 'mist',
  711: 'partly-cloudy-day-smoke',
  721: 'haze-day',
  731: 'dust-day',
  741: 'fog-day',
  751: 'dust-day',
  761: 'dust-day',
  762: 'overcast-smoke',
  771: 'wind',
  781: 'tornado',
  800: 'clear-day',
  801: 'partly-cloudy-day',
  802: 'partly-cloudy-day',
  803: 'overcast-day',
  804: 'overcast-day',
};

const fullMapNight = {
  200: 'thunderstorms-night-rain',
  201: 'thunderstorms-night-rain',
  202: 'thunderstorms-night-overcast-rain',
  210: 'thunderstorms-night',
  211: 'thunderstorms',
  212: 'thunderstorms-overcast',
  221: 'thunderstorms-overcast',
  230: 'thunderstorms-night-rain',
  231: 'thunderstorms-night-rain',
  232: 'thunderstorms-night-rain',
  300: 'partly-cloudy-night-drizzle',
  301: 'partly-cloudy-night-drizzle',
  302: 'overcast-night-drizzle',
  310: 'overcast-night-drizzle',
  311: 'drizzle',
  312: 'overcast-drizzle',
  313: 'overcast-drizzle',
  314: 'overcast-rain',
  321: 'overcast-rain',
  500: 'partly-cloudy-night-rain',
  501: 'partly-cloudy-night-rain',
  502: 'overcast-night-rain',
  503: 'overcast-night-rain',
  504: 'overcast-rain',
  511: 'sleet',
  520: 'partly-cloudy-night-rain',
  521: 'partly-cloudy-night-rain',
  522: 'overcast-night-rain',
  531: 'overcast-night-rain',
  600: 'partly-cloudy-night-snow',
  601: 'partly-cloudy-night-snow',
  602: 'overcast-night-snow',
  611: 'partly-cloudy-night-sleet',
  612: 'partly-cloudy-night-sleet',
  613: 'overcast-night-sleet',
  615: 'partly-cloudy-night-sleet',
  616: 'partly-cloudy-night-sleet',
  620: 'partly-cloudy-night-snow',
  621: 'partly-cloudy-night-snow',
  622: 'overcast-snow',
  701: 'mist',
  711: 'partly-cloudy-night-smoke',
  721: 'haze-night',
  731: 'dust-night',
  741: 'fog-night',
  751: 'dust-night',
  761: 'dust-night',
  762: 'overcast-smoke',
  771: 'wind',
  781: 'tornado',
  800: 'clear-night',
  801: 'partly-cloudy-night',
  802: 'partly-cloudy-night',
  803: 'overcast-night',
  804: 'overcast-night',
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _weatherIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherIcons */ "./src/weatherIcons.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/api.js");






// Set up singleton object to hold data
let location = {
  latitude: '',
  longitude: '',
  mainWeather: 'Weather Unavailable',
  weatherDescription: '',
  weatherIcon: '',
  currentTemp: '',
  feelsLike: '',
  city: '',
  state: '',
  countryCode: '',
  country: '',
  id: '', // for OpenStreetMap
};

// Set up page
const body = document.querySelector('body');
const container = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['container']);
body.appendChild(container);

// Search bar - search, loading animation, warning
const form = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('form');
const input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('input', null, null, {
  type: 'search',
  placeholder: 'Search City',
});

// Loading in progress animation progress
const loadingBar = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['loading']);
const loadingBarAnimation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['loading-bar']);
loadingBar.appendChild(loadingBarAnimation);

// Warning to display search errors
const formWarning = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['warning']);

form.append(input, loadingBar, formWarning);
container.appendChild(form);

// Search input event handling
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();

  loadingBar.classList.add('active');

  const coords = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getLocationFromInput)(input.value);

  if (coords === 'City not found' || coords === 'Please search by place name') {
    loadingBar.classList.remove('active');
    formWarning.textContent = coords;
    formWarning.classList.add('on');
    formWarning.addEventListener('transitionend', () => {
      formWarning.classList.remove('on');
    });
    return;
  }

  [location.latitude, location.longitude, location.id] = coords;

  const addressPromise = (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAddressFromId)(location.id);
  const weatherPromise = (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeather)(location.latitude, location.longitude);

  const [addressInfo, weatherInfo] = await Promise.all([
    addressPromise,
    weatherPromise,
  ]);

  location = { ...location, ...addressInfo, ...weatherInfo };

  loadingBar.classList.remove('active');
  input.value = '';

  populateWeatherCard();
});

// Set up information card
let temperatureMode = 'Celsius';

const infoCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['infoCard']);
const currentDateTime = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['currentTime']);

infoCard.appendChild(currentDateTime);

const infoWrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['infoWrapper']);
container.appendChild(infoWrapper);

const cityHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('h1', ['city'], 'Loading Weather...');
const countryHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('h2', ['country']);

const tempLine = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['tempBox']);
const temperatureMain = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['tempMain']);
const degreeNotation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['degree']);
const feelsLike = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['feelsLike']);

tempLine.appendChild(temperatureMain);
tempLine.appendChild(degreeNotation);

infoCard.append(cityHeading, countryHeading, tempLine, feelsLike);

// Degree mode (F/C) toggle
tempLine.addEventListener('click', () => {
  if (temperatureMode === 'Celsius') {
    temperatureMode = 'Fahrenheit';
  } else {
    temperatureMode = 'Celsius';
  }
  printTemps(temperatureMode);
});

infoWrapper.appendChild(infoCard);

const iconCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['iconCard']);
const icon = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('object', ['icon'], null, {
  type: 'image/svg+xml',
  data: './svg/windsock.svg',
});
const iconLabel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['icon-label']);

iconCard.append(icon, iconLabel);
infoWrapper.appendChild(iconCard);

function populateWeatherCard() {
  const now = new Date();
  const locationDate = now.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: `${location.time}`,
  });
  const locationTime = now.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: `${location.time}`,
  });

  const locationDateTime = `${locationDate}, ${locationTime}`;
  currentDateTime.textContent = locationDateTime;

  cityHeading.textContent = location.city;

  if (location.state) {
    countryHeading.textContent = `${location.state}, ${location.country}`;
  } else {
    countryHeading.textContent = location.country;
  }

  printTemps(temperatureMode);

  const iconURL = matchWeatherToIcon();
  icon.setAttribute('data', iconURL);
  iconLabel.textContent = location.weatherDescription;
}

function matchWeatherToIcon() {
  return `./svg/${_weatherIcons__WEBPACK_IMPORTED_MODULE_2__["default"][location.weatherIcon]}.svg`;
}

function convertCelsius(Kelvin) {
  return Kelvin - 273.15;
}

function convertFahrenheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}

function printTemps() {
  if (temperatureMode === 'Celsius') {
    temperatureMain.textContent = Math.round(
      convertCelsius(location.currentTemp),
    );
    degreeNotation.textContent = '°C';
    feelsLike.textContent = `Feels like ${Math.round(
      convertCelsius(location.feelsLike),
    )}°`;
  } else {
    temperatureMain.textContent = Math.round(
      convertFahrenheit(location.currentTemp),
    );
    degreeNotation.textContent = '°F';
    feelsLike.textContent = `Feels like ${Math.round(
      convertFahrenheit(location.feelsLike),
    )}°`;
  }
}

// Query user for location on page load
(async function () {
  navigator.geolocation.getCurrentPosition(async (position) => {
    useUserLocation(position);
  }, useDefaultLocation);
}());

async function useUserLocation(position) {
  location.latitude = position.coords.latitude;
  location.longitude = position.coords.longitude;

  const addressPromise = (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAddressFromCoords)(
    location.latitude,
    location.longitude,
  );
  const weatherPromise = (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeather)(location.latitude, location.longitude);

  const [addressInfo, weatherInfo] = await Promise.all([
    addressPromise,
    weatherPromise,
  ]);

  location = { ...location, ...addressInfo, ...weatherInfo };

  populateWeatherCard();
}

async function useDefaultLocation() {
  // Set defaults to Vancouver
  location.latitude = '49.283';
  location.longitude = '-123.121';
  location.city = 'Vancouver';
  location.state = 'British Columbia';
  location.country = 'Canada';
  location.countryCode = 'CA';

  const weatherInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeather)(location.latitude, location.longitude);

  location = { ...location, ...weatherInfo };

  populateWeatherCard();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQSw0QkFBNEIsZ0RBQVU7O0FBRXRDLGVBQWU7O0FBRWY7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jc3Mvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvd2VhdGhlckljb25zLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuXG4gICAgLy8gY29uc29sZS5sb2coeyB3ZWF0aGVyRGF0YSB9KTtcblxuICAgIGNvbnN0IG1haW5XZWF0aGVyID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW47XG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb247XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXA7XG4gICAgY29uc3QgZmVlbHNMaWtlID0gd2VhdGhlckRhdGEuY3VycmVudC5mZWVsc19saWtlO1xuICAgIGNvbnN0IHRpbWUgPSB3ZWF0aGVyRGF0YS50aW1lem9uZTtcblxuICAgIHJldHVybiB7XG4gICAgICBtYWluV2VhdGhlcixcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbixcbiAgICAgIHdlYXRoZXJJY29uLFxuICAgICAgY3VycmVudFRlbXAsXG4gICAgICBmZWVsc0xpa2UsXG4gICAgICB0aW1lLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlclNpbXBsZShjaXR5KSB7XG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICApO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAvLyBjb25zb2xlLmxvZyh7IHdlYXRoZXJEYXRhIH0pO1xuICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgY29uc3Qgd2VhdGhlckljb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb247XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICBjb25zdCBmZWVsc0xpa2UgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIGNvbnN0IGxhdGl0dWRlID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICBjb25zdCBsb25naXR1ZGUgPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG4gIGNvbnN0IGNpdHlOYW1lID0gd2VhdGhlckRhdGEubmFtZTtcbiAgY29uc3QgY291bnRyeUNvZGUgPSB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeTtcbiAgY29uc3QgdGltZSA9IHdlYXRoZXJEYXRhLnRpbWV6b25lO1xuICByZXR1cm4gW1xuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBtYWluV2VhdGhlcixcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgd2VhdGhlckljb24sXG4gICAgY3VycmVudFRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGNpdHlOYW1lLFxuICAgIGNvdW50cnlDb2RlLFxuICAgIHRpbWUsXG4gIF07XG59XG5cbi8vIExhdCwgbG9uLCBhbmQgT3BlblN0cmVldE1hcCBJRFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRnJvbUlucHV0KGlucHV0U3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaD9xPSR7aW5wdXRTdHJpbmd9JmZvcm1hdD1qc29uJmxpbWl0PTFgLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IGFkZHJlc3NEYXRhID0gYXdhaXQgYWRkcmVzcy5qc29uKCk7XG5cbiAgICBpZiAoIWFkZHJlc3NEYXRhWzBdKSB7XG4gICAgICByZXR1cm4gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9XG5cbiAgICAvLyBOb3QgYSBjaXR5L3Rvd24vc3RhdGUgLSBJJ3ZlIG9ubHkgc2VlbiB0aGlzIGRhdGEgZm9ybWF0IGZyb20gZW50ZXJpbmcgVVMgemlwIGNvZGVzXG4gICAgaWYgKCFhZGRyZXNzRGF0YVswXS5vc21fdHlwZSkge1xuICAgICAgcmV0dXJuICdQbGVhc2Ugc2VhcmNoIGJ5IHBsYWNlIG5hbWUnO1xuICAgIH1cblxuICAgIGNvbnN0IGxhdGl0dWRlID0gYWRkcmVzc0RhdGFbMF0ubGF0O1xuICAgIGNvbnN0IGxvbmdpdHVkZSA9IGFkZHJlc3NEYXRhWzBdLmxvbjtcbiAgICBjb25zdCBpZCA9IGFkZHJlc3NEYXRhWzBdLm9zbV90eXBlWzBdLnRvVXBwZXJDYXNlKCkgKyBhZGRyZXNzRGF0YVswXS5vc21faWQ7XG5cbiAgICByZXR1cm4gW2xhdGl0dWRlLCBsb25naXR1ZGUsIGlkXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coeyBlcnIgfSk7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG4vLyBDb252ZXJ0IGdlb2xvY2F0aW9uIGNvb3JkaW5hdGVzIHRvIGFkZHJlc3Ncbi8vIE5lZWRlZCBmb3IgdXNlIHdpdGggdXNlciBwcm9tcHQgZ2VvbG9jYXRpb25BUEkgb25seVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZHJlc3NGcm9tQ29vcmRzKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZT9mb3JtYXQ9anNvbnYyJmxhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9YCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcbiAgICBjb25zdCBhZGRyZXNzRGF0YSA9IGF3YWl0IGFkZHJlc3MuanNvbigpO1xuXG4gICAgY29uc3QgcGxhY2VUeXBlID0gT2JqZWN0LmtleXMoYWRkcmVzc0RhdGEuYWRkcmVzcylbMF07XG5cbiAgICBsZXQgY2l0eSA9ICcnO1xuXG4gICAgaWYgKGFkZHJlc3NEYXRhLmFkZHJlc3MuY2l0eSkge1xuICAgICAgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY2l0eTtcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3NEYXRhLmFkZHJlc3MudmlsbGFnZSkge1xuICAgICAgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MudmlsbGFnZTtcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3NEYXRhLmFkZHJlc3MudG93bikge1xuICAgICAgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MudG93bjtcbiAgICB9IGVsc2UgaWYgKGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnR5KSB7XG4gICAgICBjaXR5ID0gYWRkcmVzc0RhdGEuYWRkcmVzcy5jb3VudHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgbWlnaHQgcmV0dXJuIHNvbWV0aGluZyB3ZWlyZCBsaWtlIHlvdXIgc3RyZWV0XG4gICAgICBjaXR5ID0gYWRkcmVzc0RhdGEuYWRkcmVzc1twbGFjZVR5cGVdO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhdGUgfSA9IGFkZHJlc3NEYXRhLmFkZHJlc3M7XG4gICAgY29uc3QgeyBjb3VudHJ5IH0gPSBhZGRyZXNzRGF0YS5hZGRyZXNzO1xuICAgIGNvbnN0IGNvdW50cnlDb2RlID0gYWRkcmVzc0RhdGEuYWRkcmVzcy5jb3VudHJ5X2NvZGUudG9VcHBlckNhc2UoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjaXR5LCBzdGF0ZSwgY291bnRyeSwgY291bnRyeUNvZGUsXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbi8vIENvbnZlcnQgZ2VvbG9jYXRpb24gY29vcmRpbmF0ZXMgdG8gYWRkcmVzc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZHJlc3NGcm9tSWQoaWQpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvbG9va3VwP29zbV9pZHM9JHtpZH0mZm9ybWF0PWpzb25gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IGFkZHJlc3NEYXRhID0gYXdhaXQgYWRkcmVzcy5qc29uKCk7XG5cbiAgICBjb25zdCBwbGFjZVR5cGUgPSBPYmplY3Qua2V5cyhhZGRyZXNzRGF0YVswXS5hZGRyZXNzKVswXTtcbiAgICBjb25zdCBjaXR5ID0gYWRkcmVzc0RhdGFbMF0uYWRkcmVzc1twbGFjZVR5cGVdO1xuXG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gYWRkcmVzc0RhdGFbMF0uYWRkcmVzcztcbiAgICBjb25zdCB7IGNvdW50cnkgfSA9IGFkZHJlc3NEYXRhWzBdLmFkZHJlc3M7XG4gICAgY29uc3QgY291bnRyeUNvZGUgPSBhZGRyZXNzRGF0YVswXS5hZGRyZXNzLmNvdW50cnlfY29kZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNpdHksIHN0YXRlLCBjb3VudHJ5LCBjb3VudHJ5Q29kZSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5ld0VsZW1lbnQoXG4gIHR5cGUsXG4gIGNsYXNzZXMgPSBudWxsLFxuICB0ZXh0ID0gbnVsbCxcbiAgYXR0cmlidXRlcyA9IG51bGwsXG4pIHtcbiAgY29uc3QgY3JlYXRlZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gIGlmIChjbGFzc2VzKSB7XG4gICAgY3JlYXRlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgfVxuXG4gIGlmICh0ZXh0KSB7XG4gICAgY3JlYXRlZEVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG5cbiAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBjcmVhdGVkRWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjcmVhdGVkRWxlbWVudDtcbn1cbiIsImNvbnN0IHdlYXRoZXJJY29ucyA9IHtcbiAgJzAxZCc6ICdjbGVhci1kYXknLFxuICAnMDFuJzogJ2NsZWFyLW5pZ2h0JyxcbiAgJzAyZCc6ICdwYXJ0bHktY2xvdWR5LWRheScsXG4gICcwMm4nOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gICcwM2QnOiAnY2xvdWR5JyxcbiAgJzAzbic6ICdjbG91ZHknLFxuICAnMDRkJzogJ292ZXJjYXN0JyxcbiAgJzA0bic6ICdvdmVyY2FzdCcsXG4gICcwOWQnOiAnb3ZlcmNhc3QtcmFpbicsXG4gICcwOW4nOiAnb3ZlcmNhc3QtcmFpbicsXG4gICcxMGQnOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gICcxMG4nOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgJzExZCc6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgJzExbic6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgJzEzZCc6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgJzEzbic6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgJzUwZCc6ICdmb2ctZGF5JyxcbiAgJzUwbic6ICdmb2ctbmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckljb25zO1xuXG5leHBvcnQgY29uc3QgZnVsbE1hcERheSA9IHtcbiAgMjAwOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIwMTogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAyMDI6ICd0aHVuZGVyc3Rvcm1zLWRheS1vdmVyY2FzdC1yYWluJyxcbiAgMjEwOiAndGh1bmRlcnN0b3Jtcy1kYXknLFxuICAyMTE6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgMjEyOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIyMTogJ3RodW5kZXJzdG9ybXMtb3ZlcmNhc3QnLFxuICAyMzA6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjMxOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIzMjogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAzMDA6ICdwYXJ0bHktY2xvdWR5LWRheS1kcml6emxlJyxcbiAgMzAxOiAncGFydGx5LWNsb3VkeS1kYXktZHJpenpsZScsXG4gIDMwMjogJ292ZXJjYXN0LWRheS1kcml6emxlJyxcbiAgMzEwOiAnb3ZlcmNhc3QtZGF5LWRyaXp6bGUnLFxuICAzMTE6ICdkcml6emxlJyxcbiAgMzEyOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxMzogJ292ZXJjYXN0LWRyaXp6bGUnLFxuICAzMTQ6ICdvdmVyY2FzdC1yYWluJyxcbiAgMzIxOiAnb3ZlcmNhc3QtcmFpbicsXG4gIDUwMDogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MDE6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgNTAyOiAnb3ZlcmNhc3QtZGF5LXJhaW4nLFxuICA1MDM6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUwNDogJ292ZXJjYXN0LXJhaW4nLFxuICA1MTE6ICdzbGVldCcsXG4gIDUyMDogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MjE6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgNTIyOiAnb3ZlcmNhc3QtZGF5LXJhaW4nLFxuICA1MzE6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDYwMDogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MDE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgNjAyOiAnb3ZlcmNhc3QtZGF5LXNub3cnLFxuICA2MTE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYxMjogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjEzOiAnb3ZlcmNhc3QtZGF5LXNsZWV0JyxcbiAgNjE1OiAncGFydGx5LWNsb3VkeS1kYXktc2xlZXQnLFxuICA2MTY6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYyMDogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MjE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgNjIyOiAnb3ZlcmNhc3Qtc25vdycsXG4gIDcwMTogJ21pc3QnLFxuICA3MTE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbW9rZScsXG4gIDcyMTogJ2hhemUtZGF5JyxcbiAgNzMxOiAnZHVzdC1kYXknLFxuICA3NDE6ICdmb2ctZGF5JyxcbiAgNzUxOiAnZHVzdC1kYXknLFxuICA3NjE6ICdkdXN0LWRheScsXG4gIDc2MjogJ292ZXJjYXN0LXNtb2tlJyxcbiAgNzcxOiAnd2luZCcsXG4gIDc4MTogJ3Rvcm5hZG8nLFxuICA4MDA6ICdjbGVhci1kYXknLFxuICA4MDE6ICdwYXJ0bHktY2xvdWR5LWRheScsXG4gIDgwMjogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgODAzOiAnb3ZlcmNhc3QtZGF5JyxcbiAgODA0OiAnb3ZlcmNhc3QtZGF5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBmdWxsTWFwTmlnaHQgPSB7XG4gIDIwMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIwMTogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIwMjogJ3RodW5kZXJzdG9ybXMtbmlnaHQtb3ZlcmNhc3QtcmFpbicsXG4gIDIxMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQnLFxuICAyMTE6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgMjEyOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIyMTogJ3RodW5kZXJzdG9ybXMtb3ZlcmNhc3QnLFxuICAyMzA6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAyMzE6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAyMzI6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAzMDA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUnLFxuICAzMDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUnLFxuICAzMDI6ICdvdmVyY2FzdC1uaWdodC1kcml6emxlJyxcbiAgMzEwOiAnb3ZlcmNhc3QtbmlnaHQtZHJpenpsZScsXG4gIDMxMTogJ2RyaXp6bGUnLFxuICAzMTI6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzEzOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxNDogJ292ZXJjYXN0LXJhaW4nLFxuICAzMjE6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTAwOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgNTAxOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgNTAyOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDUwMzogJ292ZXJjYXN0LW5pZ2h0LXJhaW4nLFxuICA1MDQ6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTExOiAnc2xlZXQnLFxuICA1MjA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MjE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MjI6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNTMxOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDYwMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYwMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYwMjogJ292ZXJjYXN0LW5pZ2h0LXNub3cnLFxuICA2MTE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjEyOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYxMzogJ292ZXJjYXN0LW5pZ2h0LXNsZWV0JyxcbiAgNjE1OiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYxNjogJ3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQnLFxuICA2MjA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cnLFxuICA2MjE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cnLFxuICA2MjI6ICdvdmVyY2FzdC1zbm93JyxcbiAgNzAxOiAnbWlzdCcsXG4gIDcxMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc21va2UnLFxuICA3MjE6ICdoYXplLW5pZ2h0JyxcbiAgNzMxOiAnZHVzdC1uaWdodCcsXG4gIDc0MTogJ2ZvZy1uaWdodCcsXG4gIDc1MTogJ2R1c3QtbmlnaHQnLFxuICA3NjE6ICdkdXN0LW5pZ2h0JyxcbiAgNzYyOiAnb3ZlcmNhc3Qtc21va2UnLFxuICA3NzE6ICd3aW5kJyxcbiAgNzgxOiAndG9ybmFkbycsXG4gIDgwMDogJ2NsZWFyLW5pZ2h0JyxcbiAgODAxOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gIDgwMjogJ3BhcnRseS1jbG91ZHktbmlnaHQnLFxuICA4MDM6ICdvdmVyY2FzdC1uaWdodCcsXG4gIDgwNDogJ292ZXJjYXN0LW5pZ2h0Jyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9jc3Mvc3R5bGVzLmNzcyc7XG5pbXBvcnQgY3JlYXRlTmV3RWxlbWVudCBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB3ZWF0aGVySWNvbnMgZnJvbSAnLi93ZWF0aGVySWNvbnMnO1xuXG5pbXBvcnQge1xuICBnZXRXZWF0aGVyLFxuICBnZXRMb2NhdGlvbkZyb21JbnB1dCxcbiAgZ2V0QWRkcmVzc0Zyb21JZCxcbiAgZ2V0QWRkcmVzc0Zyb21Db29yZHMsXG59IGZyb20gJy4vYXBpJztcblxuLy8gU2V0IHVwIHNpbmdsZXRvbiBvYmplY3QgdG8gaG9sZCBkYXRhXG5sZXQgbG9jYXRpb24gPSB7XG4gIGxhdGl0dWRlOiAnJyxcbiAgbG9uZ2l0dWRlOiAnJyxcbiAgbWFpbldlYXRoZXI6ICdXZWF0aGVyIFVuYXZhaWxhYmxlJyxcbiAgd2VhdGhlckRlc2NyaXB0aW9uOiAnJyxcbiAgd2VhdGhlckljb246ICcnLFxuICBjdXJyZW50VGVtcDogJycsXG4gIGZlZWxzTGlrZTogJycsXG4gIGNpdHk6ICcnLFxuICBzdGF0ZTogJycsXG4gIGNvdW50cnlDb2RlOiAnJyxcbiAgY291bnRyeTogJycsXG4gIGlkOiAnJywgLy8gZm9yIE9wZW5TdHJlZXRNYXBcbn07XG5cbi8vIFNldCB1cCBwYWdlXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29uc3QgY29udGFpbmVyID0gY3JlYXRlTmV3RWxlbWVudCgnZGl2JywgWydjb250YWluZXInXSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbi8vIFNlYXJjaCBiYXIgLSBzZWFyY2gsIGxvYWRpbmcgYW5pbWF0aW9uLCB3YXJuaW5nXG5jb25zdCBmb3JtID0gY3JlYXRlTmV3RWxlbWVudCgnZm9ybScpO1xuY29uc3QgaW5wdXQgPSBjcmVhdGVOZXdFbGVtZW50KCdpbnB1dCcsIG51bGwsIG51bGwsIHtcbiAgdHlwZTogJ3NlYXJjaCcsXG4gIHBsYWNlaG9sZGVyOiAnU2VhcmNoIENpdHknLFxufSk7XG5cbi8vIExvYWRpbmcgaW4gcHJvZ3Jlc3MgYW5pbWF0aW9uIHByb2dyZXNzXG5jb25zdCBsb2FkaW5nQmFyID0gY3JlYXRlTmV3RWxlbWVudCgnZGl2JywgWydsb2FkaW5nJ10pO1xuY29uc3QgbG9hZGluZ0JhckFuaW1hdGlvbiA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsnbG9hZGluZy1iYXInXSk7XG5sb2FkaW5nQmFyLmFwcGVuZENoaWxkKGxvYWRpbmdCYXJBbmltYXRpb24pO1xuXG4vLyBXYXJuaW5nIHRvIGRpc3BsYXkgc2VhcmNoIGVycm9yc1xuY29uc3QgZm9ybVdhcm5pbmcgPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWyd3YXJuaW5nJ10pO1xuXG5mb3JtLmFwcGVuZChpbnB1dCwgbG9hZGluZ0JhciwgZm9ybVdhcm5pbmcpO1xuY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4vLyBTZWFyY2ggaW5wdXQgZXZlbnQgaGFuZGxpbmdcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2KSA9PiB7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbG9hZGluZ0Jhci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICBjb25zdCBjb29yZHMgPSBhd2FpdCBnZXRMb2NhdGlvbkZyb21JbnB1dChpbnB1dC52YWx1ZSk7XG5cbiAgaWYgKGNvb3JkcyA9PT0gJ0NpdHkgbm90IGZvdW5kJyB8fCBjb29yZHMgPT09ICdQbGVhc2Ugc2VhcmNoIGJ5IHBsYWNlIG5hbWUnKSB7XG4gICAgbG9hZGluZ0Jhci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBmb3JtV2FybmluZy50ZXh0Q29udGVudCA9IGNvb3JkcztcbiAgICBmb3JtV2FybmluZy5jbGFzc0xpc3QuYWRkKCdvbicpO1xuICAgIGZvcm1XYXJuaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICBmb3JtV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKCdvbicpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFtsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlLCBsb2NhdGlvbi5pZF0gPSBjb29yZHM7XG5cbiAgY29uc3QgYWRkcmVzc1Byb21pc2UgPSBnZXRBZGRyZXNzRnJvbUlkKGxvY2F0aW9uLmlkKTtcbiAgY29uc3Qgd2VhdGhlclByb21pc2UgPSBnZXRXZWF0aGVyKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpO1xuXG4gIGNvbnN0IFthZGRyZXNzSW5mbywgd2VhdGhlckluZm9dID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGFkZHJlc3NQcm9taXNlLFxuICAgIHdlYXRoZXJQcm9taXNlLFxuICBdKTtcblxuICBsb2NhdGlvbiA9IHsgLi4ubG9jYXRpb24sIC4uLmFkZHJlc3NJbmZvLCAuLi53ZWF0aGVySW5mbyB9O1xuXG4gIGxvYWRpbmdCYXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIGlucHV0LnZhbHVlID0gJyc7XG5cbiAgcG9wdWxhdGVXZWF0aGVyQ2FyZCgpO1xufSk7XG5cbi8vIFNldCB1cCBpbmZvcm1hdGlvbiBjYXJkXG5sZXQgdGVtcGVyYXR1cmVNb2RlID0gJ0NlbHNpdXMnO1xuXG5jb25zdCBpbmZvQ2FyZCA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsnaW5mb0NhcmQnXSk7XG5jb25zdCBjdXJyZW50RGF0ZVRpbWUgPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWydjdXJyZW50VGltZSddKTtcblxuaW5mb0NhcmQuYXBwZW5kQ2hpbGQoY3VycmVudERhdGVUaW1lKTtcblxuY29uc3QgaW5mb1dyYXBwZXIgPSBjcmVhdGVOZXdFbGVtZW50KCdkaXYnLCBbJ2luZm9XcmFwcGVyJ10pO1xuY29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9XcmFwcGVyKTtcblxuY29uc3QgY2l0eUhlYWRpbmcgPSBjcmVhdGVOZXdFbGVtZW50KCdoMScsIFsnY2l0eSddLCAnTG9hZGluZyBXZWF0aGVyLi4uJyk7XG5jb25zdCBjb3VudHJ5SGVhZGluZyA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2gyJywgWydjb3VudHJ5J10pO1xuXG5jb25zdCB0ZW1wTGluZSA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsndGVtcEJveCddKTtcbmNvbnN0IHRlbXBlcmF0dXJlTWFpbiA9IGNyZWF0ZU5ld0VsZW1lbnQoJ3AnLCBbJ3RlbXBNYWluJ10pO1xuY29uc3QgZGVncmVlTm90YXRpb24gPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWydkZWdyZWUnXSk7XG5jb25zdCBmZWVsc0xpa2UgPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWydmZWVsc0xpa2UnXSk7XG5cbnRlbXBMaW5lLmFwcGVuZENoaWxkKHRlbXBlcmF0dXJlTWFpbik7XG50ZW1wTGluZS5hcHBlbmRDaGlsZChkZWdyZWVOb3RhdGlvbik7XG5cbmluZm9DYXJkLmFwcGVuZChjaXR5SGVhZGluZywgY291bnRyeUhlYWRpbmcsIHRlbXBMaW5lLCBmZWVsc0xpa2UpO1xuXG4vLyBEZWdyZWUgbW9kZSAoRi9DKSB0b2dnbGVcbnRlbXBMaW5lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAodGVtcGVyYXR1cmVNb2RlID09PSAnQ2Vsc2l1cycpIHtcbiAgICB0ZW1wZXJhdHVyZU1vZGUgPSAnRmFocmVuaGVpdCc7XG4gIH0gZWxzZSB7XG4gICAgdGVtcGVyYXR1cmVNb2RlID0gJ0NlbHNpdXMnO1xuICB9XG4gIHByaW50VGVtcHModGVtcGVyYXR1cmVNb2RlKTtcbn0pO1xuXG5pbmZvV3JhcHBlci5hcHBlbmRDaGlsZChpbmZvQ2FyZCk7XG5cbmNvbnN0IGljb25DYXJkID0gY3JlYXRlTmV3RWxlbWVudCgnZGl2JywgWydpY29uQ2FyZCddKTtcbmNvbnN0IGljb24gPSBjcmVhdGVOZXdFbGVtZW50KCdvYmplY3QnLCBbJ2ljb24nXSwgbnVsbCwge1xuICB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsXG4gIGRhdGE6ICcuL3N2Zy93aW5kc29jay5zdmcnLFxufSk7XG5jb25zdCBpY29uTGFiZWwgPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWydpY29uLWxhYmVsJ10pO1xuXG5pY29uQ2FyZC5hcHBlbmQoaWNvbiwgaWNvbkxhYmVsKTtcbmluZm9XcmFwcGVyLmFwcGVuZENoaWxkKGljb25DYXJkKTtcblxuZnVuY3Rpb24gcG9wdWxhdGVXZWF0aGVyQ2FyZCgpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgbG9jYXRpb25EYXRlID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZyhbXSwge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ2xvbmcnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICAgIHRpbWVab25lOiBgJHtsb2NhdGlvbi50aW1lfWAsXG4gIH0pO1xuICBjb25zdCBsb2NhdGlvblRpbWUgPSBub3cudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1DQScsIHtcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgdGltZVpvbmU6IGAke2xvY2F0aW9uLnRpbWV9YCxcbiAgfSk7XG5cbiAgY29uc3QgbG9jYXRpb25EYXRlVGltZSA9IGAke2xvY2F0aW9uRGF0ZX0sICR7bG9jYXRpb25UaW1lfWA7XG4gIGN1cnJlbnREYXRlVGltZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0ZVRpbWU7XG5cbiAgY2l0eUhlYWRpbmcudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5jaXR5O1xuXG4gIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgIGNvdW50cnlIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb24uc3RhdGV9LCAke2xvY2F0aW9uLmNvdW50cnl9YDtcbiAgfSBlbHNlIHtcbiAgICBjb3VudHJ5SGVhZGluZy50ZXh0Q29udGVudCA9IGxvY2F0aW9uLmNvdW50cnk7XG4gIH1cblxuICBwcmludFRlbXBzKHRlbXBlcmF0dXJlTW9kZSk7XG5cbiAgY29uc3QgaWNvblVSTCA9IG1hdGNoV2VhdGhlclRvSWNvbigpO1xuICBpY29uLnNldEF0dHJpYnV0ZSgnZGF0YScsIGljb25VUkwpO1xuICBpY29uTGFiZWwudGV4dENvbnRlbnQgPSBsb2NhdGlvbi53ZWF0aGVyRGVzY3JpcHRpb247XG59XG5cbmZ1bmN0aW9uIG1hdGNoV2VhdGhlclRvSWNvbigpIHtcbiAgcmV0dXJuIGAuL3N2Zy8ke3dlYXRoZXJJY29uc1tsb2NhdGlvbi53ZWF0aGVySWNvbl19LnN2Z2A7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRDZWxzaXVzKEtlbHZpbikge1xuICByZXR1cm4gS2VsdmluIC0gMjczLjE1O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0RmFocmVuaGVpdChLZWx2aW4pIHtcbiAgcmV0dXJuICgoS2VsdmluIC0gMjczLjE1KSAqIDkpIC8gNSArIDMyO1xufVxuXG5mdW5jdGlvbiBwcmludFRlbXBzKCkge1xuICBpZiAodGVtcGVyYXR1cmVNb2RlID09PSAnQ2Vsc2l1cycpIHtcbiAgICB0ZW1wZXJhdHVyZU1haW4udGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uY3VycmVudFRlbXApLFxuICAgICk7XG4gICAgZGVncmVlTm90YXRpb24udGV4dENvbnRlbnQgPSAnwrBDJztcbiAgICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke01hdGgucm91bmQoXG4gICAgICBjb252ZXJ0Q2Vsc2l1cyhsb2NhdGlvbi5mZWVsc0xpa2UpLFxuICAgICl9wrBgO1xuICB9IGVsc2Uge1xuICAgIHRlbXBlcmF0dXJlTWFpbi50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoXG4gICAgICBjb252ZXJ0RmFocmVuaGVpdChsb2NhdGlvbi5jdXJyZW50VGVtcCksXG4gICAgKTtcbiAgICBkZWdyZWVOb3RhdGlvbi50ZXh0Q29udGVudCA9ICfCsEYnO1xuICAgIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7TWF0aC5yb3VuZChcbiAgICAgIGNvbnZlcnRGYWhyZW5oZWl0KGxvY2F0aW9uLmZlZWxzTGlrZSksXG4gICAgKX3CsGA7XG4gIH1cbn1cblxuLy8gUXVlcnkgdXNlciBmb3IgbG9jYXRpb24gb24gcGFnZSBsb2FkXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgIHVzZVVzZXJMb2NhdGlvbihwb3NpdGlvbik7XG4gIH0sIHVzZURlZmF1bHRMb2NhdGlvbik7XG59KCkpO1xuXG5hc3luYyBmdW5jdGlvbiB1c2VVc2VyTG9jYXRpb24ocG9zaXRpb24pIHtcbiAgbG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gIGxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG5cbiAgY29uc3QgYWRkcmVzc1Byb21pc2UgPSBnZXRBZGRyZXNzRnJvbUNvb3JkcyhcbiAgICBsb2NhdGlvbi5sYXRpdHVkZSxcbiAgICBsb2NhdGlvbi5sb25naXR1ZGUsXG4gICk7XG4gIGNvbnN0IHdlYXRoZXJQcm9taXNlID0gZ2V0V2VhdGhlcihsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKTtcblxuICBjb25zdCBbYWRkcmVzc0luZm8sIHdlYXRoZXJJbmZvXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBhZGRyZXNzUHJvbWlzZSxcbiAgICB3ZWF0aGVyUHJvbWlzZSxcbiAgXSk7XG5cbiAgbG9jYXRpb24gPSB7IC4uLmxvY2F0aW9uLCAuLi5hZGRyZXNzSW5mbywgLi4ud2VhdGhlckluZm8gfTtcblxuICBwb3B1bGF0ZVdlYXRoZXJDYXJkKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZURlZmF1bHRMb2NhdGlvbigpIHtcbiAgLy8gU2V0IGRlZmF1bHRzIHRvIFZhbmNvdXZlclxuICBsb2NhdGlvbi5sYXRpdHVkZSA9ICc0OS4yODMnO1xuICBsb2NhdGlvbi5sb25naXR1ZGUgPSAnLTEyMy4xMjEnO1xuICBsb2NhdGlvbi5jaXR5ID0gJ1ZhbmNvdXZlcic7XG4gIGxvY2F0aW9uLnN0YXRlID0gJ0JyaXRpc2ggQ29sdW1iaWEnO1xuICBsb2NhdGlvbi5jb3VudHJ5ID0gJ0NhbmFkYSc7XG4gIGxvY2F0aW9uLmNvdW50cnlDb2RlID0gJ0NBJztcblxuICBjb25zdCB3ZWF0aGVySW5mbyA9IGF3YWl0IGdldFdlYXRoZXIobG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSk7XG5cbiAgbG9jYXRpb24gPSB7IC4uLmxvY2F0aW9uLCAuLi53ZWF0aGVySW5mbyB9O1xuXG4gIHBvcHVsYXRlV2VhdGhlckNhcmQoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==