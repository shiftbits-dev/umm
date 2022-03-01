const express = require("express");
const router = express.Router();
const ExchangeController = require("../controller/exchange.controller");
const auth = require("../middleware/auth");

router.post("/getBuyCryptoCurrencyLimits", auth.ensureAuthorised, ExchangeController.getBuyCryptoCurrencyLimits);

router.post("/getBuyPrice", auth.ensureAuthorised,ExchangeController.getBuyPrice);

router.post("/startBuyTransaction", auth.ensureAuthorised, ExchangeController.startBuyTransaction);

router.post("/getSellCryptoCurrencyLimits", auth.ensureAuthorised, ExchangeController.getSellCryptoCurrencyLimits);

router.post("/getSellPrice", auth.ensureAuthorised,ExchangeController.getSellPrice);

router.post("/startSellTransaction", auth.ensureAuthorised, ExchangeController.startSellTransaction);

router.post("/viewBuyTransactions", auth.ensureAuthorised, ExchangeController.viewBuyTransaction);

router.post("/viewTransactions", auth.ensureAuthorised, ExchangeController.viewTransaction);

router.post("/viewSellTransaction", auth.ensureAuthorised, ExchangeController.viewSellTransaction);

router.post("/getTransactionData", auth.ensureAuthorised, ExchangeController.getTransactionData);

module.exports = router;