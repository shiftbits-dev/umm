const cron = require("cron");
const kycController = require("../controller/user.kyc.controller");
const paymentController = require("../controller/user.payment.controller");
const zendeskController = require("../controller/user.zendesk");
const CronJob = cron.CronJob;

const notificationSend = new CronJob('0 */1 * * *', kycController.notificationFillKyc);

const paymentCheck = new CronJob('0 */1 * * *', paymentController.paymentCheck);

const zenDeskUpdate = new CronJob('*/30 * * * *', zendeskController.zenDeskUpdate);

notificationSend.start();

paymentCheck.start();

zenDeskUpdate.start();