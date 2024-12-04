const admindb = require("../models/adminSchema");
const { hashPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/token.utils");
const asyncHandler = require("express-async-handler");
const { comparePasswords } = require("../utils/bcrypt.utils");
const { getWeatherData } = require("../utils/weather.utils");

// --------------------------------------------------------------------Admin register
const adminRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all details" });
  }

  // Check if the user already exists
  const existingUser = await admindb.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user
  const newUser = new admindb({
    email,
    password: hashedPassword,
  });

  // Save the new user to the database
  const storeData = await newUser.save();

  // Generate a token for the new user
  const userdata = {
    user: {
      id: storeData._id,
    },
  };

  const token = generateToken(userdata);

  // Respond with the token
  res.status(201).json({ token, message: "Admin created successfully" });
});

//----------------------------------------------------------------------------------Admin Login

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipData = req.ipDetails;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all details" });
    }

    // ---------------------------------------Find admin-------------------------
    const user = await admindb.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Admin not found!" });
    }

    // ----------------------------------------Compare password-----------------
    const isMatching = await comparePasswords(password, user.password);
    if (!isMatching) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!user.status) {
      return res.status(401).json({ error: "Admin is inactive!" });
    }

    // ----------------------------------------Update lastLoggedIn-----------------
    const updatedUser = await admindb.findByIdAndUpdate(
      user._id,
      {
        lastLoggedIn: {
          ip: ipData?.ip || "N/A",
          country_code: ipData?.country_code || "N/A",
          country_name: ipData?.country_name || "N/A",
          region_name: ipData?.region_name || "N/A",
          city_name: ipData?.city_name || "N/A",
          network: ipData?.as || "N/A",
        },
      },
      { new: true }
    );

    // ----------------------------------------Create Token-----------------------
    const loginUserData = {
      user: {
        id: updatedUser._id,
      },
    };

    const token = generateToken(loginUserData);

    // ----------------------------------------Return Login Result---------------
    const loginResult = {
      user: updatedUser,
      token,
      ipData,
      msg: "Admin logged in successfully",
    };

    return res.status(201).json(loginResult);
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Try later" });
  }
});

//-----------------------------------------Get single data-----------------------------------------
const getAdmin = async (req, res) => {
  const userId = req.userId;
  const ipData = req.ipDetails;

  try {
    const users = await admindb.findOne({ _id: userId });

    if (!users) {
      return res.status(404).json({ error: "Admin not found" });
    }

    let weatherData = null;
    let currentLocation = ipData?.city_name || users.lastLoggedIn?.city_name || "N/A";

    // Check if `weatherData` exists and time elapsed is less than one hour
    if (
      users.weatherData?.lastUpdated &&
      new Date() - new Date(users.weatherData.lastUpdated) < 60 * 60 * 1000
    ) {
      // console.log("Weather data fetch skipped, less than 1 hour passed.");
      weatherData = users.weatherData;
      currentLocation = users.weatherData.location !== "-" 
        ? users.weatherData.location 
        : (ipData?.city_name || users.lastLoggedIn?.city_name || "N/A");
    } else {
      // Fetch new weather data using city name
      const cityToFetch = ipData?.city_name || users.lastLoggedIn?.city_name || "Gurugram";
      const fetchedWeatherData = await getWeatherData(cityToFetch);
      // console.log("Fetched Weather Data:", fetchedWeatherData);

      if (fetchedWeatherData) {
        weatherData = {
          location: cityToFetch,
          lastUpdated: new Date(),
          Temperature: fetchedWeatherData.temperature.toString(),
          Weather: fetchedWeatherData.description,
          Humidity: fetchedWeatherData.humidity.toString(),
          WindSpeed: fetchedWeatherData.windSpeed.toString(),
        };

        // Update the user document
        users.currentLocation = {
          location: cityToFetch,
          lastUpdated: new Date(),
        };
        users.weatherData = weatherData;

        await users.save();
        console.log("Updated and Saved User:", users);
      }
    }

    // Send response
    res.status(200).json({
      users,
      weatherData,
      currentLocation,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { adminRegister, adminLogin, getAdmin };
