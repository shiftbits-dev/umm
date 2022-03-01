const i18n = require("i18n");
const PGDB = require("../config/db");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { Op } = require("sequelize");
const httpStatus = require("../exception/httpstatus.json");
const Utility = require("../utility/util");
const { Onfido, Region } = require("@onfido/api");
const onfido = new Onfido({ apiToken: AppConfig.API_TOKEN, region: Region.EU });
const NotificationConstant = require("../constants/notifications.json");

//CODE FOR SES
// const SES = require("../utility/ses");
// const config = require("../config/config");

// const awsResponse = await SES.mailSent(
//   config.SES.type.SIGNUP,
//   req.body.email
// );

module.exports = {
  //register
  register: async (req, res, next) => {
    try {
      const deviceType = req.headers["device-type"];
      const playerId = req.headers["device-token"]
        ? req.headers["device-token"]
        : null;
      const deviceName = req.headers["device-name"];
      const ipAddress = req.headers["ip-address"];

      let reqObj = {
        phone: req.body.phone,
        email: req.body.email ? req.body.email : null,
        promotionalMail: req.body.promotionalMail || false,
        userRole: req.body.userRole || "customer",
        lastKycMailSend: moment.utc().format(),
      };

      const getPhoneResponse = await PGDB.pg.models.user.findOne({
        where: {
          phone: reqObj["phone"],
        },
        raw: true,
      });

      if (getPhoneResponse) {
        const err = {};
        err.Status = httpStatus.CONFLICT;
        err.resMsg = i18n.__("PHONE_NUMBER_ALREADY_EXIST");
        err.resCode = i18n.__("responseStatus.ERROR");
        return next(err);
      }

      if (deviceType === "web") {
        const getMailResponse = await PGDB.pg.models.user.findOne({
          where: {
            email: reqObj["email"],
          },
          raw: true,
        });

        if (getMailResponse) {
          const err = {};
          err.Status = httpStatus.CONFLICT;
          err.resMsg = i18n.__("EMAIL_ID_ALREADY_EXIST");
          err.resCode = i18n.__("responseStatus.ERROR");
          return next(err);
        }
      }

      const countrycode = "+91";
      const phone = `${countrycode}${reqObj["phone"]}`;

      //Random 4 Digit OTP
      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      const messageResponse = await Utility.sendMessage(
        `${randomNumber} is OTP for Mobile Number Verification`,
        phone
      );

      if (messageResponse) {
        const err = {};
        err.status = httpStatus.INTERNAL_SERVER_ERROR;
        err.resMsg = i18n.__("UNABLE_SEND_OTP");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }

      let registerUser = await PGDB.pg.models.user.create(reqObj, {
        plain: true,
        nest: true,
      });

      let token = jwt.sign(
        {
          userId: registerUser["dataValues"]["userId"],
          phone: registerUser["phone"],
          email: registerUser["email"],
          userRole: registerUser["userRole"],
        },
        AppConfig.JWT_SECRET
      );

      let sessionObj = {
        userId: registerUser["dataValues"]["userId"],
        token: token,
        isLogin: true,
        deviceType: deviceType,
        playerId: playerId,
        ipAddress: ipAddress,
        deviceName: deviceName,
      };

      let bankObj = {
        userId: registerUser["dataValues"]["userId"],
        virtualAccountNumber: "BINSWAPC0001" + registerUser["dataValues"]["userId"],
      };

      await PGDB.pg.models.session.create(sessionObj);
      await PGDB.pg.models.bank.create(bankObj);

      registerUser["otp"] = randomNumber;
      registerUser["token"] = token;

      await registerUser.save();

      registerUser = registerUser.get({
        plain: true,
      });

      if (registerUser["email"]) {
        const emailSub = "Welcome to ShiftBits";
        const emailBody = `<strong>Hi Trader! We are Glad you're Here.</strong>`;
        Utility.sendEmail(registerUser["email"], emailSub, emailBody);
      }

      delete registerUser["otp"];
      delete registerUser["userId"];
      delete registerUser["emailOtp"];
      delete registerUser["verifyEmail"];
      delete registerUser["verifyPhone"];
      delete registerUser["verifyOtp"];
      

      return Utility.response(
        res,
        registerUser,
        i18n.__("USER_SUCCESSFULLY_REGISTERED"),
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

  //login
  login: async (req, res, next) => {
    const deviceType = req.headers["device-type"];
    const playerId = req.headers["device-token"]
      ? req.headers["device-token"]
      : null;
    const deviceName = req.headers["device-name"];
    const ipAddress = req.headers["ip-address"];

    const reqObj = {
      phone: req.body.phone,
      email: req.body.email,
    };

    const userInfo = await PGDB.pg.models.user.findOne({
      where: {
        [Op.and]: [
          {
            phone: reqObj["phone"],
            userRole: "customer",
          },
        ],
      },
      raw: true,
    });

    if (!userInfo) {
      const err = {};
      err.Status = httpStatus.NOT_FOUND;
      err.resMsg = i18n.__("USER_DOES_NOT_EXIST");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }

    try {
      const countrycode = "+91";
      const phone = `${countrycode}${userInfo["phone"]}`;
      const localTime = moment().format("hh:mm A");

      //Random 4 Digit OTP
      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      const messageResponse = await Utility.sendMessage(
        `${randomNumber} is OTP for Login at ${localTime}`,
        phone
      );

      if (messageResponse) {
        const err = {};
        err.status = httpStatus.INTERNAL_SERVER_ERROR;
        err.resMsg = i18n.__("UNABLE_SEND_OTP");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }
      let token = jwt.sign(
        {
          userId: userInfo["userId"],
          phone: userInfo["phone"],
          email: userInfo["email"],
          userRole: userInfo["userRole"],
        },
        AppConfig.JWT_SECRET
      );

      let sessionObj = {
        userId: userInfo["userId"],
        token: token,
        isLogin: true,
        deviceType: deviceType,
        playerId: playerId,
        deviceName: deviceName,
        ipAddress: ipAddress,
      };

      const listOfPrevSessions = await PGDB.pg.models.session.findAll({
        where: {
          userId: userInfo["userId"],
        },
      });

      if (listOfPrevSessions.length > 0) {
        let notificationObj = {
          title: NotificationConstant.PUSH.TITLE.NEW_LOGIN,
          body: NotificationConstant.PUSH.BODY.NEW_LOGIN,
        };

        listOfPrevSessions.forEach(async (el) => {
          notificationObj.playerId = el.playerId;
          await Utility.createNotification(notificationObj);
        });

        if (listOfPrevSessions["email"]) {
          const emailSub = "New Login";
          const emailBody = `<strong>New Login to your trading account at ${localTime}.</strong>`;
          Utility.sendEmail(registerUser["email"], emailSub, emailBody);
        }
      }

      await PGDB.pg.models.session.create(sessionObj);

      await PGDB.pg.models.user.update(
        {
          otp: randomNumber,
        },
        {
          where: {
            userId: userInfo["userId"],
          },
        }
      );

      return Utility.response(
        res,
        {
          userId: userInfo["userId"],
          token: token,
        },
        i18n.__("OTP_SEND_LOGIN"),
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

  //update user
  updateUser: async (req, res, next) => {
    try {
      const reqObj = {
        firstName: req.body.firstName ? req.body.firstName : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        dob: req.body.dob ? req.body.dob : null,
        email: req.body.email ? req.body.email : null,
      };

      reqObj["userId"] = req.body.user_details.userId;

      // if (reqObj["email"] != null) {
      //   const getMailResponse = await PGDB.pg.models.user.findOne({
      //     where: {
      //       email: reqObj["email"]
      //     },
      //     raw: true
      //   });

      //   if (getMailResponse) {
      //     const err = {};
      //     err.Status = httpStatus.CONFLICT;
      //     err.resMsg = i18n.__("EMAIL_ID_ALREADY_EXIST");
      //     err.resCode = i18n.__("responseStatus.ERROR")
      //     return next(err);
      //   }
      // }

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          userId: reqObj["userId"],
        },
        raw: true,
      });

      try {
        const applicant = await onfido.applicant.create({
          firstName: reqObj["firstName"],
          lastName: reqObj["lastName"],
          dob: reqObj["dob"],
          email: reqObj["email"],
        });

        const getUserResponse = await PGDB.pg.models.user.update(
          {
            firstName: reqObj["firstName"],
            lastName: reqObj["lastName"],
            dob: reqObj["dob"],
            email: reqObj["email"],
            applicantId: applicant["id"],
            verifyEmail: false,
          },
          {
            where: {
              [Op.and]: [
                {
                  userId: reqObj["userId"],
                  userRole: "customer",
                },
              ],
            },
            plain: true,
          }
        );

        if (getUserResponse == [0]) {
          const err = {};
          err.Status = httpStatus.NOT_MODIFIED;
          err.resMsg = "USER_DATA_NOT_FOUND";
          err.resCode = "responseStatus.FAILURE";
          return next(err);
        }
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

      delete userInfo["otp"];
      delete userInfo["userId"];
      delete userInfo["emailOtp"];
      delete userInfo["verifyEmail"];
      delete userInfo["verifyPhone"];
      delete userInfo["verifyOtp"];

      return Utility.response(
        res,
        userInfo,
        i18n.__("USER_DETAILS_UPDATED"),
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

  //profile picture
  profilePicture: async (req, res, next) => {
    try {
      if (!req.file) {
        const err = {};
        err.resMsg = i18n.__("FILE_MISSING");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }

      const reqObj = {
        profilePicture: req.file.filename,
      };

      reqObj["userId"] = req.body.user_details.userId;

      const updateUser = await PGDB.pg.models.user.update(
        {
          profilePicture: reqObj["profilePicture"],
        },
        {
          where: {
            [Op.and]: [
              {
                userId: reqObj["userId"],
                userRole: "customer",
              },
            ],
          },
          plain: true,
        }
      );

      return Utility.response(
        res,
        {
          documentName: req.file.filename,
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

  //verify phoneNumber
  verifyOtp: async (req, res, next) => {
    try {
      const reqObj = {
        otp: req.body.otp,
      };
      const userId = req.body.user_details.userId;

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: {
            userId: userId,
            userRole: "customer",
          },
        },
        raw: true,
      });

      if (userInfo["otp"] == reqObj["otp"]) {
        const listOfPrevSessions = await PGDB.pg.models.session.findAll({
          where: {
            userId: userId,
          },
        });

        const localTime = moment().format("hh:mm A");

        if (userInfo["email"]) {
          const emailSub = "New Login";
          const emailBody = `<strong>New Login to your trading account at ${localTime}.</strong>`;
          Utility.sendEmail(userInfo["email"], emailSub, emailBody);
        }

        await PGDB.pg.models.user.update(
          {
            verifyOtp: true,
            verifyPhone: true,
          },
          {
            where: {
              userId: userInfo["userId"],
            },
          }
        );

        delete userInfo["otp"];
        delete userInfo["userId"];
        delete userInfo["emailOtp"];
        delete userInfo["verifyEmail"];
        delete userInfo["verifyPhone"];
        delete userInfo["verifyOtp"];

        return Utility.response(
          res,
          userInfo,
          i18n.__("OTP_VERIFIED"),
          httpStatus.OK,
          i18n.__("responseStatus.SUCCESS")
        );
      } else {
        return Utility.response(
          res,
          {},
          i18n.__("OTP_NOT_MATCH"),
          httpStatus.NOT_FOUND,
          i18n.__("responseStatus.FAILURE")
        );
      }
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //Verify Email
  emailVerification: async (req, res, next) => {
    try {
      const userPayload = req.user;

      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      const emailSub = "OTP for Email Verification";
      const emailBody = `OTP for Your Verification is ${randomNumber} is Valid for 24 Hours.`;

      const updateUser = await PGDB.pg.models.user.update(
        {
          emailOtp: randomNumber,
        },
        {
          where: {
            [Op.and]: [
              {
                userId: userPayload["userId"],
                userRole: "customer",
              },
            ],
          },
        }
      );

      if (updateUser == [0]) {
        const err = {};
        err.Status = httpStatus.NOT_MODIFIED;
        err.resMsg = "USER_DATA_NOT_FOUND";
        err.resCode = "responseStatus.FAILURE";
        return next(err);
      }

      if (userPayload["email"] === null) {
        const user = await PGDB.pg.models.user.findOne({
          where: {
            [Op.and]: [
              {
                userId: userPayload["userId"],
                userRole: "customer",
              },
            ],
          },
          raw: true,
        });

        try {
          Utility.sendEmail(user["email"], emailSub, emailBody);
        } catch (err) {
          console.log(err);
          err.Status = httpStatus.CONFLICT;
          err.resMsg = i18n.__("UNABLE_SEND_OTP");
          err.resCode = i18n.__("responseStatus.ERROR");
          return next(err);
        }
      }

      return Utility.response(
        res,
        {},
        i18n.__("OTP_SEND_LOGIN"),
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

  //verify Email
  verifyEmail: async (req, res, next) => {
    try {
      const reqObj = {
        otp: req.body.otp,
      };
      const userPayload = req.user;

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: [
            {
              userId: userPayload["userId"],
              userRole: "customer",
            },
          ],
        },
        raw: true,
        nest: true,
      });

      if (userInfo["emailOtp"] == reqObj["otp"]) {
        const getOtpResponse = await PGDB.pg.models.user.update(
          {
            verifyEmail: true,
          },
          {
            where: {
              userId: userInfo["userId"],
            },
          }
        );

        if (!getOtpResponse) {
          const err = {};
          err.Status = httpStatus.CONFLICT;
          err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
          err.resCode = i18n.__("responseStatus.FAILURE");
          return next(err);
        }

        return Utility.response(
          res,
          {},
          i18n.__("EMAIL_VERIFIED"),
          httpStatus.OK,
          i18n.__("responseStatus.SUCCESS")
        );
      }
      return Utility.response(
        res,
        {},
        i18n.__("OTP_NOT_MATCH"),
        httpStatus.CONFLICT,
        i18n.__("responseStatus.FAILURE")
      );
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //verify Phone
  verifyPhone: async (req, res, next) => {
    try {
      const reqObj = {
        otp: req.body.otp,
      };
      const userPayload = req.user;

      const userInfo = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: [
            {
              userId: userPayload["userId"],
              userRole: "customer",
            },
          ],
        },
        raw: true,
        nest: true,
      });
      if (userInfo["otp"] == reqObj["otp"]) {
        const getOtpResponse = await PGDB.pg.models.user.update(
          {
            verifyPhone: true,
          },
          {
            where: {
              userId: userInfo["userId"],
            },
          }
        );

        if (!getOtpResponse) {
          const err = {};
          err.Status = httpStatus.CONFLICT;
          err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
          err.resCode = i18n.__("responseStatus.FAILURE");
          return next(err);
        }

        return Utility.response(
          res,
          {},
          i18n.__("PHONE_NUMBER_VERIFIED"),
          httpStatus.OK,
          i18n.__("responseStatus.SUCCESS")
        );
      }
      return Utility.response(
        res,
        {},
        i18n.__("OTP_NOT_MATCH"),
        httpStatus.CONFLICT,
        i18n.__("responseStatus.FAILURE")
      );
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //Update Phone
  updatePhone: async (req, res, next) => {
    const reqObj = {
      phone: req.body.phone,
    };

    const userPayload = req.user;

    const getPhoneResponse = await PGDB.pg.models.user.findOne({
      where: {
        [Op.and]: [
          {
            phone: reqObj["phone"],
            userRole: "customer",
          },
        ],
      },
      raw: true,
    });

    if (getPhoneResponse) {
      const err = {};
      err.Status = httpStatus.CONFLICT;
      err.resMsg = i18n.__("PHONE_NUMBER_ALREADY_EXIST");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const messageResponse = await Utility.sendMessage(
      `${randomNumber} is OTP for Mobile Number Verification`,
      reqObj["phone"]
    );

    if (messageResponse) {
      const err = {};
      err.status = httpStatus.INTERNAL_SERVER_ERROR;
      err.resMsg = i18n.__("UNABLE_SEND_OTP");
      err.resCode = i18n.__("responseStatus.FAILURE");
      return next(err);
    }

    const updateUser = await PGDB.pg.models.user.update(
      {
        phone: reqObj["phone"],
        Otp: randomNumber,
        verifyEmail: false,
      },
      {
        where: {
          [Op.and]: [
            {
              userId: userPayload["userId"],
              userRole: "customer",
            },
          ],
        },
      }
    );

    if (updateUser == [0]) {
      const err = {};
      err.Status = httpStatus.NOT_MODIFIED;
      err.resMsg = i18n.__("USER_DATA_NOT_FOUND");
      err.resCode = i18n.__("responseStatus.FAILURE");
      return next(err);
    }

    return Utility.response(
      res,
      {},
      i18n.__("OTP_SEND_LOGIN"),
      httpStatus.OK,
      i18n.__("responseStatus.SUCCESS")
    );
  },

  //getUser
  getUser: async (req, res, next) => {
    try {
      const userPayload = req.user;
      const User = await PGDB.pg.models.user.findOne({
        where: {
          [Op.and]: [
            {
              userId: userPayload["userId"],
              userRole: "customer",
            },
          ],
        },
        raw: true,
      });

      delete User["otp"];
      delete User["userId"];
      delete User["emailOtp"];
      delete User["verifyEmail"];
      delete User["verifyPhone"];
      delete User["verifyOtp"];

      return Utility.response(
        res,
        User,
        i18n.__("USER_DATA_RETRIEVE_SUCCESSFULLY"),
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

  //getUserById
  getUserById: async (req, res, next) => {
    try {
      const reqObj = {
        userId: req.body.userId,
      };

      const User = await PGDB.pg.models.user.findByPk(reqObj["userId"], {
        raw: true,
      });

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

      return Utility.response(
        res,
        User,
        i18n.__("USER_DATA_RETRIEVE_SUCCESSFULLY"),
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

  //logout
  logout: async (req, res, next) => {
    try {
      const userPayload = req.user;

      const checkLogin = await PGDB.pg.models.session.destroy({
        where: {
          userId: userPayload["userId"],
        },
        raw: true,
      });

      if (!checkLogin) {
        const err = {};
        err.Status = httpStatus.NOT_FOUND;
        err.resMsg = i18n.__("USER_NOT_REGISTERED");
        err.resCode = i18n.__("responseStatus.FAILURE");
        return next(err);
      }

      return Utility.response(
        res,
        {},
        i18n.__("USER_LOGOUT_SUCCESSFULLY"),
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
};
