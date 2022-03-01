const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const zendDeskController = require("../controller/user.zendesk");
const auth = require("../middleware/auth");
const { upload } = require("../utility/fileUpload");

router.post("/register", auth.decryptPayload, UserController.register);

router.post("/login", auth.decryptPayload, UserController.login);

router.put("/", auth.ensureAuthorised, UserController.updateUser);

router.post("/verifyPhone", auth.ensureAuthorised, UserController.verifyPhone)

router.post("/", auth.ensureAuthorised, UserController.getUser);

router.post("/verifyOtp", auth.ensureAuthorised, UserController.verifyOtp);

router.post("/updatePhone", auth.ensureAuthorised, UserController.updatePhone);

router.post("/emailVerification", auth.ensureAuthorised, UserController.emailVerification);

router.post("/verifyEmail", auth.ensureAuthorised, UserController.verifyEmail);

router.post("/profilePicture", auth.ensureAuthorised, upload.single('image'), UserController.profilePicture);

router.post("/getUserInfo", auth.ensureAuthorised, UserController.getUserById);

router.post("/getUserRequest", auth.ensureAuthorised, zendDeskController.getUserList);

router.post("/userRaiseRequest", auth.ensureAuthorised, zendDeskController.raiseRequest);

router.post("/logout", auth.ensureAuthorised, UserController.logout);

module.exports = router;