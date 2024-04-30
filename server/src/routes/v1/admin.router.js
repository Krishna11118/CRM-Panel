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
router.get("/admin/singleData", authenticate, adminAuthentication, getAdmin);

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
  "/admin/subAdmin/register",
  authenticate,
  adminAuthentication,
  subAdminRegister
);

// to detete subAdmin
router.delete("/admin/subAdmin/delete/:subAdminId", deleteSubAdmin);

// to update subAdmin
router.patch("/admin/subAdmin/update/:subAdminId", updateSubAdminData);

// to change subAdmin's status
router.put("/admin/subAdmin/:subAdminId/:isActive", subAdminStatus);

// -------------------------------------------------------------------------------users route

// to get all user's data
router.get("/admin/user/data", authenticate, adminAuthentication, getUsers);

// to update user's data
router.patch("/admin/user/update/:userId", updateUserData);

// to change user's status
router.put("/admin/user/:userId/:isActive", userStatus);

// to delete user
router.delete("/admin/user/delete/:userId", deleteUser);

module.exports = router;
