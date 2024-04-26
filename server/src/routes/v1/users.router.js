const router = require("express").Router();
const {
  loginUser,
  registerUser,
  getUsers,
  getUser,
  deleteUser,
  updateUserData,
  userStatus,
} = require("../../controllers/users.controller");
const authenticate = require("../../middlewares/authentication");
const userAuthentication = require("../../middlewares/user.authentication");

router.post("/user/register",registerUser );
router.post("/user/login", loginUser);
router.get("/user/usersdata", authenticate, userAuthentication, getUsers);
router.delete("/user/deleteUser/:userId", deleteUser);
router.get("/user/singleuserdata", authenticate, userAuthentication, getUser);
router.patch("/user/updateUser/:userId", updateUserData);
router.put("/users/:userId/:isActive", userStatus);

module.exports = router;
