const router = require("express").Router();
const {
  loginUser,
  registerUser,
  getUser,
} = require("../../controllers/users.controller");
const authenticate = require("../../middlewares/authentication");
const userAuthentication = require("../../middlewares/user.authentication");
const { getUsers } = require("../../controllers/users.controller");

// -------------------------------------------------------------------------------user route
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/singleData", authenticate, userAuthentication, getUser);
router.get("/user/user/data", authenticate, userAuthentication, getUsers);

module.exports = router;
