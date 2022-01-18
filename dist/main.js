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
/* harmony export */   "getLocationAndAddressFromInput": () => (/* binding */ getLocationAndAddressFromInput),
/* harmony export */   "getAddressFromCoords": () => (/* binding */ getAddressFromCoords),
/* harmony export */   "getLocationFromIP": () => (/* binding */ getLocationFromIP)
/* harmony export */ });
async function getWeather(latitude, longitude) {
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=8f12dfab0de38099e0b5a7a2ddc45e37`,
      { mode: 'cors' },
    );
    const weatherData = await weather.json();
    console.log({ weatherData });
    const mainWeather = weatherData.current.weather[0].main;
    const weatherDesc = weatherData.current.weather[0].description;
    const weatherIcon = weatherData.current.weather[0].icon;
    const currentTemp = weatherData.current.temp;
    const feelsLike = weatherData.current.feels_like;
    return [mainWeather, weatherDesc, weatherIcon, currentTemp, feelsLike];
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
  console.log({ weatherData });
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

async function getLocationAndAddressFromInput(inputString) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${inputString}&format=json&limit=1`,
      { mode: 'cors' },
    );
    const addressData = await address.json();
    console.log({ addressData });
    const { city } = addressData.address;
    const { state } = addressData.address;
    const { country } = addressData.address;
    const latitude = addressData.lat;
    const longitude = addressData.lon;
    return [city, state, country, latitude, longitude];
  } catch (err) {
    console.log({ err });
    return err;
  }
}

// Convert geolocation coordinates to address
async function getAddressFromCoords(latitude, longitude) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { mode: 'cors' },
    );
    const addressData = await address.json();
    console.log({ addressData });
    const state = addressData.address.state;
    const country = addressData.address.country;
    const countryCode = addressData.address.country_code.toUpperCase();
    const city = addressData.address.city;
    return [state, country, countryCode, city];
  } catch (err) {
    return err;
  }
}

// Geolocation via IP (first choice)
async function getLocationFromIP() {
  try {
    const locationIP = await fetch('http://ip-api.com/json/', { mode: 'cors' });
    const locationIPData = await locationIP.json();
    return locationIPData;
  } catch (err) {
    return err;
  }
}

// // Coordinates from Geolocation API (pop-up for user)
// export async function getLocationFromUserQuery() {
//   return navigator.geolocation.getCurrentPosition((position) => position);
// }


/***/ }),

/***/ "./src/countryCodes.js":
/*!*****************************!*\
  !*** ./src/countryCodes.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// from https://gist.github.com/incredimike/1469814

const countryCodes = {
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  CV: 'Cabo Verde',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CD: 'Democratic Republic of the Congo',
  CG: 'Congo',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CU: 'Cuba',
  CW: 'Curaçao',
  CY: 'Cyprus',
  CZ: 'Czechia',
  CI: "Côte d'Ivoire",
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  SZ: 'Eswatini',
  ET: 'Ethiopia',
  FK: 'Falkland Islands [Malvinas]',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island and McDonald Islands',
  VA: 'Holy See',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran (Islamic Republic of)',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: "The Democratic People's Republic of Korea",
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine, State of',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  MK: 'Republic of North Macedonia',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  RE: 'Réunion',
  BL: 'Saint Barthélemy',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin (French part)',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome and Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten (Dutch part)',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania, United Republic of',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  UM: 'United States Minor Outlying Islands',
  US: 'United States of America',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
  AX: 'Åland Islands',
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countryCodes);


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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _countryCodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./countryCodes */ "./src/countryCodes.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/api.js");
/* harmony import */ var _weatherIcons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weatherIcons */ "./src/weatherIcons.js");






// Set up page
const body = document.querySelector("body");
const container = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["container"]);
body.appendChild(container);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (container);

// Set up singleton to hold display data
const location = {
  latitude: "",
  longitude: "",
  mainWeather: "Weather Unavailable",
  weatherDescription: "",
  weatherIcon: "",
  currentTemp: "",
  feelsLike: "",
  city: "",
  state: "",
  countryCode: "",
  country: "",
};

// Populate data
function processReturnedInfo(weatherInfo) {
  [
    location.latitude,
    location.longitude,
    location.mainWeather,
    location.weatherDescription,
    location.weatherIcon,
    location.currentTemp,
    location.feelsLike,
    location.city,
    location.countryCode,
    location.time,
  ] = weatherInfo;
  location.country = _countryCodes__WEBPACK_IMPORTED_MODULE_2__["default"][location.countryCode];
  console.log({ location });
}

// Set up DOM (couldn't get this working with module exports)

// Input search bar
const form = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("form");
const input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("input", null, null, {
  type: "search",
  placeholder: "Search City",
});

form.appendChild(input);
container.appendChild(form);

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  pageLoad(input.value)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Info display card
const temperatureMode = "Celsius";
const infoCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["infoCard"]);

const now = new Date();
const dateValue = now.toLocaleDateString([], {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const timeValue = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

const currentDateTime = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(
  "p",
  ["currentTime"],
  `${dateValue}, ${timeValue}`
);

infoCard.appendChild(currentDateTime);

const infoWrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["infoWrapper"]);
container.appendChild(infoWrapper);

const cityHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("h1", ["city"]);
const countryHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("h2", ["country"]);

const tempLine = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["tempBox"]);
const temperatureMain = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["tempMain"]);
const degreeNotation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["degree"]);
const feelsLike = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["feelsLike"]);

tempLine.appendChild(temperatureMain);
tempLine.appendChild(degreeNotation);

infoCard.append(cityHeading, countryHeading, tempLine, feelsLike);

infoWrapper.appendChild(infoCard);

const iconCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["iconCard"]);
const icon = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("img", ["icon"]);
const iconLabel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["icon-label"]);

iconCard.append(icon, iconLabel);
infoWrapper.appendChild(iconCard);

function populateWeatherCard() {
  // Only the one-call API returns named timezone;
  // The simple call returns a timezone offset; not sure how to use that to display a local time

  // const now = new Date();
  // const locationDate = now.toLocaleDateString([], {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   timeZone: location.timeZone,
  // });
  // const locationTime = now.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   timeZone: location.timeZone,
  // });

  // const locationDateTime = `${locationDate}, ${locationTime}`;
  // currentDateTime.textContent = locationDateTime;

  cityHeading.textContent = location.city;

  if (location.state) {
    countryHeading.textContent = `${location.state}, ${location.country}`;
  } else {
    countryHeading.textContent = location.country;
  }

  if (temperatureMode === "Celsius") {
    temperatureMain.textContent = Math.round(
      convertCelsius(location.currentTemp)
    );
    degreeNotation.textContent = "°C";
    feelsLike.textContent = `Feels like ${Math.round(
      convertCelsius(location.feelsLike)
    )}°`;
  } else {
    temperatureMain.textContent = convertFahreinheit(location.currentTemp);
    degreeNotation.textContent = "°F";
    feelsLike.textContent = `Feels like ${Math.round(
      convertFahreinheit(location.feelsLike)
    )}°`;
  }

  const iconURL = matchWeatherToIcon();
  icon.setAttribute("src", iconURL);
  iconLabel.textContent = location.weatherDescription;
}

function matchWeatherToIcon() {
  return `../src/svg/${_weatherIcons__WEBPACK_IMPORTED_MODULE_4__["default"][location.weatherIcon]}.svg`;
}

function convertCelsius(Kelvin) {
  return Kelvin - 273.15;
}

function convertFahreinheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}

// Run on page load and on form submit
async function pageLoad(input) {
  const returnedInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeatherSimple)(input);
  processReturnedInfo(returnedInfo);
}

async function pageLoadCords(lat, lon) {
  const returnedInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeather)(lat, lon);
  processReturnedInfo(returnedInfo);
}

// Attempt to get a location from IP
// This won't ever work locally though
(async function () {
  navigator.geolocation.getCurrentPosition(async (position) => {
    useUserLocation(position);
  }, useDefaultLocation);
})();

async function useUserLocation(position) {
  const positionData = position;

  location.latitude = positionData.coords.latitude;
  location.longitude = positionData.coords.longitude;

  const addressInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAddressFromCoords)(
    location.latitude,
    location.longitude
  );
  [location.state, location.country, location.countryCode, location.city] =
    addressInfo;
  
  location.state = ''; // until switching to the One Call API for form submit

  pageLoad(location.city)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

function useDefaultLocation() {
  pageLoad("Vancouver")
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU87QUFDUDtBQUNBO0FBQ0EsNkRBQTZELFNBQVMsT0FBTyxVQUFVO0FBQ3ZGLFFBQVEsY0FBYztBQUN0QjtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx5REFBeUQsS0FBSztBQUM5RCxNQUFNLGNBQWM7QUFDcEI7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0Esc0RBQXNELFlBQVk7QUFDbEUsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQixZQUFZLE9BQU87QUFDbkIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksVUFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osa0JBQWtCLEtBQUs7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0EsdUVBQXVFLFNBQVMsT0FBTyxVQUFVO0FBQ2pHLFFBQVEsY0FBYztBQUN0QjtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0EsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOVBiO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7QUFFckI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04wQjtBQUNhO0FBQ0c7QUFNM0I7QUFDMkI7O0FBRTFDO0FBQ0E7QUFDQSxrQkFBa0Isa0RBQWdCO0FBQ2xDOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFEQUFZO0FBQ2pDLGdCQUFnQixVQUFVO0FBQzFCOztBQUVBOztBQUVBO0FBQ0EsYUFBYSxrREFBZ0I7QUFDN0IsY0FBYyxrREFBZ0I7QUFDOUI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFnQjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELHdCQUF3QixrREFBZ0I7QUFDeEM7QUFDQTtBQUNBLEtBQUssVUFBVSxJQUFJLFVBQVU7QUFDN0I7O0FBRUE7O0FBRUEsb0JBQW9CLGtEQUFnQjtBQUNwQzs7QUFFQSxvQkFBb0Isa0RBQWdCO0FBQ3BDLHVCQUF1QixrREFBZ0I7O0FBRXZDLGlCQUFpQixrREFBZ0I7QUFDakMsd0JBQXdCLGtEQUFnQjtBQUN4Qyx1QkFBdUIsa0RBQWdCO0FBQ3ZDLGtCQUFrQixrREFBZ0I7O0FBRWxDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsaUJBQWlCLGtEQUFnQjtBQUNqQyxhQUFhLGtEQUFnQjtBQUM3QixrQkFBa0Isa0RBQWdCOztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU4saUNBQWlDLGFBQWEsSUFBSSxhQUFhO0FBQy9EOztBQUVBOztBQUVBO0FBQ0Esb0NBQW9DLGVBQWUsSUFBSSxpQkFBaUI7QUFDeEUsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixxREFBWSx1QkFBdUI7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFnQjtBQUM3QztBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLGdEQUFVO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0QkFBNEIsMERBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jc3Mvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jb3VudHJ5Q29kZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy93ZWF0aGVySWNvbnMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9OGYxMmRmYWIwZGUzODA5OWUwYjVhN2EyZGRjNDVlMzdgLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlci5qc29uKCk7XG4gICAgY29uc29sZS5sb2coeyB3ZWF0aGVyRGF0YSB9KTtcbiAgICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHdlYXRoZXJEZXNjID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb247XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXA7XG4gICAgY29uc3QgZmVlbHNMaWtlID0gd2VhdGhlckRhdGEuY3VycmVudC5mZWVsc19saWtlO1xuICAgIHJldHVybiBbbWFpbldlYXRoZXIsIHdlYXRoZXJEZXNjLCB3ZWF0aGVySWNvbiwgY3VycmVudFRlbXAsIGZlZWxzTGlrZV07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlclNpbXBsZShjaXR5KSB7XG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICApO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICBjb25zb2xlLmxvZyh7IHdlYXRoZXJEYXRhIH0pO1xuICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgY29uc3Qgd2VhdGhlckljb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb247XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICBjb25zdCBmZWVsc0xpa2UgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIGNvbnN0IGxhdGl0dWRlID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICBjb25zdCBsb25naXR1ZGUgPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG4gIGNvbnN0IGNpdHlOYW1lID0gd2VhdGhlckRhdGEubmFtZTtcbiAgY29uc3QgY291bnRyeUNvZGUgPSB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeTtcbiAgY29uc3QgdGltZSA9IHdlYXRoZXJEYXRhLnRpbWV6b25lO1xuICByZXR1cm4gW1xuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBtYWluV2VhdGhlcixcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgd2VhdGhlckljb24sXG4gICAgY3VycmVudFRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGNpdHlOYW1lLFxuICAgIGNvdW50cnlDb2RlLFxuICAgIHRpbWUsXG4gIF07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkFuZEFkZHJlc3NGcm9tSW5wdXQoaW5wdXRTdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoP3E9JHtpbnB1dFN0cmluZ30mZm9ybWF0PWpzb24mbGltaXQ9MWAsXG4gICAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICAgICk7XG4gICAgY29uc3QgYWRkcmVzc0RhdGEgPSBhd2FpdCBhZGRyZXNzLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh7IGFkZHJlc3NEYXRhIH0pO1xuICAgIGNvbnN0IHsgY2l0eSB9ID0gYWRkcmVzc0RhdGEuYWRkcmVzcztcbiAgICBjb25zdCB7IHN0YXRlIH0gPSBhZGRyZXNzRGF0YS5hZGRyZXNzO1xuICAgIGNvbnN0IHsgY291bnRyeSB9ID0gYWRkcmVzc0RhdGEuYWRkcmVzcztcbiAgICBjb25zdCBsYXRpdHVkZSA9IGFkZHJlc3NEYXRhLmxhdDtcbiAgICBjb25zdCBsb25naXR1ZGUgPSBhZGRyZXNzRGF0YS5sb247XG4gICAgcmV0dXJuIFtjaXR5LCBzdGF0ZSwgY291bnRyeSwgbGF0aXR1ZGUsIGxvbmdpdHVkZV07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKHsgZXJyIH0pO1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuLy8gQ29udmVydCBnZW9sb2NhdGlvbiBjb29yZGluYXRlcyB0byBhZGRyZXNzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkcmVzc0Zyb21Db29yZHMobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICB0cnkge1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlP2Zvcm1hdD1qc29udjImbGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX1gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IGFkZHJlc3NEYXRhID0gYXdhaXQgYWRkcmVzcy5qc29uKCk7XG4gICAgY29uc29sZS5sb2coeyBhZGRyZXNzRGF0YSB9KTtcbiAgICBjb25zdCBzdGF0ZSA9IGFkZHJlc3NEYXRhLmFkZHJlc3Muc3RhdGU7XG4gICAgY29uc3QgY291bnRyeSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnRyeTtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnRyeV9jb2RlLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3QgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY2l0eTtcbiAgICByZXR1cm4gW3N0YXRlLCBjb3VudHJ5LCBjb3VudHJ5Q29kZSwgY2l0eV07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuLy8gR2VvbG9jYXRpb24gdmlhIElQIChmaXJzdCBjaG9pY2UpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tSVAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9jYXRpb25JUCA9IGF3YWl0IGZldGNoKCdodHRwOi8vaXAtYXBpLmNvbS9qc29uLycsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgIGNvbnN0IGxvY2F0aW9uSVBEYXRhID0gYXdhaXQgbG9jYXRpb25JUC5qc29uKCk7XG4gICAgcmV0dXJuIGxvY2F0aW9uSVBEYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbi8vIC8vIENvb3JkaW5hdGVzIGZyb20gR2VvbG9jYXRpb24gQVBJIChwb3AtdXAgZm9yIHVzZXIpXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tVXNlclF1ZXJ5KCkge1xuLy8gICByZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHBvc2l0aW9uKTtcbi8vIH1cbiIsIi8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaW5jcmVkaW1pa2UvMTQ2OTgxNFxuXG5jb25zdCBjb3VudHJ5Q29kZXMgPSB7XG4gIEFGOiAnQWZnaGFuaXN0YW4nLFxuICBBTDogJ0FsYmFuaWEnLFxuICBEWjogJ0FsZ2VyaWEnLFxuICBBUzogJ0FtZXJpY2FuIFNhbW9hJyxcbiAgQUQ6ICdBbmRvcnJhJyxcbiAgQU86ICdBbmdvbGEnLFxuICBBSTogJ0FuZ3VpbGxhJyxcbiAgQVE6ICdBbnRhcmN0aWNhJyxcbiAgQUc6ICdBbnRpZ3VhIGFuZCBCYXJidWRhJyxcbiAgQVI6ICdBcmdlbnRpbmEnLFxuICBBTTogJ0FybWVuaWEnLFxuICBBVzogJ0FydWJhJyxcbiAgQVU6ICdBdXN0cmFsaWEnLFxuICBBVDogJ0F1c3RyaWEnLFxuICBBWjogJ0F6ZXJiYWlqYW4nLFxuICBCUzogJ0JhaGFtYXMnLFxuICBCSDogJ0JhaHJhaW4nLFxuICBCRDogJ0JhbmdsYWRlc2gnLFxuICBCQjogJ0JhcmJhZG9zJyxcbiAgQlk6ICdCZWxhcnVzJyxcbiAgQkU6ICdCZWxnaXVtJyxcbiAgQlo6ICdCZWxpemUnLFxuICBCSjogJ0JlbmluJyxcbiAgQk06ICdCZXJtdWRhJyxcbiAgQlQ6ICdCaHV0YW4nLFxuICBCTzogJ0JvbGl2aWEnLFxuICBCUTogJ0JvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhJyxcbiAgQkE6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJyxcbiAgQlc6ICdCb3Rzd2FuYScsXG4gIEJWOiAnQm91dmV0IElzbGFuZCcsXG4gIEJSOiAnQnJhemlsJyxcbiAgSU86ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLFxuICBCTjogJ0JydW5laSBEYXJ1c3NhbGFtJyxcbiAgQkc6ICdCdWxnYXJpYScsXG4gIEJGOiAnQnVya2luYSBGYXNvJyxcbiAgQkk6ICdCdXJ1bmRpJyxcbiAgQ1Y6ICdDYWJvIFZlcmRlJyxcbiAgS0g6ICdDYW1ib2RpYScsXG4gIENNOiAnQ2FtZXJvb24nLFxuICBDQTogJ0NhbmFkYScsXG4gIEtZOiAnQ2F5bWFuIElzbGFuZHMnLFxuICBDRjogJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsXG4gIFREOiAnQ2hhZCcsXG4gIENMOiAnQ2hpbGUnLFxuICBDTjogJ0NoaW5hJyxcbiAgQ1g6ICdDaHJpc3RtYXMgSXNsYW5kJyxcbiAgQ0M6ICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcycsXG4gIENPOiAnQ29sb21iaWEnLFxuICBLTTogJ0NvbW9yb3MnLFxuICBDRDogJ0RlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlIENvbmdvJyxcbiAgQ0c6ICdDb25nbycsXG4gIENLOiAnQ29vayBJc2xhbmRzJyxcbiAgQ1I6ICdDb3N0YSBSaWNhJyxcbiAgSFI6ICdDcm9hdGlhJyxcbiAgQ1U6ICdDdWJhJyxcbiAgQ1c6ICdDdXJhw6dhbycsXG4gIENZOiAnQ3lwcnVzJyxcbiAgQ1o6ICdDemVjaGlhJyxcbiAgQ0k6IFwiQ8O0dGUgZCdJdm9pcmVcIixcbiAgREs6ICdEZW5tYXJrJyxcbiAgREo6ICdEamlib3V0aScsXG4gIERNOiAnRG9taW5pY2EnLFxuICBETzogJ0RvbWluaWNhbiBSZXB1YmxpYycsXG4gIEVDOiAnRWN1YWRvcicsXG4gIEVHOiAnRWd5cHQnLFxuICBTVjogJ0VsIFNhbHZhZG9yJyxcbiAgR1E6ICdFcXVhdG9yaWFsIEd1aW5lYScsXG4gIEVSOiAnRXJpdHJlYScsXG4gIEVFOiAnRXN0b25pYScsXG4gIFNaOiAnRXN3YXRpbmknLFxuICBFVDogJ0V0aGlvcGlhJyxcbiAgRks6ICdGYWxrbGFuZCBJc2xhbmRzIFtNYWx2aW5hc10nLFxuICBGTzogJ0Zhcm9lIElzbGFuZHMnLFxuICBGSjogJ0ZpamknLFxuICBGSTogJ0ZpbmxhbmQnLFxuICBGUjogJ0ZyYW5jZScsXG4gIEdGOiAnRnJlbmNoIEd1aWFuYScsXG4gIFBGOiAnRnJlbmNoIFBvbHluZXNpYScsXG4gIFRGOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyxcbiAgR0E6ICdHYWJvbicsXG4gIEdNOiAnR2FtYmlhJyxcbiAgR0U6ICdHZW9yZ2lhJyxcbiAgREU6ICdHZXJtYW55JyxcbiAgR0g6ICdHaGFuYScsXG4gIEdJOiAnR2licmFsdGFyJyxcbiAgR1I6ICdHcmVlY2UnLFxuICBHTDogJ0dyZWVubGFuZCcsXG4gIEdEOiAnR3JlbmFkYScsXG4gIEdQOiAnR3VhZGVsb3VwZScsXG4gIEdVOiAnR3VhbScsXG4gIEdUOiAnR3VhdGVtYWxhJyxcbiAgR0c6ICdHdWVybnNleScsXG4gIEdOOiAnR3VpbmVhJyxcbiAgR1c6ICdHdWluZWEtQmlzc2F1JyxcbiAgR1k6ICdHdXlhbmEnLFxuICBIVDogJ0hhaXRpJyxcbiAgSE06ICdIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHMnLFxuICBWQTogJ0hvbHkgU2VlJyxcbiAgSE46ICdIb25kdXJhcycsXG4gIEhLOiAnSG9uZyBLb25nJyxcbiAgSFU6ICdIdW5nYXJ5JyxcbiAgSVM6ICdJY2VsYW5kJyxcbiAgSU46ICdJbmRpYScsXG4gIElEOiAnSW5kb25lc2lhJyxcbiAgSVI6ICdJcmFuIChJc2xhbWljIFJlcHVibGljIG9mKScsXG4gIElROiAnSXJhcScsXG4gIElFOiAnSXJlbGFuZCcsXG4gIElNOiAnSXNsZSBvZiBNYW4nLFxuICBJTDogJ0lzcmFlbCcsXG4gIElUOiAnSXRhbHknLFxuICBKTTogJ0phbWFpY2EnLFxuICBKUDogJ0phcGFuJyxcbiAgSkU6ICdKZXJzZXknLFxuICBKTzogJ0pvcmRhbicsXG4gIEtaOiAnS2F6YWtoc3RhbicsXG4gIEtFOiAnS2VueWEnLFxuICBLSTogJ0tpcmliYXRpJyxcbiAgS1A6IFwiVGhlIERlbW9jcmF0aWMgUGVvcGxlJ3MgUmVwdWJsaWMgb2YgS29yZWFcIixcbiAgS1I6ICdLb3JlYScsXG4gIEtXOiAnS3V3YWl0JyxcbiAgS0c6ICdLeXJneXpzdGFuJyxcbiAgTEE6IFwiTGFvIFBlb3BsZSdzIERlbW9jcmF0aWMgUmVwdWJsaWNcIixcbiAgTFY6ICdMYXR2aWEnLFxuICBMQjogJ0xlYmFub24nLFxuICBMUzogJ0xlc290aG8nLFxuICBMUjogJ0xpYmVyaWEnLFxuICBMWTogJ0xpYnlhJyxcbiAgTEk6ICdMaWVjaHRlbnN0ZWluJyxcbiAgTFQ6ICdMaXRodWFuaWEnLFxuICBMVTogJ0x1eGVtYm91cmcnLFxuICBNTzogJ01hY2FvJyxcbiAgTUc6ICdNYWRhZ2FzY2FyJyxcbiAgTVc6ICdNYWxhd2knLFxuICBNWTogJ01hbGF5c2lhJyxcbiAgTVY6ICdNYWxkaXZlcycsXG4gIE1MOiAnTWFsaScsXG4gIE1UOiAnTWFsdGEnLFxuICBNSDogJ01hcnNoYWxsIElzbGFuZHMnLFxuICBNUTogJ01hcnRpbmlxdWUnLFxuICBNUjogJ01hdXJpdGFuaWEnLFxuICBNVTogJ01hdXJpdGl1cycsXG4gIFlUOiAnTWF5b3R0ZScsXG4gIE1YOiAnTWV4aWNvJyxcbiAgRk06ICdNaWNyb25lc2lhJyxcbiAgTUQ6ICdNb2xkb3ZhJyxcbiAgTUM6ICdNb25hY28nLFxuICBNTjogJ01vbmdvbGlhJyxcbiAgTUU6ICdNb250ZW5lZ3JvJyxcbiAgTVM6ICdNb250c2VycmF0JyxcbiAgTUE6ICdNb3JvY2NvJyxcbiAgTVo6ICdNb3phbWJpcXVlJyxcbiAgTU06ICdNeWFubWFyJyxcbiAgTkE6ICdOYW1pYmlhJyxcbiAgTlI6ICdOYXVydScsXG4gIE5QOiAnTmVwYWwnLFxuICBOTDogJ05ldGhlcmxhbmRzJyxcbiAgTkM6ICdOZXcgQ2FsZWRvbmlhJyxcbiAgTlo6ICdOZXcgWmVhbGFuZCcsXG4gIE5JOiAnTmljYXJhZ3VhJyxcbiAgTkU6ICdOaWdlcicsXG4gIE5HOiAnTmlnZXJpYScsXG4gIE5VOiAnTml1ZScsXG4gIE5GOiAnTm9yZm9sayBJc2xhbmQnLFxuICBNUDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsXG4gIE5POiAnTm9yd2F5JyxcbiAgT006ICdPbWFuJyxcbiAgUEs6ICdQYWtpc3RhbicsXG4gIFBXOiAnUGFsYXUnLFxuICBQUzogJ1BhbGVzdGluZSwgU3RhdGUgb2YnLFxuICBQQTogJ1BhbmFtYScsXG4gIFBHOiAnUGFwdWEgTmV3IEd1aW5lYScsXG4gIFBZOiAnUGFyYWd1YXknLFxuICBQRTogJ1BlcnUnLFxuICBQSDogJ1BoaWxpcHBpbmVzJyxcbiAgUE46ICdQaXRjYWlybicsXG4gIFBMOiAnUG9sYW5kJyxcbiAgUFQ6ICdQb3J0dWdhbCcsXG4gIFBSOiAnUHVlcnRvIFJpY28nLFxuICBRQTogJ1FhdGFyJyxcbiAgTUs6ICdSZXB1YmxpYyBvZiBOb3J0aCBNYWNlZG9uaWEnLFxuICBSTzogJ1JvbWFuaWEnLFxuICBSVTogJ1J1c3NpYW4gRmVkZXJhdGlvbicsXG4gIFJXOiAnUndhbmRhJyxcbiAgUkU6ICdSw6l1bmlvbicsXG4gIEJMOiAnU2FpbnQgQmFydGjDqWxlbXknLFxuICBTSDogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJyxcbiAgS046ICdTYWludCBLaXR0cyBhbmQgTmV2aXMnLFxuICBMQzogJ1NhaW50IEx1Y2lhJyxcbiAgTUY6ICdTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KScsXG4gIFBNOiAnU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvbicsXG4gIFZDOiAnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnLFxuICBXUzogJ1NhbW9hJyxcbiAgU006ICdTYW4gTWFyaW5vJyxcbiAgU1Q6ICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnLFxuICBTQTogJ1NhdWRpIEFyYWJpYScsXG4gIFNOOiAnU2VuZWdhbCcsXG4gIFJTOiAnU2VyYmlhJyxcbiAgU0M6ICdTZXljaGVsbGVzJyxcbiAgU0w6ICdTaWVycmEgTGVvbmUnLFxuICBTRzogJ1NpbmdhcG9yZScsXG4gIFNYOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KScsXG4gIFNLOiAnU2xvdmFraWEnLFxuICBTSTogJ1Nsb3ZlbmlhJyxcbiAgU0I6ICdTb2xvbW9uIElzbGFuZHMnLFxuICBTTzogJ1NvbWFsaWEnLFxuICBaQTogJ1NvdXRoIEFmcmljYScsXG4gIEdTOiAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnLFxuICBTUzogJ1NvdXRoIFN1ZGFuJyxcbiAgRVM6ICdTcGFpbicsXG4gIExLOiAnU3JpIExhbmthJyxcbiAgU0Q6ICdTdWRhbicsXG4gIFNSOiAnU3VyaW5hbWUnLFxuICBTSjogJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nLFxuICBTRTogJ1N3ZWRlbicsXG4gIENIOiAnU3dpdHplcmxhbmQnLFxuICBTWTogJ1N5cmlhbiBBcmFiIFJlcHVibGljJyxcbiAgVFc6ICdUYWl3YW4nLFxuICBUSjogJ1RhamlraXN0YW4nLFxuICBUWjogJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLFxuICBUSDogJ1RoYWlsYW5kJyxcbiAgVEw6ICdUaW1vci1MZXN0ZScsXG4gIFRHOiAnVG9nbycsXG4gIFRLOiAnVG9rZWxhdScsXG4gIFRPOiAnVG9uZ2EnLFxuICBUVDogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLFxuICBUTjogJ1R1bmlzaWEnLFxuICBUUjogJ1R1cmtleScsXG4gIFRNOiAnVHVya21lbmlzdGFuJyxcbiAgVEM6ICdUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHMnLFxuICBUVjogJ1R1dmFsdScsXG4gIFVHOiAnVWdhbmRhJyxcbiAgVUE6ICdVa3JhaW5lJyxcbiAgQUU6ICdVbml0ZWQgQXJhYiBFbWlyYXRlcycsXG4gIEdCOiAnVW5pdGVkIEtpbmdkb20nLFxuICBVTTogJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcycsXG4gIFVTOiAnVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhJyxcbiAgVVk6ICdVcnVndWF5JyxcbiAgVVo6ICdVemJla2lzdGFuJyxcbiAgVlU6ICdWYW51YXR1JyxcbiAgVkU6ICdWZW5lenVlbGEnLFxuICBWTjogJ1ZpZXQgTmFtJyxcbiAgVkc6ICdWaXJnaW4gSXNsYW5kcyAoQnJpdGlzaCknLFxuICBWSTogJ1ZpcmdpbiBJc2xhbmRzIChVLlMuKScsXG4gIFdGOiAnV2FsbGlzIGFuZCBGdXR1bmEnLFxuICBFSDogJ1dlc3Rlcm4gU2FoYXJhJyxcbiAgWUU6ICdZZW1lbicsXG4gIFpNOiAnWmFtYmlhJyxcbiAgWlc6ICdaaW1iYWJ3ZScsXG4gIEFYOiAnw4VsYW5kIElzbGFuZHMnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY291bnRyeUNvZGVzO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTmV3RWxlbWVudChcbiAgdHlwZSxcbiAgY2xhc3NlcyA9IG51bGwsXG4gIHRleHQgPSBudWxsLFxuICBhdHRyaWJ1dGVzID0gbnVsbCxcbikge1xuICBjb25zdCBjcmVhdGVkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cbiAgaWYgKGNsYXNzZXMpIHtcbiAgICBjcmVhdGVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICB9XG5cbiAgaWYgKHRleHQpIHtcbiAgICBjcmVhdGVkRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGNyZWF0ZWRFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZWRFbGVtZW50O1xufVxuIiwiY29uc3Qgd2VhdGhlckljb25zID0ge1xuICAnMDFkJzogJ2NsZWFyLWRheScsXG4gICcwMW4nOiAnY2xlYXItbmlnaHQnLFxuICAnMDJkJzogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgJzAybic6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0JyxcbiAgJzAzZCc6ICdjbG91ZHknLFxuICAnMDNuJzogJ2Nsb3VkeScsXG4gICcwNGQnOiAnb3ZlcmNhc3QnLFxuICAnMDRuJzogJ292ZXJjYXN0JyxcbiAgJzA5ZCc6ICdvdmVyY2FzdC1yYWluJyxcbiAgJzA5bic6ICdvdmVyY2FzdC1yYWluJyxcbiAgJzEwZCc6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgJzEwbic6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICAnMTFkJzogJ3RodW5kZXJzdG9ybXMnLFxuICAnMTFuJzogJ3RodW5kZXJzdG9ybXMnLFxuICAnMTNkJzogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICAnMTNuJzogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICAnNTBkJzogJ2ZvZy1kYXknLFxuICAnNTBuJzogJ2ZvZy1uaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVySWNvbnM7XG5cbmV4cG9ydCBjb25zdCBmdWxsTWFwRGF5ID0ge1xuICAyMDA6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjAxOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIwMjogJ3RodW5kZXJzdG9ybXMtZGF5LW92ZXJjYXN0LXJhaW4nLFxuICAyMTA6ICd0aHVuZGVyc3Rvcm1zLWRheScsXG4gIDIxMTogJ3RodW5kZXJzdG9ybXMnLFxuICAyMTI6ICd0aHVuZGVyc3Rvcm1zLW92ZXJjYXN0JyxcbiAgMjIxOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIzMDogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAyMzE6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjMyOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDMwMDogJ3BhcnRseS1jbG91ZHktZGF5LWRyaXp6bGUnLFxuICAzMDE6ICdwYXJ0bHktY2xvdWR5LWRheS1kcml6emxlJyxcbiAgMzAyOiAnb3ZlcmNhc3QtZGF5LWRyaXp6bGUnLFxuICAzMTA6ICdvdmVyY2FzdC1kYXktZHJpenpsZScsXG4gIDMxMTogJ2RyaXp6bGUnLFxuICAzMTI6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzEzOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxNDogJ292ZXJjYXN0LXJhaW4nLFxuICAzMjE6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTAwOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gIDUwMTogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MDI6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUwMzogJ292ZXJjYXN0LWRheS1yYWluJyxcbiAgNTA0OiAnb3ZlcmNhc3QtcmFpbicsXG4gIDUxMTogJ3NsZWV0JyxcbiAgNTIwOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gIDUyMTogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MjI6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUzMTogJ292ZXJjYXN0LWRheS1yYWluJyxcbiAgNjAwOiAncGFydGx5LWNsb3VkeS1kYXktc25vdycsXG4gIDYwMTogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MDI6ICdvdmVyY2FzdC1kYXktc25vdycsXG4gIDYxMTogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjEyOiAncGFydGx5LWNsb3VkeS1kYXktc2xlZXQnLFxuICA2MTM6ICdvdmVyY2FzdC1kYXktc2xlZXQnLFxuICA2MTU6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYxNjogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjIwOiAncGFydGx5LWNsb3VkeS1kYXktc25vdycsXG4gIDYyMTogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MjI6ICdvdmVyY2FzdC1zbm93JyxcbiAgNzAxOiAnbWlzdCcsXG4gIDcxMTogJ3BhcnRseS1jbG91ZHktZGF5LXNtb2tlJyxcbiAgNzIxOiAnaGF6ZS1kYXknLFxuICA3MzE6ICdkdXN0LWRheScsXG4gIDc0MTogJ2ZvZy1kYXknLFxuICA3NTE6ICdkdXN0LWRheScsXG4gIDc2MTogJ2R1c3QtZGF5JyxcbiAgNzYyOiAnb3ZlcmNhc3Qtc21va2UnLFxuICA3NzE6ICd3aW5kJyxcbiAgNzgxOiAndG9ybmFkbycsXG4gIDgwMDogJ2NsZWFyLWRheScsXG4gIDgwMTogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgODAyOiAncGFydGx5LWNsb3VkeS1kYXknLFxuICA4MDM6ICdvdmVyY2FzdC1kYXknLFxuICA4MDQ6ICdvdmVyY2FzdC1kYXknLFxufTtcblxuZXhwb3J0IGNvbnN0IGZ1bGxNYXBOaWdodCA9IHtcbiAgMjAwOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluJyxcbiAgMjAxOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluJyxcbiAgMjAyOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1vdmVyY2FzdC1yYWluJyxcbiAgMjEwOiAndGh1bmRlcnN0b3Jtcy1uaWdodCcsXG4gIDIxMTogJ3RodW5kZXJzdG9ybXMnLFxuICAyMTI6ICd0aHVuZGVyc3Rvcm1zLW92ZXJjYXN0JyxcbiAgMjIxOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIzMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIzMTogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIzMjogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDMwMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZScsXG4gIDMwMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZScsXG4gIDMwMjogJ292ZXJjYXN0LW5pZ2h0LWRyaXp6bGUnLFxuICAzMTA6ICdvdmVyY2FzdC1uaWdodC1kcml6emxlJyxcbiAgMzExOiAnZHJpenpsZScsXG4gIDMxMjogJ292ZXJjYXN0LWRyaXp6bGUnLFxuICAzMTM6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzE0OiAnb3ZlcmNhc3QtcmFpbicsXG4gIDMyMTogJ292ZXJjYXN0LXJhaW4nLFxuICA1MDA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MDI6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNTAzOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDUwNDogJ292ZXJjYXN0LXJhaW4nLFxuICA1MTE6ICdzbGVldCcsXG4gIDUyMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbicsXG4gIDUyMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbicsXG4gIDUyMjogJ292ZXJjYXN0LW5pZ2h0LXJhaW4nLFxuICA1MzE6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNjAwOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbm93JyxcbiAgNjAxOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbm93JyxcbiAgNjAyOiAnb3ZlcmNhc3QtbmlnaHQtc25vdycsXG4gIDYxMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQnLFxuICA2MTI6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjEzOiAnb3ZlcmNhc3QtbmlnaHQtc2xlZXQnLFxuICA2MTU6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjE2OiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYyMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYyMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYyMjogJ292ZXJjYXN0LXNub3cnLFxuICA3MDE6ICdtaXN0JyxcbiAgNzExOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbW9rZScsXG4gIDcyMTogJ2hhemUtbmlnaHQnLFxuICA3MzE6ICdkdXN0LW5pZ2h0JyxcbiAgNzQxOiAnZm9nLW5pZ2h0JyxcbiAgNzUxOiAnZHVzdC1uaWdodCcsXG4gIDc2MTogJ2R1c3QtbmlnaHQnLFxuICA3NjI6ICdvdmVyY2FzdC1zbW9rZScsXG4gIDc3MTogJ3dpbmQnLFxuICA3ODE6ICd0b3JuYWRvJyxcbiAgODAwOiAnY2xlYXItbmlnaHQnLFxuICA4MDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0JyxcbiAgODAyOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gIDgwMzogJ292ZXJjYXN0LW5pZ2h0JyxcbiAgODA0OiAnb3ZlcmNhc3QtbmlnaHQnLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9jc3Mvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IGNyZWF0ZU5ld0VsZW1lbnQgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBjb3VudHJ5Q29kZXMgZnJvbSBcIi4vY291bnRyeUNvZGVzXCI7XG5pbXBvcnQge1xuICBnZXRXZWF0aGVyLFxuICBnZXRXZWF0aGVyU2ltcGxlLFxuICBnZXRMb2NhdGlvbkZyb21JUCxcbiAgZ2V0QWRkcmVzc0Zyb21Db29yZHMsXG59IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHdlYXRoZXJJY29ucyBmcm9tIFwiLi93ZWF0aGVySWNvbnNcIjtcblxuLy8gU2V0IHVwIHBhZ2VcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbmNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJkaXZcIiwgW1wiY29udGFpbmVyXCJdKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGFpbmVyO1xuXG4vLyBTZXQgdXAgc2luZ2xldG9uIHRvIGhvbGQgZGlzcGxheSBkYXRhXG5jb25zdCBsb2NhdGlvbiA9IHtcbiAgbGF0aXR1ZGU6IFwiXCIsXG4gIGxvbmdpdHVkZTogXCJcIixcbiAgbWFpbldlYXRoZXI6IFwiV2VhdGhlciBVbmF2YWlsYWJsZVwiLFxuICB3ZWF0aGVyRGVzY3JpcHRpb246IFwiXCIsXG4gIHdlYXRoZXJJY29uOiBcIlwiLFxuICBjdXJyZW50VGVtcDogXCJcIixcbiAgZmVlbHNMaWtlOiBcIlwiLFxuICBjaXR5OiBcIlwiLFxuICBzdGF0ZTogXCJcIixcbiAgY291bnRyeUNvZGU6IFwiXCIsXG4gIGNvdW50cnk6IFwiXCIsXG59O1xuXG4vLyBQb3B1bGF0ZSBkYXRhXG5mdW5jdGlvbiBwcm9jZXNzUmV0dXJuZWRJbmZvKHdlYXRoZXJJbmZvKSB7XG4gIFtcbiAgICBsb2NhdGlvbi5sYXRpdHVkZSxcbiAgICBsb2NhdGlvbi5sb25naXR1ZGUsXG4gICAgbG9jYXRpb24ubWFpbldlYXRoZXIsXG4gICAgbG9jYXRpb24ud2VhdGhlckRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uLndlYXRoZXJJY29uLFxuICAgIGxvY2F0aW9uLmN1cnJlbnRUZW1wLFxuICAgIGxvY2F0aW9uLmZlZWxzTGlrZSxcbiAgICBsb2NhdGlvbi5jaXR5LFxuICAgIGxvY2F0aW9uLmNvdW50cnlDb2RlLFxuICAgIGxvY2F0aW9uLnRpbWUsXG4gIF0gPSB3ZWF0aGVySW5mbztcbiAgbG9jYXRpb24uY291bnRyeSA9IGNvdW50cnlDb2Rlc1tsb2NhdGlvbi5jb3VudHJ5Q29kZV07XG4gIGNvbnNvbGUubG9nKHsgbG9jYXRpb24gfSk7XG59XG5cbi8vIFNldCB1cCBET00gKGNvdWxkbid0IGdldCB0aGlzIHdvcmtpbmcgd2l0aCBtb2R1bGUgZXhwb3J0cylcblxuLy8gSW5wdXQgc2VhcmNoIGJhclxuY29uc3QgZm9ybSA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJmb3JtXCIpO1xuY29uc3QgaW5wdXQgPSBjcmVhdGVOZXdFbGVtZW50KFwiaW5wdXRcIiwgbnVsbCwgbnVsbCwge1xuICB0eXBlOiBcInNlYXJjaFwiLFxuICBwbGFjZWhvbGRlcjogXCJTZWFyY2ggQ2l0eVwiLFxufSk7XG5cbmZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2KSA9PiB7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIHBhZ2VMb2FkKGlucHV0LnZhbHVlKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHBvcHVsYXRlV2VhdGhlckNhcmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5cbi8vIEluZm8gZGlzcGxheSBjYXJkXG5jb25zdCB0ZW1wZXJhdHVyZU1vZGUgPSBcIkNlbHNpdXNcIjtcbmNvbnN0IGluZm9DYXJkID0gY3JlYXRlTmV3RWxlbWVudChcImRpdlwiLCBbXCJpbmZvQ2FyZFwiXSk7XG5cbmNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5jb25zdCBkYXRlVmFsdWUgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKFtdLCB7XG4gIHllYXI6IFwibnVtZXJpY1wiLFxuICBtb250aDogXCJsb25nXCIsXG4gIGRheTogXCJudW1lcmljXCIsXG59KTtcbmNvbnN0IHRpbWVWYWx1ZSA9IG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcbiAgaG91cjogXCIyLWRpZ2l0XCIsXG4gIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG59KTtcblxuY29uc3QgY3VycmVudERhdGVUaW1lID0gY3JlYXRlTmV3RWxlbWVudChcbiAgXCJwXCIsXG4gIFtcImN1cnJlbnRUaW1lXCJdLFxuICBgJHtkYXRlVmFsdWV9LCAke3RpbWVWYWx1ZX1gXG4pO1xuXG5pbmZvQ2FyZC5hcHBlbmRDaGlsZChjdXJyZW50RGF0ZVRpbWUpO1xuXG5jb25zdCBpbmZvV3JhcHBlciA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJkaXZcIiwgW1wiaW5mb1dyYXBwZXJcIl0pO1xuY29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9XcmFwcGVyKTtcblxuY29uc3QgY2l0eUhlYWRpbmcgPSBjcmVhdGVOZXdFbGVtZW50KFwiaDFcIiwgW1wiY2l0eVwiXSk7XG5jb25zdCBjb3VudHJ5SGVhZGluZyA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJoMlwiLCBbXCJjb3VudHJ5XCJdKTtcblxuY29uc3QgdGVtcExpbmUgPSBjcmVhdGVOZXdFbGVtZW50KFwiZGl2XCIsIFtcInRlbXBCb3hcIl0pO1xuY29uc3QgdGVtcGVyYXR1cmVNYWluID0gY3JlYXRlTmV3RWxlbWVudChcInBcIiwgW1widGVtcE1haW5cIl0pO1xuY29uc3QgZGVncmVlTm90YXRpb24gPSBjcmVhdGVOZXdFbGVtZW50KFwicFwiLCBbXCJkZWdyZWVcIl0pO1xuY29uc3QgZmVlbHNMaWtlID0gY3JlYXRlTmV3RWxlbWVudChcInBcIiwgW1wiZmVlbHNMaWtlXCJdKTtcblxudGVtcExpbmUuYXBwZW5kQ2hpbGQodGVtcGVyYXR1cmVNYWluKTtcbnRlbXBMaW5lLmFwcGVuZENoaWxkKGRlZ3JlZU5vdGF0aW9uKTtcblxuaW5mb0NhcmQuYXBwZW5kKGNpdHlIZWFkaW5nLCBjb3VudHJ5SGVhZGluZywgdGVtcExpbmUsIGZlZWxzTGlrZSk7XG5cbmluZm9XcmFwcGVyLmFwcGVuZENoaWxkKGluZm9DYXJkKTtcblxuY29uc3QgaWNvbkNhcmQgPSBjcmVhdGVOZXdFbGVtZW50KFwiZGl2XCIsIFtcImljb25DYXJkXCJdKTtcbmNvbnN0IGljb24gPSBjcmVhdGVOZXdFbGVtZW50KFwiaW1nXCIsIFtcImljb25cIl0pO1xuY29uc3QgaWNvbkxhYmVsID0gY3JlYXRlTmV3RWxlbWVudChcInBcIiwgW1wiaWNvbi1sYWJlbFwiXSk7XG5cbmljb25DYXJkLmFwcGVuZChpY29uLCBpY29uTGFiZWwpO1xuaW5mb1dyYXBwZXIuYXBwZW5kQ2hpbGQoaWNvbkNhcmQpO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVdlYXRoZXJDYXJkKCkge1xuICAvLyBPbmx5IHRoZSBvbmUtY2FsbCBBUEkgcmV0dXJucyBuYW1lZCB0aW1lem9uZTtcbiAgLy8gVGhlIHNpbXBsZSBjYWxsIHJldHVybnMgYSB0aW1lem9uZSBvZmZzZXQ7IG5vdCBzdXJlIGhvdyB0byB1c2UgdGhhdCB0byBkaXNwbGF5IGEgbG9jYWwgdGltZVxuXG4gIC8vIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIC8vIGNvbnN0IGxvY2F0aW9uRGF0ZSA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoW10sIHtcbiAgLy8gICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgLy8gICBtb250aDogXCJsb25nXCIsXG4gIC8vICAgZGF5OiBcIm51bWVyaWNcIixcbiAgLy8gICB0aW1lWm9uZTogbG9jYXRpb24udGltZVpvbmUsXG4gIC8vIH0pO1xuICAvLyBjb25zdCBsb2NhdGlvblRpbWUgPSBub3cudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7XG4gIC8vICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gIC8vICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgLy8gICB0aW1lWm9uZTogbG9jYXRpb24udGltZVpvbmUsXG4gIC8vIH0pO1xuXG4gIC8vIGNvbnN0IGxvY2F0aW9uRGF0ZVRpbWUgPSBgJHtsb2NhdGlvbkRhdGV9LCAke2xvY2F0aW9uVGltZX1gO1xuICAvLyBjdXJyZW50RGF0ZVRpbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGVUaW1lO1xuXG4gIGNpdHlIZWFkaW5nLnRleHRDb250ZW50ID0gbG9jYXRpb24uY2l0eTtcblxuICBpZiAobG9jYXRpb24uc3RhdGUpIHtcbiAgICBjb3VudHJ5SGVhZGluZy50ZXh0Q29udGVudCA9IGAke2xvY2F0aW9uLnN0YXRlfSwgJHtsb2NhdGlvbi5jb3VudHJ5fWA7XG4gIH0gZWxzZSB7XG4gICAgY291bnRyeUhlYWRpbmcudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5jb3VudHJ5O1xuICB9XG5cbiAgaWYgKHRlbXBlcmF0dXJlTW9kZSA9PT0gXCJDZWxzaXVzXCIpIHtcbiAgICB0ZW1wZXJhdHVyZU1haW4udGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uY3VycmVudFRlbXApXG4gICAgKTtcbiAgICBkZWdyZWVOb3RhdGlvbi50ZXh0Q29udGVudCA9IFwiwrBDXCI7XG4gICAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uZmVlbHNMaWtlKVxuICAgICl9wrBgO1xuICB9IGVsc2Uge1xuICAgIHRlbXBlcmF0dXJlTWFpbi50ZXh0Q29udGVudCA9IGNvbnZlcnRGYWhyZWluaGVpdChsb2NhdGlvbi5jdXJyZW50VGVtcCk7XG4gICAgZGVncmVlTm90YXRpb24udGV4dENvbnRlbnQgPSBcIsKwRlwiO1xuICAgIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7TWF0aC5yb3VuZChcbiAgICAgIGNvbnZlcnRGYWhyZWluaGVpdChsb2NhdGlvbi5mZWVsc0xpa2UpXG4gICAgKX3CsGA7XG4gIH1cblxuICBjb25zdCBpY29uVVJMID0gbWF0Y2hXZWF0aGVyVG9JY29uKCk7XG4gIGljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIGljb25VUkwpO1xuICBpY29uTGFiZWwudGV4dENvbnRlbnQgPSBsb2NhdGlvbi53ZWF0aGVyRGVzY3JpcHRpb247XG59XG5cbmZ1bmN0aW9uIG1hdGNoV2VhdGhlclRvSWNvbigpIHtcbiAgcmV0dXJuIGAuLi9zcmMvc3ZnLyR7d2VhdGhlckljb25zW2xvY2F0aW9uLndlYXRoZXJJY29uXX0uc3ZnYDtcbn1cblxuZnVuY3Rpb24gY29udmVydENlbHNpdXMoS2VsdmluKSB7XG4gIHJldHVybiBLZWx2aW4gLSAyNzMuMTU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRGYWhyZWluaGVpdChLZWx2aW4pIHtcbiAgcmV0dXJuICgoS2VsdmluIC0gMjczLjE1KSAqIDkpIC8gNSArIDMyO1xufVxuXG4vLyBSdW4gb24gcGFnZSBsb2FkIGFuZCBvbiBmb3JtIHN1Ym1pdFxuYXN5bmMgZnVuY3Rpb24gcGFnZUxvYWQoaW5wdXQpIHtcbiAgY29uc3QgcmV0dXJuZWRJbmZvID0gYXdhaXQgZ2V0V2VhdGhlclNpbXBsZShpbnB1dCk7XG4gIHByb2Nlc3NSZXR1cm5lZEluZm8ocmV0dXJuZWRJbmZvKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFnZUxvYWRDb3JkcyhsYXQsIGxvbikge1xuICBjb25zdCByZXR1cm5lZEluZm8gPSBhd2FpdCBnZXRXZWF0aGVyKGxhdCwgbG9uKTtcbiAgcHJvY2Vzc1JldHVybmVkSW5mbyhyZXR1cm5lZEluZm8pO1xufVxuXG4vLyBBdHRlbXB0IHRvIGdldCBhIGxvY2F0aW9uIGZyb20gSVBcbi8vIFRoaXMgd29uJ3QgZXZlciB3b3JrIGxvY2FsbHkgdGhvdWdoXG4oYXN5bmMgZnVuY3Rpb24gKCkge1xuICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGFzeW5jIChwb3NpdGlvbikgPT4ge1xuICAgIHVzZVVzZXJMb2NhdGlvbihwb3NpdGlvbik7XG4gIH0sIHVzZURlZmF1bHRMb2NhdGlvbik7XG59KSgpO1xuXG5hc3luYyBmdW5jdGlvbiB1c2VVc2VyTG9jYXRpb24ocG9zaXRpb24pIHtcbiAgY29uc3QgcG9zaXRpb25EYXRhID0gcG9zaXRpb247XG5cbiAgbG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxhdGl0dWRlO1xuICBsb2NhdGlvbi5sb25naXR1ZGUgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxvbmdpdHVkZTtcblxuICBjb25zdCBhZGRyZXNzSW5mbyA9IGF3YWl0IGdldEFkZHJlc3NGcm9tQ29vcmRzKFxuICAgIGxvY2F0aW9uLmxhdGl0dWRlLFxuICAgIGxvY2F0aW9uLmxvbmdpdHVkZVxuICApO1xuICBbbG9jYXRpb24uc3RhdGUsIGxvY2F0aW9uLmNvdW50cnksIGxvY2F0aW9uLmNvdW50cnlDb2RlLCBsb2NhdGlvbi5jaXR5XSA9XG4gICAgYWRkcmVzc0luZm87XG4gIFxuICBsb2NhdGlvbi5zdGF0ZSA9ICcnOyAvLyB1bnRpbCBzd2l0Y2hpbmcgdG8gdGhlIE9uZSBDYWxsIEFQSSBmb3IgZm9ybSBzdWJtaXRcblxuICBwYWdlTG9hZChsb2NhdGlvbi5jaXR5KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHBvcHVsYXRlV2VhdGhlckNhcmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1c2VEZWZhdWx0TG9jYXRpb24oKSB7XG4gIHBhZ2VMb2FkKFwiVmFuY291dmVyXCIpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgcG9wdWxhdGVXZWF0aGVyQ2FyZCgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=