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
  console.log({ location });
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

  console.log({ location });
}

// Set up DOM (couldn't get this working with module exports)

// Input search bar
const form = createNewElement("form");
const input = createNewElement("input", null, null, {
  type: "search",
  placeholder: "Search City",
});

form.appendChild(input);
container.appendChild(form);

// Simple submit - by city name
// form.addEventListener("submit", (ev) => {
//   ev.preventDefault();
//   weatherLoad(input.value)
//     .then(() => {
//       populateWeatherCard();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Complex submit - using name query to return coordinates
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const coords = await getLocationFromInput(input.value);

  console.log("Received back " + coords);

  if (coords === "City Not Found") {
    input.value = "City not found";
    return;
  }

  // add in ID here
  [location.latitude, location.longitude, location.id] = coords;

  // And get the address from the ID not from the lat
  const addressInfo = await getAddressFromId(location.id);

  console.log("Received back " + addressInfo);

  [location.city, location.state, location.country, location.countryCode] =
    addressInfo;

  console.log({ location });

  weatherLoadCoord(location.latitude, location.longitude)
    .then(() => {
      populateWeatherCard();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Info display card
const temperatureMode = "Celsius";
const infoCard = createNewElement("div", ["infoCard"]);

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

const currentDateTime = createNewElement(
  "p",
  ["currentTime"],
  `${dateValue}, ${timeValue}`
);

infoCard.appendChild(currentDateTime);

const infoWrapper = createNewElement("div", ["infoWrapper"]);
container.appendChild(infoWrapper);

const cityHeading = createNewElement("h1", ["city"]);
const countryHeading = createNewElement("h2", ["country"]);

const tempLine = createNewElement("div", ["tempBox"]);
const temperatureMain = createNewElement("p", ["tempMain"]);
const degreeNotation = createNewElement("p", ["degree"]);
const feelsLike = createNewElement("p", ["feelsLike"]);

tempLine.appendChild(temperatureMain);
tempLine.appendChild(degreeNotation);

infoCard.append(cityHeading, countryHeading, tempLine, feelsLike);

infoWrapper.appendChild(infoCard);

const iconCard = createNewElement("div", ["iconCard"]);
const icon = createNewElement("img", ["icon"]);
const iconLabel = createNewElement("p", ["icon-label"]);

iconCard.append(icon, iconLabel);
infoWrapper.appendChild(iconCard);

function populateWeatherCard() {
  // Only the one-call API returns named timezone; the simple call returns a timezone offset and I think I would need an external package to use that to convert to local time

  console.log(`Calling date formatting with timezone ${location.time}`);

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
  return `../src/svg/${weatherIcons[location.weatherIcon]}.svg`;
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

  console.log("received back from address query: ")
  console.log({ addressInfo });

  [
    location.city,
    location.state,
    location.country,
    location.countryCode,
  ] = addressInfo;

  console.log("calling weather with the coords and this info: ");

  console.log({ location });

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
