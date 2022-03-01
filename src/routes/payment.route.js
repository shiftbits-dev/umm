const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const PaymentController = require("../controller/user.payment.controller");

router.post("/withdrawPayment", PaymentController.withdrawPayment);

router.post("/paycheck", PaymentController.paymentCheck2);

module.exports = router;