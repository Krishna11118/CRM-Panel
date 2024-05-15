const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, config.secretKey);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    return null;
  }
};

module.exports = { generateToken };
