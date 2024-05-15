const subAdmindb = require("../models/subAdminSchema");

// --------------------------------------------------------------------SubAdmin authentication
const subAdminAuthentication = async (req, res, next) => {
  try {
    const getId = req.verifytoken.user.id;

    const rootUser = await subAdmindb.findOne({ _id: getId });

    if (!rootUser) {
      throw new Error("User not found");
    }
    
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized token not provided" });
  }
};

module.exports = subAdminAuthentication;
