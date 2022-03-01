const express = require("express");
const router = express.Router();
const onfidoController = require("../controller/onfido.controller");
const auth = require("../middleware/auth");
const { upload } = require("../utility/fileUpload");

// router.post("/createApplicant", auth.ensureAuthorised, onfidoController.createApplicant);

router.post("/generateOnfidoToken", auth.ensureAuthorised, onfidoController.generateOnfidoToken);

router.post("/createCheck", auth.ensureAuthorised, onfidoController.createCheck);

router.post("/checkCallback", onfidoController.checkCallback);

module.exports = router;