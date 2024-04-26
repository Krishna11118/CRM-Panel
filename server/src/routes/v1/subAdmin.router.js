const router = require("express").Router();
const {
  subAdminRegister,
  subAdminLogin,
  getAllSubAdmin,
  getSubAdmin,
  deleteSubAdmin,
  updateSubAdminData,
  subAdminStatus,
} = require("../../controllers/subAdmin.controller");
const authenticate = require("../../middlewares/authentication");
const subAdminAuthentication = require ("../../middlewares/subAdmin.authentication")
const { getUsers } = require("../../controllers/users.controller");

router.post("/subAdmin/register", subAdminRegister);
router.post("/subAdmin/login", subAdminLogin);
router.get("/subAdmin/allsubAdmins/data", authenticate, subAdminAuthentication, getAllSubAdmin);
router.delete("/subAdmin/deleteSubAdmin/:subAdminId", deleteSubAdmin);
router.get("/subAdmin/singleSubAdmin", getSubAdmin);
router.patch("/subAdmin/updateSubAdmin", updateSubAdminData);
router.put("/subAdmin/:subAdminId/:isActive", subAdminStatus);

// to get user's data
router.get("/subAdmin/usersdata", authenticate, subAdminAuthentication, getUsers);


module.exports = router;
