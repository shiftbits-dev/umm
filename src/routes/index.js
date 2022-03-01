const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const ExchangeRouter = require('./exchange.route');
const bankRouter = require("./bank.route");
const kycRouter = require("./kyc.route");
const paymentRouter = require("./payment.route")
const adminRouter = require("./super.admin.route");
const onfidoRoute = require("./onfido.route");
const liriumRouter = require("./lirium.route");

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.use('/userDetails', userRouter);

router.use('/exchange', ExchangeRouter);

router.use('/userBank', bankRouter);

router.use('/payment', paymentRouter)

router.use('/userKyc', kycRouter);

router.use('/superAdmin', adminRouter);

router.use('/onfido', onfidoRoute);

router.use('/lirium', liriumRouter);

module.exports = router;