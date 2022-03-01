const i18n = require("i18n");
const PGDB = require("../config/db");
const path = require("path");
const { Op } = require("sequelize");
const { Onfido, Region } = require("@onfido/api");
const moment = require("moment");
const httpStatus = require("../exception/httpstatus.json");
const Utility = require("../utility/util");
const NotificationConstant = require("../constants/notifications.json");
const onfido = new Onfido({ apiToken: AppConfig.API_TOKEN, region: Region.EU });

module.exports = {

  //Upload File
  fileupload: async (req, res, next) => {
    try {
      if (!req.file) {
        const err = {};
        err.resMsg = i18n.__("FILE_MISSING");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }

      const reqObj = {
        identityPhoto: req.file.filename,
      }

      reqObj["userId"] = req.body.user_details.userId;

      await PGDB.pg.models.kyc.update({
        identityPhoto: reqObj["identityPhoto"],
        userId: reqObj["userId"]
      }, {
        where: {
          userId: reqObj["userId"],
        },
      })

      return Utility.response(res,
        {
          documentName: req.file.filename
        },
        i18n.__("FILE_UPLOADED"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS")
      );

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //update Identity and details
  updateKyc: async (req, res, next) => {
    try {
      let reqObj = {
        identityType: req.body.identityType,
      }

      reqObj["userId"] = req.body.user_details.userId;

      //Convert Identity type to lower case and remove white spaces to underscore
      reqObj["identityType"] = reqObj["identityType"].toLowerCase().replace(/ /g, "_");

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: [{
            userId: reqObj["userId"],
            userRole: 'customer'
          }]
        },
        raw: true
      })

      try {
        const userKyc = await PGDB.pg.models.kyc.findOne({
          where: {
            userId: reqObj["userId"],
          }
        })

        const check = await onfido.check.create({
          applicantId: userKyc["applicantId"],
          reportNames: ["document"]
        });

        await PGDB.pg.models.kyc.update({
          identityPhoto: reqObj["identityPhoto"],
          identityType: reqObj["identityType"],
          checkId: check["id"],
          resultUri: check["resultsUri"],
          kycResultStatus: "pending"
        }, {
          where: {
            userId: reqObj["userId"]
          },
          plain: true,
          nest: true
        }
        );

        return Utility.response(res,
          {},
          i18n.__("USER_IDENTITY_TYPE_UPDATED"),
          httpStatus.OK,
          i18n.__("responseStatus.SUCCESS")
        )

      } catch (error) {
        if (error) {
          // An error response was received from the Onfido API, extra info is available.
          console.log(error.message);
          console.log(error.type);
          console.log(error.isClientError());
        } else {
          // No response was received for some reason e.g. a network error.
          console.log(error.message);
        }
      }
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //Get KYC Status
  getKycStatus: async (req, res, next) => {
    try {
      const reqObj = {
        userId: req.body.user_details.userId
      }

      const getKycStatus = await PGDB.pg.models.kyc.findOne({
        where: {
          userId: reqObj["userId"],
        }
      })

      const report = await onfido.check.find(getKycStatus["checkId"]);

      return Utility.response(res,
        getKycStatus,
        i18n.__("KYC_STATUS"),
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

  //KYC Check
  kycCheck: async (req, res, next) => {
    try {
      const reqObj = {
        checkId: req.body.payload.object.id,
      };

      const getKycStatus = await PGDB.pg.models.kyc.findOne({
        where: {
          checkId: reqObj["checkId"]
        }
      })

      const check = await onfido.check.find(reqObj["checkId"]);

      let notificationObj = {};
      let updateObj = {};
      let emailBody;

      check["reportIds"].forEach(async check => {
        const report = await onfido.report.find(check["reportIds"]);
        if (report["result"] === "clear") {
          if (report["name"] == "document")
            updateObj["documentStatus"] = true
          else if (report["name"] == "facial_similarity_photo")
            updateObj["selfiStatus"] = true;
          updateObj["kycStatus"] = "clear";
          updateObj["kycResultStatus"] = "success"
          notificationObj["title"] = NotificationConstant.PUSH.TITLE.KYC_VERIFIED;
          notificationObj["body"] = NotificationConstant.PUSH.BODY.KYC_VERIFIED;
          emailBody = '<strong>Congratulations! Your KYC has been verified. Enjoy Trading</strong>';
        } else if (report["result"] === "consider") {
          updateObj["kycStatus"] = "consider";
          updateObj["kycResultStatus"] = "success"
        } else if (report["result"] === "unidentified") {
          updateObj["kycStatus"] = "unidentified";
          updateObj["kycResultStatus"] = "failed"
          notificationObj["title"] = NotificationConstant.PUSH.TITLE.KYC_REJECTED;
          notificationObj["body"] = NotificationConstant.PUSH.BODY.KYC_REJECTED;
          emailBody = '<strong>Your KYC details has been rejcted. Please login to your account for more details</strong>';
        }
      });

      const getUser = await PGDB.pg.models.user.findByPk(getKycStatus["userId"]);

      //Updating User Kyc Status
      await PGDB.pg.models.kyc.update(updateObj, {
        where: {
          userId: getUser["userId"]
        }
      });

      //Fetching Last Sessions
      const listOfPrevSessions = await PGDB.pg.models.session.findAll({
        where: {
          userId: getUser["userId"]
        }
      });

      //Sending Notifications
      listOfPrevSessions.forEach(async (el) => {
        notificationObj.playerId = el.playerId;
        await Utility.createNotification(notificationObj);
      });

      let userEmail = getUser["email"];

      //Sending Email
      if (userEmail) {
        if (updateObj["kycStatus"] === 'unidentified' || updateObj["kycStatus"] === 'clear') {
          let emailSub = "Update on KYC";
          Utility.sendEmail(userEmail, emailSub, emailBody)
        } else {
          const userAdmin = await PGDB.pg.models.user.findOne({
            where: {
              userRole: 'superadmin'
            },
            raw: true,
            nest: true
          })

          let emailSub = `Fault in User KYC`
          let emailBody = `<strong>KYC Status for User with User id : ${getUser["userId"]}
                          Applicant Id : ${getKycStatus["applicantId"]}
                          Report Url : ${getKycStatus["resultUri"]}</strong>`;

          Utility.sendEmail(userAdmin["email"], emailSub, emailBody)
        }
      }

      return Utility.response(res,
        {},
        i18n.__("UPDATE_KYC_DATA_SUCCESSFULLY"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS"))

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //Push Notification Check
  notificationFillKyc: async () => {
    const countUser = await PGDB.pg.models.kyc.findAndCountAll({
      include: [{
        model: PGDB.pg.models.user,
        as: 'user',
        where: {
          userRole: 'customer'
        }
      }],
      where: {
        checkId: null,
      }
    });

    for (let user of countUser["rows"]) {
      let createdAt = user["dataValues"]["user"]["createdAt"];
      let lastKycMailSend = user["dataValues"]["user"]["lastKycMailSend"];
      let hoursCreatedAt = moment().diff(moment(createdAt), "hours");
      let hoursLastMailSend = moment().diff(moment(lastKycMailSend), "hour");

      if (hoursCreatedAt >= 24 || hoursLastMailSend >= 24) {
        let notificationObj = {
          title: NotificationConstant.PUSH.TITLE.KYC_NOT_DONE,
          body: NotificationConstant.PUSH.BODY.KYC_NOT_DONE
        };

        const listOfPrevSessions = await PGDB.pg.models.session.findAll({
          where: {
            userId: user.dataValues.userId
          }
        });

        listOfPrevSessions.forEach(async (el) => {
          notificationObj.playerId = el.playerId;
          await Utility.createNotification(notificationObj);
        });

        if (user["dataValues"]["user"]["email"]) {
          let emailSub = "KYC Not Completed";
          let emailBody = `Hi! ${user["dataValues"]["firstName"]}. You have not filled the KYC Form. Fill it Fast to Start Trading`;
          Utility.sendEmail(user["dataValues"]["user"]["email"], emailSub, emailBody)
        }

        await PGDB.pg.models.user.update({
          lastKycMailSend: moment.utc().format()
        }, {
          where: {
            userId: user["dataValues"]["userId"]
          }
        })
      }
    }
  }
}