const express = require("express");
const router = express.Router();
const BankController = require("../controller/user.bank.controller");
const auth = require("../middleware/auth");

router.post("/addBank", auth.ensureAuthorised, BankController.addBankAccount);

router.post("/getBankAccount", auth.ensureAuthorised, BankController.getUserDetails);

router.post("/updateBank", auth.ensureAuthorised, BankController.updateBankAccount);

router.post("/getFiatTransactions", auth.ensureAuthorised, BankController.getFiatTransactions);

router.post("/getAmount", auth.ensureAuthorised, BankController.getAmount);

router.post("/startBuyTransaction", auth.ensureAuthorised, BankController.startBuyTransaction)

router.post("/getBalance", auth.ensureAuthorised, BankController.getBalance);

module.exports = router;