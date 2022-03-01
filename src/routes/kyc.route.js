const express = require("express");
const router = express.Router();
const KycController = require("../controller/user.kyc.controller");
const auth = require("../middleware/auth");
const { upload } = require("../utility/fileUpload");

router.post("/uploadFile", auth.ensureAuthorised, upload.single('image'), KycController.fileupload);

router.post("/update", auth.ensureAuthorised, KycController.updateKyc);

router.post("/kycCheck", auth.decryptPayload, KycController.kycCheck);

router.get("/kycStatus",auth.ensureAuthorised,KycController.getKycStatus)

router.post("/getKycStatus", auth.ensureAuthorised, KycController.getKycStatus);

module.exports = router;