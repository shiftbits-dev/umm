const i18n = require("i18n");
const Utility = require("../utility/util");
const httpStatus = require("../exception/httpstatus.json");
const PGDB = require("../config/db");
const fs = require('fs');
var jwt = require('jsonwebtoken');
const axios = require("axios").default;

module.exports = {
  
  createCustomer: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'POST',
          url: AppConfig.LIRIUM_BASE_URL+'/v1/customers',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          data: {
            reference_id: req.body.reference_id,
            profile: {
              // label: req.body.label,
              first_name: req.body.first_name,
              // middle_name: req.body.middle_name,
              last_name: req.body.last_name,
              date_of_birth: req.body.date_of_birth,
              national_id_country: req.body.national_id_country,
              national_id_type: req.body.national_id_type,
              national_id: req.body.national_id,
              citizenship: req.body.citizenship,
              address_line1: req.body.address_line1,
              // address_line2: req.body.address_line2,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              zip_code: req.body.zip_code,
            },
            contact: {
              email: req.body.email,
              cellphone: req.body.cellphone
            }
          }
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            console.error(error);
            // console.error('error');
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  getCustomerDetails: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'GET',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}`,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          },
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            console.error(error);
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  getCustomerAccount: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'GET',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}/accounts`,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          },
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            console.error(error);
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  updateCustomerDetails: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'PATCH',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          data: {
            profile: {
              label: req.body.label
            },
            contact: {
              email: req.body.email,
              cellphone: req.body.cellphone
            }
          }
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            console.error(error);
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  uploadCustomerKYC: async (req, res, next) => {
    // try {
    //   fs.readFile('private.pem', 'utf8', (err, private_key) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     payload = {
    //       "iss": AppConfig.LIRIUM_TOKEN,
    //       "iat": Math.floor((new Date()).getTime() / 1000)
    //     }

    //     var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

    //     const options = {
    //       method: 'POST',
    //       url: `https://api.lirium-sandbox.com/v1/customers/${req.body.customer_id}`,
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + token
    //       },
    //       data: {
    //         document_type: req.body.document_type,
    //         file_type: 'image/png',
    //         file: 'file'
    //       }
    //     };

    //     axios.request(options)
    //       .then(function (response) {
    //         return Utility.response(res,
    //           response.data,
    //           i18n.__(""),
    //           httpStatus.OK,
    //           i18n.__("responseStatus.SUCCESS"))
    //       }).catch(function (error) {
    //         console.error(error);
    //       });
    //   })
    // } catch (err) {
    //   console.log(err);
    //   err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
    //   err.resCode = i18n.__("responseStatus.ERROR");
    //   return next(err);
    // }
  },

  createOrder: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'POSt',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}/orders`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          data: {
            asset: {
              currency: req.body.currency,
              amount: req.body.amount
            },
            operation: req.body.operation
          }
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            console.error(error);
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  confirmOrder: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'POST',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}/orders/${req.body.order_id}/confirm`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          data: {
            confirmation_code: req.body.confirmation_code
          }
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            // console.error(error);
            console.error('error');
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

  getOrderDetails: async (req, res, next) => {
    try {
      fs.readFile('private.pem', 'utf8', (err, private_key) => {
        if (err) {
          console.error(err)
          return
        }
        payload = {
          "iss": AppConfig.LIRIUM_TOKEN,
          "iat": Math.floor((new Date()).getTime() / 1000)
        }

        var token = jwt.sign(payload, private_key, { algorithm: 'RS512' });

        const options = {
          method: 'GET',
          url: `${AppConfig.LIRIUM_BASE_URL}/v1/customers/${req.body.customer_id}/orders/${req.body.order_id}/confirm`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
        };

        axios.request(options)
          .then(function (response) {
            return Utility.response(res,
              response.data,
              i18n.__(""),
              httpStatus.OK,
              i18n.__("responseStatus.SUCCESS"))
          }).catch(function (error) {
            // console.error(error);
            console.error('error');
          });
      })
    } catch (err) {
      console.log(err);
      err.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      err.resCode = i18n.__("responseStatus.ERROR");
      return next(err);
    }
  },

}