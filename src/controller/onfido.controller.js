const i18n = require("i18n");
const axios = require("axios");
const Utility = require("../utility/util");
const httpStatus = require("../exception/httpstatus.json");
var onfido_token = "api_live.EQvHKwodQJi.VTZfN4lTiBs0NivyHO9NghDiIdZ9x4H3";
const { Onfido, Region } = require("@onfido/api");

const onfido = new Onfido({
  apiToken: "api_live.EQvHKwodQJi.VTZfN4lTiBs0NivyHO9NghDiIdZ9x4H3",
  region: Region.EU
});

const PGDB = require("../config/db");

// req.user
// {
//   userId: 11,
//   phone: '9938225493',
//   email: null,
//   userRole: 'customer',
//   iat: 1630125224
// }

module.exports = {

  createApplicant: async (req, res, next) => {
    try {
      const User = await PGDB.pg.models.user.findByPk(req.user["userId"], { raw: true });

      if (!User) {
        const err = {};
        err.resMsg = i18n.__("NO_USER_FOUND");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }

      delete User["otp"];
      delete User["userId"];
      delete User["emailOtp"];
      delete User["verifyEmail"];
      delete User["verifyPhone"];
      delete User["verifyOtp"];

      const applicant = await onfido.applicant.create({
        firstName: User.firstName,
        lastName: User.lastName
      });

      // return Utility.response(res,
      //   {
      //     applicant_id: applicant.id
      //   },
      //   i18n.__("ONFIDO_SDK_CREATED"),
      //   httpStatus.OK,
      //   i18n.__("responseStatus.SUCCESS"))

      module.exports.generateOnfidoToken(applicant.id, res, next);

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  generateOnfidoToken: async (req, res, next) => {
    try {
      const userKyc = await PGDB.pg.models.user.findOne({
        where: {
          userId: req.body.user_details.userId
        },
        raw: true
      })
      if (userKyc["applicantId"]) {
        axios
          .post(
            AppConfig.ONFIDO + "/v3.2/sdk_token",
            {
              "applicant_id": userKyc["applicantId"],
              "referrer": "*://*/*"
            },
            {
              headers: {
                'Authorization': "Token token=" + onfido_token
              }
            }
          )
          .then(function (response) {
            return Utility.response(res,
              {
                applicant_id: userKyc["applicantId"],
                token: response.data.token
              },
              i18n.__("ONFIDO_SDK_CREATED"),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          })
          .catch(function (error) {
            console.log(error);
            error.resMsg = i18n.__("SOMETHING_WENT_WRONG");
            error.resCode = i18n.__("responseStatus.ERROR");
            return next(error);
          })
      } else {
        console.log(err);
        err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
        err.resCode = i18n.__("responseStatus.ERROR");
        return next(err);
      }
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  createCheck: async (req, res, next) => {
    try {
      const reqObj = {
        identityType: req.body.identityType,
        applicantId: req.body.applicantId,
      }

      const check = await onfido.check.create({
        applicantId: reqObj["applicantId"],
        reportNames: ["document", "facial_similarity_photo"]
      });

      const kycCheck = {
        applicantId: reqObj["applicantId"],
        identityType: reqObj["identityType"],
        checkId: check["id"],
        resultUri: check["resultsUri"],
        userId: req.body.user_details.userId
      }

      await PGDB.pg.models.kyc.create(kycCheck, {
        plain: true,
        nest: true
      }
      );

      return Utility.response(res,
        {},
        i18n.__("KYC_CHECK_INITIATED"),
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

  checkCallback: async (req, res, next) => {
    try {
      Utility.sendEmail("akash@shiftbits.io", "onfido callback", req.body.toString())

      return Utility.response(res,
        {},
        i18n.__("KYC_CHECK_INITIATED"),
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
}