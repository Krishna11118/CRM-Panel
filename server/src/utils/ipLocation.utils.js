const config = require("../../src/config/config");
const ip2locationio = require("ip2location-io-nodejs"); // used to get the details of the IP address

const getIpLocation = async (req, res, next) => {
  try {
    const configToGetDetails = new ip2locationio.Configuration(
      config.ip2locationApiKey
    );

    const ipLocation = new ip2locationio.IPGeolocation(configToGetDetails);
    
    const networkIp = req.clientIp;
    const ipDetails = await ipLocation.lookup(networkIp);
    console.log("ipDetails:", ipDetails);

    req.ipDetails = ipDetails;

    console.log("req.ipDetails:", req.ipDetails);

    next();
  } catch (error) {
    console.error("Error retrieving IP details:", error);
    return res.status(500).json({ status: false, error: "Please try later" });
  }
};

module.exports = getIpLocation;
