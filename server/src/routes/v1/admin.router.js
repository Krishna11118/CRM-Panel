const router = require("express").Router();
const authenticate = require("../../middlewares/authentication");
const adminAuthentication = require("../../middlewares/admin.authentication");
const {
  adminRegister,
  adminLogin,
  getAdmin,
} = require("../../controllers/admin.controller");
const {
  subAdminRegister,
  getAllSubAdmin,
  deleteSubAdmin,
  updateSubAdminData,
  subAdminStatus,
  getSingleSubAdmin,
} = require("../../controllers/subAdmin.controller");
const {
  getUsers,
  updateUserData,
  userStatus,
  deleteUser,
} = require("../../controllers/users.controller");

// -------------------------------------------------------------------------------admin route
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get(
  "/globalAccess/singleData",
  authenticate,
  adminAuthentication,
  getAdmin
);

// -------------------------------------------------------------------------------subAdmin route

// to get subAdmin's data
router.get(
  "/admin/subAdmin/data",
  authenticate,
  adminAuthentication,
  getAllSubAdmin
);

// to register subAdmin
router.post(
  "/subAdmin/register",
  authenticate,
  adminAuthentication,
  subAdminRegister
);

// to detete subAdmin
router.delete(
  "/admin/subAdmin/delete/:subAdminId",
  authenticate,
  adminAuthentication,
  deleteSubAdmin
);

// to update subAdmin
router.patch(
  "/admin/subAdmin/update/:subAdminId",
  authenticate,
  adminAuthentication,
  updateSubAdminData
);

// to change subAdmin's status
router.put(
  "/admin/subAdmin/:subAdminId/:isActive",
  authenticate,
  adminAuthentication,
  subAdminStatus
);

// to get single subAdmin
router.get(
  "/admin/subAdmin/single/:subAdminId",
  authenticate,
  adminAuthentication,
  getSingleSubAdmin
);

// -------------------------------------------------------------------------------users route

// to get all user's data
router.get("/admin/user/data", authenticate, adminAuthentication, getUsers);

// to update user's data
router.patch(
  "/admin/user/update/:userId",
  authenticate,
  adminAuthentication,
  updateUserData
);

// to change user's status
router.put(
  "/admin/user/:userId/:isActive",
  authenticate,
  adminAuthentication,
  userStatus
);

// to delete user
router.delete(
  "/admin/user/delete/:userId",
  authenticate,
  adminAuthentication,
  deleteUser
);




module.exports = router;
