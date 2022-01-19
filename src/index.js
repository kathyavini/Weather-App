import "./css/styles.css";
import createNewElement from "./utils";
import countryCodes from "./countryCodes";
import {
  getWeather,
  getWeatherSimple,
  getLocationFromIP,
  getLocationFromInput,
  getAddressFromId,
  getAddressFromCoords,
} from "./api";
import weatherIcons from "./weatherIcons";

// Set up page
const body = document.querySelector("body");
const container = createNewElement("div", ["container"]);
body.appendChild(container);

export default container;

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
  location.country = countryCodes[location.countryCode];
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
const form = createNewElement("form");
const input = createNewElement("input", null, null, {
  type: "search",
  placeholder: "Search City",
});

const loadingBar = createNewElement('div', ['loading']);
const loadingBarAnimation = createNewElement('div', ['loading-bar']);
loadingBar.appendChild(loadingBarAnimation);

const formWarning = createNewElement('p', ['warning']);

form.append(input, loadingBar, formWarning);
container.appendChild(form);

// Complex submit - using name query to return coordinates
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  loadingBar.classList.add('active');
  const coords = await getLocationFromInput(input.value);

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
  const addressInfo = await getAddressFromId(location.id);

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
const infoCard = createNewElement("div", ["infoCard"]);
const currentDateTime = createNewElement(
  "p",
  ["currentTime"],
);

infoCard.appendChild(currentDateTime);

const infoWrapper = createNewElement("div", ["infoWrapper"]);
container.appendChild(infoWrapper);

const cityHeading = createNewElement("h1", ["city"], "Loading Weather...");
const countryHeading = createNewElement("h2", ["country"]);

const tempLine = createNewElement("div", ["tempBox"]);
const temperatureMain = createNewElement("p", ["tempMain"]);
const degreeNotation = createNewElement("p", ["degree"]);
const feelsLike = createNewElement("p", ["feelsLike"]);

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

const iconCard = createNewElement("div", ["iconCard"]);
const icon = createNewElement("object", ["icon"], null, {'type': "image/svg+xml", 'data': './svg/windsock.svg'});
const iconLabel = createNewElement("p", ["icon-label"]);

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
  return `./svg/${weatherIcons[location.weatherIcon]}.svg`;
}

function convertCelsius(Kelvin) {
  return Kelvin - 273.15;
}

function convertFahreinheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}

// Run on page load and on form submit
async function weatherLoad(input) {
  const returnedInfo = await getWeatherSimple(input);
  processReturnedInfo(returnedInfo);
}

async function weatherLoadCoord(lat, lon) {
  const returnedInfo = await getWeather(lat, lon);
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

  const addressInfo = await getAddressFromCoords(
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