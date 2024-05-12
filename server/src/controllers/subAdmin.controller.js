const subAdmindb = require("../models/subAdminSchema");
const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/token.utils");
const { comparePasswords } = require("../utils/bcrypt.utils");

// --------------------------------------------------------------------------- register
const subAdminRegister = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    mobile,
    fname,
    createUser,
    readUser,
    updateUser,
    deleteUser,
    changeStatus,
  } = req.body;
  console.log(createUser, readUser, updateUser, deleteUser, changeStatus);

  if (!email || !password || !mobile || !fname) {
    return res.status(400).json({ error: "Please fill all details" });
  }

  // Check if the user already exists
  const existingUser = await subAdmindb.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Sub Admin already exists" });
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user
  const newSubAdmin = new subAdmindb({
    email,
    password: hashedPassword,
    fname,
    mobile,
    permissions: {
      createUser,
      readUser,
      updateUser,
      deleteUser,
      changeStatus,
    },
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
  res.status(201).json({ token, message: "SubAdmin Created Successfully" });
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
    return res.status(400).json({ error: "Sub Admin not founded!" });
  }

  //----------------------------------------Compare password-----------------

  const isMatching = await comparePasswords(password, user.password);

  if (!isMatching) {
    return res.status(401).json({ error: "Invalid password" });
  }

  if (user.isActive === false) {
    return res.status(401).json({ error: "Your account is not active" });
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
  const { subAdminId } = req.params;
  try {
    await subAdmindb.findByIdAndDelete(subAdminId);
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
  const subAdminId = req.params.subAdminId;
  const newData = req.body;
  const { email, mobile, password, fname } = newData;

  try {
    const updateFields = {};
    if (email || password || mobile || fname) {
      // Update fields with data
      if (fname !== undefined) {
        updateFields.fname = fname;
      }
      if (email !== undefined) {
        updateFields.email = email;
      }
      if (mobile !== undefined) {
        updateFields.mobile = mobile;
      }
      if (password !== undefined) {
        updateFields.password = await hashPassword(password);
      }
    }
    // Check if any fields are being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Check for duplicate email or mobile only if they are being updated
    const preEmail = await subAdmindb.findOne({ email });
    if (preEmail) {
      return res.status(409).json({
        error: `This email is already in use`,
      });
    }

    const preMobile = await subAdmindb.findOne({ mobile });
    if (preMobile) {
      return res.status(409).json({
        error: `This mobile number is already in use`,
      });
    }

    // Update subAdmins data
    const updatedUser = await subAdmindb
      .findByIdAndUpdate(subAdminId, updateFields, {
        new: true,
      })
      .lean();

    if (!updatedUser) {
      return res.status(404).send(`No user found`);
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//-------------------------------------------------------------------------------Update subAdmin Permissions

const updateSubAdminPermissions = asyncHandler(async (req, res) => {
  const subAdminId = req.params.subAdminId;
  const { createUser, readUser, updateUser, changeStatus, deleteUser } =
    req.body;

  try {
    // Update subAdmins data
    const updatedUser = await subAdmindb.findOneAndUpdate(
      { _id: subAdminId },
      {
        $set: {
          "permissions.createUser": createUser,
          "permissions.readUser": readUser,
          "permissions.updateUser": updateUser,
          "permissions.changeStatus": changeStatus,
          "permissions.deleteUser": deleteUser,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send(`No user found`);
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// -------------------------------------------------------------------------------Update subAdmin status
const subAdminStatus = asyncHandler(async (req, res) => {
  const subAdminId = req.params.subAdminId;
  const isActive = req.params.isActive;
  try {
    const user = await subAdmindb.findByIdAndUpdate(subAdminId, {
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

// -------------------------------------------------------------------------------Single subAdmin
const getSingleSubAdmin = asyncHandler(async (req, res) => {
  const subAdminId = req.params.subAdminId;
  try {
    const user = await subAdmindb.findById(subAdminId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
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
  getSingleSubAdmin,
  updateSubAdminPermissions,
};
