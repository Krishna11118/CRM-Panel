const subAdmindb = require("../models/subAdminSchema");

// --------------------------------------------------------------------SubAdmin authentication
const subAdminAuthentication = async (req, res, next) => {
  try {
    // const token = req.token;
    const getId = req.verifytoken.user.id;

    const rootUser = await subAdmindb.findOne({ _id: getId });

    if (!rootUser) {
      throw new Error("User not found");
    }
    
    // console.log(rootUser, "rootUser");

    // req.token = token;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized token not provided" });
  }
};

module.exports = subAdminAuthentication;
