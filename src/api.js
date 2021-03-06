export async function getWeather(latitude, longitude) {
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

    return {
      mainWeather,
      weatherDescription,
      weatherIcon,
      currentTemp,
      feelsLike,
      time,
    };
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

// Lat, lon, and OpenStreetMap ID
export async function getLocationFromInput(inputString) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${inputString}&format=json&limit=1`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    if (!addressData[0]) {
      return 'City not found';
    }

    // Not a city/town/state - I've only seen this data format from entering US zip codes
    if (!addressData[0].osm_type) {
      return 'Please search by place name';
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
// Needed for use with user prompt geolocationAPI only
export async function getAddressFromCoords(latitude, longitude) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

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

    const { state } = addressData.address;
    const { country } = addressData.address;
    const countryCode = addressData.address.country_code.toUpperCase();

    return {
      city, state, country, countryCode,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Convert geolocation coordinates to address
export async function getAddressFromId(id) {
  try {
    const address = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=${id}&format=json`,
      { mode: 'cors' },
    );
    const addressData = await address.json();

    const placeType = Object.keys(addressData[0].address)[0];
    const city = addressData[0].address[placeType];

    const { state } = addressData[0].address;
    const { country } = addressData[0].address;
    const countryCode = addressData[0].address.country_code.toUpperCase();

    return {
      city, state, country, countryCode,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}
