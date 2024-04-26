const router = require("express").Router();
const userRouter = require("./users.router");
const adminRouter = require("../../routes/v1/admin.router");
const subAdminRouter = require("./subAdmin.router")

router.use(adminRouter);
router.use(subAdminRouter);
router.use(userRouter);

module.exports = router;
