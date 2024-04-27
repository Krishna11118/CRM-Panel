const router = require("express").Router();
const authenticate = require("../../middlewares/authentication");
const adminAuthentication = require("../../middlewares/admin.authentication");
const {
  adminRegister,
  adminLogin,
} = require("../../controllers/admin.controller");
const {
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

// -------------------------------------------------------------------------------subAdmin route
// to get subAdmin's data
router.get(
  "/admin/subAdmin/data",
  authenticate,
  adminAuthentication,
  getAllSubAdmin
);

// to detete subAdmin
router.delete("admin/subAdminelete/:subAdminId", deleteSubAdmin);

// to update subAdmin
router.patch("admin/subAdmin/update/:subAdminId", updateSubAdminData);

// to update subAdmin's status
router.put("/subAdmin/:subAdminId/:isActive", subAdminStatus);

// -------------------------------------------------------------------------------users route

// to get all user's data
router.get("/admin/user/data", authenticate, adminAuthentication, getUsers);

// to update user's data
router.patch("admin/user/update/:userId", updateUserData);

// to update user's status
router.put("admin/user/:userId/:isActive", userStatus);

// to delete user
router.delete("admin/user/delete/:userId", deleteUser);

module.exports = router;
