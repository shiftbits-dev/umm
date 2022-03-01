const i18n = require("i18n");
const PGDB = require("../config/db");
const httpStatus = require("../exception/httpstatus.json");
const Utility = require("../utility/util");

module.exports = {

  //Add Bank Account
  addBankAccount: async (req, res, next) => {
    try {
      const reqObj = {
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
      }

      reqObj["userId"] = req.body.user_details.userId;

      const getBankAccountResponse = await PGDB.pg.models.bank.findOne({
        where: {
          accountNumber: reqObj["accountNumber"]
        }
      })

      if (getBankAccountResponse) {
        const err = {};
        err.Status = httpStatus.CONFLICT;
        err.resMsg = i18n.__("BANK_ACCOUNT_NUMBER_ALREADY_EXIST");
        err.resCode = i18n.__("responseStatus.ERROR");
        return next(err);
      }

      const getAddBankResponse = await PGDB.pg.models.bank.update({
        accountNumber: reqObj["accountNumber"],
        ifscCode: reqObj["ifscCode"]
      }, {
        where: {
          userId: reqObj["userId"]
        },
      });

      if (getAddBankResponse == [0]) {
        const err = {};
        err.Status = httpStatus.NOT_MODIFIED;
        err.resMsg = i18n.__("USER_NOT_FOUND");
        err.resCode = i18n.__("responseStatus.FAILURE")
        return next(err);
      }
      const bankDetails = await PGDB.pg.models.bank.findOne({
        where: {
          userId: reqObj["userId"],
        },
        raw: true
      })

      return Utility.response(res,
        bankDetails,
        i18n.__("BANK_ACCOUNT_ADDED_SUCCESSFULLY"),
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

  getFiatTransactions: async (req, res, next) => {
    try {
      var transactions = [];

      const getBankAccountResponse = await PGDB.pg.models.payment.findAll({
        where: {
          userId: req.body.user_details.userId
        }
      });

      getBankAccountResponse.forEach(async (el) => {
        transactions.push(el);
      });

      return Utility.response(res,
        transactions,
        i18n.__("BANK_TRANSACTIONS_RETRIEVED"),
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

  //Get User Bank Details
  getUserDetails: async (req, res, next) => {
    try {
      const reqObj = {
        userId: req.body.user_details.userId
      };

      const bankDetails = await PGDB.pg.models.bank.findOne({
        where: {
          userId: reqObj["userId"],
        },
        raw: true
      });
      return Utility.response(res,
        bankDetails,
        i18n.__("BANK_ACCOUNT_RETRIEVE_SUCCESSFULLY"),
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

  //Get Amount
  getAmount: async (req, res, next) => {
    try {
      const userPayload = {
        userId: req.body.user_details.userId
      }

      const findBankAccounts = await PGDB.pg.models.payment.findAll({
        where: {
          userId: userPayload["userId"],
        },
        raw: true
      })

      let totalAmount = 0;
      for (let bankAccount of findBankAccounts) {
        if (bankAccount["paymentStatus"] == "credit") {
          totalAmount += Number(bankAccount["amount"]);
        }
        else if (bankAccount["paymentStatus"] == "refund") {
          totalAmount -= Number(bankAccount["amount"]);
        }
      }

      return Utility.response(res,
        { totalAmount: totalAmount },
        i18n.__("TOTAL_AMOUNT_RETRIEVE_SUCCESSFULLY"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS"));

    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //Update User Bank Account
  updateBankAccount: async (req, res, next) => {
    try {
      const reqObj = {
        accountNumber: req.body.accountNumber,
        ifscCode: req.body.ifscCode,
      }

      reqObj["userId"] = req.body.user_details.userId;

      const getBankAccountResponse = await PGDB.pg.models.bank.findOne({
        where: {
          accountNumber: reqObj["accountNumber"]
        }
      })

      if (getBankAccountResponse) {
        const err = {};
        err.Status = httpStatus.CONFLICT;
        err.resMsg = i18n.__("");
        err.resCode = i18n.__("responseStatus.ERROR");
        return next(err);
      }

      const updateBank = await PGDB.pg.models.bank.update({
        accountNumber: reqObj["accountNumber"],
        ifscCode: reqObj["ifscCode"],
      }, {
        where: {
          userId: reqObj["userId"],
        },
        plain: true,
        nest: true
      })

      if (updateBank == [0]) {
        const err = {};
        err.Status = httpStatus.NOT_MODIFIED;
        err.resMsg = i18n.__("USER_DATA_NOT_FOUND");
        err.resCode = i18n.__("responseStatus.FAILURE")
        return next(err);
      }

      else {
        const findBankAccount = await PGDB.pg.models.bank.findOne({
          where: {
            userId: reqObj["userId"]
          }
        })

        return Utility.response(res,
          findBankAccount,
          i18n.__("BANK_ACCOUNT_UPDATED_SUCCESSFULLY"),
          httpStatus.OK,
          i18n.__("responseStatus.SUCCESS")
        )
      }
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  startBuyTransaction: async (req, res, next) => {
    try {
      let reqObj = req.body;

      reqObj["userId"] = req.body.user_details.userId;

      const getBankAccountResponse = await PGDB.pg.models.bank.findByPk(reqObj["userId"]);

      if (getBankAccountResponse["balance"] < reqObj["balance"]) {
        const err = {};
        err.Status = httpStatus.PAYMENT_REQUIRED
        err.resMsg = i18n.__("INSUFFICIENT_BALANCE");
        err.resCode = i18n.__("responseStatus.FAILURE")
        return next(err);
      }

      const updateBalance = Number(getBankAccountResponse["balance"] - reqObj["balance"]);

      await PGDB.pg.models.bank.update({
        balance: updateBalance
      }, {
        where: {
          userId: getBankAccountResponse["userId"]
        }
      })

      return Utility.response(res, {},
        i18n.__("BALANCE_UPDATED_SUCCESSFULLY"),
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

  getBalance: async (req, res, next) => {
    try {
      const reqObj = {
        userId: req.body.user_details.userId
      }

      const getBalance = await PGDB.pg.models.bank.findByPk(reqObj["userId"]);

      return Utility.response(res,
        { balance: Number(getBalance["balance"]) },
        i18n.__("BALANCE_FETCHED_SUCESSFULLY"),
        httpStatus.OK,
        i18n.__("responseStatus.SUCCESS")
      )
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  }
}