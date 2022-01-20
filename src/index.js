import './css/styles.css';
import createNewElement from './utils';
import weatherIcons from './weatherIcons';

import {
  getWeather,
  getLocationFromInput,
  getAddressFromId,
  getAddressFromCoords,
} from './api';

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
const container = createNewElement('div', ['container']);
body.appendChild(container);

// Search bar - search, loading animation, warning
const form = createNewElement('form');
const input = createNewElement('input', null, null, {
  type: 'search',
  placeholder: 'Search City',
});

// Loading in progress animation progress
const loadingBar = createNewElement('div', ['loading']);
const loadingBarAnimation = createNewElement('div', ['loading-bar']);
loadingBar.appendChild(loadingBarAnimation);

// Warning to display search errors
const formWarning = createNewElement('p', ['warning']);

form.append(input, loadingBar, formWarning);
container.appendChild(form);

// Search input event handling
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();

  loadingBar.classList.add('active');

  const coords = await getLocationFromInput(input.value);

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

  const addressPromise = getAddressFromId(location.id);
  const weatherPromise = getWeather(location.latitude, location.longitude);

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

const infoCard = createNewElement('div', ['infoCard']);
const currentDateTime = createNewElement('p', ['currentTime']);

infoCard.appendChild(currentDateTime);

const infoWrapper = createNewElement('div', ['infoWrapper']);
container.appendChild(infoWrapper);

const cityHeading = createNewElement('h1', ['city'], 'Loading Weather...');
const countryHeading = createNewElement('h2', ['country']);

const tempLine = createNewElement('div', ['tempBox']);
const temperatureMain = createNewElement('p', ['tempMain']);
const degreeNotation = createNewElement('p', ['degree']);
const feelsLike = createNewElement('p', ['feelsLike']);

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

const iconCard = createNewElement('div', ['iconCard']);
const icon = createNewElement('object', ['icon'], null, {
  type: 'image/svg+xml',
  data: './svg/windsock.svg',
});
const iconLabel = createNewElement('p', ['icon-label']);

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
  return `./svg/${weatherIcons[location.weatherIcon]}.svg`;
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

  const addressPromise = getAddressFromCoords(
    location.latitude,
    location.longitude,
  );
  const weatherPromise = getWeather(location.latitude, location.longitude);

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

  const weatherInfo = await getWeather(location.latitude, location.longitude);

  location = { ...location, ...weatherInfo };

  populateWeatherCard();
}
