import "./css/styles.css";
import createNewElement from "./utils";
import countryCodes from "./countryCodes";
import {
  getWeather,
  getWeatherSimple,
  getLocationFromIP,
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
  location.country = countryCodes[location.countryCode];
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
  return `../src/svg/${weatherIcons[location.weatherIcon]}.svg`;
}

function convertCelsius(Kelvin) {
  return Kelvin - 273.15;
}

function convertFahreinheit(Kelvin) {
  return ((Kelvin - 273.15) * 9) / 5 + 32;
}

// Run on page load and on form submit
async function pageLoad(input) {
  const returnedInfo = await getWeatherSimple(input);
  processReturnedInfo(returnedInfo);
}

async function pageLoadCords(lat, lon) {
  const returnedInfo = await getWeather(lat, lon);
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

  const addressInfo = await getAddressFromCoords(
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
