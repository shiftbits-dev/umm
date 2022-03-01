const i18n = require("i18n");
const PGDB = require("../config/db");
const httpStatus = require("../exception/httpstatus.json");
const Utility = require("../utility/util");

module.exports = {

  //Get All User
  getAllUser: async (req, res, next) => {
    try {
      const User = await PGDB.pg.models.user.findAll({
        where: {
          userRole: 'customer'
        },
      })
      const user = [];
      for (let Users of User) {
        delete Users["dataValues"]["otp"];
        delete Users["dataValues"]["password"];
        delete Users["dataValues"]["emailOtp"];
        user.push(Users["dataValues"]);
      }

      return Utility.response(res,
        user,
        i18n.__("ALL_USER_DATA_RETREIVE_SUCCESSFULLY"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS"))

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //All User KYC Data
  getAllUserKyc: async (req, res, next) => {
    try {
      const reqObj = {
        userId: req.body.userId,
        selfiStatus: req.body.selfiStatus,
        documentStatus: req.body.documentStatus,
      }

      let kycStatus;
      let emailBody;

      if (reqObj["selfiStatus"] == true && reqObj["documentStatus"] == true) {
        kycStatus = 'clear';
        emailBody = '<strong>Congratulations! Your KYC has been verified. Enjoy Trading</strong>'
      }
      else {
        kycStatus = 'suspected';
        emailBody = '<strong>Your KYC details has been suspended. Please login to your account for more details</strong>'
      }

      const updateKyc = await PGDB.pg.models.kyc.update({
        selfiStatus: reqObj["selfiStatus"],
        documentStatus: reqObj["documentStatus"],
        kycStatus: kycStatus
      }, {
        where: {
          userId: reqObj["userId"]
        }
      });

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          userId: reqObj["userId"]
        },
        raw: true
      })

      let userEmail = userInfo["email"] ? userInfo["email"] : null;

      //sending email
      if (userEmail) {
        let emailSub = "Update on KYC";
        Utility.sendEmail(userEmail, emailSub, emailBody)
      }

      delete userInfo["emailOtp"];
      delete userInfo["otp"];
      delete userInfo["password"];

      return Utility.response(res,
        userInfo,
        i18n.__("KYC_RESPONSE_UPDATED"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS")
      )

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //All Raise Ticket
  getAllRaiseTicket: async (req, res, next) => {
    try {
      const getAllRaise = await PGDB.pg.models.help.findAll({});

      let tickets = [];
      for (let getAllRaises of getAllRaise) {
        delete getAllRaises["dataValues"]["id"]

        tickets.push(getAllRaises);
      }

      return Utility.response(res,
        tickets,
        i18n.__("ALL_USER_RAISE_TICKET_RETREIVE_SUCCESSFULLY"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS"))


    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },
}