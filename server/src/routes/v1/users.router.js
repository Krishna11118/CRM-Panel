const router = require("express").Router();
const {
  loginUser,
  registerUser,
  getUser,
} = require("../../controllers/users.controller");
const authenticate = require("../../middlewares/authentication");
const userAuthentication = require("../../middlewares/user.authentication");

// -------------------------------------------------------------------------------user route
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/singleuserdata", authenticate, userAuthentication, getUser);

module.exports = router;
