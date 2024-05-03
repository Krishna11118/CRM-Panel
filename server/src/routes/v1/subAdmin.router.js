const router = require("express").Router();
const {
  subAdminRegister,
  subAdminLogin,
  getSubAdmin,
} = require("../../controllers/subAdmin.controller");
const authenticate = require("../../middlewares/authentication");
const subAdminAuthentication = require("../../middlewares/subAdmin.authentication");
const {
  getUsers,
  updateUserData,
  userStatus,
  deleteUser,
} = require("../../controllers/users.controller");

//--------------------------------------------------------subAdmin route

// subAdmin login
router.post("/subAdmin/login", subAdminLogin);

// subAdmin single data
router.get(
  "/midLevelAccess/singleData",
  authenticate,
  subAdminAuthentication,
  getSubAdmin
);

//--------------------------------------------------------user route

// to get all user's data
router.get(
  "/subAdmin/user/data",
  authenticate,
  subAdminAuthentication,
  getUsers
);

// to update user's data
router.patch(
  "/subAdmin/user/update/:userId",
  authenticate,
  subAdminAuthentication,
  updateUserData
);

// to update user's status
router.put(
  "/subAdmin/user/:userId/:isActive",
  authenticate,
  subAdminAuthentication,
  userStatus
);

// to delete user
router.delete(
  "/subAdmin/user/delete/:userId",
  authenticate,
  subAdminAuthentication,
  deleteUser
);

module.exports = router;
