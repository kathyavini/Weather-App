/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/suncalc.js":
/*!************************!*\
  !*** ./src/suncalc.js ***!
  \************************/
/***/ ((module) => {

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
function observerAngle(height) { return -2.076 * Math.sqrt(height) / 60; }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date, latitude/longitude, and, optionally,
// the observer height (in meters) relative to the horizon

SunCalc.getTimes = function (date, lat, lng, height) {

    height = height || 0;

    var lw = rad * -lng,
        phi = rad * lat,

        dh = observerAngle(height),

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, h0, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];
        h0 = (time[0] + dh) * rad;

        Jset = getSetJ(h0, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as Node module / AMD module / browser variable
if (true) module.exports = SunCalc;
else {}

}());


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _suncalc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./suncalc */ "./src/suncalc.js");
/* harmony import */ var _suncalc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_suncalc__WEBPACK_IMPORTED_MODULE_1__);


// import { createNewElement } from './utils';


// Default location Vancouver
const location = {
  latitude: "49.213",
  longitude: "-123.105"
}

// One Call API - includes forecast
async function getWeather(latitude, longitude) {
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=8f12dfab0de38099e0b5a7a2ddc45e37`,
      { mode: "cors" }
    );
    const weatherData = await weather.json();
    console.log({ weatherData });
  } catch (err) {
    console.log(err);
  }
}

// Geolocation via IP (first choice)
async function getLocationFromIP() {
  try {
    const locationIP = await fetch(`http://ip-api.com/json/`, { mode: "cors" });
    const locationIPData = await locationIP.json();
    console.log({ locationIPData });
  } catch (err) {
    console.log(err);
  }
}

// Coordinates from Geolocation API (pop-up for user)
function queryLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
  });
}


// Convert geolocation coordinates to address
async function getLocationFromCoords(latitude, longitude) {
  try {
    const location = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { mode: "cors" }
    );
    const locationData = await location.json();
    console.log({ locationData });
  } catch (err) {
    console.log(err);
  }
}

getLocationFromIP();
getLocationFromCoords(location.latitude, location.longitude);
// getWeather(latitude, longitude);

function getCelcius(Kelvin) {
  return Kelvin - 273.15;
}

function getFahreinheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}


let now = new Date();
console.log(_suncalc__WEBPACK_IMPORTED_MODULE_1___default().getMoonIllumination(now));

console.log(_suncalc__WEBPACK_IMPORTED_MODULE_1___default().getMoonTimes(now, location.latitude, location.longitude));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ007QUFDaEMsWUFBWSxtQkFBbUI7QUFDQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxTQUFTLE9BQU8sVUFBVTtBQUN2RixRQUFRO0FBQ1I7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGNBQWM7QUFDOUU7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsU0FBUyxPQUFPLFVBQVU7QUFDakcsUUFBUTtBQUNSO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFlBQVksbUVBQTJCOztBQUV2QyxZQUFZLDREQUFvQiw4QyIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9jc3Mvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3VuY2FsYy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qXG4gKGMpIDIwMTEtMjAxNSwgVmxhZGltaXIgQWdhZm9ua2luXG4gU3VuQ2FsYyBpcyBhIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgY2FsY3VsYXRpbmcgc3VuL21vb24gcG9zaXRpb24gYW5kIGxpZ2h0IHBoYXNlcy5cbiBodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9zdW5jYWxjXG4qL1xuXG4oZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8vIHNob3J0Y3V0cyBmb3IgZWFzaWVyIHRvIHJlYWQgZm9ybXVsYXNcblxudmFyIFBJICAgPSBNYXRoLlBJLFxuICAgIHNpbiAgPSBNYXRoLnNpbixcbiAgICBjb3MgID0gTWF0aC5jb3MsXG4gICAgdGFuICA9IE1hdGgudGFuLFxuICAgIGFzaW4gPSBNYXRoLmFzaW4sXG4gICAgYXRhbiA9IE1hdGguYXRhbjIsXG4gICAgYWNvcyA9IE1hdGguYWNvcyxcbiAgICByYWQgID0gUEkgLyAxODA7XG5cbi8vIHN1biBjYWxjdWxhdGlvbnMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9hYS5xdWFlLm5sL2VuL3Jla2VuL3pvbnBvc2l0aWUuaHRtbCBmb3JtdWxhc1xuXG5cbi8vIGRhdGUvdGltZSBjb25zdGFudHMgYW5kIGNvbnZlcnNpb25zXG5cbnZhciBkYXlNcyA9IDEwMDAgKiA2MCAqIDYwICogMjQsXG4gICAgSjE5NzAgPSAyNDQwNTg4LFxuICAgIEoyMDAwID0gMjQ1MTU0NTtcblxuZnVuY3Rpb24gdG9KdWxpYW4oZGF0ZSkgeyByZXR1cm4gZGF0ZS52YWx1ZU9mKCkgLyBkYXlNcyAtIDAuNSArIEoxOTcwOyB9XG5mdW5jdGlvbiBmcm9tSnVsaWFuKGopICB7IHJldHVybiBuZXcgRGF0ZSgoaiArIDAuNSAtIEoxOTcwKSAqIGRheU1zKTsgfVxuZnVuY3Rpb24gdG9EYXlzKGRhdGUpICAgeyByZXR1cm4gdG9KdWxpYW4oZGF0ZSkgLSBKMjAwMDsgfVxuXG5cbi8vIGdlbmVyYWwgY2FsY3VsYXRpb25zIGZvciBwb3NpdGlvblxuXG52YXIgZSA9IHJhZCAqIDIzLjQzOTc7IC8vIG9ibGlxdWl0eSBvZiB0aGUgRWFydGhcblxuZnVuY3Rpb24gcmlnaHRBc2NlbnNpb24obCwgYikgeyByZXR1cm4gYXRhbihzaW4obCkgKiBjb3MoZSkgLSB0YW4oYikgKiBzaW4oZSksIGNvcyhsKSk7IH1cbmZ1bmN0aW9uIGRlY2xpbmF0aW9uKGwsIGIpICAgIHsgcmV0dXJuIGFzaW4oc2luKGIpICogY29zKGUpICsgY29zKGIpICogc2luKGUpICogc2luKGwpKTsgfVxuXG5mdW5jdGlvbiBhemltdXRoKEgsIHBoaSwgZGVjKSAgeyByZXR1cm4gYXRhbihzaW4oSCksIGNvcyhIKSAqIHNpbihwaGkpIC0gdGFuKGRlYykgKiBjb3MocGhpKSk7IH1cbmZ1bmN0aW9uIGFsdGl0dWRlKEgsIHBoaSwgZGVjKSB7IHJldHVybiBhc2luKHNpbihwaGkpICogc2luKGRlYykgKyBjb3MocGhpKSAqIGNvcyhkZWMpICogY29zKEgpKTsgfVxuXG5mdW5jdGlvbiBzaWRlcmVhbFRpbWUoZCwgbHcpIHsgcmV0dXJuIHJhZCAqICgyODAuMTYgKyAzNjAuOTg1NjIzNSAqIGQpIC0gbHc7IH1cblxuZnVuY3Rpb24gYXN0cm9SZWZyYWN0aW9uKGgpIHtcbiAgICBpZiAoaCA8IDApIC8vIHRoZSBmb2xsb3dpbmcgZm9ybXVsYSB3b3JrcyBmb3IgcG9zaXRpdmUgYWx0aXR1ZGVzIG9ubHkuXG4gICAgICAgIGggPSAwOyAvLyBpZiBoID0gLTAuMDg5MDExNzkgYSBkaXYvMCB3b3VsZCBvY2N1ci5cblxuICAgIC8vIGZvcm11bGEgMTYuNCBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG4gICAgLy8gMS4wMiAvIHRhbihoICsgMTAuMjYgLyAoaCArIDUuMTApKSBoIGluIGRlZ3JlZXMsIHJlc3VsdCBpbiBhcmMgbWludXRlcyAtPiBjb252ZXJ0ZWQgdG8gcmFkOlxuICAgIHJldHVybiAwLjAwMDI5NjcgLyBNYXRoLnRhbihoICsgMC4wMDMxMjUzNiAvIChoICsgMC4wODkwMTE3OSkpO1xufVxuXG4vLyBnZW5lcmFsIHN1biBjYWxjdWxhdGlvbnNcblxuZnVuY3Rpb24gc29sYXJNZWFuQW5vbWFseShkKSB7IHJldHVybiByYWQgKiAoMzU3LjUyOTEgKyAwLjk4NTYwMDI4ICogZCk7IH1cblxuZnVuY3Rpb24gZWNsaXB0aWNMb25naXR1ZGUoTSkge1xuXG4gICAgdmFyIEMgPSByYWQgKiAoMS45MTQ4ICogc2luKE0pICsgMC4wMiAqIHNpbigyICogTSkgKyAwLjAwMDMgKiBzaW4oMyAqIE0pKSwgLy8gZXF1YXRpb24gb2YgY2VudGVyXG4gICAgICAgIFAgPSByYWQgKiAxMDIuOTM3MjsgLy8gcGVyaWhlbGlvbiBvZiB0aGUgRWFydGhcblxuICAgIHJldHVybiBNICsgQyArIFAgKyBQSTtcbn1cblxuZnVuY3Rpb24gc3VuQ29vcmRzKGQpIHtcblxuICAgIHZhciBNID0gc29sYXJNZWFuQW5vbWFseShkKSxcbiAgICAgICAgTCA9IGVjbGlwdGljTG9uZ2l0dWRlKE0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVjOiBkZWNsaW5hdGlvbihMLCAwKSxcbiAgICAgICAgcmE6IHJpZ2h0QXNjZW5zaW9uKEwsIDApXG4gICAgfTtcbn1cblxuXG52YXIgU3VuQ2FsYyA9IHt9O1xuXG5cbi8vIGNhbGN1bGF0ZXMgc3VuIHBvc2l0aW9uIGZvciBhIGdpdmVuIGRhdGUgYW5kIGxhdGl0dWRlL2xvbmdpdHVkZVxuXG5TdW5DYWxjLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKGRhdGUsIGxhdCwgbG5nKSB7XG5cbiAgICB2YXIgbHcgID0gcmFkICogLWxuZyxcbiAgICAgICAgcGhpID0gcmFkICogbGF0LFxuICAgICAgICBkICAgPSB0b0RheXMoZGF0ZSksXG5cbiAgICAgICAgYyAgPSBzdW5Db29yZHMoZCksXG4gICAgICAgIEggID0gc2lkZXJlYWxUaW1lKGQsIGx3KSAtIGMucmE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhemltdXRoOiBhemltdXRoKEgsIHBoaSwgYy5kZWMpLFxuICAgICAgICBhbHRpdHVkZTogYWx0aXR1ZGUoSCwgcGhpLCBjLmRlYylcbiAgICB9O1xufTtcblxuXG4vLyBzdW4gdGltZXMgY29uZmlndXJhdGlvbiAoYW5nbGUsIG1vcm5pbmcgbmFtZSwgZXZlbmluZyBuYW1lKVxuXG52YXIgdGltZXMgPSBTdW5DYWxjLnRpbWVzID0gW1xuICAgIFstMC44MzMsICdzdW5yaXNlJywgICAgICAgJ3N1bnNldCcgICAgICBdLFxuICAgIFsgIC0wLjMsICdzdW5yaXNlRW5kJywgICAgJ3N1bnNldFN0YXJ0JyBdLFxuICAgIFsgICAgLTYsICdkYXduJywgICAgICAgICAgJ2R1c2snICAgICAgICBdLFxuICAgIFsgICAtMTIsICduYXV0aWNhbERhd24nLCAgJ25hdXRpY2FsRHVzayddLFxuICAgIFsgICAtMTgsICduaWdodEVuZCcsICAgICAgJ25pZ2h0JyAgICAgICBdLFxuICAgIFsgICAgIDYsICdnb2xkZW5Ib3VyRW5kJywgJ2dvbGRlbkhvdXInICBdXG5dO1xuXG4vLyBhZGRzIGEgY3VzdG9tIHRpbWUgdG8gdGhlIHRpbWVzIGNvbmZpZ1xuXG5TdW5DYWxjLmFkZFRpbWUgPSBmdW5jdGlvbiAoYW5nbGUsIHJpc2VOYW1lLCBzZXROYW1lKSB7XG4gICAgdGltZXMucHVzaChbYW5nbGUsIHJpc2VOYW1lLCBzZXROYW1lXSk7XG59O1xuXG5cbi8vIGNhbGN1bGF0aW9ucyBmb3Igc3VuIHRpbWVzXG5cbnZhciBKMCA9IDAuMDAwOTtcblxuZnVuY3Rpb24ganVsaWFuQ3ljbGUoZCwgbHcpIHsgcmV0dXJuIE1hdGgucm91bmQoZCAtIEowIC0gbHcgLyAoMiAqIFBJKSk7IH1cblxuZnVuY3Rpb24gYXBwcm94VHJhbnNpdChIdCwgbHcsIG4pIHsgcmV0dXJuIEowICsgKEh0ICsgbHcpIC8gKDIgKiBQSSkgKyBuOyB9XG5mdW5jdGlvbiBzb2xhclRyYW5zaXRKKGRzLCBNLCBMKSAgeyByZXR1cm4gSjIwMDAgKyBkcyArIDAuMDA1MyAqIHNpbihNKSAtIDAuMDA2OSAqIHNpbigyICogTCk7IH1cblxuZnVuY3Rpb24gaG91ckFuZ2xlKGgsIHBoaSwgZCkgeyByZXR1cm4gYWNvcygoc2luKGgpIC0gc2luKHBoaSkgKiBzaW4oZCkpIC8gKGNvcyhwaGkpICogY29zKGQpKSk7IH1cbmZ1bmN0aW9uIG9ic2VydmVyQW5nbGUoaGVpZ2h0KSB7IHJldHVybiAtMi4wNzYgKiBNYXRoLnNxcnQoaGVpZ2h0KSAvIDYwOyB9XG5cbi8vIHJldHVybnMgc2V0IHRpbWUgZm9yIHRoZSBnaXZlbiBzdW4gYWx0aXR1ZGVcbmZ1bmN0aW9uIGdldFNldEooaCwgbHcsIHBoaSwgZGVjLCBuLCBNLCBMKSB7XG5cbiAgICB2YXIgdyA9IGhvdXJBbmdsZShoLCBwaGksIGRlYyksXG4gICAgICAgIGEgPSBhcHByb3hUcmFuc2l0KHcsIGx3LCBuKTtcbiAgICByZXR1cm4gc29sYXJUcmFuc2l0SihhLCBNLCBMKTtcbn1cblxuXG4vLyBjYWxjdWxhdGVzIHN1biB0aW1lcyBmb3IgYSBnaXZlbiBkYXRlLCBsYXRpdHVkZS9sb25naXR1ZGUsIGFuZCwgb3B0aW9uYWxseSxcbi8vIHRoZSBvYnNlcnZlciBoZWlnaHQgKGluIG1ldGVycykgcmVsYXRpdmUgdG8gdGhlIGhvcml6b25cblxuU3VuQ2FsYy5nZXRUaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZywgaGVpZ2h0KSB7XG5cbiAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMDtcblxuICAgIHZhciBsdyA9IHJhZCAqIC1sbmcsXG4gICAgICAgIHBoaSA9IHJhZCAqIGxhdCxcblxuICAgICAgICBkaCA9IG9ic2VydmVyQW5nbGUoaGVpZ2h0KSxcblxuICAgICAgICBkID0gdG9EYXlzKGRhdGUpLFxuICAgICAgICBuID0ganVsaWFuQ3ljbGUoZCwgbHcpLFxuICAgICAgICBkcyA9IGFwcHJveFRyYW5zaXQoMCwgbHcsIG4pLFxuXG4gICAgICAgIE0gPSBzb2xhck1lYW5Bbm9tYWx5KGRzKSxcbiAgICAgICAgTCA9IGVjbGlwdGljTG9uZ2l0dWRlKE0pLFxuICAgICAgICBkZWMgPSBkZWNsaW5hdGlvbihMLCAwKSxcblxuICAgICAgICBKbm9vbiA9IHNvbGFyVHJhbnNpdEooZHMsIE0sIEwpLFxuXG4gICAgICAgIGksIGxlbiwgdGltZSwgaDAsIEpzZXQsIEpyaXNlO1xuXG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBzb2xhck5vb246IGZyb21KdWxpYW4oSm5vb24pLFxuICAgICAgICBuYWRpcjogZnJvbUp1bGlhbihKbm9vbiAtIDAuNSlcbiAgICB9O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gdGltZXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgdGltZSA9IHRpbWVzW2ldO1xuICAgICAgICBoMCA9ICh0aW1lWzBdICsgZGgpICogcmFkO1xuXG4gICAgICAgIEpzZXQgPSBnZXRTZXRKKGgwLCBsdywgcGhpLCBkZWMsIG4sIE0sIEwpO1xuICAgICAgICBKcmlzZSA9IEpub29uIC0gKEpzZXQgLSBKbm9vbik7XG5cbiAgICAgICAgcmVzdWx0W3RpbWVbMV1dID0gZnJvbUp1bGlhbihKcmlzZSk7XG4gICAgICAgIHJlc3VsdFt0aW1lWzJdXSA9IGZyb21KdWxpYW4oSnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gbW9vbiBjYWxjdWxhdGlvbnMsIGJhc2VkIG9uIGh0dHA6Ly9hYS5xdWFlLm5sL2VuL3Jla2VuL2hlbWVscG9zaXRpZS5odG1sIGZvcm11bGFzXG5cbmZ1bmN0aW9uIG1vb25Db29yZHMoZCkgeyAvLyBnZW9jZW50cmljIGVjbGlwdGljIGNvb3JkaW5hdGVzIG9mIHRoZSBtb29uXG5cbiAgICB2YXIgTCA9IHJhZCAqICgyMTguMzE2ICsgMTMuMTc2Mzk2ICogZCksIC8vIGVjbGlwdGljIGxvbmdpdHVkZVxuICAgICAgICBNID0gcmFkICogKDEzNC45NjMgKyAxMy4wNjQ5OTMgKiBkKSwgLy8gbWVhbiBhbm9tYWx5XG4gICAgICAgIEYgPSByYWQgKiAoOTMuMjcyICsgMTMuMjI5MzUwICogZCksICAvLyBtZWFuIGRpc3RhbmNlXG5cbiAgICAgICAgbCAgPSBMICsgcmFkICogNi4yODkgKiBzaW4oTSksIC8vIGxvbmdpdHVkZVxuICAgICAgICBiICA9IHJhZCAqIDUuMTI4ICogc2luKEYpLCAgICAgLy8gbGF0aXR1ZGVcbiAgICAgICAgZHQgPSAzODUwMDEgLSAyMDkwNSAqIGNvcyhNKTsgIC8vIGRpc3RhbmNlIHRvIHRoZSBtb29uIGluIGttXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByYTogcmlnaHRBc2NlbnNpb24obCwgYiksXG4gICAgICAgIGRlYzogZGVjbGluYXRpb24obCwgYiksXG4gICAgICAgIGRpc3Q6IGR0XG4gICAgfTtcbn1cblxuU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24gPSBmdW5jdGlvbiAoZGF0ZSwgbGF0LCBsbmcpIHtcblxuICAgIHZhciBsdyAgPSByYWQgKiAtbG5nLFxuICAgICAgICBwaGkgPSByYWQgKiBsYXQsXG4gICAgICAgIGQgICA9IHRvRGF5cyhkYXRlKSxcblxuICAgICAgICBjID0gbW9vbkNvb3JkcyhkKSxcbiAgICAgICAgSCA9IHNpZGVyZWFsVGltZShkLCBsdykgLSBjLnJhLFxuICAgICAgICBoID0gYWx0aXR1ZGUoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIC8vIGZvcm11bGEgMTQuMSBvZiBcIkFzdHJvbm9taWNhbCBBbGdvcml0aG1zXCIgMm5kIGVkaXRpb24gYnkgSmVhbiBNZWV1cyAoV2lsbG1hbm4tQmVsbCwgUmljaG1vbmQpIDE5OTguXG4gICAgICAgIHBhID0gYXRhbihzaW4oSCksIHRhbihwaGkpICogY29zKGMuZGVjKSAtIHNpbihjLmRlYykgKiBjb3MoSCkpO1xuXG4gICAgaCA9IGggKyBhc3Ryb1JlZnJhY3Rpb24oaCk7IC8vIGFsdGl0dWRlIGNvcnJlY3Rpb24gZm9yIHJlZnJhY3Rpb25cblxuICAgIHJldHVybiB7XG4gICAgICAgIGF6aW11dGg6IGF6aW11dGgoSCwgcGhpLCBjLmRlYyksXG4gICAgICAgIGFsdGl0dWRlOiBoLFxuICAgICAgICBkaXN0YW5jZTogYy5kaXN0LFxuICAgICAgICBwYXJhbGxhY3RpY0FuZ2xlOiBwYVxuICAgIH07XG59O1xuXG5cbi8vIGNhbGN1bGF0aW9ucyBmb3IgaWxsdW1pbmF0aW9uIHBhcmFtZXRlcnMgb2YgdGhlIG1vb24sXG4vLyBiYXNlZCBvbiBodHRwOi8vaWRsYXN0cm8uZ3NmYy5uYXNhLmdvdi9mdHAvcHJvL2FzdHJvL21waGFzZS5wcm8gZm9ybXVsYXMgYW5kXG4vLyBDaGFwdGVyIDQ4IG9mIFwiQXN0cm9ub21pY2FsIEFsZ29yaXRobXNcIiAybmQgZWRpdGlvbiBieSBKZWFuIE1lZXVzIChXaWxsbWFubi1CZWxsLCBSaWNobW9uZCkgMTk5OC5cblxuU3VuQ2FsYy5nZXRNb29uSWxsdW1pbmF0aW9uID0gZnVuY3Rpb24gKGRhdGUpIHtcblxuICAgIHZhciBkID0gdG9EYXlzKGRhdGUgfHwgbmV3IERhdGUoKSksXG4gICAgICAgIHMgPSBzdW5Db29yZHMoZCksXG4gICAgICAgIG0gPSBtb29uQ29vcmRzKGQpLFxuXG4gICAgICAgIHNkaXN0ID0gMTQ5NTk4MDAwLCAvLyBkaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1biBpbiBrbVxuXG4gICAgICAgIHBoaSA9IGFjb3Moc2luKHMuZGVjKSAqIHNpbihtLmRlYykgKyBjb3Mocy5kZWMpICogY29zKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpLFxuICAgICAgICBpbmMgPSBhdGFuKHNkaXN0ICogc2luKHBoaSksIG0uZGlzdCAtIHNkaXN0ICogY29zKHBoaSkpLFxuICAgICAgICBhbmdsZSA9IGF0YW4oY29zKHMuZGVjKSAqIHNpbihzLnJhIC0gbS5yYSksIHNpbihzLmRlYykgKiBjb3MobS5kZWMpIC1cbiAgICAgICAgICAgICAgICBjb3Mocy5kZWMpICogc2luKG0uZGVjKSAqIGNvcyhzLnJhIC0gbS5yYSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhY3Rpb246ICgxICsgY29zKGluYykpIC8gMixcbiAgICAgICAgcGhhc2U6IDAuNSArIDAuNSAqIGluYyAqIChhbmdsZSA8IDAgPyAtMSA6IDEpIC8gTWF0aC5QSSxcbiAgICAgICAgYW5nbGU6IGFuZ2xlXG4gICAgfTtcbn07XG5cblxuZnVuY3Rpb24gaG91cnNMYXRlcihkYXRlLCBoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUudmFsdWVPZigpICsgaCAqIGRheU1zIC8gMjQpO1xufVxuXG4vLyBjYWxjdWxhdGlvbnMgZm9yIG1vb24gcmlzZS9zZXQgdGltZXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly93d3cuc3RhcmdhemluZy5uZXQva2VwbGVyL21vb25yaXNlLmh0bWwgYXJ0aWNsZVxuXG5TdW5DYWxjLmdldE1vb25UaW1lcyA9IGZ1bmN0aW9uIChkYXRlLCBsYXQsIGxuZywgaW5VVEMpIHtcbiAgICB2YXIgdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGlmIChpblVUQykgdC5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICBlbHNlIHQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICB2YXIgaGMgPSAwLjEzMyAqIHJhZCxcbiAgICAgICAgaDAgPSBTdW5DYWxjLmdldE1vb25Qb3NpdGlvbih0LCBsYXQsIGxuZykuYWx0aXR1ZGUgLSBoYyxcbiAgICAgICAgaDEsIGgyLCByaXNlLCBzZXQsIGEsIGIsIHhlLCB5ZSwgZCwgcm9vdHMsIHgxLCB4MiwgZHg7XG5cbiAgICAvLyBnbyBpbiAyLWhvdXIgY2h1bmtzLCBlYWNoIHRpbWUgc2VlaW5nIGlmIGEgMy1wb2ludCBxdWFkcmF0aWMgY3VydmUgY3Jvc3NlcyB6ZXJvICh3aGljaCBtZWFucyByaXNlIG9yIHNldClcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAyNDsgaSArPSAyKSB7XG4gICAgICAgIGgxID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpKSwgbGF0LCBsbmcpLmFsdGl0dWRlIC0gaGM7XG4gICAgICAgIGgyID0gU3VuQ2FsYy5nZXRNb29uUG9zaXRpb24oaG91cnNMYXRlcih0LCBpICsgMSksIGxhdCwgbG5nKS5hbHRpdHVkZSAtIGhjO1xuXG4gICAgICAgIGEgPSAoaDAgKyBoMikgLyAyIC0gaDE7XG4gICAgICAgIGIgPSAoaDIgLSBoMCkgLyAyO1xuICAgICAgICB4ZSA9IC1iIC8gKDIgKiBhKTtcbiAgICAgICAgeWUgPSAoYSAqIHhlICsgYikgKiB4ZSArIGgxO1xuICAgICAgICBkID0gYiAqIGIgLSA0ICogYSAqIGgxO1xuICAgICAgICByb290cyA9IDA7XG5cbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgZHggPSBNYXRoLnNxcnQoZCkgLyAoTWF0aC5hYnMoYSkgKiAyKTtcbiAgICAgICAgICAgIHgxID0geGUgLSBkeDtcbiAgICAgICAgICAgIHgyID0geGUgKyBkeDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MSkgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MikgPD0gMSkgcm9vdHMrKztcbiAgICAgICAgICAgIGlmICh4MSA8IC0xKSB4MSA9IHgyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3RzID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoaDAgPCAwKSByaXNlID0gaSArIHgxO1xuICAgICAgICAgICAgZWxzZSBzZXQgPSBpICsgeDE7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyb290cyA9PT0gMikge1xuICAgICAgICAgICAgcmlzZSA9IGkgKyAoeWUgPCAwID8geDIgOiB4MSk7XG4gICAgICAgICAgICBzZXQgPSBpICsgKHllIDwgMCA/IHgxIDogeDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJpc2UgJiYgc2V0KSBicmVhaztcblxuICAgICAgICBoMCA9IGgyO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgIGlmIChyaXNlKSByZXN1bHQucmlzZSA9IGhvdXJzTGF0ZXIodCwgcmlzZSk7XG4gICAgaWYgKHNldCkgcmVzdWx0LnNldCA9IGhvdXJzTGF0ZXIodCwgc2V0KTtcblxuICAgIGlmICghcmlzZSAmJiAhc2V0KSByZXN1bHRbeWUgPiAwID8gJ2Fsd2F5c1VwJyA6ICdhbHdheXNEb3duJ10gPSB0cnVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gZXhwb3J0IGFzIE5vZGUgbW9kdWxlIC8gQU1EIG1vZHVsZSAvIGJyb3dzZXIgdmFyaWFibGVcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gU3VuQ2FsYztcbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKFN1bkNhbGMpO1xuZWxzZSB3aW5kb3cuU3VuQ2FsYyA9IFN1bkNhbGM7XG5cbn0oKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9jc3Mvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IFN1bkNhbGMgZnJvbSBcIi4vc3VuY2FsY1wiO1xuLy8gaW1wb3J0IHsgY3JlYXRlTmV3RWxlbWVudCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFN1bmNhbGMgZnJvbSBcIi4vc3VuY2FsY1wiO1xuXG4vLyBEZWZhdWx0IGxvY2F0aW9uIFZhbmNvdXZlclxuY29uc3QgbG9jYXRpb24gPSB7XG4gIGxhdGl0dWRlOiBcIjQ5LjIxM1wiLFxuICBsb25naXR1ZGU6IFwiLTEyMy4xMDVcIlxufVxuXG4vLyBPbmUgQ2FsbCBBUEkgLSBpbmNsdWRlcyBmb3JlY2FzdFxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdGl0dWRlfSZsb249JHtsb25naXR1ZGV9JmFwcGlkPThmMTJkZmFiMGRlMzgwOTllMGI1YTdhMmRkYzQ1ZTM3YCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh7IHdlYXRoZXJEYXRhIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59XG5cbi8vIEdlb2xvY2F0aW9uIHZpYSBJUCAoZmlyc3QgY2hvaWNlKVxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tSVAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9jYXRpb25JUCA9IGF3YWl0IGZldGNoKGBodHRwOi8vaXAtYXBpLmNvbS9qc29uL2AsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gICAgY29uc3QgbG9jYXRpb25JUERhdGEgPSBhd2FpdCBsb2NhdGlvbklQLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh7IGxvY2F0aW9uSVBEYXRhIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59XG5cbi8vIENvb3JkaW5hdGVzIGZyb20gR2VvbG9jYXRpb24gQVBJIChwb3AtdXAgZm9yIHVzZXIpXG5mdW5jdGlvbiBxdWVyeUxvY2F0aW9uKCkge1xuICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xuICAgIGxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgIGxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gIH0pO1xufVxuXG5cbi8vIENvbnZlcnQgZ2VvbG9jYXRpb24gY29vcmRpbmF0ZXMgdG8gYWRkcmVzc1xuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tQ29vcmRzKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnL3JldmVyc2U/Zm9ybWF0PWpzb252MiZsYXQ9JHtsYXRpdHVkZX0mbG9uPSR7bG9uZ2l0dWRlfWAsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApO1xuICAgIGNvbnN0IGxvY2F0aW9uRGF0YSA9IGF3YWl0IGxvY2F0aW9uLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh7IGxvY2F0aW9uRGF0YSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufVxuXG5nZXRMb2NhdGlvbkZyb21JUCgpO1xuZ2V0TG9jYXRpb25Gcm9tQ29vcmRzKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpO1xuLy8gZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcblxuZnVuY3Rpb24gZ2V0Q2VsY2l1cyhLZWx2aW4pIHtcbiAgcmV0dXJuIEtlbHZpbiAtIDI3My4xNTtcbn1cblxuZnVuY3Rpb24gZ2V0RmFocmVpbmhlaXQoS2VsdmluKSB7XG4gIHJldHVybiAoKEtlbHZpbiAtIDI3My4xNSkgKiA5KSAvIDUgKyAzMjtcbn1cblxuXG5sZXQgbm93ID0gbmV3IERhdGUoKTtcbmNvbnNvbGUubG9nKFN1bkNhbGMuZ2V0TW9vbklsbHVtaW5hdGlvbihub3cpKTtcblxuY29uc29sZS5sb2coU3VuQ2FsYy5nZXRNb29uVGltZXMobm93LCBsb2NhdGlvbi5sYXRpdHVkZSwgbG9jYXRpb24ubG9uZ2l0dWRlKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9