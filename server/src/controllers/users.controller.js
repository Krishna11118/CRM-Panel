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
  const { email, mobile, password, fname } = newData;

  try {
    // Update fields with data
    const updateFields = {};
    if (fname) {
      updateFields.fname = fname;
    }
    if (email) {
      updateFields.email = email;
    }
    if (mobile) {
      updateFields.mobile = mobile;
    }
    if (password) {
      updateFields.password = await hashPassword(password);
    }

    // Check if any fields are being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    //--------------------- Check for duplicate email or mobile only if they are being updated
    if (email) {
      const preEmail = await userdb.findOne({ email: email });
      if (preEmail) {
        return res.status(409).json({
          error: `This email is already in use`,
        });
      }
    }
    if (mobile) {
      const preMobile = await userdb.findOne({ mobile: mobile });
      if (preMobile) {
        return res.status(409).json({
          error: `This mobile number is already in use`,
        });
      }
    }

    // ------------Update user data
    const updatedUser = await userdb
      .findByIdAndUpdate(userId, updateFields, {
        new: true,
      })
      .lean();
    if (!updatedUser) {
      return res.status(404).send(`No user found`);
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

// -------------------------------------------------------------------------------Single user
const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userdb.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//-------------------------------------------------------update user permisssions *not in working
// const updateUserPermissions = asyncHandler(async (req, res) => {
//   const userId = req.params.userId;
//   const { createUser, readUser, updateUser, changeStatus, deleteUser } =
//     req.body;

//   try {
//     // Update subAdmins data
//     const updatedUser = await userdb.findOneAndUpdate(
//       { _id: userId },
//       {
//         $set: {
//           "permissions.createUser": createUser,
//           "permissions.readUser": readUser,
//           "permissions.updateUser": updateUser,
//           "permissions.changeStatus": changeStatus,
//           "permissions.deleteUser": deleteUser,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send(`No user found`);
//     }

//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });
module.exports = {
  loginUser,
  registerUser,
  getUsers,
  deleteUser,
  getUser,
  updateUserData,
  userStatus,
  getSingleUser,
};
