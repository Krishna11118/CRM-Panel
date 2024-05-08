const admindb = require("../models/adminSchema");

// --------------------------------------------------------------------Admin authentication
const adminAuthentication = async (req, res, next) => {
  try {
    
    const getId = req.verifytoken.user.id;
    const rootUser = await admindb.findOne({ _id: getId });
 
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

module.exports = adminAuthentication;
