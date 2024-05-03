const userdb = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../utils/bcrypt.utils");
const { comparePasswords } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/token.utils");

// ----------------------------------------login user-----------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill in all the details" });
  }

  try {
    const user = await userdb.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: "Your are inactive. Please contact the administrator.",
      });
    }

    // Compare the password
    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const userdata = {
      user: {
        id: user._id,
      },
    };
    const token = generateToken(userdata);

    const result = {
      user,
      token,
      msg: "Logged In Successfully",
      success: true,
    };

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ----------------------------------------register user-----------------------------------------
const registerUser = async (req, res) => {
  const { fname, mobile, email, password } = req.body;

  if (!fname || !mobile || !email || !password) {
    res.status(404).json({ error: "Please fill all the details" });
    return;
  }

  try {
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      res.status(409).json({ error: "This Email is Already Exist" });
    } else {
      const hashedPassword = await hashPassword(password);

      const finalUser = new userdb({
        fname,
        mobile,
        email,
        password: hashedPassword,
      });

      const storeData = await finalUser.save();

      const userdata = {
        user: {
          id: storeData._id,
        },
      };

      const token = generateToken(userdata);
      res.status(201).json({ status: 201, storeData, token });
    }
  } catch (error) {
    res.status(404).json({ error });
    console.log("Catch block error", error);
  }
};

//---------------------------------------Get all users---------------------------------------
const getUsers = async (req, res) => {
  try {
    const users = await userdb.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//-----------------------------------------Delete user-----------------------------------------
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await userdb.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal server error");
  }
};

//-----------------------------------------Get one user-----------------------------------------
const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const users = await userdb.findOne({ _id: userId });
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// ----------------------------------------Update user data-----------------------------------------
const updateUserData = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;
  const { email, mobile } = newData;

  try {
    const preuser = await userdb.findOne({ email: email });
    const premobile = await userdb.findOne({ mobile: mobile });
    // Check if the email or mobile number is already in use
    if (preuser || premobile) {
      res.status(409).json({
        error: `This ${
          premobile ? "mobile number" : "E-mail"
        } is Already Exist`,
      });
      return;
    }
    // Hash password
    if (newData.password) {
      newData.password = await hashPassword(newData.password);
    }

    // Update user data
    const updatedUser = await userdb
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

// ----------------------------------------Update user status-----------------------------------------
const userStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const isActive = req.params.isActive;

  try {
    const user = await userdb.findByIdAndUpdate(userId, { isActive: isActive });
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
  loginUser,
  registerUser,
  getUsers,
  deleteUser,
  getUser,
  updateUserData,
  userStatus,
};
