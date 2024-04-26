const router = require("express").Router();
const {
  adminRegister,
  adminLogin,
} = require("../../controllers/admin.controller");
const authenticate = require("../../middlewares/authentication");
const adminAuthentication = require("../../middlewares/admin.authentication");
const { getUsers } = require("../../controllers/users.controller");

router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);

// to get user's data 
router.get("/admin/usersdata", authenticate, adminAuthentication, getUsers);

module.exports = router;
