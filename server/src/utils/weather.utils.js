const axios = require("axios");
const config = require("../config/config");

const getWeatherData = async (city) => {
  console.log(" getWeatherData city:", city);
  
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const params = {
    q: city,
    appid: config.openWeatherApiKey,
    units: "metric",
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const data = response.data;
    console.log("Weather Data:", data);

    console.log(`Weather in ${city}:`);
    console.log(`Temperature: ${data.main.temp}°C`);
    console.log(`Description: ${data.weather[0].description}`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Wind Speed: ${data.wind.speed} m/s`);

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error fetching weather data:", error.message);
    }
    return null;
  }
};

module.exports = { getWeatherData };
