const jwt = require("jsonwebtoken");
const i18n = require("i18n");
const httpStatus = require("../exception/httpstatus.json");
const Utility = require("../utility/util");
const PGDB = require("../config/db");
const { Op } = require("sequelize");
let CryptoJS = require("crypto-js");
const config = require("../config/config");

module.exports = {
  async auth(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, AppConfig.JWT_SECRET);
      req.user = decoded;

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: [
            {
              email: req.user.email,
            },
          ],
        },
        raw: true,
      });

      if (userInfo) {
        req.user.firstName = userInfo.firstName;
        req.user.lastName = userInfo.lastName;
      }

      next();
    } catch (err) {
      console.log(err);
      return Utility.response(
        res,
        {},
        i18n.__("INVALID_TOKEN"),
        httpStatus.UNAUTHORIZED,
        i18n.__("responseStatus.FAILURE")
      );
    }
  },

  async isCustomer(req, res, next) {
    try {
      const userPayload = req.user;

      if (!(userPayload["userRole"] === "customer")) {
        return Utility.response(
          res,
          {},
          i18n.__("UNAUTHORIZED_USER"),
          httpStatus.UNAUTHORIZED,
          i18n.__("responseStatus.FAILURE")
        );
      }
      next();
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  async isSuperUser(req, res, next) {
    try {
      const userPayload = req.user;

      if (!(userPayload["userRole"] === "superadmin")) {
        return Utility.response(
          res,
          {},
          i18n.__("UNAUTHORIZED_USER"),
          httpStatus.UNAUTHORIZED,
          i18n.__("responseStatus.FAILURE")
        );
      }
      next();
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  async isSupportAdmin(req, res, next) {
    try {
      const userPayload = req.user;

      if (!(userPayload["userRole"] === "supportadmin")) {
        return Utility.response(
          res,
          {},
          i18n.__("UNAUTHORIZED_USER"),
          httpStatus.UNAUTHORIZED,
          i18n.__("responseStatus.FAILURE")
        );
      }
      next();
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  decryptPayload: (req, res, next) => {
    try {
      let body = CryptoJS.AES.decrypt(req.body.data, config.JWT_SECRET);
      req.body = JSON.parse(body.toString(CryptoJS.enc.Utf8));
      next();
    } catch (error) {
      res.json({ status: false, message: "error decrypting data" + error });
    }
  },

  async ensureAuthorised(req, res, next) {
    try {
      let body = CryptoJS.AES.decrypt(req.body.data, config.JWT_SECRET);
      req.body = JSON.parse(body.toString(CryptoJS.enc.Utf8));
      if (req.body.hasOwnProperty("Authorization")) {
        const token = req.body.Authorization.split(" ")[1];
        console.log(token);
        if (token === "" || token === null) {
          res.json({
            status: false,
            message: "Invalid Token",
          });
        } else {
          try {
            const decoded = jwt.verify(token, AppConfig.JWT_SECRET);
            req.user = decoded;

            const userInfo = await PGDB.pg.models.user.findOne({
              where: {
                [Op.and]: [
                  {
                    email: req.user.email,
                  },
                ],
              },
              raw: true,
            });

            if (userInfo) {
              req.body.user_details = {
                userId: userInfo.userId,
                email: userInfo.email,
                phone: userInfo.phone,
                // token: userInfo.token,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                dob: userInfo.dob,
                userRole: userInfo.userRole,
                applicantId: userInfo.applicantId,
              };
            }

            next();
          } catch (err) {
            console.log(err);
            return Utility.response(
              res,
              {},
              i18n.__("INVALID_TOKEN"),
              httpStatus.UNAUTHORIZED,
              i18n.__("responseStatus.FAILURE")
            );
          }
        }
      } else {
        res.json({
          status: false,
          message: "token parameter is missing",
        });
      }
    } catch (error) {
      res.json({
        status: false,
        message: config.response.ERROR_VALIDATING_USER + error,
      });
    }
  },
};
