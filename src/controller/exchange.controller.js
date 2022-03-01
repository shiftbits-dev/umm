const i18n = require("i18n");
const axios = require("axios");
const Utility = require("../utility/util");
const httpStatus = require("../exception/httpstatus.json");
const PGDB = require("../config/db");

module.exports = {

  //GET CRYPTO BUY LIMITS
  getBuyCryptoCurrencyLimits: async (req, res, next) => {
    try {
      axios
        .post(
          AppConfig.CORE + "api/BuyCryptoCurrency/GetBuyCryptoCurrencyLimits",
          {
            "VerificationLevel": 0,
            "Currency": "inr",
            "CryptoCurrency": req.body.crypto
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("CRYPTO_LIMIT_RECEIVED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //GET BUY PRICE
  getBuyPrice: async (req, res, next) => {
    try {
      let pair = "";
      if (req.body.crypto === "btc") {
        pair = "btcinr";
      } else if (req.body.crypto === "eth") {
        pair = "ethinr";
      }
      axios
        .get(
          AppConfig.CORE + "api/priceAsk/" + pair,
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("CRYPTO_BUY_PRICE_RECEIVED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //START BUY TRANSACTION
  startBuyTransaction: async (req, res, next) => {
    try {
      let pair = "";
      if (req.body.crypto === "btc") {
        pair = "btcinr";
      } else if (crypto === "eth") {
        pair = "ethinr";
      }
      axios
        .post(
          AppConfig.CORE + "api/BuyCryptoCurrency/CreateAndStartTransaction",
          {
            "Currency": "inr",
            "CryptoCurrency": req.body.crypto,
            "FiatAmount": req.body.fiatValue,
            "FixedAmount": 0,
            "Address": req.body.walletAddress,
            "ClientId": req.body.user_details.userId
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("CRYPTO_TRANSACTION_STARTED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //GET CRYPTO SELL LIMITS
  getSellCryptoCurrencyLimits: async (req, res, next) => {
    try {
      axios
        .get(
          AppConfig.CORE + "api/SellCryptoCurrency/GetSellCryptoCurrencyLimits/0/inr/" + req.body.crypto,
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("CRYPTO_LIMIT_RECEIVED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //GET SELL PRICE
  getSellPrice: async (req, res, next) => {
    try {
      let pair = "";
      if (req.body.crypto === "btc") {
        pair = "btcinr";
      } else if (req.body.crypto === "eth") {
        pair = "ethinr";
      }
      axios
        .get(
          AppConfig.CORE + "api/priceBid/" + pair,
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("CRYPTO_SELL_PRICE_RECEIVED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //START SELL TRANSACTION
  startSellTransaction: async (req, res, next) => {
    try {
      axios
        .post(
          AppConfig.CORE + "api/SellCryptoCurrency/StartTransaction",
          {
            "Currency": "inr",
            "CryptoAmount": req.body.cryptoValue,
            "FixedAmount": 1,
            "CryptoCurrency": req.body.crypto,
            "ClientId": req.body.user_details.userId,
            "VerificationLevel": 0
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then((response) => {

          const cryptoSave = {
            userId: req.body.user_details.userId,
            cyptoTransactionId: response["data"]["TransactionId"],
            cryptoType: response["data"]["CryptoCurrency"],
            cryptoReferenceNumber: response["data"]["ReferenceNumber"]
          }

          PGDB.pg.models.payment.create(cryptoSave);

          return Utility.response(res,
            response["data"],
            i18n.__("CRYPTO_SELL_TRANSACTION_STARTED"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
          error.resMsg = i18n.__("SOMETHING_WENT_WRONG");
          error.resCode = i18n.__("responseStatus.ERROR");
          return next(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  getTransactionData: async (req, res, next) => {
    try {
      let finalResult = {}
      let pair = "";
      if (req.body.crypto === "btc") {
        pair = "btcinr";
      } else if (req.body.crypto === "eth") {
        pair = "ethinr";
      }
      //GET BUY PRICE
      axios.get(
        AppConfig.CORE + "api/priceAsk/" + pair,
        {
          headers: {
            'Authorization': "Bearer TOKEN_01"
          }
        }
      )
        .then(function (response) {
          finalResult.buyPrice = response.data
          //GET SELL PRICE
          axios
            .get(
              AppConfig.CORE + "api/priceBid/" + pair,
              {
                headers: {
                  'Authorization': "Bearer TOKEN_01"
                }
              }
            )
            .then(function (response) {
              finalResult.sellPrice = response.data
              //GET BUY LIMITS
              axios
                .post(
                  AppConfig.CORE + "api/BuyCryptoCurrency/GetBuyCryptoCurrencyLimits",
                  {
                    "VerificationLevel": 0,
                    "Currency": "inr",
                    "CryptoCurrency": req.body.crypto
                  },
                  {
                    headers: {
                      'Authorization': "Bearer TOKEN_01"
                    }
                  }
                )
                .then(function (response) {
                  finalResult.buyLimits = response.data
                  //GET SELL LIMITS
                  axios.get(
                    AppConfig.CORE + "api/SellCryptoCurrency/GetSellCryptoCurrencyLimits/0/inr/" + req.body.crypto,
                    {
                      headers: {
                        'Authorization': "Bearer TOKEN_01"
                      }
                    }
                  )
                    .then(function (response) {
                      finalResult.sellLimits = response.data
                      return Utility.response(res,
                        finalResult,
                        i18n.__("CRYPTO_BUY_SELL_RECEIVED"),
                        httpStatus.OK,
                        i18n.__("responseStatus.SUCCESS"))
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                })
                .catch(function (error) {
                  console.log(error);
                })
            })
            .catch(function (error) {
              console.log(error);
            })


        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //VIEW ALL SELL TRANSACTIONS
  viewSellTransaction: async (req, res, next) => {
    try {
      axios
        .post(
          AppConfig.CORE + "api/dashboard/sellTransactions",
          {
            "RowsPerPage": req.body.pageRows,
            "PageIndex": req.body.pageIndex,
            "Time": {
              "Min": req.body.startDate,
              "Max": req.body.endDate
            },
            "ClientId": req.body.user_details.userId
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("VIEW_SELL_TRANSACTIONS"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  viewTransaction: async (req, res, next) => {
    try {
      axios
        .post(
          AppConfig.CORE + "api/clientBackOffice/transactionHistory",
          {
            "RowsPerPage": req.body.pageRows,
            "PageIndex": req.body.pageIndex,
            "Time": {
              "Min": req.body.startDate,
              "Max": req.body.endDate
            },
            "ClientId": req.body.user_details.userId
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("VIEW_BUY_TRANSACTIONS"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  //VIEW BUY TRANSACTIONS OF A USER
  viewBuyTransaction: async (req, res, next) => {
    try {
      axios
        .post(
          AppConfig.CORE + "api/dashboard/buyTransactions",
          {
            "RowsPerPage": req.body.pageRows,
            "PageIndex": req.body.pageIndex,
            "Time": {
              "Min": req.body.startDate,
              "Max": req.body.endDate
            },
            "ClientId": req.body.user_details.userId
          },
          {
            headers: {
              'Authorization': "Bearer TOKEN_01"
            }
          }
        )
        .then(function (response) {
          return Utility.response(res,
            response.data,
            i18n.__("VIEW_BUY_TRANSACTIONS"),
            httpStatus.OK,
            i18n.__("responseStatus.SUCCESS"))
        })
        .catch(function (error) {
          console.log(error);
        })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

}