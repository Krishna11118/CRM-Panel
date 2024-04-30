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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all details" });
  }

  // ---------------------------------------Compare user-------------------------
  const user = await admindb.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Admin not founded!" });
  }

  //----------------------------------------Compare password-----------------

  const isMatching = await comparePasswords(password, user.password);

  if (!isMatching) {
    return res.status(401).json({ error: "Invalid password" });
  }

  //----------------------------------------Create Token
  const loginUserData = {
    user: {
      id: user._id,
    },
  };

  const token = generateToken(loginUserData);
  const loginResult = {
    user,
    token,
    msg: "Admin logged in successfully",
  };

  return res.status(201).json(loginResult);
});

//-----------------------------------------Get admin for context-----------------------------------------
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
