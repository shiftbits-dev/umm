const dotenv = require("dotenv");
const constant = require("./config.json");
require("dotenv").config();

module.exports = config = {
  PORT: process.env.PORT || 7000,
  JWT_SECRET: process.env.JWT_SECRET,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  CORE: process.env.CORE,
  ONFIDO: process.env.ONFIDO,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  FROM: process.env.FROM,
  API_TOKEN: process.env.API_TOKEN,
  ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID,
  ONESIGNALRESTAPIKEY: process.env.ONE_SIGNAL_REST_API_KEY,
  ONE_SIGNAL_ANDROID_KEY: process.env.ONE_SIGNAL_ANDROID_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  TOKEN_GENERATE: process.env.TOKEN_GENERATE,
  PAYMENT_CHECK: process.env.PAYMENT_CHECK,
  CMS_TOKEN: process.env.CMS_TOKEN,
  REVERSAL: process.env.REVERSAL,
  MSG_SOURCE: process.env.MSG_SOURCE,
  CLIENT_CODE: process.env.CLIENT_CODE,
  TX_EMAIL: process.env.TX_EMAIL,
  MAKE_PAYMENT: process.env.MAKE_PAYMENT,
  PAYMENT_STATUS: process.env.PAYMENT_STATUS,
  CONSTANT: constant,
  USER_NAME_ZEN: process.env.USER_NAME_ZEN,
  PASSWORD_ZEN: process.env.PASSWORD_ZEN,
  REMOTEURI: process.env.REMOTEURI,
  USER_NAME: process.env.USER_NAME,
  ZEN_PASSWORD: process.env.ZEN_PASSWORD,
  FIND_URL: process.env.FIND_URL,

  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
  LIRIUM_BASE_URL: process.env.LIRIUM_BASE_URL,
  LIRIUM_TOKEN: process.env.LIRIUM_TOKEN,
  
  SES: {
    email: "noreply@shiftbits.io",
    type: {
      SIGNUP: "SIGNUP",
      KYC: "KYC",
      BUY: "BUY",
      SELL: "SELL",
    },
  },
};

global.AppConfig = config;
