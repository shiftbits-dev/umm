const express = require("express");
const router = express.Router();
const LiriumController = require("../controller/lirium.controller");
const auth = require("../middleware/auth");

router.post("/createCustomer", LiriumController.createCustomer);
router.post("/getCustomerDetails", LiriumController.getCustomerDetails);
router.post("/getCustomerAccount", LiriumController.getCustomerAccount);
router.post("/updateCustomerDetails", LiriumController.updateCustomerDetails);
router.post("/createOrder", LiriumController.createOrder);
router.post("/confirmOrder", LiriumController.confirmOrder);
router.post("/getOrderDetails", LiriumController.getOrderDetails);
router.post("/uploadCustomerKYC", LiriumController.uploadCustomerKYC);

module.exports = router;