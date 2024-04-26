const subAdmindb = require("../models/subAdminSchema");
const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/token.utils");
const { comparePasswords } = require("../utils/bcrypt.utils");

// --------------------------------------------------------------------------- register
const subAdminRegister = asyncHandler(async (req, res) => {
  const { email, password, mobile, fname, role } = req.body;

  if (!email || !password || !mobile || !fname ) {
    return res.status(400).json({ error: "Please fill all details" });
  }

  // Check if the user already exists
  const existingUser = await subAdmindb.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user
  const newSubAdmin = new subAdmindb({
    email,
    password: hashedPassword,
    fname,
    mobile,
  });

  // Save the new user to the database
  const storeData = await newSubAdmin.save();

  // Generate a token for the new user
  const userdata = {
    user: {
      id: storeData._id,
    },
  };

  const token = generateToken(userdata);

  // Respond with the token
  res.status(201).json({ token , message: "SubAdmin Created Successfully" });
});

//----------------------------------------------------------------------------- Login

const subAdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all details" });
  }

  // ---------------------------------------Compare user-------------------------
  const user = await subAdmindb.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Invalid password" });
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
    msg: "SubAdmin logged in successfully",
  };

  return res.status(201).json(loginResult);
});

//------------------------------------------------------------------------------Get all subAdmins
const getAllSubAdmin = async (req, res) => {
  try {
    const users = await subAdmindb.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//--------------------------------------------------------------------------------Delete subAdmins
const deleteSubAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    await subAdmindb.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal server error");
  }
};

//--------------------------------------------------------------------------------Get one subAdmins
const getSubAdmin = async (req, res) => {
  const userId = req.userId;
  try {
    const users = await subAdmindb.findOne({ _id: userId });
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// -------------------------------------------------------------------------------Update subAdmin's data
const updateSubAdminData = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;
  const { email, mobile } = newData;

  try {
    const preEmail = await subAdmindb.findOne({ email: email });
    const preMobile = await subAdmindb.findOne({ mobile: mobile });
    // Check if the email or mobile number is already in use
    if (preEmail || preMobile) {
      res.status(409).json({
        error: `This ${
          preMobile ? "mobile number" : "E-mail"
        } is Already Exist`,
      });
      return;
    }
    // Hash password
    if (newData.password) {
      newData.password = await hashPassword(newData.password);
    }

    // Update subAdmins data
    const updatedUser = await subAdmindb
      .findByIdAndUpdate(userId, newData, {
        new: true,
      })
      .lean();
    if (!updatedUser) {
      return res.status(404).send(`No user founded`);
    }
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// -------------------------------------------------------------------------------Update subAdmin status
const subAdminStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const isActive = req.params.isActive;
  console.log("isActive", isActive);

  try {
    const user = await subAdmindb.findByIdAndUpdate(userId, {
      isActive: isActive,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  subAdminRegister,
  subAdminLogin,
  getAllSubAdmin,
  getSubAdmin,
  deleteSubAdmin,
  updateSubAdminData,
  subAdminStatus,
};
