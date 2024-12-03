const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "../../.env") });

mongoose.set("strictQuery", false);

module.exports = {
  secretKey: process.env.SECRET_KEY,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  ip2locationApiKey : process.env.IP2LOCATION_API_KEY,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  
};
