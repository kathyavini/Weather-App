export async function getWeather(latitude, longitude) {
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

export async function getWeatherSimple(city) {
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

export async function getLocationAndAddressFromInput(inputString) {
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
export async function getAddressFromCoords(latitude, longitude) {
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
export async function getLocationFromIP() {
  try {
    const locationIP = await fetch('http://ip-api.com/json/', { mode: 'cors' });
    const locationIPData = await locationIP.json();
    return locationIPData;
  } catch (err) {
    return err;
  }
}

// Coordinates from Geolocation API (pop-up for user)
export function getLocationFromUserQuery() {
  navigator.geolocation.getCurrentPosition((position) => position);
}
