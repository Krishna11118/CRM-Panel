const jwt = require("jsonwebtoken");
const config = require("../config/config");

// --------------------------------------------------------------------Authentication for all 
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secKey = config.secretKey;

    const verifytoken = jwt.verify(token, secKey);

    req.token = token;
    req.verifytoken = verifytoken;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized token not provided" });
  }
};

module.exports = authenticate;
