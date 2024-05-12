const router = require("express").Router();
const {
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
  getSingleUser,
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

// to get single user
router.get(
  "/subAdmin/user/single/:userId",
  authenticate,
  subAdminAuthentication,
  getSingleUser
);

// to update user permissions *not in working
// router.patch(
//   "/subAdmin/user/update/permissions/:subAdminId",
//   authenticate,
//   subAdminAuthentication,
//   updateUserPermissions
// );

module.exports = router;
