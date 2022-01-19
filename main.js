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
/* harmony export */   "getAddressFromId": () => (/* binding */ getAddressFromId),
/* harmony export */   "getLocationFromIP": () => (/* binding */ getLocationFromIP)
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
    
    return [
      mainWeather,
      weatherDescription,
      weatherIcon,
      currentTemp,
      feelsLike,
      time,
    ];

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

// Lat, lon, and openstreetmap ID
async function getLocationFromInput(inputString) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${inputString}&format=json&limit=1`,
      { mode: 'cors' },
    );
    const addressData = await address.json();
    // console.log({ addressData });

    if (!addressData[0]) {
      return "City not found";
    }

    if (!addressData[0].osm_type) {
      return "Not a city";
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
// Probably will no longer use as it doesn't always
// return a proper place name
async function getAddressFromCoords(latitude, longitude) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { mode: 'cors' },
    );
    const addressData = await address.json();
    
    // console.log({ addressData });



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

    const state = addressData.address.state;
    const country = addressData.address.country;
    const countryCode = addressData.address.country_code.toUpperCase();

    return [city, state, country, countryCode];

  } catch (err) {
    return err;
  }
}

// Convert geolocation coordinates to address
async function getAddressFromId(id) {
  try {

    // console.log( "Fetching address data using the ID " + id);

    const address = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=${id}&format=json`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    // console.log({ addressData });


    const placeType = Object.keys(addressData[0].address)[0];
    let name = addressData[0].address[placeType];
    // console.log({ name });

    const state = addressData[0].address.state;
    const country = addressData[0].address.country;
    const countryCode = addressData[0].address.country_code.toUpperCase();

    return [name, state, country, countryCode];

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
  id: "", // for openstreetmap
};

// Populate data for city name query
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
}

// For latitude, longitude query
function processReturnedInfoCoords(weatherInfo) {
  [
    location.mainWeather,
    location.weatherDescription,
    location.weatherIcon,
    location.currentTemp,
    location.feelsLike,
    location.time,
  ] = weatherInfo;
}

// Set up DOM (couldn't get this working with module exports)

// Input search bar
const form = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("form");
const input = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("input", null, null, {
  type: "search",
  placeholder: "Search City",
});

const loadingBar = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['loading']);
const loadingBarAnimation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('div', ['loading-bar']);
loadingBar.appendChild(loadingBarAnimation);

const formWarning = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])('p', ['warning']);

form.append(input, loadingBar, formWarning);
container.appendChild(form);

// Complex submit - using name query to return coordinates
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  loadingBar.classList.add('active');
  const coords = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getLocationFromInput)(input.value);

  if (coords === "City not found") {
    loadingBar.classList.remove('active');
    formWarning.textContent = 'City not found';
    formWarning.classList.add('on');
    formWarning.addEventListener('transitionend', () => {
      formWarning.classList.remove('on');
    })
    return;
  } else if (coords === "Not a city") {
    loadingBar.classList.remove('active');
    formWarning.textContent = "Please search by place name";
    formWarning.classList.add('on');
    formWarning.addEventListener('transitionend', () => {
      formWarning.classList.remove('on');
    })
    return;
  }

  // add in ID here
  [location.latitude, location.longitude, location.id] = coords;

  // And get the address from the ID not from the lat
  const addressInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAddressFromId)(location.id);

  [location.city, location.state, location.country, location.countryCode] =
    addressInfo;

  weatherLoadCoord(location.latitude, location.longitude)
    .then(() => {
      loadingBar.classList.remove('active');
      input.value = '';
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Info display card
let temperatureMode = "Celsius";
const infoCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["infoCard"]);
const currentDateTime = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(
  "p",
  ["currentTime"],
);

infoCard.appendChild(currentDateTime);

const infoWrapper = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["infoWrapper"]);
container.appendChild(infoWrapper);

const cityHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("h1", ["city"], "Loading Weather...");
const countryHeading = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("h2", ["country"]);

const tempLine = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["tempBox"]);
const temperatureMain = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["tempMain"]);
const degreeNotation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["degree"]);
const feelsLike = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["feelsLike"]);

tempLine.appendChild(temperatureMain);
tempLine.appendChild(degreeNotation);

infoCard.append(cityHeading, countryHeading, tempLine, feelsLike);

tempLine.addEventListener('click', () => {
  if (temperatureMode == "Celsius") {
    temperatureMode = "Fahreinheit";
  } else {
    temperatureMode = "Celsius";
  }
  printTemps(temperatureMode);
})

infoWrapper.appendChild(infoCard);

const iconCard = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("div", ["iconCard"]);
const icon = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("object", ["icon"], null, {'type': "image/svg+xml", 'data': './svg/windsock.svg'});
const iconLabel = (0,_utils__WEBPACK_IMPORTED_MODULE_1__["default"])("p", ["icon-label"]);

iconCard.append(icon, iconLabel);
infoWrapper.appendChild(iconCard);

function populateWeatherCard() {
  const now = new Date();
  const locationDate = now.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: `${location.time}`,
  });
  const locationTime = now.toLocaleTimeString('en-CA', {
    hour: "2-digit",
    minute: "2-digit",
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
  icon.setAttribute("data", iconURL);
  iconLabel.textContent = location.weatherDescription;
}

function matchWeatherToIcon() {
  return `./svg/${_weatherIcons__WEBPACK_IMPORTED_MODULE_4__["default"][location.weatherIcon]}.svg`;
}

function convertCelsius(Kelvin) {
  return Kelvin - 273.15;
}

function convertFahreinheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}

// Run on page load and on form submit
async function weatherLoad(input) {
  const returnedInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeatherSimple)(input);
  processReturnedInfo(returnedInfo);
}

async function weatherLoadCoord(lat, lon) {
  const returnedInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_3__.getWeather)(lat, lon);
  processReturnedInfoCoords(returnedInfo);
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

  [
    location.city,
    location.state,
    location.country,
    location.countryCode,
  ] = addressInfo;

  weatherLoadCoord(location.latitude, location.longitude)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

function useDefaultLocation() {

  // Set defaults to Vancouver
  location.latitude = '49.283';
  location.longitude = '-123.121';
  location.city = "Vancouver";
  location.state = "British Columbia"
  location.country = "Canada";
  location.countryCode = "CA";

  weatherLoadCoord(location.latitude, location.longitude)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

function printTemps(temperatureMode) {
  if (temperatureMode === "Celsius") {
    temperatureMain.textContent = Math.round(
      convertCelsius(location.currentTemp)
    );
    degreeNotation.textContent = "°C";
    feelsLike.textContent = `Feels like ${Math.round(
      convertCelsius(location.feelsLike)
    )}°`;
  } else {
    temperatureMain.textContent = Math.round(convertFahreinheit(location.currentTemp));
    degreeNotation.textContent = "°F";
    feelsLike.textContent = `Feels like ${Math.round(
      convertFahreinheit(location.feelsLike)
    )}°`;
  }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FPO0FBQ1A7QUFDQTtBQUNBLDZEQUE2RCxTQUFTLE9BQU8sVUFBVTtBQUN2RixRQUFRLGNBQWM7QUFDdEI7QUFDQTs7QUFFQSxxQkFBcUIsYUFBYTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EseURBQXlELEtBQUs7QUFDOUQsTUFBTSxjQUFjO0FBQ3BCO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0Esc0RBQXNELFlBQVk7QUFDbEUsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQSxxQkFBcUIsYUFBYTs7QUFFbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTtBQUNKLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSx1RUFBdUUsU0FBUyxPQUFPLFVBQVU7QUFDakcsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixhQUFhOzs7O0FBSWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQSw0REFBNEQsR0FBRztBQUMvRCxRQUFRLGNBQWM7QUFDdEI7QUFDQTs7QUFFQSxxQkFBcUIsYUFBYTs7O0FBR2xDO0FBQ0E7QUFDQSxxQkFBcUIsTUFBTTs7QUFFM0I7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0EsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BMQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOVBiO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7QUFFckI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04wQjtBQUNhO0FBQ0c7QUFRM0I7QUFDMkI7O0FBRTFDO0FBQ0E7QUFDQSxrQkFBa0Isa0RBQWdCO0FBQ2xDOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscURBQVk7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWEsa0RBQWdCO0FBQzdCLGNBQWMsa0RBQWdCO0FBQzlCO0FBQ0E7QUFDQSxDQUFDOztBQUVELG1CQUFtQixrREFBZ0I7QUFDbkMsNEJBQTRCLGtEQUFnQjtBQUM1Qzs7QUFFQSxvQkFBb0Isa0RBQWdCOztBQUVwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFvQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLHNEQUFnQjs7QUFFNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFnQjtBQUNqQyx3QkFBd0Isa0RBQWdCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0Isa0RBQWdCO0FBQ3BDOztBQUVBLG9CQUFvQixrREFBZ0I7QUFDcEMsdUJBQXVCLGtEQUFnQjs7QUFFdkMsaUJBQWlCLGtEQUFnQjtBQUNqQyx3QkFBd0Isa0RBQWdCO0FBQ3hDLHVCQUF1QixrREFBZ0I7QUFDdkMsa0JBQWtCLGtEQUFnQjs7QUFFbEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxpQkFBaUIsa0RBQWdCO0FBQ2pDLGFBQWEsa0RBQWdCLDRCQUE0QixzREFBc0Q7QUFDL0csa0JBQWtCLGtEQUFnQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsY0FBYztBQUMvQixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0IsR0FBRzs7QUFFSCw4QkFBOEIsYUFBYSxJQUFJLGFBQWE7QUFDNUQ7O0FBRUE7O0FBRUE7QUFDQSxvQ0FBb0MsZUFBZSxJQUFJLGlCQUFpQjtBQUN4RSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IscURBQVksdUJBQXVCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixzREFBZ0I7QUFDN0M7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixnREFBVTtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNEJBQTRCLDBEQUFvQjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0o7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLE1BQU07QUFDTjtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvY3NzL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2FwaS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvY291bnRyeUNvZGVzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvd2VhdGhlckljb25zLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuXG4gICAgLy8gY29uc29sZS5sb2coeyB3ZWF0aGVyRGF0YSB9KTtcblxuICAgIGNvbnN0IG1haW5XZWF0aGVyID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW47XG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gd2VhdGhlckRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb247XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5jdXJyZW50LnRlbXA7XG4gICAgY29uc3QgZmVlbHNMaWtlID0gd2VhdGhlckRhdGEuY3VycmVudC5mZWVsc19saWtlO1xuICAgIGNvbnN0IHRpbWUgPSB3ZWF0aGVyRGF0YS50aW1lem9uZTtcbiAgICBcbiAgICByZXR1cm4gW1xuICAgICAgbWFpbldlYXRoZXIsXG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgICB3ZWF0aGVySWNvbixcbiAgICAgIGN1cnJlbnRUZW1wLFxuICAgICAgZmVlbHNMaWtlLFxuICAgICAgdGltZSxcbiAgICBdO1xuXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlclNpbXBsZShjaXR5KSB7XG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICB7IG1vZGU6ICdjb3JzJyB9LFxuICApO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAvLyBjb25zb2xlLmxvZyh7IHdlYXRoZXJEYXRhIH0pO1xuICBjb25zdCBtYWluV2VhdGhlciA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbjtcbiAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgY29uc3Qgd2VhdGhlckljb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb247XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICBjb25zdCBmZWVsc0xpa2UgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gIGNvbnN0IGxhdGl0dWRlID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICBjb25zdCBsb25naXR1ZGUgPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG4gIGNvbnN0IGNpdHlOYW1lID0gd2VhdGhlckRhdGEubmFtZTtcbiAgY29uc3QgY291bnRyeUNvZGUgPSB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeTtcbiAgY29uc3QgdGltZSA9IHdlYXRoZXJEYXRhLnRpbWV6b25lO1xuICByZXR1cm4gW1xuICAgIGxhdGl0dWRlLFxuICAgIGxvbmdpdHVkZSxcbiAgICBtYWluV2VhdGhlcixcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgd2VhdGhlckljb24sXG4gICAgY3VycmVudFRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGNpdHlOYW1lLFxuICAgIGNvdW50cnlDb2RlLFxuICAgIHRpbWUsXG4gIF07XG59XG5cbi8vIExhdCwgbG9uLCBhbmQgb3BlbnN0cmVldG1hcCBJRFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uRnJvbUlucHV0KGlucHV0U3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3NlYXJjaD9xPSR7aW5wdXRTdHJpbmd9JmZvcm1hdD1qc29uJmxpbWl0PTFgLFxuICAgICAgeyBtb2RlOiAnY29ycycgfSxcbiAgICApO1xuICAgIGNvbnN0IGFkZHJlc3NEYXRhID0gYXdhaXQgYWRkcmVzcy5qc29uKCk7XG4gICAgLy8gY29uc29sZS5sb2coeyBhZGRyZXNzRGF0YSB9KTtcblxuICAgIGlmICghYWRkcmVzc0RhdGFbMF0pIHtcbiAgICAgIHJldHVybiBcIkNpdHkgbm90IGZvdW5kXCI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGRyZXNzRGF0YVswXS5vc21fdHlwZSkge1xuICAgICAgcmV0dXJuIFwiTm90IGEgY2l0eVwiO1xuICAgIH1cblxuICAgIGNvbnN0IGxhdGl0dWRlID0gYWRkcmVzc0RhdGFbMF0ubGF0O1xuICAgIGNvbnN0IGxvbmdpdHVkZSA9IGFkZHJlc3NEYXRhWzBdLmxvbjtcbiAgICBjb25zdCBpZCA9IGFkZHJlc3NEYXRhWzBdLm9zbV90eXBlWzBdLnRvVXBwZXJDYXNlKCkgKyBhZGRyZXNzRGF0YVswXS5vc21faWQ7XG5cbiAgICByZXR1cm4gW2xhdGl0dWRlLCBsb25naXR1ZGUsIGlkXTtcblxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyh7IGVyciB9KTtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbi8vIENvbnZlcnQgZ2VvbG9jYXRpb24gY29vcmRpbmF0ZXMgdG8gYWRkcmVzc1xuLy8gUHJvYmFibHkgd2lsbCBubyBsb25nZXIgdXNlIGFzIGl0IGRvZXNuJ3QgYWx3YXlzXG4vLyByZXR1cm4gYSBwcm9wZXIgcGxhY2UgbmFtZVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZHJlc3NGcm9tQ29vcmRzKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvcmV2ZXJzZT9mb3JtYXQ9anNvbnYyJmxhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9YCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcbiAgICBjb25zdCBhZGRyZXNzRGF0YSA9IGF3YWl0IGFkZHJlc3MuanNvbigpO1xuICAgIFxuICAgIC8vIGNvbnNvbGUubG9nKHsgYWRkcmVzc0RhdGEgfSk7XG5cblxuXG4gICAgY29uc3QgcGxhY2VUeXBlID0gT2JqZWN0LmtleXMoYWRkcmVzc0RhdGEuYWRkcmVzcylbMF07XG5cbiAgICBsZXQgY2l0eSA9ICcnO1xuICAgIFxuICAgIGlmIChhZGRyZXNzRGF0YS5hZGRyZXNzLmNpdHkpIHtcbiAgICAgIGNpdHkgPSBhZGRyZXNzRGF0YS5hZGRyZXNzLmNpdHk7XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzRGF0YS5hZGRyZXNzLnZpbGxhZ2UpIHtcbiAgICAgIGNpdHkgPSBhZGRyZXNzRGF0YS5hZGRyZXNzLnZpbGxhZ2U7XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzRGF0YS5hZGRyZXNzLnRvd24pIHtcbiAgICAgIGNpdHkgPSBhZGRyZXNzRGF0YS5hZGRyZXNzLnRvd247XG4gICAgfSBlbHNlIGlmIChhZGRyZXNzRGF0YS5hZGRyZXNzLmNvdW50eSkge1xuICAgICAgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGlzIG1pZ2h0IHJldHVybiBzb21ldGhpbmcgd2VpcmQgbGlrZSB5b3VyIHN0cmVldFxuICAgICAgY2l0eSA9IGFkZHJlc3NEYXRhLmFkZHJlc3NbcGxhY2VUeXBlXTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IGFkZHJlc3NEYXRhLmFkZHJlc3Muc3RhdGU7XG4gICAgY29uc3QgY291bnRyeSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnRyeTtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IGFkZHJlc3NEYXRhLmFkZHJlc3MuY291bnRyeV9jb2RlLnRvVXBwZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gW2NpdHksIHN0YXRlLCBjb3VudHJ5LCBjb3VudHJ5Q29kZV07XG5cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxufVxuXG4vLyBDb252ZXJ0IGdlb2xvY2F0aW9uIGNvb3JkaW5hdGVzIHRvIGFkZHJlc3NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRyZXNzRnJvbUlkKGlkKSB7XG4gIHRyeSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyggXCJGZXRjaGluZyBhZGRyZXNzIGRhdGEgdXNpbmcgdGhlIElEIFwiICsgaWQpO1xuXG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL2xvb2t1cD9vc21faWRzPSR7aWR9JmZvcm1hdD1qc29uYCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICAgKTtcbiAgICBjb25zdCBhZGRyZXNzRGF0YSA9IGF3YWl0IGFkZHJlc3MuanNvbigpO1xuXG4gICAgLy8gY29uc29sZS5sb2coeyBhZGRyZXNzRGF0YSB9KTtcblxuXG4gICAgY29uc3QgcGxhY2VUeXBlID0gT2JqZWN0LmtleXMoYWRkcmVzc0RhdGFbMF0uYWRkcmVzcylbMF07XG4gICAgbGV0IG5hbWUgPSBhZGRyZXNzRGF0YVswXS5hZGRyZXNzW3BsYWNlVHlwZV07XG4gICAgLy8gY29uc29sZS5sb2coeyBuYW1lIH0pO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBhZGRyZXNzRGF0YVswXS5hZGRyZXNzLnN0YXRlO1xuICAgIGNvbnN0IGNvdW50cnkgPSBhZGRyZXNzRGF0YVswXS5hZGRyZXNzLmNvdW50cnk7XG4gICAgY29uc3QgY291bnRyeUNvZGUgPSBhZGRyZXNzRGF0YVswXS5hZGRyZXNzLmNvdW50cnlfY29kZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIFtuYW1lLCBzdGF0ZSwgY291bnRyeSwgY291bnRyeUNvZGVdO1xuXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuLy8gR2VvbG9jYXRpb24gdmlhIElQIChmaXJzdCBjaG9pY2UpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tSVAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9jYXRpb25JUCA9IGF3YWl0IGZldGNoKCdodHRwOi8vaXAtYXBpLmNvbS9qc29uLycsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgIGNvbnN0IGxvY2F0aW9uSVBEYXRhID0gYXdhaXQgbG9jYXRpb25JUC5qc29uKCk7XG4gICAgcmV0dXJuIGxvY2F0aW9uSVBEYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbi8vIC8vIENvb3JkaW5hdGVzIGZyb20gR2VvbG9jYXRpb24gQVBJIChwb3AtdXAgZm9yIHVzZXIpXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tVXNlclF1ZXJ5KCkge1xuLy8gICByZXR1cm4gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHBvc2l0aW9uKTtcbi8vIH1cbiIsIi8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaW5jcmVkaW1pa2UvMTQ2OTgxNFxuXG5jb25zdCBjb3VudHJ5Q29kZXMgPSB7XG4gIEFGOiAnQWZnaGFuaXN0YW4nLFxuICBBTDogJ0FsYmFuaWEnLFxuICBEWjogJ0FsZ2VyaWEnLFxuICBBUzogJ0FtZXJpY2FuIFNhbW9hJyxcbiAgQUQ6ICdBbmRvcnJhJyxcbiAgQU86ICdBbmdvbGEnLFxuICBBSTogJ0FuZ3VpbGxhJyxcbiAgQVE6ICdBbnRhcmN0aWNhJyxcbiAgQUc6ICdBbnRpZ3VhIGFuZCBCYXJidWRhJyxcbiAgQVI6ICdBcmdlbnRpbmEnLFxuICBBTTogJ0FybWVuaWEnLFxuICBBVzogJ0FydWJhJyxcbiAgQVU6ICdBdXN0cmFsaWEnLFxuICBBVDogJ0F1c3RyaWEnLFxuICBBWjogJ0F6ZXJiYWlqYW4nLFxuICBCUzogJ0JhaGFtYXMnLFxuICBCSDogJ0JhaHJhaW4nLFxuICBCRDogJ0JhbmdsYWRlc2gnLFxuICBCQjogJ0JhcmJhZG9zJyxcbiAgQlk6ICdCZWxhcnVzJyxcbiAgQkU6ICdCZWxnaXVtJyxcbiAgQlo6ICdCZWxpemUnLFxuICBCSjogJ0JlbmluJyxcbiAgQk06ICdCZXJtdWRhJyxcbiAgQlQ6ICdCaHV0YW4nLFxuICBCTzogJ0JvbGl2aWEnLFxuICBCUTogJ0JvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhJyxcbiAgQkE6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJyxcbiAgQlc6ICdCb3Rzd2FuYScsXG4gIEJWOiAnQm91dmV0IElzbGFuZCcsXG4gIEJSOiAnQnJhemlsJyxcbiAgSU86ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLFxuICBCTjogJ0JydW5laSBEYXJ1c3NhbGFtJyxcbiAgQkc6ICdCdWxnYXJpYScsXG4gIEJGOiAnQnVya2luYSBGYXNvJyxcbiAgQkk6ICdCdXJ1bmRpJyxcbiAgQ1Y6ICdDYWJvIFZlcmRlJyxcbiAgS0g6ICdDYW1ib2RpYScsXG4gIENNOiAnQ2FtZXJvb24nLFxuICBDQTogJ0NhbmFkYScsXG4gIEtZOiAnQ2F5bWFuIElzbGFuZHMnLFxuICBDRjogJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycsXG4gIFREOiAnQ2hhZCcsXG4gIENMOiAnQ2hpbGUnLFxuICBDTjogJ0NoaW5hJyxcbiAgQ1g6ICdDaHJpc3RtYXMgSXNsYW5kJyxcbiAgQ0M6ICdDb2NvcyAoS2VlbGluZykgSXNsYW5kcycsXG4gIENPOiAnQ29sb21iaWEnLFxuICBLTTogJ0NvbW9yb3MnLFxuICBDRDogJ0RlbW9jcmF0aWMgUmVwdWJsaWMgb2YgdGhlIENvbmdvJyxcbiAgQ0c6ICdDb25nbycsXG4gIENLOiAnQ29vayBJc2xhbmRzJyxcbiAgQ1I6ICdDb3N0YSBSaWNhJyxcbiAgSFI6ICdDcm9hdGlhJyxcbiAgQ1U6ICdDdWJhJyxcbiAgQ1c6ICdDdXJhw6dhbycsXG4gIENZOiAnQ3lwcnVzJyxcbiAgQ1o6ICdDemVjaGlhJyxcbiAgQ0k6IFwiQ8O0dGUgZCdJdm9pcmVcIixcbiAgREs6ICdEZW5tYXJrJyxcbiAgREo6ICdEamlib3V0aScsXG4gIERNOiAnRG9taW5pY2EnLFxuICBETzogJ0RvbWluaWNhbiBSZXB1YmxpYycsXG4gIEVDOiAnRWN1YWRvcicsXG4gIEVHOiAnRWd5cHQnLFxuICBTVjogJ0VsIFNhbHZhZG9yJyxcbiAgR1E6ICdFcXVhdG9yaWFsIEd1aW5lYScsXG4gIEVSOiAnRXJpdHJlYScsXG4gIEVFOiAnRXN0b25pYScsXG4gIFNaOiAnRXN3YXRpbmknLFxuICBFVDogJ0V0aGlvcGlhJyxcbiAgRks6ICdGYWxrbGFuZCBJc2xhbmRzIFtNYWx2aW5hc10nLFxuICBGTzogJ0Zhcm9lIElzbGFuZHMnLFxuICBGSjogJ0ZpamknLFxuICBGSTogJ0ZpbmxhbmQnLFxuICBGUjogJ0ZyYW5jZScsXG4gIEdGOiAnRnJlbmNoIEd1aWFuYScsXG4gIFBGOiAnRnJlbmNoIFBvbHluZXNpYScsXG4gIFRGOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyxcbiAgR0E6ICdHYWJvbicsXG4gIEdNOiAnR2FtYmlhJyxcbiAgR0U6ICdHZW9yZ2lhJyxcbiAgREU6ICdHZXJtYW55JyxcbiAgR0g6ICdHaGFuYScsXG4gIEdJOiAnR2licmFsdGFyJyxcbiAgR1I6ICdHcmVlY2UnLFxuICBHTDogJ0dyZWVubGFuZCcsXG4gIEdEOiAnR3JlbmFkYScsXG4gIEdQOiAnR3VhZGVsb3VwZScsXG4gIEdVOiAnR3VhbScsXG4gIEdUOiAnR3VhdGVtYWxhJyxcbiAgR0c6ICdHdWVybnNleScsXG4gIEdOOiAnR3VpbmVhJyxcbiAgR1c6ICdHdWluZWEtQmlzc2F1JyxcbiAgR1k6ICdHdXlhbmEnLFxuICBIVDogJ0hhaXRpJyxcbiAgSE06ICdIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHMnLFxuICBWQTogJ0hvbHkgU2VlJyxcbiAgSE46ICdIb25kdXJhcycsXG4gIEhLOiAnSG9uZyBLb25nJyxcbiAgSFU6ICdIdW5nYXJ5JyxcbiAgSVM6ICdJY2VsYW5kJyxcbiAgSU46ICdJbmRpYScsXG4gIElEOiAnSW5kb25lc2lhJyxcbiAgSVI6ICdJcmFuIChJc2xhbWljIFJlcHVibGljIG9mKScsXG4gIElROiAnSXJhcScsXG4gIElFOiAnSXJlbGFuZCcsXG4gIElNOiAnSXNsZSBvZiBNYW4nLFxuICBJTDogJ0lzcmFlbCcsXG4gIElUOiAnSXRhbHknLFxuICBKTTogJ0phbWFpY2EnLFxuICBKUDogJ0phcGFuJyxcbiAgSkU6ICdKZXJzZXknLFxuICBKTzogJ0pvcmRhbicsXG4gIEtaOiAnS2F6YWtoc3RhbicsXG4gIEtFOiAnS2VueWEnLFxuICBLSTogJ0tpcmliYXRpJyxcbiAgS1A6IFwiVGhlIERlbW9jcmF0aWMgUGVvcGxlJ3MgUmVwdWJsaWMgb2YgS29yZWFcIixcbiAgS1I6ICdLb3JlYScsXG4gIEtXOiAnS3V3YWl0JyxcbiAgS0c6ICdLeXJneXpzdGFuJyxcbiAgTEE6IFwiTGFvIFBlb3BsZSdzIERlbW9jcmF0aWMgUmVwdWJsaWNcIixcbiAgTFY6ICdMYXR2aWEnLFxuICBMQjogJ0xlYmFub24nLFxuICBMUzogJ0xlc290aG8nLFxuICBMUjogJ0xpYmVyaWEnLFxuICBMWTogJ0xpYnlhJyxcbiAgTEk6ICdMaWVjaHRlbnN0ZWluJyxcbiAgTFQ6ICdMaXRodWFuaWEnLFxuICBMVTogJ0x1eGVtYm91cmcnLFxuICBNTzogJ01hY2FvJyxcbiAgTUc6ICdNYWRhZ2FzY2FyJyxcbiAgTVc6ICdNYWxhd2knLFxuICBNWTogJ01hbGF5c2lhJyxcbiAgTVY6ICdNYWxkaXZlcycsXG4gIE1MOiAnTWFsaScsXG4gIE1UOiAnTWFsdGEnLFxuICBNSDogJ01hcnNoYWxsIElzbGFuZHMnLFxuICBNUTogJ01hcnRpbmlxdWUnLFxuICBNUjogJ01hdXJpdGFuaWEnLFxuICBNVTogJ01hdXJpdGl1cycsXG4gIFlUOiAnTWF5b3R0ZScsXG4gIE1YOiAnTWV4aWNvJyxcbiAgRk06ICdNaWNyb25lc2lhJyxcbiAgTUQ6ICdNb2xkb3ZhJyxcbiAgTUM6ICdNb25hY28nLFxuICBNTjogJ01vbmdvbGlhJyxcbiAgTUU6ICdNb250ZW5lZ3JvJyxcbiAgTVM6ICdNb250c2VycmF0JyxcbiAgTUE6ICdNb3JvY2NvJyxcbiAgTVo6ICdNb3phbWJpcXVlJyxcbiAgTU06ICdNeWFubWFyJyxcbiAgTkE6ICdOYW1pYmlhJyxcbiAgTlI6ICdOYXVydScsXG4gIE5QOiAnTmVwYWwnLFxuICBOTDogJ05ldGhlcmxhbmRzJyxcbiAgTkM6ICdOZXcgQ2FsZWRvbmlhJyxcbiAgTlo6ICdOZXcgWmVhbGFuZCcsXG4gIE5JOiAnTmljYXJhZ3VhJyxcbiAgTkU6ICdOaWdlcicsXG4gIE5HOiAnTmlnZXJpYScsXG4gIE5VOiAnTml1ZScsXG4gIE5GOiAnTm9yZm9sayBJc2xhbmQnLFxuICBNUDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsXG4gIE5POiAnTm9yd2F5JyxcbiAgT006ICdPbWFuJyxcbiAgUEs6ICdQYWtpc3RhbicsXG4gIFBXOiAnUGFsYXUnLFxuICBQUzogJ1BhbGVzdGluZSwgU3RhdGUgb2YnLFxuICBQQTogJ1BhbmFtYScsXG4gIFBHOiAnUGFwdWEgTmV3IEd1aW5lYScsXG4gIFBZOiAnUGFyYWd1YXknLFxuICBQRTogJ1BlcnUnLFxuICBQSDogJ1BoaWxpcHBpbmVzJyxcbiAgUE46ICdQaXRjYWlybicsXG4gIFBMOiAnUG9sYW5kJyxcbiAgUFQ6ICdQb3J0dWdhbCcsXG4gIFBSOiAnUHVlcnRvIFJpY28nLFxuICBRQTogJ1FhdGFyJyxcbiAgTUs6ICdSZXB1YmxpYyBvZiBOb3J0aCBNYWNlZG9uaWEnLFxuICBSTzogJ1JvbWFuaWEnLFxuICBSVTogJ1J1c3NpYW4gRmVkZXJhdGlvbicsXG4gIFJXOiAnUndhbmRhJyxcbiAgUkU6ICdSw6l1bmlvbicsXG4gIEJMOiAnU2FpbnQgQmFydGjDqWxlbXknLFxuICBTSDogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJyxcbiAgS046ICdTYWludCBLaXR0cyBhbmQgTmV2aXMnLFxuICBMQzogJ1NhaW50IEx1Y2lhJyxcbiAgTUY6ICdTYWludCBNYXJ0aW4gKEZyZW5jaCBwYXJ0KScsXG4gIFBNOiAnU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvbicsXG4gIFZDOiAnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnLFxuICBXUzogJ1NhbW9hJyxcbiAgU006ICdTYW4gTWFyaW5vJyxcbiAgU1Q6ICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnLFxuICBTQTogJ1NhdWRpIEFyYWJpYScsXG4gIFNOOiAnU2VuZWdhbCcsXG4gIFJTOiAnU2VyYmlhJyxcbiAgU0M6ICdTZXljaGVsbGVzJyxcbiAgU0w6ICdTaWVycmEgTGVvbmUnLFxuICBTRzogJ1NpbmdhcG9yZScsXG4gIFNYOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KScsXG4gIFNLOiAnU2xvdmFraWEnLFxuICBTSTogJ1Nsb3ZlbmlhJyxcbiAgU0I6ICdTb2xvbW9uIElzbGFuZHMnLFxuICBTTzogJ1NvbWFsaWEnLFxuICBaQTogJ1NvdXRoIEFmcmljYScsXG4gIEdTOiAnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnLFxuICBTUzogJ1NvdXRoIFN1ZGFuJyxcbiAgRVM6ICdTcGFpbicsXG4gIExLOiAnU3JpIExhbmthJyxcbiAgU0Q6ICdTdWRhbicsXG4gIFNSOiAnU3VyaW5hbWUnLFxuICBTSjogJ1N2YWxiYXJkIGFuZCBKYW4gTWF5ZW4nLFxuICBTRTogJ1N3ZWRlbicsXG4gIENIOiAnU3dpdHplcmxhbmQnLFxuICBTWTogJ1N5cmlhbiBBcmFiIFJlcHVibGljJyxcbiAgVFc6ICdUYWl3YW4nLFxuICBUSjogJ1RhamlraXN0YW4nLFxuICBUWjogJ1RhbnphbmlhLCBVbml0ZWQgUmVwdWJsaWMgb2YnLFxuICBUSDogJ1RoYWlsYW5kJyxcbiAgVEw6ICdUaW1vci1MZXN0ZScsXG4gIFRHOiAnVG9nbycsXG4gIFRLOiAnVG9rZWxhdScsXG4gIFRPOiAnVG9uZ2EnLFxuICBUVDogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nLFxuICBUTjogJ1R1bmlzaWEnLFxuICBUUjogJ1R1cmtleScsXG4gIFRNOiAnVHVya21lbmlzdGFuJyxcbiAgVEM6ICdUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHMnLFxuICBUVjogJ1R1dmFsdScsXG4gIFVHOiAnVWdhbmRhJyxcbiAgVUE6ICdVa3JhaW5lJyxcbiAgQUU6ICdVbml0ZWQgQXJhYiBFbWlyYXRlcycsXG4gIEdCOiAnVW5pdGVkIEtpbmdkb20nLFxuICBVTTogJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcycsXG4gIFVTOiAnVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhJyxcbiAgVVk6ICdVcnVndWF5JyxcbiAgVVo6ICdVemJla2lzdGFuJyxcbiAgVlU6ICdWYW51YXR1JyxcbiAgVkU6ICdWZW5lenVlbGEnLFxuICBWTjogJ1ZpZXQgTmFtJyxcbiAgVkc6ICdWaXJnaW4gSXNsYW5kcyAoQnJpdGlzaCknLFxuICBWSTogJ1ZpcmdpbiBJc2xhbmRzIChVLlMuKScsXG4gIFdGOiAnV2FsbGlzIGFuZCBGdXR1bmEnLFxuICBFSDogJ1dlc3Rlcm4gU2FoYXJhJyxcbiAgWUU6ICdZZW1lbicsXG4gIFpNOiAnWmFtYmlhJyxcbiAgWlc6ICdaaW1iYWJ3ZScsXG4gIEFYOiAnw4VsYW5kIElzbGFuZHMnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY291bnRyeUNvZGVzO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTmV3RWxlbWVudChcbiAgdHlwZSxcbiAgY2xhc3NlcyA9IG51bGwsXG4gIHRleHQgPSBudWxsLFxuICBhdHRyaWJ1dGVzID0gbnVsbCxcbikge1xuICBjb25zdCBjcmVhdGVkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cbiAgaWYgKGNsYXNzZXMpIHtcbiAgICBjcmVhdGVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICB9XG5cbiAgaWYgKHRleHQpIHtcbiAgICBjcmVhdGVkRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGNyZWF0ZWRFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZWRFbGVtZW50O1xufVxuIiwiY29uc3Qgd2VhdGhlckljb25zID0ge1xuICAnMDFkJzogJ2NsZWFyLWRheScsXG4gICcwMW4nOiAnY2xlYXItbmlnaHQnLFxuICAnMDJkJzogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgJzAybic6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0JyxcbiAgJzAzZCc6ICdjbG91ZHknLFxuICAnMDNuJzogJ2Nsb3VkeScsXG4gICcwNGQnOiAnb3ZlcmNhc3QnLFxuICAnMDRuJzogJ292ZXJjYXN0JyxcbiAgJzA5ZCc6ICdvdmVyY2FzdC1yYWluJyxcbiAgJzA5bic6ICdvdmVyY2FzdC1yYWluJyxcbiAgJzEwZCc6ICdwYXJ0bHktY2xvdWR5LWRheS1yYWluJyxcbiAgJzEwbic6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICAnMTFkJzogJ3RodW5kZXJzdG9ybXMnLFxuICAnMTFuJzogJ3RodW5kZXJzdG9ybXMnLFxuICAnMTNkJzogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICAnMTNuJzogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICAnNTBkJzogJ2ZvZy1kYXknLFxuICAnNTBuJzogJ2ZvZy1uaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVySWNvbnM7XG5cbmV4cG9ydCBjb25zdCBmdWxsTWFwRGF5ID0ge1xuICAyMDA6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjAxOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDIwMjogJ3RodW5kZXJzdG9ybXMtZGF5LW92ZXJjYXN0LXJhaW4nLFxuICAyMTA6ICd0aHVuZGVyc3Rvcm1zLWRheScsXG4gIDIxMTogJ3RodW5kZXJzdG9ybXMnLFxuICAyMTI6ICd0aHVuZGVyc3Rvcm1zLW92ZXJjYXN0JyxcbiAgMjIxOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIzMDogJ3RodW5kZXJzdG9ybXMtZGF5LXJhaW4nLFxuICAyMzE6ICd0aHVuZGVyc3Rvcm1zLWRheS1yYWluJyxcbiAgMjMyOiAndGh1bmRlcnN0b3Jtcy1kYXktcmFpbicsXG4gIDMwMDogJ3BhcnRseS1jbG91ZHktZGF5LWRyaXp6bGUnLFxuICAzMDE6ICdwYXJ0bHktY2xvdWR5LWRheS1kcml6emxlJyxcbiAgMzAyOiAnb3ZlcmNhc3QtZGF5LWRyaXp6bGUnLFxuICAzMTA6ICdvdmVyY2FzdC1kYXktZHJpenpsZScsXG4gIDMxMTogJ2RyaXp6bGUnLFxuICAzMTI6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzEzOiAnb3ZlcmNhc3QtZHJpenpsZScsXG4gIDMxNDogJ292ZXJjYXN0LXJhaW4nLFxuICAzMjE6ICdvdmVyY2FzdC1yYWluJyxcbiAgNTAwOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gIDUwMTogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MDI6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUwMzogJ292ZXJjYXN0LWRheS1yYWluJyxcbiAgNTA0OiAnb3ZlcmNhc3QtcmFpbicsXG4gIDUxMTogJ3NsZWV0JyxcbiAgNTIwOiAncGFydGx5LWNsb3VkeS1kYXktcmFpbicsXG4gIDUyMTogJ3BhcnRseS1jbG91ZHktZGF5LXJhaW4nLFxuICA1MjI6ICdvdmVyY2FzdC1kYXktcmFpbicsXG4gIDUzMTogJ292ZXJjYXN0LWRheS1yYWluJyxcbiAgNjAwOiAncGFydGx5LWNsb3VkeS1kYXktc25vdycsXG4gIDYwMTogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MDI6ICdvdmVyY2FzdC1kYXktc25vdycsXG4gIDYxMTogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjEyOiAncGFydGx5LWNsb3VkeS1kYXktc2xlZXQnLFxuICA2MTM6ICdvdmVyY2FzdC1kYXktc2xlZXQnLFxuICA2MTU6ICdwYXJ0bHktY2xvdWR5LWRheS1zbGVldCcsXG4gIDYxNjogJ3BhcnRseS1jbG91ZHktZGF5LXNsZWV0JyxcbiAgNjIwOiAncGFydGx5LWNsb3VkeS1kYXktc25vdycsXG4gIDYyMTogJ3BhcnRseS1jbG91ZHktZGF5LXNub3cnLFxuICA2MjI6ICdvdmVyY2FzdC1zbm93JyxcbiAgNzAxOiAnbWlzdCcsXG4gIDcxMTogJ3BhcnRseS1jbG91ZHktZGF5LXNtb2tlJyxcbiAgNzIxOiAnaGF6ZS1kYXknLFxuICA3MzE6ICdkdXN0LWRheScsXG4gIDc0MTogJ2ZvZy1kYXknLFxuICA3NTE6ICdkdXN0LWRheScsXG4gIDc2MTogJ2R1c3QtZGF5JyxcbiAgNzYyOiAnb3ZlcmNhc3Qtc21va2UnLFxuICA3NzE6ICd3aW5kJyxcbiAgNzgxOiAndG9ybmFkbycsXG4gIDgwMDogJ2NsZWFyLWRheScsXG4gIDgwMTogJ3BhcnRseS1jbG91ZHktZGF5JyxcbiAgODAyOiAncGFydGx5LWNsb3VkeS1kYXknLFxuICA4MDM6ICdvdmVyY2FzdC1kYXknLFxuICA4MDQ6ICdvdmVyY2FzdC1kYXknLFxufTtcblxuZXhwb3J0IGNvbnN0IGZ1bGxNYXBOaWdodCA9IHtcbiAgMjAwOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluJyxcbiAgMjAxOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1yYWluJyxcbiAgMjAyOiAndGh1bmRlcnN0b3Jtcy1uaWdodC1vdmVyY2FzdC1yYWluJyxcbiAgMjEwOiAndGh1bmRlcnN0b3Jtcy1uaWdodCcsXG4gIDIxMTogJ3RodW5kZXJzdG9ybXMnLFxuICAyMTI6ICd0aHVuZGVyc3Rvcm1zLW92ZXJjYXN0JyxcbiAgMjIxOiAndGh1bmRlcnN0b3Jtcy1vdmVyY2FzdCcsXG4gIDIzMDogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIzMTogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDIzMjogJ3RodW5kZXJzdG9ybXMtbmlnaHQtcmFpbicsXG4gIDMwMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZScsXG4gIDMwMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtZHJpenpsZScsXG4gIDMwMjogJ292ZXJjYXN0LW5pZ2h0LWRyaXp6bGUnLFxuICAzMTA6ICdvdmVyY2FzdC1uaWdodC1kcml6emxlJyxcbiAgMzExOiAnZHJpenpsZScsXG4gIDMxMjogJ292ZXJjYXN0LWRyaXp6bGUnLFxuICAzMTM6ICdvdmVyY2FzdC1kcml6emxlJyxcbiAgMzE0OiAnb3ZlcmNhc3QtcmFpbicsXG4gIDMyMTogJ292ZXJjYXN0LXJhaW4nLFxuICA1MDA6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXJhaW4nLFxuICA1MDI6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNTAzOiAnb3ZlcmNhc3QtbmlnaHQtcmFpbicsXG4gIDUwNDogJ292ZXJjYXN0LXJhaW4nLFxuICA1MTE6ICdzbGVldCcsXG4gIDUyMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbicsXG4gIDUyMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtcmFpbicsXG4gIDUyMjogJ292ZXJjYXN0LW5pZ2h0LXJhaW4nLFxuICA1MzE6ICdvdmVyY2FzdC1uaWdodC1yYWluJyxcbiAgNjAwOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbm93JyxcbiAgNjAxOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbm93JyxcbiAgNjAyOiAnb3ZlcmNhc3QtbmlnaHQtc25vdycsXG4gIDYxMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc2xlZXQnLFxuICA2MTI6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjEzOiAnb3ZlcmNhc3QtbmlnaHQtc2xlZXQnLFxuICA2MTU6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0LXNsZWV0JyxcbiAgNjE2OiAncGFydGx5LWNsb3VkeS1uaWdodC1zbGVldCcsXG4gIDYyMDogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYyMTogJ3BhcnRseS1jbG91ZHktbmlnaHQtc25vdycsXG4gIDYyMjogJ292ZXJjYXN0LXNub3cnLFxuICA3MDE6ICdtaXN0JyxcbiAgNzExOiAncGFydGx5LWNsb3VkeS1uaWdodC1zbW9rZScsXG4gIDcyMTogJ2hhemUtbmlnaHQnLFxuICA3MzE6ICdkdXN0LW5pZ2h0JyxcbiAgNzQxOiAnZm9nLW5pZ2h0JyxcbiAgNzUxOiAnZHVzdC1uaWdodCcsXG4gIDc2MTogJ2R1c3QtbmlnaHQnLFxuICA3NjI6ICdvdmVyY2FzdC1zbW9rZScsXG4gIDc3MTogJ3dpbmQnLFxuICA3ODE6ICd0b3JuYWRvJyxcbiAgODAwOiAnY2xlYXItbmlnaHQnLFxuICA4MDE6ICdwYXJ0bHktY2xvdWR5LW5pZ2h0JyxcbiAgODAyOiAncGFydGx5LWNsb3VkeS1uaWdodCcsXG4gIDgwMzogJ292ZXJjYXN0LW5pZ2h0JyxcbiAgODA0OiAnb3ZlcmNhc3QtbmlnaHQnLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9jc3Mvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IGNyZWF0ZU5ld0VsZW1lbnQgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBjb3VudHJ5Q29kZXMgZnJvbSBcIi4vY291bnRyeUNvZGVzXCI7XG5pbXBvcnQge1xuICBnZXRXZWF0aGVyLFxuICBnZXRXZWF0aGVyU2ltcGxlLFxuICBnZXRMb2NhdGlvbkZyb21JUCxcbiAgZ2V0TG9jYXRpb25Gcm9tSW5wdXQsXG4gIGdldEFkZHJlc3NGcm9tSWQsXG4gIGdldEFkZHJlc3NGcm9tQ29vcmRzLFxufSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB3ZWF0aGVySWNvbnMgZnJvbSBcIi4vd2VhdGhlckljb25zXCI7XG5cbi8vIFNldCB1cCBwYWdlXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBjb250YWluZXIgPSBjcmVhdGVOZXdFbGVtZW50KFwiZGl2XCIsIFtcImNvbnRhaW5lclwiXSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRhaW5lcjtcblxuLy8gU2V0IHVwIHNpbmdsZXRvbiB0byBob2xkIGRpc3BsYXkgZGF0YVxuY29uc3QgbG9jYXRpb24gPSB7XG4gIGxhdGl0dWRlOiBcIlwiLFxuICBsb25naXR1ZGU6IFwiXCIsXG4gIG1haW5XZWF0aGVyOiBcIldlYXRoZXIgVW5hdmFpbGFibGVcIixcbiAgd2VhdGhlckRlc2NyaXB0aW9uOiBcIlwiLFxuICB3ZWF0aGVySWNvbjogXCJcIixcbiAgY3VycmVudFRlbXA6IFwiXCIsXG4gIGZlZWxzTGlrZTogXCJcIixcbiAgY2l0eTogXCJcIixcbiAgc3RhdGU6IFwiXCIsXG4gIGNvdW50cnlDb2RlOiBcIlwiLFxuICBjb3VudHJ5OiBcIlwiLFxuICBpZDogXCJcIiwgLy8gZm9yIG9wZW5zdHJlZXRtYXBcbn07XG5cbi8vIFBvcHVsYXRlIGRhdGEgZm9yIGNpdHkgbmFtZSBxdWVyeVxuZnVuY3Rpb24gcHJvY2Vzc1JldHVybmVkSW5mbyh3ZWF0aGVySW5mbykge1xuICBbXG4gICAgbG9jYXRpb24ubGF0aXR1ZGUsXG4gICAgbG9jYXRpb24ubG9uZ2l0dWRlLFxuICAgIGxvY2F0aW9uLm1haW5XZWF0aGVyLFxuICAgIGxvY2F0aW9uLndlYXRoZXJEZXNjcmlwdGlvbixcbiAgICBsb2NhdGlvbi53ZWF0aGVySWNvbixcbiAgICBsb2NhdGlvbi5jdXJyZW50VGVtcCxcbiAgICBsb2NhdGlvbi5mZWVsc0xpa2UsXG4gICAgbG9jYXRpb24uY2l0eSxcbiAgICBsb2NhdGlvbi5jb3VudHJ5Q29kZSxcbiAgICBsb2NhdGlvbi50aW1lLFxuICBdID0gd2VhdGhlckluZm87XG4gIGxvY2F0aW9uLmNvdW50cnkgPSBjb3VudHJ5Q29kZXNbbG9jYXRpb24uY291bnRyeUNvZGVdO1xufVxuXG4vLyBGb3IgbGF0aXR1ZGUsIGxvbmdpdHVkZSBxdWVyeVxuZnVuY3Rpb24gcHJvY2Vzc1JldHVybmVkSW5mb0Nvb3Jkcyh3ZWF0aGVySW5mbykge1xuICBbXG4gICAgbG9jYXRpb24ubWFpbldlYXRoZXIsXG4gICAgbG9jYXRpb24ud2VhdGhlckRlc2NyaXB0aW9uLFxuICAgIGxvY2F0aW9uLndlYXRoZXJJY29uLFxuICAgIGxvY2F0aW9uLmN1cnJlbnRUZW1wLFxuICAgIGxvY2F0aW9uLmZlZWxzTGlrZSxcbiAgICBsb2NhdGlvbi50aW1lLFxuICBdID0gd2VhdGhlckluZm87XG59XG5cbi8vIFNldCB1cCBET00gKGNvdWxkbid0IGdldCB0aGlzIHdvcmtpbmcgd2l0aCBtb2R1bGUgZXhwb3J0cylcblxuLy8gSW5wdXQgc2VhcmNoIGJhclxuY29uc3QgZm9ybSA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJmb3JtXCIpO1xuY29uc3QgaW5wdXQgPSBjcmVhdGVOZXdFbGVtZW50KFwiaW5wdXRcIiwgbnVsbCwgbnVsbCwge1xuICB0eXBlOiBcInNlYXJjaFwiLFxuICBwbGFjZWhvbGRlcjogXCJTZWFyY2ggQ2l0eVwiLFxufSk7XG5cbmNvbnN0IGxvYWRpbmdCYXIgPSBjcmVhdGVOZXdFbGVtZW50KCdkaXYnLCBbJ2xvYWRpbmcnXSk7XG5jb25zdCBsb2FkaW5nQmFyQW5pbWF0aW9uID0gY3JlYXRlTmV3RWxlbWVudCgnZGl2JywgWydsb2FkaW5nLWJhciddKTtcbmxvYWRpbmdCYXIuYXBwZW5kQ2hpbGQobG9hZGluZ0JhckFuaW1hdGlvbik7XG5cbmNvbnN0IGZvcm1XYXJuaW5nID0gY3JlYXRlTmV3RWxlbWVudCgncCcsIFsnd2FybmluZyddKTtcblxuZm9ybS5hcHBlbmQoaW5wdXQsIGxvYWRpbmdCYXIsIGZvcm1XYXJuaW5nKTtcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcblxuLy8gQ29tcGxleCBzdWJtaXQgLSB1c2luZyBuYW1lIHF1ZXJ5IHRvIHJldHVybiBjb29yZGluYXRlc1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChldikgPT4ge1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICBsb2FkaW5nQmFyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICBjb25zdCBjb29yZHMgPSBhd2FpdCBnZXRMb2NhdGlvbkZyb21JbnB1dChpbnB1dC52YWx1ZSk7XG5cbiAgaWYgKGNvb3JkcyA9PT0gXCJDaXR5IG5vdCBmb3VuZFwiKSB7XG4gICAgbG9hZGluZ0Jhci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBmb3JtV2FybmluZy50ZXh0Q29udGVudCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgZm9ybVdhcm5pbmcuY2xhc3NMaXN0LmFkZCgnb24nKTtcbiAgICBmb3JtV2FybmluZy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZm9ybVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZSgnb24nKTtcbiAgICB9KVxuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChjb29yZHMgPT09IFwiTm90IGEgY2l0eVwiKSB7XG4gICAgbG9hZGluZ0Jhci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBmb3JtV2FybmluZy50ZXh0Q29udGVudCA9IFwiUGxlYXNlIHNlYXJjaCBieSBwbGFjZSBuYW1lXCI7XG4gICAgZm9ybVdhcm5pbmcuY2xhc3NMaXN0LmFkZCgnb24nKTtcbiAgICBmb3JtV2FybmluZy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZm9ybVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZSgnb24nKTtcbiAgICB9KVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGFkZCBpbiBJRCBoZXJlXG4gIFtsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlLCBsb2NhdGlvbi5pZF0gPSBjb29yZHM7XG5cbiAgLy8gQW5kIGdldCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBJRCBub3QgZnJvbSB0aGUgbGF0XG4gIGNvbnN0IGFkZHJlc3NJbmZvID0gYXdhaXQgZ2V0QWRkcmVzc0Zyb21JZChsb2NhdGlvbi5pZCk7XG5cbiAgW2xvY2F0aW9uLmNpdHksIGxvY2F0aW9uLnN0YXRlLCBsb2NhdGlvbi5jb3VudHJ5LCBsb2NhdGlvbi5jb3VudHJ5Q29kZV0gPVxuICAgIGFkZHJlc3NJbmZvO1xuXG4gIHdlYXRoZXJMb2FkQ29vcmQobG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBsb2FkaW5nQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIHBvcHVsYXRlV2VhdGhlckNhcmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5cbi8vIEluZm8gZGlzcGxheSBjYXJkXG5sZXQgdGVtcGVyYXR1cmVNb2RlID0gXCJDZWxzaXVzXCI7XG5jb25zdCBpbmZvQ2FyZCA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJkaXZcIiwgW1wiaW5mb0NhcmRcIl0pO1xuY29uc3QgY3VycmVudERhdGVUaW1lID0gY3JlYXRlTmV3RWxlbWVudChcbiAgXCJwXCIsXG4gIFtcImN1cnJlbnRUaW1lXCJdLFxuKTtcblxuaW5mb0NhcmQuYXBwZW5kQ2hpbGQoY3VycmVudERhdGVUaW1lKTtcblxuY29uc3QgaW5mb1dyYXBwZXIgPSBjcmVhdGVOZXdFbGVtZW50KFwiZGl2XCIsIFtcImluZm9XcmFwcGVyXCJdKTtcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvV3JhcHBlcik7XG5cbmNvbnN0IGNpdHlIZWFkaW5nID0gY3JlYXRlTmV3RWxlbWVudChcImgxXCIsIFtcImNpdHlcIl0sIFwiTG9hZGluZyBXZWF0aGVyLi4uXCIpO1xuY29uc3QgY291bnRyeUhlYWRpbmcgPSBjcmVhdGVOZXdFbGVtZW50KFwiaDJcIiwgW1wiY291bnRyeVwiXSk7XG5cbmNvbnN0IHRlbXBMaW5lID0gY3JlYXRlTmV3RWxlbWVudChcImRpdlwiLCBbXCJ0ZW1wQm94XCJdKTtcbmNvbnN0IHRlbXBlcmF0dXJlTWFpbiA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJwXCIsIFtcInRlbXBNYWluXCJdKTtcbmNvbnN0IGRlZ3JlZU5vdGF0aW9uID0gY3JlYXRlTmV3RWxlbWVudChcInBcIiwgW1wiZGVncmVlXCJdKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGNyZWF0ZU5ld0VsZW1lbnQoXCJwXCIsIFtcImZlZWxzTGlrZVwiXSk7XG5cbnRlbXBMaW5lLmFwcGVuZENoaWxkKHRlbXBlcmF0dXJlTWFpbik7XG50ZW1wTGluZS5hcHBlbmRDaGlsZChkZWdyZWVOb3RhdGlvbik7XG5cbmluZm9DYXJkLmFwcGVuZChjaXR5SGVhZGluZywgY291bnRyeUhlYWRpbmcsIHRlbXBMaW5lLCBmZWVsc0xpa2UpO1xuXG50ZW1wTGluZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKHRlbXBlcmF0dXJlTW9kZSA9PSBcIkNlbHNpdXNcIikge1xuICAgIHRlbXBlcmF0dXJlTW9kZSA9IFwiRmFocmVpbmhlaXRcIjtcbiAgfSBlbHNlIHtcbiAgICB0ZW1wZXJhdHVyZU1vZGUgPSBcIkNlbHNpdXNcIjtcbiAgfVxuICBwcmludFRlbXBzKHRlbXBlcmF0dXJlTW9kZSk7XG59KVxuXG5pbmZvV3JhcHBlci5hcHBlbmRDaGlsZChpbmZvQ2FyZCk7XG5cbmNvbnN0IGljb25DYXJkID0gY3JlYXRlTmV3RWxlbWVudChcImRpdlwiLCBbXCJpY29uQ2FyZFwiXSk7XG5jb25zdCBpY29uID0gY3JlYXRlTmV3RWxlbWVudChcIm9iamVjdFwiLCBbXCJpY29uXCJdLCBudWxsLCB7J3R5cGUnOiBcImltYWdlL3N2Zyt4bWxcIiwgJ2RhdGEnOiAnLi9zdmcvd2luZHNvY2suc3ZnJ30pO1xuY29uc3QgaWNvbkxhYmVsID0gY3JlYXRlTmV3RWxlbWVudChcInBcIiwgW1wiaWNvbi1sYWJlbFwiXSk7XG5cbmljb25DYXJkLmFwcGVuZChpY29uLCBpY29uTGFiZWwpO1xuaW5mb1dyYXBwZXIuYXBwZW5kQ2hpbGQoaWNvbkNhcmQpO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZVdlYXRoZXJDYXJkKCkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBsb2NhdGlvbkRhdGUgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKFtdLCB7XG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwibG9uZ1wiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgdGltZVpvbmU6IGAke2xvY2F0aW9uLnRpbWV9YCxcbiAgfSk7XG4gIGNvbnN0IGxvY2F0aW9uVGltZSA9IG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLUNBJywge1xuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxuICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG4gICAgdGltZVpvbmU6IGAke2xvY2F0aW9uLnRpbWV9YCxcbiAgfSk7XG5cbiAgY29uc3QgbG9jYXRpb25EYXRlVGltZSA9IGAke2xvY2F0aW9uRGF0ZX0sICR7bG9jYXRpb25UaW1lfWA7XG4gIGN1cnJlbnREYXRlVGltZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0ZVRpbWU7XG5cbiAgY2l0eUhlYWRpbmcudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5jaXR5O1xuXG4gIGlmIChsb2NhdGlvbi5zdGF0ZSkge1xuICAgIGNvdW50cnlIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb24uc3RhdGV9LCAke2xvY2F0aW9uLmNvdW50cnl9YDtcbiAgfSBlbHNlIHtcbiAgICBjb3VudHJ5SGVhZGluZy50ZXh0Q29udGVudCA9IGxvY2F0aW9uLmNvdW50cnk7XG4gIH1cblxuICBwcmludFRlbXBzKHRlbXBlcmF0dXJlTW9kZSk7XG5cblxuICBjb25zdCBpY29uVVJMID0gbWF0Y2hXZWF0aGVyVG9JY29uKCk7XG4gIGljb24uc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBpY29uVVJMKTtcbiAgaWNvbkxhYmVsLnRleHRDb250ZW50ID0gbG9jYXRpb24ud2VhdGhlckRlc2NyaXB0aW9uO1xufVxuXG5mdW5jdGlvbiBtYXRjaFdlYXRoZXJUb0ljb24oKSB7XG4gIHJldHVybiBgLi9zdmcvJHt3ZWF0aGVySWNvbnNbbG9jYXRpb24ud2VhdGhlckljb25dfS5zdmdgO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0Q2Vsc2l1cyhLZWx2aW4pIHtcbiAgcmV0dXJuIEtlbHZpbiAtIDI3My4xNTtcbn1cblxuZnVuY3Rpb24gY29udmVydEZhaHJlaW5oZWl0KEtlbHZpbikge1xuICByZXR1cm4gKChLZWx2aW4gLSAyNzMuMTUpICogOSkgLyA1ICsgMzI7XG59XG5cbi8vIFJ1biBvbiBwYWdlIGxvYWQgYW5kIG9uIGZvcm0gc3VibWl0XG5hc3luYyBmdW5jdGlvbiB3ZWF0aGVyTG9hZChpbnB1dCkge1xuICBjb25zdCByZXR1cm5lZEluZm8gPSBhd2FpdCBnZXRXZWF0aGVyU2ltcGxlKGlucHV0KTtcbiAgcHJvY2Vzc1JldHVybmVkSW5mbyhyZXR1cm5lZEluZm8pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3ZWF0aGVyTG9hZENvb3JkKGxhdCwgbG9uKSB7XG4gIGNvbnN0IHJldHVybmVkSW5mbyA9IGF3YWl0IGdldFdlYXRoZXIobGF0LCBsb24pO1xuICBwcm9jZXNzUmV0dXJuZWRJbmZvQ29vcmRzKHJldHVybmVkSW5mbyk7XG59XG5cbi8vIEF0dGVtcHQgdG8gZ2V0IGEgbG9jYXRpb24gZnJvbSBJUFxuLy8gVGhpcyB3b24ndCBldmVyIHdvcmsgbG9jYWxseSB0aG91Z2hcbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgdXNlVXNlckxvY2F0aW9uKHBvc2l0aW9uKTtcbiAgfSwgdXNlRGVmYXVsdExvY2F0aW9uKTtcbn0pKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZVVzZXJMb2NhdGlvbihwb3NpdGlvbikge1xuICBjb25zdCBwb3NpdGlvbkRhdGEgPSBwb3NpdGlvbjtcblxuICBsb2NhdGlvbi5sYXRpdHVkZSA9IHBvc2l0aW9uRGF0YS5jb29yZHMubGF0aXR1ZGU7XG4gIGxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uRGF0YS5jb29yZHMubG9uZ2l0dWRlO1xuXG4gIGNvbnN0IGFkZHJlc3NJbmZvID0gYXdhaXQgZ2V0QWRkcmVzc0Zyb21Db29yZHMoXG4gICAgbG9jYXRpb24ubGF0aXR1ZGUsXG4gICAgbG9jYXRpb24ubG9uZ2l0dWRlXG4gICk7XG5cbiAgW1xuICAgIGxvY2F0aW9uLmNpdHksXG4gICAgbG9jYXRpb24uc3RhdGUsXG4gICAgbG9jYXRpb24uY291bnRyeSxcbiAgICBsb2NhdGlvbi5jb3VudHJ5Q29kZSxcbiAgXSA9IGFkZHJlc3NJbmZvO1xuXG4gIHdlYXRoZXJMb2FkQ29vcmQobG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBwb3B1bGF0ZVdlYXRoZXJDYXJkKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXNlRGVmYXVsdExvY2F0aW9uKCkge1xuXG4gIC8vIFNldCBkZWZhdWx0cyB0byBWYW5jb3V2ZXJcbiAgbG9jYXRpb24ubGF0aXR1ZGUgPSAnNDkuMjgzJztcbiAgbG9jYXRpb24ubG9uZ2l0dWRlID0gJy0xMjMuMTIxJztcbiAgbG9jYXRpb24uY2l0eSA9IFwiVmFuY291dmVyXCI7XG4gIGxvY2F0aW9uLnN0YXRlID0gXCJCcml0aXNoIENvbHVtYmlhXCJcbiAgbG9jYXRpb24uY291bnRyeSA9IFwiQ2FuYWRhXCI7XG4gIGxvY2F0aW9uLmNvdW50cnlDb2RlID0gXCJDQVwiO1xuXG4gIHdlYXRoZXJMb2FkQ29vcmQobG9jYXRpb24ubGF0aXR1ZGUsIGxvY2F0aW9uLmxvbmdpdHVkZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBwb3B1bGF0ZVdlYXRoZXJDYXJkKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcHJpbnRUZW1wcyh0ZW1wZXJhdHVyZU1vZGUpIHtcbiAgaWYgKHRlbXBlcmF0dXJlTW9kZSA9PT0gXCJDZWxzaXVzXCIpIHtcbiAgICB0ZW1wZXJhdHVyZU1haW4udGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uY3VycmVudFRlbXApXG4gICAgKTtcbiAgICBkZWdyZWVOb3RhdGlvbi50ZXh0Q29udGVudCA9IFwiwrBDXCI7XG4gICAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtNYXRoLnJvdW5kKFxuICAgICAgY29udmVydENlbHNpdXMobG9jYXRpb24uZmVlbHNMaWtlKVxuICAgICl9wrBgO1xuICB9IGVsc2Uge1xuICAgIHRlbXBlcmF0dXJlTWFpbi50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoY29udmVydEZhaHJlaW5oZWl0KGxvY2F0aW9uLmN1cnJlbnRUZW1wKSk7XG4gICAgZGVncmVlTm90YXRpb24udGV4dENvbnRlbnQgPSBcIsKwRlwiO1xuICAgIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7TWF0aC5yb3VuZChcbiAgICAgIGNvbnZlcnRGYWhyZWluaGVpdChsb2NhdGlvbi5mZWVsc0xpa2UpXG4gICAgKX3CsGA7XG4gIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=