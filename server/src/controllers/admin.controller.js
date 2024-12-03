const admindb = require("../models/adminSchema");
const { hashPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/token.utils");
const asyncHandler = require("express-async-handler");
const { comparePasswords } = require("../utils/bcrypt.utils");

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
  try {
    const users = await admindb.findOne({ _id: userId });
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { adminRegister, adminLogin, getAdmin };
