const express = require("express");
const router = express.Router();
const adminController = require("../controller/super.admin.controller");
const auth = require("../middleware/auth");

router.post("/allUser", auth.ensureAuthorised, auth.isSuperUser, adminController.getAllUser);

router.post("/updateKyc", auth.ensureAuthorised, auth.isSuperUser, adminController.getAllUserKyc);

router.post("/getAllRaiseTicket", auth.ensureAuthorised, auth.isSuperUser, adminController.getAllRaiseTicket);

module.exports = router;