const userdb = require("../models/userSchema");

// --------------------------------------------------------------------User authentication
const userAuthentication = async (req, res, next) => {
  try {
    const token = req.token;
    const getId = req.verifytoken.user.id;
    const rootUser = await userdb.findOne({ _id: getId });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized token not provided" });
  }
};

module.exports = userAuthentication;
