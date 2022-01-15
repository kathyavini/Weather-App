import "./css/styles.css";
import SunCalc from "./suncalc";
// import { createNewElement } from './utils';
import Suncalc from "./suncalc";

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
console.log(SunCalc.getMoonIllumination(now));

console.log(SunCalc.getMoonTimes(now, location.latitude, location.longitude));