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
/* harmony export */   "getLocationFromIP": () => (/* binding */ getLocationFromIP),
/* harmony export */   "getLocationFromUserQuery": () => (/* binding */ getLocationFromUserQuery)
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

// Coordinates from Geolocation API (pop-up for user)
function getLocationFromUserQuery() {
  navigator.geolocation.getCurrentPosition((position) => position);
}


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
const body = document.querySelector('body');
const container = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['container']);
body.appendChild(container);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (container);

// Set up singleton to hold display data
const location = {
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
const form = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('form');
const input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('input', null, null, {
  type: 'search',
  placeholder: 'Search City',
});

form.appendChild(input);
container.appendChild(form);

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  pageLoad(input.value)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
      console.log({ location });
    });
});

// Info display card
const temperatureMode = 'Celsius';
const infoCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['infoCard']);

const now = new Date();
const dateValue = now.toLocaleDateString([], {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const timeValue = now.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});

const currentDateTime = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(
  'p',
  ['currentTime'],
  `${dateValue}, ${timeValue}`,
);

infoCard.appendChild(currentDateTime);

const infoWrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['infoWrapper']);
container.appendChild(infoWrapper);

const cityHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('h1', ['city']);
const countryHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('h2', ['country']);

const tempLine = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['tempBox']);
const temperatureMain = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['tempMain']);
const degreeNotation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['degree']);
const feelsLike = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['feelsLike']);

tempLine.appendChild(temperatureMain);
tempLine.appendChild(degreeNotation);

infoCard.append(cityHeading, countryHeading, tempLine, feelsLike);

infoWrapper.appendChild(infoCard);

const iconCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['iconCard']);
const icon = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('img', ['icon']);
const iconLabel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['icon-label']);

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

  if (temperatureMode === 'Celsius') {
    temperatureMain.textContent = Math.round(
      convertCelsius(location.currentTemp),
    );
    degreeNotation.textContent = '°C';
    feelsLike.textContent = `Feels like ${Math.round(
      convertCelsius(location.feelsLike),
    )}°`;
  } else {
    temperatureMain.textContent = convertFahreinheit(location.currentTemp);
    degreeNotation.textContent = '°F';
    feelsLike.textContent = `Feels like ${Math.round(
      convertFahreinheit(location.feelsLike),
    )}°`;
  }

  const iconURL = matchWeatherToIcon();
  icon.setAttribute('src', iconURL);
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

// Start with default location Vancouver
pageLoad('Vancouver')
  .then(() => {
    populateWeatherCard();
  })
  .catch((err) => {
    console.log(err);
    console.log({ location });
  });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FPO0FBQ1A7QUFDQTtBQUNBLDZEQUE2RCxTQUFTLE9BQU8sVUFBVTtBQUN2RixRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EseURBQXlELEtBQUs7QUFDOUQsTUFBTSxjQUFjO0FBQ3BCO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLHNEQUFzRCxZQUFZO0FBQ2xFLFFBQVEsY0FBYztBQUN0QjtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0IsWUFBWSxPQUFPO0FBQ25CLFlBQVksUUFBUTtBQUNwQixZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHVFQUF1RSxTQUFTLE9BQU8sVUFBVTtBQUNqRyxRQUFRLGNBQWM7QUFDdEI7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0EsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOVBiO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7QUFFckI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUIsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jc3Mvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jb3VudHJ5Q29kZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy93ZWF0aGVySWNvbnMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9OGYxMmRmYWIwZGUzODA5OWUwYjVhN2EyZGRjNDVlMzdgLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlci5qc29uKCk7XG4gICAgY29uc29sZS5sb2coeyB3ZWF0aGVyRGF0YSB9KTtcbiAgICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHdlYXRoZXJEZXNjID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb247XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXA7XG4gICAgY29uc3QgZmVlbHNMaWtlID0gd2VhdGhlckRhdGEuY3VycmVudC5mZWVsc19saWtlO1xuICAgIHJldHVybiBbbWFpbldlYXRoZXIsIHdlYXRoZXJEZXNjLCB3ZWF0aGVySWNvbiwgY3VycmVudFRlbXAsIGZlZWxzTGlrZV07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlclNpbXBsZShjaXR5KSB7XG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICApO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICBjb25zb2xlLmxvZyh7IHdlYXRoZXJEYXRhIH0pO1xuICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgY29uc3Qgd2VhdGhlckljb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb247XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICBjb25zdCBmZWVsc0xpa2UgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIGNvbnN0IGxhdGl0dWRlID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICBjb25zdCBsb25naXR1ZGUgPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG4gIGNvbnN0IGNpdHlOYW1lID0gd2VhdGhlckRhdGEubmFtZTtcbiAgY29uc3QgY291bnRyeUNvZGUgPSB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeTtcbiAgY29uc3QgdGltZSA9IHdlYXRoZXJEYXRhLnRpbWV6b25lO1xuICByZXR1cm4gW1xuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBtYWluV2VhdGhlcixcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgd2VhdGhlckljb24sXG4gICAgY3VycmVudFRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGNpdHlOYW1lLFxuICAgIGNvdW50cnlDb2RlLFxuICAgIHRpbWUsXG4gIF07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkFuZEFkZHJlc3NGcm9tSW5wdXQoaW5wdXRTdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvc2VhcmNoP3E9JHtpbnB1dFN0cmluZ30mZm9ybWF0PWpzb24mbGltaXQ9MWAsXG4gICAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICAgICk7XG4gICAgY29uc3QgYWRkcmVzc0RhdGEgPSBhd2FpdCBhZGRyZXNzLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh7IGFkZHJlc3NEYXRhIH0pO1xuICAgIGNvbnN0IHsgY2l0eSB9ID0gYWRkcmVzc0RhdGEuYWRkcmVzcztcbiAgICBjb25zdCB7IHN0YXRlIH0gPSBhZGRyZXNzRGF0YS5hZGRyZXNzO1xuICAgIGNvbnN0IHsgY291bnRyeSB9ID0gYWRkcmVzc0RhdGEuYWRkcmVzcztcbiAgICBjb25zdCBsYXRpdHVkZSA9IGFkZHJlc3NEYXRhLmxhdDtcbiAgICBjb25zdCBsb25naXR1ZGUgPSBhZGRyZXNzRGF0YS5sb247XG4gICAgcmV0dXJuIFtjaXR5LCBzdGF0ZSwgY291bnRyeSwgbGF0aXR1ZGUsIGxvbmdpdHVkZV07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKHsgZXJyIH0pO1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuLy8gQ29udmVydCBnZW9sb2NhdGlvbiBjb29yZGluYXRlcyB0byBhZGRyZXNzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkcmVzc0Zyb21Db29yZHMobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICB0cnkge1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy9yZXZlcnNlP2Zvcm1hdD1qc29udjImbGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX1gLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IGFkZHJlc3NEYXRhID0gYXdhaXQgYWRkcmVzcy5qc29uKCk7XG4gICAgY29uc29sZS5sb2coeyBhZGRyZXNzRGF0YSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG4vLyBHZW9sb2NhdGlvbiB2aWEgSVAgKGZpcnN0IGNob2ljZSlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMb2NhdGlvbkZyb21JUCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2NhdGlvbklQID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9pcC1hcGkuY29tL2pzb24vJywgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgbG9jYXRpb25JUERhdGEgPSBhd2FpdCBsb2NhdGlvbklQLmpzb24oKTtcbiAgICByZXR1cm4gbG9jYXRpb25JUERhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuLy8gQ29vcmRpbmF0ZXMgZnJvbSBHZW9sb2NhdGlvbiBBUEkgKHBvcC11cCBmb3IgdXNlcilcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbkZyb21Vc2VyUXVlcnkoKSB7XG4gIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiBwb3NpdGlvbik7XG59XG4iLCIvLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2luY3JlZGltaWtlLzE0Njk4MTRcblxuY29uc3QgY291bnRyeUNvZGVzID0ge1xuICBBRjogJ0FmZ2hhbmlzdGFuJyxcbiAgQUw6ICdBbGJhbmlhJyxcbiAgRFo6ICdBbGdlcmlhJyxcbiAgQVM6ICdBbWVyaWNhbiBTYW1vYScsXG4gIEFEOiAnQW5kb3JyYScsXG4gIEFPOiAnQW5nb2xhJyxcbiAgQUk6ICdBbmd1aWxsYScsXG4gIEFROiAnQW50YXJjdGljYScsXG4gIEFHOiAnQW50aWd1YSBhbmQgQmFyYnVkYScsXG4gIEFSOiAnQXJnZW50aW5hJyxcbiAgQU06ICdBcm1lbmlhJyxcbiAgQVc6ICdBcnViYScsXG4gIEFVOiAnQXVzdHJhbGlhJyxcbiAgQVQ6ICdBdXN0cmlhJyxcbiAgQVo6ICdBemVyYmFpamFuJyxcbiAgQlM6ICdCYWhhbWFzJyxcbiAgQkg6ICdCYWhyYWluJyxcbiAgQkQ6ICdCYW5nbGFkZXNoJyxcbiAgQkI6ICdCYXJiYWRvcycsXG4gIEJZOiAnQmVsYXJ1cycsXG4gIEJFOiAnQmVsZ2l1bScsXG4gIEJaOiAnQmVsaXplJyxcbiAgQko6ICdCZW5pbicsXG4gIEJNOiAnQmVybXVkYScsXG4gIEJUOiAnQmh1dGFuJyxcbiAgQk86ICdCb2xpdmlhJyxcbiAgQlE6ICdCb25haXJlLCBTaW50IEV1c3RhdGl1cyBhbmQgU2FiYScsXG4gIEJBOiAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYScsXG4gIEJXOiAnQm90c3dhbmEnLFxuICBCVjogJ0JvdXZldCBJc2xhbmQnLFxuICBCUjogJ0JyYXppbCcsXG4gIElPOiAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JyxcbiAgQk46ICdCcnVuZWkgRGFydXNzYWxhbScsXG4gIEJHOiAnQnVsZ2FyaWEnLFxuICBCRjogJ0J1cmtpbmEgRmFzbycsXG4gIEJJOiAnQnVydW5kaScsXG4gIENWOiAnQ2FibyBWZXJkZScsXG4gIEtIOiAnQ2FtYm9kaWEnLFxuICBDTTogJ0NhbWVyb29uJyxcbiAgQ0E6ICdDYW5hZGEnLFxuICBLWTogJ0NheW1hbiBJc2xhbmRzJyxcbiAgQ0Y6ICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnLFxuICBURDogJ0NoYWQnLFxuICBDTDogJ0NoaWxlJyxcbiAgQ046ICdDaGluYScsXG4gIENYOiAnQ2hyaXN0bWFzIElzbGFuZCcsXG4gIENDOiAnQ29jb3MgKEtlZWxpbmcpIElzbGFuZHMnLFxuICBDTzogJ0NvbG9tYmlhJyxcbiAgS006ICdDb21vcm9zJyxcbiAgQ0Q6ICdEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZSBDb25nbycsXG4gIENHOiAnQ29uZ28nLFxuICBDSzogJ0Nvb2sgSXNsYW5kcycsXG4gIENSOiAnQ29zdGEgUmljYScsXG4gIEhSOiAnQ3JvYXRpYScsXG4gIENVOiAnQ3ViYScsXG4gIENXOiAnQ3VyYcOnYW8nLFxuICBDWTogJ0N5cHJ1cycsXG4gIENaOiAnQ3plY2hpYScsXG4gIENJOiBcIkPDtHRlIGQnSXZvaXJlXCIsXG4gIERLOiAnRGVubWFyaycsXG4gIERKOiAnRGppYm91dGknLFxuICBETTogJ0RvbWluaWNhJyxcbiAgRE86ICdEb21pbmljYW4gUmVwdWJsaWMnLFxuICBFQzogJ0VjdWFkb3InLFxuICBFRzogJ0VneXB0JyxcbiAgU1Y6ICdFbCBTYWx2YWRvcicsXG4gIEdROiAnRXF1YXRvcmlhbCBHdWluZWEnLFxuICBFUjogJ0VyaXRyZWEnLFxuICBFRTogJ0VzdG9uaWEnLFxuICBTWjogJ0Vzd2F0aW5pJyxcbiAgRVQ6ICdFdGhpb3BpYScsXG4gIEZLOiAnRmFsa2xhbmQgSXNsYW5kcyBbTWFsdmluYXNdJyxcbiAgRk86ICdGYXJvZSBJc2xhbmRzJyxcbiAgRko6ICdGaWppJyxcbiAgRkk6ICdGaW5sYW5kJyxcbiAgRlI6ICdGcmFuY2UnLFxuICBHRjogJ0ZyZW5jaCBHdWlhbmEnLFxuICBQRjogJ0ZyZW5jaCBQb2x5bmVzaWEnLFxuICBURjogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycsXG4gIEdBOiAnR2Fib24nLFxuICBHTTogJ0dhbWJpYScsXG4gIEdFOiAnR2VvcmdpYScsXG4gIERFOiAnR2VybWFueScsXG4gIEdIOiAnR2hhbmEnLFxuICBHSTogJ0dpYnJhbHRhcicsXG4gIEdSOiAnR3JlZWNlJyxcbiAgR0w6ICdHcmVlbmxhbmQnLFxuICBHRDogJ0dyZW5hZGEnLFxuICBHUDogJ0d1YWRlbG91cGUnLFxuICBHVTogJ0d1YW0nLFxuICBHVDogJ0d1YXRlbWFsYScsXG4gIEdHOiAnR3Vlcm5zZXknLFxuICBHTjogJ0d1aW5lYScsXG4gIEdXOiAnR3VpbmVhLUJpc3NhdScsXG4gIEdZOiAnR3V5YW5hJyxcbiAgSFQ6ICdIYWl0aScsXG4gIEhNOiAnSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzJyxcbiAgVkE6ICdIb2x5IFNlZScsXG4gIEhOOiAnSG9uZHVyYXMnLFxuICBISzogJ0hvbmcgS29uZycsXG4gIEhVOiAnSHVuZ2FyeScsXG4gIElTOiAnSWNlbGFuZCcsXG4gIElOOiAnSW5kaWEnLFxuICBJRDogJ0luZG9uZXNpYScsXG4gIElSOiAnSXJhbiAoSXNsYW1pYyBSZXB1YmxpYyBvZiknLFxuICBJUTogJ0lyYXEnLFxuICBJRTogJ0lyZWxhbmQnLFxuICBJTTogJ0lzbGUgb2YgTWFuJyxcbiAgSUw6ICdJc3JhZWwnLFxuICBJVDogJ0l0YWx5JyxcbiAgSk06ICdKYW1haWNhJyxcbiAgSlA6ICdKYXBhbicsXG4gIEpFOiAnSmVyc2V5JyxcbiAgSk86ICdKb3JkYW4nLFxuICBLWjogJ0themFraHN0YW4nLFxuICBLRTogJ0tlbnlhJyxcbiAgS0k6ICdLaXJpYmF0aScsXG4gIEtQOiBcIlRoZSBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mIEtvcmVhXCIsXG4gIEtSOiAnS29yZWEnLFxuICBLVzogJ0t1d2FpdCcsXG4gIEtHOiAnS3lyZ3l6c3RhbicsXG4gIExBOiBcIkxhbyBQZW9wbGUncyBEZW1vY3JhdGljIFJlcHVibGljXCIsXG4gIExWOiAnTGF0dmlhJyxcbiAgTEI6ICdMZWJhbm9uJyxcbiAgTFM6ICdMZXNvdGhvJyxcbiAgTFI6ICdMaWJlcmlhJyxcbiAgTFk6ICdMaWJ5YScsXG4gIExJOiAnTGllY2h0ZW5zdGVpbicsXG4gIExUOiAnTGl0aHVhbmlhJyxcbiAgTFU6ICdMdXhlbWJvdXJnJyxcbiAgTU86ICdNYWNhbycsXG4gIE1HOiAnTWFkYWdhc2NhcicsXG4gIE1XOiAnTWFsYXdpJyxcbiAgTVk6ICdNYWxheXNpYScsXG4gIE1WOiAnTWFsZGl2ZXMnLFxuICBNTDogJ01hbGknLFxuICBNVDogJ01hbHRhJyxcbiAgTUg6ICdNYXJzaGFsbCBJc2xhbmRzJyxcbiAgTVE6ICdNYXJ0aW5pcXVlJyxcbiAgTVI6ICdNYXVyaXRhbmlhJyxcbiAgTVU6ICdNYXVyaXRpdXMnLFxuICBZVDogJ01heW90dGUnLFxuICBNWDogJ01leGljbycsXG4gIEZNOiAnTWljcm9uZXNpYScsXG4gIE1EOiAnTW9sZG92YScsXG4gIE1DOiAnTW9uYWNvJyxcbiAgTU46ICdNb25nb2xpYScsXG4gIE1FOiAnTW9udGVuZWdybycsXG4gIE1TOiAnTW9udHNlcnJhdCcsXG4gIE1BOiAnTW9yb2NjbycsXG4gIE1aOiAnTW96YW1iaXF1ZScsXG4gIE1NOiAnTXlhbm1hcicsXG4gIE5BOiAnTmFtaWJpYScsXG4gIE5SOiAnTmF1cnUnLFxuICBOUDogJ05lcGFsJyxcbiAgTkw6ICdOZXRoZXJsYW5kcycsXG4gIE5DOiAnTmV3IENhbGVkb25pYScsXG4gIE5aOiAnTmV3IFplYWxhbmQnLFxuICBOSTogJ05pY2FyYWd1YScsXG4gIE5FOiAnTmlnZXInLFxuICBORzogJ05pZ2VyaWEnLFxuICBOVTogJ05pdWUnLFxuICBORjogJ05vcmZvbGsgSXNsYW5kJyxcbiAgTVA6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLFxuICBOTzogJ05vcndheScsXG4gIE9NOiAnT21hbicsXG4gIFBLOiAnUGFraXN0YW4nLFxuICBQVzogJ1BhbGF1JyxcbiAgUFM6ICdQYWxlc3RpbmUsIFN0YXRlIG9mJyxcbiAgUEE6ICdQYW5hbWEnLFxuICBQRzogJ1BhcHVhIE5ldyBHdWluZWEnLFxuICBQWTogJ1BhcmFndWF5JyxcbiAgUEU6ICdQZXJ1JyxcbiAgUEg6ICdQaGlsaXBwaW5lcycsXG4gIFBOOiAnUGl0Y2Fpcm4nLFxuICBQTDogJ1BvbGFuZCcsXG4gIFBUOiAnUG9ydHVnYWwnLFxuICBQUjogJ1B1ZXJ0byBSaWNvJyxcbiAgUUE6ICdRYXRhcicsXG4gIE1LOiAnUmVwdWJsaWMgb2YgTm9ydGggTWFjZWRvbmlhJyxcbiAgUk86ICdSb21hbmlhJyxcbiAgUlU6ICdSdXNzaWFuIEZlZGVyYXRpb24nLFxuICBSVzogJ1J3YW5kYScsXG4gIFJFOiAnUsOpdW5pb24nLFxuICBCTDogJ1NhaW50IEJhcnRow6lsZW15JyxcbiAgU0g6ICdTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYScsXG4gIEtOOiAnU2FpbnQgS2l0dHMgYW5kIE5ldmlzJyxcbiAgTEM6ICdTYWludCBMdWNpYScsXG4gIE1GOiAnU2FpbnQgTWFydGluIChGcmVuY2ggcGFydCknLFxuICBQTTogJ1NhaW50IFBpZXJyZSBhbmQgTWlxdWVsb24nLFxuICBWQzogJ1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJyxcbiAgV1M6ICdTYW1vYScsXG4gIFNNOiAnU2FuIE1hcmlubycsXG4gIFNUOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJyxcbiAgU0E6ICdTYXVkaSBBcmFiaWEnLFxuICBTTjogJ1NlbmVnYWwnLFxuICBSUzogJ1NlcmJpYScsXG4gIFNDOiAnU2V5Y2hlbGxlcycsXG4gIFNMOiAnU2llcnJhIExlb25lJyxcbiAgU0c6ICdTaW5nYXBvcmUnLFxuICBTWDogJ1NpbnQgTWFhcnRlbiAoRHV0Y2ggcGFydCknLFxuICBTSzogJ1Nsb3Zha2lhJyxcbiAgU0k6ICdTbG92ZW5pYScsXG4gIFNCOiAnU29sb21vbiBJc2xhbmRzJyxcbiAgU086ICdTb21hbGlhJyxcbiAgWkE6ICdTb3V0aCBBZnJpY2EnLFxuICBHUzogJ1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyxcbiAgU1M6ICdTb3V0aCBTdWRhbicsXG4gIEVTOiAnU3BhaW4nLFxuICBMSzogJ1NyaSBMYW5rYScsXG4gIFNEOiAnU3VkYW4nLFxuICBTUjogJ1N1cmluYW1lJyxcbiAgU0o6ICdTdmFsYmFyZCBhbmQgSmFuIE1heWVuJyxcbiAgU0U6ICdTd2VkZW4nLFxuICBDSDogJ1N3aXR6ZXJsYW5kJyxcbiAgU1k6ICdTeXJpYW4gQXJhYiBSZXB1YmxpYycsXG4gIFRXOiAnVGFpd2FuJyxcbiAgVEo6ICdUYWppa2lzdGFuJyxcbiAgVFo6ICdUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mJyxcbiAgVEg6ICdUaGFpbGFuZCcsXG4gIFRMOiAnVGltb3ItTGVzdGUnLFxuICBURzogJ1RvZ28nLFxuICBUSzogJ1Rva2VsYXUnLFxuICBUTzogJ1RvbmdhJyxcbiAgVFQ6ICdUcmluaWRhZCBhbmQgVG9iYWdvJyxcbiAgVE46ICdUdW5pc2lhJyxcbiAgVFI6ICdUdXJrZXknLFxuICBUTTogJ1R1cmttZW5pc3RhbicsXG4gIFRDOiAnVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzJyxcbiAgVFY6ICdUdXZhbHUnLFxuICBVRzogJ1VnYW5kYScsXG4gIFVBOiAnVWtyYWluZScsXG4gIEFFOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnLFxuICBHQjogJ1VuaXRlZCBLaW5nZG9tJyxcbiAgVU06ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnLFxuICBVUzogJ1VuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYScsXG4gIFVZOiAnVXJ1Z3VheScsXG4gIFVaOiAnVXpiZWtpc3RhbicsXG4gIFZVOiAnVmFudWF0dScsXG4gIFZFOiAnVmVuZXp1ZWxhJyxcbiAgVk46ICdWaWV0IE5hbScsXG4gIFZHOiAnVmlyZ2luIElzbGFuZHMgKEJyaXRpc2gpJyxcbiAgVkk6ICdWaXJnaW4gSXNsYW5kcyAoVS5TLiknLFxuICBXRjogJ1dhbGxpcyBhbmQgRnV0dW5hJyxcbiAgRUg6ICdXZXN0ZXJuIFNhaGFyYScsXG4gIFlFOiAnWWVtZW4nLFxuICBaTTogJ1phbWJpYScsXG4gIFpXOiAnWmltYmFid2UnLFxuICBBWDogJ8OFbGFuZCBJc2xhbmRzJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50cnlDb2RlcztcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5ld0VsZW1lbnQoXG4gIHR5cGUsXG4gIGNsYXNzZXMgPSBudWxsLFxuICB0ZXh0ID0gbnVsbCxcbiAgYXR0cmlidXRlcyA9IG51bGwsXG4pIHtcbiAgY29uc3QgY3JlYXRlZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gIGlmIChjbGFzc2VzKSB7XG4gICAgY3JlYXRlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcbiAgfVxuXG4gIGlmICh0ZXh0KSB7XG4gICAgY3JlYXRlZEVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG5cbiAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBjcmVhdGVkRWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjcmVhdGVkRWxlbWVudDtcbn1cbiIsImNvbnN0IHdlYXRoZXJJY29ucyA9IHtcbiAgJzAxZCc6ICdjbGVhci1kYXknLFxuICAnMDFuJzogJ2NsZWFyLW5pZ2h0JyxcbiAgJzAyZCc6ICdwYXJ0bHktY2xvdWR5LWRheScsXG4gICcwMm4nOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gICcwM2QnOiAnY2xvdWR5JyxcbiAgJzAzbic6ICdjbG91ZHknLFxuICAnMDRkJzogJ292ZXJjYXN0JyxcbiAgJzA0bic6ICdvdmVyY2FzdCcsXG4gICcwOWQnOiAnb3ZlcmNhc3QtcmFpbicsXG4gICcwOW4nOiAnb3ZlcmNhc3QtcmFpbicsXG4gICcxMGQnOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gICcxMG4nOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgJzExZCc6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgJzExbic6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgJzEzZCc6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgJzEzbic6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgJzUwZCc6ICdmb2ctZGF5JyxcbiAgJzUwbic6ICdmb2ctbmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckljb25zO1xuXG5leHBvcnQgY29uc3QgZnVsbE1hcERheSA9IHtcbiAgMjAwOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIwMTogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAyMDI6ICd0aHVuZGVyc3Rvcm1zLWRheS1vdmVyY2FzdC1yYWluJyxcbiAgMjEwOiAndGh1bmRlcnN0b3Jtcy1kYXknLFxuICAyMTE6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgMjEyOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIyMTogJ3RodW5kZXJzdG9ybXMtb3ZlcmNhc3QnLFxuICAyMzA6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjMxOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIzMjogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAzMDA6ICdwYXJ0bHktY2xvdWR5LWRheS1kcml6emxlJyxcbiAgMzAxOiAncGFydGx5LWNsb3VkeS1kYXktZHJpenpsZScsXG4gIDMwMjogJ292ZXJjYXN0LWRheS1kcml6emxlJyxcbiAgMzEwOiAnb3ZlcmNhc3QtZGF5LWRyaXp6bGUnLFxuICAzMTE6ICdkcml6emxlJyxcbiAgMzEyOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxMzogJ292ZXJjYXN0LWRyaXp6bGUnLFxuICAzMTQ6ICdvdmVyY2FzdC1yYWluJyxcbiAgMzIxOiAnb3ZlcmNhc3QtcmFpbicsXG4gIDUwMDogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MDE6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgNTAyOiAnb3ZlcmNhc3QtZGF5LXJhaW4nLFxuICA1MDM6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUwNDogJ292ZXJjYXN0LXJhaW4nLFxuICA1MTE6ICdzbGVldCcsXG4gIDUyMDogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MjE6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgNTIyOiAnb3ZlcmNhc3QtZGF5LXJhaW4nLFxuICA1MzE6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDYwMDogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MDE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgNjAyOiAnb3ZlcmNhc3QtZGF5LXNub3cnLFxuICA2MTE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYxMjogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjEzOiAnb3ZlcmNhc3QtZGF5LXNsZWV0JyxcbiAgNjE1OiAncGFydGx5LWNsb3VkeS1kYXktc2xlZXQnLFxuICA2MTY6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYyMDogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MjE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbm93JyxcbiAgNjIyOiAnb3ZlcmNhc3Qtc25vdycsXG4gIDcwMTogJ21pc3QnLFxuICA3MTE6ICdwYXJ0bHktY2xvdWR5LWRheS1zbW9rZScsXG4gIDcyMTogJ2hhemUtZGF5JyxcbiAgNzMxOiAnZHVzdC1kYXknLFxuICA3NDE6ICdmb2ctZGF5JyxcbiAgNzUxOiAnZHVzdC1kYXknLFxuICA3NjE6ICdkdXN0LWRheScsXG4gIDc2MjogJ292ZXJjYXN0LXNtb2tlJyxcbiAgNzcxOiAnd2luZCcsXG4gIDc4MTogJ3Rvcm5hZG8nLFxuICA4MDA6ICdjbGVhci1kYXknLFxuICA4MDE6ICdwYXJ0bHktY2xvdWR5LWRheScsXG4gIDgwMjogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgODAzOiAnb3ZlcmNhc3QtZGF5JyxcbiAgODA0OiAnb3ZlcmNhc3QtZGF5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBmdWxsTWFwTmlnaHQgPSB7XG4gIDIwMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIwMTogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIwMjogJ3RodW5kZXJzdG9ybXMtbmlnaHQtb3ZlcmNhc3QtcmFpbicsXG4gIDIxMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQnLFxuICAyMTE6ICd0aHVuZGVyc3Rvcm1zJyxcbiAgMjEyOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIyMTogJ3RodW5kZXJzdG9ybXMtb3ZlcmNhc3QnLFxuICAyMzA6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAyMzE6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAyMzI6ICd0aHVuZGVyc3Rvcm1zLW5pZ2h0LXJhaW4nLFxuICAzMDA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUnLFxuICAzMDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LWRyaXp6bGUnLFxuICAzMDI6ICdvdmVyY2FzdC1uaWdodC1kcml6emxlJyxcbiAgMzEwOiAnb3ZlcmNhc3QtbmlnaHQtZHJpenpsZScsXG4gIDMxMTogJ2RyaXp6bGUnLFxuICAzMTI6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzEzOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxNDogJ292ZXJjYXN0LXJhaW4nLFxuICAzMjE6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTAwOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgNTAxOiAncGFydGx5LWNsb3VkeS1uaWdodC1yYWluJyxcbiAgNTAyOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDUwMzogJ292ZXJjYXN0LW5pZ2h0LXJhaW4nLFxuICA1MDQ6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTExOiAnc2xlZXQnLFxuICA1MjA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MjE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MjI6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNTMxOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDYwMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYwMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYwMjogJ292ZXJjYXN0LW5pZ2h0LXNub3cnLFxuICA2MTE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjEyOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYxMzogJ292ZXJjYXN0LW5pZ2h0LXNsZWV0JyxcbiAgNjE1OiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYxNjogJ3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQnLFxuICA2MjA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cnLFxuICA2MjE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNub3cnLFxuICA2MjI6ICdvdmVyY2FzdC1zbm93JyxcbiAgNzAxOiAnbWlzdCcsXG4gIDcxMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc21va2UnLFxuICA3MjE6ICdoYXplLW5pZ2h0JyxcbiAgNzMxOiAnZHVzdC1uaWdodCcsXG4gIDc0MTogJ2ZvZy1uaWdodCcsXG4gIDc1MTogJ2R1c3QtbmlnaHQnLFxuICA3NjE6ICdkdXN0LW5pZ2h0JyxcbiAgNzYyOiAnb3ZlcmNhc3Qtc21va2UnLFxuICA3NzE6ICd3aW5kJyxcbiAgNzgxOiAndG9ybmFkbycsXG4gIDgwMDogJ2NsZWFyLW5pZ2h0JyxcbiAgODAxOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gIDgwMjogJ3BhcnRseS1jbG91ZHktbmlnaHQnLFxuICA4MDM6ICdvdmVyY2FzdC1uaWdodCcsXG4gIDgwNDogJ292ZXJjYXN0LW5pZ2h0Jyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9jc3Mvc3R5bGVzLmNzcyc7XG5pbXBvcnQgY3JlYXRlTmV3RWxlbWVudCBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBjb3VudHJ5Q29kZXMgZnJvbSAnLi9jb3VudHJ5Q29kZXMnO1xuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0V2VhdGhlclNpbXBsZSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB3ZWF0aGVySWNvbnMgZnJvbSAnLi93ZWF0aGVySWNvbnMnO1xuXG4vLyBTZXQgdXAgcGFnZVxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250YWluZXI7XG5cbi8vIFNldCB1cCBzaW5nbGV0b24gdG8gaG9sZCBkaXNwbGF5IGRhdGFcbmNvbnN0IGxvY2F0aW9uID0ge1xuICBsYXRpdHVkZTogJycsXG4gIGxvbmdpdHVkZTogJycsXG4gIG1haW5XZWF0aGVyOiAnV2VhdGhlciBVbmF2YWlsYWJsZScsXG4gIHdlYXRoZXJEZXNjcmlwdGlvbjogJycsXG4gIHdlYXRoZXJJY29uOiAnJyxcbiAgY3VycmVudFRlbXA6ICcnLFxuICBmZWVsc0xpa2U6ICcnLFxuICBjaXR5OiAnJyxcbiAgc3RhdGU6ICcnLFxuICBjb3VudHJ5Q29kZTogJycsXG4gIGNvdW50cnk6ICcnLFxufTtcblxuLy8gUG9wdWxhdGUgZGF0YVxuZnVuY3Rpb24gcHJvY2Vzc1JldHVybmVkSW5mbyh3ZWF0aGVySW5mbykge1xuICBbXG4gICAgbG9jYXRpb24ubGF0aXR1ZGUsXG4gICAgbG9jYXRpb24ubG9uZ2l0dWRlLFxuICAgIGxvY2F0aW9uLm1haW5XZWF0aGVyLFxuICAgIGxvY2F0aW9uLndlYXRoZXJEZXNjcmlwdGlvbixcbiAgICBsb2NhdGlvbi53ZWF0aGVySWNvbixcbiAgICBsb2NhdGlvbi5jdXJyZW50VGVtcCxcbiAgICBsb2NhdGlvbi5mZWVsc0xpa2UsXG4gICAgbG9jYXRpb24uY2l0eSxcbiAgICBsb2NhdGlvbi5jb3VudHJ5Q29kZSxcbiAgICBsb2NhdGlvbi50aW1lLFxuICBdID0gd2VhdGhlckluZm87XG4gIGxvY2F0aW9uLmNvdW50cnkgPSBjb3VudHJ5Q29kZXNbbG9jYXRpb24uY291bnRyeUNvZGVdO1xuICBjb25zb2xlLmxvZyh7IGxvY2F0aW9uIH0pO1xufVxuXG4vLyBTZXQgdXAgRE9NIChjb3VsZG4ndCBnZXQgdGhpcyB3b3JraW5nIHdpdGggbW9kdWxlIGV4cG9ydHMpXG5cbi8vIElucHV0IHNlYXJjaCBiYXJcbmNvbnN0IGZvcm0gPSBjcmVhdGVOZXdFbGVtZW50KCdmb3JtJyk7XG5jb25zdCBpbnB1dCA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2lucHV0JywgbnVsbCwgbnVsbCwge1xuICB0eXBlOiAnc2VhcmNoJyxcbiAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggQ2l0eScsXG59KTtcblxuZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5jb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2KSA9PiB7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIHBhZ2VMb2FkKGlucHV0LnZhbHVlKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHBvcHVsYXRlV2VhdGhlckNhcmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgY29uc29sZS5sb2coeyBsb2NhdGlvbiB9KTtcbiAgICB9KTtcbn0pO1xuXG4vLyBJbmZvIGRpc3BsYXkgY2FyZFxuY29uc3QgdGVtcGVyYXR1cmVNb2RlID0gJ0NlbHNpdXMnO1xuY29uc3QgaW5mb0NhcmQgPSBjcmVhdGVOZXdFbGVtZW50KCdkaXYnLCBbJ2luZm9DYXJkJ10pO1xuXG5jb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuY29uc3QgZGF0ZVZhbHVlID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZyhbXSwge1xuICB5ZWFyOiAnbnVtZXJpYycsXG4gIG1vbnRoOiAnbG9uZycsXG4gIGRheTogJ251bWVyaWMnLFxufSk7XG5jb25zdCB0aW1lVmFsdWUgPSBub3cudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7XG4gIGhvdXI6ICcyLWRpZ2l0JyxcbiAgbWludXRlOiAnMi1kaWdpdCcsXG59KTtcblxuY29uc3QgY3VycmVudERhdGVUaW1lID0gY3JlYXRlTmV3RWxlbWVudChcbiAgJ3AnLFxuICBbJ2N1cnJlbnRUaW1lJ10sXG4gIGAke2RhdGVWYWx1ZX0sICR7dGltZVZhbHVlfWAsXG4pO1xuXG5pbmZvQ2FyZC5hcHBlbmRDaGlsZChjdXJyZW50RGF0ZVRpbWUpO1xuXG5jb25zdCBpbmZvV3JhcHBlciA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsnaW5mb1dyYXBwZXInXSk7XG5jb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1dyYXBwZXIpO1xuXG5jb25zdCBjaXR5SGVhZGluZyA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2gxJywgWydjaXR5J10pO1xuY29uc3QgY291bnRyeUhlYWRpbmcgPSBjcmVhdGVOZXdFbGVtZW50KCdoMicsIFsnY291bnRyeSddKTtcblxuY29uc3QgdGVtcExpbmUgPSBjcmVhdGVOZXdFbGVtZW50KCdkaXYnLCBbJ3RlbXBCb3gnXSk7XG5jb25zdCB0ZW1wZXJhdHVyZU1haW4gPSBjcmVhdGVOZXdFbGVtZW50KCdwJywgWyd0ZW1wTWFpbiddKTtcbmNvbnN0IGRlZ3JlZU5vdGF0aW9uID0gY3JlYXRlTmV3RWxlbWVudCgncCcsIFsnZGVncmVlJ10pO1xuY29uc3QgZmVlbHNMaWtlID0gY3JlYXRlTmV3RWxlbWVudCgncCcsIFsnZmVlbHNMaWtlJ10pO1xuXG50ZW1wTGluZS5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZU1haW4pO1xudGVtcExpbmUuYXBwZW5kQ2hpbGQoZGVncmVlTm90YXRpb24pO1xuXG5pbmZvQ2FyZC5hcHBlbmQoY2l0eUhlYWRpbmcsIGNvdW50cnlIZWFkaW5nLCB0ZW1wTGluZSwgZmVlbHNMaWtlKTtcblxuaW5mb1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW5mb0NhcmQpO1xuXG5jb25zdCBpY29uQ2FyZCA9IGNyZWF0ZU5ld0VsZW1lbnQoJ2RpdicsIFsnaWNvbkNhcmQnXSk7XG5jb25zdCBpY29uID0gY3JlYXRlTmV3RWxlbWVudCgnaW1nJywgWydpY29uJ10pO1xuY29uc3QgaWNvbkxhYmVsID0gY3JlYXRlTmV3RWxlbWVudCgncCcsIFsnaWNvbi1sYWJlbCddKTtcblxuaWNvbkNhcmQuYXBwZW5kKGljb24sIGljb25MYWJlbCk7XG5pbmZvV3JhcHBlci5hcHBlbmRDaGlsZChpY29uQ2FyZCk7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV2VhdGhlckNhcmQoKSB7XG4gIC8vIE9ubHkgdGhlIG9uZS1jYWxsIEFQSSByZXR1cm5zIG5hbWVkIHRpbWV6b25lO1xuICAvLyBUaGUgc2ltcGxlIGNhbGwgcmV0dXJucyBhIHRpbWV6b25lIG9mZnNldDsgbm90IHN1cmUgaG93IHRvIHVzZSB0aGF0IHRvIGRpc3BsYXkgYSBsb2NhbCB0aW1lXG5cbiAgLy8gY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgLy8gY29uc3QgbG9jYXRpb25EYXRlID0gbm93LnRvTG9jYWxlRGF0ZVN0cmluZyhbXSwge1xuICAvLyAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAvLyAgIG1vbnRoOiBcImxvbmdcIixcbiAgLy8gICBkYXk6IFwibnVtZXJpY1wiLFxuICAvLyAgIHRpbWVab25lOiBsb2NhdGlvbi50aW1lWm9uZSxcbiAgLy8gfSk7XG4gIC8vIGNvbnN0IGxvY2F0aW9uVGltZSA9IG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtcbiAgLy8gICBob3VyOiBcIjItZGlnaXRcIixcbiAgLy8gICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAvLyAgIHRpbWVab25lOiBsb2NhdGlvbi50aW1lWm9uZSxcbiAgLy8gfSk7XG5cbiAgLy8gY29uc3QgbG9jYXRpb25EYXRlVGltZSA9IGAke2xvY2F0aW9uRGF0ZX0sICR7bG9jYXRpb25UaW1lfWA7XG4gIC8vIGN1cnJlbnREYXRlVGltZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0ZVRpbWU7XG5cbiAgY2l0eUhlYWRpbmcudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5jaXR5O1xuXG4gIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgIGNvdW50cnlIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb24uc3RhdGV9LCAke2xvY2F0aW9uLmNvdW50cnl9YDtcbiAgfSBlbHNlIHtcbiAgICBjb3VudHJ5SGVhZGluZy50ZXh0Q29udGVudCA9IGxvY2F0aW9uLmNvdW50cnk7XG4gIH1cblxuICBpZiAodGVtcGVyYXR1cmVNb2RlID09PSAnQ2Vsc2l1cycpIHtcbiAgICB0ZW1wZXJhdHVyZU1haW4udGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uY3VycmVudFRlbXApLFxuICAgICk7XG4gICAgZGVncmVlTm90YXRpb24udGV4dENvbnRlbnQgPSAnwrBDJztcbiAgICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke01hdGgucm91bmQoXG4gICAgICBjb252ZXJ0Q2Vsc2l1cyhsb2NhdGlvbi5mZWVsc0xpa2UpLFxuICAgICl9wrBgO1xuICB9IGVsc2Uge1xuICAgIHRlbXBlcmF0dXJlTWFpbi50ZXh0Q29udGVudCA9IGNvbnZlcnRGYWhyZWluaGVpdChsb2NhdGlvbi5jdXJyZW50VGVtcCk7XG4gICAgZGVncmVlTm90YXRpb24udGV4dENvbnRlbnQgPSAnwrBGJztcbiAgICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke01hdGgucm91bmQoXG4gICAgICBjb252ZXJ0RmFocmVpbmhlaXQobG9jYXRpb24uZmVlbHNMaWtlKSxcbiAgICApfcKwYDtcbiAgfVxuXG4gIGNvbnN0IGljb25VUkwgPSBtYXRjaFdlYXRoZXJUb0ljb24oKTtcbiAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIGljb25VUkwpO1xuICBpY29uTGFiZWwudGV4dENvbnRlbnQgPSBsb2NhdGlvbi53ZWF0aGVyRGVzY3JpcHRpb247XG59XG5cbmZ1bmN0aW9uIG1hdGNoV2VhdGhlclRvSWNvbigpIHtcbiAgcmV0dXJuIGAuLi9zcmMvc3ZnLyR7d2VhdGhlckljb25zW2xvY2F0aW9uLndlYXRoZXJJY29uXX0uc3ZnYDtcbn1cblxuZnVuY3Rpb24gY29udmVydENlbHNpdXMoS2VsdmluKSB7XG4gIHJldHVybiBLZWx2aW4gLSAyNzMuMTU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRGYWhyZWluaGVpdChLZWx2aW4pIHtcbiAgcmV0dXJuICgoS2VsdmluIC0gMjczLjE1KSAqIDkpIC8gNSArIDMyO1xufVxuXG4vLyBSdW4gb24gcGFnZSBsb2FkIGFuZCBvbiBmb3JtIHN1Ym1pdFxuYXN5bmMgZnVuY3Rpb24gcGFnZUxvYWQoaW5wdXQpIHtcbiAgY29uc3QgcmV0dXJuZWRJbmZvID0gYXdhaXQgZ2V0V2VhdGhlclNpbXBsZShpbnB1dCk7XG4gIHByb2Nlc3NSZXR1cm5lZEluZm8ocmV0dXJuZWRJbmZvKTtcbn1cblxuLy8gU3RhcnQgd2l0aCBkZWZhdWx0IGxvY2F0aW9uIFZhbmNvdXZlclxucGFnZUxvYWQoJ1ZhbmNvdXZlcicpXG4gIC50aGVuKCgpID0+IHtcbiAgICBwb3B1bGF0ZVdlYXRoZXJDYXJkKCk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBjb25zb2xlLmxvZyh7IGxvY2F0aW9uIH0pO1xuICB9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==